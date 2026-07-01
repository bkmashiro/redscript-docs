# Type System Guide

RedScript has four numeric types. Choosing the right one is important — mixing them requires explicit casts and the compiler will reject implicit coercions.

## The Four Numeric Types

| Type | Backing | Range | Fractions | Use case |
|------|---------|-------|-----------|----------|
| `int` | Scoreboard (32-bit signed) | ±2,147,483,647 | No | Default for most values |
| `fixed` | Scoreboard × 10000 | ±214,748 | 4 decimal places | Fractional math |
| `double` | NBT IEEE 754 double | ±1.8 × 10³⁰⁸ | Full precision | High-precision / scientific |
| `float` | *(deprecated alias)* | same as `fixed` | same | **Avoid — use `fixed` instead** |

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

let a: fixed = 0.5;   // 5000
let b: fixed = 0.4;   // 4000
let result: fixed = a * b;   // = 0.2 (2000)
let inv: fixed = a / b;      // = 1.25 (12500)
```

> **Language fixed arithmetic:** `fixed * fixed` and `fixed / fixed` are lowered in the compiler with `×10000` compensation; no `mulfix`/`divfix` call is needed for ordinary language arithmetic.

### Legacy `math.mcrs` helpers (`×1000` scale)

Some helpers in `math.mcrs` use scale-specific integer semantics and are named for compatibility (for example `sin_fixed`, `cos_fixed`, `sqrt_fixed`, `mulfix`, `divfix`, `smoothstep`, and `smootherstep`).

These are **not** language-level `fixed` operations. Prefer explicit scale-aware forms such as `sin_fx1000`, `cos_fx1000`, `sqrt_fx1000`, `mul_fx1000`, `div_fx1000`, `smoothstep_t1000`, and `smootherstep_t1000` when using that family.

### `double`

An IEEE 754 double-precision float backed by NBT. Full precision (~15 significant digits). Heavier than `fixed` because it reads/writes NBT instead of scoreboards.

Use `double` only when you need scientific precision or are using `stdlib/math_hp` (high-precision trig/log).

```rs
let angle: double = 45.0 as double;
import "stdlib/math_hp"
let s: int = sin_hp(450000);   // sin_hp works with int (degrees × 10000), returns int × 10000
```

### `float` (Deprecated)

`float` is a deprecated alias for `fixed` retained for backward compatibility. New examples should use `fixed`.

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

### Legacy `×1000` helper confusion

```rs
// ⚠️ This is *not* language-level fixed-point math.
// These helpers use integer ×1000 conventions and scale at helper boundaries.
import "stdlib/math"
let trig_component: int = sin_fx1000(500);      // 0.5 ×1000 input
let legacy_interp: int = mul_fx1000(500, 250);  // = 125 (0.125 ×1000)

// For language `fixed`, use normal operators:
let a: fixed = 2.0;   // 20000
let b: fixed = 3.0;   // 30000
let good: fixed = a * b;   // 60000 — represents 6.0
```

### Using `float` in arithmetic

```rs
// ❌ Triggers [FloatArithmetic] warning; float is deprecated
let x: float = 1.5;
let y: float = x * 2.0;

// ✅ Use fixed instead
let x: fixed = 1.5;
let y: fixed = x * 2.0;
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
fn tick_physics(vx: fixed, vy: fixed, drag: fixed): (fixed, fixed) {
    // Apply drag: multiply velocity by drag coefficient
    let new_vx: fixed = vx * drag;
    let new_vy: fixed = vy * drag;
    return (new_vx, new_vy);
}

fn show_speed(vx: fixed, vy: fixed) {
    // Convert to int for display (drops fraction)
    let speed_int: int = vx as int;
    tell(@s, f"Speed X: {speed_int}");
}
```

---

## Enum Types

### Simple enums

Variants are mapped to integer constants (0, 1, 2, …) compiled onto scoreboards.

```rs
enum Phase { Idle, Moving, Attacking }

let phase: Phase = Phase::Moving;

match phase {
    Phase::Idle      => { say("idle"); },
    Phase::Moving    => { say("moving"); },
    Phase::Attacking => { say("attack!"); },
    _                => { },
}
```

### Enums with payload fields

Variants can carry named payload fields. Each field is stored in its own scoreboard slot.

```rs
enum Color {
    Red,
    RGB(r: int, g: int, b: int),
}

// Construct
let c: Color = Color::RGB(r: 255, g: 128, b: 0);

// Destructure in match
match c {
    Color::RGB(r, g, b) => { tell(@s, f"r={r} g={g} b={b}"); },
    Color::Red           => { say("red"); },
    _                    => { },
}
```

Payload fields are **named** — supply them as `field: value` pairs when constructing, and the same field names are bound in match patterns.

---

## Option\<T\>

`Option<T>` represents a value that may or may not be present.

```rs
let a: Option<int> = Some(42);
let b: Option<int> = None;
```

### Checking and unwrapping

**`if let`:**

```rs
if let Some(v) = a {
    tell(@s, f"Got {v}");
}
```

**`while let`:**

```rs
while let Some(item) = next_item() {
    process(item);
}
```

**`match`:**

```rs
match a {
    Some(v) => { tell(@s, f"Value: {v}"); },
    None    => { say("nothing"); },
}
```

**`unwrap_or`:**

```rs
let score: int = a.unwrap_or(0);   // 0 if None
```

### Returning Option from a function

```rs
fn find_score(target: selector) -> Option<int> {
    let s: int = score(target, #points);
    if (s < 0) { return None; }
    return Some(s);
}
```

---

## Method Chaining

When `impl` methods return `self` or a new value of the same type, calls can be chained:

```rs
struct Vec2 { x: int, y: int }

impl Vec2 {
    fn scale(self, factor: int) -> Vec2 {
        return Vec2 { x: self.x * factor, y: self.y * factor };
    }
    fn add(self, other: Vec2) -> Vec2 {
        return Vec2 { x: self.x + other.x, y: self.y + other.y };
    }
}

let v: Vec2 = Vec2 { x: 1, y: 2 };
let result: Vec2 = v.scale(3).add(Vec2 { x: 10, y: 0 });
// result = Vec2 { x: 13, y: 6 }
```

Each method call is evaluated left to right. The return value of the previous call becomes the receiver of the next.

---

## Generics

Functions and structs can be parameterized by one or more type variables:

```rs
fn first<T>(arr: T[]) -> T {
    return arr[0];
}

struct Pair<T> {
    left: T,
    right: T,
}

let n: int = first<int>([10, 20, 30]);
let p: Pair<int> = Pair { left: 1, right: 2 };
```

Type inference is supported for function calls when the type can be determined from the arguments.
