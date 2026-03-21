# Tutorial 01: Getting Started

**Difficulty:** Beginner  
**Time:** ~20 minutes  
**Prerequisites:** None

## Goal

Install the CLI, compile a tiny program, and understand what a RedScript datapack looks like on disk.

## What You'll Build

A datapack that:

- prints a message when the world loads
- exposes one callable function
- is easy to drop into a Minecraft world for quick iteration

## Step 1: Install the Tooling

If you only want to try the language, the online IDE is the fastest route:

- [redscript-ide.pages.dev](https://redscript-ide.pages.dev)

For local development, install the CLI:

```bash
npm install -g redscript-mc
redscript --version
```

Optional but recommended:

- install the VSCode extension
- keep a Minecraft test world with a `datapacks/` folder ready

## Step 2: Create Your First Source File

Create `hello.mcrs`:

```rs
namespace getting_started

@load
fn init() {
    say("Hello from RedScript!")
}

fn greet() {
    tell(@a, "This came from a normal function.")
}
```

What is happening here:

- `namespace getting_started` controls the Minecraft function namespace
- `@load` runs once on `/reload` or world load
- `say(...)` broadcasts to chat
- `fn greet()` is a regular function you can call from other RedScript code or with `/function`

## Step 3: Compile It

```bash
redscript compile hello.mcrs -o ./my-datapack
```

This produces a datapack directory. The exact layout may vary by compiler version, but you should expect:

- `pack.mcmeta`
- `data/getting_started/functions/...`
- generated tags for `#minecraft:load` when decorators require them

If you want optimizer statistics while learning, add `--stats`:

```bash
redscript compile hello.mcrs -o ./my-datapack --stats
```

## Step 4: Install the Datapack

Copy `./my-datapack` into your world's `datapacks/` directory, then run:

```text
/reload
```

You should immediately see:

```text
Hello from RedScript!
```

You can also call the plain function manually:

```text
/function getting_started:greet
```

## Step 5: Add a First Trigger

Most beginner datapacks become more useful when players can activate a feature without typing a long `/function` path.

```rs
namespace getting_started

@load
fn init() {
    say("Hello from RedScript!")
    say("Run /trigger starter to receive a welcome item.")
}

@on_trigger("starter")
fn starter_pack() {
    give(@s, "minecraft:bread", 8)
    tell(@s, "Starter pack granted.")
}
```

Now the player can run:

```text
/trigger starter
```

`@s` refers to the player who activated the trigger.

## Your First Datapack Checklist

- The source file has a namespace.
- There is at least one decorated entry point such as `@load`.
- The datapack compiles without type errors.
- The generated folder is copied into the world.
- `/reload` runs cleanly in-game.

## Common Beginner Mistakes

### Forgetting the namespace

Without a namespace, your generated function paths become harder to reason about.

### Editing the wrong output folder

Re-run `redscript compile ... -o ...` into a clean, predictable folder.

### Expecting plain functions to run automatically

Only decorated functions such as `@load`, `@tick`, or `@on_trigger` are wired into Minecraft automatically.

## Full Example

```rs
namespace getting_started

@load
fn init() {
    say("Hello from RedScript!")
    say("Run /trigger starter to receive a welcome item.")
}

@on_trigger("starter")
fn starter_pack() {
    give(@s, "minecraft:bread", 8)
    tell(@s, "Starter pack granted.")
}

fn greet() {
    tell(@a, "This came from a normal function.")
}
```

## Try Next

1. Change the namespace and recompile.
2. Replace bread with another item.
3. Add one more `@on_trigger(...)` function for a second command.

Next: [Tutorial 02: Variables and Types](./02-variables-and-types)
