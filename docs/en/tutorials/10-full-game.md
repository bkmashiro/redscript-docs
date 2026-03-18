# Tutorial 10: Full Game — Kill Race

**Difficulty:** Advanced  
**Time:** ~30 minutes  
**Prerequisites:** All previous tutorials (01–09)

## What You'll Build

A complete, playable mini-game where players compete to get the most kills in 3 minutes. Features a full phase state machine (Lobby → Countdown → Playing → Ended), bossbar timer, random item drops, and kill streak bonuses.

## What You'll Learn

- Combining all RedScript features in a real project
- Phase state machines with structs
- Bossbar UI with `create_timer_bar` / `update_bar`
- Using multiple stdlib modules together (`effects`, `bossbar`, `teams`, `random`)
- `@schedule` for delayed cleanup
- LCG-based deterministic random loot drops

## Full Source

```mcrs
// ============================================
// Tutorial 10: Full Game — Kill Race
// ============================================
// Players compete to get the most kills in 3 minutes.
// Phase machine: LOBBY → COUNTDOWN (10s) → PLAYING (180s) → ENDED
// ============================================

namespace tutorial10

import "stdlib/effects.mcrs"
import "stdlib/bossbar.mcrs"
import "stdlib/teams.mcrs"
import "stdlib/random.mcrs"

// ─── Constants ───────────────────────────────────────────────────────────────

// Phases
let PHASE_LOBBY: int = 0
let PHASE_COUNTDOWN: int = 1
let PHASE_PLAYING: int = 2
let PHASE_ENDED: int = 3

// Timer durations in seconds
let COUNTDOWN_SECS: int = 10
let GAME_SECS: int = 180   // 3 minutes

// ─── Game State ──────────────────────────────────────────────────────────────

struct GameState {
    phase: int,
    timer: int,     // seconds remaining in current phase
    active: int     // 1 if a game is running
}

let game: GameState = {
    phase: 0,
    timer: 0,
    active: 0
}

// ─── Setup ───────────────────────────────────────────────────────────────────

@load
fn setup() {
    // Kills objective tracks player kills automatically
    scoreboard_add_objective("kr_kills", "playerKillCount")
    scoreboard_add_objective("kr_streak", "dummy")
    scoreboard_add_objective("kr_seed", "dummy")

    scoreboard_display("sidebar", "kr_kills")

    // Seed for RNG
    scoreboard_set("#seed", "kr_seed", 123456789)

    say("Kill Race loaded! /trigger join_game  /trigger start_game")
}

// ─── 1-second timer (rate=20 ticks) ─────────────────────────────────────────

@tick(rate=20)
fn game_timer() {
    if (game.active == 0) {
        return
    }

    if (game.phase == PHASE_COUNTDOWN) {
        countdown_tick()
    } else {
        if (game.phase == PHASE_PLAYING) {
            playing_tick()
        }
    }
}

fn countdown_tick() {
    game.timer = game.timer - 1
    actionbar(@a, f"Game starting in {game.timer}...")

    if (game.timer <= 0) {
        begin_game()
    }
}

fn playing_tick() {
    game.timer = game.timer - 1

    // Update bossbar
    update_bar("kr:timer", game.timer)
    update_bar_color("kr:timer", game.timer * 100 / GAME_SECS)

    // Actionbar with time remaining
    let mins: int = game.timer / 60
    let secs: int = game.timer % 60
    actionbar(@a, f"⏱ {mins}m {secs}s remaining — get kills!")

    if (game.timer <= 10) {
        // Warning sound region
        actionbar(@a, f"⚠ FINAL {game.timer} SECONDS!")
    }

    if (game.timer <= 0) {
        end_game()
    }
}

// ─── Kill tracking ────────────────────────────────────────────────────────────

// Every tick: check for players who got kills during PLAYING phase
@tick(rate=20)
fn check_kill_streaks() {
    if (game.phase != PHASE_PLAYING) {
        return
    }

    foreach (p in @a) {
        let kills: int = scoreboard_get(p, "kr_kills")
        let streak: int = scoreboard_get(p, "kr_streak")

        // Reward kill streaks
        if (kills > 0) {
            if (kills % 5 == 0) {
                // Every 5 kills: speed boost
                speed(p, 5, 1)
                tell(p, "Kill streak! Speed boost!")
            }
            if (kills % 10 == 0) {
                // Every 10 kills: strength
                strength(p, 10, 0)
                tell(p, "10-kill streak! Strength boost!")
                // Random bonus loot
                drop_bonus_loot(p)
            }
        }
    }
}

fn drop_bonus_loot(p: selector) {
    let seed: int = scoreboard_get("#seed", "kr_seed")
    seed = next_lcg(seed)
    scoreboard_set("#seed", "kr_seed", seed)

    let roll: int = random_range(seed, 0, 3)
    if (roll == 0) {
        give(p, "minecraft:golden_apple", 1)
        tell(p, "Bonus: Golden Apple!")
    } else {
        if (roll == 1) {
            give(p, "minecraft:arrow", 16)
            tell(p, "Bonus: 16 Arrows!")
        } else {
            give(p, "minecraft:cooked_beef", 8)
            tell(p, "Bonus: 8 Steaks!")
        }
    }
}

// ─── Triggers ────────────────────────────────────────────────────────────────

@on_trigger("join_game")
fn join_game() {
    if (game.phase == PHASE_PLAYING) {
        tell(@s, "A game is already in progress!")
        return
    }

    tag_add(@s, "kr_joined")
    tell(@s, "You joined Kill Race! Wait for the game to start.")
    announce("A player joined Kill Race! /trigger join_game to join!")
}

@on_trigger("start_game")
fn start_game() {
    if (game.active == 1) {
        tell(@s, "A game is already running!")
        return
    }

    let joined: int = 0
    foreach (p in @a[tag=kr_joined]) {
        joined = joined + 1
    }
    if (joined < 1) {
        tell(@s, "At least 1 player must join first!")
        return
    }

    game.active = 1
    game.phase = PHASE_COUNTDOWN
    game.timer = COUNTDOWN_SECS

    // Reset kill counts
    foreach (p in @a[tag=kr_joined]) {
        scoreboard_set(p, "kr_kills", 0)
        scoreboard_set(p, "kr_streak", 0)
        clear(p)
        give(p, "minecraft:iron_sword", 1)
        give(p, "minecraft:bow", 1)
        give(p, "minecraft:arrow", 32)
        give(p, "minecraft:cooked_beef", 8)
    }

    say("Kill Race countdown started!")
    title(@a, "Kill Race")
    subtitle(@a, "Get the most kills in 3 minutes!")
}

fn begin_game() {
    game.phase = PHASE_PLAYING
    game.timer = GAME_SECS

    // Create timer bossbar
    create_timer_bar("kr:timer", "Kill Race", GAME_SECS)

    title(@a, "FIGHT!")
    subtitle(@a, "Kill Race — 3 minutes")
    say("Kill Race has begun!")

    // Set gamemode to survival
    foreach (p in @a[tag=kr_joined]) {
        effect(p, "minecraft:speed", 3, 1)
    }
}

fn end_game() {
    game.phase = PHASE_ENDED
    game.active = 0

    hide_bar("kr:timer")
    say("Kill Race ended!")

    // Find winner
    announce_winner()

    // Schedule cleanup in 10 seconds
    cleanup_game()
}

fn announce_winner() {
    let top_kills: int = 0

    // Find max kills
    foreach (p in @a[tag=kr_joined]) {
        let k: int = scoreboard_get(p, "kr_kills")
        if (k > top_kills) {
            top_kills = k
        }
    }

    if (top_kills == 0) {
        say("No kills scored! It's a draw.")
        title(@a, "Draw!")
        return
    }

    // Award winners (everyone tied at top)
    foreach (p in @a[tag=kr_joined]) {
        let k: int = scoreboard_get(p, "kr_kills")
        if (k == top_kills) {
            title(p, "You Win!")
            subtitle(p, f"Top score: {top_kills} kills!")
            buff_all(p, 60)
            give(p, "minecraft:diamond", top_kills)
            tell(p, f"Winner's prize: {top_kills} diamonds!")
        } else {
            title(p, "Game Over")
            subtitle(p, f"Your kills: {k}")
        }
    }

    announce(f"Kill Race winner had {top_kills} kills!")
}

@schedule(200)
fn cleanup_game() {
    // Remove tags
    foreach (p in @a[tag=kr_joined]) {
        tag_remove(p, "kr_joined")
        effect_clear(p)
    }

    // Reset phase
    game.phase = PHASE_LOBBY
    game.active = 0

    // Remove bossbar
    remove_bar("kr:timer")

    say("Kill Race lobby reset. /trigger join_game to play again!")
}
```

