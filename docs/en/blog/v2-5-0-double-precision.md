# RedScript v2.5.0: Double Precision, N-Order Bezier, and a Complete Stdlib Overhaul

> **Published:** 2026-03-18  
> **Version:** v2.5.0  
> **Tests:** 1277 → 1485 (+208) | **Commits today:** ~20

---

Today was one of the most intense development days in RedScript's history. v2.5.0 introduces true double-precision floating point, a type system redesign, and a batch of new standard library modules. This post covers the technical details — especially the dark magic behind "implementing IEEE 754 inside Minecraft."

## 1. Type System Redesign

### `float` → `fixed` Rename

The old `float` type was never actually IEEE 754 — it was a **fixed-point number backed by scoreboard integers**, storing values multiplied by 10000. In other words:

```rs
let x: fixed = 3.14   // stored internally as scoreboard integer 31400
```

We renamed it from `float` to `fixed` to accurately reflect what it is.

### New `double` Type

`double` is true IEEE 754 double-precision, stored in NBT:

```rs
let d: double = 3.141592653589793   // stored in rs:d NBT storage
```

- **Storage:** `rs:d` NBT storage (`storage rs:d`)
- **Precision:** Full IEEE 754 double, ~15-16 significant digits
- **Compiler intrinsics:** `a + b` on two doubles automatically lowers to `double_add` in the MIR lowering pass

### No More Implicit Type Conversions

v2.5.0 eliminates all implicit type conversions. All cross-type operations require an explicit `as` cast:

```rs
let f: fixed = 1.5
let d: double = f as double   // ✅ explicit cast
let x: double = f             // ❌ compile error
```

### `[FloatArithmetic]` Lint Warning

Multiplication and division on `fixed` types now triggers a new lint warning:

```
warning[FloatArithmetic]: fixed-point multiplication may lose precision
  --> mypack/src/main.rs:12:5
   |
12 |     let result = a * b
   |                  ^^^^^
   = note: consider using `double` for higher precision arithmetic
```

---

## 2. Double Arithmetic in Minecraft (The Tricks)

This is the most interesting part of this release — how to implement IEEE 754 double operations inside Minecraft's command system, which has no native floating-point instructions.

### `double_add` / `double_sub`: The Entity Position Trick

**Key insight:** The `loot spawn` command's coordinate arguments have no numeric limits, and Minecraft entity `Pos` fields are natively stored as IEEE 754 doubles.

The approach:

1. Teleport a marker entity to coordinate `x = a` using `/tp`
2. Move it relatively by `+b` (i.e., `execute ... tp @e[...] ~b ~ ~`)
3. Read `Pos[0]` → result is `a + b` with full IEEE 754 double precision

```mcfunction
# double_add(a, b) -> a + b
data modify storage rs:d in0 set from storage rs:d a
data modify storage rs:d in1 set from storage rs:d b
# ... teleport marker to a, then +b, read Pos[0]
data get entity @e[tag=rs_marker,limit=1] Pos[0]
data modify storage rs:d result set from entity @e[tag=rs_marker,limit=1] Pos[0]
```

Subtraction works the same way — just negate `b`.

### `double_mul_fixed`: Execute Store + Function Macros

Multiplying a double by a fixed-point number, using MC function macros to inject the scale parameter dynamically:

```mcfunction
$execute store result storage rs:d out double $(scale) run data get storage rs:d input 1
```

`$(scale)` is injected at runtime via the MC function macro mechanism, equivalent to `input * scale`. This allows reusing the same function logic with different scale factors.

### `double_div`: The Display Entity SVD Trick

**Key insight:** Display Entity transformation matrices are internally SVD-decomposed, normalizing the matrix so its last element equals 1.

The approach:

1. Construct a transformation matrix where `matrix[3][3] = b` and `matrix[0][0] = a`
2. Read the normalized matrix → result is `a / b`

This is currently the only known way to implement arbitrary double division using vanilla Minecraft commands.

### Compiler Intrinsics

The compiler's MIR lowering pass automatically recognizes double operations and inserts the corresponding intrinsic calls:

```rs
// Code written by user
let c: double = a + b   // a, b are both double

// Compiler lowers to
let c = __intrinsic_double_add(a, b)
// Ultimately generates a call to rs:internal/double_add mcfunction
```

