# `scheduler` — Per-entity and global task scheduling

Import: `import scheduler;`

Lightweight tick-based scheduler for delaying and recurring tasks. Supports up to 8 independent per-entity task slots (IDs 0–7) and equivalent global task slots. Built on scoreboard counters; no NBT required.

## Setup

Call `scheduler_tick()` from a `@tick` function so the scheduler advances every game tick:

```rs
import scheduler;

@tick
fn tick() {
    scheduler_tick();
}
```

## Per-entity functions

### `task_schedule(p: selector, task_id: int, delay: int)`

Schedule a task for entity `p`. After `delay` ticks, `task_ready` will return `1` for that `task_id`. `task_id` must be 0–7.

**Example:**
```rs
import scheduler;
// Fire task 0 in 40 ticks (2 seconds)
task_schedule(@s, 0, 40);
```

---

### `task_cancel(p: selector, task_id: int)`

Cancel a pending task. After cancellation `task_ready` returns `0` until the task is scheduled again.

**Example:**
```rs
import scheduler;
task_cancel(@s, 0);
```

---

### `task_ready(p: selector, task_id: int): int`

Returns `1` if the scheduled delay has elapsed (task is ready to fire), `0` otherwise. Automatically resets to `0` after returning `1` — each task fires exactly once per schedule call.

**Example:**
```rs
import scheduler;
if (task_ready(@s, 0) == 1) {
    say("Delayed action triggered!");
}
```

---

## Global task functions

Global tasks use the same interface but are not tied to a specific entity — useful for server-wide timers.

### `gtask_schedule(task_id: int, delay: int)`

Schedule a global task. `task_id` must be 0–7.

---

### `gtask_cancel(task_id: int)`

Cancel a pending global task.

---

### `gtask_ready(task_id: int): int`

Returns `1` if the global task delay has elapsed, `0` otherwise. Auto-resets after firing.

---

## `scheduler_tick()`

Advance all scheduler counters by one tick. **Must** be called from a `@tick` function for the scheduler to work.

---

## Examples

### Delayed execution

```rs
import scheduler;

@tick
fn tick() {
    scheduler_tick();
    check_delayed();
}

fn trigger_explosion() {
    // Explode 3 seconds from now
    task_schedule(@s, 0, 60);
}

fn check_delayed() {
    foreach (e in @e[tag=bomb]) {
        if (task_ready(e, 0) == 1) {
            // Boom!
            execute as e run {
                particle("explosion", ~ ~1 ~, 0.5, 0.5, 0.5, 0, 20);
            }
        }
    }
}
```

### Periodic check (recurring timer)

```rs
import scheduler;

@load
fn on_load() {
    // First check in 100 ticks
    gtask_schedule(0, 100);
}

@tick
fn tick() {
    scheduler_tick();

    if (gtask_ready(0) == 1) {
        // Do periodic work
        dialog_broadcast("Server check passed.");
        // Reschedule for next 100 ticks
        gtask_schedule(0, 100);
    }
}
```

### Multiple independent timers per entity

```rs
import scheduler;

fn start_entity_timers() {
    task_schedule(@s, 0, 20);   // task 0: fire in 1s
    task_schedule(@s, 1, 100);  // task 1: fire in 5s
    task_schedule(@s, 2, 200);  // task 2: fire in 10s
}

fn check_entity_timers() {
    if (task_ready(@s, 0) == 1) { /* 1s action */ }
    if (task_ready(@s, 1) == 1) { /* 5s action */ }
    if (task_ready(@s, 2) == 1) { /* 10s action */ }
}
```
