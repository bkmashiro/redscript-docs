# Heap

> Auto-generated from `src/stdlib/heap.mcrs` — do not edit manually.

## API

- [heap_new](#heap-new)
- [heap_size](#heap-size)
- [heap_peek](#heap-peek)
- [heap_push](#heap-push)
- [heap_pop](#heap-pop)
- [max_heap_push](#max-heap-push)
- [max_heap_pop](#max-heap-pop)

---

## `heap_new` <Badge type="info" text="v1.0.0" />

Allocate a new empty heap with capacity for 64 elements.

```redscript
fn heap_new(): int[]
```

**Returns:** int[] with h[0]=0 (size) and h[1..64] pre-allocated as zeros

**Example**

```redscript
let h: int[] = heap_new()
```

---

## `heap_size` <Badge type="info" text="v1.0.0" />

Return the number of elements currently stored in the heap.

```redscript
fn heap_size(h: int[]): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `h` | Heap array (created with heap_new) |

**Returns:** Current element count (h[0])

**Example**

```redscript
let sz: int = heap_size(h)
```

---

## `heap_peek` <Badge type="info" text="v1.0.0" />

Return the root element without removing it (min for MinHeap, max for MaxHeap).

```redscript
fn heap_peek(h: int[]): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `h` | Non-empty heap array; precondition: heap_size(h) > 0 |

**Returns:** The root element (h[1])

**Example**

```redscript
let top: int = heap_peek(h)  // peek min without modifying heap
```

---

## `heap_push` <Badge type="info" text="v1.0.0" />

Insert a value into a MinHeap (smallest element at root).

```redscript
fn heap_push(h: int[], val: int): int[]
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `h` | Heap array (from heap_new) |
| `val` | Value to insert |

**Returns:** Updated heap array with val inserted and heap property maintained

**Example**

```redscript
h = heap_push(h, 42)
h = heap_push(h, 7)
// heap_peek(h) == 7
```

---

## `heap_pop` <Badge type="info" text="v1.0.0" />

Remove and discard the minimum element from a MinHeap.

```redscript
fn heap_pop(h: int[]): int[]
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `h` | Non-empty MinHeap array; precondition: heap_size(h) > 0 |

**Returns:** Updated heap array with minimum removed and heap property restored

**Example**

```redscript
let min_val: int = heap_peek(h)
h = heap_pop(h)  // remove the minimum
```

---

## `max_heap_push` <Badge type="info" text="v1.0.0" />

Insert a value into a MaxHeap (largest element at root).

```redscript
fn max_heap_push(h: int[], val: int): int[]
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `h` | Heap array (from heap_new) |
| `val` | Value to insert |

**Returns:** Updated heap array with val inserted and max-heap property maintained

**Example**

```redscript
h = max_heap_push(h, 5)
h = max_heap_push(h, 99)
// heap_peek(h) == 99
```

---

## `max_heap_pop` <Badge type="info" text="v1.0.0" />

Remove and discard the maximum element from a MaxHeap.

```redscript
fn max_heap_pop(h: int[]): int[]
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `h` | Non-empty MaxHeap array; precondition: heap_size(h) > 0 |

**Returns:** Updated heap array with maximum removed and max-heap property restored

**Example**

```redscript
let max_val: int = heap_peek(h)
h = max_heap_pop(h)  // remove the maximum
```

---
