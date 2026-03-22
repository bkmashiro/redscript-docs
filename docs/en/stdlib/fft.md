# Fft

> Auto-generated from `src/stdlib/fft.mcrs` — do not edit manually.

## API

- [dft_noop](#dft-noop)
- [dft_real](#dft-real)
- [dft_magnitude](#dft-magnitude)
- [dft_power](#dft-power)
- [dft_freq_bin](#dft-freq-bin)

---

## `dft_noop` <Badge type="info" text="Since v2.0.0" />

Default no-op completion callback for `dft_coro`. Does nothing.

```redscript
fn dft_noop(): void
```

---

## `dft_real` <Badge type="info" text="Since v2.0.0" />

Compute the Discrete Fourier Transform of `input[0..n-1]`.

Output arrays must be pre-allocated to length `n` and filled with zeros
before calling.

Formula: `X[k] = Σ x[j] * (cos(2πkj/n) - i·sin(2πkj/n))`

```redscript
fn dft_real(input: int[], n: int, out_re: int[], out_im: int[])
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `input` | Signal samples in fixed-point ×10000 |
| `n` | Number of samples (≤ 16 recommended) |
| `out_re` | Pre-allocated output array for real parts (×10000) |
| `out_im` | Pre-allocated output array for imaginary parts (×10000) |

**Example**

```redscript
let re: int[] = [0, 0, 0, 0]
let im: int[] = [0, 0, 0, 0]
dft_real(sig, 4, re, im)
```

---

## `dft_magnitude` <Badge type="info" text="Since v2.0.0" />

Return the magnitude of DFT bin `k`: `|X[k]| = sqrt(re[k]² + im[k]²)` in ×10000.

Note: squaring ×10000 values can reach ~10⁹ per term, which fits in int32 for
amplitudes ≤ ~46340. For larger amplitudes, scale the input before calling.

```redscript
fn dft_magnitude(re: int[], im: int[], k: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `re` | Real output array from `dft_real` |
| `im` | Imaginary output array from `dft_real` |
| `k` | Bin index |

**Returns:** Magnitude of bin `k` in ×10000 fixed-point

**Example**

```redscript
let mag: int = dft_magnitude(re, im, 1)
```

---

## `dft_power` <Badge type="info" text="Since v2.0.0" />

Return the power spectrum value for bin `k`: `re[k]²/10000 + im[k]²/10000`.

Division by 10000 prevents int32 overflow for values up to ~46340 (×10000).
The result is in ×10000 scale (power units).

```redscript
fn dft_power(re: int[], im: int[], k: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `re` | Real output array from `dft_real` |
| `im` | Imaginary output array from `dft_real` |
| `k` | Bin index |

**Returns:** Power of bin `k` in ×10000 units

**Example**

```redscript
let power: int = dft_power(re, im, 2)
```

---

## `dft_freq_bin` <Badge type="info" text="Since v2.0.0" />

Return the frequency (Hz) corresponding to DFT bin `k`.

Formula: `freq = sample_rate_hz * k / n`

```redscript
fn dft_freq_bin(sample_rate_hz: int, n: int, k: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `sample_rate_hz` | Sampling rate in Hz (e.g. `20` for Minecraft tick rate) |
| `n` | Transform size (number of samples) |
| `k` | Bin index in range [0, n-1] |

**Returns:** Frequency in Hz for bin `k`

**Example**

```redscript
let freq: int = dft_freq_bin(20, 8, 3)
```

---
