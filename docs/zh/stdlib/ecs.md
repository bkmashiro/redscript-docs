# Ecs

> 本文档由 `src/stdlib/ecs.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [ecs_registry_new](#ecs-registry-new)
- [ecs_register](#ecs-register)
- [ecs_is_registered](#ecs-is-registered)
- [ecs_health_init](#ecs-health-init)
- [ecs_health_get](#ecs-health-get)
- [ecs_health_max](#ecs-health-max)
- [ecs_health_set](#ecs-health-set)
- [ecs_health_damage](#ecs-health-damage)
- [ecs_health_heal](#ecs-health-heal)
- [ecs_health_is_dead](#ecs-health-is-dead)
- [ecs_health_pct](#ecs-health-pct)
- [ecs_vel_init](#ecs-vel-init)
- [ecs_vel_get_x](#ecs-vel-get-x)
- [ecs_vel_get_y](#ecs-vel-get-y)
- [ecs_vel_get_z](#ecs-vel-get-z)
- [ecs_vel_set](#ecs-vel-set)
- [ecs_vel_speed](#ecs-vel-speed)
- [ecs_vel_apply_gravity](#ecs-vel-apply-gravity)
- [ecs_vel_damp](#ecs-vel-damp)

---

## `ecs_registry_new` <Badge type="info" text="v2.0.0" />

分配一个全零的 16 槽组件注册表

```redscript
fn ecs_registry_new(): int[]
```

**返回：** 长度为 16 的 int[]，所有槽位为 0

**示例**

```redscript
let reg: int[] = ecs_registry_new()
```

---

## `ecs_register` <Badge type="info" text="v2.0.0" />

在注册表中标记 comp_id 为已注册，并返回更新后的注册表

```redscript
fn ecs_register(reg: int[], comp_id: int): int[]
```

**参数**

| 参数 | 说明 |
|------|------|
| `reg` | 来自 ecs_registry_new 的注册表数组 |
| `comp_id` | 组件类型 ID（0–15） |

**返回：** 更新后的注册表数组

**示例**

```redscript
reg = ecs_register(reg, ECS_COMP_HEALTH)
```

---

## `ecs_is_registered` <Badge type="info" text="v2.0.0" />

检查 comp_id 是否已注册

```redscript
fn ecs_is_registered(reg: int[], comp_id: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `reg` | 来自 ecs_registry_new 的注册表数组 |
| `comp_id` | 组件类型 ID（0–15） |

**返回：** 已注册返回 1，否则返回 0

**示例**

```redscript
if (ecs_is_registered(reg, ECS_COMP_HEALTH) == 1) { }
```

---

## `ecs_health_init` <Badge type="info" text="v2.0.0" />

创建血量为满血的 Health 组件状态

```redscript
fn ecs_health_init(entity_score: int, max_hp: int): int[]
```

**参数**

| 参数 | 说明 |
|------|------|
| `entity_score` | 用于标识实体的计分板得分 |
| `max_hp` | 最大生命值 |

**返回：** 长度为 8 的 Health 组件状态数组

**示例**

```redscript
let hp: int[] = ecs_health_init(42, 100)
```

---

## `ecs_health_get` <Badge type="info" text="v2.0.0" />

从 Health 组件状态中返回当前 HP

```redscript
fn ecs_health_get(state: int[]): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `state` | 来自 ecs_health_init 的状态数组 |

**返回：** 当前生命值

**示例**

```redscript
let hp: int = ecs_health_get(state)
```

---

## `ecs_health_max` <Badge type="info" text="v2.0.0" />

从 Health 组件状态中返回最大 HP

```redscript
fn ecs_health_max(state: int[]): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `state` | 来自 ecs_health_init 的状态数组 |

**返回：** 最大生命值

**示例**

```redscript
let max: int = ecs_health_max(state)
```

---

## `ecs_health_set` <Badge type="info" text="v2.0.0" />

设置当前 HP（钳制到 [0, max]）并返回更新后的状态

```redscript
fn ecs_health_set(state: int[], hp: int): int[]
```

**参数**

| 参数 | 说明 |
|------|------|
| `state` | Health 组件状态 |
| `hp` | 新的生命值（自动钳制到有效范围） |

**返回：** 更新后的状态数组

**示例**

```redscript
state = ecs_health_set(state, 50)
```

---

## `ecs_health_damage` <Badge type="info" text="v2.0.0" />

扣除 HP（钳制到 0）并返回更新后的状态

```redscript
fn ecs_health_damage(state: int[], amount: int): int[]
```

**参数**

| 参数 | 说明 |
|------|------|
| `state` | Health 组件状态 |
| `amount` | 扣除量（正整数） |

**返回：** 更新后的状态数组

**示例**

```redscript
state = ecs_health_damage(state, 30)
```

---

## `ecs_health_heal` <Badge type="info" text="v2.0.0" />

恢复 HP（钳制到最大值）并返回更新后的状态

```redscript
fn ecs_health_heal(state: int[], amount: int): int[]
```

**参数**

| 参数 | 说明 |
|------|------|
| `state` | Health 组件状态 |
| `amount` | 恢复量（正整数） |

**返回：** 更新后的状态数组

**示例**

```redscript
state = ecs_health_heal(state, 20)
```

---

## `ecs_health_is_dead` <Badge type="info" text="v2.0.0" />

判断实体 HP 是否归零

```redscript
fn ecs_health_is_dead(state: int[]): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `state` | Health 组件状态 |

**返回：** HP <= 0 返回 1，存活返回 0

**示例**

```redscript
if (ecs_health_is_dead(state) == 1) { /* handle death */ }
```

---

## `ecs_health_pct` <Badge type="info" text="v2.0.0" />

以 ×10000 定点数返回 HP 百分比（5000 = 50.00%）

```redscript
fn ecs_health_pct(state: int[]): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `state` | Health 组件状态 |

**返回：** current_hp * 10000 / max_hp；max_hp 为 0 时返回 0

**示例**

```redscript
let pct: int = ecs_health_pct(state)
```

---

## `ecs_vel_init` <Badge type="info" text="v2.0.0" />

创建具有给定初始速度的速度组件状态

```redscript
fn ecs_vel_init(vx: int, vy: int, vz: int): int[]
```

**参数**

| 参数 | 说明 |
|------|------|
| `vx` | X 方向速度 ×1000（1000 = 1.0 格/tick） |
| `vy` | Y 方向速度 ×1000 |
| `vz` | Z 方向速度 ×1000 |

**返回：** 长度为 8 的速度组件状态数组

**示例**

```redscript
let vel: int[] = ecs_vel_init(1000, 0, 500)
```

---

## `ecs_vel_get_x` <Badge type="info" text="v2.0.0" />

从速度组件状态中返回 X 速度

```redscript
fn ecs_vel_get_x(state: int[]): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `state` | 速度组件状态 |

**返回：** X 速度 ×1000

---

## `ecs_vel_get_y` <Badge type="info" text="v2.0.0" />

从速度组件状态中返回 Y 速度

```redscript
fn ecs_vel_get_y(state: int[]): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `state` | 速度组件状态 |

**返回：** Y 速度 ×1000

---

## `ecs_vel_get_z` <Badge type="info" text="v2.0.0" />

从速度组件状态中返回 Z 速度

```redscript
fn ecs_vel_get_z(state: int[]): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `state` | 速度组件状态 |

**返回：** Z 速度 ×1000

---

## `ecs_vel_set` <Badge type="info" text="v2.0.0" />

设置所有速度分量并返回更新后的状态

```redscript
fn ecs_vel_set(state: int[], vx: int, vy: int, vz: int): int[]
```

**参数**

| 参数 | 说明 |
|------|------|
| `state` | 速度组件状态 |
| `vx` | 新 X 速度 ×1000 |
| `vy` | 新 Y 速度 ×1000 |
| `vz` | 新 Z 速度 ×1000 |

**返回：** 更新后的状态数组

**示例**

```redscript
state = ecs_vel_set(state, 500, 1200, 0)
```

---

## `ecs_vel_speed` <Badge type="info" text="v2.0.0" />

返回速度向量的模（sqrt(vx²+vy²+vz²)）×1000

```redscript
fn ecs_vel_speed(state: int[]): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `state` | 速度组件状态 |

**返回：** 速度大小 ×1000

**示例**

```redscript
let speed: int = ecs_vel_speed(vel_state)
```

---

## `ecs_vel_apply_gravity` <Badge type="info" text="v2.0.0" />

每 tick 将 Y 速度减去重力加速度

```redscript
fn ecs_vel_apply_gravity(state: int[], gravity_fx: int): int[]
```

**参数**

| 参数 | 说明 |
|------|------|
| `state` | 速度组件状态 |
| `gravity_fx` | 重力加速度 ×1000（如 980 ≈ 0.98 格/tick²） |

**返回：** 更新后的状态数组

**示例**

```redscript
vel_state = ecs_vel_apply_gravity(vel_state, 980)
```

---

## `ecs_vel_damp` <Badge type="info" text="v2.0.0" />

对所有速度分量乘以阻力系数

```redscript
fn ecs_vel_damp(state: int[], factor_fx: int): int[]
```

**参数**

| 参数 | 说明 |
|------|------|
| `state` | 速度组件状态 |
| `factor_fx` | 阻力系数 ×10000（如 8000 = 0.80 倍衰减） |

**返回：** 更新后的状态数组

**示例**

```redscript
vel_state = ecs_vel_damp(vel_state, 9000)
```

---
