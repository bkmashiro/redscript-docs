# Decorator Reference

Complete reference for all decorators in RedScript.

## @load

Runs the function when the datapack is loaded or reloaded.

**Syntax:** `@load`

```rs
@load
fn init() {
    say("Loaded!");
}
```

**Compiles to:** Adds function to `#minecraft:load` function tag.

**Use cases:**
- Initialize scoreboards
- Set up teams
- Reset game state
- Display welcome messages

## @tick

Runs the function every game tick (20 times per second).

**Syntax:** `@tick`

```rs
@tick
fn update() {
    // runs 20 times per second
}
```

**Compiles to:** Adds function to `#minecraft:tick` function tag.

::: warning
Use `@tick` sparingly. Running complex logic 20 times per second can cause lag. Prefer `@tick(rate=N)` when possible.
:::

## @tick(rate=N)

Runs the function every N ticks.

**Syntax:** `@tick(rate=N)`

| Rate | Frequency |
|------|-----------|
| `rate=1` | Every tick (same as `@tick`) |
| `rate=20` | Every second |
| `rate=100` | Every 5 seconds |
| `rate=200` | Every 10 seconds |
| `rate=1200` | Every minute |

```rs
@tick(rate=20)
fn every_second() {
    // runs once per second
}

@tick(rate=1200)
fn every_minute() {
    // runs once per minute
}
```

**Compiles to:** Uses `schedule` command with the specified interval.

## @function_tag

Registers the function in a Minecraft function tag. This is the generic primitive behind tag-based entry points.

**Syntax:** `@function_tag("namespace:path")`

```rs
@function_tag("minecraft:load")
fn init() {
    say("Loaded through a function tag");
}

@function_tag("rs:on_player_death")
fn on_player_death() {
    scoreboard_add(@s, "deaths", 1);
}
```

**Compiles to:** Adds the function reference to `data/<namespace>/tags/function/<path>.json`.

`@load` is equivalent to `@function_tag("minecraft:load")`, and `@tick` is equivalent to `@function_tag("minecraft:tick")`. If both forms target the same tag, the compiler merges and de-duplicates the tag entries.

## @on_trigger

Runs when a player activates a trigger scoreboard.

**Syntax:** `@on_trigger("trigger_name")`

```rs
@on_trigger("menu")
fn open_menu() {
    tellraw(@s, "Menu opened!");
}
```

**Player activation:** `/trigger menu`

**Compiles to:**
1. Creates a trigger scoreboard objective
2. Detects when score changes from 0
3. Resets the trigger after execution

**Use cases:**
- Player-activated menus
- Shop systems
- Voting systems
- Custom commands

## @on_death

Runs when an entity dies.

**Syntax:** `@on_death`

```rs
@on_death
fn handle_death() {
    tellraw(@s, "You died!");
    scoreboard_add(@s, "deaths", 1);
}
```

**Compiles to:** Uses advancement-based death detection.

**Context:** `@s` refers to the player who died.

## @on_login

Runs when a player logs in (joins) the server.

**Syntax:** `@on_login`

```rs
@on_login
fn welcome() {
    title(@s, "Welcome!");
    tag_add(@s, "joined");
}
```

**Compiles to:** Tag-based detection — checks for players without the join tag each tick.

**Context:** `@s` refers to the joining player.

## @on_advancement

Runs when a player earns a specific advancement.

**Syntax:** `@on_advancement("advancement_id")`

```rs
@on_advancement("story/mine_diamond")
fn got_diamonds() {
    tellraw(@s, "You found diamonds! Here's a reward.");
    give(@s, "emerald", 5);
}
```

**Compiles to:** Uses advancement reward function mechanism.

**Context:** `@s` refers to the player who earned the advancement.

## @on_craft

Runs when a player crafts a specific item.

**Syntax:** `@on_craft("item_id")`

```rs
@on_craft("minecraft:diamond_sword")
fn crafted_sword() {
    tellraw(@s, "You crafted a diamond sword!");
    effect(@s, "strength", 200, 1);
}
```

**Compiles to:** Advancement with `inventory_changed` trigger condition.

**Context:** `@s` refers to the crafting player.

## @on_join_team

Runs when a player joins a specific team.

