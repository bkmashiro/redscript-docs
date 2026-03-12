# Decorator Reference

Complete reference for all decorators in RedScript.

## @load

Runs the function when the datapack is loaded or reloaded.

**Syntax:** `@load`

```rs
@load
fn init() {
    say("Loaded!");
}
```

**Compiles to:** Adds function to `#minecraft:load` function tag.

**Use cases:**
- Initialize scoreboards
- Set up teams
- Reset game state
- Display welcome messages

## @tick

Runs the function every game tick (20 times per second).

**Syntax:** `@tick`

```rs
@tick
fn update() {
    // runs 20 times per second
}
```

**Compiles to:** Adds function to `#minecraft:tick` function tag.

::: warning
Use `@tick` sparingly. Running complex logic 20 times per second can cause lag. Prefer `@tick(rate=N)` when possible.
:::

## @tick(rate=N)

Runs the function every N ticks.

**Syntax:** `@tick(rate=N)`

| Rate | Frequency |
|------|-----------|
| `rate=1` | Every tick (same as `@tick`) |
| `rate=20` | Every second |
| `rate=100` | Every 5 seconds |
| `rate=200` | Every 10 seconds |
| `rate=1200` | Every minute |

```rs
@tick(rate=20)
fn every_second() {
    // runs once per second
}

@tick(rate=1200)
fn every_minute() {
    // runs once per minute
}
```

**Compiles to:** Uses `schedule` command with the specified interval.

## @on_trigger

Runs when a player activates a trigger scoreboard.

**Syntax:** `@on_trigger("trigger_name")`

```rs
@on_trigger("menu")
fn open_menu() {
    tellraw(@s, "Menu opened!");
}
```

**Player activation:** `/trigger menu`

**Compiles to:**
1. Creates a trigger scoreboard objective
2. Detects when score changes from 0
3. Resets the trigger after execution

**Use cases:**
- Player-activated menus
- Shop systems
- Voting systems
- Custom commands

## @on_death

Runs when an entity dies.

**Syntax:** `@on_death`

```rs
@on_death
fn handle_death() {
    tellraw(@s, "You died!");
    scoreboard_add_score(@s, "deaths", 1);
}
```

**Compiles to:** Uses advancement-based death detection.

**Context:** `@s` refers to the player who died.

## @on_join

Runs when a player joins the server.

**Syntax:** `@on_join`

```rs
@on_join
fn welcome() {
    title(@s, "Welcome!");
    tag_add(@s, "joined");
}
```

**Compiles to:** Detects players without a "joined" tag and runs the function.

**Context:** `@s` refers to the joining player.

## @on_respawn

Runs when a player respawns after death.

**Syntax:** `@on_respawn`

```rs
@on_respawn
fn on_respawn() {
    effect(@s, "regeneration", 10, 1);
    give(@s, "bread", 5);
}
```

**Compiles to:** Advancement-based respawn detection.

**Context:** `@s` refers to the respawning player.

## Combining Decorators

Functions can have multiple decorators:

```rs
@load
@tick(rate=200)
fn refresh_display() {
    sidebar_set("Stats", @a, "kills");
}
```

This function runs on load AND every 10 seconds.

## Decorator Summary

| Decorator | Trigger | `@s` Context |
|-----------|---------|--------------|
| `@load` | Datapack load / `/reload` | Server |
| `@tick` | Every tick (20/sec) | Server |
| `@tick(rate=N)` | Every N ticks | Server |
| `@on_trigger("x")` | Player runs `/trigger x` | Triggering player |
| `@on_death` | Entity death | Dying entity |
| `@on_join` | Player joins | Joining player |
| `@on_respawn` | Player respawns | Respawning player |
