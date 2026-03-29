# Getting Started

This guide walks through the fastest path from installation to a working datapack. It uses the current RedScript CLI workflow: scaffold a project, edit `src/main.mcrs`, compile to `dist/`, then load the datapack in Minecraft.

## Try Online First

If you want to test the language before installing anything, use the online IDE:

**[→ redscript-ide.pages.dev](https://redscript-ide.pages.dev)**

It is useful for quick experiments, but local development is better once you want project files, repeatable builds, and editor support.

## Install the Tooling

### VS Code Extension

For syntax highlighting, completions, hover docs, diagnostics, snippets, and go-to-definition, install the VS Code extension:

1. Open VS Code
2. Open Extensions
3. Search for `RedScript`
4. Install [RedScript for VSCode](https://marketplace.visualstudio.com/items?itemName=bkmashiro.redscript-vscode)

### CLI

Install the compiler globally with npm:

```bash
npm install -g redscript-mc
```

Check that the command is available:

```bash
redscript version
```

You can also inspect all supported commands with:

```bash
redscript --help
```

## Create a Project

The recommended starting point is the built-in project scaffold:

```bash
mkdir hello-redscript
cd hello-redscript
redscript init
```

`redscript init` creates a small project with this structure:

```text
hello-redscript/
├── src/main.mcrs
├── redscript.toml
├── redscript.config.json
├── README.md
└── .gitignore
```

Important files:

- `src/main.mcrs` is your entry file.
- `redscript.toml` stores the namespace, target Minecraft version, and output directory.
- `dist/` is the default compile output directory from the generated config.

## Write Your First Program

Replace the scaffolded `src/main.mcrs` with a minimal program:

```rs
@load
fn setup(): void {
    say("Hello from RedScript!")
    say("Run /trigger welcome_kit")
}

@on_trigger("welcome_kit")
fn give_welcome_kit(): void {
    tell(@s, "Starter items incoming.")
    give(@s, "minecraft:bread", 16)
    give(@s, "minecraft:torch", 8)
}
```

What this does:

- `@load` runs when the datapack is loaded or reloaded.
- `@on_trigger("welcome_kit")` creates trigger-driven logic for players.
- `tell()` sends a private message to the current player.
- `give()` hands items to the current player.

If you kept the directory name `hello-redscript`, the scaffold will sanitize that name into the namespace `hello_redscript`.

## Compile the Datapack

From the project root, compile the entry file:

```bash
redscript compile src/main.mcrs
```

Because the CLI reads `redscript.toml`, this already picks up the scaffolded namespace and output directory. If you prefer explicit flags, the equivalent command is:

```bash
redscript compile src/main.mcrs -o dist --namespace hello_redscript
```

On success, RedScript writes a datapack into `dist/`.

## Understand the Compile Output

The compiler emits a normal Minecraft datapack layout. A typical output looks like this:

```text
dist/
├── pack.mcmeta
└── data/
    ├── minecraft/
    │   └── tags/
    │       └── function/
    │           ├── load.json
    │           └── tick.json
    └── hello_redscript/
        └── function/
            ├── load.mcfunction
            ├── setup.mcfunction
            └── give_welcome_kit.mcfunction
```

The important pieces are:

- `pack.mcmeta` identifies the datapack to Minecraft.
- `data/<namespace>/function/*.mcfunction` contains compiled RedScript functions.
- `load.mcfunction` is generated automatically and handles runtime setup such as scoreboard initialization.

## Install It in Minecraft

Copy the contents of `dist/` into your world save's `datapacks/` folder so the datapack root contains `pack.mcmeta`.

Example:

```text
.minecraft/saves/<your-world>/datapacks/hello_redscript/
├── pack.mcmeta
└── data/
```

Then start the world and run:

```mcfunction
/reload
```

If the datapack loaded correctly, the `@load` function will run and print the chat messages from `setup()`.

## Run the First Program

After `/reload`, test the datapack in game:

1. Run `/trigger welcome_kit`
2. Confirm you receive bread and torches
3. Call the generated function directly if needed: `/function hello_redscript:give_welcome_kit`

If something fails, run:

```bash
redscript check src/main.mcrs
```

That validates the file without generating output.

## How the Compile Flow Works

The usual edit loop is:

1. Edit `src/main.mcrs`
2. Run `redscript compile src/main.mcrs`
3. Copy or sync the compiled `dist/` datapack into the world
4. Run `/reload` in Minecraft
5. Test your functions or triggers

For larger projects, RedScript can also:

- `redscript watch <dir>` to rebuild on file changes
- `redscript publish <file>` to package the datapack as a zip
- `redscript test <file>` to compile and run `@test` functions

## Next Steps

- [Your First Datapack](/en/guide/first-datapack) for a larger end-to-end example
- [Variables & Types](/en/guide/variables) for the basic type system
- [Functions](/en/guide/functions) for reusable logic
- [Decorators](/en/guide/decorators) for `@load`, `@tick`, triggers, and more
