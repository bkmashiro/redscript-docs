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

---

### `merge_sort_coro(arr: int[], n: int)` _(coroutine)_

Sort `arr[0..n-1]` ascending in-place using **bottom-up merge sort**, spread across server ticks via `@coroutine`.

> **Complexity:** O(n log n) time, O(n) scratch space.  
> **Tick cost:** 1 merge pass per tick — array is fully sorted after ⌈log₂(n)⌉ ticks.

This is the server-friendly alternative to `insertion_sort` for large arrays. Each tick performs one full width-doubling pass (merging all adjacent run pairs of the current width). Because the work is spread across ticks, it never causes a lag spike regardless of array size.

**How it works (bottom-up iterative merge sort):**

```
width = 1
while width < n:
    for each adjacent pair [left..mid) and [mid..right) of size width:
        merge in-place using a scratch array
    width *= 2
    ← yield (next tick resumes here)
```

**Signature:**

```rs
@coroutine(batch=1, onDone=merge_sort_noop)
fn merge_sort_coro(arr: int[], n: int)
```

**Example:**

```rs
import "stdlib/sort.mcrs";

let data: int[] = [30, 10, 50, 20, 40];
merge_sort_coro(data, 5);
// After ~3 ticks, data is [10, 20, 30, 40, 50]
```

**With a completion callback:**

```rs
import "stdlib/sort.mcrs";

fn on_sorted() {
    // data is fully sorted here — safe to use
}

// Replace onDone by wrapping or copying merge_sort_coro with your own callback
// (RedScript @coroutine onDone is set at definition time)
```

**Notes:**

- `arr` is mutated in-place; no new array is returned.
- `n` must equal `arr.len()` or less (partial sort of first `n` elements).
- Uses a temporary scratch `int[]` per merge segment — standard RedScript heap allocation.
- Pair with `insertion_sort` for hybrid strategies: use `insertion_sort` for n ≤ 64, `merge_sort_coro` for larger arrays.
- `merge_sort_noop` is the built-in no-op `onDone` callback; define your own function and swap the decorator if you need a done signal.
