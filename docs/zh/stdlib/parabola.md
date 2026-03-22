# Parabola

> 本文档由 `src/stdlib/parabola.mcrs` 自动生成，请勿手动编辑。

## API 列表

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

每 tick 的 Minecraft 重力加速度（×10000，固定为 800）

```redscript
fn parabola_gravity(): int
```

**返回：** 800

---

## `parabola_gravity_half` <Badge type="info" text="Since v2.0.0" />

每 tick 重力加速度的一半（用于位移公式）

```redscript
fn parabola_gravity_half(): int
```

**返回：** 400

---

## `parabola_vx` <Badge type="info" text="Since v2.0.0" />

计算在 ticks 个 tick 内水平移动 dx 格所需的初始 X 速度（×10000）

```redscript
fn parabola_vx(dx: int, ticks: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `dx` | X 方向位移（格） |
| `ticks` | 飞行时间（tick） |

**返回：** 初始 X 速度 ×10000；ticks ≤ 0 时返回 0

**示例**

```redscript
let vx: int = parabola_vx(10, 20)
```

---

## `parabola_vy` <Badge type="info" text="Since v2.0.0" />

计算在 ticks 个 tick 内垂直移动 dy 格所需的初始 Y 速度（×10000）

```redscript
fn parabola_vy(dy: int, ticks: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `dy` | 垂直位移（格，正值向上） |
| `ticks` | 飞行时间（tick） |

**返回：** 初始 Y 速度 ×10000；ticks ≤ 0 时返回 0

**示例**

```redscript
let vy: int = parabola_vy(5, 20)
```

---

## `parabola_vz` <Badge type="info" text="Since v2.0.0" />

计算在 ticks 个 tick 内水平移动 dz 格所需的初始 Z 速度（×10000）

```redscript
fn parabola_vz(dz: int, ticks: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `dz` | Z 方向位移（格） |
| `ticks` | 飞行时间（tick） |

**返回：** 初始 Z 速度 ×10000；ticks ≤ 0 时返回 0

---

## `parabola_speed_xz` <Badge type="info" text="Since v2.0.0" />

计算到达 (dx, dz) 所需的水平速度大小（×10000）

```redscript
fn parabola_speed_xz(dx: int, dz: int, ticks: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `dx` | X 位移（格） |
| `dz` | Z 位移（格） |
| `ticks` | 飞行时间（tick） |

**返回：** 水平发射速度 ×10000；ticks ≤ 0 时返回 0

---

## `parabola_x` <Badge type="info" text="Since v2.0.0" />

在 t tick 时的 X 位置（格）

```redscript
fn parabola_x(vx0: int, t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `vx0` | 初始 X 速度 ×10000 |
| `t` | 已过 tick 数 |

**返回：** X 位移（格）

---

## `parabola_y` <Badge type="info" text="Since v2.0.0" />

在 t tick 时的 Y 位置（格）

```redscript
fn parabola_y(vy0: int, t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `vy0` | 初始 Y 速度 ×10000 |
| `t` | 已过 tick 数 |

**返回：** Y 位移（格，正值向上）

---

## `parabola_z` <Badge type="info" text="Since v2.0.0" />

在 t tick 时的 Z 位置（格）

```redscript
fn parabola_z(vz0: int, t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `vz0` | 初始 Z 速度 ×10000 |
| `t` | 已过 tick 数 |

**返回：** Z 位移（格）

---

## `parabola_flight_time` <Badge type="info" text="Since v2.0.0" />

估算抛体返回发射高度时的 tick 数

```redscript
fn parabola_flight_time(vy0: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `vy0` | 初始 Y 速度 ×10000 |

**返回：** 飞行时间（tick）；vy0 ≤ 0 时返回 0

**示例**

```redscript
let t: int = parabola_flight_time(8000)
```

---

## `parabola_max_height` <Badge type="info" text="Since v2.0.0" />

抛体高出发射点的最大高度（格）

```redscript
fn parabola_max_height(vy0: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `vy0` | 初始 Y 速度 ×10000 |

**返回：** 顶点高度（格）；vy0 ≤ 0 时返回 0

**示例**

```redscript
let h: int = parabola_max_height(8000)
```

---

## `parabola_step_vx` <Badge type="info" text="Since v2.0.0" />

对 X 速度施加一 tick 阻力

```redscript
fn parabola_step_vx(vx: int, drag: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `vx` | 当前 X 速度 ×10000 |
| `drag` | 阻力系数 ×10000（如 9900 = 0.99 箭矢） |

**返回：** 新 X 速度 ×10000

---

## `parabola_step_vy` <Badge type="info" text="Since v2.0.0" />

对 Y 速度先施加重力再施加阻力（一 tick）

```redscript
fn parabola_step_vy(vy: int, drag: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `vy` | 当前 Y 速度 ×10000 |
| `drag` | 阻力系数 ×10000 |

**返回：** 新 Y 速度 ×10000

---

## `parabola_step_vz` <Badge type="info" text="Since v2.0.0" />

对 Z 速度施加一 tick 阻力

```redscript
fn parabola_step_vz(vz: int, drag: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `vz` | 当前 Z 速度 ×10000 |
| `drag` | 阻力系数 ×10000 |

**返回：** 新 Z 速度 ×10000

---

## `parabola_ticks_for_range` <Badge type="info" text="Since v2.0.0" />

根据水平距离估算飞行 tick 数（启发式，约 0.8 格/tick 水平速度）

```redscript
fn parabola_ticks_for_range(range: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `range` | 水平距离（格） |

**返回：** 估算 tick 数（最小为 1）

---

## `parabola_in_range` <Badge type="info" text="Since v2.0.0" />

检查目标是否在水平射程内

```redscript
fn parabola_in_range(dx: int, dz: int, max_range: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `dx` | 到目标的 X 位移（格） |
| `dz` | 到目标的 Z 位移（格） |
| `max_range` | 最大射程（格） |

**返回：** dist(dx,dz) ≤ max_range 返回 1，否则返回 0

---
