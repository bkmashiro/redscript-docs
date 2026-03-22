# Heap

> 本文档由 `src/stdlib/heap.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [heap_new](#heap-new)
- [heap_size](#heap-size)
- [heap_peek](#heap-peek)
- [heap_push](#heap-push)
- [heap_pop](#heap-pop)
- [max_heap_push](#max-heap-push)
- [max_heap_pop](#max-heap-pop)

---

## `heap_new` <Badge type="info" text="Since v1.0.0" />

分配一个可容纳 64 个元素的新空堆

```redscript
fn heap_new(): int[]
```

**返回：** int[]，h[0]=0（大小），h[1..64] 预分配为零

**示例**

```redscript
let h: int[] = heap_new()
```

---

## `heap_size` <Badge type="info" text="Since v1.0.0" />

返回堆中当前存储的元素数量

```redscript
fn heap_size(h: int[]): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `h` | 由 heap_new 创建的堆数组 |

**返回：** 当前元素数量（h[0]）

**示例**

```redscript
let sz: int = heap_size(h)
```

---

## `heap_peek` <Badge type="info" text="Since v1.0.0" />

查看堆顶元素但不移除（最小堆返回最小值，最大堆返回最大值）

```redscript
fn heap_peek(h: int[]): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `h` | 非空堆数组；前置条件：heap_size(h) > 0 |

**返回：** 堆顶元素（h[1]）

**示例**

```redscript
let top: int = heap_peek(h)  // peek min without modifying heap
```

---

## `heap_push` <Badge type="info" text="Since v1.0.0" />

向最小堆插入一个值

```redscript
fn heap_push(h: int[], val: int): int[]
```

**参数**

| 参数 | 说明 |
|------|------|
| `h` | 由 heap_new 创建的堆数组 |
| `val` | 要插入的值 |

**返回：** 保持堆属性的更新堆数组

**示例**

```redscript
h = heap_push(h, 42)
h = heap_push(h, 7)
// heap_peek(h) == 7
```

---

## `heap_pop` <Badge type="info" text="Since v1.0.0" />

移除并丢弃最小堆的最小元素

```redscript
fn heap_pop(h: int[]): int[]
```

**参数**

| 参数 | 说明 |
|------|------|
| `h` | 非空最小堆；前置条件：heap_size(h) > 0 |

**返回：** 移除最小值并恢复堆属性的更新堆数组

**示例**

```redscript
let min_val: int = heap_peek(h)
h = heap_pop(h)  // remove the minimum
```

---

## `max_heap_push` <Badge type="info" text="Since v1.0.0" />

向最大堆插入一个值

```redscript
fn max_heap_push(h: int[], val: int): int[]
```

**参数**

| 参数 | 说明 |
|------|------|
| `h` | 由 heap_new 创建的堆数组 |
| `val` | 要插入的值 |

**返回：** 保持最大堆属性的更新堆数组

**示例**

```redscript
h = max_heap_push(h, 5)
h = max_heap_push(h, 99)
// heap_peek(h) == 99
```

---

## `max_heap_pop` <Badge type="info" text="Since v1.0.0" />

移除并丢弃最大堆的最大元素

```redscript
fn max_heap_pop(h: int[]): int[]
```

**参数**

| 参数 | 说明 |
|------|------|
| `h` | 非空最大堆；前置条件：heap_size(h) > 0 |

**返回：** 移除最大值并恢复最大堆属性的更新堆数组

**示例**

```redscript
let max_val: int = heap_peek(h)
h = max_heap_pop(h)  // remove the maximum
```

---
