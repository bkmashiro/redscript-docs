#!/usr/bin/env python3
"""
Batch update tutorials with new UX components.
"""

import re
from pathlib import Path

# Tutorial metadata
TUTORIALS = {
    '01-getting-started': ('beginner', '15 min', '🚀'),
    '01-hello-world': ('beginner', '20 min', '👋'),
    '02-game-mechanics': ('beginner', '25 min', '🎮'),
    '02-variables': ('beginner', '15 min', '📦'),
    '02-variables-and-types': ('beginner', '20 min', '📊'),
    '03-control-flow': ('beginner', '20 min', '🔀'),
    '03-functions-structs': ('intermediate', '25 min', '🏗️'),
    '03-optimization': ('intermediate', '20 min', '⚡'),
    '04-functions': ('beginner', '20 min', '📝'),
    '04-selectors-context': ('intermediate', '25 min', '🎯'),
    '05-decorators': ('intermediate', '20 min', '🎨'),
    '05-structs-and-enums': ('intermediate', '25 min', '🧱'),
    '06-stdlib-math': ('intermediate', '20 min', '🔢'),
    '06-stdlib-tour': ('beginner', '15 min', '📚'),
    '07-events-and-ticks': ('intermediate', '25 min', '⏱️'),
    '07-stdlib-random': ('intermediate', '20 min', '🎲'),
    '08-advanced': ('advanced', '30 min', '🔬'),
    '08-coroutines': ('advanced', '30 min', '🔄'),
    '09-precision-arithmetic': ('advanced', '25 min', '🎯'),
    '10-full-game': ('advanced', '45 min', '🏆'),
    'capture-the-flag': ('advanced', '40 min', '🚩'),
    'parkour-race': ('intermediate', '35 min', '🏃'),
    'zombie-survival': ('intermediate', '40 min', '🧟'),
}

DIFFICULTY_BADGES = {
    'beginner': '🟢 Beginner',
    'intermediate': '🟡 Intermediate', 
    'advanced': '🔴 Advanced',
}

def add_tutorial_meta(content: str, difficulty: str, time: str) -> str:
    """Add tutorial-meta div after the first heading."""
    badge = DIFFICULTY_BADGES[difficulty]
    meta_div = f'''
<div class="tutorial-meta">
  <span class="difficulty {difficulty}">{badge}</span>
  <span class="time">⏱️ {time}</span>
</div>
'''
    
    # Skip if already has tutorial-meta
    if 'tutorial-meta' in content:
        return content
    
    # Find first # heading and insert after it
    match = re.search(r'^# .+$', content, re.MULTILINE)
    if match:
        end = match.end()
        return content[:end] + '\n' + meta_div + content[end:]
    
    return content

def process_tutorial(md_path: Path):
    """Process a single tutorial file."""
    stem = md_path.stem
    if stem not in TUTORIALS:
        print(f"  Skipping {stem} (no metadata)")
        return False
    
    difficulty, time, icon = TUTORIALS[stem]
    content = md_path.read_text()
    
    # Add tutorial meta
    new_content = add_tutorial_meta(content, difficulty, time)
    
    if new_content != content:
        md_path.write_text(new_content)
        print(f"  ✓ Updated {md_path.name}")
        return True
    else:
        print(f"  - {md_path.name} (no changes)")
        return False

def main():
    docs_dir = Path(__file__).parent.parent / "docs"
    
    updated = 0
    for lang in ['en', 'zh']:
        tutorials_dir = docs_dir / lang / "tutorials"
        if not tutorials_dir.exists():
            continue
        
        print(f"\nProcessing {lang} tutorials:")
        for md in sorted(tutorials_dir.glob("*.md")):
            if md.name == 'index.md':
                continue
            if process_tutorial(md):
                updated += 1
    
    print(f"\nUpdated {updated} files")

if __name__ == '__main__':
    main()
