# CLI Reference

The RedScript command-line interface for compiling `.mcrs` files to datapacks.

## Installation

```bash
npm install -g redscript-mc
```

Verify installation:

```bash
redscript --version
```

## Commands

### compile

Compile a RedScript file to a Minecraft datapack.

```bash
redscript compile <file> [options]
```

**Options:**

| Option | Description | Default |
|--------|-------------|---------|
| `-o, --output <path>` | Output directory | `./out` |
| `--namespace <ns>` | Datapack namespace | File name |
| `--target <target>` | Output target: `datapack`, `cmdblock`, `structure` | `datapack` |
| `--output-nbt <file>` | Output .nbt file path (for structure target) | — |
| `--no-dce` | Disable dead code elimination | `false` |
| `-O0` | Disable optimization passes | `off` |
| `-O1` | Enable standard optimizations | `on` |
| `-O2` | Enable aggressive optimizations | `off` |
| `--stats` | Print optimizer statistics | `false` |

**Examples:**

```bash
# Basic compilation
redscript compile hello.mcrs

# Specify output directory
redscript compile hello.mcrs -o ./my-datapack

# Set namespace
redscript compile game.mcrs --namespace minigame

# Generate command block structure
redscript compile game.mcrs --target structure --output-nbt game.nbt

# Disable optimizations for debugging
redscript compile game.mcrs -O0

# Compile with standard optimizations and stats
redscript compile game.mcrs -O1 --stats

# Keep other optimizations, but disable DCE
redscript compile game.mcrs -O2 --no-dce
```

### watch

Watch for file changes and recompile automatically.

```bash
redscript watch <dir> [options]
```

**Options:**

| Option | Description |
|--------|-------------|
| `-o, --output <path>` | Output directory |
| `--namespace <ns>` | Datapack namespace |
| `--hot-reload <url>` | POST to `<url>/reload` after each compile |

**Examples:**

```bash
# Watch and recompile
redscript watch ./src -o ./server/world/datapacks/my-game

# With hot reload (requires redscript-testharness)
redscript watch ./src -o ./datapacks/game --hot-reload http://localhost:25561
```

### check

Type-check a file without producing output.

```bash
redscript check <file>
```

```bash
redscript check game.mcrs
# ✓ No errors
```

### fmt

Auto-format RedScript source files.

```bash
redscript fmt <file.mcrs> [file2.mcrs ...]
```

```bash
# Format a single file
redscript fmt main.mcrs

# Format multiple files
redscript fmt src/*.mcrs
```

### repl

Start an interactive RedScript REPL.

```bash
redscript repl
```

```
RedScript REPL
> let x = 5;
> say("Hello ${x}");
say Hello 5
> 
```

### upgrade

Upgrade the RedScript CLI to the latest version from npm.

```bash
redscript upgrade
```

```bash
redscript upgrade
# Upgrading redscript-mc to latest...
# ✓ Upgraded to 0.9.2
```

### generate-dts

Generate a `builtins.d.mcrs` declaration file listing all built-in functions with their type signatures. Useful as a reference or for tooling.

```bash
redscript generate-dts [--output <file>]
```

```bash
# Write to stdout
redscript generate-dts

# Write to a file
redscript generate-dts --output builtins.d.mcrs
```

### version

Show version information.

```bash
redscript --version
```

## Auto Update Check

When you run `compile` or `check`, RedScript performs a background check for newer versions. If a newer version is available, a notice is printed after compilation:

```
✓ Compiled successfully

💡 New version available: 0.9.2 (you have 0.9.1). Run `redscript upgrade` to update.
```

This check runs in the background and never delays compilation.

## Output Targets

### datapack (default)

Generates a full Minecraft datapack:

```
my-datapack/
├── data/
│   ├── minecraft/
│   │   └── tags/function/
│   │       ├── load.json
│   │       └── tick.json
│   └── my_namespace/
│       └── function/
│           ├── __load.mcfunction
│           ├── __tick.mcfunction
│           └── my_function.mcfunction
└── pack.mcmeta
```

### cmdblock

Generates JSON for command block placement tools.

### structure

Generates a Minecraft `.nbt` structure file containing command blocks.

```bash
redscript compile game.mcrs --target structure --output-nbt game.nbt
```

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Success |
| `1` | Compilation error |
| `2` | File not found |
