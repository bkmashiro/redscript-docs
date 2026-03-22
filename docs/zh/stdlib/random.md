# Random

> 本文档由 `src/stdlib/random.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [next_lcg](#next-lcg)
- [random_range](#random-range)
- [random_bool](#random-bool)
- [pcg_next_lo](#pcg-next-lo)
- [pcg_next_hi](#pcg-next-hi)
- [pcg_output](#pcg-output)
- [binomial_sample](#binomial-sample)
- [hypergeometric_sample](#hypergeometric-sample)

---

## `next_lcg` <Badge type="info" text="Since v1.0.0" />

推进 LCG 状态一步，返回下一个伪随机 int32

```redscript
fn next_lcg(seed: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `seed` | 当前 LCG 状态（任意非零整数） |

**返回：** 下一个伪随机 int32（同时作为下次调用的种子）

**示例**

```redscript
let seed: int = 12345
seed = next_lcg(seed)
seed = next_lcg(seed)  // advance two steps
```

---

## `random_range` <Badge type="info" text="Since v1.0.0" />

生成 [lo, hi) 范围内的伪随机整数

```redscript
fn random_range(seed: int, lo: int, hi: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `seed` | next_lcg 的输出值 |
| `lo` | 下界（含） |
| `hi` | 上界（不含，必须 > lo） |

**返回：** 范围 [lo, hi) 内的整数

**示例**

```redscript
seed = next_lcg(seed)
let roll: int = random_range(seed, 1, 7)  // dice roll: 1-6
```

---

## `random_bool` <Badge type="info" text="Since v1.0.0" />

以相等概率生成 0 或 1 的伪随机布尔值

```redscript
fn random_bool(seed: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `seed` | next_lcg 的输出值 |

**返回：** 0 或 1，各约 50% 概率

**示例**

```redscript
seed = next_lcg(seed)
let coin: int = random_bool(seed)  // 0 or 1
```

---

## `pcg_next_lo` <Badge type="info" text="Since v1.0.0" />

Advance the PCG low-word state by one step.
Call together with pcg_next_hi; use pcg_output to extract the random value.

```redscript
fn pcg_next_lo(state_lo: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `state_lo` | Current low word of PCG state |

**返回：** New low word

**示例**

```redscript
let lo: int = pcg_next_lo(state_lo)
```

---

## `pcg_next_hi` <Badge type="info" text="Since v1.0.0" />

Advance the PCG high-word state by one step.

```redscript
fn pcg_next_hi(state_hi: int, state_lo: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `state_hi` | Current high word of PCG state |
| `state_lo` | Current low word of PCG state (previous, before pcg_next_lo) |

**返回：** New high word

**示例**

```redscript
let hi: int = pcg_next_hi(state_hi, state_lo)
```

---

## `pcg_output` <Badge type="info" text="Since v1.0.0" />

Extract an output value from the PCG low word using XSH-RR permutation.

```redscript
fn pcg_output(state_lo: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `state_lo` | Current low word of PCG state (after pcg_next_lo) |

**返回：** Pseudo-random output value (unsigned, any int)

**示例**

```redscript
let rng: int = pcg_output(state_lo)
```

---

## `binomial_sample` <Badge type="info" text="Since v1.0.0" />

模拟 n 次伯努利试验并统计成功次数（二项分布）

```redscript
fn binomial_sample(n: int, p_x10000: int, seed: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `n` | 试验次数 |
| `p_x10000` | 成功概率 ×10000（如 5000 = 50%） |
| `seed` | LCG 种子（任意非零整数） |

**返回：** 成功次数，范围 [0, n]

**示例**

```redscript
let hits: int = binomial_sample(10, 5000, 99999)  // ~5 successes on average
```

---

## `hypergeometric_sample` <Badge type="info" text="Since v1.0.0" />

无放回抽样并统计成功项数（超几何分布）

```redscript
fn hypergeometric_sample(pop_size: int, success_states: int, draws: int, seed: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `pop_size` | 总体大小 |
| `success_states` | 总体中成功项数量 |
| `draws` | 抽取数量 |
| `seed` | LCG 种子 |

**返回：** 抽中的成功项数，范围 [0, min(draws, success_states)]

**示例**

```redscript
// 52-card deck, 4 aces, draw 5 cards
let aces: int = hypergeometric_sample(52, 4, 5, 42)
```

---