## Step-by-Step Walkthrough

### Step 1 — Imports and Constants

```mcrs
import "stdlib/effects.mcrs"
import "stdlib/bossbar.mcrs"
import "stdlib/teams.mcrs"
import "stdlib/random.mcrs"
```

This game uses **four stdlib modules**:

| Module | Used for |
|--------|----------|
| `effects` | `speed()`, `strength()`, `effect_clear()` |
| `bossbar` | `create_timer_bar()`, `update_bar()`, `hide_bar()`, `remove_bar()` |
| `teams` | team setup helpers |
| `random` | `next_lcg()`, `random_range()` for loot |

The phase constants give names to raw integers, making the state machine readable:

```mcrs
let PHASE_LOBBY: int = 0
let PHASE_COUNTDOWN: int = 1
let PHASE_PLAYING: int = 2
let PHASE_ENDED: int = 3
```

### Step 2 — Game State Struct

```mcrs
struct GameState {
    phase: int,
    timer: int,
    active: int
}

let game: GameState = { phase: 0, timer: 0, active: 0 }
```

A single `GameState` struct holds all mutable game state. Storing it in one struct rather than three separate globals keeps the code organized and avoids name collisions in other namespaces. `active` is a flag (`0`/`1`) that lets `@tick` handlers bail out early when no game is running.

