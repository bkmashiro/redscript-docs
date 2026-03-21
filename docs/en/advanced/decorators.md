# Advanced Decorators

This page collects the advanced and compiler-oriented decorators used in recent RedScript builds. For the beginner-friendly lifecycle overview, see the main [Decorators guide](/en/guide/decorators).

## `@tick`

**Syntax:** `@tick` or `@tick(rate=N)`

**Compile behaviour:** Registers the function as a tick entrypoint. `@tick` runs every tick. `@tick(rate=N)` lowers to scheduled repeated execution every `N` ticks.

```rs
@tick(rate=20)
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

**Syntax:** `@watch("target")`

**Compile behaviour:** Registers the decorated handler with the compiler-generated watch system. The exact storage backend depends on the target build, but the contract is stable: the handler is wired into generated change-detection glue instead of being treated as a normal manually called function.

```rs
let phase: int = 0

@watch("phase")
fn on_phase_changed() {
    say(f"Phase changed to {phase}")
}
```

Use `@watch` for reactive debug panels, state transitions, and low-frequency change handlers.

## `@singleton`

**Syntax:** `@singleton`

**Compile behaviour:** Lowers the decorated type or factory to one shared instance in generated storage. All consumers talk to the same backing state instead of creating fresh copies.

```rs
@singleton
struct MatchState {
    round: int
    running: bool
}
```

This is useful for global game state, managers, and registries that must exist exactly once.

## `@config`

**Syntax:** `@config("key.path")`

**Compile behaviour:** Binds the declaration to a named configuration entry. The compiler emits load-time glue so the value is initialized from configuration data with the declared default as fallback.

```rs
@config("game.welcome")
let welcome_message: string = "Welcome!"

@load
fn greet() {
    say(welcome_message)
}
```

Keep config keys stable once other modules or worlds depend on them.

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
