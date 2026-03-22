# Timer

> Auto-generated from `src/stdlib/timer.mcrs` — do not edit manually.

## API

- [Timer.new](#timer-new)
- [Timer.start](#timer-start)
- [Timer.pause](#timer-pause)
- [Timer.reset](#timer-reset)
- [Timer.done](#timer-done)
- [Timer.elapsed](#timer-elapsed)
- [Timer.remaining](#timer-remaining)
- [Timer.tick](#timer-tick)
- [tick_to_seconds](#tick-to-seconds)
- [tick_to_ms](#tick-to-ms)
- [seconds_to_ticks](#seconds-to-ticks)
- [format_time_s](#format-time-s)
- [format_time_m](#format-time-m)
- [format_time_h](#format-time-h)

---

## `Timer.new`

Create a new timer with the given duration in ticks.

```redscript
fn new(duration: int) -> Timer
```

---

## `Timer.start`

Start or resume the timer.

```redscript
fn start(self)
```

---

## `Timer.pause`

Pause the timer.

```redscript
fn pause(self)
```

---

## `Timer.reset`

Reset elapsed ticks back to zero.

```redscript
fn reset(self)
```

---

## `Timer.done`

Check whether the timer has reached its duration.

```redscript
fn done(self) -> bool
```

---

## `Timer.elapsed`

Get elapsed ticks.

```redscript
fn elapsed(self) -> int
```

---

## `Timer.remaining`

Get remaining ticks, clamped at zero.

```redscript
fn remaining(self) -> int
```

---

## `Timer.tick`

Manually advance the timer by one tick when active.

```redscript
fn tick(self)
```

---

## `tick_to_seconds` <Badge type="info" text="Since v1.0.0" />

Convert Minecraft ticks to whole seconds (20 ticks = 1 second).

```redscript
fn tick_to_seconds(ticks: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ticks` | Elapsed ticks |

**Returns:** ticks / 20

**Example**

```redscript
let s = tick_to_seconds(100)  // result: 5
```

---

## `tick_to_ms` <Badge type="info" text="Since v1.0.0" />

Convert Minecraft ticks to milliseconds (1 tick = 50 ms).

```redscript
fn tick_to_ms(ticks: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ticks` | Elapsed ticks |

**Returns:** ticks * 50

**Example**

```redscript
let ms = tick_to_ms(20)  // result: 1000
```

---

## `seconds_to_ticks` <Badge type="info" text="Since v1.0.0" />

Convert seconds to Minecraft ticks (1 second = 20 ticks).

```redscript
fn seconds_to_ticks(s: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `s` | Seconds |

**Returns:** s * 20

**Example**

```redscript
let t = seconds_to_ticks(5)  // result: 100
```

---

## `format_time_s` <Badge type="info" text="Since v1.0.0" />

Extract seconds component from a tick count (0-59).

```redscript
fn format_time_s(ticks: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ticks` | Elapsed ticks |

**Returns:** (ticks / 20) % 60

**Example**

```redscript
let s = format_time_s(1500)  // result: 15  (75 seconds mod 60)
```

---

## `format_time_m` <Badge type="info" text="Since v1.0.0" />

Extract minutes component from a tick count (0-59).

```redscript
fn format_time_m(ticks: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ticks` | Elapsed ticks |

**Returns:** (ticks / 1200) % 60

**Example**

```redscript
let m = format_time_m(72000)  // result: 0  (1 hour)
```

---

## `format_time_h` <Badge type="info" text="Since v1.0.0" />

Extract hours component from a tick count.

```redscript
fn format_time_h(ticks: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ticks` | Elapsed ticks |

**Returns:** ticks / 72000

**Example**

```redscript
let h = format_time_h(144000)  // result: 2
```

---
