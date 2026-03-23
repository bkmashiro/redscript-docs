#!/usr/bin/env python3
"""
Generate Minecraft output preview images for RedScript tutorials.

Scans tutorial markdown files for code blocks, compiles them,
and generates preview images showing what the output looks like in-game.

Usage:
    python generate-tutorial-images.py --tutorial docs/en/tutorials/01-hello-world.md
    python generate-tutorial-images.py --all
"""

import argparse
import re
import subprocess
import sys
import tempfile
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Please install Pillow: pip install pillow")
    sys.exit(1)

# Import from mc-chat-render
script_dir = Path(__file__).parent
sys.path.insert(0, str(script_dir))
from importlib.machinery import SourceFileLoader
mc_render = SourceFileLoader("mc_chat_render", str(script_dir / "mc-chat-render.py")).load_module()

def extract_code_blocks(markdown_path: str) -> list[tuple[str, str, bool]]:
    """Extract RedScript code blocks from markdown file.
    
    Returns list of (code, block_id, is_complete) tuples.
    is_complete indicates if the block is a complete compilable unit.
    """
    with open(markdown_path) as f:
        content = f.read()
    
    # Match ```rs or ```redscript blocks
    pattern = r'```(?:rs|redscript)\s*\n(.*?)```'
    blocks = []
    
    for i, match in enumerate(re.finditer(pattern, content, re.DOTALL)):
        code = match.group(1).strip()
        # Check if it's a complete unit
        is_complete = 'namespace' in code or ('@load' in code and 'fn ' in code)
        # Skip truly incomplete snippets (no functions at all)
        if 'fn ' not in code and '@' not in code:
            continue
        blocks.append((code, f"block-{i}", is_complete))
    
    return blocks

def wrap_code_snippet(code: str) -> str:
    """Wrap a code snippet in namespace/function if needed."""
    if 'namespace' in code:
        return code
    
    # Add namespace wrapper
    if '@load' in code or '@tick' in code or 'fn ' in code:
        return f"namespace tutorial;\n\n{code}"
    
    # Wrap in load function
    return f"""namespace tutorial;

@load
fn main() {{
{chr(10).join('    ' + line for line in code.split(chr(10)))}
}}"""

def compile_and_get_output(code: str) -> list[str]:
    """Compile code and extract say/tellraw messages."""
    # Write to temp file
    with tempfile.NamedTemporaryFile(mode='w', suffix='.mcrs', delete=False) as f:
        f.write(code)
        temp_path = f.name
    
    try:
        # Find CLI
        cli_path = Path.home() / "projects/redscript/dist/src/cli.js"
        if cli_path.exists():
            cmd = ['node', str(cli_path), 'compile', temp_path, '-o', '/tmp/rs-tutorial-test']
        else:
            cmd = ['redscript', 'compile', temp_path, '-o', '/tmp/rs-tutorial-test']
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            print(f"  Compilation failed: {result.stderr[:200]}")
            return []
        
        # Extract messages
        messages = []
        out_dir = Path('/tmp/rs-tutorial-test/data')
        if out_dir.exists():
            for mcf in out_dir.rglob('*.mcfunction'):
                messages.extend(mc_render.extract_say_messages(str(mcf)))
        
        return messages
    finally:
        Path(temp_path).unlink(missing_ok=True)

def generate_preview_image(messages: list[str], output_path: str, title: str = None):
    """Generate a styled preview image."""
    font_path = mc_render.find_font()
    
    # Render messages
    img = mc_render.render_chat_messages(messages, font_path, font_size=20)
    
    # Add title/border if specified
    if title:
        # Create image with title
        title_height = 30
        final = Image.new('RGBA', (img.width, img.height + title_height), (45, 45, 45, 255))
        
        draw = ImageDraw.Draw(final)
        try:
            title_font = ImageFont.truetype(font_path, 14) if font_path else ImageFont.load_default()
        except:
            title_font = ImageFont.load_default()
        
        # Draw title bar
        draw.rectangle([(0, 0), (img.width, title_height)], fill=(60, 60, 60, 255))
        draw.text((10, 8), title, font=title_font, fill=(200, 200, 200, 255))
        
        # Paste chat
        final.paste(img, (0, title_height), img)
        img = final
    
    # Add border
    bordered = Image.new('RGBA', (img.width + 4, img.height + 4), (80, 80, 80, 255))
    bordered.paste(img, (2, 2))
    
    bordered.save(output_path)
    return output_path

def process_tutorial(md_path: str, output_dir: str = None):
    """Process a tutorial file and generate preview images."""
    md_path = Path(md_path)
    if not md_path.exists():
        print(f"File not found: {md_path}")
        return []
    
    if output_dir is None:
        output_dir = md_path.parent / "images"
    else:
        output_dir = Path(output_dir)
    
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"Processing: {md_path.name}")
    blocks = extract_code_blocks(str(md_path))
    complete_blocks = [(c, i, comp) for c, i, comp in blocks if comp]
    print(f"  Found {len(blocks)} code blocks, {len(complete_blocks)} complete")
    
    generated = []
    for code, block_id, is_complete in complete_blocks:
        # Only process complete blocks
        wrapped = wrap_code_snippet(code)
        messages = compile_and_get_output(wrapped)
        
        if messages and len(messages) <= 10:  # Skip blocks with too many messages
            img_name = f"{md_path.stem}-{block_id}.png"
            img_path = output_dir / img_name
            generate_preview_image(messages, str(img_path), title="Minecraft Chat")
            print(f"  Generated: {img_name} ({len(messages)} messages)")
            generated.append(str(img_path))
        elif messages:
            print(f"  Skipped: {block_id} ({len(messages)} messages, too many)")
    
    return generated

def main():
    parser = argparse.ArgumentParser(description='Generate tutorial preview images')
    parser.add_argument('--tutorial', '-t', help='Path to tutorial markdown file')
    parser.add_argument('--all', '-a', action='store_true', help='Process all tutorials')
    parser.add_argument('--output', '-o', help='Output directory')
    
    args = parser.parse_args()
    
    if args.tutorial:
        process_tutorial(args.tutorial, args.output)
    elif args.all:
        docs_dir = script_dir.parent / "docs"
        for lang in ['en', 'zh']:
            tutorials_dir = docs_dir / lang / "tutorials"
            if tutorials_dir.exists():
                for md in tutorials_dir.glob("*.md"):
                    if md.name != 'index.md':
                        process_tutorial(str(md))
    else:
        parser.print_help()

if __name__ == '__main__':
    main()
