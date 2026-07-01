# Numerics and Precision

This page documents the current RedScript numeric model: language-level `fixed`, deprecated `float`, NBT-backed `double`, and the scale-specific helpers that remain in the standard library.

## Quick rules

| Need | Use |
|------|-----|
| Counters, health, ticks, scoreboard values | `int` |
| Ordinary fractional arithmetic | `fixed`, with normal `+ - * /` operators |
| Legacy `math.mcrs` trig/interpolation helpers | Explicit names: `*_fx1000` / `*_t1000` |
| 4-decimal scale helper APIs | `*_fx10000` / `math_hp` ×10000 APIs |
| NBT/entity-trick high precision | `double` or `stdlib/math_hp` |
| Old code using `float` | Migrate to `fixed`; keep only for boundary compatibility |

## `fixed`: language-level fractional numbers

Language-level `fixed` is compiler-owned fixed-point arithmetic with scale `×10000`:

```rs verify-skip
let a: fixed = 1.5;   // raw 15000
let b: fixed = 0.25;  // raw 2500

let product: fixed = a * b; // compiler inserts ×10000 compensation
let ratio: fixed = a / b;   // stays in fixed scale
```

Do not call `mulfix` / `divfix` for normal `fixed * fixed` or `fixed / fixed`. Those helpers belong to the old `×1000` integer convention, not language-level `fixed`.

## `float`: deprecated

`float` is currently treated as part of the `fixed` family and kept for compatibility. Arithmetic involving it emits a `FloatArithmetic` warning. New docs and new code should use `fixed`.

```rs verify-skip
// Old code: avoid adding more of this
let x: float = 1.5;

// New code: use fixed
let x: fixed = 1.5;
```

## `double`: NBT-backed IEEE 754

`double` exists, but it is heavier than `fixed`. It is stored in `rs:d` NBT storage as a Java double and is useful for high precision, larger ranges, or `stdlib/math_hp` workflows.

```rs verify-skip
let d: double = 3.14159265d;
let from_fixed: double = (1.5 as fixed) as double;
let back_to_int: int = d as int; // truncates
```

`double` being present does not mean every arithmetic path is as cheap or as direct as a native floating-point operator in a general-purpose language. Crossing scoreboard / NBT boundaries can introduce truncation, scale, or Minecraft command-behaviour constraints.

## `math.mcrs`: legacy `×1000` family

`src/stdlib/math.mcrs` still contains historical APIs:

- `sin_fixed` / `cos_fixed`
- `sqrt_fixed`
- `lerp`
- `mulfix` / `divfix`
- `smoothstep` / `smootherstep`

Although some names contain `fixed`, these APIs use integer `×1000` semantics. Prefer the explicit names in new code:

```rs verify-skip
import "stdlib/math"

let s: int = sin_fx1000(30);        // sin(30°) ×1000 = 500
let c: int = cos_fx1000(45);        // ≈ 707
let p: int = mul_fx1000(s, c);      // (500 × 707) / 1000 ≈ 353
let q: int = div_fx1000(1, 3);      // ≈ 333
let t: int = smoothstep_t1000(0, 100, 50); // 500
```

The old names remain available for compatibility. New examples should prefer the scale-explicit names.

## `math.mcrs`: `×10000` helpers

The same `math.mcrs` module also has newer helpers that use `×10000`, for example:

- `ln(x)`: input/output are `×10000`
- `exp_fx(x)`: input/output are `×10000`
- `sqrt_fx10000(x)`: input/output are `×10000`

```rs verify-skip
import "stdlib/math"

let ln_e: int = ln(27183);             // ln(2.7183) ×10000 ≈ 10000
let e1: int = exp_fx(10000);           // e^1 ×10000 ≈ 27183
let sqrt2: int = sqrt_fx10000(20000);  // √2 ×10000 ≈ 14142
```

These APIs take scale-encoded `int` values, not `fixed`-typed values. Keep the scale visible at call sites.

## `math_hp`: high-precision helpers

`stdlib/math_hp` has two groups:

1. `sin_hp` / `cos_hp` / `ln_hp` / `sqrt_hp` style helpers generally use `int` values scaled by `×10000` at API boundaries.
2. `double_add` / `double_sub` / `double_mul` / `double_div` / `pow_real` style helpers use `double` parameters and NBT / entity / macro tricks.

```rs verify-skip
import "stdlib/math_hp::*"

@load
fn setup() {
    init_trig(); // trig helper entity
    init_div();  // SVD/display-entity helper
}

fn hp_demo() {
    let s: int = sin_hp(450000);      // sin(45°) ×10000 ≈ 7071
    let q: int = div_hp(10000, 3000); // (1.0 / 0.3) ×10000 ≈ 33333

    let a: double = 1.25d;
    let b: double = 2.0d;
    let m: double = double_mul(a, b);
}
```

`math_hp` helpers are heavier than ordinary scoreboard math. Use them when their extra precision or Minecraft-backed trick is actually needed.

## Migration strategy

1. If you see `float`, migrate it to `fixed` unless you are explicitly handling an NBT float boundary.
2. If you see `mulfix` / `divfix` / `sin_fixed` / `cos_fixed`, check whether the call site is really using `×1000` integers. If yes, rename to the explicit `*_fx1000` form. If no, use language-level `fixed` arithmetic or a `×10000` helper.
3. For ordinary fractions, use `fixed` and normal operators.
4. For trig/log/sqrt that should align with `fixed` scale, look for `×10000` APIs in `math` / `math_hp`.
5. For true high precision, use `double` / `math_hp` and accept the higher runtime cost.
