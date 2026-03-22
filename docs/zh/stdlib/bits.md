# Bits

> 本文档由 `src/stdlib/bits.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [bit_get](#bit-get)
- [bit_set](#bit-set)
- [bit_clear](#bit-clear)
- [bit_toggle](#bit-toggle)
- [bit_shl](#bit-shl)
- [bit_shr](#bit-shr)
- [bit_and](#bit-and)
- [bit_or](#bit-or)
- [bit_xor](#bit-xor)
- [bit_not](#bit-not)
- [popcount](#popcount)

---

## `bit_get` <Badge type="info" text="Since v1.0.0" />

检测 x 的第 n 位是否为 1

```redscript
fn bit_get(x: int, n: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 要检测的整数 |
| `n` | 位索引（0 = 最低位），范围 [0, 30] |

**返回：** 第 n 位为 1 则返回 1，否则返回 0

**示例**

```redscript
let b: int = bit_get(0b1010, 1)  // result: 1 (bit 1 of 10 is set)
```

---

## `bit_set` <Badge type="info" text="Since v1.0.0" />

将 x 的第 n 位设为 1（幂等）

```redscript
fn bit_set(x: int, n: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 要修改的整数 |
| `n` | 要置 1 的位索引，范围 [0, 30] |

**返回：** 第 n 位置为 1 后的 x

**示例**

```redscript
let v: int = bit_set(0b0100, 0)  // result: 0b0101 = 5
```

---

## `bit_clear` <Badge type="info" text="Since v1.0.0" />

将 x 的第 n 位清零（幂等）

```redscript
fn bit_clear(x: int, n: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 要修改的整数 |
| `n` | 要清零的位索引，范围 [0, 30] |

**返回：** 第 n 位置为 0 后的 x

**示例**

```redscript
let v: int = bit_clear(0b0111, 1)  // result: 0b0101 = 5
```

---

## `bit_toggle` <Badge type="info" text="Since v1.0.0" />

翻转 x 的第 n 位（0→1 或 1→0）

```redscript
fn bit_toggle(x: int, n: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 要修改的整数 |
| `n` | 要翻转的位索引，范围 [0, 30] |

**返回：** 第 n 位翻转后的 x

**示例**

```redscript
let v: int = bit_toggle(0b0101, 1)  // result: 0b0111 = 7
```

---

## `bit_shl` <Badge type="info" text="Since v1.0.0" />

左移 x n 位（等效于 x * 2^n）

```redscript
fn bit_shl(x: int, n: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 要移位的整数 |
| `n` | 左移位数，范围 [0, 30] |

**返回：** x << n

**示例**

```redscript
let v: int = bit_shl(1, 4)  // result: 16 (1 << 4)
```

---

## `bit_shr` <Badge type="info" text="Since v1.0.0" />

逻辑右移 x n 位（等效于 x / 2^n，向零截断）

```redscript
fn bit_shr(x: int, n: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 要移位的整数 |
| `n` | 右移位数，范围 [0, 30] |

**返回：** x >> n

**示例**

```redscript
let v: int = bit_shr(256, 3)  // result: 32 (256 >> 3)
```

---

## `bit_and` <Badge type="info" text="Since v1.0.0" />

两个整数的按位与（31 个非符号位）

```redscript
fn bit_and(a: int, b: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 第一个操作数 |
| `b` | 第二个操作数 |

**返回：** a & b（两者均为 1 的位）

**示例**

```redscript
let v: int = bit_and(0b1100, 0b1010)  // result: 0b1000 = 8
```

---

## `bit_or` <Badge type="info" text="Since v1.0.0" />

两个整数的按位或（31 个非符号位）

```redscript
fn bit_or(a: int, b: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 第一个操作数 |
| `b` | 第二个操作数 |

**返回：** a | b（至少一个为 1 的位）

**示例**

```redscript
let v: int = bit_or(0b1100, 0b1010)  // result: 0b1110 = 14
```

---

## `bit_xor` <Badge type="info" text="Since v1.0.0" />

两个整数的按位异或（31 个非符号位）

```redscript
fn bit_xor(a: int, b: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 第一个操作数 |
| `b` | 第二个操作数 |

**返回：** a ^ b（恰好一个为 1 的位）

**示例**

```redscript
let v: int = bit_xor(0b1100, 0b1010)  // result: 0b0110 = 6
```

---

## `bit_not` <Badge type="info" text="Since v1.0.0" />

按位非 — 翻转 x 的所有 31 个非符号位

```redscript
fn bit_not(x: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 要取反的整数 |

**返回：** ~x（所有 31 个低位翻转；符号位不变）

**示例**

```redscript
let v: int = bit_not(0)  // result: 2147483647 (all 31 bits set)
```

---

## `popcount` <Badge type="info" text="Since v1.0.0" />

统计 x 中置 1 的位数（汉明重量）

```redscript
fn popcount(x: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 整数值（使用 31 个低位；符号位不计） |

**返回：** 置 1 的位数，范围 [0, 31]

**示例**

```redscript
let n: int = popcount(255)  // result: 8 (0xFF has 8 bits set)
```

---
