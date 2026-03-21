# Tutorial 04: Functions

**Difficulty:** Beginner  
**Time:** ~25 minutes  
**Prerequisites:** [Tutorial 03](./03-control-flow)

## Goal

Move repeated logic into reusable functions and learn how parameters, return values, and recursion fit together.

## Declaring a Function

```rs
fn greet() {
    say("Hello!")
}
```

Call it by name:

```rs
greet()
```

## Parameters

Parameters let you reuse the same logic with different inputs.

```rs
fn reward(target: selector, amount: int) {
    give(target, "minecraft:emerald", amount)
}

reward(@s, 3)
```

## Return Values

Use `->` to declare the return type:

```rs
fn double_it(x: int) -> int {
    return x * 2
}

let result: int = double_it(6)
```

A return value is useful when the function computes data instead of directly sending commands.

## Multiple Parameters

```rs
fn announce_round(round: int, total: int) {
    say(f"Round {round} / {total}")
}
```

Keep parameters focused. When a function starts needing too many loosely related values, consider a `struct` instead.

## Recursion

Recursion means a function calls itself.

```rs
fn countdown(n: int) {
    if (n <= 0) {
        say("Go!")
        return
    }

    say(f"{n}")
    countdown(n - 1)
}
```

This works because each call moves toward a base case: `n <= 0`.

Without a base case, recursion never stops.

## Small Utility Functions

```rs
fn is_final_round(round: int, max_rounds: int) -> bool {
    return round == max_rounds
}

fn average(total: int, players: int) -> double {
    return total as double / players as double
}
```

These are good examples of pure helper functions:

- clear inputs
- one job
- predictable output

## A Practical Example

```rs
namespace tutorial04

const MAX_ROUNDS: int = 3
let current_round: int = 1

fn next_round(round: int) -> int {
    return round + 1
}

fn show_round(round: int) {
    title(@a, f"Round {round}")
}

fn is_last_round(round: int) -> bool {
    return round == MAX_ROUNDS
}

fn countdown(n: int) {
    if (n <= 0) {
        say("Fight!")
        return
    }

    say(f"{n}")
    countdown(n - 1)
}

@on_trigger("advance")
fn advance() {
    show_round(current_round)
    countdown(3)

    if (is_last_round(current_round)) {
        say("This is the last round.")
    }

    current_round = next_round(current_round)
}
```

## Good Function Design

- Prefer descriptive names.
- Keep side effects obvious.
- Return a value when the caller needs data.
- Use recursion carefully and always define a base case.

## Practice

1. Write `fn add(a: int, b: int) -> int`.
2. Write `fn alive_message(alive: bool) -> string`.
3. Write a recursive function that counts from `n` down to `0`.

Next: [Tutorial 05: Structs and Enums](./05-structs-and-enums)
