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

## Next Steps

- [Decorators](/en/guide/decorators) — Trigger functions automatically
- [Lambdas](/en/guide/lambdas) — Inline function expressions
