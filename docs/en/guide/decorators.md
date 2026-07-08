# Decorators

Decorators attach behavior to functions. They control **when** and **how** functions are called.

## @load

Runs once when the datapack loads (or on `/reload`):

```rs
@load
fn init() {
    say("Datapack loaded!");
    scoreboard_add_objective("kills", "playerKillCount");
}
```

## @tick

Runs every game tick (20 times per second):

```rs
@tick
fn check_health() {
    foreach (player in @a) {
        if (scoreboard_get(player, "health") <= 5) {
            effect(player, "glowing", 1, 1);
        }
    }
}
```

### @tick(rate=N)

Runs every N ticks instead of every tick:

```rs
@tick(rate=20)
fn every_second() {
    say("One second passed");
}

@tick(rate=100)
fn every_five_seconds() {
    actionbar(@a, "Server running");
}
```

## @on_trigger

Runs when a player triggers a scoreboard trigger:

```rs
@on_trigger("shop")
fn open_shop() {
    tellraw(@s, "Welcome to the shop!");
}
```

Players trigger it in-game with:
```
/trigger shop
```

## Runtime Events: @on(EventType)

Use `@on(EventType)` for compiler-backed event dispatch. This is the event API that currently wires handlers into the generated runtime assets.

Supported event types:

| Event | Description |
|-------|-------------|
| `PlayerDeath` | A player dies |
| `PlayerJoin` | A player joins the server |
| `EntityKill` | A player kills an entity |
| `ItemUse` | A player uses an item |

```rs
@on(PlayerDeath)
fn handle_death() {
    scoreboard_add(@s, "deaths", 1);
}

@on(PlayerJoin)
fn handle_join() {
    title(@s, "Welcome!");
}
```

The event runtime sets the executor context for the triggering player/entity, so prefer zero-argument handlers and use `@s` inside the function body.

## Legacy Specialized Event Decorators

The parser still recognizes older names such as `@on_death`, `@on_login`, `@on_advancement("id")`, `@on_craft("item")`, and `@on_join_team("team")` for compatibility. Do not use them for new event logic: they are not the runtime-backed event path. Use `@on(PlayerDeath)`, `@on(PlayerJoin)`, `@on(EntityKill)`, `@on(ItemUse)`, or an explicit `@function_tag(...)` plus your own dispatcher.

## @on(EventType)

This is the canonical event decorator. It is documented in more detail in [Static Events](/en/guide/events).

## @keep

Prevents the dead code elimination (DCE) optimizer from removing a function. By default, functions whose names start with `_` are treated as private/internal and may be removed if unreachable. Use `@keep` to force them to be retained:

```rs
@keep
fn _internal_helper() {
    // Won't be removed even though it starts with _
}
```

## Combining Decorators

A function can have multiple decorators:

```rs
@load
@tick(rate=200)
fn scoreboard_display() {
    // Runs on load AND every 10 seconds
    sidebar_set("Kills", @a, "kills");
}
```

## DCE and Private Functions

RedScript's dead code elimination (DCE) optimizer automatically removes unreachable functions. The visibility rules are:

- Functions **not** starting with `_` are **public** — always emitted as callable via `/function`
- Functions starting with `_` are **private** — only kept if called from somewhere or decorated with `@keep`
- Decorated entry-point functions (`@tick`, `@load`, `@on_trigger`, `@on(EventType)`, etc.) are always kept regardless of name

## How Decorators Work

Decorators compile to Minecraft's function tag system:

| Decorator | Compiles To |
|-----------|-------------|
| `@load` | `#minecraft:load` tag |
| `@tick` | `#minecraft:tick` tag |
| `@tick(rate=N)` | Schedule command with interval |
| `@on_trigger("x")` | Trigger scoreboard detection |
| `@on(EventType)` | Runtime event dispatch for PlayerDeath/PlayerJoin/EntityKill/ItemUse |
| legacy `@on_*` event decorators | Parser compatibility only; prefer `@on(EventType)` |

## Next Steps

- [Structs & Enums](/en/guide/structs-enums) — Custom data types
- [Decorator Reference](/en/reference/decorators) — Complete decorator list
