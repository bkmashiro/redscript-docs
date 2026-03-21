# `state` — Scoreboard-backed state machine

Import: `import "stdlib/state.mcrs"`

Provides a minimal, composable state machine built on a single Minecraft scoreboard objective (`rs.state`). Each entity carries an integer state value; the helpers let you read, write, guard, and transition between states in a type-safe way.

## Setup

Add the following command to your datapack's `load` function so the objective exists before any state operations run:

```mcfunction
scoreboard objectives add rs.state dummy
```

## State constants

Define your own state constants in your RedScript code:

```rs
let STATE_IDLE:   int = 0
let STATE_COMBAT: int = 1
let STATE_DEAD:   int = 2
```

Use `-1` as the sentinel for "not yet initialised" (see [`init_state`](#init_stateentity-selector-initial-int)).

## Functions

### `get_state(entity: selector): Option<int>`

Return the current state of `entity` as stored in `rs.state` wrapped in `Some(state)`. Returns `None` when the entity has not been initialised via `init_state`.

**Example:**
```rs
import "stdlib/state.mcrs"

if let Some(s) = get_state(@s) {
    // entity is initialised; s is the current state
}
```

---

### `set_state(entity: selector, state: int)`

Write `state` directly into `rs.state` for `entity`. No guards — use [`transition`](#transitionentity-selector-from-int-to-int-int) for guarded writes.

**Example:**
```rs
import "stdlib/state.mcrs"

set_state(@s, STATE_IDLE)
```

---

### `is_state(entity: selector, state: int): int`

Check whether `entity` is currently in `state`.

Returns `1` if the entity's current state equals `state`, `0` otherwise.

**Example:**
```rs
import "stdlib/state.mcrs"

if (is_state(@s, STATE_COMBAT) == 1) {
    // entity is fighting
}
```

---

### `init_state(entity: selector, initial: int)`

Initialise `entity` to `initial` **only** if it has not been set before (current score is `-1`). Safe to call every tick; it is a no-op after the first successful initialisation.

**Example:**
```rs
import "stdlib/state.mcrs"

// Call on every tick — will only set STATE_IDLE once.
init_state(@s, STATE_IDLE)
```

---

### `clear_state(entity: selector)`

Remove the state value for `entity` from `rs.state`, resetting it to the uninitialised sentinel (`-1`). Use this when an entity is removed or you want to fully reset its state machine.

**Example:**
```rs
import "stdlib/state.mcrs"

// Entity despawned — wipe its state so a fresh spawn can re-initialise.
clear_state(@s)
```

---

### `transition(entity: selector, from: int, to: int): int`

Attempt a guarded transition: move `entity` from state `from` to state `to` only if it is currently in `from`.

Returns `1` on success, `0` if the entity was not in `from` (transition did not occur).

**Example:**
```rs
import "stdlib/state.mcrs"

let ok: int = transition(@s, STATE_IDLE, STATE_COMBAT)
if (ok == 1) {
    // entity entered combat
}
```

---

## Full example

```rs
import "stdlib/state.mcrs"

let STATE_IDLE:   int = 0
let STATE_COMBAT: int = 1
let STATE_DEAD:   int = 2

// Called once per entity spawn (e.g., from your load/init function).
fn entity_spawn() {
    init_state(@s, STATE_IDLE)
}

// Called every tick for every managed entity.
fn entity_tick() {
    // Dispatch on current state
    if (is_state(@s, STATE_IDLE) == 1) {
        // idle logic …
    }

    if (is_state(@s, STATE_COMBAT) == 1) {
        // combat logic …
        // If HP drops to zero, transition to dead
        let ok: int = transition(@s, STATE_COMBAT, STATE_DEAD)
    }

    if (is_state(@s, STATE_DEAD) == 1) {
        // death logic …
    }
}

// Triggered by an external event (e.g., player proximity detected).
fn on_player_near() {
    // Only enter combat from idle — safe to call even if already in combat.
    let ok: int = transition(@s, STATE_IDLE, STATE_COMBAT)
}
```

## Notes

- The `rs.state` objective uses the `dummy` criterion, so values persist across ticks but are **not** saved between datapack reloads unless your load function preserves them.
- Scoreboard values default to `0` for new entities — **not** `-1`. Always call `init_state` (or `set_state(@s, -1)` + `init_state`) after spawning an entity to ensure the sentinel is set correctly before the first `init_state` call.
- For multiple independent state machines on the same entity, define separate scoreboard objectives and write thin wrappers that call the raw scoreboard builtins directly.
