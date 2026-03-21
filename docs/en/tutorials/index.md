# Tutorials

This section now contains two learning tracks:

- A new 8-part beginner series that starts from installation and ends with coroutines and optimizer-oriented workflows.
- Larger project tutorials for readers who want full mini-game examples.

## Beginner Series

| # | Tutorial | Focus |
|---|----------|-------|
| 1 | [Getting Started](./01-getting-started) | Install the CLI, compile a file, build a first datapack |
| 2 | [Variables and Types](./02-variables-and-types) | `let`, `const`, `int`, `double`, `string`, `bool` |
| 3 | [Control Flow](./03-control-flow) | `if`, `while`, `for`, `match`, `break`, `continue` |
| 4 | [Functions](./04-functions) | `fn`, parameters, return values, recursion |
| 5 | [Structs and Enums](./05-structs-and-enums) | `struct`, `enum`, `match`, `impl` methods |
| 6 | [Stdlib Tour](./06-stdlib-tour) | Common standard library modules and imports |
| 7 | [Events and Ticks](./07-events-and-ticks) | `@load`, `@tick`, `@on_trigger`, `@on(...)` |
| 8 | [Advanced](./08-advanced) | `@coroutine`, `@inline`, optimizer, module imports |

## Suggested Order

1. Read tutorials 1 to 5 in order.
2. Skim the [Reference](/en/reference/syntax) when you need exact syntax.
3. Use tutorial 6 as a map of the stdlib rather than memorizing everything.
4. Continue to the older project tutorials once you are comfortable reading complete examples.

## Project Tutorials

| Tutorial | Difficulty | Main Theme |
|----------|------------|------------|
| [Hello Datapack](./01-hello-datapack) | Beginner | Load hooks, triggers, starter kit |
| [Variables & Control Flow](./02-variables) | Beginner | Mutation, loops, simple gameplay state |
| [Functions & Structs](./03-functions-structs) | Beginner | Reuse and data modeling |
| [Selectors & Context](./04-selectors-context) | Intermediate | `foreach`, `execute`, selector-driven logic |
| [Decorators & Scheduling](./05-decorators) | Intermediate | Timed systems and gameplay hooks |
| [Math & Particles](./06-stdlib-math) | Intermediate | Visual effects with stdlib |
| [Random & Noise](./07-stdlib-random) | Intermediate | Procedural variation |
| [Coroutines](./08-coroutines) | Advanced | Spreading heavy work over ticks |
| [Precision Arithmetic](./09-precision-arithmetic) | Advanced | `double`, `math_hp` |
| [Full Game: Kill Race](./10-full-game) | Advanced | Putting everything together |

## Related Guides

- [Getting Started](/en/guide/getting-started)
- [Your First Datapack](/en/guide/first-datapack)
- [Variables & Types](/en/guide/variables)
- [Functions](/en/guide/functions)
- [Structs & Enums](/en/guide/structs-enums)
- [Static Events](/en/guide/events)
