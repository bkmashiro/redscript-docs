# Calculus

> 本文档由 `src/stdlib/calculus.mcrs` 自动生成，请勿手动编辑。

## API 列表

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

前向差分导数：(f(x+h) − f(x)) / h。

```redscript
fn deriv_forward(f1: int, f0: int, h_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `f1` | f(x+h) ×10000 |
| `f0` | f(x) ×10000 |
| `h_fx` | 步长 ×10000（不能为零） |

**返回：** df/dx ×10000；h_fx==0 时返回 0

---

## `deriv_central` <Badge type="info" text="v1.3.0" />

中心差分导数：(f(x+h) − f(x−h)) / (2h)，比前向差分更精确。

```redscript
fn deriv_central(f_plus: int, f_minus: int, h_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `f_plus` | f(x+h) ×10000 |
| `f_minus` | f(x−h) ×10000 |
| `h_fx` | 步长 ×10000 |

**返回：** df/dx ×10000

---

## `second_deriv` <Badge type="info" text="v1.3.0" />

二阶中心差分导数：(f(x+h) − 2f(x) + f(x−h)) / h²。

```redscript
fn second_deriv(f_plus: int, f0: int, f_minus: int, h_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `f_plus` | f(x+h) ×10000 |
| `f0` | f(x) ×10000 |
| `f_minus` | f(x−h) ×10000 |
| `h_fx` | 步长 ×10000 |

**返回：** d²f/dx² ×10000

---

## `integrate_trapezoid` <Badge type="info" text="v1.3.0" />

梯形法则数值积分，适用于等间距采样点数组。

```redscript
fn integrate_trapezoid(vals: int[], n: int, h_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `vals` | n 个函数值 ×10000 的数组 |
| `n` | 采样点个数（须 ≥ 2） |
| `h_fx` | 采样步长 ×10000 |

**返回：** 积分近似值 ×10000

**示例**

```redscript
let ys: int[] = [0, 5000, 10000]; // f(0)=0, f(0.5)=0.5, f(1)=1  (linear)
let area: int = integrate_trapezoid(ys, 3, 5000); // ≈ 5000  (∫₀¹ x dx = 0.5)
```

---

## `integrate_simpson` <Badge type="info" text="v1.3.0" />

Simpson 1/3 法则数值积分，比梯形法则更精确（平滑函数适用）。n 应为奇数且 ≥ 3。

```redscript
fn integrate_simpson(vals: int[], n: int, h_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `vals` | n 个函数值 ×10000 的数组 |
| `n` | 采样点个数（建议为奇数且 ≥ 3） |
| `h_fx` | 采样步长 ×10000 |

**返回：** 积分近似值 ×10000

---

## `riemann_left` <Badge type="info" text="v1.3.0" />

左黎曼和：∑ f(xᵢ) × h，i = 0 … n−2。

```redscript
fn riemann_left(vals: int[], n: int, h_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `vals` | n 个函数值 ×10000 的数组 |
| `n` | 采样点个数 |
| `h_fx` | 步长 ×10000 |

**返回：** 积分近似值 ×10000

---

## `riemann_right` <Badge type="info" text="v1.3.0" />

右黎曼和：∑ f(xᵢ) × h，i = 1 … n−1。

```redscript
fn riemann_right(vals: int[], n: int, h_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `vals` | n 个函数值 ×10000 的数组 |
| `n` | 采样点个数 |
| `h_fx` | 步长 ×10000 |

**返回：** 积分近似值 ×10000

---

## `riemann_mid` <Badge type="info" text="v1.3.0" />

中点黎曼和，使用预先计算的中点值。

```redscript
fn riemann_mid(vals: int[], n: int, h_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `vals` | n 个区间中点函数值 ×10000 的数组 |
| `n` | 区间（中点）个数 |
| `h_fx` | 步长 ×10000 |

**返回：** 积分近似值 ×10000

---

## `curve_length_2d` <Badge type="info" text="v1.3.0" />

通过逐段欧几里得距离近似计算二维折线弧长。

```redscript
fn curve_length_2d(xs: int[], ys: int[], n: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `xs` | n 个点的 X 坐标 ×10000 数组 |
| `ys` | n 个点的 Y 坐标 ×10000 数组 |
| `n` | 点的数量（须 ≥ 2） |

**返回：** 近似弧长 ×10000

---

## `running_mean` <Badge type="info" text="v1.3.0" />

Welford 在线算法：用新样本更新滚动均值。

```redscript
fn running_mean(prev_mean: int, new_val: int, n: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `prev_mean` | 上一次均值 ×10000 |
| `new_val` | 新样本值 ×10000 |
| `n` | 加入新样本后的总计数（n ≥ 1） |

**返回：** 更新后的均值 ×10000

---

## `running_m2` <Badge type="info" text="v1.3.0" />

Welford 在线算法：更新用于计算方差的 M2 累加器。方差 = M2 / (n−1)。

```redscript
fn running_m2(prev_m2: int, prev_mean: int, new_mean: int, new_val: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `prev_m2` | 上一次 M2 累加器 ×10000 |
| `prev_mean` | 加入新样本前的均值 ×10000 |
| `new_mean` | 加入新样本后的均值 ×10000 |
| `new_val` | 新样本值 ×10000 |

**返回：** 更新后的 M2 累加器 ×10000

---

## `variance_from_m2` <Badge type="info" text="v1.3.0" />

从 Welford M2 累加器和样本数计算样本方差。

```redscript
fn variance_from_m2(m2: int, n: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `m2` | running_m2 的 M2 累加器 ×10000 |
| `n` | 已收集样本数 |

**返回：** 样本方差 ×10000；n ≤ 1 时返回 0

---

## `std_dev_approx` <Badge type="info" text="v1.3.0" />

对方差取整数平方根，近似得到标准差。

```redscript
fn std_dev_approx(variance_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `variance_fx` | 方差 ×10000（如来自 variance_from_m2） |

**返回：** √variance ×10000；非正输入返回 0

---
