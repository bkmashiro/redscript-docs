# Cooldown

> Auto-generated from `src/stdlib/cooldown.mcrs` — do not edit manually.

## API

- [cooldown_start](#cooldown-start)
- [cooldown_ready](#cooldown-ready)
- [cooldown_tick](#cooldown-tick)

---

## `cooldown_start` <Badge type="info" text="v1.2.0" />

Start (or restart) a cooldown for the given slot.
The cooldown expires after `ticks` game ticks.

```redscript
fn cooldown_start(name: string, ticks: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `name` | Cooldown slot identifier (reserved for future multi-slot support) |
| `ticks` | Duration in game ticks (20 ticks = 1 second) |

**Example**

```redscript
cooldown_start("sword", 40); // 2-second cooldown
```

---

## `cooldown_ready` <Badge type="info" text="v1.2.0" />

Check whether the cooldown has expired (i.e. is ready to fire again).

```redscript
fn cooldown_ready(name: string) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `name` | Cooldown slot identifier (reserved for future multi-slot support) |

**Returns:** 1 if the cooldown is ready (inactive or ticks remaining ≤ 0), 0 otherwise

**Example**

```redscript
if (cooldown_ready("sword") == 1) { attack(); cooldown_start("sword", 40); }
```

---

## `cooldown_tick` <Badge type="info" text="v1.2.0" />

Advance the cooldown by one tick. Call this every tick from a `@tick` function.
Automatically marks the cooldown inactive when the remaining ticks reach zero.

```redscript
fn cooldown_tick(name: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `name` | Cooldown slot identifier (reserved for future multi-slot support) |

**Example**

```redscript
@tick fn game_tick() { cooldown_tick("sword"); }
```

---
