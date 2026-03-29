# Events

> Auto-generated from `src/stdlib/events.mcrs` — do not edit manually.

The `events` module provides a scoreboard-driven event dispatcher that detects common player and entity events each tick and fires them via Minecraft function tags. Multiple handlers can subscribe to the same event using the [`@on`](/en/guide/events) decorator.

## How It Works

On load, the module registers scoreboard objectives to track player deaths, kills, and item usage. Each tick it polls those objectives and dispatches to the appropriate function tag (`#rs:on_player_join`, `#rs:on_player_death`, etc.). Your `@on(...)` handlers are automatically wired into those function tags by the compiler.

## Available Events

| Event | Function Tag | Payload | Triggered When |
|-------|-------------|---------|----------------|
| `PlayerJoin` | `#rs:on_player_join` | `Player` | A player enters the world without the `rs.joined` tag |
| `PlayerDeath` | `#rs:on_player_death` | `Player` | A player's `rs.deaths` score reaches 1 or more |
| `EntityKill` | `#rs:on_entity_kill` | `Player` | A player's `rs.kills` score reaches 1 or more |
| `ItemUse` | `#rs:on_item_use` | `Player` | A player uses a carrot-on-a-stick |

## API

- [__events_load](#events-load)
- [__events_tick](#events-tick)

---

## `__events_load` <Badge type="info" text="v1.2.0" />

Internal load function. Registers the `rs.deaths`, `rs.kills`, and `rs.item_use` scoreboard objectives. Invoked automatically at datapack load via `@load` — **do not call directly**.

```redscript
@load fn __events_load()
```

**Registered objectives**

| Objective | Criterion | Purpose |
|-----------|-----------|---------|
| `rs.deaths` | `deathCount` | Tracks player deaths |
| `rs.kills` | `totalKillCount` | Tracks player kills |
| `rs.item_use` | `minecraft.used:minecraft.carrot_on_a_stick` | Tracks item use |

---

## `__events_tick` <Badge type="info" text="v1.2.0" />

Internal tick function. Polls scoreboard objectives every game tick and dispatches `PlayerJoin`, `PlayerDeath`, `EntityKill`, and `ItemUse` events to their respective function tags. Invoked automatically every tick via `@tick` — **do not call directly**.

```redscript
@tick fn __events_tick()
```

**Dispatch order**

1. `PlayerJoin` — runs for each player missing the `rs.joined` tag, then applies the tag
2. `PlayerDeath` — runs for each player with `rs.deaths >= 1`, then resets the score to 0
3. `EntityKill` — runs for each player with `rs.kills >= 1`, then resets the score to 0
4. `ItemUse` — runs for each player with `rs.item_use >= 1`, then resets the score to 0

---

## Usage Examples

### Player join greeting

```redscript
@on(PlayerJoin)
fn welcome() {
    tellraw(@s, "Welcome to the server!");
}
```

### Death counter

```redscript
@on(PlayerDeath)
fn on_death() {
    scoreboard_add(@s, "total_deaths", 1);
    title(@s, "You died!");
}
```

### Kill reward

```redscript
@on(EntityKill)
fn on_kill() {
    give(@s, "minecraft:gold_nugget", 1);
}
```

### Item use ability

```redscript
@on(ItemUse)
fn on_rod_use() {
    effect(@s, "speed", 60, 2);
}
```

### Multiple handlers on the same event

Multiple functions can subscribe to the same event. All handlers run for every matching player each tick.

```redscript
@on(PlayerJoin)
fn log_join() {
    scoreboard_add(@s, "join_count", 1);
}

@on(PlayerJoin)
fn greet_join() {
    say(f"Welcome, {@s}!");
}
```

## See Also

- [Static Events guide](/en/guide/events) — decorator syntax and usage patterns
- [Decorators reference](/en/reference/decorators) — full decorator list
- [Entity Types guide](/en/guide/entity-types) — typed event parameters
