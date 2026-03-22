# Scheduler

> 本文档由 `src/stdlib/scheduler.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [task_schedule](#task-schedule)
- [task_cancel](#task-cancel)
- [task_ready](#task-ready)
- [gtask_schedule](#gtask-schedule)
- [gtask_cancel](#gtask-cancel)
- [gtask_ready](#gtask-ready)
- [scheduler_tick](#scheduler-tick)

---

## `task_schedule` <Badge type="info" text="v1.0.0" />

为玩家排程指定槽位的任务，在 delay 个 tick 后触发

```redscript
fn task_schedule(p: selector, task_id: int, delay: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `p` | 目标玩家或实体选择器 |
| `task_id` | 槽位索引 [0, 7] |
| `delay` | 等待的 tick 数 |

**示例**

```redscript
task_schedule(@s, 0, 40)
```

---

## `task_cancel` <Badge type="info" text="v1.0.0" />

取消玩家指定槽位的任务（将计数器归零）

```redscript
fn task_cancel(p: selector, task_id: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `p` | 目标玩家或实体选择器 |
| `task_id` | 槽位索引 [0, 7] |

**示例**

```redscript
task_cancel(@s, 0)
```

---

## `task_ready` <Badge type="info" text="v1.0.0" />

检查玩家指定槽位的任务是否在本 tick 触发；触发后自动清除

```redscript
fn task_ready(p: selector, task_id: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `p` | 目标玩家或实体选择器 |
| `task_id` | 槽位索引 [0, 7] |

**返回：** 任务触发返回 1，否则返回 0

**示例**

```redscript
if (task_ready(@s, 0) == 1) { /* handle event */ }
```

---

## `gtask_schedule` <Badge type="info" text="v1.0.0" />

排程全局槽位任务（绑定到

```redscript
fn gtask_schedule(task_id: int, delay: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `task_id` | 槽位索引 [0, 7] |
| `delay` | 等待的 tick 数 |

**示例**

```redscript
gtask_schedule(0, 200)
```

---

## `gtask_cancel` <Badge type="info" text="v1.0.0" />

取消全局槽位任务

```redscript
fn gtask_cancel(task_id: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `task_id` | 槽位索引 [0, 7] |

**示例**

```redscript
gtask_cancel(0)
```

---

## `gtask_ready` <Badge type="info" text="v1.0.0" />

检查全局槽位任务是否在本 tick 触发；触发后自动清除

```redscript
fn gtask_ready(task_id: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `task_id` | 槽位索引 [0, 7] |

**返回：** 任务触发返回 1，否则返回 0

**示例**

```redscript
if (gtask_ready(0) == 1) { /* handle global event */ }
```

---

## `scheduler_tick` <Badge type="info" text="v1.0.0" />

每 tick 将所有激活的玩家和全局计时器减 1；在 @tick 函数中调用

```redscript
fn scheduler_tick()
```

**示例**

```redscript
// In your @tick mcfunction:
scheduler_tick()
```

---
