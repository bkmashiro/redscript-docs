# List

> 本文档由 `src/stdlib/list.mcrs` 自动生成，请勿手动编辑。

## API 列表

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

返回两个整数中较小的一个。

```redscript
fn sort2_min(a: int, b: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 第一个值 |
| `b` | 第二个值 |

**返回：** a ≤ b 则返回 a，否则返回 b

---

## `sort2_max` <Badge type="info" text="v1.0.0" />

返回两个整数中较大的一个。

```redscript
fn sort2_max(a: int, b: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 第一个值 |
| `b` | 第二个值 |

**返回：** a ≥ b 则返回 a，否则返回 b

---

## `list_min3` <Badge type="info" text="v1.0.0" />

三个整数中的最小值。

```redscript
fn list_min3(a: int, b: int, c: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 值 1 |
| `b` | 值 2 |
| `c` | 值 3 |

**返回：** a、b、c 中的最小值

---

## `list_max3` <Badge type="info" text="v1.0.0" />

三个整数中的最大值。

```redscript
fn list_max3(a: int, b: int, c: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 值 1 |
| `b` | 值 2 |
| `c` | 值 3 |

**返回：** a、b、c 中的最大值

---

## `list_min5` <Badge type="info" text="v1.0.0" />

五个整数中的最小值。

```redscript
fn list_min5(a: int, b: int, c: int, d: int, e: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 值 1 |
| `b` | 值 2 |
| `c` | 值 3 |
| `d` | 值 4 |
| `e` | 值 5 |

**返回：** 五个输入中的最小值

---

## `list_max5` <Badge type="info" text="v1.0.0" />

五个整数中的最大值。

```redscript
fn list_max5(a: int, b: int, c: int, d: int, e: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 值 1 |
| `b` | 值 2 |
| `c` | 值 3 |
| `d` | 值 4 |
| `e` | 值 5 |

**返回：** 五个输入中的最大值

---

## `list_sum5` <Badge type="info" text="v1.0.0" />

五个整数之和。

```redscript
fn list_sum5(a: int, b: int, c: int, d: int, e: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 值 1 |
| `b` | 值 2 |
| `c` | 值 3 |
| `d` | 值 4 |
| `e` | 值 5 |

**返回：** a + b + c + d + e

---

## `list_sum4` <Badge type="info" text="v1.0.0" />

四个整数之和。

```redscript
fn list_sum4(a: int, b: int, c: int, d: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 值 1 |
| `b` | 值 2 |
| `c` | 值 3 |
| `d` | 值 4 |

**返回：** a + b + c + d

---

## `list_sum3` <Badge type="info" text="v1.0.0" />

三个整数之和。

```redscript
fn list_sum3(a: int, b: int, c: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 值 1 |
| `b` | 值 2 |
| `c` | 值 3 |

**返回：** a + b + c

---

## `avg3` <Badge type="info" text="v1.0.0" />

三个值的整数均值（向零截断）。

```redscript
fn avg3(a: int, b: int, c: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 值 1 |
| `b` | 值 2 |
| `c` | 值 3 |

**返回：** (a + b + c) / 3

---

## `avg5` <Badge type="info" text="v1.0.0" />

五个值的整数均值（向零截断）。

```redscript
fn avg5(a: int, b: int, c: int, d: int, e: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 值 1 |
| `b` | 值 2 |
| `c` | 值 3 |
| `d` | 值 4 |
| `e` | 值 5 |

**返回：** (a + b + c + d + e) / 5

---

## `sort3` <Badge type="info" text="v1.0.0" />

对三个值排序，返回指定位置的值（0 = 最小，1 = 中间，2 = 最大）。

```redscript
fn sort3(a: int, b: int, c: int, pos: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 值 1 |
| `b` | 值 2 |
| `c` | 值 3 |
| `pos` | 排序后的位置（0、1 或 2） |

**返回：** 指定排序位置的值

---

## `weighted2` <Badge type="info" text="v1.0.0" />

利用 LCG 种子在两个选项（0 或 1）间做加权随机选择。

```redscript
fn weighted2(seed: int, w0: int, w1: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `seed` | LCG 种子（任意整数） |
| `w0` | 选项 0 的权重 |
| `w1` | 选项 1 的权重 |

**返回：** 以概率 w0/(w0+w1) 返回 0，否则返回 1

---

## `weighted3` <Badge type="info" text="v1.0.0" />

利用 LCG 种子在三个选项（0、1 或 2）间做加权随机选择。

```redscript
fn weighted3(seed: int, w0: int, w1: int, w2: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `seed` | LCG 种子 |
| `w0` | 选项 0 的权重 |
| `w1` | 选项 1 的权重 |
| `w2` | 选项 2 的权重 |

**返回：** 按权重比例返回 0、1 或 2

---

## `sort4` <Badge type="info" text="v1.0.0" />

使用 5 次比较的最优排序网络对四个值排序，返回指定位置的值。

```redscript
fn sort4(a: int, b: int, c: int, d: int, pos: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 值 1 |
| `b` | 值 2 |
| `c` | 值 3 |
| `d` | 值 4 |
| `pos` | 排序后的位置（0 = 最小，3 = 最大） |

**返回：** 指定排序位置的值

---

## `sort5` <Badge type="info" text="v1.0.0" />

使用 9 次比较的 Batcher 奇偶归并排序网络对五个值排序，返回指定位置的值。

```redscript
fn sort5(a: int, b: int, c: int, d: int, e: int, pos: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 值 1 |
| `b` | 值 2 |
| `c` | 值 3 |
| `d` | 值 4 |
| `e` | 值 5 |
| `pos` | 排序后的位置（0 = 最小，4 = 最大） |

**返回：** 指定排序位置的值

---

## `list_sort_asc` <Badge type="info" text="v1.0.0" />

原地升序冒泡排序（任意长度）。需要 RedScript ≥ 2.4.0（数组引用传参）。

```redscript
fn list_sort_asc(arr: int[], len: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `arr` | 待排序数组（原地修改） |
| `len` | 要排序的元素数量 |

**返回：** 无返回值

---

## `list_sort_desc` <Badge type="info" text="v1.0.0" />

原地降序冒泡排序（任意长度）。需要 RedScript ≥ 2.4.0。

```redscript
fn list_sort_desc(arr: int[], len: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `arr` | 待排序数组（原地修改） |
| `len` | 要排序的元素数量 |

**返回：** 无返回值

---

## `list_sum` <Badge type="info" text="v1.0.0" />

数组所有元素之和。

```redscript
fn list_sum(arr: int[], len: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `arr` | 输入数组 |
| `len` | 元素数量 |

**返回：** arr[0..len) 的总和

---

## `list_avg` <Badge type="info" text="v1.0.0" />

数组算术均值，返回定点数 ×10000。

```redscript
fn list_avg(arr: int[], len: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `arr` | 输入数组 |
| `len` | 元素数量（须 > 0） |

**返回：** (sum ×10000) / len；空数组返回 0

---

## `list_min` <Badge type="info" text="v1.0.0" />

数组中的最小元素（数组至少有一个元素）。

```redscript
fn list_min(arr: int[], len: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `arr` | 输入数组 |
| `len` | 元素数量 |

**返回：** arr[0..len) 中的最小值

---

## `list_max` <Badge type="info" text="v1.0.0" />

数组中的最大元素（数组至少有一个元素）。

```redscript
fn list_max(arr: int[], len: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `arr` | 输入数组 |
| `len` | 元素数量 |

**返回：** arr[0..len) 中的最大值

---

## `list_contains` <Badge type="info" text="v1.0.0" />

检查数组中是否存在某个值。

```redscript
fn list_contains(arr: int[], len: int, val: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `arr` | 输入数组 |
| `len` | 元素数量 |
| `val` | 要搜索的值 |

**返回：** 找到返回 1，否则返回 0

---

## `list_index_of` <Badge type="info" text="v1.0.0" />

查找值在数组中第一次出现的索引。

```redscript
fn list_index_of(arr: int[], len: int, val: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `arr` | 输入数组 |
| `len` | 元素数量 |
| `val` | 要搜索的值 |

**返回：** 第一个索引，未找到返回 -1

---

## `list_shuffle` <Badge type="info" text="v1.0.0" />

Fisher-Yates 原地随机打乱，使用线性同余生成器。

```redscript
fn list_shuffle(arr: int[], len: int, seed: int): int[]
```

**参数**

| 参数 | 说明 |
|------|------|
| `arr` | 待打乱数组（原地修改） |
| `len` | 元素数量 |
| `seed` | 初始 LCG 种子（任意整数） |

**返回：** 打乱后的数组（与 arr 相同引用）

---

## `list_dedup_count` <Badge type="info" text="v1.0.0" />

统计数组中唯一值的数量（O(n²)，适合小数组）。

```redscript
fn list_dedup_count(arr: int[], len: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `arr` | 输入数组 |
| `len` | 元素数量 |

**返回：** arr[0..len) 中不同值的个数

---