**Syntax:** `@on_join_team("team_name")`

```rs
@on_join_team("red")
fn joined_red_team() {
    title(@s, "Red Team!");
    effect(@s, "speed", 200, 1);
}
```

**Compiles to:** Team join detection.

**Context:** `@s` refers to the player who joined the team.

## @on(EventType)

Handles a compiler-known runtime event type. The event runtime injects the executor context, so a zero-argument handler should normally use `@s` for the triggering player/entity. A legacy single `Player` parameter is still accepted for compatibility, but it should be treated as an alias for the event executor rather than a normal function argument.

**Syntax:** `@on(EventType)`

**Supported event types:**

| Event | Description | Detection | `@s` context |
|-------|-------------|-----------|--------------|
| `PlayerDeath` | A player dies | Scoreboard/runtime asset | `Player` |
| `PlayerJoin` | A player joins | Tag/runtime asset | `Player` |
| `EntityKill` | A player kills an entity | Scoreboard/runtime asset | `Player` |
| `ItemUse` | A player uses an item | Scoreboard/runtime asset | `Player` |

```rs
@on(PlayerDeath)
fn handle_player_death() {
    scoreboard_add(@s, "deaths", 1);
}

// Legacy-compatible form: the parameter is lowered as the event executor.
@on(PlayerJoin)
fn handle_player_join(player: Player) {
    title(player, "Welcome to the Server!");
}
```

**Compiles to:** Adds the handler to the event's function tag (for example `rs:on_player_death`) and automatically includes the required event runtime asset from the standard library. For unsupported events, use `@function_tag` plus an explicit stdlib/runtime dispatcher.

## @schedule

Schedules a function to run once after a fixed delay (in ticks) from the moment the datapack loads or after the decorated function is otherwise triggered.

**Syntax:** `@schedule(ticks=N)`

| Parameter | Description |
|-----------|-------------|
| `ticks=N` | Number of ticks to wait before executing the function. |

```rs
@schedule(ticks=100)
fn delayed_start() {
    // Runs 5 seconds (100 ticks) after datapack load
    say("Game starting!");
}

@schedule(ticks=1200)
fn end_game() {
    // Runs 60 seconds (1200 ticks) after datapack load
    say("Time's up!");
    scoreboard_display("sidebar", "kills");
}
```

**Compiles to:** a compiler-generated scheduling wrapper that runs `schedule function <ns>:<name> <ticks>t` from the startup path.

::: tip
For recurring scheduled tasks, use `@tick(rate=N)`. Use `@schedule` only for one-shot startup delays.
:::

## @keep

Prevents the dead code elimination (DCE) optimizer from removing a function.

**Syntax:** `@keep`

By default, functions whose names start with `_` are treated as private and may be removed if unreachable. `@keep` forces them to be included in the compiled output regardless.

```rs
@keep
fn _internal_helper() {
    // Kept even though name starts with _
}
```

**Use cases:**
- Utility functions called only via `/function` in-game
- Functions that should survive aggressive DCE

## @coroutine

Marks a function as a coroutine — a long-running task that can yield control back to Minecraft at loop back-edges, preventing server timeout on expensive computations.

**Syntax:** `@coroutine` or `@coroutine(batch=N)` or `@coroutine(onDone="fn_name")`

```rs
@coroutine(batch=10, onDone="on_done")
fn process_all_players() {
    foreach (p in @a) {
        heavy_computation(p);
        // yields every 10 iterations at the loop back-edge
    }
}

fn on_done() {
    say("Processing complete!");
}
```

**Parameters:**

| Parameter | Description |
|-----------|-------------|
| `batch=N` | Number of loop iterations to execute per tick before yielding. Default: 1 (yield every iteration). |
| `onDone="fn"` | Name of a no-arg function to call when the coroutine finishes all iterations. |

**Behaviour:**
- Yields at loop back-edges (end of each `foreach` / `for` / `while` body iteration).
- Uses `schedule function ... 1t` to resume on the next tick.
- State is preserved between ticks in a dedicated scoreboard.
- Only one instance of a coroutine runs at a time; starting a new one while it is running is a no-op.

**Use cases:**
- Processing large entity lists without causing `/tick warp` timeouts
- Spreading heavy map generation over multiple ticks
- Chunked bulk operations (inventory scans, world edits)

