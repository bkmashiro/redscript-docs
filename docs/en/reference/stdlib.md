# Standard Library

RedScript includes a standard library with common utilities, including the v1.2 Timer OOP API and 313 Minecraft tag constants.

## v2.5.0 New Features

### `double` and `fixed` types

v2.5.0 introduces two significant type system changes:

**`fixed` type (renamed from `float`):** Fixed-point integers at ×10000 scale. `10000` = 1.0, `15000` = 1.5. Use `mulfix(a, b)` for multiplication (divides by 1000 internally to re-scale). Use `as fixed` to convert from `int` or `double`.

**`double` type:** IEEE 754 double-precision float backed by NBT storage (`rs:d`). Used for high-precision trig, physics, and computations that overflow int32. Functions in `math_hp.mcrs` operate on `double` values.

```mcrs
let x: int    = 5;
let f: fixed  = x as fixed;   // 50000 (5 × 10000)
let d: double = x as double;  // 5.0

// Convert back
let n2: int   = d as int;     // 5
let f2: fixed = d as fixed;   // 50000
```

> **Casting is required.** Implicit numeric coercion is removed in v2.5.0. Assigning an `int` to a `fixed` or `double` without `as` is a compile error.
>
> **`float` arithmetic lint warning.** Any arithmetic on `fixed` (previously `float`) values that bypasses `mulfix`/`divfix` will emit a lint warning: *"fixed-point multiplication without mulfix — result will not be rescaled"*.

### Key fact: `mulfix(a, b)` divisor is 1000

`mulfix` divides the raw product by **1000**, not 10000. This is intentional for the ×1000-scale sub-operations used in `vec.mcrs`, `easing.mcrs`, and similar modules. When working at ×10000 scale, keep this in mind:

```mcrs
// Both a, b are ×10000 → raw product is ×100,000,000 → ÷1000 → ×100,000 ???
// Actually mulfix is designed for ×1000 operands in most stdlib usage.
// For two ×10000 fixed values: use (a * b) / 10000 directly, or mulfix(a/10, b/10).
let result: int = mulfix(15000, 20000);  // 15000*20000/1000 = 300,000  (not 30000!)
// For ×10000 × ×10000 → ×10000: use (a * b / 10000)
let r2: int = 15000 * 20000 / 10000;    // 30000 ✓
```

## Usage

```mcrs
import "stdlib/effects.mcrs"
import "stdlib/world.mcrs"

fn game_start() {
    set_day();
    weather_clear();
    buff_all(@a, 600);
}
```

## Modules

### math.mcrs

Basic math operations.

```mcrs
import "stdlib/math.mcrs"

fn example() {
    let a = abs(-5);        // 5
    let b = min(3, 7);      // 3
    let c = max(3, 7);      // 7
    let d = clamp(15, 0, 10); // 10
    let s = sign(-42);      // -1
}
```

| Function | Description |
|----------|-------------|
| `abs(x)` | Absolute value |
| `min(a, b)` | Minimum of two values |
| `max(a, b)` | Maximum of two values |
| `clamp(x, min, max)` | Clamp to range |
| `sign(x)` | Sign (-1, 0, or 1) |

### effects.mcrs

Effect shortcuts for common potion effects.

```mcrs
import "stdlib/effects.mcrs"

fn power_up() {
    speed(@p, 200, 2);      // Speed II for 10 seconds
    strength(@p, 200, 1);   // Strength I for 10 seconds
    regen(@p, 100, 0);      // Regen I for 5 seconds
}
```

| Function | Description |
|----------|-------------|
| `speed(target, duration, level)` | Speed effect |
| `jump(target, duration, level)` | Jump boost |
| `regen(target, duration, level)` | Regeneration |
| `resistance(target, duration, level)` | Resistance |
| `strength(target, duration, level)` | Strength |
| `invisible(target, duration)` | Invisibility |
| `night_vision(target, duration)` | Night vision |
| `slow_fall(target, duration)` | Slow falling |
| `glow(target, duration)` | Glowing |
| `clear_effects(target)` | Remove all effects |
| `buff_all(target, duration)` | Speed + strength + regen + resistance |

### world.mcrs

World and game rule utilities.

```mcrs
import "stdlib/world.mcrs"

@load
fn setup() {
    set_day();
    weather_clear();
    enable_keep_inventory();
    disable_mob_griefing();
}
```

**Time:**
- `set_day()`, `set_night()`, `set_noon()`, `set_midnight()`

**Weather:**
- `weather_clear()`, `weather_rain()`, `weather_thunder()`

**Gamerules:**
- `enable_keep_inventory()`, `disable_keep_inventory()`
- `disable_mob_griefing()`, `disable_fire_spread()`

**Difficulty:**
- `set_peaceful()`, `set_easy()`, `set_normal()`, `set_hard()`

**Building:**
- `barrier_wall(x1, y1, z1, x2, y2, z2)` — Create barrier wall
- `clear_area(x1, y1, z1, x2, y2, z2)` — Fill with air
- `glass_box(x1, y1, z1, x2, y2, z2)` — Hollow glass box

### inventory.mcrs

Inventory management.

```mcrs
import "stdlib/inventory.mcrs"

fn respawn_player(player: selector) {
    clear_inventory(player);
    give_kit_warrior(player);
}
```

| Function | Description |
|----------|-------------|
| `clear_inventory(target)` | Clear all items |
| `give_kit_warrior(target)` | Iron armor + sword + shield |
| `give_kit_archer(target)` | Bow + arrows + leather armor |
| `give_kit_mage(target)` | Potions + ender pearls |
| `remove_item(target, item)` | Remove specific item |

### cooldown.mcrs

Cooldown system using scoreboards.

```mcrs
import "stdlib/cooldown.mcrs"

fn use_ability() {
    if (is_on_cooldown(@s) == 0) {
        // Do ability
        say("Ability used!");
        cooldown_start(@s, 100);  // 5 second cooldown
    }
}

@tick
fn tick_cooldowns() {
    cooldown_tick();
}
```

### timer.mcrs

Timer utilities and the v1.2 object-style Timer API.

```mcrs
import "stdlib/timer.mcrs"

let timer = Timer::new(200);
timer.start();

@tick
fn update_timer() {
    timer.tick();

    if (timer.done()) {
        say("Time's up!");
    }
}
```

**Instance methods:**
- `Timer::new(duration)` — Create a new timer
- `timer.start()` — Start the timer
- `timer.tick()` — Advance the timer, usually once per tick
- `timer.done()` — Check whether it has finished
- `timer.pause()` — Pause without resetting progress
- `timer.reset()` — Reset progress to the initial duration

**Legacy functional API:**
- `timer_start(id, duration)`
- `timer_tick(id)`
- `timer_done(id)`

The object-style API is the recommended interface for new code. It works naturally with `impl` blocks and keeps timer state grouped with its behavior.

### Scheduling helpers

RedScript also includes callback-style timer helpers built on top of Minecraft scheduling.

