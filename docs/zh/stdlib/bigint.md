# Bigint

> 本文档由 `src/stdlib/bigint.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [bigint_base](#bigint-base)
- [bigint_zero](#bigint-zero)
- [bigint_copy](#bigint-copy)
- [bigint_cmp](#bigint-cmp)
- [bigint_add](#bigint-add)
- [bigint_sub](#bigint-sub)
- [bigint_mul_small](#bigint-mul-small)
- [bigint_div_small](#bigint-div-small)
- [bigint_mod_small](#bigint-mod-small)
- [bigint_mul](#bigint-mul)
- [bigint_sq](#bigint-sq)
- [bigint_div](#bigint-div)

---

## `bigint_base` <Badge type="info" text="v1.0.0" />

Return the bigint base (10000 = base-10000, each chunk holds 4 decimal digits).

```redscript
fn bigint_base(): int
```

**返回：** 10000

---

## `bigint_zero` <Badge type="info" text="v1.0.0" />

Set all chunks of a bigint array to zero.

```redscript
fn bigint_zero(arr: int[], len: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `arr` | BigInt array (most-significant chunk at index 0) |
| `len` | Number of chunks |

**返回：** void — arr[0..len-1] set to 0

**示例**

```redscript
bigint_zero(result, 4)  // zero out a 4-chunk bigint
```

---

## `bigint_copy` <Badge type="info" text="v1.0.0" />

Copy a bigint from src into dst.

```redscript
fn bigint_copy(src: int[], dst: int[], len: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `src` | Source bigint array |
| `dst` | Destination bigint array (must have length >= len) |
| `len` | Number of chunks to copy |

**返回：** void — dst[0..len-1] = src[0..len-1]

---

## `bigint_cmp` <Badge type="info" text="v1.0.0" />

比较两个等长大整数

```redscript
fn bigint_cmp(a: int[], b: int[], len: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 第一个大整数（最高有效分块在索引 0） |
| `b` | 第二个大整数 |
| `len` | 分块数量（两者相同） |

**返回：** a > b 返回 1，a < b 返回 -1，相等返回 0

**示例**

```redscript
let cmp: int = bigint_cmp(a, b, 4)
```

---

## `bigint_add` <Badge type="info" text="v1.0.0" />

将两个等长大整数相加，结果写入预分配数组

```redscript
fn bigint_add(a: int[], b: int[], result: int[], len: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 第一个加数大整数 |
| `b` | 第二个加数大整数 |
| `result` | 输出大整数数组（长度需 >= len） |
| `len` | 分块数量 |

**返回：** 进位：0 或 1（非零表示溢出）

**示例**

```redscript
let carry: int = bigint_add(a, b, result, 4)
```

---

## `bigint_sub` <Badge type="info" text="v1.0.0" />

大整数 b 从 a 中减去，结果写入 result（要求 a >= b）

```redscript
fn bigint_sub(a: int[], b: int[], result: int[], len: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 被减数大整数 |
| `b` | 减数大整数（必须 <= a） |
| `result` | 输出大整数数组 |
| `len` | 分块数量 |

**返回：** void — result = a - b

---

## `bigint_mul_small` <Badge type="info" text="v1.0.0" />

大整数乘以小整数（1 ≤ n ≤ 9999）

```redscript
fn bigint_mul_small(a: int[], n: int, result: int[], len: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 被乘数大整数 |
| `n` | 小整数乘数（范围 [1, 9999]） |
| `result` | 输出数组 |
| `len` | 分块数量 |

**返回：** void — result = a × n

**示例**

```redscript
bigint_mul_small(a, 1000, result, 4)  // result = a × 1000
```

---

## `bigint_div_small` <Badge type="info" text="v1.0.0" />

大整数除以小整数，返回商和余数

```redscript
fn bigint_div_small(a: int[], divisor: int, result: int[], len: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 被除数大整数 |
| `divisor` | 小整数除数（范围 [1, 9999]） |
| `result` | 商输出数组 |
| `len` | 分块数量 |

**返回：** 余数（范围 0..divisor-1）

**示例**

```redscript
let rem: int = bigint_div_small(a, 7, result, 4)
```

---

## `bigint_mod_small` <Badge type="info" text="v1.0.0" />

Compute a bigint modulo a small integer without allocating a quotient array.

```redscript
fn bigint_mod_small(a: int[], divisor: int, len: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | Dividend bigint |
| `divisor` | Small integer divisor (range [1, 9999]) |
| `len` | Number of chunks |

**返回：** a % divisor, in [0, divisor-1]

**示例**

```redscript
let mod: int = bigint_mod_small(a, 10, 4)  // last decimal digit of a
```

---

## `bigint_mul` <Badge type="info" text="v1.0.0" />

两个大整数相乘（朴素 O(n²) 学校算法）

```redscript
fn bigint_mul(a: int[], b: int[], result: int[], la: int, lb: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 第一个大整数（la 个分块） |
| `b` | 第二个大整数（lb 个分块） |
| `result` | 输出数组（需 la+lb 个分块，预置为 0） |
| `la` | a 的分块数 |
| `lb` | b 的分块数 |

**返回：** void — result = a × b

**示例**

```redscript
let result: int[] = [0, 0, 0, 0, 0, 0, 0]
bigint_mul(a, b, result, 4, 3)
```

---

## `bigint_sq` <Badge type="info" text="v1.0.0" />

Square a bigint (optimized: computes upper triangle only).

```redscript
fn bigint_sq(a: int[], result: int[], len: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | Bigint to square (len chunks) |
| `result` | Output bigint array (must have len*2 chunks, pre-zeroed) |
| `len` | Number of chunks in a |

**返回：** void — result = a * a

**示例**

```redscript
let sq: int[] = [0, 0, 0, 0, 0, 0, 0, 0]
bigint_sq(a, sq, 4)  // sq = a²
```

---

## `bigint_div` <Badge type="info" text="v1.0.0" />

任意精度整数除法，计算商和余数

```redscript
fn bigint_div(a: int[], b: int[], quotient: int[], remainder: int[], la: int, lb: int): void
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 被除数大整数（la 个分块） |
| `b` | 除数大整数（lb 个分块） |
| `quotient` | 商输出数组（la 个分块，预置为 0） |
| `remainder` | 余数输出数组（lb 个分块，预置为 0） |
| `la` | a 的分块数（需 >= lb） |
| `lb` | b 的分块数 |

**返回：** void — quotient = a/b, remainder = a%b

**示例**

```redscript
bigint_div(a, b, quotient, remainder, 4, 2)
```

---
