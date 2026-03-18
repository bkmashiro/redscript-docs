# Tutorial 07: Standard Library — Random & Noise

**Difficulty:** Intermediate  
**Time:** ~25 minutes  
**Prerequisites:** [Tutorial 06: Math & Particles](./06-stdlib-math)

## What You'll Build

A treasure chest generator that uses random loot tables, value noise for a natural reward multiplier, and binomial sampling for bonus chests — all seeded from a persistent scoreboard value.

## What You'll Learn

- `import "stdlib/random.mcrs"` — LCG-based pseudo-random numbers
- `next_lcg`, `random_range`, `random_bool`
- `binomial_sample` — probabilistic trial counting
- `import "stdlib/noise.mcrs"` — smooth procedural noise
- `value_noise_1d`, `fbm_1d`, `terrain_height`

## Step 1: The LCG Seed Pattern

RedScript's `random` module uses a **Linear Congruential Generator** (LCG). You maintain a seed variable, advance it with `next_lcg`, and extract values from it:

```rs
import "stdlib/random.mcrs"

@load
fn setup() {
    scoreboard_add_objective("rng_seed", "dummy")
    // Initial seed — any non-zero integer
    scoreboard_set("#seed", "rng_seed", 987654321)
}

fn advance_seed() -> int {
    let seed: int = scoreboard_get("#seed", "rng_seed")
    seed = next_lcg(seed)
    scoreboard_set("#seed", "rng_seed", seed)
    return seed
}
```

Always store the seed in a scoreboard so it persists across ticks and server restarts.

## Step 2: random_range

```rs
// random_range(seed, lo, hi) → int in [lo, hi)   (hi is exclusive)
let seed: int = advance_seed()
let roll: int = random_range(seed, 0, 10)   // 0, 1, 2, ... 9
```

Use this for loot tables:

```rs
fn pick_loot_item(seed: int) -> string {
    let roll: int = random_range(seed, 0, 10)
    if (roll < 2) { return "minecraft:diamond" }     // 20%
    if (roll < 5) { return "minecraft:gold_ingot" }  // 30%
    if (roll < 8) { return "minecraft:iron_ingot" }  // 30%
    return "minecraft:bread"                          // 20%
}
```

## Step 3: value_noise_1d — Smooth Randomness

`random_range` gives independent random values. `value_noise_1d` gives **smooth** values that transition gradually — great for natural-feeling rewards:

```rs
import "stdlib/noise.mcrs"

// value_noise_1d(x_fx) → [0, 10000]
// x_fx is a fixed-point position (×10000)
// Nearby positions return similar values (smooth interpolation)

let seed2: int = advance_seed()
let noise_val: int = value_noise_1d(seed2)  // 0..10000

// Map to [1, 3] using linear mapping: 1 + noise * 2 / 10000
let count: int = 1 + noise_val * 2 / 10000  // 1, 2, or 3
```

## Step 4: binomial_sample — Probability Trials

`binomial_sample(n, p, seed)` simulates n independent Bernoulli trials each with probability p and returns the success count:

```rs
// binomial_sample(n, p_x10000, seed)
// n=3 trials, p=0.25 (25%) each → returns 0, 1, 2, or 3
let seed3: int = advance_seed()
let bonus: int = binomial_sample(3, 2500, seed3)
```

This is more realistic than `random_range` for "how many bonus chests" because it naturally clusters around the expected value (0.75 here).

## Step 5: The Chest Trigger

```rs
@on_trigger("open_chest")
fn open_chest() {
    // Step 1: Pick loot type
    let seed1: int = advance_seed()
    let item: string = pick_loot_item(seed1)

    // Step 2: Smooth noise for quantity (1-3)
    let seed2: int = advance_seed()
    let noise_val: int = value_noise_1d(seed2)
    let count: int = 1 + noise_val * 2 / 10000

    // Step 3: Bonus chests via binomial
    let seed3: int = advance_seed()
    let bonus: int = binomial_sample(3, 2500, seed3)

    give(@s, item, count)
    tell(@s, "Found: " + count + "x loot!")

    if (bonus > 0) {
        tell(@s, "BONUS: " + bonus + " extra chests!")
        let b: int = 0
        while (b < bonus) {
            let bseed: int = advance_seed()
            give(@s, pick_loot_item(bseed), 1)
            b = b + 1
        }
    }
}
```

## Step 6: Terrain Height with FBM

For natural-looking terrain generation, use `fbm_1d` or the convenience function `terrain_height`:

```rs
// terrain_height(x, z, base_y, amplitude)
// Uses 3-octave FBM noise under the hood
let h: int = terrain_height(10, 5, 64, 20)  // base=64, ±20 blocks variation
```

FBM (Fractal Brownian Motion) stacks multiple noise octaves for rich, natural variation:

```rs
// fbm_1d(x_fx, octaves, persistence_fx)
// persistence=5000 means each octave is half the amplitude of the previous
let n: int = fbm_1d(50000, 4, 5000)   // x=5.0, 4 octaves, persistence=0.5
```

## Complete Code

Full example: [tutorial_07_random.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_07_random.mcrs)

## Try It Out

1. Install and `/reload`
2. `/trigger open_chest` several times — observe varied loot and quantities
3. `/trigger terrain_demo` — see noise-based heights for coordinates
4. `/trigger fbm_demo` — see FBM values for 8 positions
5. `/trigger coin_flip` — 50/50 random bool

## Random vs Noise

| Use case | Function | Notes |
|----------|----------|-------|
| Independent random events | `random_range`, `random_bool` | Each call is independent |
| Smooth value over space | `value_noise_1d/2d` | Nearby points → similar values |
| Rich terrain variation | `fbm_1d/2d` | Multi-octave smooth noise |
| Count successes in n trials | `binomial_sample` | More realistic than simple % |
| Terrain generation | `terrain_height` | Convenience wrapper for fbm_2d |

## Next Steps

→ [Tutorial 08: Coroutines — Spread Heavy Work](./08-coroutines)
