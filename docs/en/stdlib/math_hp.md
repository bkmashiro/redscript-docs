# Math_hp

> Auto-generated from `src/stdlib/math_hp.mcrs` — do not edit manually.

## API

- [double_mul_fixed](#double-mul-fixed)
- [double_mul](#double-mul)
- [ln_hp](#ln-hp)
- [ln_5term](#ln-5term)
- [double_sqrt](#double-sqrt)
- [pow_fast](#pow-fast)

---

## `double_mul_fixed` <Badge type="info" text="v1.3.0" />

Multiply a double-precision value `d` by a fixed-point integer `f` (× 10000)
using a macro trick to keep all arithmetic in IEEE 754 double precision.

```redscript
fn double_mul_fixed(d: double, f: int): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `d` | Double operand (stored in NBT as IEEE 754 double) |
| `f` | Fixed-point multiplier × 10000 (e.g. 15000 = 1.5) |

**Returns:** d × (f / 10000) as a double

**Example**

```redscript
let r: double = double_mul_fixed(3.14d, 20000); // 6.28  (3.14 × 2.0)
```

---

## `double_mul` <Badge type="info" text="v1.3.0" />

Multiply two doubles via scoreboard integer approximation (~4 decimal digits).
⚠ Overflows for |a| × |b| > ~21474. Use `double_mul_fixed` for higher precision.

```redscript
fn double_mul(a: double, b: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | First factor (double) |
| `b` | Second factor (double) |

**Returns:** a × b (scoreboard approximation, ~4 sig. figs.)

---

## `ln_hp` <Badge type="info" text="v1.3.0" />

High-precision natural logarithm via one Newton refinement of the 5-term atanh series.
Precision ~8–9 significant digits. Valid for x ∈ [100, 1 000 000] (× 10000 scale).

```redscript
fn ln_hp(x: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Input value × 10000 (e.g. 10000 = 1.0, 27183 ≈ e) |

**Returns:** ln(x / 10000) × 10000

**Example**

```redscript
let r: int = ln_hp(27183); // ≈ 10000  (ln(e) ≈ 1.0)
```

---

## `ln_5term` <Badge type="info" text="v1.3.0" />

Natural logarithm using a 5-term atanh series (more accurate than the 3-term `ln()`).
Max error ≈ 0.000002. Valid for x ∈ [100, 1 000 000] (× 10000 scale).

```redscript
fn ln_5term(x: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Input value × 10000 |

**Returns:** ln(x / 10000) × 10000

---

## `double_sqrt` <Badge type="info" text="v1.3.0" />

Square root of a double-precision value, returned as a double.
Internally converts to × 10000 fixed-point, applies `isqrt`, then converts back.

```redscript
fn double_sqrt(x: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Input double (must be ≥ 0) |

**Returns:** √x as a double

---

## `pow_fast` <Badge type="info" text="v1.3.0" />

Double base raised to an integer exponent using binary exponentiation (O(log n)).
Handles negative exponents via `double_div`.

```redscript
fn pow_fast(base: double, exp_val: int): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `base` | Base value (double) |
| `exp_val` | Integer exponent (may be negative) |

**Returns:** base^exp_val as a double

**Example**

```redscript
let r: double = pow_fast(2.0d, 10); // 1024.0
```

---
