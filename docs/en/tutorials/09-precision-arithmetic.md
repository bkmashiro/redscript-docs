# Tutorial 09: Precision Arithmetic — fixed & double

<div class="tutorial-meta">
  <span class="difficulty advanced">🔴 Advanced</span>
  <span class="time">⏱️ 25 min</span>
</div>

**Difficulty:** Advanced  
**Time:** ~30 minutes  
**Prerequisites:** [Tutorial 08: Coroutines](./08-coroutines)

## What You'll Build

A compound interest calculator that computes A = P × 1.05^t two ways:

- using language `fixed` (canonical ×10000)
- using `double` (NBT-backed IEEE 754)

Results are displayed on a scoreboard.

## What You'll Learn

- Language `fixed`: `×10000` scale and cast semantics
- `double`: NBT-backed `rs:d` type and precision tradeoffs
- `as fixed`, `as int`, `as double` casts
- When and how to use low-level scale-specific stdlib helpers (`fx1000`/`fx10000` APIs)

## The Two Precision Types

### fixed — 4 decimal places (×10000)

`fixed` is a regular integer type with an implicit ×10000 representation:

```rs
let a: fixed = 1.5;     // stored as 15000
let b: fixed = 2.5;     // stored as 25000
let i: int = 5;
let c: fixed = i as fixed; // 5 as fixed -> 50000 (integer ×10000)
```

- **Pros:** fast, pure scoreboard math, works on all supported Minecraft versions
- **Cons:** 4 decimal places, and intermediate values should be bounded to avoid int32 overflow

### double — IEEE 754 full precision

`double` values are stored as Java doubles in NBT (`rs:d`):

```rs
let pi: double = 3.14159265d;
```

- **Pros:** higher precision and larger exponent range for advanced math
- **Cons:** slower than fixed-point paths; conversion back to scoreboard/int crosses helper boundaries and may truncate/round at ×10000

## Step 1: Language fixed Arithmetic

Use ordinary operators for normal fixed-point math:

```rs
fn fixed_demo() {
    let a: fixed = 1.5;
    let b: fixed = 2.5;

    let sum: fixed = a + b;   // 4.0
    let diff: fixed = b - a;  // 1.0

    // The compiler restores ×10000 scale automatically for fixed×fixed math
    let product: fixed = a * b;      // 3.75
    let ratio: fixed = a / b;        // 0.6

    let score: fixed = 750 as fixed;
    let max_score: fixed = 1000 as fixed;
    let pct: fixed = score / max_score;   // 0.75

    tell(@s, f"sum={sum as int}, product={product as int}, pct(raw)={pct as int}");
}
```

## Step 2: Compound Interest (fixed)

```rs
@on_trigger("compound_interest")
fn compound_interest() {
    let principal: fixed = 1000 as fixed;
    let growth: fixed = 1.05;

    let amount: fixed = principal;
    let t: int = 0;
    while (t < 10) {
        // fixed math path: amount = amount * 1.05, scale stays ×10000
        amount = amount * growth;
        t = t + 1;
    }

    // 1000 × 1.05^10 ≈ 1628.89
    // `as int` displays the whole-unit part after truncation.
    // expected truncated whole part ≈ 1628
    tell(@s, f"Fixed result (whole units): {amount as int}");
    scoreboard_set("#result_fx", "result_display", amount as int);
}
```

## Step 3: Compound Interest (double)

```rs
import "stdlib/math_hp::*"

@load
fn on_load() {
    init_trig();   // required by math_hp
}

@on_trigger("compound_double")
fn compound_double() {
    // pow_real(base, exp) uses the high-precision helper path
    let base: double = 1.05d;
    let exp_val: double = 10.0d;

    let result: double = pow_real(base, exp_val);
    // 1.6289...

    // Convert to an integer display value; this truncates the fractional part
    let result_int: int = result as int; // 1
    scoreboard_set("#result_dbl", "result_display", result_int);
    tell(@s, f"Double result (whole units): {result_int}; true value ≈ 1.6289");
}
```

## Step 4: Casts

```rs
fn cast_demo() {
    let i: int = 42;
    let from_int: fixed = i as fixed;     // 420000 raw => 42.0

    let from_literal: fixed = 4.2;        // 42000 raw => 4.2
    let trunc_to_int: int = from_literal as int;  // 4

    let back_to_double: double = from_literal as double;
    let d_int: int = 3.14d as int;       // 3
}
```

- `int as fixed` multiplies by 10000
- `fixed as int` divides by 10000 (truncates)
- `fixed as double` passes through the fixed boundary helper path

## Step 5: Low-level stdlib helpers (scale-specific)

For interoperability with legacy/typed-integer helpers, import explicit helpers and pass scaled integers directly.

```rs
import "stdlib/math"

fn legacy_helper_demo() {
    // Legacy trig helpers are ×1000 raw-int APIs
    let angle: int = 45000;      // 45.0° × 1000
    let sin45: int = sin_fx1000(angle);  // 500
    let cos45: int = cos_fx1000(angle);  // 707 (approx)

    // Explicit ×1000 helper names are preferred in new code
    let blend: int = lerp_t1000(0, 1000, 500); // 500
    let mul: int = mul_fx1000(500, 707);        // 353

    // ×10000 fixed helper
    let sqrt2: int = sqrt_fx10000(20000);       // ≈ 14142 (√2 × 10000)
}
```

These helper names are explicit about scale, while the old names without `fx` remain available for compatibility.

## Precision Comparison

| Method | 1000 × 1.05^10 | Error |
|--------|----------------|-------|
| True value | 1628.8946... | — |
| `fixed` (step-by-step) | ~1628 (truncated to int display) | ~0.89 |
| `double` (`pow_real`) | 1628.89... | <0.001 |

## Try It Out

1. Install and `/reload`
2. `/trigger compound_interest` — fixed-point compound interest
3. `/trigger compound_double` — double-precision compound interest
4. Compare both results in the sidebar scoreboard
5. `/trigger cast_demo` — see how casts behave

## Next Steps

→ [Tutorial 10: Full Game — Kill Race](./10-full-game)
