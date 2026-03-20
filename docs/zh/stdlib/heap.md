# `heap` — 小根堆与大根堆优先队列

导入：`import "stdlib/heap.mcrs"`

用于 RedScript datapack 的二叉堆优先队列。提供**小根堆**（根为最小元素）和**大根堆**（根为最大元素），底层使用固定容量的 `int[]`（65 个槽位，索引 0–64）。`h[0]` 存储当前大小；元素存储在 `h[1]` 到 `h[size]`。容量：最多 64 个元素。

## 函数

### `heap_new(): int[]`

分配一个新的堆数组，`size = 0`，64 个槽位预置为零。

**示例：**
```rs
import "stdlib/heap.mcrs";
let h: int[] = heap_new();
```

---

### `heap_size(h: int[]): int`

返回堆中当前存储的元素数量。

**示例：**
```rs
import "stdlib/heap.mcrs";
let h: int[] = heap_new();
h = heap_push(h, 7);
let n: int = heap_size(h);  // 1
```

---

### `heap_peek(h: int[]): int`

返回根元素但不将其移除。对于小根堆，根是最小值；对于大根堆，根是最大值。

> **前提条件：** `heap_size(h) > 0`

**示例：**
```rs
import "stdlib/heap.mcrs";
let h: int[] = heap_new();
h = heap_push(h, 42);
h = heap_push(h, 7);
let top: int = heap_peek(h);  // 7  (最小值)
```

---

### `heap_push(h: int[], val: int): int[]`

将 `val` 插入小根堆并返回更新后的堆。通过向上调整（sift-up）维护堆的性质。

**示例：**
```rs
import "stdlib/heap.mcrs";
let h: int[] = heap_new();
h = heap_push(h, 30);
h = heap_push(h, 10);
h = heap_push(h, 20);
let top: int = heap_peek(h);  // 10
```

---

### `heap_pop(h: int[]): int[]`

从小根堆中移除（并丢弃）最小元素。返回更新后的堆。通过向下调整（sift-down）维护堆的性质。

> **前提条件：** `heap_size(h) > 0`

**示例：**
```rs
import "stdlib/heap.mcrs";
let h: int[] = heap_new();
h = heap_push(h, 30);
h = heap_push(h, 10);
h = heap_pop(h);              // 移除 10
let top: int = heap_peek(h);  // 30
```

---

### `max_heap_push(h: int[], val: int): int[]`

将 `val` 插入大根堆并返回更新后的堆。向上调整使用 `>` 比较，使最大元素浮到根部。

**示例：**
```rs
import "stdlib/heap.mcrs";
let h: int[] = heap_new();
h = max_heap_push(h, 10);
h = max_heap_push(h, 99);
h = max_heap_push(h, 55);
let top: int = heap_peek(h);  // 99
```

---

### `max_heap_pop(h: int[]): int[]`

从大根堆中移除（并丢弃）最大元素。返回更新后的堆。

> **前提条件：** `heap_size(h) > 0`

**示例：**
```rs
import "stdlib/heap.mcrs";
let h: int[] = heap_new();
h = max_heap_push(h, 10);
h = max_heap_push(h, 99);
h = max_heap_pop(h);          // 移除 99
let top: int = heap_peek(h);  // 10
```
