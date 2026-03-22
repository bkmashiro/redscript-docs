# Particles

> Auto-generated from `src/stdlib/particles.mcrs` — do not edit manually.

## API

- [hearts_at](#hearts-at)
- [flames](#flames)
- [smoke](#smoke)
- [explosion_effect](#explosion-effect)
- [sparkles_at](#sparkles-at)
- [angry_at](#angry-at)
- [happy_at](#happy-at)
- [portal_effect](#portal-effect)
- [totem_at](#totem-at)
- [end_sparkles_at](#end-sparkles-at)
- [particle_at_fx](#particle-at-fx)
- [draw_line_2d](#draw-line-2d)
- [draw_circle](#draw-circle)
- [draw_helix](#draw-helix)
- [particle_dot](#particle-dot)

---

## `hearts_at`

Spawns heart particles at a block position.

```redscript
fn hearts_at(x: int, y: int, z: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | X coordinate |
| `y` | Y coordinate |
| `z` | Z coordinate |

---

## `flames`

Spawns flame particles at a block position.

```redscript
fn flames(x: int, y: int, z: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | X coordinate |
| `y` | Y coordinate |
| `z` | Z coordinate |

---

## `smoke`

Spawns large smoke particles at a block position.

```redscript
fn smoke(x: int, y: int, z: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | X coordinate |
| `y` | Y coordinate |
| `z` | Z coordinate |

---

## `explosion_effect`

Spawns an explosion particle at a block position.

```redscript
fn explosion_effect(x: int, y: int, z: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | X coordinate |
| `y` | Y coordinate |
| `z` | Z coordinate |

---

## `sparkles_at`

Spawns enchantment sparkles at a block position.

```redscript
fn sparkles_at(x: int, y: int, z: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | X coordinate |
| `y` | Y coordinate |
| `z` | Z coordinate |

---

## `angry_at`

Spawns angry villager particles at a block position.

```redscript
fn angry_at(x: int, y: int, z: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | X coordinate |
| `y` | Y coordinate |
| `z` | Z coordinate |

---

## `happy_at`

Spawns happy villager particles at a block position.

```redscript
fn happy_at(x: int, y: int, z: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | X coordinate |
| `y` | Y coordinate |
| `z` | Z coordinate |

---

## `portal_effect`

Spawns portal particles at a block position.

```redscript
fn portal_effect(x: int, y: int, z: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | X coordinate |
| `y` | Y coordinate |
| `z` | Z coordinate |

---

## `totem_at`

Spawns totem particles at a block position.

```redscript
fn totem_at(x: int, y: int, z: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | X coordinate |
| `y` | Y coordinate |
| `z` | Z coordinate |

---

## `end_sparkles_at`

Spawns end rod particles at a block position.

```redscript
fn end_sparkles_at(x: int, y: int, z: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | X coordinate |
| `y` | Y coordinate |
| `z` | Z coordinate |

---

## `particle_at_fx`

Spawns a particle at a fixed-point position expressed as blocks ×100.
This helper emits a raw command so sub-block coordinates are preserved.

```redscript
fn particle_at_fx(x_fx: int, y_fx: int, z_fx: int, particle: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x_fx` | X coordinate in blocks ×100 |
| `y_fx` | Y coordinate in blocks ×100 |
| `z_fx` | Z coordinate in blocks ×100 |
| `particle` | Particle ID such as `minecraft:flame` |

---

## `draw_line_2d`

Draws a straight 2D particle line using linear interpolation.
Coordinates are fixed-point blocks ×100; `z` is also passed in ×100.

```redscript
fn draw_line_2d(x0: int, y0: int, x1: int, y1: int, steps: int, z: int, particle: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x0` | Start X in blocks ×100 |
| `y0` | Start Y in blocks ×100 |
| `x1` | End X in blocks ×100 |
| `y1` | End Y in blocks ×100 |
| `steps` | Number of interpolation steps |
| `z` | Z plane in blocks ×100 |
| `particle` | Particle ID such as `minecraft:dust` |

---

## `draw_circle`

Draws a circle in the XZ plane using `cos_fixed` and `sin_fixed`.
Center coordinates are whole blocks; radius is blocks ×100.

```redscript
fn draw_circle(cx: int, cy: int, cz: int, r: int, steps: int, particle: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `cx` | Center X in blocks |
| `cy` | Center Y in blocks |
| `cz` | Center Z in blocks |
| `r` | Radius in blocks ×100 |
| `steps` | Number of particle samples around the circle |
| `particle` | Particle ID such as `minecraft:end_rod` |

---

## `draw_helix`

Draws a helix spiral with configurable radius, height, and turns.
Center coordinates are whole blocks; radius is blocks ×100.

```redscript
fn draw_helix(cx: int, cy_start: int, cz: int, r: int, height: int, rotations: int, steps: int, particle: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `cx` | Center X in blocks |
| `cy_start` | Starting Y coordinate in blocks |
| `cz` | Center Z in blocks |
| `r` | Radius in blocks ×100 |
| `height` | Total helix height in blocks |
| `rotations` | Number of full turns |
| `steps` | Number of particle samples |
| `particle` | Particle ID such as `minecraft:portal` |

---

## `particle_dot`

Spawns exactly one particle at integer block coordinates.

```redscript
fn particle_dot(x: int, y: int, z: int, particle: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | X coordinate in whole blocks |
| `y` | Y coordinate in whole blocks |
| `z` | Z coordinate in whole blocks |
| `particle` | Particle ID such as `minecraft:flame` |

---
