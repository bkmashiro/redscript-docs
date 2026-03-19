# `ode` — Runge-Kutta ODE Solver

Import: `import "stdlib/ode.mcrs"`

Numerical solver for Ordinary Differential Equations (ODEs) using the **4th-order Runge-Kutta (RK4)** method. RK4 achieves O(h⁴) accuracy per step — far more precise than Euler integration for the same step size — making it the standard choice for smooth physical simulations in datapacks.

State is persisted in the NBT storage namespace `rs:ode` so it survives function call boundaries. All values use a **fixed-point scale of ×10000**: the integer `10000` represents the real value `1.0`, `3679` represents `0.3679`, etc.

## Built-in Systems

| ID | Constant | Equation | Description |
|----|----------|----------|-------------|
| `1` | `ODE_SYSTEM_DECAY` | dy/dt = −k·y | Exponential decay |
| `2` | `ODE_SYSTEM_GROWTH` | dy/dt = +k·y | Exponential growth |
| `3` | *(harmonic)* | y′ = y₂, y₂′ = −k·y − extra·y₂ | Damped harmonic oscillator |

## Quick Example — Exponential Decay

Simulate **dy/dt = −y** (k = 1) with y(0) = 1 and step size h = 0.1 for 10 steps:

```rs
import "stdlib/ode.mcrs";

// system=1 (DECAY), t0=0, y0=1.0, h=0.1, steps=10, k=1.0
// All values in ×10000 fixed-point
ode_run(1, 0, 10000, 1000, 10, 10000);

let t_fx: int = ode_get_t();    // 10000  → t = 1.0
let y_fx: int = ode_get_y();    // ≈ 3679 → y ≈ 0.3679  (exact: e⁻¹ ≈ 0.36788)
```

The exact solution y(t) = e^(−t) gives y(1) ≈ 0.3679. RK4 with h = 0.1 over 10 steps matches to 4+ significant figures.

## API Reference

---

### `ode_run(system_id: int, t0_fx: int, y0_fx: int, h_fx: int, steps: int, k_fx: int)`

Run a scalar ODE system from scratch. Internally calls `ode_reset` then iterates `steps` times with `ode_step`. Designed for single-variable systems (1 and 2).

| Param | Type | Description |
|-------|------|-------------|
| `system_id` | `int` | System identifier (1 = decay, 2 = growth) |
| `t0_fx` | `int` | Initial time in ×10000 fixed-point (e.g. `0` for t=0) |
| `y0_fx` | `int` | Initial y value in ×10000 fixed-point (e.g. `10000` for y=1.0) |
| `h_fx` | `int` | Step size in ×10000 fixed-point (e.g. `1000` for h=0.1) |
| `steps` | `int` | Number of RK4 steps to take |
| `k_fx` | `int` | Rate constant k in ×10000 fixed-point |

**Example:**
```rs
// Decay: dy/dt = -0.5*y, y(0)=2.0, h=0.05, 20 steps → t=1.0
ode_run(1, 0, 20000, 500, 20, 5000);
```

---

### `ode_init(system_id: int, t0_fx: int, y0_fx: int, y20_fx: int, k_fx: int, extra_fx: int)`

Alias for `ode_reset`. Initialize the solver state without running any steps. Use this when you want to step manually with `ode_eval`.

| Param | Type | Description |
|-------|------|-------------|
| `system_id` | `int` | System identifier |
| `t0_fx` | `int` | Initial time (×10000) |
| `y0_fx` | `int` | Initial y (×10000) |
| `y20_fx` | `int` | Initial y₂ (×10000); use `0` for scalar systems |
| `k_fx` | `int` | Rate constant k (×10000) |
| `extra_fx` | `int` | Secondary parameter (×10000); damping coefficient for system 3, unused otherwise |

**Example:**
```rs
// Set up harmonic oscillator: k=4, extra (damping)=0, y(0)=1, y'(0)=0
ode_init(3, 0, 10000, 0, 40000, 0);
```

---

### `ode_eval(h_fx: int)`

Advance the solver by one RK4 step of size `h_fx`. Must be called after `ode_init` or `ode_reset`. For system 3, both y and y₂ are updated simultaneously.

| Param | Type | Description |
|-------|------|-------------|
| `h_fx` | `int` | Step size in ×10000 fixed-point |

**Example:**
```rs
ode_init(1, 0, 10000, 0, 10000, 0);
let i: int = 0;
while (i < 5) {
    ode_eval(1000);   // h = 0.1 per step
    i = i + 1;
}
let y: int = ode_get_y();
```

> **Note:** `ode_eval` is the low-level stepping function. In the source it is implemented as `ode_step`. Use `ode_run` for one-shot simulations.

---

### `ode_get_t(): int`

Return the current time `t` in ×10000 fixed-point.

**Example:**
```rs
let t: int = ode_get_t();   // e.g. 10000 → t = 1.0
```

---

### `ode_get_y(): int`

Return the current primary state variable `y` in ×10000 fixed-point.

**Example:**
```rs
let y: int = ode_get_y();   // e.g. 3679 → y ≈ 0.3679
```

---

### `ode_deriv(system_id: int, t_fx: int, y_fx: int, y2_fx: int, k_fx: int, extra_fx: int): int`

Evaluate the derivative dy/dt for the given system at the given point, without advancing the solver state. Useful for checking derivatives or building custom integrators.

Maps to `ode_eval_y` in the source.

| Param | Type | Description |
|-------|------|-------------|
| `system_id` | `int` | System identifier |
| `t_fx` | `int` | Time (×10000) |
| `y_fx` | `int` | Primary variable y (×10000) |
| `y2_fx` | `int` | Secondary variable y₂ (×10000); use `0` for scalar systems |
| `k_fx` | `int` | Rate constant (×10000) |
| `extra_fx` | `int` | Extra parameter (×10000) |

**Returns:** dy/dt in ×10000 fixed-point.

**Example:**
```rs
// At t=0, y=10000 (=1.0), k=10000 (=1.0): dy/dt = -1.0 → -10000
let deriv: int = ode_deriv(1, 0, 10000, 0, 10000, 0);
```

---

## Additional Functions

| Function | Description |
|----------|-------------|
| `ode_get_y2(): int` | Secondary state variable y₂ (e.g. velocity in system 3) |
| `ode_get_steps(): int` | Total number of steps taken since last reset |
| `ode_run2(system_id, t0, y0, y20, h, steps, k, extra)` | Two-variable variant of `ode_run` (for system 3) |

---

## Notes & Limitations

- **Fixed-point scale:** All inputs and outputs use ×10000. Real value `v` becomes integer `v * 10000`. Forgetting this will give wildly wrong results.
- **Global state:** There is a single solver state in `rs:ode` storage. Concurrent simulations are not possible — save and restore state manually if needed.
- **System 3 only via `ode_run2`:** `ode_run` zeroes y₂ and `extra`. For a damped oscillator, use `ode_run2` or `ode_init` + `ode_eval`.
- **Step size accuracy:** Smaller h gives higher accuracy at the cost of more steps. h = 0.1 (1000 fx) is typically a good default.
- **Integer overflow:** Very large values of y, k, or many steps can overflow the ×10000 arithmetic. Keep intermediate values well within the `int` range.
