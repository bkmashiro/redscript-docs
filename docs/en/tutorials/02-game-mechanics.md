# Tutorial: Game Mechanics — Scoreboards, Teams & Events

**Difficulty:** Beginner  
**Time:** ~30 minutes  
**Prerequisites:** [Hello World](./01-hello-world)

## What You'll Build

A small **Kill Leaderboard** mini-game that:

- Tracks kills and deaths per player
- Shows a live sidebar scoreboard
- Uses teams to group players
- Fires custom events on death and kill streaks
- Resets stats on command

This is a realistic pattern you'll use in almost every competitive datapack.

---

## Step 1: Scoreboard Setup

First, declare all the scoreboards you'll need in `@load`.

```rs
namespace killboard

@load
fn init() {
    // Tracking objectives
    scoreboard_add_objective("kills",  "playerKillCount")  // auto-increments on PvP kills
    scoreboard_add_objective("deaths", "deathCount")       // auto-increments on death
    scoreboard_add_objective("streak", "dummy")            // manual kill-streak counter
    scoreboard_add_objective("kd",     "dummy")            // computed K/D ratio × 100

    // Show kills on the sidebar
    scoreboard_set_display("sidebar", "kills")

    say("Kill Leaderboard loaded. Get fragging!")
}
```

**Objective types:**

| Type | Behaviour |
|------|-----------|
| `"dummy"` | Never auto-increments; you control the value |
| `"playerKillCount"` | Automatically +1 when this player kills another player |
| `"deathCount"` | Automatically +1 when this player dies |
| `"totalKillCount"` | Counts all entity kills (mobs included) |

`scoreboard_set_display("sidebar", obj)` makes `obj` visible in the right-hand sidebar for all players.

---

## Step 2: Handling Player Deaths

Use `@on(PlayerDeath)` to run code every time a player dies.

```rs
@on(PlayerDeath)
fn on_death(player: Player) {
    // Reset their kill streak
    scoreboard_set(player, "streak", 0)

    // Notify them
    tell(player, "💀 You died! Streak reset.")

    // Update K/D ratio (kills * 100 / deaths, avoid divide by zero)
    let k: int = scoreboard_get(player, "kills")
    let d: int = scoreboard_get(player, "deaths")

    if (d > 0) {
        let kd: int = k * 100 / d
        scoreboard_set(player, "kd", kd)
        tell(player, f"K/D: {k}/{d} ({kd / 100}.{kd % 100})")
    }
}
```

**Why multiply by 100?**  
Minecraft scoreboards store only integers. Multiplying by 100 lets us represent two decimal places. A K/D of 2.50 is stored as `250`.

---

## Step 3: Tracking Kill Streaks

```rs
@on(PlayerDeath)
fn check_streak_on_death(victim: Player) {
    // Already handled above — this shows how multiple handlers work on the same event.
    // RedScript calls all @on(PlayerDeath) handlers in declaration order.
    announce_big_streak(victim)
}

fn announce_big_streak(player: Player) {
    let streak: int = scoreboard_get(player, "streak")

    if (streak >= 10) {
        say(f"💥 LEGENDARY! {player} had a {streak} kill streak!")
        // Play a sound for everyone
        playsound_all("minecraft:entity.lightning_bolt.thunder", "master", 1.0, 1.2)
    } else if (streak >= 5) {
        say(f"🔥 {player} is on a {streak} kill streak — RAMPAGE!")
    }
}
```

And update the streak when a kill happens:

```rs
@on(PlayerDeath)
fn increment_killer_streak(victim: Player) {
    // The killer is the last player who hit the victim
    // RedScript exposes them as the executing entity (@s) in a kill event context.
    // Use @a[scores={kills=1..}] to find players who just got a kill this tick.
}

// A cleaner approach: run a tick check for new kills
@tick(rate=1)
fn check_new_kills() {
    // For each player with kills > their tracked last value, increment streak
    for_each_player() {
        let kills:  int = scoreboard_get(@s, "kills")
        let streak: int = scoreboard_get(@s, "streak")

        // We stored "last known kills" in a separate objective
        let prev: int = scoreboard_get(@s, "prev_kills")

        if (kills > prev) {
            scoreboard_add(@s, "streak", kills - prev)
            scoreboard_set(@s, "prev_kills", kills)

            let new_streak: int = scoreboard_get(@s, "streak")
            if (new_streak >= 3) {
                tell(@s, f"🔥 Kill streak: {new_streak}!")
            }
        }
    }
}
```

Add `prev_kills` to your `@load`:

```rs
scoreboard_add_objective("prev_kills", "dummy")
```

---

## Step 4: Teams

Teams give players colored names and can enable/disable friendly fire.

