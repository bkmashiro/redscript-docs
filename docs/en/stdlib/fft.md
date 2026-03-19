# `fft` — Discrete Fourier Transform (DFT)

Import: `import "stdlib/fft.mcrs"`

Frequency-domain analysis for RedScript datapacks. Implements the O(n²) straight Discrete Fourier Transform (DFT) rather than a Cooley-Tukey FFT, because RedScript forbids the recursion that FFT requires. For the small transform sizes that datapacks ever need (n ≤ 16), the DFT runs in well under 1 ms per server tick, making it entirely practical.

**DFT vs FFT tradeoff:**

| n  | DFT mults | FFT mults | DFT slowdown |
|----|-----------|-----------|--------------|
| 4  | 16        | 8         | 2×           |
| 8  | 64        | 24        | 2.7×         |
| 16 | 256       | 64        | 4×           |

**Fixed-point convention:** Inputs and outputs use ×10000 scaling (1.0 → 10000, −1.0 → −10000). Trig functions (`sin_fixed` / `cos_fixed` from `math.mcrs`) use ×1000 scaling. When multiplying a sample (×10000) by a trig value (×1000), the module divides by 1000 to keep results in ×10000 scale.

**Limitation:** n ≤ 16 is strongly recommended. At n=32 the inner loop runs 1024 multiply-divide pairs per call and risks tick lag.

## Usage Example

Detect the dominant frequency in a 4-sample signal sampled at 4 Hz:

```rs
import "stdlib/fft.mcrs";

// 1 Hz square wave: [1.0, 0.0, -1.0, 0.0] in ×10000
let sig: int[] = [10000, 0, -10000, 0];
let re: int[] = [0, 0, 0, 0];
let im: int[] = [0, 0, 0, 0];
dft_real(sig, 4, re, im);

// Find the bin with maximum power
let max_power: int = 0;
let dominant_k: int = 0;
let k: int = 0;
while (k < 4) {
    let pw: int = dft_power(re, im, k);
    if (pw > max_power) { max_power = pw; dominant_k = k; }
    k = k + 1;
}

// Translate bin index to Hz: dominant_frequency = 1 Hz
let freq_hz: int = dft_freq_bin(4, 4, dominant_k);
```

## Functions

### `dft_real(input: int[], n: int, out_re: int[], out_im: int[]): void`

Compute the Discrete Fourier Transform of `input[0..n-1]`.

```
X[k] = Σ_{j=0}^{n-1}  x[j] · cos(360·k·j/n)   (real part)
                      − x[j] · sin(360·k·j/n)   (imaginary part)
```

| Parameter | Description |
|-----------|-------------|
| `input`   | Signal samples in ×10000 fixed-point |
| `n`       | Number of samples (≤ 16 recommended) |
| `out_re`  | Output array for real parts (×10000); must be pre-allocated to `n` elements and zeroed |
| `out_im`  | Output array for imaginary parts (×10000); must be pre-allocated to `n` elements and zeroed |

> **Note:** The caller must zero `out_re` and `out_im` before calling. Results are written in-place.

---

### `dft_magnitude(re: int[], im: int[], k: int): int`

Return the magnitude |X[k]| = √(re[k]² + im[k]²) in ×10000 fixed-point.

Uses integer square root to avoid floating-point. Squaring ×10000 values can reach ~10⁹ per term; for signals with per-sample amplitudes above ~10000, divide inputs by a scale factor before calling to prevent int32 overflow.

**Example:**
```rs
let mag: int = dft_magnitude(re, im, 1);  // magnitude of bin 1, ×10000
```

---

### `dft_power(re: int[], im: int[], k: int): int`

Return the power spectrum value for bin k: `re[k]²/10000 + im[k]²/10000`.

Division by 10000 prevents int32 overflow for typical signal amplitudes. The result is in ×10000 scale (power units). Use this for comparing bin strengths without needing the square root.

**Example:**
```rs
let pw: int = dft_power(re, im, 2);  // power in bin 2
```

---

### `dft_coro(input: int[], n: int, out_re: int[], out_im: int[]): void`

Coroutine variant of `dft_real`. Decorated with `@coroutine(batch=4)`, it processes **4 output bins per tick**, spreading the workload across multiple ticks. Accepts an optional `onDone` callback (default: `dft_noop`) that fires when the full DFT is complete.

Parameters are identical to `dft_real`. The caller must zero `out_re` and `out_im` before starting.

> **Note:** Because execution is spread across ticks, do not read `out_re`/`out_im` until the `onDone` callback fires. For n=16, the transform completes in 4 ticks (16 bins ÷ 4 bins/tick).

**Example:**
```rs
fn on_done(): void {
    // safe to read re/im here
    let mag: int = dft_magnitude(re, im, 1);
}

dft_coro(sig, 8, re, im);  // starts; on_done fires 2 ticks later
```

---

### `dft_freq_bin(sample_rate_hz: int, n: int, k: int): int`

Return the frequency in Hz corresponding to DFT bin `k`.

```
freq = sample_rate_hz × k / n
```

| Parameter        | Description |
|------------------|-------------|
| `sample_rate_hz` | Sampling rate in Hz (e.g. 20 for the Minecraft tick rate) |
| `n`              | Transform size |
| `k`              | Bin index (0 … n−1) |

**Example:**
```rs
// Minecraft ticks at 20 Hz; 16-point DFT; bin 4 → 5 Hz
let freq: int = dft_freq_bin(20, 16, 4);  // 5
```

---

### `dft_noop(): void`

Default no-op `onDone` callback for `dft_coro`. Does nothing. Replace with your own function to be notified when `dft_coro` finishes.
