#!/usr/bin/env python3
"""
Validate all RedScript code blocks in tutorials compile successfully.
Also identify where real game screenshots are needed.

Usage:
    python validate-tutorials.py
    python validate-tutorials.py --fix  # Auto-fix common issues
"""

import re
import subprocess
import sys
import tempfile
from pathlib import Path

SCREENSHOT_MARKERS = [
    ('title(', 'SCREENSHOT_NEEDED: Title screen'),
    ('subtitle(', 'SCREENSHOT_NEEDED: Title screen'),
    ('actionbar(', 'SCREENSHOT_NEEDED: Action bar'),
    ('bossbar_', 'SCREENSHOT_NEEDED: Boss bar'),
    ('particle(', 'SCREENSHOT_NEEDED: Particle effect'),
    ('effect(', 'SCREENSHOT_NEEDED: Player effect visual'),
    ('summon(', 'SCREENSHOT_NEEDED: Entity spawn'),
    ('setblock(', 'SCREENSHOT_NEEDED: World modification'),
    ('fill(', 'SCREENSHOT_NEEDED: World modification'),
]

def find_cli():
    cli_path = Path.home() / "projects/redscript/dist/src/cli.js"
    if cli_path.exists():
        return ['node', str(cli_path)]
    return ['redscript']

def is_syntax_snippet(code: str) -> bool:
    """Check if code is just a syntax demonstration (not meant to be compiled alone)."""
    code = code.strip()
    
    # Snippets that show partial syntax
    if code.startswith('if ') or code.startswith('while ') or code.startswith('for '):
        return True
    if code.startswith('let ') or code.startswith('const '):
        return True
    if code.startswith('struct ') or code.startswith('enum '):
        return True
    
    # Variable assignments without context
    if '=' in code and 'fn ' not in code and '@' not in code:
        first_line = code.split('\n')[0]
        if not first_line.strip().startswith('namespace'):
            return True
    
    # Import-only blocks
    if code.startswith('import ') and 'fn ' not in code:
        return True
    
    return False

def wrap_snippet(code: str) -> str | None:
    """Wrap incomplete code snippets to make them compilable.
    Returns None if snippet is not meant to be compiled (syntax demo)."""
    code = code.strip()
    
    # Skip pure syntax demonstrations
    if is_syntax_snippet(code):
        return None
    
    # Already complete
    if 'namespace' in code:
        return code
    
    # Has decorators - wrap in namespace
    if '@load' in code or '@tick' in code or '@on' in code:
        return f"namespace test;\n\n{code}"
    
    # Just a function
    if code.startswith('fn '):
        return f"namespace test;\n\n{code}"
    
    # Expression or statements - wrap in function
    if 'fn ' not in code:
        # If it has imports at the top, keep them at namespace level
        lines = code.split('\n')
        imports = []
        body = []
        for line in lines:
            if line.strip().startswith('import '):
                imports.append(line)
            else:
                body.append(line)
        
        if imports:
            import_block = '\n'.join(imports)
            indented = '\n'.join('    ' + line for line in body if line.strip())
            return f"namespace test;\n\n{import_block}\n\n@load\nfn main() {{\n{indented}\n}}"
        else:
            indented = '\n'.join('    ' + line for line in code.split('\n'))
            return f"namespace test;\n\n@load\nfn main() {{\n{indented}\n}}"
    
    return f"namespace test;\n\n{code}"

def compile_code(code: str, cli: list[str]) -> tuple[bool, str]:
    """Try to compile code. Returns (success, error_message)."""
    with tempfile.NamedTemporaryFile(mode='w', suffix='.mcrs', delete=False) as f:
        f.write(code)
        temp_path = f.name
    
    try:
        result = subprocess.run(
            cli + ['check', temp_path],
            capture_output=True, text=True, timeout=10
        )
        if result.returncode == 0:
            return True, ""
        return False, result.stderr.strip()[:200]
    except Exception as e:
        return False, str(e)
    finally:
        Path(temp_path).unlink(missing_ok=True)

