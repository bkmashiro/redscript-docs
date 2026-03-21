# `sort` — 排序算法

导入：`import "stdlib/sort.mcrs"`

面向 RedScript datapack 的 `int[]` 数组排序工具。提供原地插入排序（升序和降序）以及用于合并两个已排序数组的辅助函数。所有函数都要求 RedScript ≥ 2.4.0，以支持数组下标原地写入。

## 函数

### `insertion_sort(arr: int[], len: int)`

使用插入排序对 `arr[0..len-1]` 执行**升序**原地排序。

> **复杂度：** O(n²)；适合小规模数据（≤ 64）或几乎有序的数据。

**示例：**
```rs
import "stdlib/sort.mcrs";
let data: int[] = [30, 10, 50, 20, 40];
insertion_sort(data, 5);
// data 现在是 [10, 20, 30, 40, 50]
```

---

### `insertion_sort_desc(arr: int[], len: int)`

使用插入排序对 `arr[0..len-1]` 执行**降序**原地排序。

> **复杂度：** O(n²)

**示例：**
```rs
import "stdlib/sort.mcrs";
let data: int[] = [30, 10, 50, 20, 40];
insertion_sort_desc(data, 5);
// data 现在是 [50, 40, 30, 20, 10]
```

---

### `sort_merge(a: int[], la: int, b: int[], lb: int): int[]`

将两个已排序数组 `a[0..la-1]` 与 `b[0..lb-1]` 合并为一个新的升序 `int[]`，长度为 `la + lb`。不会修改输入数组。适合在手写 merge sort 时用作 merge 步骤。

**示例：**
```rs
import "stdlib/sort.mcrs";
let a: int[] = [10, 30, 50];
let b: int[] = [20, 40, 60];
let merged: int[] = sort_merge(a, 3, b, 3);
// merged 是 [10, 20, 30, 40, 50, 60]
```

---

### `merge_sort_coro(arr: int[], n: int)` _(coroutine)_

使用**自底向上归并排序**对 `arr[0..n-1]` 进行升序原地排序，并通过 `@coroutine` 将工作分散到多个 tick 中。

> **复杂度：** O(n log n) 时间，O(n) 临时空间。  
> **Tick 开销：** 每 tick 执行一个 merge pass；数组会在 ⌈log₂(n)⌉ 个 tick 后完全排序。

这是大数组场景下比 `insertion_sort` 更适合服务器的方案。每个 tick 完成一次当前宽度的全量相邻段合并，避免一次性排序造成卡顿。

**工作流程（自底向上迭代归并排序）：**

```text
width = 1
while width < n:
    for each adjacent pair [left..mid) and [mid..right) of size width:
        merge in-place using a scratch array
    width *= 2
    ← yield（下一个 tick 从这里继续）
```

**签名：**

```rs
@coroutine(batch=1, onDone=merge_sort_noop)
fn merge_sort_coro(arr: int[], n: int)
```

**示例：**

```rs
import "stdlib/sort.mcrs";

let data: int[] = [30, 10, 50, 20, 40];
merge_sort_coro(data, 5);
// 约 3 个 tick 后，data 变为 [10, 20, 30, 40, 50]
```

## 说明

- `arr` 会被原地修改；不会返回新数组。
- `n` 必须等于 `arr.len()` 或更小（可只排序前 `n` 个元素）。
- 每轮合并会使用临时 `int[]` scratch 数组，这是标准的 RedScript 堆分配行为。
- 可以采用混合策略：`n ≤ 64` 用 `insertion_sort`，更大数组用 `merge_sort_coro`。
- `merge_sort_noop` 是内置的空 `onDone` 回调；如果你需要排序完成信号，可以替换装饰器里的回调函数。
