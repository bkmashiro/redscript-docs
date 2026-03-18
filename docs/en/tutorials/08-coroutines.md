# Tutorial 08: Coroutines — Spread Heavy Work

**Difficulty:** Advanced  
**Time:** ~30 minutes  
**Prerequisites:** [Tutorial 07: Random & Noise](./07-stdlib-random)

## What You'll Build

A two-phase region scanner: Phase 1 scans a 100×100 area (10,000 iterations) spread over 200 ticks using `@coroutine(batch=50)`. Phase 2 automatically announces results when the scan finishes.

## What You'll Learn

- Why heavy loops crash with `maxCommandChainLength`
- `@coroutine(batch=N)` — spread loop iterations across ticks
- How yield happens at loop **back-edges** (not with a `yield` keyword)
- `onDone` — automatic callback when a coroutine finishes
- Coroutine chaining (sequential pipeline)

## The Problem: maxCommandChainLength

Minecraft limits how many commands can run in a single tick (default: 65,536). A tight loop with 10,000 iterations could easily exceed this:

```rs
// WITHOUT @coroutine — this crashes on large inputs!
fn scan_region_bad() {
    let i: int = 0
    while (i < 10000) {
        // Each iteration = multiple MC commands
        // 10000 × 5 commands = 50,000 → near the limit!
        scan_block(i)
        i = i + 1
    }
}
```

## The Solution: @coroutine(batch=N)

`@coroutine(batch=50)` makes the loop yield every 50 iterations instead of running all at once:

```rs
@coroutine(batch=50)
fn run_scan() {
    let i: int = 0
    while (i < 10000) {
        // ... work ...
        i = i + 1
        // ← Back-edge: yield happens here every 50 iterations
    }
    scan_complete()   // onDone: called automatically when loop finishes
}
```

**Timeline:**
- Tick 1: iterations 0-49
- Tick 2: iterations 50-99
- ...
- Tick 200: iterations 9950-9999
- Tick 201: `scan_complete()` is called

## How Yield Works

> **Important:** There is NO `yield` keyword. Yield happens automatically at the **back-edge** of each loop — the moment the loop condition is checked again. With `batch=50`, the coroutine suspends after every 50 back-edge crossings.

```rs
@coroutine(batch=10)
fn my_coroutine() {
    let i: int = 0
    while (i < 100) {
        do_work(i)
        i = i + 1
        // ← This is the back-edge. After 10 of these, suspend until next tick.
    }
    // When the while exits normally, the next line runs in the same tick:
    on_done()
}
```

## Step 1: State and Setup

```rs
struct ScanState {
    blocks_checked: int,
    special_found: int,
    scan_running: int
}

let scan: ScanState = {
    blocks_checked: 0,
    special_found: 0,
    scan_running: 0
}

@load
fn setup() {
    scoreboard_add_objective("scan_data", "dummy")
    say("Coroutine tutorial! /trigger start_scan")
}
```

## Step 2: Trigger

```rs
@on_trigger("start_scan")
fn start_scan() {
    if (scan.scan_running == 1) {
        tell(@s, "Scan in progress!")
        return
    }

    scan.blocks_checked = 0
    scan.special_found = 0
    scan.scan_running = 1

    announce("Starting 100x100 scan... (~10 seconds)")
    run_scan()
}
```

## Step 3: The Coroutine

```rs
@coroutine(batch=50)
fn run_scan() {
    let i: int = 0
    while (i < 10000) {
        // Simulate block check: x = i%100, z = i/100
        if (i % 200 == 0) {
            scan.special_found = scan.special_found + 1
        }
        scan.blocks_checked = scan.blocks_checked + 1

        // Show progress every 1000 blocks
        if (scan.blocks_checked % 1000 == 0) {
            let pct: int = scan.blocks_checked * 100 / 10000
            actionbar(@a, "Scanning: " + pct + "%")
        }

        i = i + 1
        // ← Yield every 50 iterations
    }
    scan_complete()   // fires automatically when done
}
```

## Step 4: The Completion Handler

```rs
fn scan_complete() {
    scan.scan_running = 0

    say("=== Scan Complete! ===")
    say("Checked: " + scan.blocks_checked + " blocks")
    say("Special: " + scan.special_found + " blocks found")

    title(@a, "Scan Done!")
    let found: int = scan.special_found
    subtitle(@a, "Special blocks found: " + found)
}
```

## Step 5: Coroutine Chaining

You can chain coroutines into a pipeline — each calls the next as its `onDone`:

```rs
@on_trigger("chained_scan")
fn start_chained() {
    phase1_collect()
}

@coroutine(batch=100)
fn phase1_collect() {
    let i: int = 0
    while (i < 500) { i = i + 1 }
    announce("Phase 1 done — starting phase 2")
    phase2_process()
}

@coroutine(batch=25)
fn phase2_process() {
    let i: int = 0
    while (i < 200) { i = i + 1 }
    announce("Phase 2 done — starting phase 3")
    phase3_report()
}

fn phase3_report() {
    say("Pipeline complete!")
}
```

## Complete Code

Full example: [tutorial_08_coroutine.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_08_coroutine.mcrs)

## Try It Out

1. Install and `/reload`
2. `/trigger start_scan` — watch the actionbar progress over ~10 seconds
3. When done, results appear in chat and on-screen
4. `/trigger scan_status` at any time for current progress
5. `/trigger chained_scan` to see 3-phase pipeline

## Choosing batch Size

| batch size | ticks for 10,000 iterations |
|-----------|----------------------------|
| 10 | 1,000 ticks (50 seconds) |
| 50 | 200 ticks (10 seconds) |
| 100 | 100 ticks (5 seconds) |
| 500 | 20 ticks (1 second) |

Rule of thumb: `batch ≈ commandBudget / commandsPerIteration`. If each loop body runs ~10 MC commands, use `batch ≤ 500` to stay under the 65,536 limit per tick.

## When to Use Coroutines

✅ Good use cases:
- Region scanning, filling, or checking large areas
- Generating procedural terrain block by block
- Running expensive algorithms over many entities

❌ Don't use coroutines for:
- Logic that must complete in one tick (e.g. game-critical checks)
- Small loops (< 1,000 iterations) — overhead not worth it

## Next Steps

→ [Tutorial 09: Precision Arithmetic — fixed & double](./09-precision-arithmetic)
