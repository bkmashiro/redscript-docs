# Queue

> 本文档由 `src/stdlib/queue.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [queue_push](#queue-push)
- [queue_pop](#queue-pop)
- [queue_peek](#queue-peek)
- [queue_size](#queue-size)
- [queue_empty](#queue-empty)
- [queue_clear](#queue-clear)

---

## `queue_push` <Badge type="info" text="v3.0.0" />

将一个整数入队到 storage rs:arrays Queue 末尾。

```redscript
fn queue_push(val: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `val` | 要入队的整数值 |

**示例**

```redscript
queue_push(42)
```

---

## `queue_pop` <Badge type="info" text="v3.0.0" />

出队并返回队头元素；队列为空时返回 -1。

```redscript
fn queue_pop(): int
```

**返回：** 队头整数值，若为空则返回 -1

**示例**

```redscript
let v: int = queue_pop()
```

---

## `queue_peek` <Badge type="info" text="v3.0.0" />

查看队头元素但不移除；队列为空时返回 -1。

```redscript
fn queue_peek(): int
```

**返回：** 队头整数值，若为空则返回 -1

**示例**

```redscript
let front: int = queue_peek()
```

---

## `queue_size` <Badge type="info" text="v3.0.0" />

返回队列中尚未出队的元素数量。

```redscript
fn queue_size(): int
```

**返回：** 队列长度（整数）

**示例**

```redscript
let n: int = queue_size()
```

---

## `queue_empty` <Badge type="info" text="v3.0.0" />

检查队列是否为空。

```redscript
fn queue_empty(): int
```

**返回：** 队列为空返回 1，否则返回 0

**示例**

```redscript
if (queue_empty() == 1) { }
```

---

## `queue_clear` <Badge type="info" text="v3.0.0" />

清空队列：将 storage rs:arrays Queue 重置为空列表并将头指针归零。

```redscript
fn queue_clear()
```

**示例**

```redscript
queue_clear()
```

---
