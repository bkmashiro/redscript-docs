# Physics

> Auto-generated from `src/stdlib/physics.mcrs` — do not edit manually.

## API

- [gravity_fx](#gravity-fx)
- [air_drag_fx](#air-drag-fx)
- [water_drag_fx](#water-drag-fx)
- [projectile_y](#projectile-y)
- [projectile_x](#projectile-x)
- [projectile_vy](#projectile-vy)
- [projectile_land_t](#projectile-land-t)
- [projectile_max_height](#projectile-max-height)
- [apply_drag](#apply-drag)
- [apply_gravity](#apply-gravity)
- [update_pos](#update-pos)
- [bounce_v](#bounce-v)
- [clamp_velocity](#clamp-velocity)
- [spring_force](#spring-force)
- [spring_update_v](#spring-update-v)
- [circular_x](#circular-x)
- [circular_z](#circular-z)
- [friction_decel](#friction-decel)
- [is_grounded](#is-grounded)
- [impact_velocity](#impact-velocity)

---

## `gravity_fx` <Badge type="info" text="Since v1.0.0" />

Minecraft gravity constant in fixed-point units (0.08 blocks/tick² × 100 = 8).

```redscript
fn gravity_fx(): int
```

**Returns:** 8 (gravity acceleration per tick in ×100 units)

---

## `air_drag_fx` <Badge type="info" text="Since v1.0.0" />

Air drag factor in ×10000 scale (0.98 per tick).

```redscript
fn air_drag_fx(): int
```

**Returns:** 9800 (multiply velocity by this / 10000 each tick)

---

## `water_drag_fx` <Badge type="info" text="Since v1.0.0" />

Water drag factor in ×10000 scale (0.80 per tick, stronger than air).

```redscript
fn water_drag_fx(): int
```

**Returns:** 8000 (multiply velocity by this / 10000 each tick while in water)

---

## `projectile_y` <Badge type="info" text="Since v1.0.0" />

Compute Y position of a projectile after t ticks (no drag, constant gravity).

```redscript
fn projectile_y(p0: int, v0: int, t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `p0` | Initial Y position ×100 (blocks × 100) |
| `v0` | Initial Y velocity ×100 (blocks/tick × 100) |
| `t` | Time in ticks |

**Returns:** Y position at tick t: p0 + v0*t - gravity*t²/2

**Example**

```redscript
let y: int = projectile_y(0, 200, 5)  // height after 5 ticks, launched at 2 blocks/tick
```

---

## `projectile_x` <Badge type="info" text="Since v1.0.0" />

Compute horizontal X position of a projectile after t ticks (constant velocity, no drag).

```redscript
fn projectile_x(p0: int, v0: int, t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `p0` | Initial X position ×100 |
| `v0` | Horizontal X velocity ×100 |
| `t` | Time in ticks |

**Returns:** X position at tick t: p0 + v0*t

**Example**

```redscript
let x: int = projectile_x(0, 100, 10)  // 10 blocks/tick for 10 ticks = 1000 units
```

---

## `projectile_vy` <Badge type="info" text="Since v1.0.0" />

Compute Y velocity of a projectile after t ticks (accounting for gravity).

```redscript
fn projectile_vy(v0: int, t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `v0` | Initial Y velocity ×100 |
| `t` | Time in ticks |

**Returns:** v0 - gravity*t

**Example**

```redscript
let vy: int = projectile_vy(200, 5)  // velocity after 5 ticks
```

---

## `projectile_land_t` <Badge type="info" text="Since v1.0.0" />

Estimate the tick at which a projectile launched upward returns to Y=0.

```redscript
fn projectile_land_t(v0y: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `v0y` | Initial upward Y velocity ×100 (must be positive) |

**Returns:** 2*v0y / gravity; returns 0 if v0y <= 0

**Example**

```redscript
let land_t: int = projectile_land_t(160)  // ticks until landing
```

---

## `projectile_max_height` <Badge type="info" text="Since v1.0.0" />

Compute the maximum height reached by a projectile launched upward.

```redscript
fn projectile_max_height(v0y: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `v0y` | Initial upward Y velocity ×100 |

**Returns:** v0y² / (2*gravity) in ×100 units

**Example**

```redscript
let max_h: int = projectile_max_height(160)  // peak height in units×100
```

---

## `apply_drag` <Badge type="info" text="Since v1.0.0" />

Apply a drag factor to a velocity (one tick of drag).

```redscript
fn apply_drag(v_fx: int, drag_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `v_fx` | Velocity ×100 |
| `drag_fx` | Drag factor ×10000 (9800 for air, 8000 for water) |

**Returns:** v_fx * drag_fx / 10000

**Example**

```redscript
let v: int = apply_drag(500, air_drag_fx())  // 500 * 0.98 = 490
```

---

## `apply_gravity` <Badge type="info" text="Since v1.0.0" />

Apply one tick of gravity to a Y velocity component.

```redscript
fn apply_gravity(vy_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `vy_fx` | Current Y velocity ×100 |

**Returns:** vy_fx - gravity_fx()

**Example**

```redscript
vy = apply_gravity(vy)  // call each tick in your physics loop
```

---

## `update_pos` <Badge type="info" text="Since v1.0.0" />

Update a position component by one tick of velocity.

```redscript
fn update_pos(p_fx: int, v_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `p_fx` | Current position ×100 |
| `v_fx` | Velocity ×100 |

**Returns:** p_fx + v_fx

**Example**

```redscript
px = update_pos(px, vx)  // advance X each tick
```

---

## `bounce_v` <Badge type="info" text="Since v1.0.0" />

Reflect a velocity component with energy loss (bounce).

```redscript
fn bounce_v(v_fx: int, restitution_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `v_fx` | Velocity ×100 to reflect |
| `restitution_fx` | Energy retention ×10000 (10000=elastic, 5000=half, 0=inelastic) |

**Returns:** Negated and scaled velocity: -v_fx * restitution / 10000

**Example**

```redscript
vy = bounce_v(vy, 7000)  // 70% energy retained on bounce
```

---

## `clamp_velocity` <Badge type="info" text="Since v1.0.0" />

Clamp a velocity component to a maximum absolute speed.

```redscript
fn clamp_velocity(v_fx: int, max_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `v_fx` | Velocity ×100 to clamp |
| `max_fx` | Maximum absolute velocity ×100 (terminal velocity) |

**Returns:** v_fx clamped to [-max_fx, max_fx]

**Example**

```redscript
vx = clamp_velocity(vx, 500)  // cap horizontal speed at 5 blocks/tick
```

---

## `spring_force` <Badge type="info" text="Since v1.0.0" />

Compute spring force toward a target position (Hooke's law: F = -k*(x - target)).

```redscript
fn spring_force(pos_fx: int, target_fx: int, k_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `pos_fx` | Current position ×100 |
| `target_fx` | Rest/target position ×100 |
| `k_fx` | Spring constant ×10000 (higher = stiffer spring) |

**Returns:** (target - pos) * k / 10000

**Example**

```redscript
let f: int = spring_force(pos, 500, 2000)  // spring toward position 500 with k=0.2
```

---

## `spring_update_v` <Badge type="info" text="Since v1.0.0" />

Update velocity with spring force and damping (one tick).

```redscript
fn spring_update_v(v_fx: int, pos_fx: int, target_fx: int, k_fx: int, damping_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `v_fx` | Current velocity ×100 |
| `pos_fx` | Current position ×100 |
| `target_fx` | Spring rest position ×100 |
| `k_fx` | Spring constant ×10000 |
| `damping_fx` | Damping factor ×10000 (10000=no damping, 8000=some damping) |

**Returns:** New velocity after applying spring force and damping

**Example**

```redscript
vx = spring_update_v(vx, px, target_px, 1000, 9000)
```

---

## `circular_x` <Badge type="info" text="Since v1.0.0" />

Compute X position on a circle given center, radius, and angle.

```redscript
fn circular_x(cx: int, r: int, angle_deg: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `cx` | Circle center X ×100 |
| `r` | Radius ×100 |
| `angle_deg` | Angle in whole degrees (NOT ×10000) |

**Returns:** cx + r * cos(angle_deg) / 1000

**Example**

```redscript
let x: int = circular_x(500, 200, 45)  // point at 45° on radius-2 circle
```

---

## `circular_z` <Badge type="info" text="Since v1.0.0" />

Compute Z position on a circle given center, radius, and angle.

```redscript
fn circular_z(cz: int, r: int, angle_deg: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `cz` | Circle center Z ×100 |
| `r` | Radius ×100 |
| `angle_deg` | Angle in whole degrees (NOT ×10000) |

**Returns:** cz + r * sin(angle_deg) / 1000

**Example**

```redscript
let z: int = circular_z(500, 200, 45)
```

---

## `friction_decel` <Badge type="info" text="Since v1.0.0" />

Apply friction to reduce a velocity component toward zero.

```redscript
fn friction_decel(v_fx: int, friction_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `v_fx` | Current velocity ×100 |
| `friction_fx` | Friction deceleration per tick ×100 (absolute amount subtracted) |

**Returns:** Velocity reduced toward 0 by friction; stops at 0 rather than reversing

**Example**

```redscript
vx = friction_decel(vx, 10)  // slow down by 0.1 blocks/tick per tick
```

---

## `is_grounded` <Badge type="info" text="Since v1.0.0" />

Check whether a position has reached or fallen below the ground level.

```redscript
fn is_grounded(y_fx: int, ground_y_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `y_fx` | Current Y position ×100 |
| `ground_y_fx` | Ground Y level ×100 |

**Returns:** 1 if y_fx <= ground_y_fx (grounded), 0 otherwise

**Example**

```redscript
if (is_grounded(py, 0) == 1) { py = 0; vy = bounce_v(vy, 7000); }
```

---

## `impact_velocity` <Badge type="info" text="Since v1.0.0" />

Estimate the impact velocity after falling from a given height.

```redscript
fn impact_velocity(h_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `h_fx` | Fall height ×100 (blocks × 100, must be positive) |

**Returns:** Approximate impact speed ×100 via integer square root of 2*g*h

**Example**

```redscript
let impact_v: int = impact_velocity(400)  // falling from 4 blocks
```

---
