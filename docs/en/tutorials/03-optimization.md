# Tutorial: Optimization — Optimizer & Decorators

<div class="tutorial-meta">
  <span class="difficulty intermediate">🟡 Intermediate</span>
  <span class="time">⏱️ 20 min</span>
</div>

**Prerequisites:** [Hello World](./01-hello-world), [Game Mechanics](./02-game-mechanics)

## Why Optimization Matters

A Minecraft server runs at 20 ticks per second. Every function in your datapack that runs on a tick adds latency. A single poorly written `@tick` can lag a server with dozens of players.

RedScript's optimizer automatically eliminates dead code, folds constants, and simplifies loops — but it works best when you write code with performance in mind and apply the right decorators.

This tutorial teaches:

- Understanding the fixed optimization pipeline
- `@throttle(ticks=N)` — spreading work over time
- `@inline` — eliminating small function call overhead
- `@keep` — preventing DCE from removing needed functions
- `@coroutine` — handling expensive work without freezing the server
- Using snapshot flags to inspect compile stages

---

## Step 1: Optimizer defaults (no CLI levels)

Current RedScript does not expose public `-O0` / `-O1` / `-O2` levels. The optimizer runs a fixed safe pipeline every time you compile.

Use snapshot flags when you want to inspect optimizer-stage boundaries:

```bash
# Snapshot selected stages for analysis
redscript compile src/main.mcrs \
  --snapshot-stages parse,typecheck,runtimeAssets,emitDatapack \
  --snapshot-output .redscript/stages.json

# Snapshot all stages
redscript compile src/main.mcrs \
  --snapshot-stages all --snapshot-output .redscript/stages.json
```

`--stats` is not a compile option in current CLI output.


---

## Step 2: Rate-Limited Ticks

**The single biggest performance win** in most datapacks is reducing how often tick functions run.

❌ **Bad — runs 20×/second:**

```rs
@tick
fn update_sidebar() {
    foreach (p in @a) {
        let kills: int = scoreboard_get(p, "kills")
        actionbar(p, f"Kills: {kills}")
    }
}
```

✅ **Good — runs once per second:**

```rs
@throttle(ticks=20)
fn update_sidebar() {
    foreach (p in @a) {
        let kills: int = scoreboard_get(p, "kills")
        actionbar(p, f"Kills: {kills}")
    }
}
```

✅ **Better for slow updates — runs every 5 seconds:**

```rs
@throttle(ticks=100)
fn update_leaderboard() {
    // Expensive per-player calculation
    foreach (p in @a) {
        let k: int = scoreboard_get(p, "kills")
        let d: int = scoreboard_get(p, "deaths")
        if (d > 0) {
            scoreboard_set(p, "kd", k * 100 / d)
        }
    }
}
```

**Rule of thumb:**

| Update frequency needed | Rate |
|------------------------|------|
| Every tick (reaction-critical) | `@tick` |
| Visual smoothness (HUD) | `@throttle(ticks=2)` |
| Stat updates | `@throttle(ticks=20)` – `@throttle(ticks=100)` |
| Leaderboard, announcements | `@throttle(ticks=200)` – `@throttle(ticks=1200)` |

---

## Step 3: `@inline` for Hot Helpers

Small helper functions called many times per tick are good candidates for inlining. The optimizer substitutes the body directly at the call site, removing the function call overhead.

```rs
// Without @inline: a function call is generated every time clamp() is used
fn clamp(val: int, lo: int, hi: int) -> int {
    if (val < lo) { return lo }
    if (val > hi) { return hi }
    return val
}

// With @inline: the body is pasted in at each call site
@inline
fn clamp(val: int, lo: int, hi: int) -> int {
    if (val < lo) { return lo }
    if (val > hi) { return hi }
    return val
}
```

Usage is identical — only the compiled output changes:

```rs
@throttle(ticks=1)
fn clamp_health() {
    foreach (p in @a) {
        let hp: int = scoreboard_get(p, "hp")
        let clamped: int = clamp(hp, 0, 200)   // inlined: no function call
        scoreboard_set(p, "hp", clamped)
    }
}
```

**When to use `@inline`:**

- Functions under ~5 lines
- Called inside loops or per-player loops
- Pure math/logic helpers

**When NOT to use `@inline`:**

- Large functions (code bloat)
- Recursive functions (unsupported)
- Functions you want to call manually with `/function`

---

## Step 4: Constant Folding in Practice

The optimizer evaluates constant expressions at compile time. Write configuration as named constants and let the compiler crunch them.

```rs
// These are all folded at compile time — zero runtime cost
const TICKS_PER_SECOND: int  = 20
const TICKS_PER_MINUTE: int  = 20 * 60       // → 1200
const GRACE_PERIOD:     int  = 3 * 20        // → 60 ticks = 3 seconds
const MAX_STREAK_BONUS: int  = 5 * 10        // → 50

@throttle(ticks=TICKS_PER_MINUTE)
fn hourly_announcement() {
    say("Remember to vote for the server!")
}

@on(PlayerJoin)
fn grace_period(player: Player) {
    // Give new players 3 seconds of invulnerability
    effect(player, "minecraft:resistance", GRACE_PERIOD, 255)
}
```

The compiled datapack uses `1200`, `60`, and `50` directly — no arithmetic at runtime.

---

## Step 5: `@keep` — Preventing Unwanted DCE

Dead code elimination (DCE) removes functions not reachable from any entrypoint. Sometimes you want a function available for external `/function` calls without wiring it into the normal event flow.

