# Bigint

> Auto-generated from `src/stdlib/bigint.mcrs` — do not edit manually.

## API

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

## `bigint_base` <Badge type="info" text="Since v1.0.0" />

Return the bigint base (10000 = base-10000, each chunk holds 4 decimal digits).

```redscript
fn bigint_base(): int
```

**Returns:** 10000

---

## `bigint_zero` <Badge type="info" text="Since v1.0.0" />

Set all chunks of a bigint array to zero.

```redscript
fn bigint_zero(arr: int[], len: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `arr` | BigInt array (most-significant chunk at index 0) |
| `len` | Number of chunks |

**Returns:** void — arr[0..len-1] set to 0

**Example**

```redscript
bigint_zero(result, 4)  // zero out a 4-chunk bigint
```

---

## `bigint_copy` <Badge type="info" text="Since v1.0.0" />

Copy a bigint from src into dst.

```redscript
fn bigint_copy(src: int[], dst: int[], len: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `src` | Source bigint array |
| `dst` | Destination bigint array (must have length >= len) |
| `len` | Number of chunks to copy |

**Returns:** void — dst[0..len-1] = src[0..len-1]

---

## `bigint_cmp` <Badge type="info" text="Since v1.0.0" />

Compare two bigints of equal length.

```redscript
fn bigint_cmp(a: int[], b: int[], len: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | First bigint (most-significant chunk at index 0) |
| `b` | Second bigint |
| `len` | Number of chunks (must be equal for both) |

**Returns:** 1 if a > b, -1 if a < b, 0 if equal

**Example**

```redscript
let cmp: int = bigint_cmp(a, b, 4)
```

---

## `bigint_add` <Badge type="info" text="Since v1.0.0" />

Add two bigints of equal length, writing result into a pre-allocated array.

```redscript
fn bigint_add(a: int[], b: int[], result: int[], len: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | First bigint addend |
| `b` | Second bigint addend |
| `result` | Output bigint array (must have length >= len, may alias a or b) |
| `len` | Number of chunks |

**Returns:** Carry out: 0 or 1 (overflow if non-zero)

**Example**

```redscript
let carry: int = bigint_add(a, b, result, 4)
```

---

## `bigint_sub` <Badge type="info" text="Since v1.0.0" />

Subtract bigint b from a, writing result (assumes a >= b, no underflow check).

```redscript
fn bigint_sub(a: int[], b: int[], result: int[], len: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | Minuend bigint |
| `b` | Subtrahend bigint (must be <= a) |
| `result` | Output bigint array |
| `len` | Number of chunks |

**Returns:** void — result = a - b

---

## `bigint_mul_small` <Badge type="info" text="Since v1.0.0" />

Multiply a bigint by a small integer (1 ≤ n ≤ 9999).

```redscript
fn bigint_mul_small(a: int[], n: int, result: int[], len: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | Bigint multiplicand |
| `n` | Small integer multiplier (must be in [1, 9999] to avoid overflow) |
| `result` | Output bigint array (must have length >= len) |
| `len` | Number of chunks |

**Returns:** void — result = a * n; high overflow is silently lost

**Example**

```redscript
bigint_mul_small(a, 1000, result, 4)  // result = a × 1000
```

---

## `bigint_div_small` <Badge type="info" text="Since v1.0.0" />

Divide a bigint by a small integer (1 ≤ divisor ≤ 9999), returning quotient and remainder.

```redscript
fn bigint_div_small(a: int[], divisor: int, result: int[], len: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | Dividend bigint |
| `divisor` | Small integer divisor (range [1, 9999]) |
| `result` | Output quotient bigint array |
| `len` | Number of chunks |

**Returns:** Remainder (0..divisor-1)

**Example**

```redscript
let rem: int = bigint_div_small(a, 7, result, 4)
```

---

## `bigint_mod_small` <Badge type="info" text="Since v1.0.0" />

Compute a bigint modulo a small integer without allocating a quotient array.

```redscript
fn bigint_mod_small(a: int[], divisor: int, len: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | Dividend bigint |
| `divisor` | Small integer divisor (range [1, 9999]) |
| `len` | Number of chunks |

**Returns:** a % divisor, in [0, divisor-1]

**Example**

```redscript
let mod: int = bigint_mod_small(a, 10, 4)  // last decimal digit of a
```

---

## `bigint_mul` <Badge type="info" text="Since v1.0.0" />

Multiply two bigints using schoolbook O(n²) algorithm.

```redscript
fn bigint_mul(a: int[], b: int[], result: int[], la: int, lb: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | First bigint (la chunks) |
| `b` | Second bigint (lb chunks) |
| `result` | Output bigint array (must have la+lb chunks, pre-zeroed) |
| `la` | Number of chunks in a |
| `lb` | Number of chunks in b |

**Returns:** void — result = a * b; result must not alias a or b

**Example**

```redscript
let result: int[] = [0, 0, 0, 0, 0, 0, 0]
bigint_mul(a, b, result, 4, 3)
```

---

## `bigint_sq` <Badge type="info" text="Since v1.0.0" />

Square a bigint (optimized: computes upper triangle only).

```redscript
fn bigint_sq(a: int[], result: int[], len: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | Bigint to square (len chunks) |
| `result` | Output bigint array (must have len*2 chunks, pre-zeroed) |
| `len` | Number of chunks in a |

**Returns:** void — result = a * a

**Example**

```redscript
let sq: int[] = [0, 0, 0, 0, 0, 0, 0, 0]
bigint_sq(a, sq, 4)  // sq = a²
```

---

## `bigint_div` <Badge type="info" text="Since v1.0.0" />

Full arbitrary-precision integer division: a / b → quotient and remainder.

```redscript
fn bigint_div(a: int[], b: int[], quotient: int[], remainder: int[], la: int, lb: int): void
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | Dividend bigint (la chunks) |
| `b` | Divisor bigint (lb chunks) |
| `quotient` | Output quotient array (la chunks, pre-zeroed) |
| `remainder` | Output remainder array (lb chunks, pre-zeroed) |
| `la` | Number of chunks in a (must be >= lb) |
| `lb` | Number of chunks in b |

**Returns:** void — quotient = a/b, remainder = a%b; a and b must not alias outputs

**Example**

```redscript
bigint_div(a, b, quotient, remainder, 4, 2)
```

---
