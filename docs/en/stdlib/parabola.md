# Parabola

> Auto-generated from `src/stdlib/parabola.mcrs` — do not edit manually.

## API

- [parabola_gravity](#parabola-gravity)
- [parabola_gravity_half](#parabola-gravity-half)
- [parabola_vx](#parabola-vx)
- [parabola_vy](#parabola-vy)
- [parabola_vz](#parabola-vz)
- [parabola_speed_xz](#parabola-speed-xz)
- [parabola_x](#parabola-x)
- [parabola_y](#parabola-y)
- [parabola_z](#parabola-z)
- [parabola_flight_time](#parabola-flight-time)
- [parabola_max_height](#parabola-max-height)
- [parabola_step_vx](#parabola-step-vx)
- [parabola_step_vy](#parabola-step-vy)
- [parabola_step_vz](#parabola-step-vz)
- [parabola_ticks_for_range](#parabola-ticks-for-range)
- [parabola_in_range](#parabola-in-range)

---

## `parabola_gravity` <Badge type="info" text="Since v2.0.0" />

Minecraft gravity per tick in ×10000 fixed-point (≈ 0.08 × 10000 = 800).

```redscript
fn parabola_gravity(): int
```

**Returns:** `800`

---

## `parabola_gravity_half` <Badge type="info" text="Since v2.0.0" />

Half of Minecraft gravity per tick (used for displacement formula).

```redscript
fn parabola_gravity_half(): int
```

**Returns:** `400`

---

## `parabola_vx` <Badge type="info" text="Since v2.0.0" />

Compute the initial X velocity needed to reach `dx` blocks in `ticks` ticks.

```redscript
fn parabola_vx(dx: int, ticks: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `dx` | Horizontal X displacement in blocks |
| `ticks` | Flight time in ticks |

**Returns:** Initial X velocity ×10000 (`dx * 10000 / ticks`), or `0` if `ticks ≤ 0`

**Example**

```redscript
let vx: int = parabola_vx(10, 20)
```

---

## `parabola_vy` <Badge type="info" text="Since v2.0.0" />

Compute the initial Y velocity needed to reach height `dy` in `ticks` ticks.

```redscript
fn parabola_vy(dy: int, ticks: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `dy` | Vertical displacement in blocks (positive = up) |
| `ticks` | Flight time in ticks |

**Returns:** Initial Y velocity ×10000, or `0` if `ticks ≤ 0`

**Example**

```redscript
let vy: int = parabola_vy(5, 20)
```

---

## `parabola_vz` <Badge type="info" text="Since v2.0.0" />

Compute the initial Z velocity needed to reach `dz` blocks in `ticks` ticks.

```redscript
fn parabola_vz(dz: int, ticks: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `dz` | Horizontal Z displacement in blocks |
| `ticks` | Flight time in ticks |

**Returns:** Initial Z velocity ×10000, or `0` if `ticks ≤ 0`

---

## `parabola_speed_xz` <Badge type="info" text="Since v2.0.0" />

Compute the horizontal speed `sqrt(vx² + vz²)` needed to reach `(dx, dz)` in `ticks` ticks.

```redscript
fn parabola_speed_xz(dx: int, dz: int, ticks: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `dx` | X displacement in blocks |
| `dz` | Z displacement in blocks |
| `ticks` | Flight time in ticks |

**Returns:** Horizontal launch speed ×10000, or `0` if `ticks ≤ 0`

---

## `parabola_x` <Badge type="info" text="Since v2.0.0" />

X position at tick `t` given initial X velocity `vx0` ×10000.

```redscript
fn parabola_x(vx0: int, t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `vx0` | Initial X velocity ×10000 |
| `t` | Elapsed ticks |

**Returns:** X displacement in blocks (`vx0 * t / 10000`)

---

## `parabola_y` <Badge type="info" text="Since v2.0.0" />

Y position at tick `t` given initial Y velocity `vy0` ×10000.

```redscript
fn parabola_y(vy0: int, t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `vy0` | Initial Y velocity ×10000 |
| `t` | Elapsed ticks |

**Returns:** Y displacement in blocks (positive = up)

---

## `parabola_z` <Badge type="info" text="Since v2.0.0" />

Z position at tick `t` given initial Z velocity `vz0` ×10000.

```redscript
fn parabola_z(vz0: int, t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `vz0` | Initial Z velocity ×10000 |
| `t` | Elapsed ticks |

**Returns:** Z displacement in blocks

---

## `parabola_flight_time` <Badge type="info" text="Since v2.0.0" />

Estimate the tick when the projectile returns to launch height (`y = 0`).

Formula: `t = 2 × vy0 / gravity`. Returns `0` for non-positive initial velocity.

```redscript
fn parabola_flight_time(vy0: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `vy0` | Initial Y velocity ×10000 |

**Returns:** Flight time in ticks, or `0` if `vy0 ≤ 0`

**Example**

```redscript
let t: int = parabola_flight_time(8000)
```

---

## `parabola_max_height` <Badge type="info" text="Since v2.0.0" />

Maximum height (in blocks) above the launch point.

```redscript
fn parabola_max_height(vy0: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `vy0` | Initial Y velocity ×10000 |

**Returns:** Apex height in blocks, or `0` if `vy0 ≤ 0`

**Example**

```redscript
let h: int = parabola_max_height(8000)
```

---

## `parabola_step_vx` <Badge type="info" text="Since v2.0.0" />

Apply drag to the X velocity for one tick.

```redscript
fn parabola_step_vx(vx: int, drag: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `vx` | Current X velocity ×10000 |
| `drag` | Drag factor ×10000 (e.g. `9900` = 0.99 for arrows) |

**Returns:** New X velocity ×10000

---

## `parabola_step_vy` <Badge type="info" text="Since v2.0.0" />

Apply gravity and then drag to the Y velocity for one tick.

```redscript
fn parabola_step_vy(vy: int, drag: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `vy` | Current Y velocity ×10000 |
| `drag` | Drag factor ×10000 |

**Returns:** New Y velocity ×10000 after `(vy - gravity) * drag`

---

## `parabola_step_vz` <Badge type="info" text="Since v2.0.0" />

Apply drag to the Z velocity for one tick.

```redscript
fn parabola_step_vz(vz: int, drag: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `vz` | Current Z velocity ×10000 |
| `drag` | Drag factor ×10000 |

**Returns:** New Z velocity ×10000

---

## `parabola_ticks_for_range` <Badge type="info" text="Since v2.0.0" />

Estimate the number of ticks to reach a horizontal range using average arrow speed.

Heuristic: `t ≈ range × 10000 / 8000` (assumes ≈ 0.8 blocks/tick horizontal).
For precise aiming, use `parabola_vx/vy/vz` with a chosen tick count.

```redscript
fn parabola_ticks_for_range(range: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `range` | Horizontal distance in blocks |

**Returns:** Estimated ticks (minimum 1)

---

## `parabola_in_range` <Badge type="info" text="Since v2.0.0" />

Check whether a target is within horizontal range.

```redscript
fn parabola_in_range(dx: int, dz: int, max_range: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `dx` | X displacement to target in blocks |
| `dz` | Z displacement to target in blocks |
| `max_range` | Maximum range in blocks |

**Returns:** `1` if `dist(dx, dz) ≤ max_range`, otherwise `0`

---
