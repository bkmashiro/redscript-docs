# Advanced

> Auto-generated from `src/stdlib/advanced.mcrs` — do not edit manually.

## API

- [fib](#fib)
- [is_prime](#is-prime)
- [collatz_steps](#collatz-steps)
- [digit_sum](#digit-sum)
- [count_digits](#count-digits)
- [reverse_int](#reverse-int)
- [mod_pow](#mod-pow)
- [hash_int](#hash-int)
- [noise1d](#noise1d)
- [bezier_quad](#bezier-quad)
- [bezier_cubic](#bezier-cubic)
- [mandelbrot_iter](#mandelbrot-iter)
- [julia_iter](#julia-iter)
- [angle_between](#angle-between)
- [clamp_circle_x](#clamp-circle-x)
- [clamp_circle_y](#clamp-circle-y)
- [newton_sqrt](#newton-sqrt)
- [bezier_quartic](#bezier-quartic)
- [bezier_n](#bezier-n)
- [bezier_n_safe](#bezier-n-safe)
- [digital_root](#digital-root)
- [spiral_ring](#spiral-ring)
- [median](#median)
- [mode](#mode)
- [mean_fx](#mean-fx)
- [std_dev_fx](#std-dev-fx)
- [hermite_spline](#hermite-spline)
- [catmull_rom](#catmull-rom)

---

## `fib` <Badge type="info" text="v1.0.0" />

Fibonacci number F(n) using simple iteration.
Overflow: F(46) = 1 836 311 903 ≈ INT_MAX; keep n ≤ 46.

```redscript
fn fib(n: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `n` | Index (n ≥ 0) |

**Returns:** F(n) — fib(0) == 0, fib(1) == 1, fib(10) == 55

---

## `is_prime` <Badge type="info" text="v1.0.0" />

Primality test by trial division up to √n.

```redscript
fn is_prime(n: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `n` | Integer to test (n ≥ 0) |

**Returns:** 1 if n is prime, 0 otherwise

**Example**

```redscript
is_prime(2)  // 1
is_prime(4)  // 0
is_prime(97) // 1
```

---

## `collatz_steps` <Badge type="info" text="v1.0.0" />

Number of steps in the Collatz sequence starting at n until reaching 1.

```redscript
fn collatz_steps(n: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `n` | Starting value (n ≥ 1) |

**Returns:** Step count — collatz_steps(1) == 0, collatz_steps(6) == 8

---

## `digit_sum` <Badge type="info" text="v1.0.0" />

Sum of decimal digits. Negative input uses the absolute value.

```redscript
fn digit_sum(n: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `n` | Integer input |

**Returns:** Sum of digits — digit_sum(123) == 6, digit_sum(0) == 0

---

## `count_digits` <Badge type="info" text="v1.0.0" />

Count decimal digits of n. 0 has 1 digit; negative values count absolute digits.

```redscript
fn count_digits(n: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `n` | Integer input |

**Returns:** Digit count — count_digits(0) == 1, count_digits(100) == 3

---

## `reverse_int` <Badge type="info" text="v1.0.0" />

Reverse the decimal digits of an integer. Sign is preserved.

```redscript
fn reverse_int(n: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `n` | Integer input |

**Returns:** Digit-reversed integer — reverse_int(12345) == 54321, reverse_int(-42) == -24

---

## `mod_pow` <Badge type="info" text="v1.0.0" />

Modular exponentiation: (base ^ exp) mod m using O(log exp) binary squaring.
⚠ m must be ≤ 46 340 to avoid `b*b` int32 overflow.

```redscript
fn mod_pow(base: int, exp: int, m: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `base` | Base value |
| `exp` | Exponent (≥ 0) |
| `m` | Modulus (1 < m ≤ 46340) |

**Returns:** (base^exp) mod m — mod_pow(2, 10, 1000) == 24

---

## `hash_int` <Badge type="info" text="v1.0.0" />

Deterministic integer hash. Output is non-negative [0, ~2×10⁹).
Same input always produces the same output — useful as a seeded pseudo-random value.

```redscript
fn hash_int(n: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `n` | Input integer (any value) |

**Returns:** Non-negative hash value

---

## `noise1d` <Badge type="info" text="v1.0.0" />

1-D value noise with C¹ continuity via smoothstep interpolation.
Input x is fixed-point (scale = 1000). Output in [0, 999].

```redscript
fn noise1d(x: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Coordinate × 1000 (e.g. 500 = 0.5, 1000 = 1.0) |

**Returns:** Smoothly interpolated noise value in [0, 999]

---

## `bezier_quad` <Badge type="info" text="v1.0.0" />

Quadratic Bezier curve evaluated at t using De Casteljau's algorithm.

```redscript
fn bezier_quad(p0: int, p1: int, p2: int, t: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `p0` | Start control point |
| `p1` | Middle control point |
| `p2` | End control point |
| `t` | Parameter × 1000 (0 = start, 1000 = end) |

**Returns:** Curve value at t

**Example**

```redscript
bezier_quad(0, 500, 1000, 500)  // 500  (midpoint)
bezier_quad(0, 1000, 0, 500)    // 500  (arch at midpoint)
```

---

## `bezier_cubic` <Badge type="info" text="v1.0.0" />

Cubic Bezier curve evaluated at t using De Casteljau's algorithm.

```redscript
fn bezier_cubic(p0: int, p1: int, p2: int, p3: int, t: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `p0` | Control point 0 (start) |
| `p1` | Control point 1 |
| `p2` | Control point 2 |
| `p3` | Control point 3 (end) |
| `t` | Parameter × 1000 (0 = start, 1000 = end) |

**Returns:** Curve value at t

---

## `mandelbrot_iter` <Badge type="info" text="v1.0.0" />

Mandelbrot set iteration count for complex number c = cx/1000 + i·cy/1000.
Returns the escape iteration count, or max_iter if the point is in the set.
Use the return value to colour blocks!

```redscript
fn mandelbrot_iter(cx: int, cy: int, max_iter: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `cx` | Real part × 1000 (range −2000..1000) |
| `cy` | Imaginary part × 1000 (range −1000..1000) |
| `max_iter` | Maximum iteration count |

**Returns:** Iterations before |z| > 2, or max_iter if in the set

**Example**

```redscript
mandelbrot_iter(-1000, 0, 100) // 100 — c = -1+0i is in the set
mandelbrot_iter(1000, 0, 100)  //   0 — c = 1+0i escapes immediately
```

---

## `julia_iter` <Badge type="info" text="v1.0.0" />

Julia set iteration count with fixed constant c and variable starting point z₀.
Same escape condition as `mandelbrot_iter`.

```redscript
fn julia_iter(z0r: int, z0i: int, cr: int, ci: int, max_iter: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `z0r` | Real part of starting point × 1000 |
| `z0i` | Imaginary part of starting point × 1000 |
| `cr` | Real part of constant c × 1000 |
| `ci` | Imaginary part of constant c × 1000 |
| `max_iter` | Maximum iteration count |

**Returns:** Iterations before |z| > 2, or max_iter if in the set

---

## `angle_between` <Badge type="info" text="v1.0.0" />

Unsigned angle (0–180°) between two 2-D integer vectors.

```redscript
fn angle_between(x1: int, y1: int, x2: int, y2: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x1` | X component of vector 1 |
| `y1` | Y component of vector 1 |
| `x2` | X component of vector 2 |
| `y2` | Y component of vector 2 |

**Returns:** Angle in whole degrees [0, 180]; 0 for zero-length inputs

**Example**

```redscript
angle_between(1000, 0, 0, 1000)  // 90
angle_between(1000, 0, -1000, 0) // 180
```

---

## `clamp_circle_x` <Badge type="info" text="v1.0.0" />

X component of the point (x, y) clamped to a circle of radius r centred at the origin.
Keep |x|, |y| < ~2000 to avoid overflow in `normalize2d_x`.

```redscript
fn clamp_circle_x(x: int, y: int, r: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | X coordinate (raw block coords, not fixed-point) |
| `y` | Y coordinate |
| `r` | Circle radius in the same units as x/y |

**Returns:** Clamped X — clamp_circle_x(600, 0, 500) == 500

---

## `clamp_circle_y` <Badge type="info" text="v1.0.0" />

Y component of the point (x, y) clamped to a circle of radius r centred at the origin.

```redscript
fn clamp_circle_y(x: int, y: int, r: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | X coordinate |
| `y` | Y coordinate |
| `r` | Circle radius |

**Returns:** Clamped Y — clamp_circle_y(0, 600, 500) == 500

---

## `newton_sqrt` <Badge type="info" text="v1.0.0" />

Integer square root via Newton's method (alternative to `isqrt`).
Converges quadratically; useful for validating while-loop + division logic.

```redscript
fn newton_sqrt(n: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `n` | Non-negative integer |

**Returns:** ⌊√n⌋ — newton_sqrt(25) == 5, newton_sqrt(100) == 10

---

## `bezier_quartic` <Badge type="info" text="v1.0.0" />

Quartic (5-point) Bezier curve evaluated at t using De Casteljau's algorithm.

```redscript
fn bezier_quartic(p0: int, p1: int, p2: int, p3: int, p4: int, t: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `p0` | Control point 0 (start) |
| `p1` | Control point 1 |
| `p2` | Control point 2 |
| `p3` | Control point 3 |
| `p4` | Control point 4 (end) |
| `t` | Parameter × 1000 (0 = start, 1000 = end) |

**Returns:** Curve value at t

---

## `bezier_n` <Badge type="info" text="v1.0.0" />

Arbitrary-degree Bezier curve via De Casteljau's algorithm.
⚠ Modifies `pts` in-place. Use `bezier_n_safe` to preserve the original array.

```redscript
fn bezier_n(pts: int[], n: int, t: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `pts` | Array of n control points (modified in-place during evaluation) |
| `n` | Number of control points |
| `t` | Parameter × 1000 (0 = start, 1000 = end) |

**Returns:** Curve value at t

---

## `bezier_n_safe` <Badge type="info" text="v1.0.0" />

Non-destructive arbitrary-degree Bezier curve. Copies `pts` into `work` then evaluates.

```redscript
fn bezier_n_safe(pts: int[], work: int[], n: int, t: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `pts` | Array of n control points (not modified) |
| `work` | Working buffer of length ≥ n (will be overwritten) |
| `n` | Number of control points |
| `t` | Parameter × 1000 (0 = start, 1000 = end) |

**Returns:** Curve value at t

---

## `digital_root` <Badge type="info" text="v1.0.0" />

Digital root: repeatedly sum digits until a single digit remains.

```redscript
fn digital_root(n: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `n` | Non-negative integer |

**Returns:** Single-digit root — digital_root(493) == 7, digital_root(0) == 0

---

## `spiral_ring` <Badge type="info" text="v1.0.0" />

Ulam spiral ring number: which concentric square ring contains n?
Ring 0: n=1; Ring 1: n=2..9 (3×3); Ring 2: n=10..25 (5×5); etc.

```redscript
fn spiral_ring(n: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `n` | Positive integer |

**Returns:** Ring index — spiral_ring(1) == 0, spiral_ring(9) == 1, spiral_ring(25) == 2

---

## `median` <Badge type="info" text="v1.1.0" />

Median of n integers. Sorts a copy of the array; the original is not modified.
For odd n returns the middle value × 1000. For even n returns the average × 1000.

```redscript
fn median(arr: int[], work: int[], n: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `arr` | Input array (not modified) |
| `work` | Working buffer of length ≥ n (will be overwritten) |
| `n` | Number of elements (must be ≥ 1) |

**Returns:** Median × 1000

---

## `mode` <Badge type="info" text="v1.1.0" />

Most frequent element (mode) in arr[0..n). Tie-breaks toward the smallest value.

```redscript
fn mode(arr: int[], work: int[], n: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `arr` | Input array (not modified) |
| `work` | Working buffer of length ≥ n (will be overwritten) |
| `n` | Number of elements (must be ≥ 1) |

**Returns:** The modal value

---

## `mean_fx` <Badge type="info" text="v1.1.0" />

Arithmetic mean as fixed-point × 1000.

```redscript
fn mean_fx(arr: int[], n: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `arr` | Input array of integers |
| `n` | Number of elements (must be ≥ 1) |

**Returns:** sum(arr) × 1000 / n; 0 for empty array

---

## `std_dev_fx` <Badge type="info" text="v1.1.0" />

Population standard deviation as fixed-point × 1000.
Uses integer arithmetic; values must fit in int32 before squaring deviations.

```redscript
fn std_dev_fx(arr: int[], n: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `arr` | Input array of integers |
| `n` | Number of elements (must be ≥ 2) |

**Returns:** √(Σ(xᵢ−mean)² / n) × 1000; 0 for n ≤ 1

---

## `hermite_spline` <Badge type="info" text="v1.1.0" />

Cubic Hermite spline interpolation between two endpoints with explicit tangents.

```redscript
fn hermite_spline(p0: int, p1: int, m0: int, m1: int, t: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `p0` | Start value |
| `p1` | End value |
| `m0` | Tangent at p0 |
| `m1` | Tangent at p1 |
| `t` | Parameter × 1000 (0 = p0, 1000 = p1) |

**Returns:** Interpolated value (same scale as p0/p1)

---

## `catmull_rom` <Badge type="info" text="v1.1.0" />

Catmull-Rom spline: interpolates between p1 and p2 with tangents derived from neighbours.
Tangents: m1 = (p2 − p0) / 2, m2 = (p3 − p1) / 2.

```redscript
fn catmull_rom(p0: int, p1: int, p2: int, p3: int, t: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `p0` | Point before the segment start |
| `p1` | Segment start |
| `p2` | Segment end |
| `p3` | Point after the segment end |
| `t` | Parameter × 1000 (0 = p1, 1000 = p2) |

**Returns:** Interpolated value between p1 and p2

---
