# Tutorial 07: Events and Ticks

**Difficulty:** Intermediate  
**Time:** ~30 minutes  
**Prerequisites:** [Tutorial 06](./06-stdlib-tour)

## Goal

Understand how RedScript code gets wired into Minecraft's execution model.

## `@load`

Use `@load` for initialization:

```rs
@load
fn setup() {
    say("Datapack loaded")
}
```

Good uses:

- scoreboard setup
- initial state reset
- welcome messages

## `@tick`

Use `@tick` for logic that must run every tick:

```rs
@tick
fn every_tick() {
    // runs 20 times per second
}
```

Use it carefully. Tick functions are hot paths.

For slower loops, prefer `@tick(rate=N)`:

```rs
@tick(rate=20)
fn every_second() {
    actionbar(@a, "One second passed")
}
```

## `@on_trigger`

Use `@on_trigger("name")` for player-activated features.

```rs
@on_trigger("kit")
fn kit() {
    give(@s, "minecraft:bread", 8)
}
```

The player runs:

```text
/trigger kit
```

`@s` becomes the triggering player.

## `@on(...)`

Use `@on(EventType)` for typed static events.

```rs
@on(PlayerJoin)
fn welcome(player: Player) {
    title(player, "Welcome!")
}
```

Examples of event kinds already documented in the reference include:

- `PlayerJoin`
- `PlayerDeath`
- `BlockBreak`
- `EntityKill`
- `ItemUse`

## A Full Event-Driven Example

```rs
namespace tutorial07

let online_count: int = 0

@load
fn setup() {
    say("Event tutorial loaded")
}

@tick(rate=20)
fn heartbeat() {
    actionbar(@a, f"Tracked players: {online_count}")
}

@on_trigger("kit")
fn give_kit() {
    give(@s, "minecraft:stone_sword", 1)
    give(@s, "minecraft:bread", 8)
    tell(@s, "Starter kit granted")
}

@on(PlayerJoin)
fn on_join(player: Player) {
    online_count = online_count + 1
    title(player, "Welcome to the server")
}

@on(PlayerDeath)
fn on_death() {
    tell(@s, "Respawn and try again")
}
```

## Choosing the Right Entry Point

- use `@load` for one-time setup
- use `@tick(rate=N)` for periodic logic
- use `@on_trigger` for explicit player actions
- use `@on(...)` for event-driven reactions

## Tick Design Advice

- keep each tick function small
- avoid heavy loops in normal `@tick` handlers
- split work into helper functions
- move expensive loops to coroutines when needed

## Practice

1. Add a second trigger such as `@on_trigger("rules")`.
2. Change the heartbeat rate from 20 to 100 ticks.
3. Add one more static event handler such as `@on(BlockBreak)`.

Next: [Tutorial 08: Advanced](./08-advanced)
