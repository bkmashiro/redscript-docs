# Tutorial 03: Control Flow

**Difficulty:** Beginner  
**Time:** ~30 minutes  
**Prerequisites:** [Tutorial 02](./02-variables-and-types)

## Goal

Use conditions and loops to decide what runs and how often.

## `if` and `else`

The simplest branch:

```rs
if (score > 10) {
    say("High score!")
}
```

With an `else`:

```rs
if (lives > 0) {
    say("Still alive")
} else {
    say("Game over")
}
```

You can chain conditions:

```rs
if (wave == 1) {
    say("Warmup")
} else if (wave < 5) {
    say("Main phase")
} else {
    say("Final phase")
}
```

## `while`

`while` repeats until the condition becomes false.

```rs
let i: int = 0
while (i < 3) {
    say(f"Loop: {i}")
    i = i + 1
}
```

Use it when the stop condition depends on changing state.

## `for`

A range-based `for` is cleaner when you know the number of iterations:

```rs
for i in 0..5 {
    say(f"Round {i}")
}
```

The upper bound is exclusive, so `0..5` runs `0, 1, 2, 3, 4`.

## `break`

Exit the nearest loop immediately:

```rs
let i: int = 0
while (i < 10) {
    if (i == 4) {
        break
    }
    say(f"i = {i}")
    i = i + 1
}
```

## `continue`

Skip the rest of the current iteration:

```rs
for i in 0..6 {
    if (i == 2) {
        continue
    }
    say(f"Processed {i}")
}
```

## `match`

`match` is useful when a value can be one of several cases.

```rs
enum Phase { Lobby, Playing, Finished }

let phase: Phase = Phase::Lobby

fn show_phase() {
    match phase {
        Phase::Lobby => { say("Waiting for players") },
        Phase::Playing => { say("Match running") },
        Phase::Finished => { say("Results screen") },
    }
}
```

This reads better than a long chain of `if` statements when you are handling named states.

## Putting It Together

```rs
namespace tutorial03

enum GameState { Idle, CountingDown, Running }

let state: GameState = GameState::Idle
let timer: int = 5

@tick(rate=20)
fn game_loop() {
    match state {
        GameState::Idle => {
            actionbar(@a, "Waiting...")
        },
        GameState::CountingDown => {
            if (timer > 0) {
                title(@a, f"{timer}")
                timer = timer - 1
            } else {
                state = GameState::Running
                say("Go!")
            }
        },
        GameState::Running => {
            actionbar(@a, "Game is running")
        },
    }
}

@on_trigger("start")
fn start_game() {
    state = GameState::CountingDown
    timer = 5
}
```

This tutorial uses:

- `match` for the high-level mode
- `if` for the timer condition
- `@tick(rate=20)` to step once per second

## When to Use Which Form

- use `if` for one-off boolean decisions
- use `match` for named modes or enum cases
- use `for` for known iteration counts
- use `while` when the exit condition is dynamic

## Practice

1. Add a `Paused` state and handle it with `match`.
2. Write a `for` loop that gives a player 5 apples.
3. Write a `while` loop that counts down from 10 to 1.

Next: [Tutorial 04: Functions](./04-functions)
