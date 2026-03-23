# Tutorial 02: Variables & Control Flow

<div class="tutorial-meta">
  <span class="difficulty beginner">🟢 Beginner</span>
  <span class="time">⏱️ 15 min</span>
</div>


**Difficulty:** Beginner  
**Time:** ~20 minutes  
**Prerequisites:** [Tutorial 01: Hello World](./01-hello-world)

## What You'll Build

A server vote system: players vote YES or NO, and when the host calls the tally, the winning side is announced with a title screen and percentage breakdown.

## What You'll Learn

- All basic types: `int`, `bool`, `fixed`, `string`
- `let` declarations
- `if / else` branching
- `while` loops
- `foreach` over selectors
- Why `fixed` uses a ×10000 scale

## Step 1: Variable Types

```rs
// int: whole numbers, stored in a scoreboard
let count: int = 42
let negative: int = -7

// bool: true or false
let is_active: bool = true
let has_voted: bool = false

// fixed: decimal numbers stored as integer × 10000
// 1.5  → stored as 15000
// 0.75 → stored as 7500
// Requires explicit cast when assigning from an int literal:
let percentage: fixed = 7500 as fixed   // represents 75.00%
let half: fixed = 5000 as fixed         // represents 0.5

// string: text labels
let winner: string = "yes"
```

**Why ×10000?** Minecraft scoreboards only store integers. RedScript uses a fixed-point convention where the "real" value = stored integer ÷ 10000. This gives 4 decimal places of precision without any floating-point hardware.

## Step 2: The Vote System Setup

```rs
@load
fn setup() {
    scoreboard_add_objective("votes_yes", "dummy")
    scoreboard_add_objective("votes_no", "dummy")
    scoreboard_add_objective("vote_cast", "dummy")
    say("Vote system ready! /trigger vote_yes  or  /trigger vote_no")
}
```

## Step 3: Cast a Vote (if/else)

```rs
@on_trigger("vote_yes")
fn cast_yes() {
    // Check if player already voted
    let already_voted: int = scoreboard_get(@s, "vote_cast")
    if (already_voted == 1) {
        tell(@s, "You already voted!")
        return
    }

    scoreboard_set(@s, "vote_cast", 1)
    let yes_count: int = scoreboard_get("#total", "votes_yes")
    yes_count = yes_count + 1
    scoreboard_set("#total", "votes_yes", yes_count)

    tell(@s, "You voted YES!")
    announce("A player voted YES")
}
```

The `return` statement exits the function early — great for guard clauses.

## Step 4: Announce Results

```rs
@on_trigger("tally_votes")
fn tally() {
    let yes_count: int = scoreboard_get("#total", "votes_yes")
    let no_count: int = scoreboard_get("#total", "votes_no")
    let total: int = yes_count + no_count

    if (total == 0) {
        say("No votes cast yet!")
        return
    }

    // Nested if/else for 3 outcomes
    if (yes_count > no_count) {
        title(@a, "YES wins!")
    } else {
        if (no_count > yes_count) {
            title(@a, "NO wins!")
        } else {
            title(@a, "It's a tie!")
        }
    }

    // Fixed-point percentage: multiply before dividing to keep precision
    let yes_pct: fixed = (yes_count * 10000 / total) as fixed
    announce(f"YES percentage (×10000): {yes_pct}")
}
```

## Step 5: Reset with foreach

`foreach` iterates over all entities matching a selector:

```rs
@on_trigger("reset_votes")
fn reset_votes() {
    scoreboard_set("#total", "votes_yes", 0)
    scoreboard_set("#total", "votes_no", 0)

    // Reset the vote_cast flag for every player
    foreach (p in @a) {
        scoreboard_set(p, "vote_cast", 0)
    }
    say("Votes reset! Everyone can vote again.")
}
```

## Step 6: While Loop

```rs
@on_trigger("count_down")
fn count_down() {
    let i: int = 5
    while (i > 0) {
        tell(@s, f"Countdown: {i}")
        i = i - 1
    }
    tell(@s, "Done!")
}
```

## Complete Code

Full example: [tutorial_02_variables.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_02_variables.mcrs)

## Try It Out

1. Compile and install the datapack
2. Multiple players run `/trigger vote_yes` or `/trigger vote_no`
3. Host runs `/trigger tally_votes` — winner announced
4. Run `/trigger reset_votes` to play again
5. Try `/trigger count_down` to see the while loop in action

## Type Quick Reference

| Type | Example | Notes |
|------|---------|-------|
| `int` | `let x: int = 42` | Integer, scoreboard-backed |
| `bool` | `let b: bool = true` | Boolean |
| `fixed` | `let f: fixed = 5000 as fixed` | Decimal ×10000, needs `as fixed` cast |
| `string` | `let s: string = "hello"` | Text |

## Next Steps

→ [Tutorial 03: Functions & Structs](./03-functions-structs)
