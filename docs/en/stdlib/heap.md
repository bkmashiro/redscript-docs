# `heap` — Min-heap and Max-heap priority queues

Import: `import "stdlib/heap.mcrs"`

Binary heap priority queues for RedScript datapacks. Provides both a **MinHeap** (root is the smallest element) and a **MaxHeap** (root is the largest element), backed by a fixed-capacity `int[]` of 65 slots (indices 0–64). `h[0]` stores the current size; elements live at `h[1]` through `h[size]`. Capacity: up to 64 elements.

## Functions

### `heap_new(): int[]`

Allocate a fresh heap array with `size = 0` and 64 pre-zeroed slots.

**Example:**
```rs
import "stdlib/heap.mcrs";
let h: int[] = heap_new();
```

---

### `heap_size(h: int[]): int`

Return the number of elements currently stored in the heap.

**Example:**
```rs
import "stdlib/heap.mcrs";
let h: int[] = heap_new();
h = heap_push(h, 7);
let n: int = heap_size(h);  // 1
```

---

### `heap_peek(h: int[]): int`

Return the root element without removing it. For a MinHeap this is the minimum; for a MaxHeap it is the maximum.

> **Precondition:** `heap_size(h) > 0`

**Example:**
```rs
import "stdlib/heap.mcrs";
let h: int[] = heap_new();
h = heap_push(h, 42);
h = heap_push(h, 7);
let top: int = heap_peek(h);  // 7  (min)
```

---

### `heap_push(h: int[], val: int): int[]`

Insert `val` into the MinHeap and return the updated heap. Maintains the heap property via sift-up.

**Example:**
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

Remove (and discard) the minimum element from the MinHeap. Returns the updated heap. Maintains the heap property via sift-down.

> **Precondition:** `heap_size(h) > 0`

**Example:**
```rs
import "stdlib/heap.mcrs";
let h: int[] = heap_new();
h = heap_push(h, 30);
h = heap_push(h, 10);
h = heap_pop(h);              // removes 10
let top: int = heap_peek(h);  // 30
```

---

### `max_heap_push(h: int[], val: int): int[]`

Insert `val` into the MaxHeap and return the updated heap. Sift-up uses a `>` comparison so the largest element floats to the root.

**Example:**
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

Remove (and discard) the maximum element from the MaxHeap. Returns the updated heap.

> **Precondition:** `heap_size(h) > 0`

**Example:**
```rs
import "stdlib/heap.mcrs";
let h: int[] = heap_new();
h = max_heap_push(h, 10);
h = max_heap_push(h, 99);
h = max_heap_pop(h);          // removes 99
let top: int = heap_peek(h);  // 10
```
