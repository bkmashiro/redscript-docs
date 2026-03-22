# Math

> Auto-generated from `src/stdlib/math.mcrs` — do not edit manually.

## API

- [abs](#abs)
- [sign](#sign)
- [min](#min)
- [max](#max)
- [clamp](#clamp)
- [lerp](#lerp)
- [sqrt_fixed](#sqrt-fixed)

---

## `abs` <Badge type="info" text="v1.0.0" />

Return the absolute value of x.

```redscript
fn abs<T>(x: T) -> T
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | The input value (any numeric type T) |

**Returns:** x if x >= 0, else -x

**Example**

```redscript
let a = abs(-5)   // result: 5
let b = abs(3)    // result: 3
```

---

## `sign` <Badge type="info" text="v1.0.0" />

Return the sign of x: 1, 0, or -1.

```redscript
fn sign(x: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Input integer |

**Returns:** 1 if x > 0, -1 if x < 0, 0 if x == 0

**Example**

```redscript
let s = sign(-42)  // result: -1
```

---

## `min` <Badge type="info" text="v1.0.0" />

Return the smaller of two values.

```redscript
fn min<T>(a: T, b: T) -> T
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | First value |
| `b` | Second value |

**Returns:** a if a < b, else b

**Example**

```redscript
let m = min(3, 7)  // result: 3
```

---

## `max` <Badge type="info" text="v1.0.0" />

Return the larger of two values.

```redscript
fn max<T>(a: T, b: T) -> T
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | First value |
| `b` | Second value |

**Returns:** a if a > b, else b

**Example**

```redscript
let m = max(3, 7)  // result: 7
```

---

## `clamp` <Badge type="info" text="v1.0.0" />

Clamp x to the range [lo, hi].

```redscript
fn clamp<T>(x: T, lo: T, hi: T) -> T
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Input value |
| `lo` | Lower bound (inclusive) |
| `hi` | Upper bound (inclusive) |

**Returns:** lo if x < lo; hi if x > hi; otherwise x

**Example**

```redscript
let c = clamp(150, 0, 100)  // result: 100
let d = clamp(50, 0, 100)   // result: 50
```

---

## `lerp` <Badge type="info" text="v1.0.0" />

Linear interpolation between a and b using fixed-point t in [0, 1000].

```redscript
fn lerp(a: int, b: int, t: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | Start value |
| `b` | End value |
| `t` | Interpolation factor ×1000 (0 = a, 1000 = b) |

**Returns:** a + (b - a) * t / 1000

**Example**

```redscript
let v = lerp(0, 1000, 500)    // result: 500
let w = lerp(100, 200, 750)   // result: 175
```

---

## `sqrt_fixed` <Badge type="info" text="v1.0.0" />

Fixed-point square root (scale = 1000).

```redscript
fn sqrt_fixed(x: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Input value ×1000 (i.e. 2.0 → 2000) |

**Returns:** sqrt(x/1000) × 1000

**Example**

```redscript
let s = sqrt_fixed(2000)  // result: ~1414  (√2 × 1000)
let t = sqrt_fixed(1000)  // result: 1000   (√1 × 1000)
```

---
