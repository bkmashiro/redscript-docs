#!/usr/bin/env python3
"""
Render Minecraft chat messages to images.

Usage:
    python mc-chat-render.py "Hello World!" -o output.png
    python mc-chat-render.py "§aGreen §cRed §lBold" -o colored.png
    python mc-chat-render.py --mcfunction path/to/file.mcfunction -o output.png
    python mc-chat-render.py --messages "msg1" "msg2" "msg3" -o output.png
"""

import argparse
import re
import subprocess
import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Please install Pillow: pip install pillow")
    sys.exit(1)

# Minecraft color codes
MC_COLORS = {
    '0': (0, 0, 0),         # Black
    '1': (0, 0, 170),       # Dark Blue
    '2': (0, 170, 0),       # Dark Green
    '3': (0, 170, 170),     # Dark Aqua
    '4': (170, 0, 0),       # Dark Red
    '5': (170, 0, 170),     # Dark Purple
    '6': (255, 170, 0),     # Gold
    '7': (170, 170, 170),   # Gray
    '8': (85, 85, 85),      # Dark Gray
    '9': (85, 85, 255),     # Blue
    'a': (85, 255, 85),     # Green
    'b': (85, 255, 255),    # Aqua
    'c': (255, 85, 85),     # Red
    'd': (255, 85, 255),    # Light Purple
    'e': (255, 255, 85),    # Yellow
    'f': (255, 255, 255),   # White
    'r': (255, 255, 255),   # Reset (white)
}

# Background color (Minecraft chat background)
BG_COLOR = (30, 30, 30)
CHAT_BG = (0, 0, 0, 180)  # Semi-transparent black

def find_font():
    """Find Minecraft font file."""
    script_dir = Path(__file__).parent.parent
    font_paths = [
        script_dir / "assets/fonts/Minecraft-Regular.otf",
        script_dir / "assets/fonts/Minecraft.ttf",
        Path.home() / "Library/Fonts/Minecraft-Regular.otf",
        Path("/usr/share/fonts/truetype/minecraft/Minecraft.ttf"),
    ]
    for p in font_paths:
        if p.exists():
            return str(p)
    # Fallback to system monospace
    return None

def strip_unsupported_chars(text: str) -> str:
    """Remove emojis and other characters not supported by MC font."""
    import unicodedata
    result = []
    for char in text:
        # Keep ASCII and basic Latin
        if ord(char) < 0x2600:  # Before emoji range
            result.append(char)
        else:
            # Replace emoji with space or nothing
            cat = unicodedata.category(char)
            if cat.startswith('So'):  # Symbol, Other (emoji)
                pass  # Skip
            else:
                result.append(char)
    return ''.join(result)

def parse_formatted_text(text: str) -> list[tuple[str, dict]]:
    """Parse Minecraft formatted text into segments with styles."""
    text = strip_unsupported_chars(text)
    segments = []
    current_color = 'f'  # Default white
    current_bold = False
    current_italic = False
    current_underline = False
    current_strikethrough = False
    
    i = 0
    current_text = ""
    
    while i < len(text):
        if text[i] == '§' and i + 1 < len(text):
            # Save current segment
            if current_text:
                segments.append((current_text, {
                    'color': MC_COLORS.get(current_color, MC_COLORS['f']),
                    'bold': current_bold,
                    'italic': current_italic,
                    'underline': current_underline,
                    'strikethrough': current_strikethrough,
                }))
                current_text = ""
            
            code = text[i + 1].lower()
            if code in MC_COLORS:
                current_color = code
                # Color codes reset formatting
                current_bold = False
                current_italic = False
                current_underline = False
                current_strikethrough = False
            elif code == 'l':
                current_bold = True
            elif code == 'o':
                current_italic = True
            elif code == 'n':
                current_underline = True
            elif code == 'm':
                current_strikethrough = True
            elif code == 'r':
                current_color = 'f'
                current_bold = False
                current_italic = False
                current_underline = False
                current_strikethrough = False
            i += 2
        else:
            current_text += text[i]
            i += 1
    
    # Save final segment
    if current_text:
        segments.append((current_text, {
            'color': MC_COLORS.get(current_color, MC_COLORS['f']),
            'bold': current_bold,
            'italic': current_italic,
            'underline': current_underline,
            'strikethrough': current_strikethrough,
        }))
    
    return segments

def render_chat_line(text: str, font_path: str | None, font_size: int = 24) -> Image.Image:
    """Render a single chat line to an image."""
    segments = parse_formatted_text(text)
    
    # Load font
    try:
        if font_path:
            font = ImageFont.truetype(font_path, font_size)
            bold_font = ImageFont.truetype(font_path, font_size)  # MC font doesn't have bold variant
        else:
            font = ImageFont.load_default()
            bold_font = font
    except Exception:
        font = ImageFont.load_default()
        bold_font = font
    
    # Calculate total width
    total_width = 0
    heights = []
    for text_seg, style in segments:
        f = bold_font if style['bold'] else font
        bbox = f.getbbox(text_seg)
        if bbox:
            total_width += bbox[2] - bbox[0]
            heights.append(bbox[3] - bbox[1])
    
    height = max(heights) if heights else font_size
    padding = 8
    
    # Create image with transparent background
    img = Image.new('RGBA', (total_width + padding * 2, height + padding * 2), (0, 0, 0, 0))
    
    # Draw semi-transparent chat background
    bg = Image.new('RGBA', img.size, CHAT_BG)
    img = Image.alpha_composite(img, bg)
    
    draw = ImageDraw.Draw(img)
    
    x = padding
    y = padding
    
    for text_seg, style in segments:
        f = bold_font if style['bold'] else font
        color = style['color'] + (255,)  # Add alpha
        
        # Draw text with shadow
        shadow_color = (0, 0, 0, 200)
        draw.text((x + 2, y + 2), text_seg, font=f, fill=shadow_color)
        draw.text((x, y), text_seg, font=f, fill=color)
        
        bbox = f.getbbox(text_seg)
        if bbox:
            x += bbox[2] - bbox[0]
    
    return img

