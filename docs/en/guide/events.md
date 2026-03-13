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

The parameter type should match the event payload. For player events, that is usually `Player`.

## Available Events

| Event | Payload | Triggered When |
|-------|---------|----------------|
| `PlayerDeath` | `Player` | A player dies |
| `PlayerJoin` | `Player` | A player joins |
| `BlockBreak` | `Player` | A player breaks a block |
| `EntityKill` | `entity` | An entity is killed |
| `ItemUse` | `Player` | A player uses an item |

Multiple handlers can subscribe to the same event. RedScript generates one dispatcher per event kind and invokes each matching handler.

## Example

```mcrs
@on(PlayerJoin)
fn welcome(player: Player) {
    say(f"Welcome {player}!");
}

@on(BlockBreak)
fn reward_mining(player: Player) {
    scoreboard_add(player, "blocks", 1);
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
- Matching entities or players are passed into the generated dispatcher calls

This keeps event code concise while still compiling to regular datapack functions.

## Choosing Between `@on(...)` and Older Decorators

Use `@on(...)` when you want a typed event API shared across different event kinds. Keep using specialized decorators when you want their existing semantics.

`@on(...)` works well with f-strings and entity typing, so player-oriented event handlers can stay both concise and type-safe.

## Next Steps

- [Decorators](/en/guide/decorators) — Learn the rest of the decorator system
- [Entity Types](/en/guide/entity-types) — Understand typed event parameters
