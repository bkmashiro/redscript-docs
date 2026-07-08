# Static Events <Badge type="tip" text="v1.2" />

Use `@on(Event)` to bind a function to a generated event dispatcher.

## Basic Syntax

```mcrs
@on(PlayerDeath)
fn handle_death(player: Player) {
    say("Player died!");
}

@on(PlayerJoin)
fn handle_join(player: Player) {
    give(player, "minecraft:diamond", 1);
}
```

The event runtime injects the executor context. Prefer zero-argument handlers and use `@s` for the triggering player; a single `Player` parameter is still accepted for legacy compatibility.

## Available Events

| Event | Payload | Triggered When |
|-------|---------|----------------|
| `PlayerDeath` | `Player` | A player dies |
| `PlayerJoin` | `Player` | A player joins |
| `EntityKill` | `Player` | A player kills an entity |
| `ItemUse` | `Player` | A player uses an item |

Multiple handlers can subscribe to the same event. RedScript generates one dispatcher per event kind and invokes each matching handler.

## Example

```mcrs
@on(PlayerJoin)
fn welcome(player: Player) {
    tell(player, "Welcome!");
}

@on(EntityKill)
fn reward_kill() {
    scoreboard_add(@s, "kills", 1);
}

@on(ItemUse)
fn on_item_use(player: Player) {
    effect(player, "speed", 100, 1);
}
```

## How It Compiles

RedScript generates dispatcher functions for each subscribed event and wires your handlers into them.

- Your event handlers stay as normal typed functions
- The compiler emits the Minecraft detection logic
- Matching entities or players run the generated handler through the event executor context

This keeps event code concise while still compiling to regular datapack functions.

## Choosing an Event Entry Point

Use `@on(...)` for the built-in event runtime. Older specialized names such as `@on_death` and `@on_login` are still recognized by the parser for compatibility, but they are not the current runtime-backed event path.

If you need an event outside the built-in set, use `@function_tag(...)` with an explicit Minecraft/stdlib dispatcher instead of assuming a specialized decorator exists.

## Next Steps

- [Decorators](/en/guide/decorators) — Learn the rest of the decorator system
- [Entity Types](/en/guide/entity-types) — Understand typed event parameters
