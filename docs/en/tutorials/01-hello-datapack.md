# Tutorial 01: Hello Datapack

**Difficulty:** Beginner  
**Time:** ~15 minutes  
**Prerequisites:** [Getting Started](../guide/getting-started)

## What You'll Build

A "hello world" datapack that announces server startup, greets players with a private message, and hands out a starter kit when triggered.

## What You'll Learn

- How a RedScript file is structured (namespace, functions)
- `@load` — run once when the world loads
- `@tick` — run every game tick
- `@on_trigger` — fire when a player uses `/trigger`
- `say`, `tell`, `give`, `title`, `subtitle`
- Basic scoreboard setup

## Step 1: Namespace and Load

Every datapack needs a **namespace** — a unique identifier that scopes all your function names.

```rs
namespace tutorial01

@load
fn setup() {
    scoreboard_add_objective("tut01_data", "dummy")
    say("Hello! Tutorial 01 datapack loaded.")
    say("Type /trigger welcome_kit to get started!")
}
```

- `namespace tutorial01` sets the MC namespace to `tutorial01`
- `@load` runs `setup()` once when the world loads (or on `/reload`)
- `say()` broadcasts a chat message as the server
- `scoreboard_add_objective` creates a scoreboard for later use

## Step 2: The Tick Loop

```rs
@tick
fn every_tick() {
    let active: int = scoreboard_get("#active", "tut01_data")
    if (active == 1) {
        // The datapack is running — add logic here
    }
}
```

`@tick` fires every game tick (20 times per second). Keep these functions lightweight — they run constantly. For now it just reads a scoreboard flag.

## Step 3: A Trigger Function

Triggers are scoreboards players can activate with `/trigger <name>`. RedScript wires them up automatically.

```rs
@on_trigger("welcome_kit")
fn give_welcome_kit() {
    // tell() sends a message only to the triggering player
    tell(@s, "Welcome to Tutorial 01!")
    tell(@s, "Here is your starter kit:")

    // give() hands items to the triggering player
    give(@s, "minecraft:bread", 16)
    give(@s, "minecraft:wooden_sword", 1)
    give(@s, "minecraft:torch", 8)

    // Announce to everyone
    announce("A player claimed the welcome kit!")
}
```

- `@s` always refers to the entity executing the function (the trigger activator)
- `@a` refers to all players
- `give(selector, item, count)` uses standard Minecraft item IDs

## Step 4: Titles and Subtitles

```rs
@on_trigger("greet")
fn greet_player() {
    tell(@s, "Hello there, adventurer!")
    title(@s, "Welcome!")
    subtitle(@s, "Enjoy the server")
}
```

`title()` shows the big text, `subtitle()` shows the smaller text underneath.

## Complete Code

```rs
namespace tutorial01

@load
fn setup() {
    scoreboard_add_objective("tut01_data", "dummy")
    say("Hello! Tutorial 01 datapack loaded.")
    say("Type /trigger welcome_kit to get started!")
}

@tick
fn every_tick() {
    let active: int = scoreboard_get("#active", "tut01_data")
    if (active == 1) {
        // datapack active
    }
}

@on_trigger("welcome_kit")
fn give_welcome_kit() {
    tell(@s, "Welcome to Tutorial 01!")
    tell(@s, "Here is your starter kit:")
    give(@s, "minecraft:bread", 16)
    give(@s, "minecraft:wooden_sword", 1)
    give(@s, "minecraft:torch", 8)
    announce("A player claimed the welcome kit!")
}

@on_trigger("greet")
fn greet_player() {
    tell(@s, "Hello there, adventurer!")
    title(@s, "Welcome!")
    subtitle(@s, "Enjoy the server")
}
```

Full example: [tutorial_01_hello.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_01_hello.mcrs)

## Try It Out

1. Compile: `redscript compile tutorial_01_hello.mcrs -o ./datapack`
2. Drop the output folder into your world's `datapacks/` directory
3. Run `/reload` in-game
4. You should see the load message in chat
5. Run `/trigger welcome_kit` — you get bread, a sword, and torches
6. Run `/trigger greet` — see the title screen

## Next Steps

→ [Tutorial 02: Variables & Control Flow](./02-variables)
