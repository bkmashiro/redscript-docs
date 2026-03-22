# Signal

> Auto-generated from `src/stdlib/signal.mcrs` — do not edit manually.

## API

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

Return a uniform integer in `[lo, hi]` inclusive.

Uses LCG RNG. Pass the result as the seed for the next call to chain samples.

```redscript
fn uniform_int(seed: int, lo: int, hi: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `seed` | Any integer seed value |
| `lo` | Inclusive lower bound |
| `hi` | Inclusive upper bound |

**Returns:** Pseudo-random integer in [lo, hi]

**Example**

```redscript
let dmg: int = uniform_int(seed, 5, 15)
```

---

## `uniform_frac` <Badge type="info" text="v2.0.0" />

Return a uniform fraction in [0, 10000] (×10000 scale).

```redscript
fn uniform_frac(seed: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `seed` | Any integer seed value |

**Returns:** Pseudo-random integer in [0, 10000]

**Example**

```redscript
let frac: int = uniform_frac(seed)
```

---

## `normal_approx12` <Badge type="info" text="v2.0.0" />

Approximate N(0, 1) variate using the Irwin–Hall method (sum of 12 uniform samples).

Result is in ×10000 scale, range approximately [−60000, 60000].
Each call chains the seed 12 times internally.

```redscript
fn normal_approx12(seed: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `seed` | Any integer seed value |

**Returns:** Approximate N(0,1) sample ×10000

**Example**

```redscript
let z: int = normal_approx12(seed)
```

---

## `exp_dist_approx` <Badge type="info" text="v2.0.0" />

Sample from an exponential distribution with rate `lambda_fx`.

Method: `-ln(U) / λ` where `U ~ Uniform(0.01, 1)`. Result is capped at
`100000` (= 10.0 × 10000) for Minecraft sanity.

Requires `import "stdlib/math"` for the `ln` function.

```redscript
fn exp_dist_approx(seed: int, lambda_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `seed` | Any integer seed value |
| `lambda_fx` | Rate parameter ×10000 (e.g. `10000` = rate 1.0) |

**Returns:** Exponential variate ×10000, capped at 100000

**Example**

```redscript
let wait: int = exp_dist_approx(seed, 10000)
```

---

## `bernoulli` <Badge type="info" text="v2.0.0" />

Return `1` with probability `p_fx / 10000`, otherwise `0`.

```redscript
fn bernoulli(seed: int, p_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `seed` | Any integer seed value |
| `p_fx` | Probability ×10000 (e.g. `5000` = 50%, `1000` = 10%) |

**Returns:** `1` with the given probability, `0` otherwise

**Example**

```redscript
if (bernoulli(seed, 3000) == 1) { /* 30% chance */ }
```

---

## `weighted2` <Badge type="info" text="v2.0.0" />

Choose `0` or `1` with the given integer weights.

```redscript
fn weighted2(seed: int, w0: int, w1: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `seed` | Any integer seed value |
| `w0` | Weight for outcome `0` |
| `w1` | Weight for outcome `1` |

**Returns:** `0` or `1` sampled proportionally to the weights

**Example**

```redscript
let side: int = weighted2(seed, 3, 7)
```

---

## `weighted3` <Badge type="info" text="v2.0.0" />

Choose `0`, `1`, or `2` with the given integer weights.

```redscript
fn weighted3(seed: int, w0: int, w1: int, w2: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `seed` | Any integer seed value |
| `w0` | Weight for outcome `0` |
| `w1` | Weight for outcome `1` |
| `w2` | Weight for outcome `2` |

**Returns:** `0`, `1`, or `2` sampled proportionally to the weights

**Example**

```redscript
let tier: int = weighted3(seed, 50, 30, 20)
```

---

## `gamma_sample` <Badge type="info" text="v2.0.0" />

Sample from a Gamma(k, θ) distribution via summing k exponential samples.

Handles integer shape `k = 1..5` (pass `shape_k × 10000`).
Requires `ln` from `stdlib/math`.

```redscript
fn gamma_sample(shape_k: int, scale_theta: int, seed: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `shape_k` | Shape parameter k ×10000 (e.g. `20000` = k=2) |
| `scale_theta` | Scale parameter θ ×10000 (e.g. `10000` = θ=1.0) |
| `seed` | Any integer seed value |

**Returns:** Gamma variate ×10000

**Example**

```redscript
let g: int = gamma_sample(20000, 10000, seed)
```

---

## `poisson_sample` <Badge type="info" text="v2.0.0" />

Sample from a Poisson(λ) distribution using the Knuth algorithm.

Works well for `lambda ≤ 20` (200000 in ×10000). Hard cap at 100 iterations.
Requires `exp_fx` from `stdlib/math`.

```redscript
fn poisson_sample(lambda: int, seed: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `lambda` | Rate parameter ×10000 (e.g. `30000` = λ=3.0) |
| `seed` | Any integer seed value |

**Returns:** Poisson count (plain integer, not ×10000)

**Example**

```redscript
let n: int = poisson_sample(30000, seed)
```

---

## `geometric_sample` <Badge type="info" text="v2.0.0" />

Sample from a Geometric(p) distribution (number of failures before first success).

Method: `floor(ln(U) / ln(1 - p))`. Requires `ln` from `stdlib/math`.

```redscript
fn geometric_sample(p_success: int, seed: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `p_success` | Success probability ×10000 (e.g. `5000` = p=0.5) |
| `seed` | Any integer seed value |

**Returns:** Non-negative integer count of failures

**Example**

```redscript
let fails: int = geometric_sample(5000, seed)
```

---

## `negative_binomial_sample` <Badge type="info" text="v2.0.0" />

Sample from a Negative Binomial NegBin(r, p) distribution.

Method: sum `r` independent Geometric(p) samples.

```redscript
fn negative_binomial_sample(r: int, p_success: int, seed: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `r` | Number of successes (plain integer, e.g. 1, 2, 3) |
| `p_success` | Success probability ×10000 (e.g. `5000` = p=0.5) |
| `seed` | Any integer seed value |

**Returns:** Total number of failures before `r` successes

**Example**

```redscript
let n: int = negative_binomial_sample(3, 5000, seed)
```

---

## `dft_real` <Badge type="info" text="v2.0.0" />

Real part of DFT bin `k` for a real-valued signal with up to 8 samples.

All values use ×10000 scale. Angle convention: multiples of 45°.
Unused sample arguments (beyond `n`) are ignored.

Formula: `real[k] = (1/n) Σ samples[j] × cos(2πkj/n)`

```redscript
fn dft_real(s0: int, s1: int, s2: int, s3: int, s4: int, s5: int, s6: int, s7: int, n: int, k: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `s0` | Sample 0 ×10000   …   @param s7  Sample 7 ×10000 |
| `n` | Number of samples (1–8) |
| `k` | Bin index (0 to n−1) |

**Returns:** Real part of DFT bin k, ×10000

**Example**

```redscript
let re0: int = dft_real(10000, 0, -10000, 0, 0, 0, 0, 0, 4, 0)
```

---

## `dft_imag` <Badge type="info" text="v2.0.0" />

Imaginary part of DFT bin `k` for a real-valued signal with up to 8 samples.

Uses the negative-sine convention: `imag[k] = -(1/n) Σ samples[j] × sin(2πkj/n)`

```redscript
fn dft_imag(s0: int, s1: int, s2: int, s3: int, s4: int, s5: int, s6: int, s7: int, n: int, k: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `s0` | Sample 0 ×10000   …   @param s7  Sample 7 ×10000 |
| `n` | Number of samples (1–8) |
| `k` | Bin index (0 to n−1) |

**Returns:** Imaginary part of DFT bin k, ×10000

---

## `dft_magnitude` <Badge type="info" text="v2.0.0" />

Magnitude of DFT bin `k`: `sqrt(real² + imag²)` in ×10000.

```redscript
fn dft_magnitude(s0: int, s1: int, s2: int, s3: int, s4: int, s5: int, s6: int, s7: int, n: int, k: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `s0` | Sample 0 ×10000   …   @param s7  Sample 7 ×10000 |
| `n` | Number of samples (1–8) |
| `k` | Bin index (0 to n−1) |

**Returns:** Magnitude of DFT bin k in ×10000

**Example**

```redscript
let mag: int = dft_magnitude(10000, 0, -10000, 0, 0, 0, 0, 0, 4, 1)
```

---
