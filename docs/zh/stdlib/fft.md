# Fft

> 本文档由 `src/stdlib/fft.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [dft_noop](#dft-noop)
- [dft_real](#dft-real)
- [dft_magnitude](#dft-magnitude)
- [dft_power](#dft-power)
- [dft_freq_bin](#dft-freq-bin)

---

## `dft_noop` <Badge type="info" text="v2.0.0" />

dft_coro 的默认空回调，不执行任何操作

```redscript
fn dft_noop(): void
```

---

## `dft_real` <Badge type="info" text="v2.0.0" />

计算 input[0..n-1] 的离散傅里叶变换，输出实部到 out_re

```redscript
fn dft_real(input: int[], n: int, out_re: int[], out_im: int[])
```

**参数**

| 参数 | 说明 |
|------|------|
| `input` | 信号采样值数组，×10000 定点数 |
| `n` | 采样数量（建议 ≤ 16） |
| `out_re` | 预分配输出数组，存放实部（×10000） |
| `out_im` | 预分配输出数组，存放虚部（×10000） |

**示例**

```redscript
let re: int[] = [0, 0, 0, 0]
let im: int[] = [0, 0, 0, 0]
dft_real(sig, 4, re, im)
```

---

## `dft_magnitude` <Badge type="info" text="v2.0.0" />

返回 DFT 第 k 个频段的幅度（sqrt(re²+im²)），×10000

```redscript
fn dft_magnitude(re: int[], im: int[], k: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `re` | dft_real 输出的实部数组 |
| `im` | dft_real 输出的虚部数组 |
| `k` | 频段索引 |

**返回：** 第 k 频段幅度，×10000

**示例**

```redscript
let mag: int = dft_magnitude(re, im, 1)
```

---

## `dft_power` <Badge type="info" text="v2.0.0" />

返回 DFT 第 k 个频段的功率（re²/10000 + im²/10000），×10000

```redscript
fn dft_power(re: int[], im: int[], k: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `re` | dft_real 输出的实部数组 |
| `im` | dft_real 输出的虚部数组 |
| `k` | 频段索引 |

**返回：** 第 k 频段功率，×10000

**示例**

```redscript
let power: int = dft_power(re, im, 2)
```

---

## `dft_freq_bin` <Badge type="info" text="v2.0.0" />

返回 DFT 第 k 个频段对应的频率（Hz）

```redscript
fn dft_freq_bin(sample_rate_hz: int, n: int, k: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `sample_rate_hz` | 采样率（Hz，如 20 = Minecraft tick 速率） |
| `n` | 变换大小 |
| `k` | 频段索引 |

**返回：** 第 k 频段对应的频率（Hz）

**示例**

```redscript
let freq: int = dft_freq_bin(20, 8, 3)
```

---