```mcrs
setTimeout(100, () => {
    say("Delayed!");
});

let id = setInterval(20, () => {
    say("Repeating!");
});

clearInterval(id);
```

| Function | Description |
|----------|-------------|
| `setTimeout(delay, callback)` | Run a callback once after `delay` ticks |
| `setInterval(interval, callback)` | Run a callback repeatedly |
| `clearInterval(id)` | Cancel a repeating callback |

These helpers compile to generated functions scheduled with Minecraft's `schedule function` command.

### tags.mcrs

Minecraft tag constants for items, blocks, and entities.

```mcrs
import "stdlib/tags.mcrs"

fn mark_tools() {
    if (held_item_is(#minecraft_tools)) {
        say("Tool detected");
    }
}
```

RedScript v1.2 ships with 313 predefined tag constants so you can reference common tags without raw strings.

### player.mcrs

Player state helpers.

```mcrs
import "stdlib/player.mcrs"

fn heal_player() {
    heal(10);  // Add 10 health
}

fn check_admin() {
    if (is_op() == 1) {
        say("You are admin");
    }
}
```

### combat.mcrs

Combat utilities.

```mcrs
import "stdlib/combat.mcrs"

fn on_hit(target: selector) {
    apply_damage(target, 5);
    knockback(target, 2);
}
```

### mobs.mcrs

Mob spawning helpers.

```mcrs
import "stdlib/mobs.mcrs"

fn spawn_wave() {
    spawn_zombie(0, 64, 0);
    spawn_skeleton(5, 64, 0);
    spawn_creeper(-5, 64, 0);
}
```

### vec.mcrs

2D and 3D vector math using fixed-point arithmetic (scale ×1000, so a unit vector has components in [-1000, 1000]). Requires `math.mcrs`.

```mcrs
import "stdlib/math.mcrs"
import "stdlib/vec.mcrs"

fn face_target(ax: int, ay: int, tx: int, ty: int) {
    let angle = atan2_fixed(ty - ay, tx - ax);  // 0-359°
    let dist  = distance2d_fixed(ax, ay, tx, ty); // ×1000
    let nx = normalize2d_x(tx - ax, ty - ay);     // ×1000
}
```

| Function | Description |
|----------|-------------|
| `dot2d(ax, ay, bx, by)` | Dot product of two 2D vectors |
| `cross2d(ax, ay, bx, by)` | Z-component of 3D cross product |
| `length2d_fixed(x, y)` | Euclidean length ×1000 |
| `distance2d_fixed(x1, y1, x2, y2)` | 2D distance ×1000 |
| `manhattan(x1, y1, x2, y2)` | Manhattan distance |
| `chebyshev(x1, y1, x2, y2)` | Chebyshev distance |
| `normalize2d_x(x, y)` | X of unit vector ×1000 |
| `normalize2d_y(x, y)` | Y of unit vector ×1000 |
| `lerp2d_x(ax, ay, bx, by, t)` | Lerp X, t ∈ [0, 1000] |
| `lerp2d_y(ax, ay, bx, by, t)` | Lerp Y, t ∈ [0, 1000] |
| `atan2_fixed(y, x)` | Angle of vector in degrees [0, 359] |
| `rotate2d_x(x, y, deg)` | X after 2D rotation |
| `rotate2d_y(x, y, deg)` | Y after 2D rotation |
| `dot3d(ax, ay, az, bx, by, bz)` | Dot product of two 3D vectors |
| `cross3d_x/y/z(ax, ay, az, bx, by, bz)` | 3D cross product components |
| `length3d_fixed(x, y, z)` | Euclidean 3D length ×1000 |
| `distance3d_fixed(x1,y1,z1,x2,y2,z2)` | 3D distance ×1000 |
| `manhattan3d(x1,y1,z1,x2,y2,z2)` | Manhattan distance in 3D |
| `chebyshev3d(x1,y1,z1,x2,y2,z2)` | Chebyshev distance in 3D |
| `add2d_x/y`, `sub2d_x/y`, `scale2d_x/y`, `neg2d_x/y` | 2D component-wise arithmetic |
| `add3d_x/y/z`, `sub3d_x/y/z`, `scale3d_x/y/z`, `neg3d_x/y/z` | 3D component-wise arithmetic |

### list.mcrs

List utilities for static-size min/max/avg/sort over up to 5 discrete values, and dynamic in-place bubble sort for arrays (requires RedScript ≥ 2.4.0).

```mcrs
import "stdlib/list.mcrs"

fn example() {
    let lo = list_min3(30, 10, 20);      // 10
    let hi = list_max5(1, 5, 3, 9, 2);  // 9
    let mid = sort3(7, 2, 5, 1);        // 5 (middle value)

    let nums: int[] = [30, 10, 20];
    list_sort_asc(nums, 3);             // [10, 20, 30]
}
```

| Function | Description |
|----------|-------------|
| `sort2_min(a, b)` | Minimum of two values |
| `sort2_max(a, b)` | Maximum of two values |
| `list_min3(a, b, c)` | Minimum of 3 values |
| `list_max3(a, b, c)` | Maximum of 3 values |
| `list_min5(a,b,c,d,e)` | Minimum of 5 values |
| `list_max5(a,b,c,d,e)` | Maximum of 5 values |
| `list_sum3(a,b,c)` | Sum of 3 values |
| `list_sum4(a,b,c,d)` | Sum of 4 values |
| `list_sum5(a,b,c,d,e)` | Sum of 5 values |
| `avg3(a,b,c)` | Average of 3 values |
| `avg5(a,b,c,d,e)` | Average of 5 values |
| `sort3(a,b,c,pos)` | Sort 3 values; return value at pos (0=min) |
| `sort4(a,b,c,d,pos)` | Sort 4 values; return value at pos |
| `sort5(a,b,c,d,e,pos)` | Sort 5 values; return value at pos |
| `weighted2(seed, w0, w1)` | Weighted random choice: 0 or 1 |
| `weighted3(seed, w0, w1, w2)` | Weighted random choice: 0, 1, or 2 |
| `list_sort_asc(arr, len)` | In-place ascending bubble sort |
| `list_sort_desc(arr, len)` | In-place descending bubble sort |

### bits.mcrs

Bitwise operations simulated with integer arithmetic (no native bitwise ops in MC scoreboard). Each operation is O(31) iterations.

```mcrs
import "stdlib/bits.mcrs"

fn flag_example(flags: int) {
    flags = bit_set(flags, 3);     // set bit 3
    let v = bit_get(flags, 3);     // 1
    flags = bit_toggle(flags, 3);  // toggle
    let count = popcount(flags);   // count set bits
}
```

