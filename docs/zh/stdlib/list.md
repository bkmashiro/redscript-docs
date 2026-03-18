# `list` — 数组聚合与排序

Import: `import list;`

数组工具库，包含最多 5 个值的静态 min/max/avg/sum 辅助函数、2–5 个值的最优排序网络、加权随机选择、动态排序（冒泡排序升序/降序）以及任意长度数组的聚合操作（sum、avg、min、max、contains、index_of、shuffle、dedup 计数）。

> **Note:** Dynamic array functions (those taking `arr: int[]`) require RedScript ≥ 2.4.0 (array parameter by reference).

## Functions

### `sort2_min(a: int, b: int): int`

两值中的最小值。

### `sort2_max(a: int, b: int): int`

两值中的最大值。

### `list_min3(a: int, b: int, c: int): int`

三值中的最小值。

### `list_max3(a: int, b: int, c: int): int`

三值中的最大值。

### `list_min5(a: int, b: int, c: int, d: int, e: int): int`

五值中的最小值。

### `list_max5(a: int, b: int, c: int, d: int, e: int): int`

五值中的最大值。

### `list_sum3(a: int, b: int, c: int): int`

三值之和。

### `list_sum4(a: int, b: int, c: int, d: int): int`

四值之和。

### `list_sum5(a: int, b: int, c: int, d: int, e: int): int`

五值之和。

### `avg3(a: int, b: int, c: int): int`

三值整数均值。

### `avg5(a: int, b: int, c: int, d: int, e: int): int`

五值整数均值。

---

### `sort3(a: int, b: int, c: int, pos: int): int`

对三个值排序，返回排序后位置 `pos` 处的值（0=最小，1=中间，2=最大）。使用 3 次比较排序网络。

**Example:**
```rs
import list;
let median: int = sort3(30, 10, 20, 1);  // 20
```

---

### `sort4(a: int, b: int, c: int, d: int, pos: int): int`

对四个值排序，返回排序后位置 `pos` 处的值（0=最小，3=最大）。使用 5 次比较最优排序网络。

---

### `sort5(a: int, b: int, c: int, d: int, e: int, pos: int): int`

对五个值排序，返回排序后位置 `pos` 处的值。使用 9 次比较排序网络（Batcher 奇偶归并）。

---

### `weighted2(seed: int, w0: int, w1: int): int`

按权重 `w0`、`w1` 选择 0 或 1，返回所选索引。使用来自 `seed` 的 LCG。

**Example:**
```rs
import list;
let choice: int = weighted2(12345, 70, 30);  // 70% 概率选 0，30% 概率选 1
```

---

### `weighted3(seed: int, w0: int, w1: int, w2: int): int`

按给定权重选择 0、1 或 2，返回所选索引。

---

### `list_sort_asc(arr: int[], len: int)`

> **Cost:** O(n²) — bubble sort

对 `len` 个元素原地升序冒泡排序。

**Example:**
```rs
import list;
let nums: int[] = [30, 10, 20];
list_sort_asc(nums, 3);  // [10, 20, 30]
```

---

### `list_sort_desc(arr: int[], len: int)`

> **Cost:** O(n²) — bubble sort

对 `len` 个元素原地降序冒泡排序。

---

### `list_sum(arr: int[], len: int): int`

> **Cost:** O(n)

`arr` 中所有 `len` 个元素之和。

---

### `list_avg(arr: int[], len: int): int`

> **Cost:** O(n)

算术均值 ×10000（定点数）。返回 `(sum × 10000) / len`。空数组返回 0。

---

### `list_min(arr: int[], len: int): int`

> **Cost:** O(n)

`arr` 中的最小元素。

---

### `list_max(arr: int[], len: int): int`

> **Cost:** O(n)

`arr` 中的最大元素。

---

### `list_contains(arr: int[], len: int, val: int): int`

> **Cost:** O(n)

若 `val` 在 `arr` 中则返回 1，否则返回 0。

---

### `list_index_of(arr: int[], len: int, val: int): int`

> **Cost:** O(n)

`val` 在 `arr` 中第一次出现的索引，未找到返回 -1。

---

### `list_shuffle(arr: int[], len: int, seed: int): int[]`

> **Cost:** O(n)

使用 LCG 随机数原地 Fisher-Yates 洗牌。返回 `arr`。使用 `random` 中的 `next_lcg`。

**Example:**
```rs
import list;
let deck: int[] = [1, 2, 3, 4, 5];
list_shuffle(deck, 5, 99999);
```

---

### `list_dedup_count(arr: int[], len: int): int`

> **Cost:** O(n²) — suitable for small arrays

统计 `arr` 中唯一值的数量。
