# Ode

> 本文档由 `src/stdlib/ode.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [ode_mul_fx](#ode-mul-fx)
- [ode_weighted_increment](#ode-weighted-increment)
- [ode_reset](#ode-reset)
- [ode_get_system](#ode-get-system)
- [ode_get_t](#ode-get-t)
- [ode_get_y](#ode-get-y)
- [ode_get_y2](#ode-get-y2)
- [ode_get_k](#ode-get-k)
- [ode_get_extra](#ode-get-extra)
- [ode_get_steps](#ode-get-steps)
- [ode_step](#ode-step)
- [ode_run](#ode-run)
- [ode_run2](#ode-run2)

---

## `ode_mul_fx` <Badge type="info" text="v2.0.0" />

定点数乘法：a_fx * b_fx / 10000

```redscript
fn ode_mul_fx(a_fx: int, b_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a_fx` | 第一个操作数 ×10000 |
| `b_fx` | 第二个操作数 ×10000 |

**返回：** 乘积（×10000）

---

## `ode_weighted_increment` <Badge type="info" text="v2.0.0" />

计算 RK4 加权增量：h * (k1 + 2k2 + 2k3 + k4) / 6

```redscript
fn ode_weighted_increment(h_fx: int, deriv_sum_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `h_fx` | 步长 ×10000 |
| `deriv_sum_fx` | k1 + 2k2 + 2k3 + k4，×10000 |

**返回：** 加权增量 ×10000

---

## `ode_reset` <Badge type="info" text="v2.0.0" />

在 storage rs:ode 中初始化 ODE 模块状态

```redscript
fn ode_reset(system_id: int, t_fx: int, y_fx: int, y2_fx: int, k_fx: int, extra_fx: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `system_id` | 内置系统常量（1=衰减，2=增长，3=振荡器） |
| `t_fx` | 初始时间 ×10000 |
| `y_fx` | 初始主变量 y(0) ×10000 |
| `y2_fx` | 初始次变量 y'(0) ×10000（仅 system 3 使用） |
| `k_fx` | 速率/弹性常数 ×10000 |
| `extra_fx` | 阻尼系数 ×10000（仅 system 3 使用） |

**示例**

```redscript
ode_reset(1, 0, 10000, 0, 10000, 0)
```

---

## `ode_get_system` <Badge type="info" text="v2.0.0" />

返回 ODE 状态中的系统 ID

```redscript
fn ode_get_system(): int
```

**返回：** 槽位 0 中存储的系统 ID

---

## `ode_get_t` <Badge type="info" text="v2.0.0" />

返回当前时间 t（×10000）

```redscript
fn ode_get_t(): int
```

**返回：** 当前时间 ×10000

---

## `ode_get_y` <Badge type="info" text="v2.0.0" />

返回当前主变量 y（×10000）

```redscript
fn ode_get_y(): int
```

**返回：** 当前 y 值 ×10000

---

## `ode_get_y2` <Badge type="info" text="v2.0.0" />

返回当前次变量 y'（×10000，仅对 system 3 有意义）

```redscript
fn ode_get_y2(): int
```

**返回：** 当前 y' 值 ×10000

---

## `ode_get_k` <Badge type="info" text="v2.0.0" />

返回速率常数 k（×10000）

```redscript
fn ode_get_k(): int
```

**返回：** 速率常数 ×10000

---

## `ode_get_extra` <Badge type="info" text="v2.0.0" />

返回额外参数（×10000，system 3 中表示阻尼）

```redscript
fn ode_get_extra(): int
```

**返回：** 额外参数 ×10000

---

## `ode_get_steps` <Badge type="info" text="v2.0.0" />

返回已执行的步数

```redscript
fn ode_get_steps(): int
```

**返回：** 步数（普通整数）

---

## `ode_step` <Badge type="info" text="v2.0.0" />

向前推进一个 RK4 步

```redscript
fn ode_step(h_fx: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `h_fx` | 步长 ×10000（如 1000 = 0.1 时间单位） |

---

## `ode_run` <Badge type="info" text="v2.0.0" />

对标量 ODE 系统执行 steps 步 RK4 积分

```redscript
fn ode_run(system_id: int, t0_fx: int, y0_fx: int, h_fx: int, steps: int, k_fx: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `system_id` | 内置系统常量（1 或 2 用于标量系统） |
| `t0_fx` | 初始时间 ×10000 |
| `y0_fx` | 初始 y 值 ×10000 |
| `h_fx` | 步长 ×10000 |
| `steps` | RK4 步数 |
| `k_fx` | 速率常数 ×10000 |

**示例**

```redscript
ode_run(1, 0, 10000, 1000, 10, 10000)
let y: int = ode_get_y()
```

---

## `ode_run2` <Badge type="info" text="v2.0.0" />

对二维 ODE 系统（如谐振子）执行 steps 步 RK4 积分

```redscript
fn ode_run2(system_id: int, t0_fx: int, y0_fx: int, y20_fx: int, h_fx: int, steps: int, k_fx: int, extra_fx: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `system_id` | 内置系统常量（system 3 = 谐振子） |
| `t0_fx` | 初始时间 ×10000 |
| `y0_fx` | 初始 y 值 ×10000 |
| `y20_fx` | 初始 y' 值 ×10000 |
| `h_fx` | 步长 ×10000 |
| `steps` | RK4 步数 |
| `k_fx` | 弹性常数 ×10000 |
| `extra_fx` | 阻尼系数 ×10000 |

**示例**

```redscript
ode_run2(3, 0, 10000, 0, 1000, 20, 10000, 500)
```

---
