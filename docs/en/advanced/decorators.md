# Advanced Decorators

This page collects the advanced and compiler-oriented decorators used in recent RedScript builds. For the beginner-friendly lifecycle overview, see the main [Decorators guide](/en/guide/decorators).

## `@tick`

**Syntax:** `@tick` or `@throttle(ticks=N)`

**Compile behaviour:** Registers `@tick` as a direct tick entrypoint. `@throttle(ticks=N)` generates a tick-registered dispatcher that counts ticks and calls the function every `N` ticks.

```rs
@throttle(ticks=20)
fn update_sidebar() {
    sidebar_set("Kills", @a, "kills")
}
```

Use `rate=N` unless the function truly must run every tick.

## `@load`

**Syntax:** `@load`

**Compile behaviour:** Adds the function to the datapack load entrypoint so it runs on world load and `/reload`.

```rs
@load
fn init() {
    scoreboard_add_objective("kills", "playerKillCount")
}
```

This is the right place for setup logic, scoreboard creation, and one-time initialization.

## `@coroutine`

**Syntax:** `@coroutine`, `@coroutine(batch=N)`, or `@coroutine(batch=N, onDone="fn_name")`

**Compile behaviour:** Rewrites loop-heavy code into a resumable state machine. The compiler inserts yield points at loop back-edges, stores coroutine state between ticks, and schedules resumption on later ticks.

```rs
@coroutine(batch=50, onDone="scan_done")
fn scan_area() {
    let i: int = 0
    while (i < 1000) {
        i = i + 1
    }
}

fn scan_done() {
    say("Scan finished")
}
```

Use this when the work is too large for a single tick.

## `@inline`

**Syntax:** `@inline`

**Compile behaviour:** Marks a tiny helper as a candidate for call-site substitution during optimization. After inlining, later passes can often fold constants, remove temporaries, and merge blocks more aggressively.

```rs
@inline
fn clamp_zero(x: int) -> int {
    if (x < 0) {
        return 0
    }
    return x
}
```

Treat it as a hint, not as a command to inline everything.

## `@deprecated`

**Syntax:** `@deprecated("message")`

**Compile behaviour:** Keeps the symbol available, but emits a compile-time warning when other code references it. This is useful when you want to preserve compatibility while steering users toward a replacement API.

```rs
@deprecated("Use grant_reward_v2 instead")
fn grant_reward() {
    say("legacy reward")
}
```

Deprecation is a migration tool, not a removal mechanism.

## `@watch`

**Syntax:** `@watch("scoreboard_objective")`

**Compile behaviour:** Registers a parameterless handler with the generated watch dispatcher. The compiler creates a previous-value objective and a tick entry that runs the handler for players whose value in the watched scoreboard objective changed.

```rs
@watch("rs.kills")
fn on_kills_changed() {
    let kills: int = scoreboard_get("@s", "rs.kills")
    if (kills >= 10) {
        title("@s", "Achievement Unlocked!")
    }
}
```

Use `@watch` for low-frequency reactions to scoreboard changes. It watches Minecraft scoreboard objectives, not arbitrary RedScript globals.

## `@singleton`

**Syntax:** `@singleton` on a `struct`

**Compile behaviour:** Marks a struct as global scoreboard-backed state. The typechecker exposes synthetic static `StructName::get()` and `StructName::set(value)` methods, and the compiler emits per-field scoreboard objectives and helper functions.

```rs
@singleton
struct MatchState {
    round: int,
    running: int,
}

@keep
fn advance_round() {
    let state = MatchState::get()
    state.round = state.round + 1
    MatchState::set(state)
}
```

This is useful for small pieces of global game state. It is currently a struct feature, not a general function or factory singleton.

## `@config`

**Syntax:** `@config("key", default: N)` on a global `let`

**Compile behaviour:** Replaces the decorated global with an integer compile-time constant. Values come from `CompileOptions.config`; if a key is missing, the declared numeric `default` is used, or `0` if no default is provided. It does not generate load-time config-reading glue.

```rs
@config("max_players", default: 20)
let MAX_PLAYERS: int

fn get_max_players(): int {
    return MAX_PLAYERS
}
```

Keep config keys stable once build scripts or consuming projects depend on them.

## `@on(EventType)`

**Syntax:** `@on(EventType)`

**Compile behaviour:** Registers the function with the static event dispatcher for the specified event type. The generated datapack polls the relevant event source and calls the handler when the event fires.

```rs
@on(PlayerJoin)
fn welcome_player() {
    title(@s, "Welcome!")
}
```

Use `@on(...)` when you want typed event-driven logic rather than a raw tick loop.

## Practical Notes

- `@load`, `@tick`, and `@on(...)` create entrypoints and are always retained by DCE.
- `@coroutine` changes execution shape, so keep loop bodies explicit and easy to reason about.
- `@inline` and `@deprecated` are compile-time hints; they do not create runtime entrypoints.
- `@watch`, `@singleton`, and `@config` are best used sparingly around clearly shared or generated infrastructure.
