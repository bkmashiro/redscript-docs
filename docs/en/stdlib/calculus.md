# Calculus

> Auto-generated from `src/stdlib/calculus.mcrs` — do not edit manually.

## API

- [deriv_forward](#deriv-forward)
- [deriv_central](#deriv-central)
- [second_deriv](#second-deriv)
- [integrate_trapezoid](#integrate-trapezoid)
- [integrate_simpson](#integrate-simpson)
- [riemann_left](#riemann-left)
- [riemann_right](#riemann-right)
- [riemann_mid](#riemann-mid)
- [curve_length_2d](#curve-length-2d)
- [running_mean](#running-mean)
- [running_m2](#running-m2)
- [variance_from_m2](#variance-from-m2)
- [std_dev_approx](#std-dev-approx)

---

## `deriv_forward` <Badge type="info" text="v1.3.0" />

Forward-difference derivative: (f(x+h) − f(x)) / h.

```redscript
fn deriv_forward(f1: int, f0: int, h_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `f1` | f(x + h) × 10000 |
| `f0` | f(x) × 10000 |
| `h_fx` | Step size × 10000 (must not be zero) |

**Returns:** df/dx × 10000; returns 0 if h_fx == 0

---

## `deriv_central` <Badge type="info" text="v1.3.0" />

Central-difference derivative: (f(x+h) − f(x−h)) / (2h). More accurate than forward difference.

```redscript
fn deriv_central(f_plus: int, f_minus: int, h_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `f_plus` | f(x + h) × 10000 |
| `f_minus` | f(x − h) × 10000 |
| `h_fx` | Step size × 10000 (must not be zero) |

**Returns:** df/dx × 10000; returns 0 if h_fx == 0

---

## `second_deriv` <Badge type="info" text="v1.3.0" />

Second derivative via the central finite-difference formula: (f(x+h) − 2f(x) + f(x−h)) / h².

```redscript
fn second_deriv(f_plus: int, f0: int, f_minus: int, h_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `f_plus` | f(x + h) × 10000 |
| `f0` | f(x) × 10000 |
| `f_minus` | f(x − h) × 10000 |
| `h_fx` | Step size × 10000 (must not be zero) |

**Returns:** d²f/dx² × 10000; returns 0 if h_fx == 0

---

## `integrate_trapezoid` <Badge type="info" text="v1.3.0" />

Numerical integration using the trapezoidal rule.

```redscript
fn integrate_trapezoid(vals: int[], n: int, h_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `vals` | Array of n function values × 10000 at equally spaced points |
| `n` | Number of sample points (must be ≥ 2) |
| `h_fx` | Step width between samples × 10000 |

**Returns:** Approximate integral × 10000 (area under the curve)

**Example**

```redscript
let ys: int[] = [0, 5000, 10000]; // f(0)=0, f(0.5)=0.5, f(1)=1  (linear)
let area: int = integrate_trapezoid(ys, 3, 5000); // ≈ 5000  (∫₀¹ x dx = 0.5)
```

---

## `integrate_simpson` <Badge type="info" text="v1.3.0" />

Numerical integration using Simpson's 1/3 rule (more accurate than trapezoid for smooth functions).
Uses n−1 intervals if n is even. Requires n ≥ 3.

```redscript
fn integrate_simpson(vals: int[], n: int, h_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `vals` | Array of n function values × 10000 at equally spaced points |
| `n` | Number of sample points (should be odd and ≥ 3) |
| `h_fx` | Step width × 10000 |

**Returns:** Approximate integral × 10000

---

## `riemann_left` <Badge type="info" text="v1.3.0" />

Left Riemann sum: sum of f(x_i) × h for i = 0 … n−2.

```redscript
fn riemann_left(vals: int[], n: int, h_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `vals` | Array of n function values × 10000 |
| `n` | Number of sample points |
| `h_fx` | Step width × 10000 |

**Returns:** Approximate integral × 10000

---

## `riemann_right` <Badge type="info" text="v1.3.0" />

Right Riemann sum: sum of f(x_i) × h for i = 1 … n−1.

```redscript
fn riemann_right(vals: int[], n: int, h_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `vals` | Array of n function values × 10000 |
| `n` | Number of sample points |
| `h_fx` | Step width × 10000 |

**Returns:** Approximate integral × 10000

---

## `riemann_mid` <Badge type="info" text="v1.3.0" />

Midpoint Riemann sum using precomputed midpoint values.

```redscript
fn riemann_mid(vals: int[], n: int, h_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `vals` | Array of n midpoint values × 10000 (one per interval) |
| `n` | Number of intervals (i.e. length of vals) |
| `h_fx` | Step width × 10000 |

**Returns:** Approximate integral × 10000

---

## `curve_length_2d` <Badge type="info" text="v1.3.0" />

Approximate arc length of a 2-D polyline through n points using the Euclidean distance between consecutive points.

```redscript
fn curve_length_2d(xs: int[], ys: int[], n: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `xs` | X coordinates × 10000 of the n points |
| `ys` | Y coordinates × 10000 of the n points |
| `n` | Number of points (must be ≥ 2) |

**Returns:** Approximate arc length × 10000

---

## `running_mean` <Badge type="info" text="v1.3.0" />

Welford's online algorithm: update a running mean with a new sample.

```redscript
fn running_mean(prev_mean: int, new_val: int, n: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `prev_mean` | Previous mean × 10000 |
| `new_val` | New sample value × 10000 |
| `n` | Total count after adding the new sample (n ≥ 1) |

**Returns:** Updated mean × 10000

---

## `running_m2` <Badge type="info" text="v1.3.0" />

Welford's online algorithm: update the M2 accumulator used to compute variance.
Variance = running_m2 / (n − 1) after n samples.

```redscript
fn running_m2(prev_m2: int, prev_mean: int, new_mean: int, new_val: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `prev_m2` | Previous M2 accumulator × 10000 |
| `prev_mean` | Mean before adding the new sample × 10000 |
| `new_mean` | Mean after adding the new sample × 10000 |
| `new_val` | New sample value × 10000 |

**Returns:** Updated M2 accumulator × 10000

---

## `variance_from_m2` <Badge type="info" text="v1.3.0" />

Compute sample variance from a Welford M2 accumulator and sample count.

```redscript
fn variance_from_m2(m2: int, n: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `m2` | M2 accumulator from `running_m2` × 10000 |
| `n` | Number of samples collected |

**Returns:** Sample variance × 10000; returns 0 for n ≤ 1

---

## `std_dev_approx` <Badge type="info" text="v1.3.0" />

Approximate standard deviation as the integer square root of the variance.

```redscript
fn std_dev_approx(variance_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `variance_fx` | Variance × 10000 (e.g. from `variance_from_m2`) |

**Returns:** √variance × 10000; returns 0 for non-positive input

---
