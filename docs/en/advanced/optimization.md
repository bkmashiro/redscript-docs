# Optimization

RedScript uses a **fixed, production-safe optimization pipeline**.

There is no public optimization-level switch in the CLI (`-O0`, `-O1`, `-O2`, `--stats`, `--no-dce`). Every compile runs the same pipeline, which is designed to stay conservative by default.

## Optimizer pipeline (fixed)

The pipeline runs in stages:

1. **MIR optimization** (`src/optimizer/pipeline.ts`)
   - Inline planning (`autoInlineSmallFunctions`, `inlinePass`) runs before MIR per-function optimization.
   - Each function is optimized with a safe pass sequence to a fixpoint:
     `loopUnroll` → `licm` → `nbtBatchRead` → `nbtCoalesce` → `scoreboardBatchRead` → `constantFold` → `strengthReduction` → `cse` → `copyProp` → `branchSimplify` → `dce` → `blockMerge`.
   - Interprocedural constant propagation runs after per-function passes.
2. **LIR optimization** (`src/optimizer/lir/pipeline.ts`)
   - Baseline production passes: `deadSlotElimModule` → `execStorePeephole` → `constImmFold` → `deadSlotElimModule`.
   - `scoreboardRmwPassModule` (local-copy rewrite) is **off by default**.

`scoreboardRmwPassModule` is a separate optimization mode and is not part of the default pipeline.

## DCE

RedScript removes unreachable functions after optimization. The rules are based on reachable entrypoints and runtime decorators, then refined by reachability from decorated roots.

Useful guide:

- Root entrypoints such as `@load`, `@tick`, `@on(...)`, and `@coroutine` are preserved.
- Unreachable private helpers are removed to reduce output size.
- `@keep` explicitly preserves a function even when it is otherwise unreachable.

```rs
@load
fn init() {
    helper()
}

fn helper() {
    say("reachable")
}

fn dead_helper() {
    say("removed when unreachable")
}

@keep
fn _manual_entry() {
    say("kept for manual /function use")
}
```

Because DCE is part of the fixed pipeline, you can inspect its effect by compiling and reading the resulting `data/<ns>/function` output.

## Constant Folding

Constant folding evaluates compile-time-known expressions.

```rs
let ticks_per_minute: int = 20 * 60
let doubled: int = 8 + 8
let ready: bool = 3 > 1
```

The generated code uses constants directly, avoiding equivalent runtime arithmetic.

This is most effective for:

- arithmetic on literals
- simple boolean conditions
- fixed-size loop bounds
- compile-time configuration values

## `@inline`

`@inline` is a performance hint for small helpers on hot paths.

```rs
@inline
fn clamp_zero(x: int) -> int {
    if (x < 0) {
        return 0
    }
    return x
}
```

When the optimizer accepts the hint, it substitutes the function body at call sites before later cleanup passes, which can unlock more constant folding, copy propagation, and control-flow cleanup.

Use `@inline` conservatively:

- good for tiny helpers
- useful in hot loops
- not a replacement for readable structure

## Copy Propagation

Copy propagation replaces temporary aliases with their original values when it is safe.

```rs
fn award(points: int) {
    let p = points
    let value = p
    scoreboard_add(@s, "score", value)
}
```

The generated output can then use `points` directly instead of carrying extra aliases.

## Loop Unrolling

Loop unrolling duplicates small fixed-count loops so runtime doesn’t branch on every iteration.

```rs
let i: int = 0
while (i < 4) {
    say("tick")
    i = i + 1
}
```

This is most useful when:

- the bound is a small compile-time constant
- the loop body is tiny
- removing control overhead helps later passes

Large or data-dependent loops are usually left as loops.

## Block Merge

Block merge combines adjacent basic blocks when control flow is linear and there is no reason to keep a branch boundary.

Practically this can mean:

- fewer function-local jumps
- shorter control-flow chains after inlining
- cleaner output after trivial conditions collapse

## Experimental local-copy rewrite

There is a manual/off-by-default optimization flag:

```bash
redscript compile main.mcrs --experimental-lir-local-copy-rewrite
```

This enables `scoreboardRmwPassModule` in LIR. It is intentionally documented as **manual experimental evidence-only**: recommended status is not production-default, and existing reports describe benchmark/typed-gate evidence rather than a proven broad production rollout.

## How the Passes Work Together

At a high level, the pipeline is:

1. MIR dead-code cleanup and scalar simplification
2. Function-local MIR passes to fold constants and expose cleaner structure
3. Inlining and dead-code removal to shrink hot paths
4. LIR dead-slot cleanup and peephole folding

You usually do not need exact pass order; you do need small helpers, deliberate decorators, and clear hot-path boundaries.

## Practical Advice

- Compile commands do not take `-O*` level flags.
- Start with `redscript compile <file>` to use the fixed default pipeline.
- Inspect generated output in `data/<namespace>/function` for DCE effects.
- Add `--snapshot-stages`/`--snapshot-output` when you need stage-by-stage compiler snapshots for debugging.
- Use `--experimental-lir-local-copy-rewrite` only for explicit experimentation with evidence-focused validation.