| Function | Description |
|----------|-------------|
| `bit_get(x, n)` | Return 1 if bit n is set, else 0. n ∈ [0, 30] |
| `bit_set(x, n)` | Set bit n to 1 |
| `bit_clear(x, n)` | Clear bit n to 0 |
| `bit_toggle(x, n)` | Toggle bit n |
| `bit_shl(x, n)` | Left shift x by n bits |
| `bit_shr(x, n)` | Logical right shift x by n bits |
| `bit_and(a, b)` | Bitwise AND |
| `bit_or(a, b)` | Bitwise OR |
| `bit_xor(a, b)` | Bitwise XOR |
| `bit_not(x)` | Bitwise NOT (inverts 31 bits, sign excluded) |
| `popcount(x)` | Count number of set bits (0–31) |

### random.mcrs

Pseudo-random number generators. The LCG is fast and sufficient for most game logic; PCG provides better statistical quality.

```mcrs
import "stdlib/random.mcrs"

fn roll_loot() {
    let seed: int = 12345;
    seed = next_lcg(seed);
    let drop = random_range(seed, 0, 5);  // 0-4
    let coin = random_bool(seed);         // 0 or 1
}
```

| Function | Description |
|----------|-------------|
| `next_lcg(seed)` | Advance LCG state; returns next pseudo-random int32 |
| `random_range(seed, lo, hi)` | Integer in [lo, hi) |
| `random_bool(seed)` | 0 or 1 with equal probability |
| `pcg_next_lo(state_lo)` | Advance PCG low word |
| `pcg_next_hi(state_hi, state_lo)` | Advance PCG high word |
| `pcg_output(state_lo)` | Extract output value from PCG state |

### easing.mcrs

Easing functions for animations and smooth transitions. All functions take `t ∈ [0, 10000]` (×10000) and return a value in `[0, 10000]` (elastic/bounce may slightly exceed this range). Requires `math.mcrs`.

```mcrs
import "stdlib/easing.mcrs"

@tick
fn animate() {
    let t: int = ...;  // 0-10000 progress
    let pos = ease_out_quad(t);       // fast start, slow end
    let arc = ease_in_out_cubic(t);   // smooth both ends
}
```

| Function | Description |
|----------|-------------|
| `ease_linear(t)` | No easing |
| `ease_in_quad(t)` / `ease_out_quad(t)` / `ease_in_out_quad(t)` | Quadratic easing |
| `ease_in_cubic(t)` / `ease_out_cubic(t)` / `ease_in_out_cubic(t)` | Cubic easing |
| `ease_in_quart(t)` / `ease_out_quart(t)` | Quartic easing |
| `ease_in_sine(t)` / `ease_out_sine(t)` / `ease_in_out_sine(t)` | Sine approximation easing |
| `ease_in_expo(t)` / `ease_out_expo(t)` | Exponential easing |
| `ease_in_back(t)` / `ease_out_back(t)` / `ease_in_out_back(t)` | Overshoot (back) easing |
| `ease_out_bounce(t)` / `ease_in_bounce(t)` / `ease_in_out_bounce(t)` | Bounce easing |
| `ease_smooth(t)` | Smoothstep (3t²−2t³) |
| `ease_smoother(t)` | Smootherstep (6t⁵−15t⁴+10t³, Ken Perlin) |

### noise.mcrs

Procedural noise functions for terrain generation and visual effects. All values use ×10000 fixed-point scale. Requires `math.mcrs`.

```mcrs
import "stdlib/noise.mcrs"

fn terrain_gen(x: int, z: int) {
    let h = terrain_height(x, z, 64, 20);  // base=64, ±20 blocks variation
    let n = value_noise_2d(x * 10000, z * 10000);  // [0, 10000]
}
```

| Function | Description |
|----------|-------------|
| `hash_1d(x)` | Pseudo-random int from 1D coordinate |
| `hash_2d(x, z)` | Pseudo-random int from 2D coordinates |
| `hash_1d_pos(x)` | Hash in [0, 10000] |
| `hash_2d_pos(x, z)` | Hash in [0, 10000] |
| `value_noise_1d(x_fx)` | Smooth 1D value noise, x_fx ×10000, returns [0, 10000] |
| `value_noise_2d(x_fx, z_fx)` | Smooth 2D value noise, returns [0, 10000] |
| `fbm_1d(x_fx, octaves, persistence_fx)` | Fractal Brownian motion in 1D |
| `fbm_2d(x_fx, z_fx, octaves, persistence_fx)` | Fractal Brownian motion in 2D |
| `terrain_height(x, z, base_y, amplitude)` | Terrain height using 3-octave fBm; x, z in block coords |

### parabola.mcrs

Ballistic trajectory helpers using Minecraft's native fixed-point scale (×10000). Computes launch velocities, positions, and per-tick drag physics for projectiles (arrows, snowballs, fireballs). Requires `math.mcrs` (for `mulfix`).

**Scale conventions:**
- Positions: blocks (integer)
- Velocities: blocks/tick ×10000 (e.g. `8000` = 0.8 blocks/tick)
- Gravity constant: `800` (≈ 0.08 blocks/tick²)
- MC arrow drag: `9900` (0.99 per tick)

```mcrs
import "stdlib/math.mcrs"
import "stdlib/parabola.mcrs"

// Aim at a target 10 blocks away, 3 blocks up, arriving in 15 ticks
fn shoot_at(target_dx: int, target_dy: int, target_dz: int) {
    let ticks: int = 15;
    let vx: int = parabola_vx(target_dx, ticks);  // ×10000
    let vy: int = parabola_vy(target_dy, ticks);  // ×10000
    let vz: int = parabola_vz(target_dz, ticks);  // ×10000

    // Use vx, vy, vz to set Motion NBT on your projectile
    raw("data modify entity @e[tag=arrow,limit=1] Motion set value [{vx}d, {vy}d, {vz}d]");
}

// Simulate one tick of arrow flight with drag
fn tick_arrow() {
    // vy_new = (vy - gravity) * drag
    let arrow_drag: int = 9900;
    arrow_vy = parabola_step_vy(arrow_vy, arrow_drag);
    arrow_vx = parabola_step_vx(arrow_vx, arrow_drag);
}
```

| Function | Description |
|----------|-------------|
| `parabola_gravity()` | Gravity constant: `800` (0.08 blocks/tick² ×10000) |
| `parabola_gravity_half()` | Half gravity: `400` (for displacement formula) |
| `parabola_vx(dx, ticks)` | X launch velocity ×10000 to reach `dx` blocks in `ticks` |
| `parabola_vy(dy, ticks)` | Y launch velocity ×10000 to reach `dy` blocks in `ticks` |
| `parabola_vz(dz, ticks)` | Z launch velocity ×10000 to reach `dz` blocks in `ticks` |
| `parabola_speed_xz(dx, dz, ticks)` | Horizontal launch speed √(vx²+vz²) ×10000 |
| `parabola_x(vx0, t)` | X position (blocks) at tick `t` given initial velocity ×10000 |
| `parabola_y(vy0, t)` | Y position (blocks) at tick `t` given initial velocity ×10000 |
| `parabola_z(vz0, t)` | Z position (blocks) at tick `t` given initial velocity ×10000 |
| `parabola_flight_time(vy0)` | Ticks until projectile returns to launch height; 0 if vy0 ≤ 0 |
| `parabola_max_height(vy0)` | Maximum height above launch point in blocks |
| `parabola_step_vx(vx, drag)` | Apply drag factor to X velocity (one tick) |
| `parabola_step_vy(vy, drag)` | Apply gravity then drag to Y velocity (one tick) |
| `parabola_step_vz(vz, drag)` | Apply drag factor to Z velocity (one tick) |
| `parabola_ticks_for_range(range)` | Estimated ticks to reach a horizontal range (arrow heuristic) |
| `parabola_in_range(dx, dz, max_range)` | Returns 1 if target is within horizontal range |

