# Tutorial 10: Full Game — Kill Race

**Difficulty:** Advanced  
**Time:** ~45 minutes  
**Prerequisites:** All previous tutorials (01-09)

## What You'll Build

A complete, playable mini-game: **Kill Race**. Players compete to get the most kills in 3 minutes. The first to reach their `/trigger join_game`, the host starts with `/trigger start_game`, and a bossbar counts down the timer. Kill streaks grant bonus effects and loot drops. The top scorer wins diamonds.

## What You'll Learn

- Phase machine: LOBBY → COUNTDOWN → PLAYING → ENDED
- `@tick(rate=20)` for precise 1-second timing
- Bossbar for game timer
- Kill tracking with `playerKillCount` scoreboard
- Random loot drops on kill streak
- Effects for kill streak bonuses
- `@schedule` for delayed cleanup

## Architecture Overview

```
LOBBY
  ↓  /trigger start_game
COUNTDOWN (10 seconds)
  ↓  timer expires
PLAYING (3 minutes)
  ↓  timer expires
ENDED
  ↓  @schedule(200) → cleanup → LOBBY
```

## Step 1: Imports and Constants

```rs
import effects::*
import bossbar::*
import teams::*
import random::*

let PHASE_LOBBY: int = 0
let PHASE_COUNTDOWN: int = 1
let PHASE_PLAYING: int = 2
let PHASE_ENDED: int = 3

let COUNTDOWN_SECS: int = 10
let GAME_SECS: int = 180
```

## Step 2: Game State Struct

```rs
struct GameState {
    phase: int,
    timer: int,     // seconds remaining
    active: int
}

let game: GameState = {
    phase: 0,
    timer: 0,
    active: 0
}
```

## Step 3: Setup

```rs
@load
fn setup() {
    // playerKillCount automatically tracks kills!
    scoreboard_add_objective("kr_kills", "playerKillCount")
    scoreboard_add_objective("kr_streak", "dummy")
    scoreboard_add_objective("kr_seed", "dummy")
    scoreboard_display("sidebar", "kr_kills")
    scoreboard_set("#seed", "kr_seed", 123456789)
    say("Kill Race loaded! /trigger join_game  /trigger start_game")
}
```

Using `playerKillCount` as the criteria means Minecraft itself increments the score on every kill — no custom kill detection needed.

## Step 4: The 1-Second Timer

```rs
@tick(rate=20)
fn game_timer() {
    if (game.active == 0) { return }

    if (game.phase == PHASE_COUNTDOWN) {
        game.timer = game.timer - 1
        actionbar(@a, "Game starting in " + game.timer + "...")
        if (game.timer <= 0) { begin_game() }
    } else {
        if (game.phase == PHASE_PLAYING) {
            game.timer = game.timer - 1
            update_bar("kr:timer", game.timer)
            update_bar_color("kr:timer", game.timer * 100 / GAME_SECS)
            let mins: int = game.timer / 60
            let secs: int = game.timer % 60
            actionbar(@a, "⏱ " + mins + "m " + secs + "s — get kills!")
            if (game.timer <= 0) { end_game() }
        }
    }
}
```

## Step 5: Join and Start

```rs
@on_trigger("join_game")
fn join_game() {
    if (game.phase == PHASE_PLAYING) {
        tell(@s, "Game in progress!")
        return
    }
    tag_add(@s, "kr_joined")
    tell(@s, "Joined Kill Race! Wait for the host to start.")
    announce("A player joined! /trigger join_game to join!")
}

@on_trigger("start_game")
fn start_game() {
    if (game.active == 1) {
        tell(@s, "Already running!")
        return
    }

    game.active = 1
    game.phase = PHASE_COUNTDOWN
    game.timer = COUNTDOWN_SECS

    foreach (p in @a[tag=kr_joined]) {
        scoreboard_set(p, "kr_kills", 0)
        scoreboard_set(p, "kr_streak", 0)
        clear(p)
        give(p, "minecraft:iron_sword", 1)
        give(p, "minecraft:bow", 1)
        give(p, "minecraft:arrow", 32)
        give(p, "minecraft:cooked_beef", 8)
    }

    title(@a, "Kill Race")
    subtitle(@a, "Get the most kills in 3 minutes!")
}
```

## Step 6: Begin Playing

```rs
fn begin_game() {
    game.phase = PHASE_PLAYING
    game.timer = GAME_SECS
    create_timer_bar("kr:timer", "Kill Race", GAME_SECS)
    title(@a, "FIGHT!")
    say("Kill Race has begun!")
}
```

## Step 7: Kill Streak Bonuses

```rs
@tick(rate=20)
fn check_kill_streaks() {
    if (game.phase != PHASE_PLAYING) { return }

    foreach (p in @a) {
        let kills: int = scoreboard_get(p, "kr_kills")
        if (kills % 5 == 0) {
            if (kills > 0) {
                speed(p, 5, 1)
                tell(p, "Kill streak! Speed boost!")
            }
        }
        if (kills % 10 == 0) {
            if (kills > 0) {
                strength(p, 10, 0)
                tell(p, "10-kill streak! Strength!")
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
    if (roll == 0) { give(p, "minecraft:golden_apple", 1) }
    if (roll == 1) { give(p, "minecraft:arrow", 16) }
    if (roll == 2) { give(p, "minecraft:cooked_beef", 8) }
}
```

## Step 8: End Game and Winner

```rs
fn end_game() {
    game.phase = PHASE_ENDED
    game.active = 0
    hide_bar("kr:timer")
    announce_winner()
    cleanup_game()
}

fn announce_winner() {
    let top_kills: int = 0
    foreach (p in @a[tag=kr_joined]) {
        let k: int = scoreboard_get(p, "kr_kills")
        if (k > top_kills) { top_kills = k }
    }

    if (top_kills == 0) {
        title(@a, "Draw!")
        return
    }

    foreach (p in @a[tag=kr_joined]) {
        let k: int = scoreboard_get(p, "kr_kills")
        if (k == top_kills) {
            title(p, "You Win!")
            subtitle(p, "Top score: " + top_kills + " kills!")
            buff_all(p, 60)
            give(p, "minecraft:diamond", top_kills)
        } else {
            title(p, "Game Over")
            subtitle(p, "Your kills: " + k)
        }
    }
    announce("Winner had " + top_kills + " kills!")
}
```

## Step 9: Delayed Cleanup

```rs
// @schedule(200) = 10 seconds after called
@schedule(200)
fn cleanup_game() {
    foreach (p in @a[tag=kr_joined]) {
        tag_remove(p, "kr_joined")
        effect_clear(p)
    }
    game.phase = PHASE_LOBBY
    game.active = 0
    remove_bar("kr:timer")
    say("Kill Race lobby reset. /trigger join_game to play again!")
}
```

## Complete Code

Full example: [tutorial_10_kill_race.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_10_kill_race.mcrs)

## Try It Out

1. Install and `/reload`
2. All players run `/trigger join_game`
3. Host runs `/trigger start_game`
4. 10-second countdown, then FIGHT for 3 minutes
5. Kill enemies — watch the sidebar kill counts
6. Hit streak milestones (5, 10 kills) for buffs and loot
7. Timer hits zero — winner announced, diamonds rewarded
8. 10 seconds later, lobby resets automatically

## What's Next?

You've covered the entire RedScript language! From here you can:

- Add more mini-games (CTF, Parkour Race, Zombie Survival)
- Create custom UI with bossbar + actionbar combinations
- Use coroutines for region-generation games
- Explore the full [Standard Library reference](../stdlib/)
- Read the [Language Reference](../reference/syntax) for edge cases
