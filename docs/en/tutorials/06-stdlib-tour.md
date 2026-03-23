# Tutorial 06: Stdlib Tour

<div class="tutorial-meta">
  <span class="difficulty beginner">🟢 Beginner</span>
  <span class="time">⏱️ 15 min</span>
</div>


**Difficulty:** Beginner to Intermediate  
**Time:** ~30 minutes  
**Prerequisites:** [Tutorial 05](./05-structs-and-enums)

## Goal

Build a mental map of the standard library so you know where to look before writing helpers yourself.

## Import Basics

Stdlib modules are imported at the top of the file:

```rs
import math::*
import random::*
import particles::*
```

If you call a stdlib function without importing its module first, the compiler will report an error.

## `math`

Use `stdlib/math` for fixed-point helpers and common numeric utilities.

Typical use cases:

- clamping values
- multiplying fixed-point numbers with `mulfix`
- simple numeric helpers for gameplay logic

```rs
import math::*

fn scale_damage(base: fixed, multiplier: fixed) -> fixed {
    return mulfix(base, multiplier)
}
```

## `math_hp`

Use `stdlib/math_hp` when `double` precision matters.

Typical use cases:

- high-precision trig
- logs and scientific-style calculations
- modules that depend on `double` APIs

```rs
import math_hp::*
```

Reach for it only when `int` or simpler fixed-point math is not enough.

## `random`

Use `stdlib/random` for procedural variation.

Typical use cases:

- random loot
- random spawn choice
- light unpredictability in events

```rs
import random::*
```

## `particles`

Use `stdlib/particles` when you want visible feedback.

Typical use cases:

- ring or trail effects
- telegraphing abilities
- reward feedback

```rs
import particles::*
```

## `timer`

Use `stdlib/timer` for countdowns and stopwatch-like behavior.

Typical use cases:

- round timers
- cooldowns
- timed objectives

```rs
import timer::*
```

## `state`

Use `stdlib/state` when you want reusable gameplay state helpers rather than building every scoreboard pattern by hand.

Typical use cases:

- state machines
- named transitions
- organizing persistent datapack state

## `teams`, `bossbar`, `effects`, `inventory`

These are practical modules for Minecraft-facing systems:

- `teams` for team management
- `bossbar` for UI bars
- `effects` for potion-like effects
- `inventory` for item-related helpers

## A Small Combined Example

```rs
namespace tutorial06

import math::*
import random::*
import particles::*

let bonus_multiplier: fixed = 1.5

@on_trigger("loot")
fn loot() {
    let roll: int = rand_range(1, 100)

    if (roll <= 10) {
        give(@s, "minecraft:diamond", 1)
    } else {
        give(@s, "minecraft:iron_ingot", 4)
    }

    tell(@s, f"Adjusted score preview: {mulfix(10.0, bonus_multiplier)}")
}
```

The important lesson is not the exact API surface. It is knowing that:

- math-like work usually belongs in a math module
- gameplay utilities are often already in stdlib
- imports make dependencies explicit

## How to Explore Efficiently

1. Start at [Standard Library Overview](/en/stdlib/).
2. Open the module page you think you need.
3. Copy a small example first.
4. Only write your own helper if the stdlib does not already cover the pattern.

## Practice

1. Open `/en/stdlib/` and pick one module you have not used before.
2. Add an import and call one function from it.
3. Remove unused imports after experimenting.

Next: [Tutorial 07: Events and Ticks](./07-events-and-ticks)