### physics.mcrs

Simple fixed-point physics simulation (positions/velocities ×100, 1 block = 100 units, 1 tick = 1/20 s). Includes projectile motion, drag, spring, and circular movement.

```mcrs
import "stdlib/physics.mcrs"

fn tick_projectile() {
    // Each tick: apply gravity and drag to velocity, then update position
    vy = apply_gravity(vy);
    vy = apply_drag(vy, air_drag_fx());  // 0.98 per tick
    py = update_pos(py, vy);

    if (is_grounded(py, ground_y) == 1) {
        vy = bounce_v(vy, 6000);  // 60% restitution
    }
}
```

| Function | Description |
|----------|-------------|
| `gravity_fx()` | Gravity constant: 8 (0.08 blocks/tick² ×100) |
| `air_drag_fx()` | Air drag: 9800 (0.98 ×10000) |
| `water_drag_fx()` | Water drag: 8000 (0.80 ×10000) |
| `projectile_y(p0, v0, t)` | Y position at tick t (no drag) |
| `projectile_x(p0, v0, t)` | X position at tick t (constant velocity) |
| `projectile_vy(v0, t)` | Y velocity at tick t |
| `projectile_land_t(v0y)` | Approximate landing tick |
| `projectile_max_height(v0y)` | Maximum height reached ×100 |
| `apply_drag(v_fx, drag_fx)` | Apply drag factor to velocity |
| `apply_gravity(vy_fx)` | Apply one tick of gravity to Y velocity |
| `update_pos(p_fx, v_fx)` | Advance position by one tick |
| `bounce_v(v_fx, restitution_fx)` | Reflect velocity with energy loss |
| `clamp_velocity(v_fx, max_fx)` | Clamp speed to max |
| `spring_force(pos_fx, target_fx, k_fx)` | Hooke's law spring force |
| `spring_update_v(v_fx, pos_fx, target_fx, k_fx, damping_fx)` | Velocity with spring + damping |
| `circular_x(cx, r, angle_deg)` | X on circle at given angle |
| `circular_z(cz, r, angle_deg)` | Z on circle at given angle |
| `friction_decel(v_fx, friction_fx)` | Reduce velocity toward zero by friction |
| `is_grounded(y_fx, ground_y_fx)` | Returns 1 if at or below ground |
| `impact_velocity(h_fx)` | Velocity after falling from height h ×100 |

### matrix.mcrs

2D/3D transformation helpers for Minecraft Display Entities. Values ×10000; angles in degrees ×10000. Use `raw()` commands to apply transforms to entities. Requires `math.mcrs`.

```mcrs
import "stdlib/matrix.mcrs"

fn spin_display(angle_fx: int) {
    let s = quat_sin_half(angle_fx);
    let c = quat_cos_half(angle_fx);
    // Apply Y-axis quaternion rotation [0, s, 0, c] to a display entity
    raw("data modify entity @e[tag=my_display,limit=1] transformation.left_rotation set value [0f,{s}f,0f,{c}f]");
}
```

| Function | Description |
|----------|-------------|
| `rotate2d_x(x, y, angle_deg)` | X after 2D rotation; angle ×10000 |
| `rotate2d_y(x, y, angle_deg)` | Y after 2D rotation; angle ×10000 |
| `scale_x(x, sx_fx)` / `scale_y` / `scale_z` | Scale component by factor ×10000 |
| `uniform_scale(v, s_fx)` | Apply uniform scale ×10000 |
| `rotate_y_x(x, z, angle_deg)` | X after rotation around Y axis |
| `rotate_y_z(x, z, angle_deg)` | Z after rotation around Y axis |
| `rotate_x_y(y, z, angle_deg)` | Y after rotation around X axis |
| `rotate_x_z(y, z, angle_deg)` | Z after rotation around X axis |
| `quat_sin_half(angle_deg_fx)` | sin(angle/2) ×1000 for Y-axis quaternion |
| `quat_cos_half(angle_deg_fx)` | cos(angle/2) ×1000 for Y-axis quaternion |
| `billboard_y(player_yaw_fx)` | Y rotation for a billboard facing the player |
| `lerp_angle(a_fx, b_fx, t)` | Lerp between two angles taking shortest path |

### quaternion.mcrs

Quaternion math for Minecraft Display Entity rotations. All components use ×10000 scale (e.g. `7071` = 0.7071). Requires `math.mcrs` (for `sin_fixed`, `cos_fixed`, `mulfix`, `isqrt`).

**MC Display Entity quaternion format:** `[x, y, z, w]` — stored as floats in `left_rotation` / `right_rotation`. A unit quaternion satisfies x²+y²+z²+w² = 1 (i.e. sum of components² = 10000² in ×10000 scale).

```mcrs
import "stdlib/math.mcrs"
import "stdlib/quaternion.mcrs"

// Spin a Display Entity 45° around the Y axis
fn rotate_display_y45() {
    let qx: int = quat_axis_y_x(45);  // 0
    let qy: int = quat_axis_y_y(45);  // sin(22.5°) × 10000 ≈ 3827
    let qz: int = quat_axis_y_z(45);  // 0
    let qw: int = quat_axis_y_w(45);  // cos(22.5°) × 10000 ≈ 9239
    raw("data modify entity @e[tag=my_display,limit=1] transformation.left_rotation set value [{qx}f,{qy}f,{qz}f,{qw}f]");
}

// Combine two rotations (pitch then yaw)
fn combined_rotation(yaw: int, pitch: int) {
    let yx: int = quat_axis_y_x(yaw);   let yy: int = quat_axis_y_y(yaw);
    let yz: int = quat_axis_y_z(yaw);   let yw: int = quat_axis_y_w(yaw);
    let px: int = quat_axis_x_x(pitch); let py: int = quat_axis_x_y(pitch);
    let pz: int = quat_axis_x_z(pitch); let pw: int = quat_axis_x_w(pitch);
    // q = yaw * pitch
    let rx: int = quat_mul_x(yx, yy, yz, yw, px, py, pz, pw);
    let ry: int = quat_mul_y(yx, yy, yz, yw, px, py, pz, pw);
    let rz: int = quat_mul_z(yx, yy, yz, yw, px, py, pz, pw);
    let rw: int = quat_mul_w(yx, yy, yz, yw, px, py, pz, pw);
}

// Smoothly interpolate rotation from q_a to q_b over 20 ticks
let interp_tick: int = 0;
fn slerp_step() {
    interp_tick = interp_tick + 50;  // 1000/20 = 50 per tick
    if (interp_tick > 1000) { interp_tick = 1000; }
    let rx: int = quat_slerp_x(ax, ay, az, aw, bx, by, bz, bw, interp_tick);
    let ry: int = quat_slerp_y(ax, ay, az, aw, bx, by, bz, bw, interp_tick);
    let rz: int = quat_slerp_z(ax, ay, az, aw, bx, by, bz, bw, interp_tick);
    let rw: int = quat_slerp_w(ax, ay, az, aw, bx, by, bz, bw, interp_tick);
}
```