def extract_code_blocks(md_path: Path) -> list[tuple[int, str]]:
    """Extract code blocks with line numbers."""
    content = md_path.read_text()
    blocks = []
    
    # Find ```rs or ```redscript blocks
    for match in re.finditer(r'```(?:rs|redscript)\s*\n(.*?)```', content, re.DOTALL):
        line_num = content[:match.start()].count('\n') + 1
        code = match.group(1).strip()
        if code:  # Skip empty blocks
            blocks.append((line_num, code))
    
    return blocks

def check_screenshot_needs(code: str) -> list[str]:
    """Check if code produces visual output that needs a real screenshot."""
    needs = []
    for pattern, desc in SCREENSHOT_MARKERS:
        if pattern in code:
            needs.append(desc)
    return list(set(needs))  # Dedupe

def validate_tutorial(md_path: Path, cli: list[str]) -> dict:
    """Validate a single tutorial file."""
    results = {
        'path': str(md_path),
        'blocks': [],
        'errors': [],
        'screenshots_needed': [],
    }
    
    blocks = extract_code_blocks(md_path)
    
    for line_num, code in blocks:
        wrapped = wrap_snippet(code)
        if wrapped is None:
            # Syntax snippet, skip compilation
            block_info = {
                'line': line_num,
                'success': True,
                'preview': code[:50].replace('\n', ' ') + ('...' if len(code) > 50 else ''),
                'skipped': True,
            }
            results['blocks'].append(block_info)
            continue
        
        success, error = compile_code(wrapped, cli)
        
        block_info = {
            'line': line_num,
            'success': success,
            'preview': code[:50].replace('\n', ' ') + ('...' if len(code) > 50 else ''),
        }
        
        if not success:
            block_info['error'] = error
            results['errors'].append(f"Line {line_num}: {error}")
        
        # Check for screenshot needs
        screenshot_needs = check_screenshot_needs(code)
        if screenshot_needs:
            results['screenshots_needed'].append({
                'line': line_num,
                'needs': screenshot_needs,
            })
        
        results['blocks'].append(block_info)
    
    return results

def main():
    cli = find_cli()
    print(f"Using CLI: {' '.join(cli)}")
    
    docs_dir = Path(__file__).parent.parent / "docs"
    
    all_results = []
    total_blocks = 0
    total_errors = 0
    all_screenshots = []
    
    for lang in ['en', 'zh']:
        tutorials_dir = docs_dir / lang / "tutorials"
        if not tutorials_dir.exists():
            continue
        
        for md in sorted(tutorials_dir.glob("*.md")):
            if md.name == 'index.md':
                continue
            
            result = validate_tutorial(md, cli)
            all_results.append(result)
            
            total_blocks += len(result['blocks'])
            total_errors += len(result['errors'])
            
            if result['screenshots_needed']:
                all_screenshots.extend([
                    (md.name, s['line'], s['needs'])
                    for s in result['screenshots_needed']
                ])
    
    # Print summary
    print(f"\n{'='*60}")
    print(f"VALIDATION SUMMARY")
    print(f"{'='*60}")
    print(f"Total code blocks: {total_blocks}")
    print(f"Compilation errors: {total_errors}")
    print(f"Success rate: {(total_blocks - total_errors) / total_blocks * 100:.1f}%")
    
    # Print errors
    if total_errors > 0:
        print(f"\n{'='*60}")
        print("ERRORS:")
        print(f"{'='*60}")
        for result in all_results:
            if result['errors']:
                print(f"\n{result['path']}:")
                for err in result['errors']:
                    print(f"  ❌ {err}")
    
    # Print screenshot needs
    if all_screenshots:
        print(f"\n{'='*60}")
        print("SCREENSHOTS NEEDED:")
        print(f"{'='*60}")
        for file, line, needs in all_screenshots:
            print(f"  📸 {file}:{line} — {', '.join(needs)}")
    
    return 0 if total_errors == 0 else 1

if __name__ == '__main__':
    sys.exit(main())
