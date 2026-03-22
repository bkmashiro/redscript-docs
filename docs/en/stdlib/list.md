# List

> Auto-generated from `src/stdlib/list.mcrs` — do not edit manually.

## API

- [sort2_min](#sort2-min)
- [sort2_max](#sort2-max)
- [list_min3](#list-min3)
- [list_max3](#list-max3)
- [list_min5](#list-min5)
- [list_max5](#list-max5)
- [list_sum5](#list-sum5)
- [list_sum4](#list-sum4)
- [list_sum3](#list-sum3)
- [avg3](#avg3)
- [avg5](#avg5)
- [sort3](#sort3)
- [weighted2](#weighted2)
- [weighted3](#weighted3)
- [sort4](#sort4)
- [sort5](#sort5)
- [list_sort_asc](#list-sort-asc)
- [list_sort_desc](#list-sort-desc)
- [list_sum](#list-sum)
- [list_avg](#list-avg)
- [list_min](#list-min)
- [list_max](#list-max)
- [list_contains](#list-contains)
- [list_index_of](#list-index-of)
- [list_shuffle](#list-shuffle)
- [list_dedup_count](#list-dedup-count)

---

## `sort2_min` <Badge type="info" text="v1.0.0" />

Return the smaller of two integers.

```redscript
fn sort2_min(a: int, b: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | First value |
| `b` | Second value |

**Returns:** a if a ≤ b, otherwise b

---

## `sort2_max` <Badge type="info" text="v1.0.0" />

Return the larger of two integers.

```redscript
fn sort2_max(a: int, b: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | First value |
| `b` | Second value |

**Returns:** a if a ≥ b, otherwise b

---

## `list_min3` <Badge type="info" text="v1.0.0" />

Minimum of three integers.

```redscript
fn list_min3(a: int, b: int, c: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | First value |
| `b` | Second value |
| `c` | Third value |

**Returns:** The smallest of a, b, c

---

## `list_max3` <Badge type="info" text="v1.0.0" />

Maximum of three integers.

```redscript
fn list_max3(a: int, b: int, c: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | First value |
| `b` | Second value |
| `c` | Third value |

**Returns:** The largest of a, b, c

---

## `list_min5` <Badge type="info" text="v1.0.0" />

Minimum of five integers.

```redscript
fn list_min5(a: int, b: int, c: int, d: int, e: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | Value 1 |
| `b` | Value 2 |
| `c` | Value 3 |
| `d` | Value 4 |
| `e` | Value 5 |

**Returns:** The smallest of the five inputs

---

## `list_max5` <Badge type="info" text="v1.0.0" />

Maximum of five integers.

```redscript
fn list_max5(a: int, b: int, c: int, d: int, e: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | Value 1 |
| `b` | Value 2 |
| `c` | Value 3 |
| `d` | Value 4 |
| `e` | Value 5 |

**Returns:** The largest of the five inputs

---

## `list_sum5` <Badge type="info" text="v1.0.0" />

Sum of five integers.

```redscript
fn list_sum5(a: int, b: int, c: int, d: int, e: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | Value 1 |
| `b` | Value 2 |
| `c` | Value 3 |
| `d` | Value 4 |
| `e` | Value 5 |

**Returns:** a + b + c + d + e

---

## `list_sum4` <Badge type="info" text="v1.0.0" />

Sum of four integers.

```redscript
fn list_sum4(a: int, b: int, c: int, d: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | Value 1 |
| `b` | Value 2 |
| `c` | Value 3 |
| `d` | Value 4 |

**Returns:** a + b + c + d

---

## `list_sum3` <Badge type="info" text="v1.0.0" />

Sum of three integers.

```redscript
fn list_sum3(a: int, b: int, c: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | Value 1 |
| `b` | Value 2 |
| `c` | Value 3 |

**Returns:** a + b + c

---

## `avg3` <Badge type="info" text="v1.0.0" />

Integer average of three values (truncates toward zero).

```redscript
fn avg3(a: int, b: int, c: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | Value 1 |
| `b` | Value 2 |
| `c` | Value 3 |

**Returns:** (a + b + c) / 3

---

## `avg5` <Badge type="info" text="v1.0.0" />

Integer average of five values (truncates toward zero).

```redscript
fn avg5(a: int, b: int, c: int, d: int, e: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | Value 1 |
| `b` | Value 2 |
| `c` | Value 3 |
| `d` | Value 4 |
| `e` | Value 5 |

**Returns:** (a + b + c + d + e) / 5

---

## `sort3` <Badge type="info" text="v1.0.0" />

Sort three values and return the one at position `pos` (0 = min, 1 = mid, 2 = max).

```redscript
fn sort3(a: int, b: int, c: int, pos: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | Value 1 |
| `b` | Value 2 |
| `c` | Value 3 |
| `pos` | Desired position in sorted order (0, 1, or 2) |

**Returns:** The value at the requested sorted position

---

## `weighted2` <Badge type="info" text="v1.0.0" />

Weighted random choice between two options (0 or 1) using an LCG seed.

```redscript
fn weighted2(seed: int, w0: int, w1: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `seed` | LCG seed (any integer) |
| `w0` | Weight for option 0 (must be > 0) |
| `w1` | Weight for option 1 (must be > 0) |

**Returns:** 0 with probability w0/(w0+w1), 1 otherwise

---

## `weighted3` <Badge type="info" text="v1.0.0" />

Weighted random choice among three options (0, 1, or 2) using an LCG seed.

```redscript
fn weighted3(seed: int, w0: int, w1: int, w2: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `seed` | LCG seed (any integer) |
| `w0` | Weight for option 0 |
| `w1` | Weight for option 1 |
| `w2` | Weight for option 2 |

**Returns:** 0, 1, or 2 proportional to the respective weights

---

## `sort4` <Badge type="info" text="v1.0.0" />

Sort four values using an optimal 5-comparison sorting network, returning the value at `pos`.

```redscript
fn sort4(a: int, b: int, c: int, d: int, pos: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | Value 1 |
| `b` | Value 2 |
| `c` | Value 3 |
| `d` | Value 4 |
| `pos` | Desired position in sorted order (0 = min, 3 = max) |

**Returns:** The value at the requested sorted position

---

## `sort5` <Badge type="info" text="v1.0.0" />

Sort five values using a 9-comparison Batcher odd-even merge sort network, returning the value at `pos`.

```redscript
fn sort5(a: int, b: int, c: int, d: int, e: int, pos: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | Value 1 |
| `b` | Value 2 |
| `c` | Value 3 |
| `d` | Value 4 |
| `e` | Value 5 |
| `pos` | Desired position in sorted order (0 = min, 4 = max) |

**Returns:** The value at the requested sorted position

---

## `list_sort_asc` <Badge type="info" text="v1.0.0" />

In-place ascending bubble sort for an array of any length.
Requires RedScript ≥ 2.4.0 (array parameter passed by reference).

```redscript
fn list_sort_asc(arr: int[], len: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `arr` | Array to sort (modified in-place) |
| `len` | Number of elements to sort |

---

## `list_sort_desc` <Badge type="info" text="v1.0.0" />

In-place descending bubble sort for an array of any length.
Requires RedScript ≥ 2.4.0 (array parameter passed by reference).

```redscript
fn list_sort_desc(arr: int[], len: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `arr` | Array to sort (modified in-place) |
| `len` | Number of elements to sort |

---

## `list_sum` <Badge type="info" text="v1.0.0" />

Sum all elements of an array.

```redscript
fn list_sum(arr: int[], len: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `arr` | Input array |
| `len` | Number of elements |

**Returns:** Sum of arr[0..len)

---

## `list_avg` <Badge type="info" text="v1.0.0" />

Arithmetic mean of an array as fixed-point × 10000.

```redscript
fn list_avg(arr: int[], len: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `arr` | Input array |
| `len` | Number of elements (must be > 0) |

**Returns:** (sum × 10000) / len; returns 0 for empty array

---

## `list_min` <Badge type="info" text="v1.0.0" />

Minimum element in an array.

```redscript
fn list_min(arr: int[], len: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `arr` | Input array (must have at least one element) |
| `len` | Number of elements |

**Returns:** Smallest value in arr[0..len)

---

## `list_max` <Badge type="info" text="v1.0.0" />

Maximum element in an array.

```redscript
fn list_max(arr: int[], len: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `arr` | Input array (must have at least one element) |
| `len` | Number of elements |

**Returns:** Largest value in arr[0..len)

---

## `list_contains` <Badge type="info" text="v1.0.0" />

Test whether a value exists in an array.

```redscript
fn list_contains(arr: int[], len: int, val: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `arr` | Input array |
| `len` | Number of elements |
| `val` | Value to search for |

**Returns:** 1 if val is found, 0 otherwise

---

## `list_index_of` <Badge type="info" text="v1.0.0" />

Find the first index of a value in an array.

```redscript
fn list_index_of(arr: int[], len: int, val: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `arr` | Input array |
| `len` | Number of elements |
| `val` | Value to search for |

**Returns:** First index of val, or -1 if not found

---

## `list_shuffle` <Badge type="info" text="v1.0.0" />

Fisher-Yates in-place shuffle using a linear congruential generator.

```redscript
fn list_shuffle(arr: int[], len: int, seed: int): int[]
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `arr` | Array to shuffle (modified in-place) |
| `len` | Number of elements |
| `seed` | Initial LCG seed (any integer) |

**Returns:** The shuffled array (same reference as arr)

---

## `list_dedup_count` <Badge type="info" text="v1.0.0" />

Count the number of unique values in an array (O(n²); suitable for small arrays).

```redscript
fn list_dedup_count(arr: int[], len: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `arr` | Input array |
| `len` | Number of elements |

**Returns:** Count of distinct values in arr[0..len)

---
