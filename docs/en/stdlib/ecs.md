# `ecs` — Entity Component System

Import: `import "stdlib/ecs.mcrs"`

Entity Component System (ECS) is a data-driven pattern for attaching typed "components" (structured data) to game entities. Minecraft Java Edition datapacks have no built-in component system (unlike Bedrock), so `ecs.mcrs` provides one using:

- **Scoreboard objectives** — integer fields (HP, velocity, etc.)
- **Entity tags** — component presence flags (`ecs_has_<comp_name>`)
- **NBT storage** — complex data (via `raw()`)

Without ECS you would write hundreds of lines of hard-coded raw NBT per entity type. With `ecs.mcrs`, component state lives in a typed `int[]` array that can be passed around, modified, and read with named helpers — much closer to how component systems work in general-purpose game engines.

## Tag Naming Convention

Entities that carry a component should have the corresponding Minecraft tag added:

```
ecs_has_health     → entity has a health component
ecs_has_velocity   → entity has a velocity component
ecs_has_damage     → entity has a damage component
```

This lets selectors filter efficiently: `@e[tag=ecs_has_health]`.

## Component Type IDs

Three built-in component type constants are provided for use with the registry:

| Constant           | Value |
|--------------------|-------|
| `ECS_COMP_HEALTH`  | 1     |
| `ECS_COMP_VELOCITY`| 2     |
| `ECS_COMP_DAMAGE`  | 3     |

## Usage Example

Full entity lifecycle — create, take damage, check for death:

```rs
import "stdlib/ecs.mcrs";

// --- Registry setup ---
let reg: int[] = ecs_registry_new();
reg = ecs_register(reg, ECS_COMP_HEALTH);
reg = ecs_register(reg, ECS_COMP_VELOCITY);

// --- Spawn entity with ID 42 ---
let hp: int[] = ecs_health_init(42, 100);     // full health, 100 max
let vel: int[] = ecs_vel_init(1000, 0, 500);  // vx=1.0, vy=0.0, vz=0.5 (×1000)

// Tag the entity in Minecraft (via raw() or a .mcfunction):
//   tag @e[scores={ecs_entity=42}] add ecs_has_health
//   tag @e[scores={ecs_entity=42}] add ecs_has_velocity

// --- Combat tick ---
hp = ecs_health_damage(hp, 30);  // take 30 damage → 70 HP

// --- Physics tick ---
vel = ecs_vel_apply_gravity(vel, 980);  // subtract 0.980 blocks/tick²
vel = ecs_vel_damp(vel, 9000);          // 90% air resistance

// --- Death check ---
if (ecs_health_is_dead(hp) == 1) {
    // entity died — trigger death logic
}

let pct: int = ecs_health_pct(hp);  // 7000 = 70.00%
```

## Functions

### Registry

#### `ecs_registry_new(): int[]`

Allocate a blank 16-slot registry. All slots are initialised to 0 (no components registered). The registry tracks which component types are active in a datapack.

---

#### `ecs_register(reg: int[], comp_id: int): int[]`

Mark `comp_id` as registered in `reg`. Returns the updated registry. `comp_id` must be in `[0, 15]`; out-of-range values are silently ignored.

**Example:**
```rs
let reg: int[] = ecs_registry_new();
reg = ecs_register(reg, ECS_COMP_HEALTH);
```

---

#### `ecs_is_registered(reg: int[], comp_id: int): int`

Return `1` if `comp_id` is registered, `0` otherwise. Returns `0` for out-of-range IDs.

**Example:**
```rs
let ok: int = ecs_is_registered(reg, ECS_COMP_VELOCITY);  // 1 or 0
```

---

### Health Component

State layout — `int[8]`:

| Index | Field          | Description                        |
|-------|----------------|------------------------------------|
| 0     | `entity_score` | Scoreboard score used as entity ID |
| 1     | `current_hp`   | Current hit points                 |
| 2     | `max_hp`       | Maximum hit points                 |
| 3–7   | *(reserved)*   | 0                                  |

#### `ecs_health_init(entity_score: int, max_hp: int): int[]`

Create a health component state. Sets `current_hp = max_hp` (full health at spawn).

```rs
let hp: int[] = ecs_health_init(42, 100);  // entity 42, 100/100 HP
```

---

#### `ecs_health_get(state: int[]): int`

Return the current HP.

---

#### `ecs_health_max(state: int[]): int`

Return the maximum HP.

---

#### `ecs_health_set(state: int[], hp: int): int[]`

Set current HP, clamped to `[0, max_hp]`. Returns the updated state.

---

#### `ecs_health_damage(state: int[], amount: int): int[]`

Subtract `amount` from current HP, clamped to `0`. Returns the updated state.

---

#### `ecs_health_heal(state: int[], amount: int): int[]`

Add `amount` to current HP, clamped to `max_hp`. Returns the updated state.

---

#### `ecs_health_is_dead(state: int[]): int`

Return `1` if `current_hp <= 0`, else `0`.

---

#### `ecs_health_pct(state: int[]): int`

Return HP as a percentage in ×10000 fixed-point.

```
pct = current_hp × 10000 / max_hp
```

50 HP out of 100 max → `5000` (= 50.00%). Returns `0` if `max_hp <= 0`.

---

### Velocity Component

State layout — `int[8]`:

| Index | Field  | Description                                      |
|-------|--------|--------------------------------------------------|
| 0     | `vx`   | X velocity, ×1000 fixed-point (1000 = 1.0 b/t)  |
| 1     | `vy`   | Y velocity, ×1000 fixed-point                    |
| 2     | `vz`   | Z velocity, ×1000 fixed-point                    |
| 3–7   | *(reserved)* | 0                                          |

Fixed-point convention: `1000` = 1.0 block/tick.

#### `ecs_vel_init(vx: int, vy: int, vz: int): int[]`

Create a velocity component state with the given components.

```rs
let vel: int[] = ecs_vel_init(1000, 0, 500);  // 1.0, 0.0, 0.5 b/t
```

---

#### `ecs_vel_get_x(state: int[]): int`

Return `vx` (×1000).

---

#### `ecs_vel_get_y(state: int[]): int`

Return `vy` (×1000).

---

#### `ecs_vel_get_z(state: int[]): int`

Return `vz` (×1000).

---

#### `ecs_vel_set(state: int[], vx: int, vy: int, vz: int): int[]`

Set all three velocity components. Returns the updated state.

---

#### `ecs_vel_speed(state: int[]): int`

Return the magnitude of the velocity vector in ×1000 fixed-point.

```
speed = sqrt(vx² + vy² + vz²)
```

**Example:** `ecs_vel_speed([3000, 4000, 0, ...])` → `5000` (Pythagorean triple 3-4-5).

---

#### `ecs_vel_apply_gravity(state: int[], gravity_fx: int): int[]`

Subtract `gravity_fx` from `vy` each tick. `gravity_fx` is ×1000 fixed-point; e.g. `980` ≈ 0.980 blocks/tick² (roughly 0.08 g/tick, matching Minecraft's default gravity). Returns the updated state.

---

#### `ecs_vel_damp(state: int[], factor_fx: int): int[]`

Multiply each velocity component by `factor_fx / 10000` (friction/air resistance). `factor_fx` is ×10000; e.g. `8000` = 0.80 damping (20% speed loss per tick). Returns the updated state.

**Example:**
```rs
vel = ecs_vel_damp(vel, 9000);  // 90% retained each tick
```
