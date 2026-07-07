# Tutorial 02: Variables and Types

<div class="tutorial-meta">
  <span class="difficulty beginner">🟢 Beginner</span>
  <span class="time">⏱️ 20 min</span>
</div>


**Difficulty:** Beginner  
**Time:** ~25 minutes  
**Prerequisites:** [Tutorial 01](./01-getting-started)

## Goal

Learn how to store values with `let` and `const`, then work with the most important beginner-friendly types: `int`, `double`, `string`, and `bool`.

## `let` and `const`

Use `let` for mutable variables:

```rs
let score: int = 0
let running: bool = true
```

Use `const` for compile-time constants:

```rs
const MAX_ROUNDS: int = 5
const GREETING: string = "Welcome!"
```

The practical difference:

- `let` can change later
- `const` cannot change and must be a literal constant

## `int`

`int` is the default numeric type for counters, timers, rounds, health-like values, and scoreboard-oriented logic.

```rs
let lives: int = 3
let wave: int = 1

wave = wave + 1
```

Use `int` first unless you know you need fractional values or higher precision.

## `double`

`double` is useful when you need floating-point precision.

```rs
let gravity: double = 9.81
let launch_angle: double = 45.0 as double
```

RedScript does not do implicit numeric conversion. Cast intentionally:

```rs
let count: int = 5
let precise: double = count as double
```

If you only need whole numbers, stick with `int`. It is simpler and usually cheaper.

## `string`

Use `string` for names, messages, and IDs.

```rs
let player_name: string = "Alex"
let item_id: string = "minecraft:golden_apple"
```

For output, prefer f-strings:

```rs
let score: int = 12
say(f"Current score: {score}")
```

## `bool`

`bool` stores `true` or `false`.

```rs
let running: bool = false
let debug_mode: bool = true
```

Booleans work naturally in conditions:

```rs
if (debug_mode) {
    say("Debug mode is enabled")
}
```

## Type Inference

You do not always have to write the type if the initializer is obvious:

```rs
let coins = 10
let title = "Shop"
let enabled = true
```

For tutorials and early learning, explicit annotations are often clearer.

## Arrays, Selectors, and Optional Values

The first four scalar types are enough for simple scripts, but most real datapacks also use three container/boundary types.

### Arrays

Arrays hold repeated values of one type:

```rs
let rewards: int[] = [5, 10, 20]
let names: string[] = ["Lobby", "Arena", "Finale"]

let first_reward: int = rewards[0]
let reward_count: int = rewards.len
```

Use arrays when the set is small and known, or when you want to loop over a table of values later.

### Selectors

Selectors represent Minecraft entity targets such as all players, the current executor, or filtered entities:

```rs
let everyone: selector = @a
let self: selector = @s
let nearby_zombies: selector = @e[type=zombie,distance=..10]
```

They become most useful with `foreach` and execute context in later tutorials.

### `Option<T>`

Use `Option<T>` when a value may be absent:

```rs
let found_score: Option<int> = Some(42)
let missing_score: Option<int> = None
```

You will handle options with `if let Some(x) = value` in the control-flow tutorial.

## Small State Example

```rs
namespace tutorial02

const START_LIVES: int = 3

let lives: int = START_LIVES
let level_name: string = "Training Grounds"
let active: bool = false
let spawn_x: double = 12.5

@load
fn setup() {
    active = true
    say(f"Loaded {level_name}")
    say(f"Lives: {lives}")
}
```

This example shows a common pattern:

- constants for stable config
- mutable variables for game state
- strings for readable messages
- booleans for mode flags
- doubles for exact positions or calculations when needed

## Updating Variables

```rs
@on_trigger("lose_life")
fn lose_life() {
    if (lives > 0) {
        lives = lives - 1
        say(f"Lives left: {lives}")
    }
}
```

## Casting Between `int` and `double`

```rs
fn average(total: int, players: int) -> double {
    return total as double / players as double
}
```

The explicit casts matter. They tell the compiler exactly which arithmetic model you want.

## Full Example

```rs
namespace tutorial02

const START_LIVES: int = 3
const PACK_NAME: string = "Training Pack"

let lives: int = START_LIVES
let active: bool = false
let accuracy: double = 0.95

@load
fn setup() {
    active = true
    say(f"{PACK_NAME} loaded")
    say(f"Accuracy target: {accuracy}")
}

@on_trigger("status")
fn status() {
    tell(@s, f"Lives: {lives}")
    tell(@s, f"Active: {active}")
}

@on_trigger("lose_life")
fn lose_life() {
    if (lives > 0) {
        lives = lives - 1
        tell(@s, f"Lives left: {lives}")
    }
}
```

## Practice

1. Add a `const PACK_VERSION: string`.
2. Add a `double` for movement speed or radius.
3. Add a `bool` that toggles a debug message.

Next: [Tutorial 03: Control Flow](./03-control-flow)