**Constructors:**

| Function | Description |
|----------|-------------|
| `quat_identity_x/y/z/w()` | Identity quaternion (0, 0, 0, 10000) — no rotation |
| `quat_axis_x_x/y/z/w(angle_deg)` | Quaternion for rotation around X axis by `angle_deg` degrees |
| `quat_axis_y_x/y/z/w(angle_deg)` | Quaternion for rotation around Y axis |
| `quat_axis_z_x/y/z/w(angle_deg)` | Quaternion for rotation around Z axis |
| `quat_euler_x/y/z/w(yaw, pitch, roll)` | Euler angles → quaternion (YXZ order, MC convention) |

**Operations:**

| Function | Description |
|----------|-------------|
| `quat_mul_x/y/z/w(ax,ay,az,aw, bx,by,bz,bw)` | Quaternion multiplication a × b; all components ×10000 |
| `quat_conj_x/y/z/w(qx, qy, qz, qw)` | Conjugate (= inverse for unit quaternion): negate x/y/z, keep w |
| `quat_dot(ax,ay,az,aw, bx,by,bz,bw)` | Dot product of two quaternions ×10000 |
| `quat_mag_sq(qx, qy, qz, qw)` | Magnitude squared ×10000 (should be 10000 for unit quaternion) |
| `quat_slerp_x/y/z/w(ax,ay,az,aw, bx,by,bz,bw, t)` | SLERP: interpolate between two quaternions; t ∈ [0, 1000] |

> **SLERP implementation:** Uses normalized LERP (nlerp) approximation — cheaper than true spherical interpolation and sufficient for Minecraft animations at typical angular speeds. Result is always a unit quaternion.

### signal.mcrs

Statistical distributions and probability helpers for loot tables, spawn weights, and game events. Values ×10000 where noted. Requires `math.mcrs` for `exp_dist_approx`.

```mcrs
import "stdlib/signal.mcrs"

fn loot_roll(seed: int) {
    let item = weighted3(seed, 60, 30, 10);  // 60% / 30% / 10%
    let hit  = bernoulli(seed, 2500);        // 25% chance → 1 or 0
    let dmg  = uniform_int(seed, 5, 15);     // 5–15
}
```

| Function | Description |
|----------|-------------|
| `uniform_int(seed, lo, hi)` | Integer in [lo, hi] inclusive |
| `uniform_frac(seed)` | Uniform fraction in [0, 10000] |
| `normal_approx12(seed)` | Approx N(0,1) ×10000; range ≈ [-60000, 60000] |
| `exp_dist_approx(seed, lambda_fx)` | Exponential variate ×10000; lambda ×10000 |
| `bernoulli(seed, p_fx)` | 1 with probability p/10000, else 0 |
| `weighted2(seed, w0, w1)` | Choose 0 or 1 with weights |
| `weighted3(seed, w0, w1, w2)` | Choose 0, 1, or 2 with weights |
| `gamma_sample(shape_k, scale_theta, seed)` | Gamma(k, θ) variate ×10000; shape_k and scale_theta ×10000; k ∈ [1, 5] |
| `poisson_sample(lambda, seed)` | Poisson(λ) count (plain int); lambda ×10000; best for λ ≤ 20 |
| `geometric_sample(p_success, seed)` | Geometric(p) failures before first success; p_success ×10000 |
| `negative_binomial_sample(r, p_success, seed)` | NegBin(r, p) total failures before r successes; p_success ×10000 |

#### New distributions (v2.5.0)

```mcrs
import "stdlib/math.mcrs"
import "stdlib/signal.mcrs"

fn loot_example(seed: int) {
    // Gamma — weapon damage with variance (shape=2, scale=1.5)
    let dmg: int = gamma_sample(20000, 15000, seed);  // Gamma(2, 1.5) ×10000

    // Poisson — random mob spawns per wave (λ=3)
    let spawns: int = poisson_sample(30000, seed);    // integer count

    // Geometric — tries until a crafting success (p=0.3)
    let tries: int = geometric_sample(3000, seed);    // integer count

    // Negative Binomial — total failures before 3 successes (p=0.5)
    let total_fail: int = negative_binomial_sample(3, 5000, seed);
}
```

> **Note:** `gamma_sample` uses `ln` from `stdlib/math.mcrs` (integer ×10000 log), and supports integer shape parameter k = 1..5 (shape_k = 10000..50000 in ×10000 scale). `poisson_sample` uses `exp_fx` from `stdlib/math.mcrs`.

### bigint.mcrs

Multi-precision integer arithmetic using base-10000 chunks stored in arrays (big-endian). The 3-chunk API covers up to 96-bit values; the array API supports arbitrary length (requires RedScript ≥ 2.4.0).

```mcrs
import "stdlib/bigint.mcrs"

fn big_add_example() {
    // 3-chunk addition: a = [1, 2345, 6789], b = [0, 0, 1]
    let carry_lo = bigint3_carry_lo(6789, 1);
    let lo = bigint3_add_lo(6789, 1);   // 6790
}
```

| Function | Description |
|----------|-------------|
| `bigint_base()` | Returns 10000 (chunk base) |
| `chunk_hi(n)` / `chunk_lo(n)` | High/low 4-digit halves of a chunk |
| `bigint3_add_lo/mid/hi(...)` | 3-chunk addition (with carry propagation) |
| `bigint3_sub_lo/mid/hi(...)` | 3-chunk subtraction (with borrow propagation) |
| `bigint3_mul1_lo/hi(a, b)` | Single-chunk multiply low/high result |
| `bigint3_cmp(ahi,amid,alo,bhi,bmid,blo)` | Compare two 3-chunk values: 1, -1, or 0 |
| `int32_to_bigint3_lo/mid/hi(n)` | Decompose int32 into 3 chunks |
| `bigint3_to_int32(hi, mid, lo)` | Combine 3 chunks into int32 |
| `bigint3_div_chunk/rem_chunk(...)` | Long-division step for ÷ small int |
| `bigint_zero(arr, len)` | Set all chunks to 0 |
| `bigint_copy(src, dst, len)` | Copy bigint array |
| `bigint_cmp(a, b, len)` | Compare n-chunk bigints |
| `bigint_add(a, b, result, len)` | Add two n-chunk bigints; returns carry |
| `bigint_sub(a, b, result, len)` | Subtract (assumes a ≥ b) |
| `bigint_mul_small(a, n, result, len)` | Multiply n-chunk bigint by small int (≤ 9999) |
| `bigint_shift_left(arr, len)` | Multiply by 10000 (shift one chunk left) |
| `bigint_is_zero(arr, len)` | Returns 1 if all chunks are 0 |
| `bigint_leading_zeros(arr, len)` | Count leading zero chunks |
| `bigint_div_small(a, divisor, result, len)` | Divide by small int; returns remainder |
| `bigint_mod_small(a, divisor, len)` | a % divisor |
| `bigint_chunk(a, i)` | Read chunk at index i |
| `bigint_mul(a, b, result, la, lb)` | Full bigint × bigint multiplication; result must have `la+lb` chunks (pre-zeroed) |
| `bigint_mul_result_len(la, lb)` | Returns required result array length (`la + lb`) |
| `bigint_sq(a, result, len)` | Square a bigint: result = a²; result must have `len*2` chunks (pre-zeroed) |

