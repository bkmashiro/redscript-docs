# Easing

> 本文档由 `src/stdlib/easing.mcrs` 自动生成，请勿手动编辑。

## API 列表

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

## `ease_linear` <Badge type="info" text="Since v1.0.0" />

线性缓动，无加速或减速

```redscript
fn ease_linear(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | 进度 ×10000，范围 [0, 10000] |

**返回：** t（恒等函数）

**示例**

```redscript
let v: int = ease_linear(5000)  // result: 5000 (50%)
```

---

## `ease_in_quad` <Badge type="info" text="Since v1.0.0" />

二次方缓入，慢开始快结束

```redscript
fn ease_in_quad(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | 进度 ×10000 |

**返回：** t²

**示例**

```redscript
let v: int = ease_in_quad(5000)  // result: 2500 (25%)
```

---

## `ease_out_quad` <Badge type="info" text="Since v1.0.0" />

二次方缓出，快开始慢结束

```redscript
fn ease_out_quad(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | 进度 ×10000 |

**返回：** 1 - (1-t)²

**示例**

```redscript
let v: int = ease_out_quad(5000)  // result: 7500 (75%)
```

---

## `ease_in_out_quad` <Badge type="info" text="Since v1.0.0" />

二次方缓入缓出，两端慢中间快

```redscript
fn ease_in_out_quad(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | 进度 ×10000 |

**返回：** 前半段 2t²，后半段 1 - 2*(1-t)²

**示例**

```redscript
let v: int = ease_in_out_quad(2500)  // result: 1250 (12.5%)
```

---

## `ease_in_cubic` <Badge type="info" text="Since v1.0.0" />

三次方缓入（比二次方更强烈）

```redscript
fn ease_in_cubic(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | 进度 ×10000 |

**返回：** t³

**示例**

```redscript
let v: int = ease_in_cubic(5000)  // result: 1250 (12.5%)
```

---

## `ease_out_cubic` <Badge type="info" text="Since v1.0.0" />

三次方缓出

```redscript
fn ease_out_cubic(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | 进度 ×10000 |

**返回：** 1 - (1-t)³

**示例**

```redscript
let v: int = ease_out_cubic(5000)  // result: 8750 (87.5%)
```

---

## `ease_in_out_cubic` <Badge type="info" text="Since v1.0.0" />

Cubic ease-in-out — slow start and end, fast middle (stronger than quadratic).

```redscript
fn ease_in_out_cubic(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | Progress ×10000, range [0, 10000] |

**返回：** 4t³ for t < 0.5, else 1 - 4*(1-t)³

**示例**

```redscript
let v: int = ease_in_out_cubic(5000)  // result: 5000 (50%)
```

---

## `ease_in_quart` <Badge type="info" text="Since v1.0.0" />

Quartic ease-in — very slow start, very fast end (t⁴).

```redscript
fn ease_in_quart(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | Progress ×10000, range [0, 10000] |

**返回：** t⁴

**示例**

```redscript
let v: int = ease_in_quart(5000)  // result: 625 (6.25%)
```

---

## `ease_out_quart` <Badge type="info" text="Since v1.0.0" />

Quartic ease-out — very fast start, very slow end (1 - (1-t)⁴).

```redscript
fn ease_out_quart(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | Progress ×10000, range [0, 10000] |

**返回：** 1 - (1-t)⁴

**示例**

```redscript
let v: int = ease_out_quart(5000)  // result: 9375 (93.75%)
```

---

## `ease_in_sine` <Badge type="info" text="Since v1.0.0" />

Sinusoidal ease-in — starts slow, accelerates (approximated with polynomial).

```redscript
fn ease_in_sine(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | Progress ×10000, range [0, 10000] |

**返回：** Approximate 1 - cos(t*π/2)

**示例**

```redscript
let v: int = ease_in_sine(5000)  // ≈ 2929 (sin curve at 50%)
```

---

## `ease_out_sine` <Badge type="info" text="Since v1.0.0" />

Sinusoidal ease-out — fast start, decelerates gently (approximated).

```redscript
fn ease_out_sine(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | Progress ×10000, range [0, 10000] |

**返回：** Approximate sin(t*π/2)

**示例**

```redscript
let v: int = ease_out_sine(5000)  // ≈ 7071
```

---

## `ease_in_out_sine` <Badge type="info" text="Since v1.0.0" />

Sinusoidal ease-in-out — smooth start and end via sine wave.

```redscript
fn ease_in_out_sine(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | Progress ×10000, range [0, 10000] |

**返回：** Approximate -(cos(π*t) - 1) / 2

**示例**

```redscript
let v: int = ease_in_out_sine(5000)  // result: 5000 (symmetrical)
```

---

## `ease_in_expo` <Badge type="info" text="Since v1.0.0" />

Exponential ease-in — nearly zero at start, explosive at end.

```redscript
fn ease_in_expo(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | Progress ×10000, range [0, 10000] |

**返回：** Approximate 2^(10t-10) (uses cubic proxy)

**示例**

```redscript
let v: int = ease_in_expo(8000)  // very small until close to the end
```

---

## `ease_out_expo` <Badge type="info" text="Since v1.0.0" />

Exponential ease-out — explosive start, slows to near-zero at end.

```redscript
fn ease_out_expo(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | Progress ×10000, range [0, 10000] |

**返回：** 1 - ease_in_expo(1 - t)

**示例**

```redscript
let v: int = ease_out_expo(2000)  // large value even early
```

---

## `ease_in_back` <Badge type="info" text="Since v1.0.0" />

后退缓入，运动前先轻微后退（过冲预备）

```redscript
fn ease_in_back(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | 进度 ×10000 |

**返回：** 可能短暂低于 0

**示例**

```redscript
let v: int = ease_in_back(2000)  // negative briefly, then rises
```

---

## `ease_out_back` <Badge type="info" text="Since v1.0.0" />

Back ease-out — overshoots target then settles back.

```redscript
fn ease_out_back(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | Progress ×10000, range [0, 10000] |

**返回：** Mirrored ease_in_back (may briefly exceed 10000)

**示例**

```redscript
let v: int = ease_out_back(8000)  // overshoots near the end
```

---

## `ease_in_out_back` <Badge type="info" text="Since v1.0.0" />

Back ease-in-out — pullback on entry, overshoot on exit.

```redscript
fn ease_in_out_back(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | Progress ×10000, range [0, 10000] |

**返回：** Combined back ease, symmetric around t=5000

**示例**

```redscript
let v: int = ease_in_out_back(5000)  // result: 5000 (midpoint)
```

---

## `ease_out_bounce` <Badge type="info" text="Since v1.0.0" />

弹跳缓出，结尾模拟球落地弹跳

```redscript
fn ease_out_bounce(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | 进度 ×10000 |

**返回：** 分段弹跳曲线，范围 [0, 10000]

**示例**

```redscript
let v: int = ease_out_bounce(8000)  // bouncing near the end
```

---

## `ease_in_bounce` <Badge type="info" text="Since v1.0.0" />

Bounce ease-in — bounces at the start before settling into forward motion.

```redscript
fn ease_in_bounce(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | Progress ×10000, range [0, 10000] |

**返回：** Mirrored ease_out_bounce

**示例**

```redscript
let v: int = ease_in_bounce(2000)  // bouncing at the start
```

---

## `ease_in_out_bounce` <Badge type="info" text="Since v1.0.0" />

Bounce ease-in-out — bounce on both entry and exit.

```redscript
fn ease_in_out_bounce(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | Progress ×10000, range [0, 10000] |

**返回：** Symmetric bounce easing

**示例**

```redscript
let v: int = ease_in_out_bounce(5000)  // result: 5000 (midpoint)
```

---

## `ease_smooth` <Badge type="info" text="Since v1.0.0" />

平滑步进缓动（Hermite 三次曲线：3t² - 2t³）

```redscript
fn ease_smooth(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | 进度 ×10000 |

**返回：** 3t² - 2t³

**示例**

```redscript
let v: int = ease_smooth(5000)  // result: 5000 (symmetric)
```

---

## `ease_smoother` <Badge type="info" text="Since v1.0.0" />

更平滑步进（Ken Perlin 五次曲线：6t⁵ - 15t⁴ + 10t³）

```redscript
fn ease_smoother(t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `t` | 进度 ×10000 |

**返回：** 6t⁵ - 15t⁴ + 10t³

**示例**

```redscript
let v: int = ease_smoother(5000)  // result: 5000 (symmetric)
```

---