```rs
@load
fn setup_teams() {
    // Create two teams
    team_add("red")
    team_add("blue")

    // Configure them
    team_set_friendly_fire("red",  false)
    team_set_friendly_fire("blue", false)
    team_set_color("red",  "red")
    team_set_color("blue", "aqua")

    team_set_prefix("red",  "[🔴 Red] ")
    team_set_prefix("blue", "[🔵 Blue] ")
}

// Assign players to teams when they join
@on(PlayerJoin)
fn assign_team(player: Player) {
    let red_count:  int = team_count("red")
    let blue_count: int = team_count("blue")

    if (red_count <= blue_count) {
        team_join(player, "red")
        tell(player, "You joined the 🔴 Red team!")
    } else {
        team_join(player, "blue")
        tell(player, "You joined the 🔵 Blue team!")
    }
}
```

---

## Step 5: A Reset Command

Give admins (or everyone, it's a demo) a way to wipe all stats.

```rs
@on_trigger("reset_stats")
fn reset_all_stats() {
    // Only run if the player is an op
    // (In a real datapack, check permissions here)
    scoreboard_reset_all("kills")
    scoreboard_reset_all("deaths")
    scoreboard_reset_all("streak")
    scoreboard_reset_all("kd")
    scoreboard_reset_all("prev_kills")

    say(f"📊 Stats reset by {at_s()}!")
    title(@a, "STATS RESET")
    subtitle(@a, "New round starting!")
}
```

---

## Complete Example

```rs
namespace killboard

// ─── Init ───────────────────────────────────────────────────

@load
fn init() {
    scoreboard_add_objective("kills",     "playerKillCount")
    scoreboard_add_objective("deaths",    "deathCount")
    scoreboard_add_objective("streak",    "dummy")
    scoreboard_add_objective("kd",        "dummy")
    scoreboard_add_objective("prev_kills","dummy")

    scoreboard_set_display("sidebar", "kills")

    team_add("red")
    team_add("blue")
    team_set_friendly_fire("red",  false)
    team_set_friendly_fire("blue", false)
    team_set_color("red",  "red")
    team_set_color("blue", "aqua")
    team_set_prefix("red",  "[🔴 Red] ")
    team_set_prefix("blue", "[🔵 Blue] ")

    say("Kill Leaderboard loaded!")
}

// ─── Events ─────────────────────────────────────────────────

@on(PlayerJoin)
fn assign_team(player: Player) {
    let red_count:  int = team_count("red")
    let blue_count: int = team_count("blue")

    if (red_count <= blue_count) {
        team_join(player, "red")
        tell(player, "You joined the 🔴 Red team!")
    } else {
        team_join(player, "blue")
        tell(player, "You joined the 🔵 Blue team!")
    }
}

@on(PlayerDeath)
fn on_death(player: Player) {
    let streak: int = scoreboard_get(player, "streak")
    if (streak >= 5) {
        say(f"🔥 {player} had a {streak} kill streak — ended!")
    }

    scoreboard_set(player, "streak", 0)
    tell(player, "💀 You died! Streak reset.")

    let k: int = scoreboard_get(player, "kills")
    let d: int = scoreboard_get(player, "deaths")
    if (d > 0) {
        scoreboard_set(player, "kd", k * 100 / d)
    }
}

// ─── Kill Streak Tracker ────────────────────────────────────

@tick(rate=1)
fn check_new_kills() {
    for_each_player() {
        let kills:  int = scoreboard_get(@s, "kills")
        let prev:   int = scoreboard_get(@s, "prev_kills")

        if (kills > prev) {
            scoreboard_add(@s, "streak", kills - prev)
            scoreboard_set(@s, "prev_kills", kills)

            let streak: int = scoreboard_get(@s, "streak")
            if (streak >= 3) {
                tell(@s, f"🔥 Kill streak: {streak}!")
            }
        }
    }
}

// ─── Reset ──────────────────────────────────────────────────

@on_trigger("reset_stats")
fn reset_all_stats() {
    scoreboard_reset_all("kills")
    scoreboard_reset_all("deaths")
    scoreboard_reset_all("streak")
    scoreboard_reset_all("kd")
    scoreboard_reset_all("prev_kills")

    say("📊 Stats have been reset!")
    title(@a, "STATS RESET")
    subtitle(@a, "New round starting!")
}
```

---

## Build and Test

```bash
redscript compile src/main.mcrs -O1 --stats
```

The `--stats` flag prints a short summary of what the optimizer removed. Expected output:

```
[redscript] compile ok  • 8 functions  • -O1
[redscript] dce         : 0 removed
[redscript] const-fold  : 3 expressions folded
```

---

## What's Next?

- [Tutorial 03: Optimization](./03-optimization) — squeeze every tick out of your datapack
- [Guide: Events](../guide/events) — full event reference
- [Guide: Structs & Enums](../guide/structs-enums) — model complex game state
