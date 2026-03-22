# Physics

> 本文档由 `src/stdlib/physics.mcrs` 自动生成，请勿手动编辑。

## API 列表

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

Minecraft 重力常数（定点数，0.08 方块/刻² × 100 = 8）

```redscript
fn gravity_fx(): int
```

**返回：** 8

---

## `air_drag_fx` <Badge type="info" text="Since v1.0.0" />

空气阻力因子（×10000，每刻乘以 0.98）

```redscript
fn air_drag_fx(): int
```

**返回：** 9800

---

## `water_drag_fx` <Badge type="info" text="Since v1.0.0" />

水中阻力因子（×10000，每刻乘以 0.80）

```redscript
fn water_drag_fx(): int
```

**返回：** 8000

---

## `projectile_y` <Badge type="info" text="Since v1.0.0" />

计算抛体在 t 刻后的 Y 轴位置（无阻力，恒定重力）

```redscript
fn projectile_y(p0: int, v0: int, t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `p0` | 初始 Y 位置 ×100 |
| `v0` | 初始 Y 速度 ×100（方块/刻 × 100） |
| `t` | 时间（刻） |

**返回：** p0 + v0*t - gravity*t²/2

**示例**

```redscript
let y: int = projectile_y(0, 200, 5)  // height after 5 ticks, launched at 2 blocks/tick
```

---

## `projectile_x` <Badge type="info" text="Since v1.0.0" />

计算抛体在 t 刻后的水平 X 位置（匀速，无阻力）

```redscript
fn projectile_x(p0: int, v0: int, t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `p0` | 初始 X 位置 ×100 |
| `v0` | 水平 X 速度 ×100 |
| `t` | 时间（刻） |

**返回：** p0 + v0*t

**示例**

```redscript
let x: int = projectile_x(0, 100, 10)  // 10 blocks/tick for 10 ticks = 1000 units
```

---

## `projectile_vy` <Badge type="info" text="Since v1.0.0" />

计算抛体在 t 刻后的 Y 轴速度（含重力）

```redscript
fn projectile_vy(v0: int, t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `v0` | 初始 Y 速度 ×100 |
| `t` | 时间（刻） |

**返回：** v0 - gravity*t

**示例**

```redscript
let vy: int = projectile_vy(200, 5)  // velocity after 5 ticks
```

---

## `projectile_land_t` <Badge type="info" text="Since v1.0.0" />

Estimate the tick at which a projectile launched upward returns to Y=0.

```redscript
fn projectile_land_t(v0y: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `v0y` | Initial upward Y velocity ×100 (must be positive) |

**返回：** 2*v0y / gravity; returns 0 if v0y <= 0

**示例**

```redscript
let land_t: int = projectile_land_t(160)  // ticks until landing
```

---

## `projectile_max_height` <Badge type="info" text="Since v1.0.0" />

Compute the maximum height reached by a projectile launched upward.

```redscript
fn projectile_max_height(v0y: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `v0y` | Initial upward Y velocity ×100 |

**返回：** v0y² / (2*gravity) in ×100 units

**示例**

```redscript
let max_h: int = projectile_max_height(160)  // peak height in units×100
```

---

## `apply_drag` <Badge type="info" text="Since v1.0.0" />

对速度应用一刻的阻力

```redscript
fn apply_drag(v_fx: int, drag_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `v_fx` | 速度 ×100 |
| `drag_fx` | 阻力因子 ×10000（空气 9800，水 8000） |

**返回：** v_fx * drag_fx / 10000

**示例**

```redscript
let v: int = apply_drag(500, air_drag_fx())  // 500 * 0.98 = 490
```

---

## `apply_gravity` <Badge type="info" text="Since v1.0.0" />

对 Y 速度分量应用一刻重力

```redscript
fn apply_gravity(vy_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `vy_fx` | 当前 Y 速度 ×100 |

**返回：** vy_fx - gravity_fx()

**示例**

```redscript
vy = apply_gravity(vy)  // call each tick in your physics loop
```

---

## `update_pos` <Badge type="info" text="Since v1.0.0" />

Update a position component by one tick of velocity.

```redscript
fn update_pos(p_fx: int, v_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `p_fx` | Current position ×100 |
| `v_fx` | Velocity ×100 |

**返回：** p_fx + v_fx

**示例**

```redscript
px = update_pos(px, vx)  // advance X each tick
```

---

## `bounce_v` <Badge type="info" text="Since v1.0.0" />

对速度分量进行弹跳反射（含能量损耗）

```redscript
fn bounce_v(v_fx: int, restitution_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `v_fx` | 速度 ×100 |
| `restitution_fx` | 弹性系数 ×10000（10000=完全弹性，0=完全非弹性） |

**返回：** 反向并缩放后的速度

**示例**

```redscript
vy = bounce_v(vy, 7000)  // 70% energy retained on bounce
```

---

## `clamp_velocity` <Badge type="info" text="Since v1.0.0" />

Clamp a velocity component to a maximum absolute speed.

```redscript
fn clamp_velocity(v_fx: int, max_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `v_fx` | Velocity ×100 to clamp |
| `max_fx` | Maximum absolute velocity ×100 (terminal velocity) |

**返回：** v_fx clamped to [-max_fx, max_fx]

**示例**

```redscript
vx = clamp_velocity(vx, 500)  // cap horizontal speed at 5 blocks/tick
```

---

## `spring_force` <Badge type="info" text="Since v1.0.0" />

计算弹簧力（胡克定律：F = -k*(x-目标)）

```redscript
fn spring_force(pos_fx: int, target_fx: int, k_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `pos_fx` | 当前位置 ×100 |
| `target_fx` | 弹簧平衡位置 ×100 |
| `k_fx` | 弹簧常数 ×10000 |

**返回：** (target - pos) * k / 10000

**示例**

```redscript
let f: int = spring_force(pos, 500, 2000)  // spring toward position 500 with k=0.2
```

---

## `spring_update_v` <Badge type="info" text="Since v1.0.0" />

Update velocity with spring force and damping (one tick).

```redscript
fn spring_update_v(v_fx: int, pos_fx: int, target_fx: int, k_fx: int, damping_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `v_fx` | Current velocity ×100 |
| `pos_fx` | Current position ×100 |
| `target_fx` | Spring rest position ×100 |
| `k_fx` | Spring constant ×10000 |
| `damping_fx` | Damping factor ×10000 (10000=no damping, 8000=some damping) |

**返回：** New velocity after applying spring force and damping

**示例**

```redscript
vx = spring_update_v(vx, px, target_px, 1000, 9000)
```

---

## `circular_x` <Badge type="info" text="Since v1.0.0" />

Compute X position on a circle given center, radius, and angle.

```redscript
fn circular_x(cx: int, r: int, angle_deg: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `cx` | Circle center X ×100 |
| `r` | Radius ×100 |
| `angle_deg` | Angle in whole degrees (NOT ×10000) |

**返回：** cx + r * cos(angle_deg) / 1000

**示例**

```redscript
let x: int = circular_x(500, 200, 45)  // point at 45° on radius-2 circle
```

---

## `circular_z` <Badge type="info" text="Since v1.0.0" />

Compute Z position on a circle given center, radius, and angle.

```redscript
fn circular_z(cz: int, r: int, angle_deg: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `cz` | Circle center Z ×100 |
| `r` | Radius ×100 |
| `angle_deg` | Angle in whole degrees (NOT ×10000) |

**返回：** cz + r * sin(angle_deg) / 1000

**示例**

```redscript
let z: int = circular_z(500, 200, 45)
```

---

## `friction_decel` <Badge type="info" text="Since v1.0.0" />

Apply friction to reduce a velocity component toward zero.

```redscript
fn friction_decel(v_fx: int, friction_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `v_fx` | Current velocity ×100 |
| `friction_fx` | Friction deceleration per tick ×100 (absolute amount subtracted) |

**返回：** Velocity reduced toward 0 by friction; stops at 0 rather than reversing

**示例**

```redscript
vx = friction_decel(vx, 10)  // slow down by 0.1 blocks/tick per tick
```

---

## `is_grounded` <Badge type="info" text="Since v1.0.0" />

Check whether a position has reached or fallen below the ground level.

```redscript
fn is_grounded(y_fx: int, ground_y_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `y_fx` | Current Y position ×100 |
| `ground_y_fx` | Ground Y level ×100 |

**返回：** 1 if y_fx <= ground_y_fx (grounded), 0 otherwise

**示例**

```redscript
if (is_grounded(py, 0) == 1) { py = 0; vy = bounce_v(vy, 7000); }
```

---

## `impact_velocity` <Badge type="info" text="Since v1.0.0" />

Estimate the impact velocity after falling from a given height.

```redscript
fn impact_velocity(h_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `h_fx` | Fall height ×100 (blocks × 100, must be positive) |

**返回：** Approximate impact speed ×100 via integer square root of 2*g*h

**示例**

```redscript
let impact_v: int = impact_velocity(400)  // falling from 4 blocks
```

---
