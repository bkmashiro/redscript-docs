# Tutorials

Learn RedScript step-by-step, from installation to building complete mini-games.

## Learning Path

**Start here if you're new:**

| # | Tutorial | Time | Focus |
|---|----------|------|-------|
| 1 | [Getting Started](./01-getting-started) | 20 min | Install CLI, first compile |
| 2 | [Variables and Types](./02-variables-and-types) | 25 min | `let`, `const`, basic types |
| 3 | [Control Flow](./03-control-flow) | 30 min | `if`, `for`, `while`, `match` |
| 4 | [Functions](./04-functions) | 25 min | Parameters, returns, recursion |
| 5 | [Structs and Enums](./05-structs-and-enums) | 30 min | Data modeling, `impl` blocks |
| 6 | [Stdlib Tour](./06-stdlib-tour) | 20 min | Math, random, particles |
| 7 | [Events and Ticks](./07-events-and-ticks) | 25 min | `@load`, `@tick`, `@on(...)` |
| 8 | [Advanced](./08-advanced) | 30 min | `@coroutine`, optimizer |

## Language Detail Coverage

The beginner path now introduces the language surface in layers instead of leaving key details only in the reference:

| Feature area | First tutorial touchpoint | Full reference |
|--------------|---------------------------|----------------|
| `let`, `const`, inference | [02 — Variables and Types](./02-variables-and-types) | [Syntax](/en/reference/syntax#variables) |
| `int`, `fixed`, `double`, `string`, `bool` | [02 — Variables and Types](./02-variables-and-types), [09 — Precision Arithmetic](./09-precision-arithmetic) | [Types](/en/reference/types) |
| arrays and dynamic indexing | [02 — Variables and Types](./02-variables-and-types), [03 — Control Flow](./03-control-flow) | [Expressions](/en/reference/expressions#array-index) |
| `if`, `while`, range `for`, array `for`, `foreach` | [03 — Control Flow](./03-control-flow) | [Syntax](/en/reference/syntax#control-flow) |
| `match`, `_`, integer ranges, enum cases | [03 — Control Flow](./03-control-flow), [05 — Structs and Enums](./05-structs-and-enums) | [Expressions](/en/reference/expressions#match-expressions) |
| `Option<T>`, `Some`, `None`, `if let` | [03 — Control Flow](./03-control-flow) | [Expressions](/en/reference/expressions#option-constructors) |
| `struct`, `enum`, `impl` | [05 — Structs and Enums](./05-structs-and-enums) | [Types](/en/reference/types#structs) |
| selectors, `@s`, execute context | [04 — Functions](./04-functions), [04 — Selectors & Execute Context](./04-selectors-context) | [Syntax](/en/reference/syntax#execute) |
| decorators, load/tick/trigger hooks | [07 — Events and Ticks](./07-events-and-ticks) | [Decorators](/en/reference/decorators) |
| imports, retention, coroutines, optimizer | [08 — Advanced](./08-advanced) | [CLI](/en/reference/cli) |

## Project Tutorials

Complete mini-game examples:

| Tutorial | Difficulty | Description |
|----------|------------|-------------|
| [Hello World](./01-hello-world) | Beginner | Player greetings, scoreboards, titles |
| [Zombie Survival](./zombie-survival) | Intermediate | Waves, spawning, difficulty scaling |
| [Parkour Race](./parkour-race) | Intermediate | Checkpoints, timers, leaderboards |
| [Capture the Flag](./capture-the-flag) | Advanced | Teams, scoring, respawns |

## Quick Reference

- [Syntax Reference](/en/reference/syntax)
- [Built-in Functions](/en/reference/builtins)
- [Decorators](/en/reference/decorators)
- [Stdlib Modules](/en/stdlib/)