#### Full multiplication (v2.5.0)

`bigint_mul` and `bigint_sq` were added in v2.5.0 for arbitrary-precision multiplication.

```mcrs
import "stdlib/bigint.mcrs"

fn multiply_example() {
    // Multiply two 4-chunk numbers
    let a: int[] = [0, 0, 1234, 5678];  // represents 1234_5678 in base-10000
    let b: int[] = [0, 0, 9999];         // 3-chunk
    let result: int[] = [0, 0, 0, 0, 0, 0, 0];  // la+lb = 7, pre-zeroed
    bigint_mul(a, b, result, 4, 3);
    // result now holds a * b in big-endian base-10000 chunks
}

fn square_example() {
    // Square a 3-chunk number
    let n: int[] = [1, 2345, 6789];   // 1_0002345_6789
    let sq: int[] = [0, 0, 0, 0, 0, 0];  // len*2 = 6, pre-zeroed
    bigint_sq(n, sq, 3);
    // sq = n² in 6 chunks
}
```

> **Overflow safety:** Each chunk is in `[0, 9999]`, so `9999 × 9999 = 99,980,001 < INT32_MAX`. Accumulation is safe; carry normalization happens after all partial products are summed. `bigint_sq` uses the optimized upper-triangle doubling method.

### advanced.mcrs

Higher-order integer math: number theory, hashing, Bézier curves, and fractals. Requires `math.mcrs` and `vec.mcrs` (for `angle_between`).

```mcrs
import "stdlib/advanced.mcrs"

fn showcase() {
    let f10 = fib(10);               // 55
    let p   = is_prime(97);          // 1
    let pos = bezier_quad(0, 500, 1000, 500);  // 500 (midpoint of curve)
    let itr = mandelbrot_iter(-500, 0, 100);   // iterations to escape
}
```

| Function | Description |
|----------|-------------|
| `fib(n)` | Fibonacci number F(n); n ≤ 46 |
| `is_prime(n)` | 1 if prime, 0 otherwise (trial division) |
| `collatz_steps(n)` | Steps in Collatz sequence until reaching 1 |
| `digit_sum(n)` | Sum of decimal digits |
| `count_digits(n)` | Number of decimal digits |
| `reverse_int(n)` | Reverse decimal digits |
| `mod_pow(base, exp, m)` | (base^exp) mod m via fast squaring; m ≤ 46340 |
| `hash_int(n)` | Deterministic integer hash, non-negative result |
| `noise1d(x)` | 1D value noise; x ×1000, output in [0, 999] |
| `bezier_quad(p0, p1, p2, t)` | Quadratic Bézier; t ∈ [0, 1000] |
| `bezier_cubic(p0, p1, p2, p3, t)` | Cubic Bézier; t ∈ [0, 1000] |
| `bezier_quartic(p0, p1, p2, p3, p4, t)` | Quartic (4th-order) Bézier; 5 control points; t ∈ [0, 1000] |
| `bezier_n(pts, n, t)` | N-th order Bézier via De Casteljau; modifies `pts` in-place; t ∈ [0, 1000] |
| `bezier_n_safe(pts, work, n, t)` | Non-destructive N-th order Bézier; copies `pts` into `work` first |
| `mandelbrot_iter(cx, cy, max_iter)` | Mandelbrot iteration count; cx/cy ×1000 |
| `julia_iter(z0r, z0i, cr, ci, max_iter)` | Julia set iteration count |
| `angle_between(x1, y1, x2, y2)` | Angle between two 2D vectors in degrees [0, 180] |
| `clamp_circle_x/y(x, y, r)` | Clamp 2D point to circle of radius r |
| `newton_sqrt(n)` | Integer square root via Newton's method |
| `digital_root(n)` | Repeatedly sum digits until single digit |
| `spiral_ring(n)` | Ulam spiral ring number for integer n |

#### Higher-order Bézier curves (v2.5.0)

`bezier_quartic` and `bezier_n` were added in v2.5.0 to support smooth 5+ point animation paths.

```mcrs
import "stdlib/advanced.mcrs"

// Quartic (5 control points) — smooth camera arc
fn camera_path(t: int) -> int {
    return bezier_quartic(0, 250, 500, 750, 1000, t);
}

// Arbitrary N-point curve (modifies pts in-place)
fn n_order_example() {
    let pts: int[] = [0, 100, 500, 900, 1000, 800];
    let result: int = bezier_n(pts, 6, 500);  // midpoint of 6-point curve
}

// Non-destructive version (preserves pts)
fn n_order_safe() {
    let pts: int[]  = [0, 100, 500, 900, 1000, 800];
    let work: int[] = [0, 0, 0, 0, 0, 0];  // scratch buffer, same length
    let result: int = bezier_n_safe(pts, work, 6, 500);
}
```

### calculus.mcrs

