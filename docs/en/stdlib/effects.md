# Effects

> Auto-generated from `src/stdlib/effects.mcrs` — do not edit manually.

## API

- [speed](#speed)
- [jump](#jump)
- [regen](#regen)
- [resistance](#resistance)
- [strength](#strength)
- [invisible](#invisible)
- [night_vision](#night-vision)
- [slow_fall](#slow-fall)
- [glow](#glow)
- [clear_effects](#clear-effects)
- [clear_effect](#clear-effect)
- [buff_all](#buff-all)

---

## `speed` <Badge type="info" text="v1.0.0" />

Give a speed boost to the target entity.

```redscript
fn speed(target: selector, duration: int, level: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Entity selector (e.g. @p, @a, @e[...]) |
| `duration` | Effect duration in ticks (20 ticks = 1 second) |
| `level` | Amplifier level (0 = Speed I, 1 = Speed II, ...) |

**Returns:** void — applies minecraft:speed effect

**Example**

```redscript
speed(@p, 200, 1)  // Speed II for 10 seconds
```

---

## `jump` <Badge type="info" text="v1.0.0" />

Give a jump boost to the target entity.

```redscript
fn jump(target: selector, duration: int, level: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Entity selector |
| `duration` | Effect duration in ticks |
| `level` | Amplifier level (0 = Jump Boost I, 1 = Jump Boost II, ...) |

**Returns:** void — applies minecraft:jump_boost effect

**Example**

```redscript
jump(@p, 100, 0)  // Jump Boost I for 5 seconds
```

---

## `regen` <Badge type="info" text="v1.0.0" />

Give regeneration to the target entity.

```redscript
fn regen(target: selector, duration: int, level: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Entity selector |
| `duration` | Effect duration in ticks |
| `level` | Amplifier level (0 = Regeneration I, ...) |

**Returns:** void — applies minecraft:regeneration effect

**Example**

```redscript
regen(@p, 60, 0)  // Regeneration I for 3 seconds
```

---

## `resistance` <Badge type="info" text="v1.0.0" />

Give damage resistance to the target entity.

```redscript
fn resistance(target: selector, duration: int, level: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Entity selector |
| `duration` | Effect duration in ticks |
| `level` | Amplifier level (0 = Resistance I, ...) |

**Returns:** void — applies minecraft:resistance effect

**Example**

```redscript
resistance(@p, 400, 0)  // Resistance I for 20 seconds
```

---

## `strength` <Badge type="info" text="v1.0.0" />

Give strength to the target entity.

```redscript
fn strength(target: selector, duration: int, level: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Entity selector |
| `duration` | Effect duration in ticks |
| `level` | Amplifier level (0 = Strength I, 1 = Strength II, ...) |

**Returns:** void — applies minecraft:strength effect

**Example**

```redscript
strength(@p, 200, 1)  // Strength II for 10 seconds
```

---

## `invisible` <Badge type="info" text="v1.0.0" />

Make the target entity invisible.

```redscript
fn invisible(target: selector, duration: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Entity selector |
| `duration` | Effect duration in ticks |

**Returns:** void — applies minecraft:invisibility at amplifier 0

**Example**

```redscript
invisible(@p, 300)  // invisibility for 15 seconds
```

---

## `night_vision` <Badge type="info" text="v1.0.0" />

Give night vision to the target entity.

```redscript
fn night_vision(target: selector, duration: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Entity selector |
| `duration` | Effect duration in ticks |

**Returns:** void — applies minecraft:night_vision at amplifier 0

**Example**

```redscript
night_vision(@p, 6000)  // night vision for 5 minutes
```

---

## `slow_fall` <Badge type="info" text="v1.0.0" />

Give slow falling to the target entity.

```redscript
fn slow_fall(target: selector, duration: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Entity selector |
| `duration` | Effect duration in ticks |

**Returns:** void — applies minecraft:slow_falling at amplifier 0

**Example**

```redscript
slow_fall(@p, 200)  // slow falling for 10 seconds
```

---

## `glow` <Badge type="info" text="v1.0.0" />

Give the glowing outline effect to the target entity.

```redscript
fn glow(target: selector, duration: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Entity selector |
| `duration` | Effect duration in ticks |

**Returns:** void — applies minecraft:glowing at amplifier 0

**Example**

```redscript
glow(@e[type=zombie], 100)  // make all zombies glow for 5 seconds
```

---

## `clear_effects` <Badge type="info" text="v1.0.0" />

Clear all active effects from the target entity.

```redscript
fn clear_effects(target: selector)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Entity selector |

**Returns:** void — removes all potion effects via effect_clear

**Example**

```redscript
clear_effects(@p)  // remove all effects from nearest player
```

---

## `clear_effect` <Badge type="info" text="v1.0.0" />

Clear a specific effect from the target entity.

```redscript
fn clear_effect(target: selector, eff: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Entity selector |
| `eff` | Effect resource location string (e.g. "minecraft:speed") |

**Returns:** void — removes the specified potion effect

**Example**

```redscript
clear_effect(@p, "minecraft:poison")  // cure poison
```

---

## `buff_all` <Badge type="info" text="v1.0.0" />

Apply a full buff package (Speed I, Strength I, Regeneration I, Resistance I).

```redscript
fn buff_all(target: selector, duration: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Entity selector |
| `duration` | Duration in ticks for all four effects |

**Returns:** void — applies speed, strength, regen, and resistance at level 1 (or 0 for resistance)

**Example**

```redscript
buff_all(@p, 600)  // full buff for 30 seconds
```

---
