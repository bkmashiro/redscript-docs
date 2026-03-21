# `events` — Tick-driven Minecraft event dispatcher

Import: `import "stdlib/events.mcrs"`

High-level event hooks built on Minecraft scoreboards, tags, and function tags. The module creates the required objectives on `@load`, then polls them every tick to dispatch gameplay events such as player join, death, kills, and item use.

## Provided events

The dispatcher triggers these function tags:

- `#rs:on_player_join`
- `#rs:on_player_death`
- `#rs:on_entity_kill`
- `#rs:on_item_use`

Your datapack should provide handlers for the tags it uses. The module itself only detects and dispatches.

## Setup

Importing the module registers two generated functions:

- `@load fn __events_load()` creates the required scoreboard objectives.
- `@tick fn __events_tick()` polls for event conditions and runs the matching function tags.

Objectives created on load:

- `rs.deaths` — `deathCount`
- `rs.kills` — `totalKillCount`
- `rs.item_use` — `minecraft.used:minecraft.carrot_on_a_stick`

## Detected events

### `PlayerJoin`

Players without the `rs.joined` tag are treated as newly joined. The dispatcher:

1. Runs `function #rs:on_player_join` as those players.
2. Adds the `rs.joined` tag so the event only fires once per join session.

### `PlayerDeath`

Players with `rs.deaths >= 1` trigger `function #rs:on_player_death`, then their `rs.deaths` score is reset to `0`.

### `EntityKill`

Players with `rs.kills >= 1` trigger `function #rs:on_entity_kill`, then their `rs.kills` score is reset to `0`.

### `ItemUse`

Players with `rs.item_use >= 1` trigger `function #rs:on_item_use`, then their `rs.item_use` score is reset to `0`.

By default this tracks `minecraft:carrot_on_a_stick`, which is commonly used as a custom right-click trigger in datapacks.

## Example

```rs
import "stdlib/events.mcrs";

// Provide handlers via function tags in your datapack:
// data/<ns>/tags/functions/rs/on_player_join.json
// data/<ns>/tags/functions/rs/on_player_death.json
// data/<ns>/tags/functions/rs/on_entity_kill.json
// data/<ns>/tags/functions/rs/on_item_use.json
```

## Notes

- The module is a dispatcher, not a callback registry API.
- `BlockBreak` is mentioned in source comments but is not implemented yet.
- Join detection is session-based via the `rs.joined` tag; remove that tag manually if you need to re-trigger the join flow.