Numerical calculus: differentiation, integration (trapezoid/Simpson), Riemann sums, curve length, and running statistics (Welford's online algorithm). All values ×10000.

```mcrs
import "stdlib/calculus.mcrs"

fn integrate_example(vals: int[], n: int) {
    let area = integrate_trapezoid(vals, n, 1000);  // step h = 0.1
    let area2 = integrate_simpson(vals, n, 1000);   // more accurate
    let deriv = deriv_central(vals[2], vals[0], 2000); // central difference
}
```

| Function | Description |
|----------|-------------|
| `deriv_forward(f1, f0, h_fx)` | Forward difference derivative ×10000 |
| `deriv_central(f_plus, f_minus, h_fx)` | Central difference (more accurate) ×10000 |
| `second_deriv(f_plus, f0, f_minus, h_fx)` | Second derivative ×10000 |
| `integrate_trapezoid(vals, n, h_fx)` | Trapezoidal rule integration |
| `integrate_simpson(vals, n, h_fx)` | Simpson's 1/3 rule (n must be odd, n ≥ 3) |
| `riemann_left(vals, n, h_fx)` | Left Riemann sum |
| `riemann_right(vals, n, h_fx)` | Right Riemann sum |
| `riemann_mid(vals, n, h_fx)` | Midpoint Riemann sum |
| `curve_length_2d(xs, ys, n)` | Arc length of a 2D polyline |
| `running_mean(prev_mean, new_val, n)` | Welford's online mean update |
| `running_m2(prev_m2, prev_mean, new_mean, new_val)` | Welford's M2 update for variance |
| `variance_from_m2(m2, n)` | Variance from Welford's M2 |
| `std_dev_approx(variance_fx)` | Approximate standard deviation |

### geometry.mcrs

3D geometry helpers: bounding boxes, sphere/cylinder containment, parabolic motion, tile math, angle utilities, and MC sun angle. Coordinates ×100 (1 block = 100); angles ×10000. Requires `math.mcrs`.

```mcrs
import "stdlib/geometry.mcrs"

fn in_arena(px: int, py: int, pz: int) -> int {
    return aabb_contains(px, py, pz, 0, 60, 0, 200, 80, 200);
}

fn projectile_at(y0: int, vy0: int, t: int) -> int {
    return parabola_y(y0, vy0, t);  // coords ×100
}
```

| Function | Description |
|----------|-------------|
| `midpoint(a, b)` | Integer midpoint of two coordinates |
| `aabb_contains(px,py,pz, minx,miny,minz, maxx,maxy,maxz)` | Point-in-AABB test |
| `sphere_contains(px,py,pz, cx,cy,cz, r)` | Point-in-sphere test (no sqrt) |
| `cylinder_contains(px,pz, cx,cz, r)` | Point-in-vertical-cylinder test |
| `parabola_y(y0, vy0, t)` | Y position of projectile at tick t; y ×100 |
| `parabola_x(x0, vx0, t)` | X position (constant velocity) |
| `parabola_land_t(vy0)` | Approximate landing tick |
| `tile_of(coord, tile_size)` | Which tile a coordinate belongs to |
| `tile_center(tile, tile_size)` | Center coordinate of a tile |
| `angle_normalize(deg)` | Normalize angle to [0, 3600000) ×10000 |
| `angle_diff(a, b)` | Signed shortest angular difference ×10000 |
| `mc_day_angle(daytime)` | MC sun angle ×10000 from `/time query daytime` |

### particles.mcrs

Particle effect helpers and particle-based drawing utilities. Emits `raw()` commands to spawn particles.

```mcrs
import "stdlib/particles.mcrs"

fn on_kill() {
    explosion_effect(0, 64, 0);
    hearts_at(0, 65, 0);
}

fn draw_ring(cx: int, cy: int, cz: int) {
    draw_circle(cx, cy, cz, 500, 32, "minecraft:flame");  // r=5 blocks ×100
}
```

| Function | Description |
|----------|-------------|
| `hearts_at(x, y, z)` | Heart particles at position |
| `flames(x, y, z)` | Flame particles |
| `smoke(x, y, z)` | Large smoke effect |
| `explosion_effect(x, y, z)` | Explosion particles |
| `sparkles_at(x, y, z)` | Enchant sparkles |
| `angry_at(x, y, z)` | Angry villager particles |
| `happy_at(x, y, z)` | Happy villager particles |
| `portal_effect(x, y, z)` | Portal particles |
| `totem_at(x, y, z)` | Totem of undying particles |
| `end_sparkles_at(x, y, z)` | End rod sparkles |
| `particle_at_fx(x_fx, y_fx, z_fx, particle)` | Single particle at fixed-point coords ×100 |
| `draw_line_2d(x0,y0,x1,y1,steps,z,particle)` | Draw line with particles; coords ×100 |
| `draw_circle(cx,cy,cz,r,steps,particle)` | Draw circle in XZ plane; r ×100 |
| `draw_helix(cx,cy_start,cz,r,height,rotations,steps,particle)` | Draw helix spiral |
| `particle_dot(x, y, z, particle)` | Single particle at integer block coords |

### spawn.mcrs

Spawn point and teleportation helpers.

```mcrs
import "stdlib/spawn.mcrs"

fn start_game() {
    gather_all(0, 64, 0);  // bring everyone to spawn
    goto_arena(@s);        // send current player to arena
}
```

| Function | Description |
|----------|-------------|
| `teleport_to(target, x, y, z)` | Teleport selector to coordinates |
| `teleport_to_entity(target, dest)` | Teleport selector to another entity |
| `spread_players(x, z, radius)` | Spread all players randomly in area |
| `gather_all(x, y, z)` | Teleport all players to one location |
| `launch_up(target, height)` | Teleport target upward by height blocks |
| `goto_lobby(target)` | Teleport to lobby (0, 64, 0) with title |
| `goto_arena(target)` | Teleport to arena (100, 64, 100) with title |

### strings.mcrs

Minimal string helpers. Runtime string manipulation is limited in datapacks; `str_len` is compiler-assisted for literal-backed strings.

```mcrs
import "stdlib/strings.mcrs"

fn example() {
    let n = str_len("hello");  // compiler resolves for string literals
}
```

| Function | Description |
|----------|-------------|
| `str_len(s)` | Length of a string (compiler-assisted for literals) |

### teams.mcrs

Team management helpers wrapping Minecraft's `/team` commands.

```mcrs
import "stdlib/teams.mcrs"

@load
fn setup() {
    setup_four_teams();
}

fn assign(p: selector) {
    add_to_team(p, "red");
}
```

| Function | Description |
|----------|-------------|
| `create_team(name, color)` | Create a team with given name and color |
| `create_red_team()` | Create red team (friendly fire disabled) |
| `create_blue_team()` | Create blue team (friendly fire disabled) |
| `create_green_team()` | Create green team (friendly fire disabled) |
| `create_yellow_team()` | Create yellow team (friendly fire disabled) |
| `add_to_team(target, team_name)` | Add selector to a team |
| `remove_from_teams(target)` | Remove selector from all teams |
| `setup_two_teams()` | Create red and blue teams |
| `setup_four_teams()` | Create red, blue, green, and yellow teams |
| `cleanup_teams()` | Remove all four default teams |

### color.mcrs

Color utilities for packed RGB integers and HSL ↔ RGB conversion. Packed format: `R×65536 + G×256 + B` (no native bitwise ops).

```mcrs
import "stdlib/color.mcrs"

fn rainbow(hue: int) {
    let col = hsl_to_packed(hue, 100, 50);  // H=0-360, S=100, L=50
    let r = rgb_r(col);
    let blend = rgb_lerp(col, 0xFFFFFF, 500);  // 50% white
}
```

| Function | Description |
|----------|-------------|
| `rgb_pack(r, g, b)` | Pack RGB (0–255 each) into single int |
| `rgb_r(packed)` / `rgb_g(packed)` / `rgb_b(packed)` | Extract R, G, or B component |
| `rgb_lerp(a, b, t)` | Blend two packed colors; t ∈ [0, 1000] |
| `hsl_to_r/g/b(h, s, l)` | HSL → individual RGB component; H 0–360, S/L 0–100 |
| `hsl_to_packed(h, s, l)` | HSL → packed RGB int |
| `rgb_to_h(r, g, b)` | Hue 0–360 |
| `rgb_to_s(r, g, b)` | Saturation 0–100 |
| `rgb_to_l(r, g, b)` | Lightness 0–100 |

### interactions.mcrs

Player interaction detection helpers for right-click (carrot-on-stick), sneak, look direction, and combo inputs. Uses scoreboards. Call `interactions_init()` once in `@load`.

```mcrs
import "stdlib/interactions.mcrs"

@load fn setup() { interactions_init(); }

@tick
fn handle_input() {
    on_sneak_click();  // tags players with rs.sneak_click or rs.clicked

    foreach (p in @a[tag=rs.clicked]) {
        say("Clicked!");
        tag_remove(p, "rs.clicked");
    }
}
```

| Function | Description |
|----------|-------------|
| `interactions_init()` | Register scoreboards for click, sneak, and attack detection |
| `on_right_click(callback_fn)` | Tag right-clicking players as `rs.clicked` |
| `example_right_click()` | Example: detect right click and print message |
| `is_sneaking(target)` | Returns 1 if target is currently sneaking |
| `on_sneak_start()` | Tag players who just started sneaking as `rs.sneak_start` |
| `check_look_up()` | Tag players looking up (pitch < -45) as `rs.look_up` |
| `check_look_down()` | Tag players looking down (pitch > 45) as `rs.look_down` |
| `check_look_straight()` | Tag players looking straight as `rs.look_straight` |
| `check_holding_item(item_id)` | Check if holding a specific item (requires predicate file) |
| `on_sneak_click()` | Detect sneak+click combo; tags `rs.sneak_click` or `rs.clicked` |
| `on_double_sneak()` | Detect double-tap sneak within 10 ticks; tags `rs.double_sneak` |

### math_hp.mcrs

High-precision trigonometry and arithmetic using Minecraft's internal Java `Math.sin/cos` (double precision) via entity rotation and Display Entity SVD tricks. Angles ×10000; outputs ×10000. Call `init_trig()` and `init_div()` in `@load`.

```mcrs
import "stdlib/math_hp.mcrs"

@load fn setup() {
    init_trig();
    init_div();
}

fn example() {
    let s = sin_hp(450000);   // sin(45°) ≈ 7071
    let c = cos_hp(900000);   // cos(90°) ≈ 0
    let d = div_hp(10000, 3000); // ≈ 33333 (10000/3000 × 10000)
    let r = sqrt_hp(20000);   // ≈ 14142 (√2 × 10000)
}
```

| Function | Description |
|----------|-------------|
| `init_trig()` | Summon Marker entity `rs_trig` for sin/cos; call in `@load` |
| `sin_hp(angle)` | High-precision sine; angle ×10000, returns ×10000 |
| `cos_hp(angle)` | High-precision cosine; angle ×10000, returns ×10000 |
| `init_div()` | Summon block_display entity `rs_div` for SVD ops; call in `@load` |
| `div_hp(a, b)` | High-precision division a/b ×10000 |
| `div3_hp(a, b, c, d)` | Divide three values by d; results in `$div3_x/y/z` scoreboards |
| `sqrt_hp(x)` | High-precision square root; x ×10000, returns ×10000 |
| `norm3_hp(x, y, z)` | 3D vector magnitude √(x²+y²+z²); inputs ×10000 |
| `double_add(a, b)` | IEEE 754 double addition using entity position trick |
| `double_sub(a, b)` | IEEE 754 double subtraction (negates b then adds) |
| `double_mul(a, b)` | Double multiplication via ×10000 scoreboard (~4 decimal digits) |
| `double_div(a, b)` | IEEE 754 double division via Display Entity SVD trick |
| `double_mul_fixed(d, f)` | Multiply double `d` by fixed-point `f` (÷10000) in true double precision |
| `ln_hp(x)` | Newton-refined natural log; x ×10000; ~8–9 significant digits |
| `ln_5term(x)` | 5-term atanh series ln; x ×10000; ~6 significant digits |

#### Double-precision arithmetic (v2.5.0)

v2.5.0 adds full IEEE 754 `double` arithmetic functions. These require the `double` type (see [Types & Casting](#double-and-fixed-types-v250)).

```mcrs
import "stdlib/math_hp.mcrs"

@load fn setup() {
    init_trig();
    init_div();
}

fn hp_example() {
    // double_add: entity Pos[] trick — full double precision
    let a: double = 1000000 as double;
    let b: double = 0.000001 as double;  // would be lost at ×10000 int scale
    let sum: double = double_add(a, b);  // 1000000.000001 exactly

    // double_div: SVD trick — true IEEE 754 division
    let pi_approx: double = double_div(355 as double, 113 as double);  // 3.14159292...

    // double_mul_fixed: multiply a double by a fixed-point coefficient
    let half: double = double_mul_fixed(pi_approx, 5000);  // pi / 2

    // ln_hp: Newton-refined log (~9 significant digits)
    let ln2: int = ln_hp(6931);    // ln(0.6931) — note: input ×10000
    // For ln(2): ln_hp(20000) ≈ 6931 ≈ 0.6931 ×10000

    // ln_5term: cheaper estimate (~6 digits, no Newton step)
    let ln2_fast: int = ln_5term(20000);
}
```

> **Setup:** `double_add` and `double_sub` require an AEC marker entity created by `init_double_add()` (called automatically via `@require_on_load`). `double_div` requires `init_div()`. Both are idempotent — safe to call multiple times in `@load`.
>
> **Precision notes:**
> - `double_add` / `double_sub` / `double_div`: full ~15 significant digits (Java double)
> - `double_mul`: only ~4 decimal digits (scoreboard integer path); safe for `|a|, |b| ≤ ~21474`
> - `double_mul_fixed`: full double precision for the multiplication step
> - `ln_hp`: one Newton refinement step, effective ~8–9 digits
> - `ln_5term`: 5-term atanh series, ~6 digits (faster, no Newton step)

### sets.mcrs

Runtime set implementation backed by NBT storage, with uniqueness enforced on add. The actual implementation is compiler-built-in; this module documents the interface.

```mcrs
import "stdlib/sets.mcrs"

fn example() {
    let s = set_new();
    set_add(s, "player1");
    set_add(s, "player1");      // duplicate ignored
    let found = set_contains(s, "player1");  // 1
    set_remove(s, "player1");
    set_clear(s);
}
```

| Function | Description |
|----------|-------------|
| `set_new()` | Create a new empty set; returns unique set ID |
| `set_add(set, value)` | Add value if not already present |
| `set_contains(set, value)` | Returns 1 if value exists, 0 otherwise |
| `set_remove(set, value)` | Remove a value from the set |
| `set_clear(set)` | Remove all values from the set |
