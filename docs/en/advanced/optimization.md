# Optimization

RedScript performs several compile-time optimization passes before writing the final datapack. The goal is simple: emit fewer commands, remove unreachable helpers, and simplify hot paths without changing program behaviour.

## Optimization Levels

Use the CLI flags below to control how aggressive the optimizer should be:

| Flag | Meaning |
|------|---------|
| `--no-dce` | Disable dead code elimination only. Other enabled optimizations still run. |
| `-O0` | Disable optimization passes. Best for debugging generated output. |
| `-O1` | Enable the standard safe optimization set. Good default during development. |
| `-O2` | Enable the full optimization pipeline, including more aggressive inlining and loop cleanup. |

Typical usage:

```bash
redscript compile main.mcrs -O0
redscript compile main.mcrs -O1 --stats
redscript compile main.mcrs -O2 --no-dce
```

## DCE

Dead code elimination removes functions that cannot be reached from any public entrypoint.

High-level rules:

- Functions whose names do not start with `_` are treated as public and are emitted.
- Functions starting with `_` are treated as private helpers and may be removed if unreachable.
- Decorated functions such as `@load`, `@tick`, `@on(...)`, and `@coroutine` are kept automatically.
- `@keep` overrides DCE and forces retention.

```rs
fn start() {
    _helper()
}

fn _helper() {
    say("reachable")
}

fn _dead() {
    say("removed by DCE")
}

@keep
fn _manual_entry() {
    say("kept for manual /function use")
}
```

Use `--no-dce` when you want to inspect every helper in the generated datapack or when debugging reachability issues.

## Constant Folding

Constant folding evaluates expressions at compile time when all inputs are known.

Typical examples:

```rs
let ticks_per_minute: int = 20 * 60
let doubled: int = 8 + 8
let ready: bool = 3 > 1
```

After folding, the generated code uses the computed constants directly instead of recomputing them at runtime.

This is most effective for:

- arithmetic on literals
- simple boolean conditions
- fixed-size loop bounds
- compile-time configuration values

## `@inline`

`@inline` is a performance hint for very small helpers on hot paths.

```rs
@inline
fn clamp_zero(x: int) -> int {
    if (x < 0) {
        return 0
    }
    return x
}
```

When the optimizer accepts the hint, it substitutes the function body directly at call sites before later cleanup passes run. That can unlock more constant folding, copy propagation, and dead block removal.

Use `@inline` conservatively:

- good for tiny helpers
- useful in hot loops
- not a replacement for readable structure

## Copy Propagation

Copy propagation replaces temporary aliases with their original values when it is safe to do so.

```rs
fn award(points: int) {
    let p = points
    let value = p
    scoreboard_add(@s, "score", value)
}
```

After propagation, the optimizer can often collapse the chain so the generated code uses `points` directly.

This matters because RedScript lowers many high-level expressions into short-lived temporaries. Propagating those copies gives later passes less work.

## Loop Unrolling

Loop unrolling duplicates small fixed-count loops so the runtime no longer needs to branch on every iteration.

```rs
let i: int = 0
while (i < 4) {
    say("tick")
    i = i + 1
}
```

For very small constant trip counts, `-O2` may expand the body into repeated straight-line code. This is most useful when:

- the loop bound is a small compile-time constant
- the body is tiny
- removing the loop control overhead makes later passes simpler

Large or data-dependent loops are not good candidates and are usually left as loops.

## Block Merge

Block merge combines adjacent basic blocks when control flow is linear and there is no reason to keep a branch boundary.

In practice this means:

- fewer jumps between generated helper functions
- shorter control-flow chains after inlining
- cleaner output after constant conditions collapse

This pass usually runs after simplification passes such as constant folding and copy propagation, because those passes often create trivial one-way blocks that can then be merged.

## How the Passes Work Together

At a high level, the optimizer pipeline looks like this:

1. simplify easy constants and copies
2. inline tiny hot-path helpers when allowed
3. clean up loops and merge straight-line blocks
4. remove unreachable code with DCE

You do not usually need to think about the exact pass order. What matters is writing small helpers, using decorators intentionally, and choosing the right optimization level for the job.

## Practical Advice

- Use `-O0` when comparing source to generated output.
- Use `-O1` as the normal development setting.
- Use `-O2` before shipping large datapacks or hot-path-heavy logic.
- Use `--no-dce` when you need every helper preserved for inspection.
- Use `--stats` when you want a quick summary of optimizer impact.
