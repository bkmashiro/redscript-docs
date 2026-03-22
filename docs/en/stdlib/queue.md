# Queue

> Auto-generated from `src/stdlib/queue.mcrs` — do not edit manually.

## API

- [queue_push](#queue-push)
- [queue_pop](#queue-pop)
- [queue_peek](#queue-peek)
- [queue_size](#queue-size)
- [queue_empty](#queue-empty)
- [queue_clear](#queue-clear)

---

## `queue_push` <Badge type="info" text="v3.0.0" />

Enqueue a value into the queue.

The value is appended to the end of `storage rs:arrays Queue`.

```redscript
fn queue_push(val: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `val` | Value to enqueue |

**Example**

```redscript
queue_push(42)
```

---

## `queue_pop` <Badge type="info" text="v3.0.0" />

Dequeue and return the front value.

Advances the head pointer by one. If the queue is empty, returns `-1`.

```redscript
fn queue_pop(): int
```

**Returns:** Front value, or -1 if empty

**Example**

```redscript
let v: int = queue_pop()
```

---

## `queue_peek` <Badge type="info" text="v3.0.0" />

Peek at the front value without removing it.

If the queue is empty, returns `-1`.

```redscript
fn queue_peek(): int
```

**Returns:** Front value, or -1 if empty

**Example**

```redscript
let front: int = queue_peek()
```

---

## `queue_size` <Badge type="info" text="v3.0.0" />

Get the number of elements in the queue.

This is the count of un-popped elements: `raw_size - head`.

```redscript
fn queue_size(): int
```

**Returns:** Queue size

**Example**

```redscript
let n: int = queue_size()
```

---

## `queue_empty` <Badge type="info" text="v3.0.0" />

Check if the queue is empty.

```redscript
fn queue_empty(): int
```

**Returns:** 1 if empty, 0 otherwise

**Example**

```redscript
if (queue_empty() == 1) { }
```

---

## `queue_clear` <Badge type="info" text="v3.0.0" />

Clear all elements from the queue.

Resets `storage rs:arrays Queue` to an empty list and the head pointer to 0.

```redscript
fn queue_clear()
```

**Example**

```redscript
queue_clear()
```

---