### Step 3 — @load Setup

```mcrs
@load
fn setup() {
    scoreboard_add_objective("kr_kills", "playerKillCount")
    scoreboard_add_objective("kr_streak", "dummy")
    scoreboard_add_objective("kr_seed", "dummy")
    scoreboard_display("sidebar", "kr_kills")
    scoreboard_set("#seed", "kr_seed", 123456789)
    say("Kill Race loaded! /trigger join_game  /trigger start_game")
}
```

`@load` runs once when the datapack loads. Notice:
- `playerKillCount` is a **Minecraft criteria** — the score increments automatically each time a player kills another player. No manual tracking needed.
- `kr_seed` stores a running LCG seed for deterministic randomness.
- `#seed` uses a **fake player** (the `#` convention) to hold server-side data that doesn't appear in the sidebar.

### Step 4 — The 1-Second Tick

```mcrs
@tick(rate=20)
fn game_timer() {
    if (game.active == 0) { return }
    if (game.phase == PHASE_COUNTDOWN) {
        countdown_tick()
    } else {
        if (game.phase == PHASE_PLAYING) {
            playing_tick()
        }
    }
}
```

`@tick(rate=20)` fires every 20 game ticks = once per real second. The early return on `active == 0` means this function does almost nothing when idle — important for server performance.

**`countdown_tick`** decrements the timer and shows an actionbar message. When it hits zero, it calls `begin_game()`.

**`playing_tick`** does more:
1. Decrements the timer
2. Calls `update_bar` to move the bossbar progress
3. Computes `mins`/`secs` from integer division for a formatted display
4. Shows an urgent warning in the final 10 seconds
5. Calls `end_game()` when time runs out

### Step 5 — Kill Streak Rewards

```mcrs
@tick(rate=20)
fn check_kill_streaks() {
    if (game.phase != PHASE_PLAYING) { return }

    foreach (p in @a) {
        let kills: int = scoreboard_get(p, "kr_kills")
        if (kills > 0) {
            if (kills % 5 == 0) {
                speed(p, 5, 1)
                tell(p, "Kill streak! Speed boost!")
            }
            if (kills % 10 == 0) {
                strength(p, 10, 0)
                tell(p, "10-kill streak! Strength boost!")
                drop_bonus_loot(p)
            }
        }
    }
}
```

Every second during the playing phase, we loop all players and check their kill score. The `%` (modulo) operator lets us trigger milestones cleanly: every 5th kill grants Speed II, every 10th adds Strength and random loot.

### Step 6 — LCG Random Loot

```mcrs
fn drop_bonus_loot(p: selector) {
    let seed: int = scoreboard_get("#seed", "kr_seed")
    seed = next_lcg(seed)
    scoreboard_set("#seed", "kr_seed", seed)

    let roll: int = random_range(seed, 0, 3)
    if (roll == 0) { give(p, "minecraft:golden_apple", 1) }
    else { if (roll == 1) { give(p, "minecraft:arrow", 16) }
    else { give(p, "minecraft:cooked_beef", 8) } }
}
```

