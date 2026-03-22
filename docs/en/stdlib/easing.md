# Easing

> Auto-generated from `src/stdlib/easing.mcrs` — do not edit manually.

## API

- [ease_linear](#ease-linear)
- [ease_in_quad](#ease-in-quad)
- [ease_out_quad](#ease-out-quad)
- [ease_in_out_quad](#ease-in-out-quad)
- [ease_in_cubic](#ease-in-cubic)
- [ease_out_cubic](#ease-out-cubic)
- [ease_in_out_cubic](#ease-in-out-cubic)
- [ease_in_quart](#ease-in-quart)
- [ease_out_quart](#ease-out-quart)
- [ease_in_sine](#ease-in-sine)
- [ease_out_sine](#ease-out-sine)
- [ease_in_out_sine](#ease-in-out-sine)
- [ease_in_expo](#ease-in-expo)
- [ease_out_expo](#ease-out-expo)
- [ease_in_back](#ease-in-back)
- [ease_out_back](#ease-out-back)
- [ease_in_out_back](#ease-in-out-back)
- [ease_out_bounce](#ease-out-bounce)
- [ease_in_bounce](#ease-in-bounce)
- [ease_in_out_bounce](#ease-in-out-bounce)
- [ease_smooth](#ease-smooth)
- [ease_smoother](#ease-smoother)

---

## `ease_linear`

**Since:** 1.0.0

Linear easing — no acceleration or deceleration.

```redscript
fn ease_linear(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** t (identity function)

**Example**

```redscript
let v: int = ease_linear(5000)  // result: 5000 (50%)
```

---

## `ease_in_quad`

**Since:** 1.0.0

Quadratic ease-in — slow start, fast end.

```redscript
fn ease_in_quad(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** t² / 10000

**Example**

```redscript
let v: int = ease_in_quad(5000)  // result: 2500 (25%)
```

---

## `ease_out_quad`

**Since:** 1.0.0

Quadratic ease-out — fast start, slow end.

```redscript
fn ease_out_quad(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** 1 - (1-t)²

**Example**

```redscript
let v: int = ease_out_quad(5000)  // result: 7500 (75%)
```

---

## `ease_in_out_quad`

**Since:** 1.0.0

Quadratic ease-in-out — slow start and end, fast middle.

```redscript
fn ease_in_out_quad(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** 2t² for t < 0.5, else 1 - 2*(1-t)²

**Example**

```redscript
let v: int = ease_in_out_quad(2500)  // result: 1250 (12.5%)
```

---

## `ease_in_cubic`

**Since:** 1.0.0

Cubic ease-in — slow start, accelerates to fast end (stronger than quadratic).

```redscript
fn ease_in_cubic(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** t³

**Example**

```redscript
let v: int = ease_in_cubic(5000)  // result: 1250 (12.5%)
```

---

## `ease_out_cubic`

**Since:** 1.0.0

Cubic ease-out — fast start, decelerates to slow end.

```redscript
fn ease_out_cubic(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** 1 - (1-t)³

**Example**

```redscript
let v: int = ease_out_cubic(5000)  // result: 8750 (87.5%)
```

---

## `ease_in_out_cubic`

**Since:** 1.0.0

Cubic ease-in-out — slow start and end, fast middle (stronger than quadratic).

```redscript
fn ease_in_out_cubic(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** 4t³ for t < 0.5, else 1 - 4*(1-t)³

**Example**

```redscript
let v: int = ease_in_out_cubic(5000)  // result: 5000 (50%)
```

---

## `ease_in_quart`

**Since:** 1.0.0

Quartic ease-in — very slow start, very fast end (t⁴).

```redscript
fn ease_in_quart(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** t⁴

**Example**

```redscript
let v: int = ease_in_quart(5000)  // result: 625 (6.25%)
```

---

## `ease_out_quart`

**Since:** 1.0.0

Quartic ease-out — very fast start, very slow end (1 - (1-t)⁴).

```redscript
fn ease_out_quart(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** 1 - (1-t)⁴

**Example**

```redscript
let v: int = ease_out_quart(5000)  // result: 9375 (93.75%)
```

---

## `ease_in_sine`

**Since:** 1.0.0

Sinusoidal ease-in — starts slow, accelerates (approximated with polynomial).

```redscript
fn ease_in_sine(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** Approximate 1 - cos(t*π/2)

**Example**

```redscript
let v: int = ease_in_sine(5000)  // ≈ 2929 (sin curve at 50%)
```

---

## `ease_out_sine`

**Since:** 1.0.0

Sinusoidal ease-out — fast start, decelerates gently (approximated).

```redscript
fn ease_out_sine(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** Approximate sin(t*π/2)

**Example**

```redscript
let v: int = ease_out_sine(5000)  // ≈ 7071
```

---

## `ease_in_out_sine`

**Since:** 1.0.0

Sinusoidal ease-in-out — smooth start and end via sine wave.

```redscript
fn ease_in_out_sine(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** Approximate -(cos(π*t) - 1) / 2

**Example**

```redscript
let v: int = ease_in_out_sine(5000)  // result: 5000 (symmetrical)
```

---

## `ease_in_expo`

**Since:** 1.0.0

Exponential ease-in — nearly zero at start, explosive at end.

```redscript
fn ease_in_expo(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** Approximate 2^(10t-10) (uses cubic proxy)

**Example**

```redscript
let v: int = ease_in_expo(8000)  // very small until close to the end
```

---

## `ease_out_expo`

**Since:** 1.0.0

Exponential ease-out — explosive start, slows to near-zero at end.

```redscript
fn ease_out_expo(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** 1 - ease_in_expo(1 - t)

**Example**

```redscript
let v: int = ease_out_expo(2000)  // large value even early
```

---

## `ease_in_back`

**Since:** 1.0.0

Back ease-in — slight pullback before accelerating forward (overshoot anticipation).

```redscript
fn ease_in_back(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** t³*(c3) - t²*(c1) where c1 ≈ 1.70158 (may briefly go below 0)

**Example**

```redscript
let v: int = ease_in_back(2000)  // negative briefly, then rises
```

---

## `ease_out_back`

**Since:** 1.0.0

Back ease-out — overshoots target then settles back.

```redscript
fn ease_out_back(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** Mirrored ease_in_back (may briefly exceed 10000)

**Example**

```redscript
let v: int = ease_out_back(8000)  // overshoots near the end
```

---

## `ease_in_out_back`

**Since:** 1.0.0

Back ease-in-out — pullback on entry, overshoot on exit.

```redscript
fn ease_in_out_back(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** Combined back ease, symmetric around t=5000

**Example**

```redscript
let v: int = ease_in_out_back(5000)  // result: 5000 (midpoint)
```

---

## `ease_out_bounce`

**Since:** 1.0.0

Bounce ease-out — simulates a ball dropping and bouncing at the end.

```redscript
fn ease_out_bounce(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** Piecewise bounce curve, always in [0, 10000]

**Example**

```redscript
let v: int = ease_out_bounce(8000)  // bouncing near the end
```

---

## `ease_in_bounce`

**Since:** 1.0.0

Bounce ease-in — bounces at the start before settling into forward motion.

```redscript
fn ease_in_bounce(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** Mirrored ease_out_bounce

**Example**

```redscript
let v: int = ease_in_bounce(2000)  // bouncing at the start
```

---

## `ease_in_out_bounce`

**Since:** 1.0.0

Bounce ease-in-out — bounce on both entry and exit.

```redscript
fn ease_in_out_bounce(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** Symmetric bounce easing

**Example**

```redscript
let v: int = ease_in_out_bounce(5000)  // result: 5000 (midpoint)
```

---

## `ease_smooth`

**Since:** 1.0.0

Smoothstep easing — cubic Hermite curve (3t² - 2t³), smooth start and end.

```redscript
fn ease_smooth(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** 3t² - 2t³ (Ken Perlin's smooth interpolation)

**Example**

```redscript
let v: int = ease_smooth(5000)  // result: 5000 (symmetric)
```

---

## `ease_smoother`

**Since:** 1.0.0

Smootherstep easing — quintic curve (6t⁵ - 15t⁴ + 10t³), zero first and second derivatives at endpoints.

```redscript
fn ease_smoother(t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `t` | Progress ×10000, range [0, 10000] |

**Returns:** 6t⁵ - 15t⁴ + 10t³ (Ken Perlin's improved noise smoothstep)

**Example**

```redscript
let v: int = ease_smoother(5000)  // result: 5000 (symmetric)
```

---
