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

### version

Show version information.

```bash
redscript --version
```

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
