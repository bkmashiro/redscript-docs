# Ecs

> Auto-generated from `src/stdlib/ecs.mcrs` — do not edit manually.

## API

- [ecs_registry_new](#ecs-registry-new)
- [ecs_register](#ecs-register)
- [ecs_is_registered](#ecs-is-registered)
- [ecs_health_init](#ecs-health-init)
- [ecs_health_get](#ecs-health-get)
- [ecs_health_max](#ecs-health-max)
- [ecs_health_set](#ecs-health-set)
- [ecs_health_damage](#ecs-health-damage)
- [ecs_health_heal](#ecs-health-heal)
- [ecs_health_is_dead](#ecs-health-is-dead)
- [ecs_health_pct](#ecs-health-pct)
- [ecs_vel_init](#ecs-vel-init)
- [ecs_vel_get_x](#ecs-vel-get-x)
- [ecs_vel_get_y](#ecs-vel-get-y)
- [ecs_vel_get_z](#ecs-vel-get-z)
- [ecs_vel_set](#ecs-vel-set)
- [ecs_vel_speed](#ecs-vel-speed)
- [ecs_vel_apply_gravity](#ecs-vel-apply-gravity)
- [ecs_vel_damp](#ecs-vel-damp)

---

## `ecs_registry_new` <Badge type="info" text="Since v2.0.0" />

Allocate a blank 16-slot component registry.

```redscript
fn ecs_registry_new(): int[]
```

**Returns:** A new `int[]` of length 16 with all slots set to `0`

**Example**

```redscript
let reg: int[] = ecs_registry_new()
```

---

## `ecs_register` <Badge type="info" text="Since v2.0.0" />

Mark `comp_id` as registered in the registry and return the updated registry.

```redscript
fn ecs_register(reg: int[], comp_id: int): int[]
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `reg` | Registry array from `ecs_registry_new` |
| `comp_id` | Component type ID in range [0, 15] |

**Returns:** Updated registry array

**Example**

```redscript
reg = ecs_register(reg, ECS_COMP_HEALTH)
```

---

## `ecs_is_registered` <Badge type="info" text="Since v2.0.0" />

Check whether `comp_id` is registered.

```redscript
fn ecs_is_registered(reg: int[], comp_id: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `reg` | Registry array from `ecs_registry_new` |
| `comp_id` | Component type ID in range [0, 15] |

**Returns:** `1` if registered, `0` otherwise

**Example**

```redscript
if (ecs_is_registered(reg, ECS_COMP_HEALTH) == 1) { }
```

---

## `ecs_health_init` <Badge type="info" text="Since v2.0.0" />

Create a health component state with `current_hp = max_hp` (full health).

```redscript
fn ecs_health_init(entity_score: int, max_hp: int): int[]
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `entity_score` | Scoreboard score identifying the entity |
| `max_hp` | Maximum hit points |

**Returns:** New 8-element health component state array

**Example**

```redscript
let hp: int[] = ecs_health_init(42, 100)
```

---

## `ecs_health_get` <Badge type="info" text="Since v2.0.0" />

Return current HP from a health component state.

```redscript
fn ecs_health_get(state: int[]): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `state` | Health component state from `ecs_health_init` |

**Returns:** Current hit point value

**Example**

```redscript
let hp: int = ecs_health_get(state)
```

---

## `ecs_health_max` <Badge type="info" text="Since v2.0.0" />

Return maximum HP from a health component state.

```redscript
fn ecs_health_max(state: int[]): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `state` | Health component state from `ecs_health_init` |

**Returns:** Maximum hit point value

**Example**

```redscript
let max: int = ecs_health_max(state)
```

---

## `ecs_health_set` <Badge type="info" text="Since v2.0.0" />

Set current HP (clamped to [0, max]) and return the updated state.

```redscript
fn ecs_health_set(state: int[], hp: int): int[]
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `state` | Health component state from `ecs_health_init` |
| `hp` | New HP value (clamped to valid range automatically) |

**Returns:** Updated state array

**Example**

```redscript
state = ecs_health_set(state, 50)
```

---

## `ecs_health_damage` <Badge type="info" text="Since v2.0.0" />

Subtract `amount` from HP (clamped to 0) and return the updated state.

```redscript
fn ecs_health_damage(state: int[], amount: int): int[]
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `state` | Health component state |
| `amount` | Damage amount to subtract (positive integer) |

**Returns:** Updated state array

**Example**

```redscript
state = ecs_health_damage(state, 30)
```

---

## `ecs_health_heal` <Badge type="info" text="Since v2.0.0" />

Add `amount` to HP (clamped to max) and return the updated state.

```redscript
fn ecs_health_heal(state: int[], amount: int): int[]
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `state` | Health component state |
| `amount` | Healing amount to add (positive integer) |

**Returns:** Updated state array

**Example**

```redscript
state = ecs_health_heal(state, 20)
```

---

## `ecs_health_is_dead` <Badge type="info" text="Since v2.0.0" />

Return `1` if the entity HP is at or below zero, otherwise `0`.

```redscript
fn ecs_health_is_dead(state: int[]): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `state` | Health component state |

**Returns:** `1` if dead, `0` if alive

**Example**

```redscript
if (ecs_health_is_dead(state) == 1) { /* handle death */ }
```

---

## `ecs_health_pct` <Badge type="info" text="Since v2.0.0" />

Return HP as a percentage in fixed-point ×10000 (e.g., `5000` = 50.00%).

```redscript
fn ecs_health_pct(state: int[]): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `state` | Health component state |

**Returns:** `current_hp * 10000 / max_hp`, or `0` if max_hp is zero

**Example**

```redscript
let pct: int = ecs_health_pct(state)
```

---

## `ecs_vel_init` <Badge type="info" text="Since v2.0.0" />

Create a velocity component state with the given initial velocities.

```redscript
fn ecs_vel_init(vx: int, vy: int, vz: int): int[]
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `vx` | X velocity ×1000 fixed-point (1000 = 1.0 block/tick) |
| `vy` | Y velocity ×1000 fixed-point |
| `vz` | Z velocity ×1000 fixed-point |

**Returns:** New 8-element velocity component state array

**Example**

```redscript
let vel: int[] = ecs_vel_init(1000, 0, 500)
```

---

## `ecs_vel_get_x` <Badge type="info" text="Since v2.0.0" />

Return X velocity from a velocity component state.

```redscript
fn ecs_vel_get_x(state: int[]): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `state` | Velocity component state |

**Returns:** X velocity ×1000 fixed-point

---

## `ecs_vel_get_y` <Badge type="info" text="Since v2.0.0" />

Return Y velocity from a velocity component state.

```redscript
fn ecs_vel_get_y(state: int[]): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `state` | Velocity component state |

**Returns:** Y velocity ×1000 fixed-point

---

## `ecs_vel_get_z` <Badge type="info" text="Since v2.0.0" />

Return Z velocity from a velocity component state.

```redscript
fn ecs_vel_get_z(state: int[]): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `state` | Velocity component state |

**Returns:** Z velocity ×1000 fixed-point

---

## `ecs_vel_set` <Badge type="info" text="Since v2.0.0" />

Set all velocity components and return the updated state.

```redscript
fn ecs_vel_set(state: int[], vx: int, vy: int, vz: int): int[]
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `state` | Velocity component state |
| `vx` | New X velocity ×1000 |
| `vy` | New Y velocity ×1000 |
| `vz` | New Z velocity ×1000 |

**Returns:** Updated state array

**Example**

```redscript
state = ecs_vel_set(state, 500, 1200, 0)
```

---

## `ecs_vel_speed` <Badge type="info" text="Since v2.0.0" />

Return the speed (magnitude) of the velocity vector ×1000.

Uses `sqrt_fixed` from `math.mcrs`. For example,
`ecs_vel_speed([3000, 4000, 0, ...])` returns approximately `5000`.

```redscript
fn ecs_vel_speed(state: int[]): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `state` | Velocity component state |

**Returns:** `sqrt(vx² + vy² + vz²)` in ×1000 fixed-point

**Example**

```redscript
let speed: int = ecs_vel_speed(vel_state)
```

---

## `ecs_vel_apply_gravity` <Badge type="info" text="Since v2.0.0" />

Apply gravity by subtracting `gravity_fx` from the Y velocity each tick.

```redscript
fn ecs_vel_apply_gravity(state: int[], gravity_fx: int): int[]
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `state` | Velocity component state |
| `gravity_fx` | Gravity acceleration ×1000 per tick (e.g. `980` ≈ 0.98 blocks/tick²) |

**Returns:** Updated state array

**Example**

```redscript
vel_state = ecs_vel_apply_gravity(vel_state, 980)
```

---

## `ecs_vel_damp` <Badge type="info" text="Since v2.0.0" />

Apply a friction damping factor to all velocity components.

```redscript
fn ecs_vel_damp(state: int[], factor_fx: int): int[]
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `state` | Velocity component state |
| `factor_fx` | Friction factor ×10000 (e.g. `8000` = 0.80 damping) |

**Returns:** Updated state array with each component multiplied by `factor_fx/10000`

**Example**

```redscript
vel_state = ecs_vel_damp(vel_state, 9000)
```

---
