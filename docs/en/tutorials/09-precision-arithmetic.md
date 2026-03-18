# Tutorial 09: Precision Arithmetic — fixed & double

**Difficulty:** Advanced  
**Time:** ~30 minutes  
**Prerequisites:** [Tutorial 08: Coroutines](./08-coroutines)

## What You'll Build

A compound interest calculator that computes A = P × 1.05^t two ways: once using `fixed`-point arithmetic (4 decimal places) and once using `double`-precision IEEE 754 (8+ decimal places). Results are displayed on a scoreboard.

## What You'll Learn

- `fixed` type: ×10000 integer stored in scoreboard
- `double` type: IEEE 754 stored in NBT (`rs:d`)
- `as fixed`, `as int`, `as double` casts
- `import "stdlib/math_hp.mcrs"` — high-precision functions
- `pow_real(base, exp)` — real-valued power
- When to use `fixed` vs `double`

## The Two Precision Types

### fixed — 4 Decimal Places

`fixed` is just a regular integer stored with an implicit ×10000 scale:

```rs
// 1.5 stored as 15000
let a: fixed = 15000 as fixed

// The "real" value is always: stored_int / 10000
// 15000 / 10000 = 1.5  ✓
```

**Advantages:** Fast, uses scoreboard, works with all MC versions.  
**Limitations:** Only 4 decimal places; overflow at ±214748 (×10000 → ±21.4748 billion as raw int).

### double — IEEE 754 Full Precision

`double` uses MC's NBT storage (`rs:d`) for true IEEE 754 64-bit floating point:

```rs
let base: double = 1.05d    // d suffix = double literal

// ~15 significant digits
// Slower (requires entity/storage manipulation)
// Needs import "stdlib/math_hp.mcrs"
```

**Advantages:** ~15 significant digits, can represent very large and very small values.  
**Limitations:** Slower than `fixed`; requires `import "stdlib/math_hp.mcrs"` for arithmetic.

## Step 1: fixed Arithmetic

```rs
fn fixed_demo() {
    // Addition/subtraction: just add the raw integers
    let a: fixed = 15000 as fixed   // 1.5
    let b: fixed = 25000 as fixed   // 2.5
    let sum: int = (a as int) + (b as int)   // 40000 = 4.0  ✓

    // Multiplication: multiply then divide by 10000 to stay in scale
    let product: int = (a as int) * (b as int) / 10000  // 37500 = 3.75  ✓

    // Percentage: score * 10000 / max
    let score: int = 750
    let pct: fixed = (score * 10000 / 1000) as fixed   // 7500 = 75.00%
}
```

## Step 2: Compound Interest (fixed)

```rs
@on_trigger("compound_interest")
fn compound_interest() {
    let principal: int = 1000
    let base_fx: int = 10500   // 1.05 × 10000

    let amount: int = principal
    let t: int = 0
    while (t < 10) {
        // A = A * 1.05  →  A = A * 10500 / 10000
        amount = amount * base_fx / 10000
        t = t + 1
    }

    // Expected: 1000 * 1.05^10 ≈ 1628.89
    // Fixed result: 1628 (truncation each step accumulates small errors)
    tell(@s, f"Fixed result: {amount} (expected ~1629)")
    scoreboard_set("#result_fx", "result_display", amount)
}
```

## Step 3: Compound Interest (double)

```rs
import "stdlib/math_hp.mcrs"

@load
fn on_load() {
    init_trig()   // required by math_hp
}

@on_trigger("compound_double")
fn compound_double() {
    // pow_real(base, exp) = base^exp using ln/exp method
    let base: double = 1.05d
    let exp_val: double = 10.0d

    let result: double = pow_real(base, exp_val) as double
    // result ≈ 1.6289 (IEEE 754 precision)

    // Convert to ×10000 int for display
    let result_int: int = result as int   // 16289
    scoreboard_set("#result_dbl", "result_display", result_int)
    tell(@s, f"Double result (×10000): {result_int} = 1.6289")
}
```

## Step 4: Casting

```rs
fn cast_demo() {
    // int → fixed: mark as fixed (no conversion, just type annotation)
    let i: int = 42
    let f: fixed = i as fixed         // still stores 42 (represents 0.0042!)

    // To represent 4.2: store 42000
    let four_two: fixed = 42000 as fixed   // represents 4.2

    // fixed → int: drops the type, keeps the raw number
    let raw: int = four_two as int         // 42000

    // Extract real parts:
    let integer_part: int = raw / 10000     // 4
    let decimal_part: int = raw % 10000     // 2000 (= 0.2 × 10000)

    // double → int: reads value × 10000
    let d: double = 3.14d
    let d_int: int = d as int    // 31400  (3.14 × 10000)
}
```

## Step 5: When to Use Each

| Situation | Use |
|-----------|-----|
| Percentages, ratios, fractions | `fixed` |
| Simple game math (HP %, timers) | `fixed` |
| Needs > 4 decimal places | `double` |
| Scientific/financial calculations | `double` |
| Compound interest, logarithms | `double` + `math_hp` |
| Must work MC 1.16+ without entity tricks | `fixed` |

## Complete Code

Full example: [tutorial_09_precision.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_09_precision.mcrs)

## Try It Out

1. Install and `/reload`
2. `/trigger fixed_demo` — see fixed-point arithmetic results in chat
3. `/trigger compound_interest` — fixed-point compound interest
4. `/trigger compound_double` — double-precision compound interest
5. Compare the two results in the sidebar scoreboard
6. `/trigger cast_demo` — see how casts work

## Precision Comparison

| Method | 1000 × 1.05^10 | Error |
|--------|----------------|-------|
| True value | 1628.8946... | — |
| `fixed` (step-by-step) | 1628 | ~0.89 |
| `double` (pow_real) | 1628.89... | <0.001 |

## Next Steps

→ [Tutorial 10: Full Game — Kill Race](./10-full-game)