## @inline

Hints the compiler to inline this function at call sites.

**Syntax:** `@inline`

```rs
@inline
fn add(a: int, b: int): int {
    return a + b;
}
```

**Use cases:**
- Performance-critical small functions
- Avoiding function call overhead

## @deprecated

Marks a function as deprecated. Compiler emits a warning when called.

**Syntax:** `@deprecated` or `@deprecated("message")`

```rs
@deprecated("Use new_api() instead")
fn old_api() { }
```

## @singleton

Marks a struct as global scoreboard-backed state and exposes synthetic `StructName::get()` / `StructName::set(value)` helpers.

**Syntax:** `@singleton` on a `struct`

```rs
@singleton
struct GameState {
    phase: int,
    tick_count: int,
}

@keep
fn update_state() {
    let state = GameState::get()
    state.tick_count = state.tick_count + 1
    GameState::set(state)
}
```

## @watch

Runs a parameterless handler when a player's value in a watched scoreboard objective changes.

**Syntax:** `@watch("objective")`

```rs
@watch("rs.kills")
fn on_score_change() {
    say("Score changed!")
}
```

## @config

Injects numeric compile-time configuration values into global `let` declarations.

**Syntax:** `@config("key", default: N)`

```rs
@config("max_players", default: 16)
let MAX_PLAYERS: int
```

## @profile

Enables performance profiling for this function.

**Syntax:** `@profile`

```rs
@profile
fn expensive_calculation() {
    // Timing data emitted to game output
}
```

## @throttle

Rate-limits function execution to once per N ticks.

**Syntax:** `@throttle(N)`

```rs
@throttle(20)
fn rate_limited() {
    // Only runs once per second, even if called more often
}
```

## @retry

Auto-retries the function on failure up to N times.

**Syntax:** `@retry(N)`

```rs
@retry(3)
fn unstable_operation() {
    // Retries up to 3 times if scoreboard check fails
}
```

## @memoize

Caches function results for single-arg int functions (LRU-1).

**Syntax:** `@memoize`

```rs
@memoize
fn fibonacci(n: int): int {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```

## @benchmark

Enables tick-level benchmarking, outputs timing stats.

**Syntax:** `@benchmark`

```rs
@benchmark
fn heavy_work() {
    // Timing stats logged to game output
}
```

## @test

Marks a function as a test. Run with `redscript test`.

**Syntax:** `@test`

```rs
@test
fn test_addition() {
    assert(1 + 1 == 2);
}
```

**Use cases:**
- Unit testing datapack logic
- CI/CD validation

## Decorator Summary

| Decorator | Trigger | `@s` Context |
|-----------|---------|--------------|
| `@load` | Datapack load / `/reload` | Server |
| `@tick` | Every tick (20/sec) | Server |
| `@tick(rate=N)` | Every N ticks | Server |
| `@function_tag("namespace:path")` | Function tag registration | Caller / tag runtime |
| `@on_trigger("x")` | Player runs `/trigger x` | Triggering player |
| `@on_death` | Entity death | Dying entity |
| `@on_login` | Player joins server | Joining player |
| `@on_advancement("id")` | Player earns advancement | Player |
| `@on_craft("item")` | Player crafts item | Crafting player |
| `@on_join_team("team")` | Player joins team | Player |
| `@on(EventType)` | Runtime-backed event fires | Event executor (`Player` for built-in events) |
| `@schedule(ticks=N)` | Runs function once N ticks after datapack load | Server |
| `@keep` | (Optimizer hint, no runtime effect) | — |
| `@coroutine` | Marks function as a coroutine (yields at loop back-edges) | — |
| `@inline` | Inline at call sites | — |
| `@deprecated` | Emit warning on use | — |
| `@singleton` | Struct-backed global state | — |
| `@watch` | Per-player scoreboard change | Player (`@s`) |
| `@config` | Numeric compile-time config | — |
| `@profile` | Performance timing | — |
| `@throttle(N)` | Rate limit to 1/N ticks | — |
| `@retry(N)` | Auto-retry N times | — |
| `@memoize` | Cache results | — |
| `@benchmark` | Tick-level timing | — |
| `@test` | Test function | — |
