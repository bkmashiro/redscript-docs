# Lambda Expressions

Lambdas are inline, anonymous functions.

## Syntax

```rs
(parameters) => expression
```

Simple example:

```rs
let double = (x: int) => x * 2;
```

Multi-line lambdas use braces:

```rs
let greet = (name: string) => {
    say("Hello, ${name}!");
    say("Welcome to the server!");
};
```

## Higher-Order Functions

Functions that take other functions as parameters:

```rs
fn apply_to_all(targets: selector, action: (selector) => void) {
    action(targets);
}

apply_to_all(@a, (s: selector) => {
    effect(s, "speed", 10, 2);
});
```

### for_each

Apply a lambda to a collection:

```rs
let teams: string[] = ["red", "blue", "green"];

for_each(teams, (team: string) => {
    team_add(team);
    say("Created team: ${team}");
});
```

### map

Transform values:

```rs
let scores: int[] = [10, 20, 30];
let doubled: int[] = map(scores, (x: int) => x * 2);
// [20, 40, 60]
```

### filter

Select matching values:

```rs
let scores: int[] = [5, 15, 25, 35];
let high: int[] = filter(scores, (x: int) => x > 20);
// [25, 35]
```

## Closures

Lambdas capture variables from their surrounding scope:

```rs
let bonus: int = 10;

let add_bonus = (score: int) => score + bonus;

add_bonus(5);  // 15
add_bonus(20); // 30
```

More practical example:

```rs
fn create_reward(base_xp: int) {
    let give_reward = (player: selector) => {
        xp_add(player, base_xp);
        say("Rewarded ${base_xp} XP!");
    };

    give_reward(@a[tag=winner]);
}
```

## Practical Example

Using lambdas for a configurable event system:

```rs
let on_game_start: () => void = () => {
    say("Game started!");
    effect(@a, "speed", 30, 1);
};

let on_game_end: () => void = () => {
    say("Game over!");
    clear(@a);
};

fn trigger_event(handler: () => void) {
    handler();
}

@load
fn init() {
    trigger_event(on_game_start);
}
```

## Next Steps

- [NBT Data](/en/guide/nbt) — Work with Minecraft NBT
- [Selectors](/en/guide/selectors) — Target entities