Because Minecraft datapacks can't call true system random, we maintain a **Linear Congruential Generator (LCG)** seed in a scoreboard. `next_lcg` advances the seed, `random_range(seed, 0, 3)` maps it to `[0, 2]` inclusive — three possible loot outcomes.

This is the same technique covered in Tutorial 07 — here we see it embedded in a real game context.

### Step 7 — Player Triggers

```mcrs
@on_trigger("join_game")
fn join_game() { ... }

@on_trigger("start_game")
fn start_game() { ... }
```

`@on_trigger` listens for `/trigger <name>` commands from players. This is the standard self-service UX for mini-games: no operator commands required.

`join_game` tags the calling player with `kr_joined`, which all subsequent loops use to filter participants.

`start_game` checks that at least one player has joined, then:
- Sets `game.active = 1` and `game.phase = PHASE_COUNTDOWN`
- Resets everyone's kills/streak to 0
- Clears inventories and gives a standard loadout
- Shows title/subtitle to all players

### Step 8 — Phase Transitions

```
LOBBY ──(start_game trigger)──▶ COUNTDOWN ──(timer=0)──▶ PLAYING ──(timer=0)──▶ ENDED
                                                                                    │
                                 ◀──────────────────(@schedule 200t cleanup)────────┘
```

| Transition | Trigger |
|-----------|---------|
| Lobby → Countdown | Player runs `/trigger start_game` |
| Countdown → Playing | `begin_game()` called when timer reaches 0 |
| Playing → Ended | `end_game()` called when timer reaches 0 |
| Ended → Lobby | `cleanup_game()` runs after 200 ticks (10 seconds) |

`begin_game()` creates the bossbar and grants an initial Speed burst to all joined players.

`end_game()` hides the bossbar, announces the winner, and schedules cleanup:

```mcrs
@schedule(200)
fn cleanup_game() { ... }
```

`@schedule(200)` means the function body runs **200 ticks (10 seconds) later**. This gives players time to see their results before everything resets.

### Step 9 — Winner Announcement

```mcrs
fn announce_winner() {
    let top_kills: int = 0

    foreach (p in @a[tag=kr_joined]) {
        let k: int = scoreboard_get(p, "kr_kills")
        if (k > top_kills) { top_kills = k }
    }

    if (top_kills == 0) {
        say("No kills scored! It's a draw.")
        title(@a, "Draw!")
        return
    }

    foreach (p in @a[tag=kr_joined]) {
        let k: int = scoreboard_get(p, "kr_kills")
        if (k == top_kills) {
            title(p, "You Win!")
            give(p, "minecraft:diamond", top_kills)
        } else {
            title(p, "Game Over")
        }
    }
}
```

Two passes over joined players: first to find `top_kills`, then to reward everyone at that score. This handles **ties** correctly — multiple winners each receive their diamonds.

## Concepts Recap

| Concept | Where used |
|--------|-----------|
| `struct` | `GameState` for all mutable game data |
| `@load` | One-time scoreboard initialization |
| `@tick(rate=20)` | Per-second game loop |
| `@on_trigger` | Self-service join/start commands |
| `@schedule` | Delayed post-game cleanup |
| `foreach` + selector filtering | Iterating only joined players |
| Modulo `%` | Kill streak milestones |
| LCG random | Deterministic loot drops |
| Bossbar stdlib | Live countdown UI |
| Effects stdlib | Speed/Strength buffs |

## Try It

1. Compile and install the datapack
2. Run `/trigger join_game` with at least one player
3. Run `/trigger start_game` to begin the countdown
4. Kill other players (or use `/kill @r` in creative to test scoring)
5. Watch the bossbar count down and streaks fire at 5/10 kills
6. Wait for the 3-minute timer to expire and see the winner screen

## Exercises

1. **Add teams**: Use the `teams` module to split players into Red vs Blue and track team kills separately.
2. **Spawn mobs**: Use `@schedule` to spawn mobs periodically for extra chaos.
3. **Power-up drops**: Instead of giving items directly, spawn item entities at the player's location.
4. **Configurable duration**: Make `GAME_SECS` a trigger-controlled value so ops can set game length.
5. **Leaderboard**: After the game, use `title`/`subtitle` to cycle through all players' scores.
