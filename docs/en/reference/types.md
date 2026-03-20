# Type System Guide

RedScript has four numeric types. Choosing the right one is important — mixing them requires explicit casts and the compiler will reject implicit coercions.

## The Four Numeric Types

| Type | Backing | Range | Fractions | Use case |
|------|---------|-------|-----------|----------|
| `int` | Scoreboard (32-bit signed) | ±2,147,483,647 | No | Default for most values |
| `fixed` | Scoreboard × 10000 | ±214,748 | 4 decimal places | Fractional math |
| `double` | NBT IEEE 754 double | ±1.8 × 10³⁰⁸ | Full precision | High-precision / scientific |
| `float` | *(deprecated)* | same as `fixed` | less precise | **Avoid — use `fixed` instead** |

### `int`

An ordinary 32-bit signed integer backed by a scoreboard entry. No fractional part. This is the default for counters, health, levels, and anything that doesn't need decimals.

```rs
let score: int = 42;
let health: int = 20;
```

### `fixed`

A fixed-point number stored as an integer × 10000. The value `10000` represents `1.0`, `5000` represents `0.5`, `-7071` represents `≈ −0.7071`.

- Range: ±214,748 (i.e. ±2,147,483,647 / 10,000)
- Precision: exactly 4 decimal places

Use `fixed` whenever you need fractional values for in-game math — velocity, percentages, angles, etc.

```rs
let speed: fixed = 1.5;       // stored as 15000 internally
let ratio: fixed = 0.25;      // stored as 2500 internally

// After multiplying two fixed values, divide by 10000 to compensate for double-scaling
let a: fixed = 0.5;   // 5000
let b: fixed = 0.4;   // 4000
// naive: a * b = 20000000, which represents 2000.0 — WRONG
// correct: use mulfix() from stdlib
import "stdlib/math"
let result: fixed = mulfix(a, b);   // = 0.2 (2000)
```

> **Multiplication compensation:** When multiplying two `fixed` values directly, the result is scaled by 10000². Use the `mulfix(a, b)` stdlib function which automatically divides by 10000 after multiplying.

### `double`

An IEEE 754 double-precision float backed by NBT. Full precision (~15 significant digits). Heavier than `fixed` because it reads/writes NBT instead of scoreboards.

Use `double` only when you need scientific precision or are using `stdlib/math_hp` (high-precision trig/log).

```rs
let angle: double = 45.0 as double;
import "stdlib/math_hp"
let s: int = sin_hp(450000);   // sin_hp works with int (degrees × 10000), returns int × 10000
```

### `float` (Deprecated)

`float` is an alias for `fixed` left over from older versions. It is less precise and will trigger a `[FloatArithmetic]` warning. **Do not use `float` in new code.**

---

## Explicit Casts

There are **no implicit numeric conversions**. The compiler will reject mixing types without an explicit cast.

```rs
// Syntax: <expr> as <type>
let x: int   = 42;
let f: fixed = x as fixed;   // int → fixed (value × 10000)
let d: double = x as double; // int → double
let back: int = f as int;    // fixed → int (value ÷ 10000, truncated)
```

Cast semantics:

| From → To | What happens |
|-----------|-------------|
| `int` → `fixed` | multiplies by 10000 |
| `int` → `double` | exact promotion |
| `fixed` → `int` | divides by 10000 (truncates fraction) |
| `fixed` → `double` | divides by 10000, stores in NBT |
| `double` → `int` | truncates to integer |
| `double` → `fixed` | multiplies by 10000, stores in scoreboard |

---

## When to Use Each Type

| Situation | Recommended type |
|-----------|-----------------|
| Counters, health, levels, ticks | `int` |
| Velocities, percentages, angles | `fixed` |
| Scientific computation, high-precision trig | `double` + `stdlib/math_hp` |
| Anything labeled `float` | Refactor to `fixed` |

**Rule of thumb:** Default to `int`. Upgrade to `fixed` when you need fractions. Only reach for `double` when `fixed` precision (4 decimal places) isn't enough.

---

## Common Mistakes

### Mixing `int` and `fixed` without a cast

```rs
let score: int = 10;
let multiplier: fixed = 1.5;

// ❌ TypeError: type mismatch — cannot implicitly convert fixed to int
//    (use an explicit cast: 'as fixed')
let result: int = score + multiplier;

// ✅ Cast first
let result: int = (score as fixed + multiplier) as int;
```

### Forgetting to compensate after `fixed` multiplication

```rs
// ❌ Wrong: direct multiplication double-scales
let a: fixed = 2.0;   // 20000
let b: fixed = 3.0;   // 30000
let bad: fixed = a * b;   // 600000000 — represents 60000.0, not 6.0

// ✅ Correct: use mulfix
import "stdlib/math"
let good: fixed = mulfix(a, b);   // 60000 — represents 6.0
```

### Using `float` in arithmetic

```rs
// ❌ Triggers [FloatArithmetic] warning; float is deprecated
let x: float = 1.5;
let y: float = x * 2.0;

// ✅ Use fixed instead
let x: fixed = 1.5;
let y: fixed = mulfix(x, 2.0);
```

### String concatenation with `+`

```rs
// ❌ [StringConcat] error — + is not supported for strings
let msg: string = "Score: " + score;

// ✅ Use an f-string
say(f"Score: {score}");
tell(@s, f"Your health: {health}");
```

---

## Full Example: Velocity Calculation

```rs
import "stdlib/math"

fn tick_physics(vx: fixed, vy: fixed, drag: fixed): (fixed, fixed) {
    // Apply drag: multiply velocity by drag coefficient
    let new_vx: fixed = mulfix(vx, drag);
    let new_vy: fixed = mulfix(vy, drag);
    return (new_vx, new_vy);
}

fn show_speed(vx: fixed, vy: fixed) {
    // Convert to int for display (drops fraction)
    let speed_int: int = vx as int;
    tell(@s, f"Speed X: {speed_int}");
}
```
