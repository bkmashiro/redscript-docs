# Timer

> 本文档由 `src/stdlib/timer.mcrs` 自动生成，请勿手动编辑。

## API 列表

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

创建一个指定持续时长的新计时器

```redscript
fn new(duration: int) -> Timer
```

**返回：** 新的 Timer 实例

---

## `Timer.start`

启动或继续计时器

```redscript
fn start(self)
```

---

## `Timer.pause`

暂停计时器

```redscript
fn pause(self)
```

---

## `Timer.reset`

将已流逝的刻数重置为零

```redscript
fn reset(self)
```

---

## `Timer.done`

检查计时器是否已达到持续时间

```redscript
fn done(self) -> bool
```

**返回：** 若已完成返回 true，否则返回 false

---

## `Timer.elapsed`

获取已流逝的游戏刻数

```redscript
fn elapsed(self) -> int
```

**返回：** 已流逝刻数

---

## `Timer.remaining`

获取剩余刻数（最小为 0）

```redscript
fn remaining(self) -> int
```

**返回：** 剩余刻数，不足时为 0

---

## `Timer.tick`

在计时器激活时手动推进一刻

```redscript
fn tick(self)
```

---

## `tick_to_seconds` <Badge type="info" text="Since v1.0.0" />

将 Minecraft 游戏刻转换为整秒（20 刻 = 1 秒）

```redscript
fn tick_to_seconds(ticks: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `ticks` | 游戏刻数 |

**返回：** ticks / 20

**示例**

```redscript
let s = tick_to_seconds(100)  // result: 5
```

---

## `tick_to_ms` <Badge type="info" text="Since v1.0.0" />

将游戏刻转换为毫秒（1 刻 = 50 ms）

```redscript
fn tick_to_ms(ticks: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `ticks` | 游戏刻数 |

**返回：** ticks * 50

**示例**

```redscript
let ms = tick_to_ms(20)  // result: 1000
```

---

## `seconds_to_ticks` <Badge type="info" text="Since v1.0.0" />

将秒转换为 Minecraft 游戏刻（1 秒 = 20 刻）

```redscript
fn seconds_to_ticks(s: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `s` | 秒数 |

**返回：** s * 20

**示例**

```redscript
let t = seconds_to_ticks(5)  // result: 100
```

---

## `format_time_s` <Badge type="info" text="Since v1.0.0" />

从刻数中提取秒分量（0-59）

```redscript
fn format_time_s(ticks: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `ticks` | 游戏刻数 |

**返回：** (ticks / 20) % 60

**示例**

```redscript
let s = format_time_s(1500)  // result: 15  (75 seconds mod 60)
```

---

## `format_time_m` <Badge type="info" text="Since v1.0.0" />

从刻数中提取分钟分量（0-59）

```redscript
fn format_time_m(ticks: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `ticks` | 游戏刻数 |

**返回：** (ticks / 1200) % 60

**示例**

```redscript
let m = format_time_m(72000)  // result: 0  (1 hour)
```

---

## `format_time_h` <Badge type="info" text="Since v1.0.0" />

从刻数中提取小时分量

```redscript
fn format_time_h(ticks: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `ticks` | 游戏刻数 |

**返回：** ticks / 72000

**示例**

```redscript
let h = format_time_h(144000)  // result: 2
```

---
