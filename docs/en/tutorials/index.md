# Tutorials

Step-by-step tutorials that teach RedScript from the ground up. Start at Tutorial 01 and work your way through — each one builds on the previous.

## Beginner

| Tutorial | Description | Key Concepts |
|----------|-------------|--------------|
| [01 — Hello Datapack](./01-hello-datapack) | Your first datapack | `@load`, `@tick`, `@on_trigger`, `say`, `give` |
| [02 — Variables & Control Flow](./02-variables) | All basic types and branching | `int`, `bool`, `fixed`, `string`, `if/else`, `while`, `foreach` |
| [03 — Functions & Structs](./03-functions-structs) | Organize code and data | `fn`, return values, `struct`, field access |
| [04 — Selectors & Execute Context](./04-selectors-context) | Entity targeting | `@a`, `@e`, selector filters, `foreach`, `tag_add` |

## Intermediate

| Tutorial | Description | Key Concepts |
|----------|-------------|--------------|
| [05 — Decorators & Scheduling](./05-decorators) | All decorator types | `@tick(rate=N)`, `@on_trigger`, `@schedule` |
| [06 — Math & Particles](./06-stdlib-math) | Visual effects with stdlib | `sin_fixed`, `cos_fixed`, `lerp`, `draw_circle`, `draw_helix` |
| [07 — Random & Noise](./07-stdlib-random) | Probability and procedural generation | `random_range`, `value_noise_1d`, `binomial_sample`, `fbm_1d` |

## Advanced

| Tutorial | Description | Key Concepts |
|----------|-------------|--------------|
| [08 — Coroutines](./08-coroutines) | Spread heavy work across ticks | `@coroutine(batch=N)`, back-edge yield, chaining |
| [09 — Precision Arithmetic](./09-precision-arithmetic) | fixed vs double precision | `fixed` ×10000, `double` NBT, `pow_real`, `as` casts |
| [10 — Full Game: Kill Race](./10-full-game) | Complete mini-game | Everything together: phase machine, bossbar, random drops, effects |

## Mini-Games (Reference)

These game examples show full production-quality datapacks:

| Tutorial | Description | Key Concepts |
|----------|-------------|--------------|
| [Zombie Survival](./zombie-survival) | Wave-based survival with shop | State machine, economy, bossbar |
| [Capture the Flag](./capture-the-flag) | Two-team CTF | Teams, flag mechanics, scoring |
| [Parkour Race](./parkour-race) | Timed course with checkpoints | Timers, checkpoints, records |

## Prerequisites

Before starting:

1. Complete [Getting Started](../guide/getting-started)
2. Have a working [local test environment](../guide/testing)

## All Tutorial Source Files

- [tutorial_01_hello.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_01_hello.mcrs)
- [tutorial_02_variables.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_02_variables.mcrs)
- [tutorial_03_functions_structs.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_03_functions_structs.mcrs)
- [tutorial_04_selectors.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_04_selectors.mcrs)
- [tutorial_05_decorators.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_05_decorators.mcrs)
- [tutorial_06_math_particles.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_06_math_particles.mcrs)
- [tutorial_07_random.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_07_random.mcrs)
- [tutorial_08_coroutine.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_08_coroutine.mcrs)
- [tutorial_09_precision.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_09_precision.mcrs)
- [tutorial_10_kill_race.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_10_kill_race.mcrs)
