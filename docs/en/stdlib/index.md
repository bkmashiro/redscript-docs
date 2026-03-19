# Standard Library

RedScript ships with 37 stdlib modules. Import any module with `import <name>;`.

## Categories

### Mathematics
- [math](/en/stdlib/math) — basic math (`abs`, `clamp`, `lerp`, `sin_fixed`, `sqrt_fx`, `ln`, `exp_fx`, `smoothstep`, ...)
- [math_hp](/en/stdlib/math_hp) — high-precision (`sin_hp`, `cos_hp`, `ln_hp`, `double_sqrt`, `pow_real`, ...)
- [bits](/en/stdlib/bits) — bitwise operations (`bit_and`, `bit_or`, `bit_xor`, `bit_shl`, `popcount`, ...)
- [bigint](/en/stdlib/bigint) — multi-word integers (base-10000 bigint add/sub/mul/div, arbitrary length)
- [calculus](/en/stdlib/calculus) — numerical integration/differentiation (trapezoid, Simpson, Welford statistics)

### Data Structures
- [list](/en/stdlib/list) — array aggregates (`sum`, `avg`, `min`, `max`, `sort3`–`sort5`, `shuffle`, ...)
- [sets](/en/stdlib/sets) — set operations (`set_new`, `set_add`, `set_contains`, `set_remove`)
- [matrix](/en/stdlib/matrix) — matrix math for Display Entities (2D/3D rotation, scale, quaternion helpers)
- [vec](/en/stdlib/vec) — 2D/3D vectors (`dot2d`, `cross3d`, `length2d_fixed`, `atan2_fixed`, `normalize2d_x`, ...)
- [quaternion](/en/stdlib/quaternion) — 3D rotations (`quat_mul`, `quat_slerp`, `quat_euler`, axis-angle constructors)

### Randomness & Statistics
- [random](/en/stdlib/random) — LCG/PCG RNG, binomial and hypergeometric sampling
- [noise](/en/stdlib/noise) — procedural noise (value noise 1D/2D, fractal Brownian motion, terrain height)

### Signal Processing
- [signal](/en/stdlib/signal) — DFT (up to 8 samples), Gaussian/exponential/Poisson/geometric distributions
- [fft](/en/stdlib/fft) — Discrete Fourier Transform (O(n²) DFT for n ≤ 16; magnitude, power, coroutine variant)
- [expr](/en/stdlib/expr) — RPN expression evaluator (dynamic formula evaluation at runtime)

### Geometry & Graphics
- [geometry](/en/stdlib/geometry) — selection zones (AABB, sphere, cylinder, cone, sector)
- [advanced](/en/stdlib/advanced) — Bézier curves (quadratic–N-order), Mandelbrot/Julia, modular exponentiation
- [parabola](/en/stdlib/parabola) — projectile trajectories (ballistic aiming, drag physics)
- [easing](/en/stdlib/easing) — easing functions (quad, cubic, quartic, sine, expo, back, bounce, smoothstep)
- [particles](/en/stdlib/particles) — particle helpers (hearts, flame, smoke; draw line, circle, helix)
- [color](/en/stdlib/color) — RGB/HSL/hex color utilities (pack/unpack, lerp, RGB↔HSL conversion)

### Physics
- [physics](/en/stdlib/physics) — velocity, gravity, collision (projectile motion, drag, spring, friction)
- [strings](/en/stdlib/strings) — string utilities (`str_len`)

### Entity & Game Systems
- [ecs](/en/stdlib/ecs) — Entity Component System (health, velocity, damage components; registry; tag convention)

### Minecraft Game Mechanics
- [player](/en/stdlib/player) — player utilities (`heal`, `damage`, `is_op`)
- [mobs](/en/stdlib/mobs) — mob type string constants (all vanilla entity IDs)
- [combat](/en/stdlib/combat) — damage and health (`weapon_damage`, `apply_damage`)
- [effects](/en/stdlib/effects) — potion effects (`speed`, `jump`, `regen`, `buff_all`, ...)
- [spawn](/en/stdlib/spawn) — entity spawning and teleportation (`teleport_to`, `goto_lobby`, `goto_arena`)
- [interactions](/en/stdlib/interactions) — interaction entities (right-click, sneak, look-direction detection)
- [inventory](/en/stdlib/inventory) — inventory management (`clear_inventory`, `give_kit_warrior`, ...)
- [bossbar](/en/stdlib/bossbar) — boss bar UI (`create_timer_bar`, `create_health_bar`, `update_bar_color`)
- [cooldown](/en/stdlib/cooldown) — ability cooldowns (`cooldown_start`, `cooldown_ready`, `cooldown_tick`)
- [timer](/en/stdlib/timer) — countdown timers (`Timer` struct with `start`, `done`, `remaining`)
- [tags](/en/stdlib/tags) — Minecraft block/entity/item/damage type tag string constants
- [teams](/en/stdlib/teams) — team management (`setup_two_teams`, `setup_four_teams`, `add_to_team`)
- [world](/en/stdlib/world) — world queries (`set_day`, `weather_clear`, `sun_altitude`, `glass_box`, ...)
