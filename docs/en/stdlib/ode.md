# Ode

> Auto-generated from `src/stdlib/ode.mcrs` — do not edit manually.

## API

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

Fixed-point multiplication: `a_fx * b_fx / 10000`.

```redscript
fn ode_mul_fx(a_fx: int, b_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a_fx` | First operand ×10000 |
| `b_fx` | Second operand ×10000 |

**Returns:** Product in ×10000 scale

---

## `ode_weighted_increment` <Badge type="info" text="v2.0.0" />

Compute the RK4 weighted increment: `h * (k1 + 2k2 + 2k3 + k4) / 6`.

All values are ×10000. The divisor 60000 = 6 × 10000.

```redscript
fn ode_weighted_increment(h_fx: int, deriv_sum_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `h_fx` | Step size ×10000 |
| `deriv_sum_fx` | `k1 + 2k2 + 2k3 + k4` in ×10000 |

**Returns:** Weighted increment in ×10000

---

## `ode_reset` <Badge type="info" text="v2.0.0" />

Initialise the ODE module state in `storage rs:ode`.

```redscript
fn ode_reset(system_id: int, t_fx: int, y_fx: int, y2_fx: int, k_fx: int, extra_fx: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `system_id` | Built-in system constant (1=decay, 2=growth, 3=oscillator) |
| `t_fx` | Initial time ×10000 |
| `y_fx` | Initial primary variable y(0) ×10000 |
| `y2_fx` | Initial secondary variable y'(0) ×10000 (for system 3) |
| `k_fx` | Rate/spring constant ×10000 |
| `extra_fx` | Damping coefficient ×10000 (for system 3) |

**Example**

```redscript
ode_reset(1, 0, 10000, 0, 10000, 0)
```

---

## `ode_get_system` <Badge type="info" text="v2.0.0" />

Return the current system ID from ODE state.

```redscript
fn ode_get_system(): int
```

**Returns:** System ID stored in slot 0

---

## `ode_get_t` <Badge type="info" text="v2.0.0" />

Return the current time `t` from ODE state (×10000).

```redscript
fn ode_get_t(): int
```

**Returns:** Current time ×10000

---

## `ode_get_y` <Badge type="info" text="v2.0.0" />

Return the current primary variable `y` from ODE state (×10000).

```redscript
fn ode_get_y(): int
```

**Returns:** Current y value ×10000

---

## `ode_get_y2` <Badge type="info" text="v2.0.0" />

Return the current secondary variable `y'` from ODE state (×10000).

```redscript
fn ode_get_y2(): int
```

**Returns:** Current y' value ×10000 (meaningful for system 3 only)

---

## `ode_get_k` <Badge type="info" text="v2.0.0" />

Return the rate constant `k` from ODE state (×10000).

```redscript
fn ode_get_k(): int
```

**Returns:** Rate constant ×10000

---

## `ode_get_extra` <Badge type="info" text="v2.0.0" />

Return the extra parameter from ODE state (×10000).

```redscript
fn ode_get_extra(): int
```

**Returns:** Extra parameter ×10000 (damping for system 3)

---

## `ode_get_steps` <Badge type="info" text="v2.0.0" />

Return the number of steps taken so far.

```redscript
fn ode_get_steps(): int
```

**Returns:** Step count (plain integer)

---

## `ode_step` <Badge type="info" text="v2.0.0" />

Advance the ODE state by one RK4 step of size `h_fx`.

Updates time `t`, primary variable `y` (and `y2` for system 3), and
increments the step counter in `storage rs:ode`.

```redscript
fn ode_step(h_fx: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `h_fx` | Step size ×10000 (e.g. `1000` = 0.1 time unit) |

---

## `ode_run` <Badge type="info" text="v2.0.0" />

Run `steps` RK4 steps of a scalar ODE system and store results in module state.

Built-in systems: `1` = exponential decay (`dy/dt = -k·y`),
`2` = exponential growth (`dy/dt = k·y`).

```redscript
fn ode_run(system_id: int, t0_fx: int, y0_fx: int, h_fx: int, steps: int, k_fx: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `system_id` | Built-in system constant (1 or 2 for scalar systems) |
| `t0_fx` | Initial time ×10000 |
| `y0_fx` | Initial y value ×10000 |
| `h_fx` | Step size ×10000 |
| `steps` | Number of RK4 steps to execute |
| `k_fx` | Rate constant ×10000 |

**Example**

```redscript
ode_run(1, 0, 10000, 1000, 10, 10000)
let y: int = ode_get_y()
```

---

## `ode_run2` <Badge type="info" text="v2.0.0" />

Run `steps` RK4 steps of a 2D ODE system (e.g. harmonic oscillator).

Built-in system 3: `y' = y2`, `y2' = -k·y - extra·y2`.

```redscript
fn ode_run2(system_id: int, t0_fx: int, y0_fx: int, y20_fx: int, h_fx: int, steps: int, k_fx: int, extra_fx: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `system_id` | Built-in system constant (use `3` for harmonic oscillator) |
| `t0_fx` | Initial time ×10000 |
| `y0_fx` | Initial y value ×10000 |
| `y20_fx` | Initial y' value ×10000 |
| `h_fx` | Step size ×10000 |
| `steps` | Number of RK4 steps to execute |
| `k_fx` | Spring constant ×10000 |
| `extra_fx` | Damping coefficient ×10000 |

**Example**

```redscript
ode_run2(3, 0, 10000, 0, 1000, 20, 10000, 500)
```

---
