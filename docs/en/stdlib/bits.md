# Bits

> Auto-generated from `src/stdlib/bits.mcrs` — do not edit manually.

## API

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

Test whether bit n of x is set.

```redscript
fn bit_get(x: int, n: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Integer value to test |
| `n` | Bit index (0 = least significant), range [0, 30] |

**Returns:** 1 if bit n is set, 0 otherwise

**Example**

```redscript
let b: int = bit_get(0b1010, 1)  // result: 1 (bit 1 of 10 is set)
```

---

## `bit_set` <Badge type="info" text="Since v1.0.0" />

Set bit n of x to 1 (idempotent if already set).

```redscript
fn bit_set(x: int, n: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Integer value to modify |
| `n` | Bit index to set, range [0, 30] |

**Returns:** x with bit n set to 1

**Example**

```redscript
let v: int = bit_set(0b0100, 0)  // result: 0b0101 = 5
```

---

## `bit_clear` <Badge type="info" text="Since v1.0.0" />

Clear bit n of x to 0 (idempotent if already clear).

```redscript
fn bit_clear(x: int, n: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Integer value to modify |
| `n` | Bit index to clear, range [0, 30] |

**Returns:** x with bit n set to 0

**Example**

```redscript
let v: int = bit_clear(0b0111, 1)  // result: 0b0101 = 5
```

---

## `bit_toggle` <Badge type="info" text="Since v1.0.0" />

Toggle bit n of x (flip 0→1 or 1→0).

```redscript
fn bit_toggle(x: int, n: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Integer value to modify |
| `n` | Bit index to toggle, range [0, 30] |

**Returns:** x with bit n flipped

**Example**

```redscript
let v: int = bit_toggle(0b0101, 1)  // result: 0b0111 = 7
```

---

## `bit_shl` <Badge type="info" text="Since v1.0.0" />

Left-shift x by n bits (equivalent to x * 2^n).

```redscript
fn bit_shl(x: int, n: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Integer to shift |
| `n` | Number of bit positions to shift left, range [0, 30] |

**Returns:** x << n

**Example**

```redscript
let v: int = bit_shl(1, 4)  // result: 16 (1 << 4)
```

---

## `bit_shr` <Badge type="info" text="Since v1.0.0" />

Logical right-shift x by n bits (equivalent to x / 2^n, truncating toward zero).

```redscript
fn bit_shr(x: int, n: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Integer to shift |
| `n` | Number of bit positions to shift right, range [0, 30] |

**Returns:** x >> n (logical, not arithmetic for positive values)

**Example**

```redscript
let v: int = bit_shr(256, 3)  // result: 32 (256 >> 3)
```

---

## `bit_and` <Badge type="info" text="Since v1.0.0" />

Bitwise AND of two integers (all 31 non-sign bits).

```redscript
fn bit_and(a: int, b: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | First operand |
| `b` | Second operand |

**Returns:** a & b (bits set in both a and b)

**Example**

```redscript
let v: int = bit_and(0b1100, 0b1010)  // result: 0b1000 = 8
```

---

## `bit_or` <Badge type="info" text="Since v1.0.0" />

Bitwise OR of two integers (all 31 non-sign bits).

```redscript
fn bit_or(a: int, b: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | First operand |
| `b` | Second operand |

**Returns:** a | b (bits set in either a or b)

**Example**

```redscript
let v: int = bit_or(0b1100, 0b1010)  // result: 0b1110 = 14
```

---

## `bit_xor` <Badge type="info" text="Since v1.0.0" />

Bitwise XOR of two integers (all 31 non-sign bits).

```redscript
fn bit_xor(a: int, b: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | First operand |
| `b` | Second operand |

**Returns:** a ^ b (bits set in exactly one of a or b)

**Example**

```redscript
let v: int = bit_xor(0b1100, 0b1010)  // result: 0b0110 = 6
```

---

## `bit_not` <Badge type="info" text="Since v1.0.0" />

Bitwise NOT — inverts all 31 non-sign bits of x.

```redscript
fn bit_not(x: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Integer to invert |

**Returns:** ~x (all 31 lower bits flipped; sign bit excluded)

**Example**

```redscript
let v: int = bit_not(0)  // result: 2147483647 (all 31 bits set)
```

---

## `popcount` <Badge type="info" text="Since v1.0.0" />

Count the number of set bits in x (population count / Hamming weight).

```redscript
fn popcount(x: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Integer value (uses 31 lower bits; sign bit excluded) |

**Returns:** Number of bits set to 1, in [0, 31]

**Example**

```redscript
let n: int = popcount(255)  // result: 8 (0xFF has 8 bits set)
```

---
