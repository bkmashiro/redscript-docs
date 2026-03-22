# Sort

> 本文档由 `src/stdlib/sort.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [insertion_sort](#insertion-sort)
- [insertion_sort_desc](#insertion-sort-desc)
- [sort_merge](#sort-merge)
- [merge_sort_noop](#merge-sort-noop)

---

## `insertion_sort` <Badge type="info" text="Since v1.0.0" />

就地升序排序整数数组（插入排序，O(n²)，适合 n≤64）

```redscript
fn insertion_sort(arr: int[], len: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `arr` | 要排序的整数数组（就地修改） |
| `len` | 要排序的元素数量（arr[0..len-1]） |

**返回：** void — 调用后 arr 升序排列

**示例**

```redscript
let data: int[] = [30, 10, 50, 20]
insertion_sort(data, 4)
// data is now [10, 20, 30, 50]
```

---

## `insertion_sort_desc` <Badge type="info" text="Since v1.0.0" />

就地降序排序整数数组（插入排序）

```redscript
fn insertion_sort_desc(arr: int[], len: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `arr` | 要排序的整数数组（就地修改） |
| `len` | 要排序的元素数量 |

**返回：** void — 调用后 arr 降序排列

**示例**

```redscript
let scores: int[] = [30, 10, 50, 20]
insertion_sort_desc(scores, 4)
// scores is now [50, 30, 20, 10]
```

---

## `sort_merge` <Badge type="info" text="Since v1.0.0" />

将两个已排序数组合并为一个新的排序数组

```redscript
fn sort_merge(a: int[], la: int, b: int[], lb: int): int[]
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 第一个已排序数组 |
| `la` | a 的元素数量 |
| `b` | 第二个已排序数组 |
| `lb` | b 的元素数量 |

**返回：** 包含 a 和 b 所有元素的新排序 int[]，长度 la+lb

**示例**

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
