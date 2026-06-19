# Math

> 本文档由 `src/stdlib/math.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [abs](#abs)
- [sign](#sign)
- [min](#min)
- [max](#max)
- [clamp](#clamp)
- [lerp](#lerp)
- [lerp_t1000](#lerp-t1000)
- [sqrt_fixed](#sqrt-fixed)
- [sqrt_fx1000](#sqrt-fx1000)
- [mul_fx1000](#mul-fx1000)
- [div_fx1000](#div-fx1000)
- [smoothstep_t1000](#smoothstep-t1000)
- [smootherstep_t1000](#smootherstep-t1000)

---

## `abs` <Badge type="info" text="v1.0.0" />

返回 x 的绝对值（支持泛型 T）

```redscript
fn abs<T>(x: T) -> T
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 输入值（任意数值类型 T） |

**返回：** 若 x >= 0 则返回 x，否则返回 -x

**示例**

```redscript
let a = abs(-5)   // result: 5
let b = abs(3)    // result: 3
```

---

## `sign` <Badge type="info" text="v1.0.0" />

返回 x 的符号：1、0 或 -1

```redscript
fn sign(x: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 输入整数 |

**返回：** x > 0 返回 1，x < 0 返回 -1，x == 0 返回 0

**示例**

```redscript
let s = sign(-42)  // result: -1
```

---

## `min` <Badge type="info" text="v1.0.0" />

返回两个值中较小的一个

```redscript
fn min<T>(a: T, b: T) -> T
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 第一个值 |
| `b` | 第二个值 |

**返回：** a < b 则返回 a，否则返回 b

**示例**

```redscript
let m = min(3, 7)  // result: 3
```

---

## `max` <Badge type="info" text="v1.0.0" />

返回两个值中较大的一个

```redscript
fn max<T>(a: T, b: T) -> T
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 第一个值 |
| `b` | 第二个值 |

**返回：** a > b 则返回 a，否则返回 b

**示例**

```redscript
let m = max(3, 7)  // result: 7
```

---

## `clamp` <Badge type="info" text="v1.0.0" />

将 x 限制在 [lo, hi] 范围内

```redscript
fn clamp<T>(x: T, lo: T, hi: T) -> T
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 输入值 |
| `lo` | 下界（含） |
| `hi` | 上界（含） |

**返回：** x < lo 返回 lo；x > hi 返回 hi；否则返回 x

**示例**

```redscript
let c = clamp(150, 0, 100)  // result: 100
let d = clamp(50, 0, 100)   // result: 50
```

---

## `lerp` <Badge type="info" text="v1.0.0" />

在 a 和 b 之间进行线性插值，t 为定点数（范围 0-1000）

```redscript
fn lerp(a: int, b: int, t: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 起始值 |
| `b` | 结束值 |
| `t` | 插值因子 ×1000（0 = a，1000 = b） |

**返回：** a + (b - a) * t / 1000

**示例**

```redscript
let v = lerp(0, 1000, 500)    // result: 500
let w = lerp(100, 200, 750)   // result: 175
```

---

## `lerp_t1000` <Badge type="info" text="v3.1.0" />

Explicit alias for legacy ×1000 interpolation.
Prefer this name in new code when the `t` parameter is a ×1000 fraction.
`lerp` remains available for compatibility.

```redscript
fn lerp_t1000(a: int, b: int, t: int) -> int
```

---

## `sqrt_fixed` <Badge type="info" text="v1.0.0" />

定点数平方根（精度 ×1000）

```redscript
fn sqrt_fixed(x: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 输入值 ×1000（即 2.0 传入 2000） |

**返回：** sqrt(x/1000) × 1000

**示例**

```redscript
let s = sqrt_fixed(2000)  // result: ~1414  (√2 × 1000)
let t = sqrt_fixed(1000)  // result: 1000   (√1 × 1000)
```

---

## `sqrt_fx1000` <Badge type="info" text="v3.1.0" />

Explicit alias for legacy ×1000 square root.
Prefer this name in new code to avoid confusing it with language `fixed` (×10000).
`sqrt_fixed` remains available for compatibility.

```redscript
fn sqrt_fx1000(x: int) -> int
```

---

## `mul_fx1000` <Badge type="info" text="v3.1.0" />

Explicit alias for legacy ×1000 fixed-point multiply.
`mulfix` remains available for compatibility.

```redscript
fn mul_fx1000(a: int, b: int) -> int
```

---

## `div_fx1000` <Badge type="info" text="v3.1.0" />

Explicit alias for legacy ×1000 fixed-point divide.
`divfix` remains available for compatibility.

```redscript
fn div_fx1000(a: int, b: int) -> int
```

---

## `smoothstep_t1000` <Badge type="info" text="v3.1.0" />

Explicit alias for legacy ×1000 smoothstep output.
`smoothstep` remains available for compatibility.

```redscript
fn smoothstep_t1000(lo: int, hi: int, x: int) -> int
```

---

## `smootherstep_t1000` <Badge type="info" text="v3.1.0" />

Explicit alias for legacy ×1000 smootherstep output.
`smootherstep` remains available for compatibility.

```redscript
fn smootherstep_t1000(lo: int, hi: int, x: int) -> int
```

---
