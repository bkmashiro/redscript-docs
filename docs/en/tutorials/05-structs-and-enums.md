# Tutorial 05: Structs and Enums

**Difficulty:** Beginner  
**Time:** ~35 minutes  
**Prerequisites:** [Tutorial 04](./04-functions)

## Goal

Model gameplay state with `struct` and `enum`, then organize behavior with `match` and `impl`.

## `struct`

A `struct` groups related fields into one named type.

```rs
struct PlayerStats {
    name: string,
    kills: int,
    alive: bool,
}
```

Create a value:

```rs
let stats: PlayerStats = {
    name: "Alex",
    kills: 0,
    alive: true
}
```

Access fields with dot syntax:

```rs
stats.kills = stats.kills + 1
```

## `enum`

An `enum` describes a value that can be one of several named variants.

```rs
enum MatchState {
    Lobby,
    Countdown,
    Running,
    Finished,
}
```

This is better than encoding modes as raw integers.

## `match`

`match` is the natural way to handle enum variants:

```rs
fn show_state(state: MatchState) {
    match state {
        MatchState::Lobby => { say("In lobby") },
        MatchState::Countdown => { say("Starting soon") },
        MatchState::Running => { say("Match live") },
        MatchState::Finished => { say("Match ended") },
    }
}
```

## `impl` Methods

Use `impl` to attach methods to a struct.

```rs
struct Counter {
    value: int,
}

impl Counter {
    fn increment(self) {
        self.value = self.value + 1
    }

    fn reset(self) {
        self.value = 0
    }
}
```

Methods make related logic easier to discover and keep together.

## Full Example

```rs
namespace tutorial05

enum MatchState {
    Lobby,
    Countdown,
    Running,
    Finished,
}

struct Game {
    round: int,
    max_rounds: int,
    active: bool,
    state: MatchState,
}

impl Game {
    fn start(self) {
        self.active = true
        self.state = MatchState::Countdown
    }

    fn next_round(self) {
        self.round = self.round + 1
        if (self.round > self.max_rounds) {
            self.state = MatchState::Finished
            self.active = false
        }
    }

    fn summary(self) -> string {
        return f"Round {self.round}/{self.max_rounds}, active={self.active}"
    }
}

let game: Game = {
    round: 1,
    max_rounds: 3,
    active: false,
    state: MatchState::Lobby
}

@on_trigger("start_match")
fn start_match() {
    game.start()
    say("Match is starting")
}

@tick(rate=20)
fn tick_game() {
    match game.state {
        MatchState::Lobby => {
            actionbar(@a, "Lobby")
        },
        MatchState::Countdown => {
            title(@a, "3...")
            game.state = MatchState::Running
        },
        MatchState::Running => {
            actionbar(@a, game.summary())
        },
        MatchState::Finished => {
            actionbar(@a, "Finished")
        },
    }
}
```

## Why This Matters

- `struct` keeps related fields together
- `enum` gives names to valid states
- `match` makes state handling explicit
- `impl` keeps data and behavior close

## Practice

1. Add a `wins: int` field to `Game`.
2. Add a new enum state such as `Paused`.
3. Add an `impl` method that resets the game back to `Lobby`.

Next: [Tutorial 06: Stdlib Tour](./06-stdlib-tour)
