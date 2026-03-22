# Sort

> Auto-generated from `src/stdlib/sort.mcrs` — do not edit manually.

## API

- [insertion_sort](#insertion-sort)
- [insertion_sort_desc](#insertion-sort-desc)
- [sort_merge](#sort-merge)
- [merge_sort_noop](#merge-sort-noop)

---

## `insertion_sort` <Badge type="info" text="Since v1.0.0" />

Sort an integer array ascending in-place using insertion sort.

```redscript
fn insertion_sort(arr: int[], len: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `arr` | Integer array to sort (mutated in-place) |
| `len` | Number of elements to sort (arr[0..len-1]) |

**Returns:** void — arr is sorted ascending after this call

**Example**

```redscript
let data: int[] = [30, 10, 50, 20]
insertion_sort(data, 4)
// data is now [10, 20, 30, 50]
```

---

## `insertion_sort_desc` <Badge type="info" text="Since v1.0.0" />

Sort an integer array descending in-place using insertion sort.

```redscript
fn insertion_sort_desc(arr: int[], len: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `arr` | Integer array to sort (mutated in-place) |
| `len` | Number of elements to sort (arr[0..len-1]) |

**Returns:** void — arr is sorted descending after this call

**Example**

```redscript
let scores: int[] = [30, 10, 50, 20]
insertion_sort_desc(scores, 4)
// scores is now [50, 30, 20, 10]
```

---

## `sort_merge` <Badge type="info" text="Since v1.0.0" />

Merge two sorted integer arrays into a new sorted array.

```redscript
fn sort_merge(a: int[], la: int, b: int[], lb: int): int[]
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | First sorted array |
| `la` | Number of elements in a (a[0..la-1]) |
| `b` | Second sorted array |
| `lb` | Number of elements in b (b[0..lb-1]) |

**Returns:** New sorted int[] of length la+lb containing all elements of a and b

**Example**

```redscript
let merged: int[] = sort_merge([1, 3, 5], 3, [2, 4, 6], 3)
// result: [1, 2, 3, 4, 5, 6]
```

---

## `merge_sort_noop` <Badge type="info" text="Since v1.0.0" />

Default no-op callback for merge_sort_coro. Replace with your own handler to react when sorting completes.

```redscript
fn merge_sort_noop()
```

---
