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

Handles a static event type. The event handler is polled every tick via tag detection.

**Syntax:** `@on(EventType)`

**Supported event types:**

| Event | Description | Detection |
|-------|-------------|-----------|
| `PlayerDeath` | A player dies | Score-based |
| `PlayerJoin` | A player joins | Tag-based |
| `BlockBreak` | A player breaks a block | Advancement |
| `EntityKill` | A player kills an entity | Score-based |
| `ItemUse` | A player uses an item | Score-based |

```rs
@on(PlayerDeath)
fn handle_player_death() {
    say("A player has died!");
    scoreboard_add(@s, "deaths", 1);
}

@on(PlayerJoin)
fn handle_player_join() {
    title(@s, "Welcome to the Server!");
}

@on(BlockBreak)
fn handle_block_break() {
    scoreboard_add(@s, "blocks_broken", 1);
}
```

**Compiles to:** Per-tick tag checking on `@a` using the event's internal tag (e.g., `rs.just_died`).

## @schedule

Schedules a function to run once after a fixed delay (in ticks) from the moment the datapack loads or after the decorated function is otherwise triggered.

**Syntax:** `@schedule(delay=N)`

| Parameter | Description |
|-----------|-------------|
| `delay=N` | Number of ticks to wait before executing the function. |

```rs
@schedule(delay=100)
fn delayed_start() {
    // Runs 5 seconds (100 ticks) after datapack load
    say("Game starting!");
}

@schedule(delay=1200)
fn end_game() {
    // Runs 60 seconds (1200 ticks) after datapack load
    say("Time's up!");
    scoreboard_display("sidebar", "kills");
}
```

**Compiles to:** `schedule function <ns>:<name> <delay>t` in the `@load` setup function.

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

Ensures only one instance of this function's state exists globally.

**Syntax:** `@singleton`

```rs
@singleton
fn get_game_state(): int {
    // State is shared across all calls
}
```

## @watch

Runs the function when a scoreboard value changes.

**Syntax:** `@watch("objective")`

```rs
@watch("score")
fn on_score_change() {
    say("Score changed!");
}
```

## @config

Injects compile-time configuration values.

**Syntax:** `@config("key")`

```rs
@config("MAX_PLAYERS")
const MAX_PLAYERS: int = 16;  // Default, can be overridden
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
| `@on_trigger("x")` | Player runs `/trigger x` | Triggering player |
| `@on_death` | Entity death | Dying entity |
| `@on_login` | Player joins server | Joining player |
| `@on_advancement("id")` | Player earns advancement | Player |
| `@on_craft("item")` | Player crafts item | Crafting player |
| `@on_join_team("team")` | Player joins team | Player |
| `@on(EventType)` | Static event fires | Event player |
| `@schedule(delay=N)` | Runs function once N ticks after datapack load | Server |
| `@keep` | (Optimizer hint, no runtime effect) | — |
| `@coroutine` | Marks function as a coroutine (yields at loop back-edges) | — |
| `@inline` | Inline at call sites | — |
| `@deprecated` | Emit warning on use | — |
| `@singleton` | Single global instance | — |
| `@watch` | Scoreboard change | — |
| `@config` | Compile-time config | — |
| `@profile` | Performance timing | — |
| `@throttle(N)` | Rate limit to 1/N ticks | — |
| `@retry(N)` | Auto-retry N times | — |
| `@memoize` | Cache results | — |
| `@benchmark` | Tick-level timing | — |
| `@test` | Test function | — |
