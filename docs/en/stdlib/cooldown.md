# Cooldown

> Auto-generated from `src/stdlib/cooldown.mcrs` — do not edit manually.

## API

- [cooldown_start](#cooldown-start)
- [cooldown_ready](#cooldown-ready)
- [cooldown_remaining](#cooldown-remaining)

---

## `cooldown_start` <Badge type="info" text="v4.0.0" />

Create a deadline from a clock value and duration, without owning any state.
Non-positive durations are immediately ready. The deadline saturates at the
signed-i32 maximum rather than overflowing into an already-expired value.

```redscript
fn cooldown_start(now: int, ticks: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `now` | Current tick in the caller's non-negative clock epoch |
| `ticks` | Duration in ticks |

**Returns:** Deadline to persist in caller-owned state

**Example**

```redscript
let sword_ready_at: int = cooldown_start(now, 40);
```

---

## `cooldown_ready` <Badge type="info" text="v4.0.0" />

Check a caller-owned deadline. A fresh/reset zero deadline is ready.

```redscript
fn cooldown_ready(ready_at: int, now: int) -> bool
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ready_at` | Persisted deadline for this ability/entity |
| `now` | Current tick in the same clock epoch |

**Returns:** true when the deadline has been reached

---

## `cooldown_remaining` <Badge type="info" text="v4.0.0" />

Remaining ticks for a caller-owned deadline, clamped to zero.

```redscript
fn cooldown_remaining(ready_at: int, now: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ready_at` | Persisted deadline for this ability/entity |
| `now` | Current tick in the same clock epoch |

**Returns:** Zero if ready, otherwise the remaining ticks

---
