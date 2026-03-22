# Signal

> 本文档由 `src/stdlib/signal.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [uniform_int](#uniform-int)
- [uniform_frac](#uniform-frac)
- [normal_approx12](#normal-approx12)
- [exp_dist_approx](#exp-dist-approx)
- [bernoulli](#bernoulli)
- [weighted2](#weighted2)
- [weighted3](#weighted3)
- [gamma_sample](#gamma-sample)
- [poisson_sample](#poisson-sample)
- [geometric_sample](#geometric-sample)
- [negative_binomial_sample](#negative-binomial-sample)
- [dft_real](#dft-real)
- [dft_imag](#dft-imag)
- [dft_magnitude](#dft-magnitude)

---

## `uniform_int` <Badge type="info" text="v2.0.0" />

返回 [lo, hi] 内的均匀随机整数（使用 LCG 随机数生成器）

```redscript
fn uniform_int(seed: int, lo: int, hi: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `seed` | 任意整数种子 |
| `lo` | 下界（含） |
| `hi` | 上界（含） |

**返回：** [lo, hi] 内的伪随机整数

**示例**

```redscript
let dmg: int = uniform_int(seed, 5, 15)
```

---

## `uniform_frac` <Badge type="info" text="v2.0.0" />

返回 [0, 10000] 内的均匀随机分数（×10000 精度）

```redscript
fn uniform_frac(seed: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `seed` | 任意整数种子 |

**返回：** [0, 10000] 内的伪随机整数

**示例**

```redscript
let frac: int = uniform_frac(seed)
```

---

## `normal_approx12` <Badge type="info" text="v2.0.0" />

使用 Irwin-Hall 方法（12 个均匀采样之和）近似 N(0,1) 变量

```redscript
fn normal_approx12(seed: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `seed` | 任意整数种子 |

**返回：** 近似 N(0,1) 采样值 ×10000，范围约 [-60000, 60000]

**示例**

```redscript
let z: int = normal_approx12(seed)
```

---

## `exp_dist_approx` <Badge type="info" text="v2.0.0" />

从速率为 lambda_fx 的指数分布中采样（结果上限为 100000）

```redscript
fn exp_dist_approx(seed: int, lambda_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `seed` | 任意整数种子 |
| `lambda_fx` | 速率参数 ×10000（如 10000 = 速率 1.0） |

**返回：** 指数分布变量 ×10000，上限 100000

**示例**

```redscript
let wait: int = exp_dist_approx(seed, 10000)
```

---

## `bernoulli` <Badge type="info" text="v2.0.0" />

以 p_fx/10000 的概率返回 1，否则返回 0

```redscript
fn bernoulli(seed: int, p_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `seed` | 任意整数种子 |
| `p_fx` | 概率 ×10000（如 5000 = 50%，1000 = 10%） |

**返回：** 以给定概率返回 1，否则返回 0

**示例**

```redscript
if (bernoulli(seed, 3000) == 1) { /* 30% chance */ }
```

---

## `weighted2` <Badge type="info" text="v2.0.0" />

按权重 w0、w1 随机选择 0 或 1

```redscript
fn weighted2(seed: int, w0: int, w1: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `seed` | 任意整数种子 |
| `w0` | 结果 0 的权重 |
| `w1` | 结果 1 的权重 |

**返回：** 按权重比例采样的 0 或 1

**示例**

```redscript
let side: int = weighted2(seed, 3, 7)
```

---

## `weighted3` <Badge type="info" text="v2.0.0" />

按权重 w0、w1、w2 随机选择 0、1 或 2

```redscript
fn weighted3(seed: int, w0: int, w1: int, w2: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `seed` | 任意整数种子 |
| `w0` | 结果 0 的权重 |
| `w1` | 结果 1 的权重 |
| `w2` | 结果 2 的权重 |

**返回：** 按权重比例采样的 0、1 或 2

**示例**

```redscript
let tier: int = weighted3(seed, 50, 30, 20)
```

---

## `gamma_sample` <Badge type="info" text="v2.0.0" />

从 Gamma(k, θ) 分布中采样（支持整数 k = 1..5）

```redscript
fn gamma_sample(shape_k: int, scale_theta: int, seed: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `shape_k` | 形状参数 k ×10000（如 20000 = k=2） |
| `scale_theta` | 尺度参数 θ ×10000（如 10000 = θ=1.0） |
| `seed` | 任意整数种子 |

**返回：** Gamma 分布变量 ×10000

**示例**

```redscript
let g: int = gamma_sample(20000, 10000, seed)
```

---

## `poisson_sample` <Badge type="info" text="v2.0.0" />

使用 Knuth 算法从 Poisson(λ) 分布中采样（λ ≤ 20 时效果最佳）

```redscript
fn poisson_sample(lambda: int, seed: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `lambda` | 速率参数 ×10000（如 30000 = λ=3.0） |
| `seed` | 任意整数种子 |

**返回：** Poisson 计数（普通整数，非 ×10000）

**示例**

```redscript
let n: int = poisson_sample(30000, seed)
```

---

## `geometric_sample` <Badge type="info" text="v2.0.0" />

从几何分布 Geometric(p) 中采样（首次成功前失败次数）

```redscript
fn geometric_sample(p_success: int, seed: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `p_success` | 成功概率 ×10000（如 5000 = p=0.5） |
| `seed` | 任意整数种子 |

**返回：** 非负整数失败次数

**示例**

```redscript
let fails: int = geometric_sample(5000, seed)
```

---

## `negative_binomial_sample` <Badge type="info" text="v2.0.0" />

从负二项分布 NegBin(r, p) 中采样（r 次成功前的总失败次数）

```redscript
fn negative_binomial_sample(r: int, p_success: int, seed: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `r` | 成功次数（普通整数，如 1, 2, 3） |
| `p_success` | 成功概率 ×10000 |
| `seed` | 任意整数种子 |

**返回：** 总失败次数

**示例**

```redscript
let n: int = negative_binomial_sample(3, 5000, seed)
```

---

## `dft_real` <Badge type="info" text="v2.0.0" />

计算最多 8 个样本的实值信号第 k 个 DFT 频段实部

```redscript
fn dft_real(s0: int, s1: int, s2: int, s3: int, s4: int, s5: int, s6: int, s7: int, n: int, k: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `s0` | 样本 0 ×10000  …  s7: 样本 7 ×10000 |
| `n` | 样本数（1–8） |
| `k` | 频段索引（0 到 n−1） |

**返回：** DFT 第 k 频段实部，×10000

**示例**

```redscript
let re0: int = dft_real(10000, 0, -10000, 0, 0, 0, 0, 0, 4, 0)
```

---

## `dft_imag` <Badge type="info" text="v2.0.0" />

计算最多 8 个样本的实值信号第 k 个 DFT 频段虚部

```redscript
fn dft_imag(s0: int, s1: int, s2: int, s3: int, s4: int, s5: int, s6: int, s7: int, n: int, k: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `s0` | 样本 0 ×10000  …  s7: 样本 7 ×10000 |
| `n` | 样本数（1–8） |
| `k` | 频段索引 |

**返回：** DFT 第 k 频段虚部，×10000（使用负正弦约定）

---

## `dft_magnitude` <Badge type="info" text="v2.0.0" />

计算 DFT 第 k 频段的幅度 sqrt(re² + im²)，×10000

```redscript
fn dft_magnitude(s0: int, s1: int, s2: int, s3: int, s4: int, s5: int, s6: int, s7: int, n: int, k: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `s0` | 样本 0 ×10000  …  s7: 样本 7 ×10000 |
| `n` | 样本数 |
| `k` | 频段索引 |

**返回：** 第 k 频段幅度，×10000

**示例**

```redscript
let mag: int = dft_magnitude(10000, 0, -10000, 0, 0, 0, 0, 0, 4, 1)
```

---
