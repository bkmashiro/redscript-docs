# Scheduler

> Auto-generated from `src/stdlib/scheduler.mcrs` — do not edit manually.

## API

- [task_schedule](#task-schedule)
- [task_cancel](#task-cancel)
- [task_ready](#task-ready)
- [gtask_schedule](#gtask-schedule)
- [gtask_cancel](#gtask-cancel)
- [gtask_ready](#gtask-ready)
- [scheduler_tick](#scheduler-tick)

---

## `task_schedule` <Badge type="info" text="Since v1.0.0" />

Schedule slot `task_id` (0–7) to fire after `delay` ticks for player `p`.

```redscript
fn task_schedule(p: selector, task_id: int, delay: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `p` | Recipient player or entity selector |
| `task_id` | Slot index in range [0, 7] |
| `delay` | Number of ticks to wait before firing |

**Example**

```redscript
task_schedule(@s, 0, 40)
```

---

## `task_cancel` <Badge type="info" text="Since v1.0.0" />

Cancel slot `task_id` for player `p` (zeroes the counter).

```redscript
fn task_cancel(p: selector, task_id: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `p` | Recipient player or entity selector |
| `task_id` | Slot index in range [0, 7] |

**Example**

```redscript
task_cancel(@s, 0)
```

---

## `task_ready` <Badge type="info" text="Since v1.0.0" />

Returns `1` if slot `task_id` fired on this tick (counter reached 1), `0` otherwise.

Automatically clears the slot once it fires so subsequent calls return `0`.

```redscript
fn task_ready(p: selector, task_id: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `p` | Player or entity selector to check |
| `task_id` | Slot index in range [0, 7] |

**Returns:** `1` when the task is ready, `0` otherwise

**Example**

```redscript
if (task_ready(@s, 0) == 1) { /* handle event */ }
```

---

## `gtask_schedule` <Badge type="info" text="Since v1.0.0" />

Schedule global slot `task_id` (0–7) to fire after `delay` ticks.

Global tasks are stored on the `#rs` fake-player and are not bound to any
specific player entity.

```redscript
fn gtask_schedule(task_id: int, delay: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `task_id` | Slot index in range [0, 7] |
| `delay` | Number of ticks to wait before firing |

**Example**

```redscript
gtask_schedule(0, 200)
```

---

## `gtask_cancel` <Badge type="info" text="Since v1.0.0" />

Cancel global slot `task_id` by zeroing its counter.

```redscript
fn gtask_cancel(task_id: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `task_id` | Slot index in range [0, 7] |

**Example**

```redscript
gtask_cancel(0)
```

---

## `gtask_ready` <Badge type="info" text="Since v1.0.0" />

Returns `1` if global slot `task_id` fired this tick, `0` otherwise.

Automatically clears the slot once it fires.

```redscript
fn gtask_ready(task_id: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `task_id` | Slot index in range [0, 7] |

**Returns:** `1` when the task is ready, `0` otherwise

**Example**

```redscript
if (gtask_ready(0) == 1) { /* handle global event */ }
```

---

## `scheduler_tick` <Badge type="info" text="Since v1.0.0" />

Decrement all active per-player and global timers by 1 each tick.

Call this inside your `@tick` function (executed as `@a`). Counters are
clamped to 0 so they never go negative.

```redscript
fn scheduler_tick()
```

**Example**

```redscript
// In your @tick mcfunction:
scheduler_tick()
```

---
