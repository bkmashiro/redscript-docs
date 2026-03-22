# State

> Auto-generated from `src/stdlib/state.mcrs` — do not edit manually.

## API

- [get_state](#get-state)
- [set_state](#set-state)
- [is_state](#is-state)
- [init_state](#init-state)
- [transition](#transition)

---

## `get_state` <Badge type="info" text="v1.0.0" />

Read the current state of an entity.

Returns `-1` if the entity has not been initialised (score is 0 = unset in
Minecraft, but we reserve `-1` as the sentinel for "never set via
`init_state`").

```redscript
fn get_state(entity: selector) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `entity` | Selector for the target entity |

**Returns:** Current state value stored in `rs.state`, or `-1` if unset

**Example**

```redscript
let s: int = get_state(@s)
```

---

## `set_state` <Badge type="info" text="v1.0.0" />

Write a state value to an entity.

```redscript
fn set_state(entity: selector, state: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `entity` | Selector for the target entity |
| `state` | Integer state constant to write |

**Example**

```redscript
set_state(@s, 1)
```

---

## `is_state` <Badge type="info" text="v1.0.0" />

Check whether an entity is currently in the given state.

```redscript
fn is_state(entity: selector, state: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `entity` | Selector for the target entity |
| `state` | Integer state constant to compare against |

**Returns:** `1` if the entity is in `state`, `0` otherwise

**Example**

```redscript
if (is_state(@s, STATE_COMBAT) == 1) { /* per-tick combat logic */ }
```

---

## `init_state` <Badge type="info" text="v1.0.0" />

Initialise an entity's state only if it has not been set yet (score == -1).

Call once on spawn or load to avoid overwriting an in-progress state.

```redscript
fn init_state(entity: selector, initial: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `entity` | Selector for the target entity |
| `initial` | State constant to write when the entity is uninitialised |

**Example**

```redscript
init_state(@s, STATE_IDLE)
```

---

## `transition` <Badge type="info" text="v1.0.0" />

Attempt a guarded transition from `from` to `to`.

Only performs the transition when the entity is currently in `from`.

```redscript
fn transition(entity: selector, from: int, to: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `entity` | Selector for the target entity |
| `from` | Required current state |
| `to` | State to transition into |

**Returns:** `1` on success, `0` if the entity was not in `from`

**Example**

```redscript
let ok: int = transition(@s, STATE_IDLE, STATE_COMBAT)
```

---
