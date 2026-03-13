# Functions

## Basic Functions

Define functions with `fn`:

```rs
fn greet() {
    say("Hello, world!");
}
```

Call a function by name:

```rs
greet();
```

## Parameters

Functions can take parameters with type annotations:

```rs
fn heal(target: selector, amount: int) {
    effect(target, "instant_health", amount, 1);
    say("Healed!");
}

heal(@a, 2);
```

## Return Types

Specify return types with `->`:

```rs
fn double(x: int) -> int {
    return x * 2;
}

let result: int = double(5); // 10
```

## Default Arguments

Parameters can have default values:

```rs
fn spawn_mob(mob: string, count: int = 1) {
    repeat(count) {
        summon(mob);
    }
}

spawn_mob("zombie");       // spawns 1 zombie
spawn_mob("skeleton", 5);  // spawns 5 skeletons
```

## Multiple Parameters

```rs
fn setup_team(team_name: string, color: string, friendly_fire: bool = false) {
    team_add(team_name);
    team_modify(team_name, "color", color);
    if (!friendly_fire) {
        team_modify(team_name, "friendlyFire", "false");
    }
}

setup_team("red", "red");
setup_team("blue", "blue", true);
```

## Calling Functions

Functions compile to `.mcfunction` files. They can be called:

- From other functions
- Automatically via decorators like `@tick` and `@load`
- As command targets in-game via `/function namespace:function_name`

```rs
@load
fn init() {
    setup_team("red", "red");
    setup_team("blue", "blue");
    say("Teams ready!");
}
```

## Range Loops

Use `for i in start..end` to loop over a range of integers. The upper bound can be a variable:

```rs
fn give_reward(player: selector, count: int) {
    for i in 0..count {
        give(player, "diamond", 1);
    }
}

give_reward(@s, 5);   // gives 5 diamonds
```

Both bounds can be variables:

```rs
let start: int = 1;
let end: int = 10;
for i in start..end {
    say("${i}");
}
```

The range is **exclusive** on the upper end (`0..5` iterates 0, 1, 2, 3, 4).

## Declare-Only Functions

Use `declare fn` to declare a function signature without a body. This is used in declaration files (e.g. `builtins.d.mcrs`) to describe built-in functions for the type checker:

```rs
// builtins.d.mcrs
declare fn say(msg: string);
declare fn give(target: selector, item: string, count: int);
declare fn effect(target: selector, effect: string, duration: int, amplifier: int);
```

`declare fn` stubs are never compiled to `.mcfunction` files — they exist only for type checking and IDE support.

## Next Steps

- [Decorators](/en/guide/decorators) — Trigger functions automatically
- [Lambdas](/en/guide/lambdas) — Inline function expressions
