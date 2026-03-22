# Random

> Auto-generated from `src/stdlib/random.mcrs` — do not edit manually.

## API

- [next_lcg](#next-lcg)
- [random_range](#random-range)
- [random_bool](#random-bool)
- [pcg_next_lo](#pcg-next-lo)
- [pcg_next_hi](#pcg-next-hi)
- [pcg_output](#pcg-output)
- [binomial_sample](#binomial-sample)
- [hypergeometric_sample](#hypergeometric-sample)

---

## `next_lcg`

**Since:** 1.0.0

Advance the LCG state by one step, returning the next pseudo-random int32.
The returned value is also the new seed for the next call.

```redscript
fn next_lcg(seed: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `seed` | Current LCG state (any non-zero integer to start) |

**Returns:** Next pseudo-random int32 (also serves as next seed)

**Example**

```redscript
let seed: int = 12345
seed = next_lcg(seed)
seed = next_lcg(seed)  // advance two steps
```

---

## `random_range`

**Since:** 1.0.0

Generate a pseudo-random integer in the range [lo, hi).

```redscript
fn random_range(seed: int, lo: int, hi: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `seed` | LCG output value (result of next_lcg) |
| `lo` | Inclusive lower bound |
| `hi` | Exclusive upper bound (must be > lo) |

**Returns:** Integer in [lo, hi)

**Example**

```redscript
seed = next_lcg(seed)
let roll: int = random_range(seed, 1, 7)  // dice roll: 1-6
```

---

## `random_bool`

**Since:** 1.0.0

Generate a pseudo-random boolean (0 or 1) with equal probability.

```redscript
fn random_bool(seed: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `seed` | LCG output value (result of next_lcg) |

**Returns:** 0 or 1 with ~50% probability each

**Example**

```redscript
seed = next_lcg(seed)
let coin: int = random_bool(seed)  // 0 or 1
```

---

## `pcg_next_lo`

**Since:** 1.0.0

Advance the PCG low-word state by one step.
Call together with pcg_next_hi; use pcg_output to extract the random value.

```redscript
fn pcg_next_lo(state_lo: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `state_lo` | Current low word of PCG state |

**Returns:** New low word

**Example**

```redscript
let lo: int = pcg_next_lo(state_lo)
```

---

## `pcg_next_hi`

**Since:** 1.0.0

Advance the PCG high-word state by one step.

```redscript
fn pcg_next_hi(state_hi: int, state_lo: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `state_hi` | Current high word of PCG state |
| `state_lo` | Current low word of PCG state (previous, before pcg_next_lo) |

**Returns:** New high word

**Example**

```redscript
let hi: int = pcg_next_hi(state_hi, state_lo)
```

---

## `pcg_output`

**Since:** 1.0.0

Extract an output value from the PCG low word using XSH-RR permutation.

```redscript
fn pcg_output(state_lo: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `state_lo` | Current low word of PCG state (after pcg_next_lo) |

**Returns:** Pseudo-random output value (unsigned, any int)

**Example**

```redscript
let rng: int = pcg_output(state_lo)
```

---

## `binomial_sample`

**Since:** 1.0.0

Simulate n Bernoulli trials and count the number of successes (binomial distribution).

```redscript
fn binomial_sample(n: int, p_x10000: int, seed: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `n` | Number of trials |
| `p_x10000` | Success probability ×10000 (e.g. 5000 = 50%, 3000 = 30%) |
| `seed` | LCG seed (any non-zero integer) |

**Returns:** Number of successes in [0, n]

**Example**

```redscript
let hits: int = binomial_sample(10, 5000, 99999)  // ~5 successes on average
```

---

## `hypergeometric_sample`

**Since:** 1.0.0

Draw `draws` items without replacement from a population and count successes (hypergeometric distribution).

```redscript
fn hypergeometric_sample(pop_size: int, success_states: int, draws: int, seed: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `pop_size` | Total population size |
| `success_states` | Number of "success" items in the population |
| `draws` | Number of items to draw |
| `seed` | LCG seed (any non-zero integer) |

**Returns:** Number of successes drawn, in [0, min(draws, success_states)]

**Example**

```redscript
// 52-card deck, 4 aces, draw 5 cards
let aces: int = hypergeometric_sample(52, 4, 5, 42)
```

---
