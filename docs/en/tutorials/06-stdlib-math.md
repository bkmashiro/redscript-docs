# Tutorial 06: Standard Library — Math & Particles

**Difficulty:** Intermediate  
**Time:** ~25 minutes  
**Prerequisites:** [Tutorial 05: Decorators & Scheduling](./05-decorators)

## What You'll Build

A collection of visual effects: a circle of flame particles, a helix of enchant particles, and a sine wave drawn with end_rod particles — all using the `math` and `particles` standard library modules.

## What You'll Learn

- `import "stdlib/math.mcrs"` and `import "stdlib/particles.mcrs"`
- `sin_fixed`, `cos_fixed` — trig in degrees, result ×1000
- `sqrt_fixed`, `sqrt_fx` — square roots
- `lerp`, `clamp`, `abs`, `min`, `max`
- `mulfix` — multiply two fixed-point values
- `draw_circle`, `draw_helix`, `particle_dot` from particles stdlib

## Step 1: Importing

```rs
import "stdlib/math.mcrs"
import "stdlib/particles.mcrs"
```

`import "stdlib/math.mcrs"` pulls in all functions from the `math` standard library. No path needed — RedScript resolves stdlib modules automatically.

## Step 2: Core Math Functions

```rs
fn demo_math() {
    // abs — absolute value
    let neg: int = abs(-42)           // 42

    // min / max
    let lo: int = min(10, 20)         // 10
    let hi: int = max(10, 20)         // 20

    // clamp — restrict to [lo, hi]
    let clamped: int = clamp(150, 0, 100)  // 100

    // isqrt — integer floor square root
    let root: int = isqrt(144)        // 12

    // sqrt_fixed — sqrt with scale=1000
    // sqrt_fixed(2000) means sqrt(2.0) * 1000 ≈ 1414
    let sq2: int = sqrt_fixed(2000)   // 1414

    // sqrt_fx — sqrt with scale=10000
    let sq2_hp: int = sqrt_fx(20000)  // 14142

    // lerp — linear interpolation, t in [0, 1000]
    // lerp(a, b, 500) = midpoint of a and b
    let mid: int = lerp(100, 200, 500)  // 150
}
```

## Step 3: Trigonometry

The `math` module uses **integer degrees** and returns values **×1000**:

```rs
// sin_fixed(degrees) → sin(deg) × 1000
let sin30: int = sin_fixed(30)   // 500  (sin 30° = 0.5)
let sin90: int = sin_fixed(90)   // 1000 (sin 90° = 1.0)
let sin45: int = sin_fixed(45)   // 707  (sin 45° ≈ 0.707)

// cos_fixed(degrees) → cos(deg) × 1000
let cos0: int = cos_fixed(0)     // 1000 (cos 0° = 1.0)
let cos60: int = cos_fixed(60)   // 500  (cos 60° = 0.5)

// mulfix — multiply two ×1000 values: a*b/1000
// e.g. sin(30°) * cos(60°) = 0.5 * 0.5 = 0.25 * 1000 = 250
let prod: int = mulfix(sin30, cos60)  // 250
```

## Step 4: Draw a Circle

The `particles` stdlib provides `draw_circle()` which uses `sin_fixed`/`cos_fixed` internally:

```rs
@on_trigger("draw_circle")
fn do_draw_circle() {
    // draw_circle(cx, cy, cz, radius_x100, steps, particle)
    // radius_x100=500 means 5.0 blocks radius
    draw_circle(0, 65, 0, 500, 36, "minecraft:flame")
    tell(@s, "Drew a circle of 36 flame particles!")
}
```

## Step 5: Draw a Helix

```rs
@on_trigger("draw_helix")
fn do_draw_helix() {
    // draw_helix(cx, cy_start, cz, radius_x100, height, rotations, steps, particle)
    draw_helix(0, 64, 0, 300, 10, 3, 60, "minecraft:enchant")
    tell(@s, "Drew a helix rising 10 blocks with 3 rotations!")
}
```

## Step 6: Manual Sine Wave

Drawing a sine wave manually shows how trig functions work:

```rs
@on_trigger("draw_sine")
fn draw_sine_wave() {
    let i: int = 0
    while (i < 36) {
        let angle: int = i * 10          // 0° to 350° in steps of 10°
        let sin_val: int = sin_fixed(angle)  // -1000 to +1000

        // Y offset: ±3 blocks amplitude
        let y_offset: int = sin_val * 3 / 1000
        let y_pos: int = 65 + y_offset

        // particle_dot places a single particle at integer block coords
        particle_dot(i, y_pos, 0, "minecraft:end_rod")
        i = i + 1
    }
    tell(@s, "Drew a sine wave!")
}
```

The key formula: `y = base + sin(angle) * amplitude / 1000` — divide by 1000 because `sin_fixed` uses ×1000 scale.

## Complete Code

Full example: [tutorial_06_math_particles.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_06_math_particles.mcrs)

## Try It Out

1. Install and `/reload`
2. `/trigger demo_math` — see math results in chat
3. `/trigger draw_circle` — ring of flame appears at (0, 65, 0)
4. `/trigger draw_helix` — spiral enchant particles rise 10 blocks
5. `/trigger draw_sine` — end_rod sine wave at Z=0

## Math Stdlib Quick Reference

| Function | Input | Output | Notes |
|----------|-------|--------|-------|
| `abs(x)` | int | int | Absolute value |
| `min(a,b)` | int | int | Smaller of two |
| `max(a,b)` | int | int | Larger of two |
| `clamp(x,lo,hi)` | int | int | Constrain to range |
| `isqrt(n)` | int | int | Floor square root |
| `sqrt_fixed(x)` | int ×1000 | int ×1000 | Fixed sqrt |
| `sqrt_fx(x)` | int ×10000 | int ×10000 | Fixed sqrt |
| `sin_fixed(deg)` | degrees | int ×1000 | Sine |
| `cos_fixed(deg)` | degrees | int ×1000 | Cosine |
| `lerp(a,b,t)` | t ∈ [0,1000] | int | Interpolate |
| `mulfix(a,b)` | int ×1000 each | int ×1000 | a*b/1000 |

## Next Steps

→ [Tutorial 07: Standard Library — Random & Noise](./07-stdlib-random)
