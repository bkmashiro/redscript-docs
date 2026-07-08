# Compiler Internals

This guide is a contributor-oriented map of how RedScript becomes Minecraft datapack files. It is grounded in the current compiler source, especially `src/emit`, `src/mir`, `src/lir`, `src/optimizer`, `src/events`, and selected stdlib/test files.

Use it to reason about generated output, runtime cost, and where to look before changing the compiler.

## Pipeline Overview

The active `compile()` path in `src/emit/compile.ts` is:

1. **Preprocess imports.** String imports are resolved relative to the source file, stdlib, and include dirs. Files declared as `module library` are kept separate so unused library functions can still be pruned.
2. **Parse and typecheck.** Lexer/parser output is checked, `@config` globals become integer constants, and event runtime assets are planned before typechecking.
3. **Lower to HIR.** The HIR pass resolves typed structure, monomorphizes generics, checks deprecated calls, and prunes unreachable injected libraries.
4. **Collect runtime metadata.** Decorators such as `@load`, `@tick`, `@on`, `@watch`, `@schedule`, `@coroutine`, `@function_tag`, `@memoize`, and profiling decorators are collected before later lowering discards decorator syntax.
5. **Lower to MIR.** `src/mir/lower.ts` turns structured code into an explicit control-flow graph with temporary values.
6. **Optimize MIR.** The default MIR pipeline runs inline planning and then a fixed pass sequence including loop unrolling, LICM, NBT/scoreboard read batching, constant folding, CSE, copy propagation, branch simplification, DCE, and block merge.
7. **Transform coroutines.** `@coroutine` functions are rewritten at MIR level into continuation functions plus a tick dispatcher.
8. **Lower to LIR and optimize.** `src/lir/lower.ts` converts MIR into scoreboard/storage-oriented LIR. The LIR optimizer runs dead-slot cleanup and peephole/constant-immediate folds; the local-copy/RMW rewrite remains opt-in.
9. **Finalize runtime LIR.** Singleton helper functions, memoize/benchmark implementation renames, and static tick-budget checks are applied.
10. **Emit datapack files.** `src/emit/index.ts` writes `pack.mcmeta`, `.mcfunction` files, Minecraft function tags, generated decorator wrappers, and optional source-map sidecars.

## Datapack Roots

Every compile emits a namespace objective setup function at `data/<namespace>/function/load.mcfunction`. The `minecraft:load` tag always includes that generated load function, and user `@load` functions are appended to the same tag.

`@tick` functions are placed in `data/minecraft/tags/function/tick.json`. In the inspected compile path, the parser accepts `@tick(rate=N)`, but the active runtime metadata collector records only the function name as a tick root; it does not consume `rate`. Verify generated output on your target build before relying on rate-based tick throttling.

`@schedule(ticks=N)` does not add the function to `tick.json`. It emits `_schedule_<name>.mcfunction`, whose body is a Minecraft `schedule function <namespace>:<name> Nt` command. Calling `_schedule_<name>()` schedules the original function.

`@function_tag("namespace:path")` writes a regular function tag file and adds the decorated function reference to it. Special cases for `minecraft:load` and `minecraft:tick` are merged into the existing load/tick tag files instead of producing duplicates.

`@on(EventType)` is manifest-driven. The compiler maps the handler to the event's handler function tag, injects `src/stdlib/events.mcrs` for the used event types, and that runtime library polls tags/scoreboards from an `@tick` function before dispatching `function #rs:on_...`.

`@watch("objective")` creates a previous-value scoreboard objective, emits a tick-registered `__watch_<name>` dispatcher, and runs the user function as each player whose watched objective changed.

Other wrapper decorators are emitted in `src/emit/index.ts`: `@throttle` uses a per-function tick counter, `@retry` uses a retry counter plus tick dispatcher, `@memoize` rewrites the function to `<name>_impl` and generates an LRU-1 scoreboard cache wrapper, and debug profiling/benchmark decorators add timing objectives and helper functions.

## Emitting Model

MIR is a CFG. LIR is flat and Minecraft-specific. A LIR function becomes one `.mcfunction`; method names with `::` become path segments, so `Player::heal` emits as `player/heal.mcfunction`.

Scoreboard temporaries are fake players in the module objective, normally `__<namespace>`. LIR lowering prefixes temps with the current function name, so a temp like `t0` becomes a slot like `$fn_t0 __ns`. Function parameters use `$p0`, `$p1`, and return values use `$ret`. Struct return fields use return-field slots such as `$ret_x`.

Arithmetic is two-address at LIR level. A MIR expression like `dst = a + b` becomes "copy `a` into `dst`, then add `b` into `dst`" using scoreboard operations. Comparisons usually set a destination to `0`, then conditionally set it to `1` with `execute if/unless score`.

Control flow becomes functions and calls. Branch targets and loop blocks can be extracted into helper `.mcfunction` files. Branch emission uses `execute if score ... run return run function ...` for the then path, then falls through to the else path. Loop shapes therefore show up as call-graph cycles, which is why static budget analysis works on the LIR call graph.

