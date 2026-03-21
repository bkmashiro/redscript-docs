# Tutorial 08: Advanced

**Difficulty:** Intermediate to Advanced  
**Time:** ~35 minutes  
**Prerequisites:** [Tutorial 07](./07-events-and-ticks)

## Goal

Get comfortable with the features that matter once your datapack grows: module imports, optimizer behavior, coroutine-based workload splitting, and inline-oriented performance hints.

## Module Imports

By now you have already seen imports:

```rs
import "stdlib/math.mcrs"
import "stdlib/random.mcrs"
```

They matter for three reasons:

- they make dependencies explicit
- they unlock stdlib or module-library functions
- they make compile errors easier to understand

When you see an unresolved function from stdlib, the first thing to check is whether the correct module was imported.

## Optimizer Basics

RedScript performs dead code elimination.

Important rules from the language reference:

- public functions are emitted
- private-style helpers with names starting with `_` can be removed if unreachable
- decorated functions are kept
- `@keep` forces retention

```rs
fn public_entry() {
    _helper()
}

fn _helper() {
    say("reachable")
}

@keep
fn _manual_entry() {
    say("kept for /function calls")
}
```

Use `redscript compile ... --stats` when you want to inspect optimizer output at a high level.

## `@coroutine`

Heavy loops should not run all in one tick. `@coroutine` spreads work across ticks.

```rs
@coroutine(batch=50)
fn process_players() {
    let i: int = 0
    while (i < 1000) {
        // expensive work
        i = i + 1
    }
}
```

What to remember:

- yielding happens at loop back-edges
- `batch=N` controls how much work runs per tick
- this is the correct tool for large scans, large loops, or chunked generation

You can also attach a completion callback:

```rs
@coroutine(batch=25, onDone="scan_complete")
fn scan_world() {
    let i: int = 0
    while (i < 500) {
        i = i + 1
    }
}

fn scan_complete() {
    say("Scan complete")
}
```

## `@inline`

If your version exposes `@inline`, treat it as a performance-oriented hint for tiny helpers that are called very frequently.

Typical candidate shape:

```rs
@inline
fn clamp_zero(x: int) -> int {
    if (x < 0) {
        return 0
    }
    return x
}
```

Use it conservatively:

- only for very small helpers
- only when the code is clearer or measurably better
- not as a default style

If your current compiler build does not support `@inline`, keep the same design principle: small helpers on hot paths deserve extra attention.

## A Combined Example

```rs
namespace tutorial08

import "stdlib/random.mcrs"

let running: bool = false
let processed: int = 0

@keep
fn _debug_report() {
    say(f"Processed so far: {processed}")
}

@on_trigger("start_job")
fn start_job() {
    if (running) {
        tell(@s, "Job already running")
        return
    }

    running = true
    processed = 0
    run_job()
}

@coroutine(batch=50, onDone="finish_job")
fn run_job() {
    let i: int = 0
    while (i < 500) {
        processed = processed + 1
        i = i + 1
    }
}

fn finish_job() {
    running = false
    say(f"Job finished. Total: {processed}")
}
```

## Practical Rules

1. Import the module before using its helpers.
2. Keep hot-path helpers small and explicit.
3. Use `@keep` for functions you want preserved for manual `/function` use.
4. Use `@coroutine` instead of pushing a huge loop through one tick.
5. Check optimizer stats when your project starts getting large.

## Where to Go Next

- revisit the project tutorials in this folder
- open the [Syntax Reference](/en/reference/syntax) for exact language rules
- browse the [Decorator Reference](/en/reference/decorators) and [CLI Reference](/en/reference/cli)
