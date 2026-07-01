# CLI Reference

The RedScript command-line interface compiles `.mcrs` files to Minecraft datapacks and provides project, testing, linting, formatting, and documentation helpers.

## Installation

```bash
npm install -g redscript-mc
```

Verify installation:

```bash
redscript --version
# or
redscript version
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
| `--namespace <ns>` | Datapack namespace | Derived from filename |
| `--source-map` | Generate `.sourcemap.json` files next to `.mcfunction` output | `false` |
| `--snapshot-stages <stages>` | Comma-separated compile stages to snapshot, or `all` | — |
| `--snapshot-output <path>` | Write selected compile stage snapshots to a JSON file | — |
| `--mc-version <ver>` | Target Minecraft version; affects codegen features | `1.21` |
| `--lenient` | Treat type errors as warnings instead of blocking compilation | `false` |
| `--include <dir>` | Add an import search path; repeatable | — |
| `--incremental` | Enable file-level incremental compilation cache | `false` |
| `--experimental-lir-local-copy-rewrite` | Manually enable extra LIR local copy rewrite (off by default; evidence-only) | `false` |

**Snapshot stages:** `preprocess`, `parse`, `typecheck`, `runtimeMetadata`, `lowerToHIR`, `lowerAndOptimize`, `runtimeAssets`, `finalizeRuntimeLIR`, `emitDatapack`, or `all`.

**Examples:**

```bash
# Basic compilation
redscript compile hello.mcrs

# Specify output directory and namespace
redscript compile game.mcrs -o ./my-datapack --namespace minigame

# Compile for an older Minecraft target
redscript compile game.mcrs --mc-version 1.20.2

# Add import search paths
redscript compile src/main.mcrs --include src/lib --include vendor/redscript

# Generate source maps
redscript compile game.mcrs --source-map

# Dump selected compiler-stage summaries for debugging/tooling
redscript compile game.mcrs \
  --snapshot-stages parse,typecheck,runtimeAssets,emitDatapack \
  --snapshot-output .redscript/stages.json

# Dump all available stage summaries
redscript compile game.mcrs --snapshot-stages all --snapshot-output stages.json
```

### publish

Compile and package a datapack as a `.zip` ready to install in Minecraft.

```bash
redscript publish <file> [-o <out.zip>] [--namespace <ns>] [--mc-version <ver>]
```

```bash
redscript publish game.mcrs -o game.zip --namespace minigame
```

### watch

Watch a directory for `.mcrs` changes, recompile, and optionally hot reload a running test harness.

```bash
redscript watch <dir> [options]
```

**Options:**

| Option | Description |
|--------|-------------|
| `-o, --output <path>` | Output directory |
| `--namespace <ns>` | Datapack namespace |
| `--hot-reload <url>` | After successful compile, POST to `<url>/reload` |
| `--include <dir>` | Add an import search path; repeatable |
| `--incremental` | Enable file-level incremental compilation cache |

```bash
redscript watch ./src -o ./server/world/datapacks/my-game
redscript watch ./src -o ./datapacks/game --hot-reload http://localhost:25561
```

### test

Compile and run functions annotated with `@test`.

```bash
redscript test <file> [--dry-run] [--mc-url <url>]
```

```bash
# Verify test compilation only
redscript test tests/main.mcrs --dry-run

# Run tests against a live TestHarness HTTP API
redscript test tests/main.mcrs --mc-url http://localhost:25561
```

### check

Check a file for errors without producing datapack output.

```bash
redscript check <file> [--fix]
```

```bash
redscript check game.mcrs
redscript check game.mcrs --fix
```

### lint

Statically analyze a RedScript file and report warnings.

```bash
redscript lint <file> [--max-function-lines <n>]
```

```bash
redscript lint src/main.mcrs --max-function-lines 80
```

### init

Scaffold a new RedScript datapack project.

```bash
redscript init [project-name]
```

```bash
redscript init my-minigame
```

### fmt

Auto-format RedScript source files.

```bash
redscript fmt <file.mcrs> [file2.mcrs ...]
```

```bash
redscript fmt main.mcrs
redscript fmt src/*.mcrs
```

### generate-dts

Generate a `builtins.d.mcrs` declaration file listing all built-in functions with their type signatures. Useful as a reference or for tooling.

```bash
redscript generate-dts [--output <file>]
# short form also works:
redscript generate-dts -o builtins.d.mcrs
```

### docs

Open the hosted standard-library documentation website in your browser.

```bash
redscript docs [module] [--list]
```

```bash
redscript docs --list
redscript docs math
```

### repl

Start an interactive RedScript REPL.

```bash
redscript repl
```

```
RedScript REPL
> let x = 5;
> say(f"Hello {x}");
say Hello 5
```

### version

Show version information.

```bash
redscript --version
redscript version
```

### upgrade

Upgrade the RedScript CLI to the latest npm release.

```bash
redscript upgrade
```

## Output Targets

The CLI's main supported output is a Minecraft datapack directory or zip package. A typical datapack output looks like:

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

Use `publish` when you want a zipped package ready to copy into a world's `datapacks/` directory.

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Success |
| `1` | Compile/check/lint/test failure or invalid CLI usage |
