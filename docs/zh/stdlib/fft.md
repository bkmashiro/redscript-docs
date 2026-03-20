# `fft` — 离散傅里叶变换（DFT）

导入：`import "stdlib/fft.mcrs"`

用于 RedScript datapack 的频域分析。实现了 O(n²) 直接离散傅里叶变换（DFT），而非 Cooley-Tukey FFT——因为 RedScript 不允许 FFT 所需的递归。对于 datapack 实际用到的小变换规模（n ≤ 16），DFT 在每个服务器 tick 内运行时间远低于 1 ms，完全可行。

**DFT vs FFT 权衡：**

| n  | DFT 乘法次数 | FFT 乘法次数 | DFT 慢几倍 |
|----|--------------|--------------|------------|
| 4  | 16           | 8            | 2×         |
| 8  | 64           | 24           | 2.7×       |
| 16 | 256          | 64           | 4×         |

**定点数约定：** 输入和输出使用 ×10000 缩放（1.0 → 10000，−1.0 → −10000）。三角函数（`math.mcrs` 中的 `sin_fixed` / `cos_fixed`）使用 ×1000 缩放。将样本（×10000）乘以三角值（×1000）时，模块会除以 1000 以保持结果在 ×10000 尺度。

**限制：** 强烈建议 n ≤ 16。在 n=32 时，内层循环每次调用执行 1024 次乘除法，有造成 tick 卡顿的风险。

## 使用示例

检测 4 个样本、采样率 4 Hz 的信号中的主频：

```rs
import "stdlib/fft.mcrs";

// 1 Hz 方波：[1.0, 0.0, -1.0, 0.0]，以 ×10000 表示
let sig: int[] = [10000, 0, -10000, 0];
let re: int[] = [0, 0, 0, 0];
let im: int[] = [0, 0, 0, 0];
dft_real(sig, 4, re, im);

// 找到功率最大的频率 bin
let max_power: int = 0;
let dominant_k: int = 0;
let k: int = 0;
while (k < 4) {
    let pw: int = dft_power(re, im, k);
    if (pw > max_power) { max_power = pw; dominant_k = k; }
    k = k + 1;
}

// 将 bin 索引转换为 Hz：主频 = 1 Hz
let freq_hz: int = dft_freq_bin(4, 4, dominant_k);
```

## 函数

### `dft_real(input: int[], n: int, out_re: int[], out_im: int[]): void`

计算 `input[0..n-1]` 的离散傅里叶变换。

```
X[k] = Σ_{j=0}^{n-1}  x[j] · cos(360·k·j/n)   （实部）
                      − x[j] · sin(360·k·j/n)   （虚部）
```

| 参数      | 说明 |
|-----------|------|
| `input`   | 以 ×10000 定点数表示的信号样本 |
| `n`       | 样本数量（建议 ≤ 16） |
| `out_re`  | 实部输出数组（×10000）；必须预先分配 `n` 个元素并清零 |
| `out_im`  | 虚部输出数组（×10000）；必须预先分配 `n` 个元素并清零 |

> **注意：** 调用前必须将 `out_re` 和 `out_im` 清零。结果原地写入。

---

### `dft_magnitude(re: int[], im: int[], k: int): int`

以 ×10000 定点数返回 bin k 的幅度 |X[k]| = √(re[k]² + im[k]²)。

使用整数平方根避免浮点运算。对 ×10000 的值求平方每项可达约 10⁹；对于每样本幅度超过约 10000 的信号，调用前应先将输入除以一个缩放因子，以防止 int32 溢出。

**示例：**
```rs
let mag: int = dft_magnitude(re, im, 1);  // bin 1 的幅度，×10000
```

---

### `dft_power(re: int[], im: int[], k: int): int`

返回 bin k 的功率谱值：`re[k]²/10000 + im[k]²/10000`。

除以 10000 可防止典型信号幅度下的 int32 溢出。结果以 ×10000 为单位（功率单位）。用于在无需求平方根的情况下比较各 bin 的强度。

**示例：**
```rs
let pw: int = dft_power(re, im, 2);  // bin 2 的功率
```

---

### `dft_coro(input: int[], n: int, out_re: int[], out_im: int[]): void`

`dft_real` 的 coroutine 变体。标记为 `@coroutine(batch=4)`，每 tick 处理 **4 个输出 bin**，将工作分散到多个 tick 中。接受可选的 `onDone` 回调（默认：`dft_noop`），在整个 DFT 完成时触发。

参数与 `dft_real` 相同。调用前必须将 `out_re` 和 `out_im` 清零。

> **注意：** 由于执行分散在多个 tick 中，在 `onDone` 回调触发之前请勿读取 `out_re`/`out_im`。对于 n=16，变换在 4 个 tick 内完成（16 个 bin ÷ 4 个 bin/tick）。

**示例：**
```rs
fn on_done(): void {
    // 在此处读取 re/im 是安全的
    let mag: int = dft_magnitude(re, im, 1);
}

dft_coro(sig, 8, re, im);  // 启动；2 个 tick 后 on_done 触发
```

---

### `dft_freq_bin(sample_rate_hz: int, n: int, k: int): int`

返回 DFT bin `k` 对应的频率（单位 Hz）。

```
freq = sample_rate_hz × k / n
```

| 参数              | 说明 |
|-------------------|------|
| `sample_rate_hz`  | 采样率（Hz），例如 Minecraft tick 速率为 20 |
| `n`               | 变换大小 |
| `k`               | bin 索引（0 … n−1） |

**示例：**
```rs
// Minecraft 以 20 Hz 运行；16 点 DFT；bin 4 → 5 Hz
let freq: int = dft_freq_bin(20, 16, 4);  // 5
```

---

### `dft_noop(): void`

`dft_coro` 的默认无操作 `onDone` 回调。什么都不做。替换为你自己的函数以在 `dft_coro` 完成时获得通知。
