# `sort` — Sorting algorithms

Import: `import "stdlib/sort.mcrs"`

Sorting utilities for `int[]` arrays in RedScript datapacks. Provides in-place insertion sort (ascending and descending) and a merge helper for combining two already-sorted arrays. All functions require RedScript ≥ 2.4.0 for in-place index writes.

## Functions

### `insertion_sort(arr: int[], len: int)`

Sort `arr[0..len-1]` in **ascending** order in-place using insertion sort.

> **Complexity:** O(n²) — ideal for small n (≤ 64) and nearly-sorted data.

**Example:**
```rs
import "stdlib/sort.mcrs";
let data: int[] = [30, 10, 50, 20, 40];
insertion_sort(data, 5);
// data is now [10, 20, 30, 40, 50]
```

---

### `insertion_sort_desc(arr: int[], len: int)`

Sort `arr[0..len-1]` in **descending** order in-place using insertion sort.

> **Complexity:** O(n²)

**Example:**
```rs
import "stdlib/sort.mcrs";
let data: int[] = [30, 10, 50, 20, 40];
insertion_sort_desc(data, 5);
// data is now [50, 40, 30, 20, 10]
```

---

### `sort_merge(a: int[], la: int, b: int[], lb: int): int[]`

Merge two already-sorted arrays `a[0..la-1]` and `b[0..lb-1]` into a new sorted `int[]` of length `la + lb`. Neither input array is modified. Useful as the merge step when implementing merge sort with manual recursion.

**Example:**
```rs
import "stdlib/sort.mcrs";
let a: int[] = [10, 30, 50];
let b: int[] = [20, 40, 60];
let merged: int[] = sort_merge(a, 3, b, 3);
// merged is [10, 20, 30, 40, 50, 60]
```