Users don't need to care about the underlying implementation — just use `+` `-` `*` `/` directly.

---

## 3. New Stdlib Modules

### `parabola.mcrs` — Ballistic Trajectory

Computes projectile motion trajectories: given initial velocity and angle, calculate landing position, or solve for the required launch angle. Useful for arrows, TNT cannons, and similar mechanics.

### `quaternion.mcrs` — Display Entity Rotation

Quaternion operations, primarily for smooth rotation animations on Display Entities.

This release fixes a tricky normalization bug: during SLERP interpolation, when the angle between two quaternions approaches 180°, the normalization step produces NaN, causing Display Entities to suddenly disappear. The fix checks for the antipodal case before interpolating and selects an alternate rotation axis:

```rs
// SLERP with antipodal fix
fn slerp(q1: Quaternion, q2: Quaternion, t: fixed) -> Quaternion {
    let dot = q1.dot(q2)
    // If dot product is negative, flip q2 to take the short arc
    let q2 = if dot < 0 { q2.negate() } else { q2 }
    // ...
}
```

### `bezier_quartic.mcrs` + `bezier_n.mcrs` — N-Order Bezier

- `bezier_quartic`: Quartic Bezier curve, hard-coded unrolled for maximum performance
- `bezier_n`: Arbitrary order, implemented recursively using the **De Casteljau algorithm**

Implementing De Casteljau in Minecraft is quite interesting — recursion is simulated via recursive function calls, with control points stored in an NBT array:

```rs
// N-order De Casteljau
fn de_casteljau(points: [double], t: fixed, n: int) -> double {
    if n == 1 { return points[0] }
    // Recursive degree reduction
    let reduced = lerp_adjacent(points, t, n)
    return de_casteljau(reduced, t, n - 1)
}
```

### `bigint_mul` / `bigint_sq`

Big integer multiplication and squaring, using scoreboard integers to simulate multi-precision arithmetic. Primarily used for cryptography demos and scenarios requiring extreme numerical precision.

---

## 4. High-Precision Math

### `ln_hp`: High-Precision Natural Logarithm

Starting from `ln_5term` (5-term Taylor expansion), then refining with **Newton iteration** to achieve ~8-9 significant digits:

```
ln_hp(x):
  y₀ = ln_5term(x)           // initial estimate (5-term expansion)
  y₁ = y₀ + (x - e^y₀) / x  // Newton step: y ← y + (x - e^y)/x
  y₂ = y₁ + (x - e^y₁) / x  // one more iteration
```

Under the `fixed` type (×10000 precision), two Newton steps typically achieve 8+ digits of accuracy.

### Statistical Distributions

Three new random distribution generators:

| Distribution | Algorithm |
|--------------|-----------|
| **Gamma** | Sum of exponentials (integer shape parameter) |
| **Poisson** | Knuth algorithm (product of uniform randoms) |
| **Negative Binomial** | Gamma + Poisson compound |

The Knuth Poisson algorithm is particularly well-suited for Minecraft since it only needs uniform random numbers (generated via the `random value` command):

```rs
fn poisson(lambda: fixed) -> int {
    let L = exp(-lambda)
    let k = 0
    let p: fixed = 1.0
    loop {
        k += 1
        p *= random_uniform()   // uniform [0, 1)
        if p <= L { break }
    }
    return k - 1
}
```

---

## 5. Numbers

| Metric | v2.4.x | v2.5.0 | Delta |
|--------|--------|--------|-------|
| Test cases | 1277 | 1485 | **+208** |
| Commits today | — | ~20 | — |
| New stdlib modules | — | 7 | — |

The 208 new test cases cover all new `double` operation intrinsics, high-precision math functions, and validation of statistical distributions (mean and variance convergence checks).

---

## Summary

v2.5.0 is a milestone release. The addition of `double` gives RedScript genuine high-precision floating-point capability for the first time — even though the underlying implementation requires entity coordinates, Display Entity transformation matrices, and other Minecraft mechanics to "simulate" IEEE 754. That's exactly the fun of systems programming in a constrained environment.

Next steps: improve type inference for `double`/`fixed` interoperability, and add more documentation and examples to the stdlib.

---

*Author: bkmashiro | RedScript maintainer*
