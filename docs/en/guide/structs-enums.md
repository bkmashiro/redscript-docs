# Structs & Enums

## Structs

Structs group related data together.

### Defining Structs

```rs
struct Player {
    name: string,
    score: int,
    alive: bool,
}
```

### Creating Struct Instances

Use struct literals:

```rs
let p: Player = Player {
    name: "Alex",
    score: 0,
    alive: true,
};
```

### Accessing Fields

```rs
say(p.name);          // Alex
p.score = p.score + 1;
```

### Structs in Functions

```rs
fn announce(p: Player) {
    say("${p.name} has ${p.score} points");
}

fn kill(p: Player) {
    p.alive = false;
    say("${p.name} was eliminated");
}
```

## Enums

Enums define a set of named values.

### Defining Enums

```rs
enum GameState {
    Waiting,
    Running,
    Ended,
}
```

### Using Enums

```rs
let state: GameState = GameState::Waiting;

fn start_game() {
    state = GameState::Running;
    say("Game started!");
}
```

### Match Expressions

Use `match` to handle different enum values:

```rs
fn tick_game() {
    match state {
        GameState::Waiting => {
            actionbar(@a, "Waiting for players...");
        },
        GameState::Running => {
            update_scoreboard();
        },
        GameState::Ended => {
            actionbar(@a, "Game over!");
        },
    }
}
```

### Enums with Values

Enums can carry associated data:

```rs
enum Team {
    Red,
    Blue,
    Spectator,
}

fn get_color(team: Team) -> string {
    match team {
        Team::Red => return "red",
        Team::Blue => return "blue",
        Team::Spectator => return "gray",
    }
}
```

## Practical Example

Combining structs and enums for a mini-game:

```rs
enum Role {
    Hunter,
    Runner,
}

struct GamePlayer {
    role: Role,
    catches: int,
}

let game_state: GameState = GameState::Waiting;

@tick(rate=20)
fn game_loop() {
    match game_state {
        GameState::Running => {
            check_catches();
            update_timer();
        },
        _ => {},
    }
}
```

## Next Steps

- [Lambdas](/en/guide/lambdas) — Inline function expressions
- [Syntax Reference](/en/reference/syntax) — Full syntax details