`foreach` over a selector extracts the body into a helper and emits `call_context`, which becomes an `execute as <selector> ... run function <helper>` command. Inside that helper, the bound entity name is treated as `@s` for command contexts. `execute { ... }` blocks follow the same helper-function pattern for supported context subcommands such as `as`, `at`, `positioned`, `rotated`, `in`, and `anchored`.

The final emitter maps each LIR instruction to a Minecraft command and runs `flattenExecute`, which collapses nested `execute if ... run execute if ...` chains into one execute command when the semantics are equivalent.

## Storage And Computation

Plain `int` and `bool` values are scoreboard-backed. Scoreboard immediates are constrained to Minecraft's signed 32-bit range.

`fixed`/`float` values use a `x10000` integer scale on scoreboards. Multiplication divides by `10000` after multiplying two fixed values; division pre-multiplies the dividend by `10000` before scoreboard division.

`double` values are stored in `rs:d` NBT storage. Double literals and variables are written with `data modify storage`; reading them as fixed-point uses `data get storage ... 10000.0`. Double arithmetic calls `math_hp:double_add`, `double_sub`, `double_mul`, or `double_div` with operands copied through `rs:d __dp0` and `__dp1`.

Arrays are NBT-backed under `<namespace>:arrays`. Literal arrays can be initialized with one `data modify storage ... set value [...]`. Constant indices lower to direct NBT reads/writes. Dynamic indices write the index and value into `rs:macro_args`, call a generated function macro with `with storage`, and therefore require Minecraft function macro support.

String variables live in `rs:strings` and are not general scoreboard expressions. `say(f"...")` is lowered through a generated macro helper and `rs:macro_args`; plain `say("...")` remains an inline command. Text builtins such as `tellraw`, `title`, `subtitle`, `actionbar`, and `announce` can convert f-strings into JSON text with scoreboard components. `Display::to_string` implementations are inlined into f-string contexts rather than emitted as standalone runtime calls.

Global variables read and write scoreboard slots. `@singleton` structs generate per-field objectives plus synthetic `Struct::get` and `Struct::set` functions that copy between those objectives and regular return/parameter slots.

## Runtime Cost Model

The main cost multiplier is not "number of RedScript lines"; it is generated Minecraft command count multiplied by selectors and tick roots.

| Pattern | Runtime shape | Cost signal |
| --- | --- | --- |
| `@tick` | Function tag runs every game tick | Cost repeats 20 times per second. |
| `execute as @a` or selector `foreach` | One helper call per matched entity | Cost scales with selected players/entities. |
| `@on(...)` | Injected event polling tick plus handler function tags | Polling cost is always present once the event runtime is injected; handler cost scales with fired events. |
| `@watch` | One tick dispatcher per watch, usually over `@a` | Cost scales with players and number of watched objectives. |
| `@schedule` | One schedule command when the wrapper is called | No per-tick polling unless the scheduled function schedules itself. |
| `@coroutine` | Tick dispatcher plus continuation functions and persistent scoreboard state | Spreads loop work across ticks; `batch` controls work per tick. |
| Dynamic array access | `rs:macro_args` writes plus function macro calls | Much heavier than scoreboard arithmetic or constant-index NBT. |
| `set_int` helpers | NBT list load/store plus linear scans | Good for small sets; avoid large hot-path scans. |
| `heap` stdlib | NBT int array with sift-up/sift-down loops, capacity 64 | Logical O(log n), but each step touches NBT-backed array slots. |
| `scheduler_tick()` | Fixed set of scoreboard commands, including per-player `execute as @a` slots | Call it once from a global tick root, not inside a per-player loop. |

The static budget pass estimates command count from LIR. It warns above half of Minecraft's default `maxCommandChainLength` and errors above the default full limit. `@coroutine` functions are exempt from that per-function check because their work is deliberately split across ticks.

## Practical Advice

- Inspect generated `data/<namespace>/function` output when behavior or cost matters. It is the best source of truth for selectors, function splitting, and wrappers.
- Keep hot `@tick` roots small. Move slower work behind `@throttle`, `@schedule`, explicit counters, `setInterval`, or `@coroutine`.
- Avoid broad selectors in nested loops. A helper called through `execute as @a` and then doing `foreach @e[...]` multiplies both selector costs.
- Prefer scoreboard variables for hot counters, flags, and small numeric state.
- Use arrays, sets, heap, and double precision where they buy clarity or capability, but treat them as storage-backed operations.
- Keep dynamic array indexing out of tight tick loops when a fixed index or fixed-size struct field will do.
- Let small pure helpers stay small. The optimizer auto-inlines very small non-recursive, non-raw helpers, and `@inline` is best reserved for tiny hot helpers.
- Mark manual `/function` entrypoints with `@keep`; otherwise injected library and private helpers are eligible for pruning when unreachable.
- Be careful with raw commands. They are preserved as side effects and act as optimizer barriers, which is correct but can block simplification.
- For event-style logic, prefer `@on` when the provided runtime event matches your need; use raw tick polling only when the event runtime cannot express the condition.
