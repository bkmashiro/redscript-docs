# Advanced

> 本文档由 `src/stdlib/advanced.mcrs` 自动生成，请勿手动编辑。

## API 列表

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

迭代法计算斐波那契数 F(n)。n ≤ 46（F(46) ≈ INT_MAX）。

```redscript
fn fib(n: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `n` | 索引（n ≥ 0） |

**返回：** F(n)

---

## `is_prime` <Badge type="info" text="v1.0.0" />

通过试除法（除到 √n）判断素数。

```redscript
fn is_prime(n: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `n` | 待测整数（n ≥ 0） |

**返回：** 1 表示素数，0 表示合数

**示例**

```redscript
is_prime(2)  // 1
is_prime(4)  // 0
is_prime(97) // 1
```

---

## `collatz_steps` <Badge type="info" text="v1.0.0" />

计算从 n 出发的 Collatz 序列到达 1 所需的步数。

```redscript
fn collatz_steps(n: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `n` | 起始值（n ≥ 1） |

**返回：** 步数

---

## `digit_sum` <Badge type="info" text="v1.0.0" />

各十进制位数字之和，负数取绝对值后计算。

```redscript
fn digit_sum(n: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `n` | 输入整数 |

**返回：** 各位数字之和

---

## `count_digits` <Badge type="info" text="v1.0.0" />

统计整数的十进制位数，0 有 1 位，负数统计绝对值的位数。

```redscript
fn count_digits(n: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `n` | 输入整数 |

**返回：** 位数

---

## `reverse_int` <Badge type="info" text="v1.0.0" />

翻转整数各十进制位，符号保留。

```redscript
fn reverse_int(n: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `n` | 输入整数 |

**返回：** 翻转后的整数

---

## `mod_pow` <Badge type="info" text="v1.0.0" />

快速模幂：(base^exp) mod m，使用 O(log exp) 二进制快速幂。m 须 ≤ 46340。

```redscript
fn mod_pow(base: int, exp: int, m: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `base` | 底数 |
| `exp` | 指数（≥ 0） |
| `m` | 模数（1 < m ≤ 46340） |

**返回：** (base^exp) mod m

---

## `hash_int` <Badge type="info" text="v1.0.0" />

确定性整数哈希，输出非负 [0, ~2×10⁹)，同输入始终产生同输出，适合程序化生成的种子随机值。

```redscript
fn hash_int(n: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `n` | 输入整数 |

**返回：** 非负哈希值

---

## `noise1d` <Badge type="info" text="v1.0.0" />

1D 值噪声，通过 smoothstep 插值实现 C¹ 连续性。输入 ×1000，输出 [0, 999]。

```redscript
fn noise1d(x: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 坐标 ×1000 |

**返回：** 平滑插值噪声值 [0, 999]

---

## `bezier_quad` <Badge type="info" text="v1.0.0" />

二次贝塞尔曲线（De Casteljau 算法），t ∈ [0, 1000]。

```redscript
fn bezier_quad(p0: int, p1: int, p2: int, t: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `p0` | 起始控制点 |
| `p1` | 中间控制点 |
| `p2` | 终止控制点 |
| `t` | 参数 ×1000（0 = 起点，1000 = 终点） |

**返回：** t 处的曲线值

**示例**

```redscript
bezier_quad(0, 500, 1000, 500)  // 500  (midpoint)
bezier_quad(0, 1000, 0, 500)    // 500  (arch at midpoint)
```

---

## `bezier_cubic` <Badge type="info" text="v1.0.0" />

三次贝塞尔曲线（De Casteljau 算法），t ∈ [0, 1000]。

```redscript
fn bezier_cubic(p0: int, p1: int, p2: int, p3: int, t: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `p0` | 控制点 0（起点） |
| `p1` | 控制点 1 |
| `p2` | 控制点 2 |
| `p3` | 控制点 3（终点） |
| `t` | 参数 ×1000 |

**返回：** t 处的曲线值

---

## `mandelbrot_iter` <Badge type="info" text="v1.0.0" />

Mandelbrot 集迭代次数，c = cx/1000 + i·cy/1000。返回逃逸迭代次数，可用于方块着色。

```redscript
fn mandelbrot_iter(cx: int, cy: int, max_iter: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `cx` | 实部 ×1000（范围 −2000..1000） |
| `cy` | 虚部 ×1000（范围 −1000..1000） |
| `max_iter` | 最大迭代次数 |

**返回：** 逃逸前的迭代次数，或 max_iter（在集合内）

**示例**

```redscript
mandelbrot_iter(-1000, 0, 100) // 100 — c = -1+0i is in the set
mandelbrot_iter(1000, 0, 100)  //   0 — c = 1+0i escapes immediately
```

---

## `julia_iter` <Badge type="info" text="v1.0.0" />

Julia 集迭代次数，固定常数 c，可变起点 z₀。

```redscript
fn julia_iter(z0r: int, z0i: int, cr: int, ci: int, max_iter: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `z0r` | 起点实部 ×1000 |
| `z0i` | 起点虚部 ×1000 |
| `cr` | 常数 c 实部 ×1000 |
| `ci` | 常数 c 虚部 ×1000 |
| `max_iter` | 最大迭代次数 |

**返回：** 逃逸前的迭代次数，或 max_iter

---

## `angle_between` <Badge type="info" text="v1.0.0" />

两个二维整数向量之间的无符号夹角（0–180°）。

```redscript
fn angle_between(x1: int, y1: int, x2: int, y2: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x1` | 向量 1 的 X 分量 |
| `y1` | 向量 1 的 Y 分量 |
| `x2` | 向量 2 的 X 分量 |
| `y2` | 向量 2 的 Y 分量 |

**返回：** 夹角（整数度数，0–180）

**示例**

```redscript
angle_between(1000, 0, 0, 1000)  // 90
angle_between(1000, 0, -1000, 0) // 180
```

---

## `clamp_circle_x` <Badge type="info" text="v1.0.0" />

将点 (x, y) 约束到以原点为圆心、半径为 r 的圆内，返回 X 分量。

```redscript
fn clamp_circle_x(x: int, y: int, r: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | X 坐标 |
| `y` | Y 坐标 |
| `r` | 圆半径（与 x/y 同单位） |

**返回：** 约束后的 X 分量

---

## `clamp_circle_y` <Badge type="info" text="v1.0.0" />

将点 (x, y) 约束到以原点为圆心、半径为 r 的圆内，返回 Y 分量。

```redscript
fn clamp_circle_y(x: int, y: int, r: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | X 坐标 |
| `y` | Y 坐标 |
| `r` | 圆半径 |

**返回：** 约束后的 Y 分量

---

## `newton_sqrt` <Badge type="info" text="v1.0.0" />

Newton 迭代法求整数平方根（isqrt 的替代方案，二次收敛）。

```redscript
fn newton_sqrt(n: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `n` | 非负整数 |

**返回：** ⌊√n⌋

---

## `bezier_quartic` <Badge type="info" text="v1.0.0" />

四次（5 控制点）贝塞尔曲线（De Casteljau 算法），t ∈ [0, 1000]。

```redscript
fn bezier_quartic(p0: int, p1: int, p2: int, p3: int, p4: int, t: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `p0` | 控制点 0（起点） |
| `p1` | 控制点 1 |
| `p2` | 控制点 2 |
| `p3` | 控制点 3 |
| `p4` | 控制点 4（终点） |
| `t` | 参数 ×1000 |

**返回：** t 处的曲线值

---

## `bezier_n` <Badge type="info" text="v1.0.0" />

任意阶贝塞尔曲线（De Casteljau 算法）。⚠ 会修改 pts 数组，如需保留原数组请用 bezier_n_safe。

```redscript
fn bezier_n(pts: int[], n: int, t: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `pts` | n 个控制点数组（会被原地修改） |
| `n` | 控制点数量 |
| `t` | 参数 ×1000 |

**返回：** t 处的曲线值

---

## `bezier_n_safe` <Badge type="info" text="v1.0.0" />

非破坏性任意阶贝塞尔曲线，将 pts 复制到 work 后再求值，pts 不被修改。

```redscript
fn bezier_n_safe(pts: int[], work: int[], n: int, t: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `pts` | 控制点数组（不被修改） |
| `work` | 工作缓冲区（长度 ≥ n，会被覆写） |
| `n` | 控制点数量 |
| `t` | 参数 ×1000 |

**返回：** t 处的曲线值

---

## `digital_root` <Badge type="info" text="v1.0.0" />

数字根：反复对各位求和直到得到单个数字。

```redscript
fn digital_root(n: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `n` | 非负整数 |

**返回：** 数字根（1–9）；0 返回 0

---

## `spiral_ring` <Badge type="info" text="v1.0.0" />

Ulam 螺旋环号：n 位于哪个同心正方形环上（环 0 = n=1，环 1 = n=2..9，以此类推）。

```redscript
fn spiral_ring(n: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `n` | 正整数 |

**返回：** 环号

---

## `median` <Badge type="info" text="v1.1.0" />

n 个整数的中位数（×1000 定点数）。奇数 n 返回中间值 ×1000，偶数 n 返回两中间值均值 ×1000。不修改原数组。

```redscript
fn median(arr: int[], work: int[], n: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `arr` | 输入数组（不被修改） |
| `work` | 工作缓冲区（长度 ≥ n） |
| `n` | 元素个数（≥ 1） |

**返回：** 中位数 ×1000

---

## `mode` <Badge type="info" text="v1.1.0" />

出现频率最高的元素（众数），平局时取最小值。

```redscript
fn mode(arr: int[], work: int[], n: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `arr` | 输入数组（不被修改） |
| `work` | 工作缓冲区（长度 ≥ n） |
| `n` | 元素个数（≥ 1） |

**返回：** 众数值

---

## `mean_fx` <Badge type="info" text="v1.1.0" />

算术均值，返回定点数 ×1000。

```redscript
fn mean_fx(arr: int[], n: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `arr` | 输入整数数组 |
| `n` | 元素个数（≥ 1） |

**返回：** sum(arr) ×1000 / n；空数组返回 0

---

## `std_dev_fx` <Badge type="info" text="v1.1.0" />

总体标准差，返回定点数 ×1000（使用整数算术）。

```redscript
fn std_dev_fx(arr: int[], n: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `arr` | 输入整数数组 |
| `n` | 元素个数（≥ 2） |

**返回：** √(Σ(xᵢ−mean)²/n) ×1000；n ≤ 1 返回 0

---

## `hermite_spline` <Badge type="info" text="v1.1.0" />

三次 Hermite 样条插值，使用显式切线。

```redscript
fn hermite_spline(p0: int, p1: int, m0: int, m1: int, t: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `p0` | 起始值 |
| `p1` | 终止值 |
| `m0` | p0 处的切线 |
| `m1` | p1 处的切线 |
| `t` | 参数 ×1000（0 = p0，1000 = p1） |

**返回：** 插值结果（与 p0/p1 同单位）

---

## `catmull_rom` <Badge type="info" text="v1.1.0" />

Catmull-Rom 样条，在 p1 到 p2 之间插值，切线由相邻点自动推导。

```redscript
fn catmull_rom(p0: int, p1: int, p2: int, p3: int, t: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `p0` | 段起点前的点 |
| `p1` | 段起点 |
| `p2` | 段终点 |
| `p3` | 段终点后的点 |
| `t` | 参数 ×1000（0 = p1，1000 = p2） |

**返回：** p1 到 p2 之间的插值结果

---