```rs
// This function is never called from RedScript code,
// but we want `/function killboard:debug_dump` to work in-game.
@keep
fn _debug_dump() {
    foreach (p in @a) {
        let k: int = scoreboard_get(p, "kills")
        let d: int = scoreboard_get(p, "deaths")
        tell(p, f"kills={k} deaths={d}")
    }
}
```

Without `@keep`, DCE would remove `_debug_dump` because nothing calls it. With `@keep`, it is always emitted.

---

## Manual Experimental Option: `--experimental-lir-local-copy-rewrite`

This flag is available for explicit optimization experimentation only:

```bash
redscript compile src/main.mcrs --experimental-lir-local-copy-rewrite
```

It enables an additional LIR local-copy rewrite pass and is intentionally off by default. Current reports describe this as benchmarked evidence that should be treated as manual/experimental; it is not a general production default.

---

## Step 6: `@coroutine` for Expensive Work

Some operations need to touch many entities or run complex calculations. Doing them all in one tick stalls the server. Use `@coroutine` to spread the work across multiple ticks automatically.

```rs
// Without @coroutine: this loop blocks one tick entirely
fn scan_all_entities() {
    let i: int = 0
    while (i < 500) {
        // process entity i
        i = i + 1
    }
}

// With @coroutine: the compiler inserts yield points every `batch` iterations
@coroutine(batch=50, onDone="scan_complete")
fn scan_all_entities() {
    let i: int = 0
    while (i < 500) {
        // process entity i
        i = i + 1
    }
}

fn scan_complete() {
    say("Entity scan finished across 10 ticks!")
}
```

With `batch=50`, the compiler splits the 500-iteration loop into 10 resumable chunks of 50 iterations. Each chunk runs on a separate tick, and `scan_complete` fires when all chunks are done.

---

## Putting It All Together

Here's an optimized version of the kill leaderboard from Tutorial 02:

```rs
namespace killboard_optimized

// ─── Constants ──────────────────────────────────────────────

const SIDEBAR_RATE:     int = 20     // update sidebar every second
const LEADERBOARD_RATE: int = 200    // update K/D every 10 seconds
const GRACE_TICKS:      int = 3 * 20 // 3-second spawn protection

// ─── Init ───────────────────────────────────────────────────

@load
fn init() {
    scoreboard_add_objective("kills",      "playerKillCount")
    scoreboard_add_objective("deaths",     "deathCount")
    scoreboard_add_objective("streak",     "dummy")
    scoreboard_add_objective("kd",         "dummy")
    scoreboard_add_objective("prev_kills", "dummy")
    scoreboard_display("sidebar", "kills")
    say("Kill Leaderboard (optimized) loaded!")
}

// ─── Inlined Helpers ────────────────────────────────────────

@inline
fn safe_kd(k: int, d: int) -> int {
    if (d == 0) { return k * 100 }
    return k * 100 / d
}

// ─── Rate-Limited Ticks ─────────────────────────────────────

@throttle(ticks=SIDEBAR_RATE)
fn update_sidebar() {
    foreach (p in @a) {
        let kills: int = scoreboard_get(p, "kills")
        actionbar(p, f"Kills: {kills}")
    }
}

@throttle(ticks=LEADERBOARD_RATE)
fn update_kd() {
    foreach (p in @a) {
        let k: int = scoreboard_get(p, "kills")
        let d: int = scoreboard_get(p, "deaths")
        scoreboard_set(p, "kd", safe_kd(k, d))
    }
}

// ─── Events ─────────────────────────────────────────────────

@on(PlayerJoin)
fn on_join(player: Player) {
    effect(player, "minecraft:resistance", GRACE_TICKS, 255)
    tell(player, "⚔️ Welcome! You have 3 seconds of spawn protection.")
}

@on(PlayerDeath)
fn on_death(player: Player) {
    let streak: int = scoreboard_get(player, "streak")
    if (streak >= 5) {
        say(f"🔥 {player} ended with a {streak} kill streak!")
    }
    scoreboard_set(player, "streak", 0)
}

// ─── Debug (kept for manual /function use) ──────────────────

@keep
fn _debug_stats() {
    foreach (p in @a) {
        let k:  int = scoreboard_get(p, "kills")
        let d:  int = scoreboard_get(p, "deaths")
        let kd: int = scoreboard_get(p, "kd")
        tell(p, f"kills={k} deaths={d} kd={kd / 100}.{kd % 100}")
    }
}
```

---

## Build and read output

```bash
redscript compile src/main.mcrs -o out
```

Typical output:

```
✓ Compiled src/main.mcrs to out/
  Namespace:  killboard
  Files:     9
```

If you need machine-readable stage boundaries, pass `--snapshot-stages` and `--snapshot-output` as shown in Step 1.

---

## Summary

| Technique | When to use |
|-----------|-------------|
| Compile defaults | Always use `redscript compile` for the fixed default optimizer |
| `@throttle(ticks=N)` | Any periodic function that does not need every-tick precision |
| `@inline` | Small pure helpers called in loops |
| `@keep` | Functions you call via `/function` externally |
| `@coroutine` | Loops over hundreds of entities or expensive multi-step calculations |
| `--experimental-lir-local-copy-rewrite` | Manual optimization experiments, with evidence-focused validation |
| Constants | Any magic numbers used in multiple places |

---

## What's Next?

- [Advanced: Optimization](../advanced/optimization) — deep dive into the full optimizer pipeline
- [Advanced: Decorators](../advanced/decorators) — full decorator reference
- [Guide: Testing](../guide/testing) — write automated tests for your datapack
