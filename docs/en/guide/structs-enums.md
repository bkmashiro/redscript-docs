# Structs & Enums

Structs and enums are RedScript's main tools for naming game state. Use them to make scoreboard/NBT-heavy logic readable without hiding the fact that the compiler still emits datapack commands.

## Structs

Structs group related data together.

### Defining Structs

```rs verify-skip
struct PlayerState {
    score: int,
    alive: bool,
}
```

### Creating Struct Instances

Use struct literals. The type name is accepted, and in typed positions the shorter `{ ... }` form is also common in generated/stdlib code.

```rs verify-skip
let p: PlayerState = PlayerState {
    score: 0,
    alive: true,
};

let p2: PlayerState = {
    score: 10,
    alive: true,
};
```

### Accessing Fields

```rs verify-skip
say(f"Score: {p.score}");
p.score = p.score + 1;
```

### Structs in Functions

```rs verify-skip
fn announce(p: PlayerState) {
    say(f"Score: {p.score}");
}

fn mark_dead(p: PlayerState) -> PlayerState {
    return PlayerState { score: p.score, alive: false };
}
```

Structs are best for values that travel together: positions, scoreboard snapshots, timer config, or a mini-game state record.

## Enums

Enums define a named set of states. They are useful when an `int` would otherwise have undocumented magic values.

### Defining Enums

```rs verify-skip
enum GamePhase {
    Lobby,
    Starting,
    Running,
    Ended,
}
```

You can also assign explicit integer values:

```rs verify-skip
enum Rank {
    Bronze = 1,
    Silver = 2,
    Gold = 3,
    Diamond = 10,
}
```

### Using Enums

Use `Type::Variant` in guide code. Some older examples and tests may show `Type.Variant`; both are accepted, but `::` is the current style in the reference docs.

```rs verify-skip
let phase: GamePhase = GamePhase::Lobby;

fn start_game() {
    phase = GamePhase::Running;
    say("Game started!");
}
```

### Match Expressions

Use `match` to handle different enum values:

```rs verify-skip
fn tick_game() {
    match phase {
        GamePhase::Lobby => {
            actionbar(@a, "Waiting for players...");
        },
        GamePhase::Running => {
            update_scoreboard();
        },
        GamePhase::Ended => {
            actionbar(@a, "Game over!");
        },
        _ => {},
    }
}
```

Add `_` when you intentionally do not handle every variant in the guide example.

### Payload Variants

Enum variants can carry named fields. Construct them with `Type::Variant(field: value)` and bind the fields in `match` with `Type::Variant(name, ...)`.

```rs verify-skip
enum Reward {
    None,
    Coins(amount: int),
    Item(id: string, count: int),
}

fn describe_reward(reward: Reward) {
    match reward {
        Reward::Coins(amount) => {
            say(f"Coins: {amount}");
        },
        Reward::Item(id, count) => {
            say(f"Item: {id} x{count}");
        },
        Reward::None => {
            say("No reward");
        },
    }
}

let reward: Reward = Reward::Coins(amount: 25);
```

Payload enums are backed by generated scoreboard/NBT storage, so prefer them for clear state modeling rather than tiny hot-loop data structures.

## Practical Example

Combining structs and enums for a mini-game:

```rs verify-skip
enum Role {
    Hunter,
    Runner,
}

struct GamePlayer {
    role: Role,
    catches: int,
}

let game_phase: GamePhase = GamePhase::Lobby;

@throttle(ticks=20)
fn game_loop() {
    match game_phase {
        GamePhase::Running => {
            check_catches();
            update_timer();
        },
        _ => {},
    }
}
```

## Next Steps

- [Impl Blocks](/en/guide/impl-blocks) — Attach methods to custom types
- [Syntax Reference](/en/reference/syntax) — Full syntax details
