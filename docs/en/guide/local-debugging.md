# Debugging in Singleplayer

Test your datapacks in a local Minecraft world without setting up a server.

## Quick Start

### 1. Find Your Saves Folder

| Platform | Path |
|----------|------|
| Windows | `%APPDATA%\.minecraft\saves\<world>\datapacks\` |
| macOS | `~/Library/Application Support/minecraft/saves/<world>/datapacks/` |
| Linux | `~/.minecraft/saves/<world>/datapacks/` |

### 2. Compile to World

```bash
# Compile directly to your world's datapacks folder
redscript compile game.mcrs -o ~/.minecraft/saves/MyWorld/datapacks/my-game
```

### 3. Reload in Game

In Minecraft, run:
```
/reload
```

Your datapack is now active!

## Watch Mode (Semi-Auto)

Use `redscript watch` to auto-compile on save:

```bash
redscript watch ./src -o ~/Library/Application\ Support/minecraft/saves/TestWorld/datapacks/my-game
```

Then manually run `/reload` in-game after each change.

::: tip
Keep the Minecraft chat open with `/reload` ready. After saving your code, just press `↑ Enter` to reload.
:::

## Helper Script

Create a `dev.sh` script for convenience:

```bash
#!/bin/bash
# dev.sh - Compile and notify

WORLD="TestWorld"
PACK="my-game"
SAVES="$HOME/Library/Application Support/minecraft/saves"

redscript compile src/main.mcrs -o "$SAVES/$WORLD/datapacks/$PACK"

echo "✓ Compiled! Run /reload in Minecraft"

# macOS: Play sound when done
afplay /System/Library/Sounds/Glass.aiff 2>/dev/null
```

```bash
chmod +x dev.sh
./dev.sh
```

## Windows Batch Script

```batch
@echo off
REM dev.bat - Compile to world

set WORLD=TestWorld
set PACK=my-game
set SAVES=%APPDATA%\.minecraft\saves

redscript compile src\main.mcrs -o "%SAVES%\%WORLD%\datapacks\%PACK%"

echo Done! Run /reload in Minecraft
```

## Tips

### Create a Test World

1. Create a new world in Creative mode
2. Enable cheats
3. Use a flat/void world for faster loading
4. Name it something like "RedScript-Test"

### Useful Commands

```
/reload                    # Reload all datapacks
/datapack list            # List active datapacks
/datapack enable "file/my-game"   # Enable a datapack
/function my-game:start   # Run a function
/gamerule sendCommandFeedback false  # Less chat spam
```

### Debug Output

Add debug messages to trace execution:

```mcrs
fn my_function() {
    say("[DEBUG] my_function called");
    
    let value: int = calculate_something();
    say("[DEBUG] value = " + value);
    
    // ... rest of function
}
```

### Check Function Exists

```
/function <tab>
```

Press Tab to autocomplete and verify your functions are loaded.

## Limitations

| Feature | Singleplayer | Paper Server |
|---------|--------------|--------------|
| Auto-reload | ❌ Manual `/reload` | ✅ Hot reload |
| Tick waiting | ❌ No | ✅ API |
| Scoreboard queries | ❌ Manual | ✅ API |
| Automated testing | ❌ No | ✅ Jest integration |

For automated testing and hot reload, see [Testing with Paper](./testing).

## Quick Reference

```bash
# macOS
redscript compile game.mcrs -o ~/Library/Application\ Support/minecraft/saves/TestWorld/datapacks/game

# Windows (PowerShell)
redscript compile game.mcrs -o "$env:APPDATA\.minecraft\saves\TestWorld\datapacks\game"

# Linux
redscript compile game.mcrs -o ~/.minecraft/saves/TestWorld/datapacks/game
```