def render_chat_messages(messages: list[str], font_path: str | None, font_size: int = 24, title: str = None) -> Image.Image:
    """Render multiple chat messages to a single image."""
    if not messages:
        return Image.new('RGBA', (200, 50), BG_COLOR + (255,))
    
    # Render each line
    line_images = [render_chat_line(msg, font_path, font_size) for msg in messages]
    
    # Calculate total dimensions
    max_width = max(img.width for img in line_images)
    total_height = sum(img.height for img in line_images)
    
    # Add title bar if specified
    title_height = 30 if title else 0
    
    # Create final image
    final = Image.new('RGBA', (max_width + 20, total_height + 20 + title_height), BG_COLOR + (255,))
    
    if title:
        draw = ImageDraw.Draw(final)
        try:
            title_font = ImageFont.truetype(font_path, 14) if font_path else ImageFont.load_default()
        except:
            title_font = ImageFont.load_default()
        
        # Draw title bar
        draw.rectangle([(0, 0), (max_width + 20, title_height)], fill=(60, 60, 60, 255))
        draw.text((10, 8), title, font=title_font, fill=(200, 200, 200, 255))
    
    y = 10 + title_height
    for img in line_images:
        final.paste(img, (10, y), img)
        y += img.height
    
    # Add border
    bordered = Image.new('RGBA', (final.width + 4, final.height + 4), (80, 80, 80, 255))
    bordered.paste(final, (2, 2))
    
    return bordered

def extract_say_messages(mcfunction_path: str) -> list[str]:
    """Extract say/tellraw messages from mcfunction file."""
    messages = []
    with open(mcfunction_path) as f:
        for line in f:
            line = line.strip()
            # Match say command
            if line.startswith('say '):
                messages.append(f"[Server] {line[4:]}")
            # Match tellraw (basic parsing)
            elif 'tellraw' in line:
                # Try to extract text from JSON
                match = re.search(r'"text"\s*:\s*"([^"]*)"', line)
                if match:
                    messages.append(match.group(1))
    return messages

def compile_and_extract(rs_file: str) -> list[str]:
    """Compile RedScript file and extract output messages."""
    # Find RedScript CLI
    redscript_paths = [
        Path.home() / "projects/redscript/dist/src/cli.js",
        Path("/usr/local/bin/redscript"),
        Path.home() / ".npm-global/bin/redscript",
    ]
    cli_path = None
    for p in redscript_paths:
        if p.exists():
            cli_path = p
            break
    
    if cli_path and str(cli_path).endswith('.js'):
        cmd = ['node', str(cli_path), 'compile', rs_file, '-o', '/tmp/rs-test']
    else:
        cmd = ['redscript', 'compile', rs_file, '-o', '/tmp/rs-test']
    
    # Compile
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Compilation failed: {result.stderr}")
        return []
    
    # Find generated mcfunction files
    messages = []
    out_dir = Path('/tmp/rs-test/data')
    if out_dir.exists():
        for mcf in out_dir.rglob('*.mcfunction'):
            messages.extend(extract_say_messages(str(mcf)))
    
    return messages

def main():
    parser = argparse.ArgumentParser(description='Render Minecraft chat messages')
    parser.add_argument('text', nargs='?', help='Text to render (with § color codes)')
    parser.add_argument('--messages', '-M', nargs='+', help='Multiple messages to render')
    parser.add_argument('--mcfunction', '-m', help='Path to .mcfunction file')
    parser.add_argument('--redscript', '-r', help='Path to .mcrs file (will compile first)')
    parser.add_argument('--output', '-o', required=True, help='Output image path')
    parser.add_argument('--font-size', '-s', type=int, default=20, help='Font size (default: 20)')
    parser.add_argument('--title', '-t', help='Title bar text')
    
    args = parser.parse_args()
    
    font_path = find_font()
    if not font_path:
        print("Warning: Minecraft font not found, using default font")
    
    messages = []
    
    if args.messages:
        messages = args.messages
    elif args.text:
        messages = [args.text]
    elif args.mcfunction:
        messages = extract_say_messages(args.mcfunction)
    elif args.redscript:
        messages = compile_and_extract(args.redscript)
    else:
        parser.print_help()
        sys.exit(1)
    
    if not messages:
        print("No messages to render")
        sys.exit(1)
    
    print(f"Rendering {len(messages)} message(s)...")
    img = render_chat_messages(messages, font_path, args.font_size, title=args.title)
    img.save(args.output)
    print(f"Saved to {args.output}")

if __name__ == '__main__':
    main()
