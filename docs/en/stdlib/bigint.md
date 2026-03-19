# `bigint` — Multi-precision integer arithmetic

Import: `import bigint;`

Arbitrary-precision integers represented as base-10000 (万進制) `int` arrays in NBT storage. Arrays are big-endian (index 0 = most significant chunk). Provides 3-chunk (96-bit) helpers and arbitrary-length operations for addition, subtraction, multiplication, division, comparison, and utility functions. Full bigint×bigint multiplication and squaring included.

## Functions

### `bigint_base(): int`

Returns the chunk base constant: 10000.

---

### `bigint_zero(arr: int[], len: int)`

Set all `len` chunks of `arr` to zero.

**Example:**
```rs
import bigint;
let a: int[] = [1, 2, 3];
bigint_zero(a, 3);  // a = [0, 0, 0]
```

---

### `bigint_copy(src: int[], dst: int[], len: int)`

Copy `len` chunks from `src` into `dst`.

**Example:**
```rs
import bigint;
let src: int[] = [0, 1234, 5678];
let dst: int[] = [0, 0, 0];
bigint_copy(src, dst, 3);
```

---

### `bigint_cmp(a: int[], b: int[], len: int): int`

Compare two `len`-chunk bigints (big-endian). Returns 1 if `a > b`, -1 if `a < b`, 0 if equal.

**Example:**
```rs
import bigint;
let a: int[] = [0, 0, 5000];
let b: int[] = [0, 0, 3000];
let r: int = bigint_cmp(a, b, 3);  // 1
```

---

### `bigint_add(a: int[], b: int[], result: int[], len: int): int`

Add two `len`-chunk bigints into `result`. Returns carry-out (0 or 1). Caller should handle overflow.

**Example:**
```rs
import bigint;
let a: int[] = [0, 9999, 9999];
let b: int[] = [0, 0, 1];
let r: int[] = [0, 0, 0];
let carry: int = bigint_add(a, b, r, 3);
```

---

### `bigint_sub(a: int[], b: int[], result: int[], len: int)`

Subtract: `result = a - b`. Assumes `a >= b` (no negative result handling).

**Example:**
```rs
import bigint;
let a: int[] = [0, 1, 0];
let b: int[] = [0, 0, 5000];
let r: int[] = [0, 0, 0];
bigint_sub(a, b, r, 3);
```

---

### `bigint_mul_small(a: int[], n: int, result: int[], len: int)`

Multiply `len`-chunk bigint `a` by small integer `n` (must be ≤ 9999) into `result`.

**Example:**
```rs
import bigint;
let a: int[] = [0, 0, 1234];
let r: int[] = [0, 0, 0];
bigint_mul_small(a, 7, r, 3);  // r = [0, 0, 8638]
```

---

### `bigint_shift_left(arr: int[], len: int)`

Multiply bigint by 10000 (shift left one chunk). Loses the most significant chunk if non-zero.

---

### `bigint_is_zero(arr: int[], len: int): int`

Returns 1 if all `len` chunks are zero.

---

### `bigint_leading_zeros(arr: int[], len: int): int`

Count leading zero chunks from the most significant end.

---

### `bigint_div_small(a: int[], divisor: int, result: int[], len: int): int`

Divide `len`-chunk bigint by a small integer (`1 ≤ divisor ≤ 9999`). Uses long division chunk by chunk. Returns the remainder.

**Example:**
```rs
import bigint;
let a: int[] = [0, 0, 10000];
let r: int[] = [0, 0, 0];
let rem: int = bigint_div_small(a, 3, r, 3);
```

---

### `bigint_mod_small(a: int[], divisor: int, len: int): int`

Returns `a mod divisor` (0..divisor-1) without storing the quotient.

---

### `bigint_chunk(a: int[], i: int): int`

Read chunk at index `i`. Helper for display/inspection purposes.

---

### `bigint_mul(a: int[], b: int[], result: int[], la: int, lb: int)`

Multiply two bigints: `result = a × b`. `a` has `la` chunks, `b` has `lb` chunks; `result` must be pre-zeroed with `la + lb` chunks. Uses schoolbook O(n²) algorithm.

> **Cost:** O(la × lb) multiply operations

**Example:**
```rs
import bigint;
let a: int[] = [0, 0, 1234, 5678];
let b: int[] = [0, 0, 9999];
let result: int[] = [0, 0, 0, 0, 0, 0, 0];
bigint_mul(a, b, result, 4, 3);
```

---

### `bigint_mul_result_len(la: int, lb: int): int`

Returns the required result array length for `bigint_mul`: `la + lb`.

---

### `bigint_sq(a: int[], result: int[], len: int)`

Square a bigint: `result = a × a`. `result` must be pre-zeroed with `len * 2` chunks. Optimised: only computes upper triangle and doubles, avoiding redundant multiplications.

> **Cost:** O(n²/2) multiply operations — roughly half of `bigint_mul`

---

### `bigint3_add_lo(alo: int, blo: int): int`

Low chunk of a 3-chunk (96-bit) addition.

---

### `bigint3_carry_lo(alo: int, blo: int): int`

Carry out from the low chunk addition.

---

### `bigint3_add_mid(amid: int, bmid: int, carry: int): int`

Middle chunk of 3-chunk addition with incoming carry.

---

### `bigint3_carry_mid(amid: int, bmid: int, carry: int): int`

Carry out from middle chunk addition.

---

### `bigint3_add_hi(ahi: int, bhi: int, carry: int): int`

High chunk of 3-chunk addition with incoming carry.

---

### `bigint3_sub_lo(alo: int, blo: int): int`

Low chunk of 3-chunk subtraction.

---

### `bigint3_borrow_lo(alo: int, blo: int): int`

Borrow out from low chunk subtraction.

---

### `bigint3_sub_mid(amid: int, bmid: int, borrow: int): int`

Middle chunk of 3-chunk subtraction with incoming borrow.

---

### `bigint3_borrow_mid(amid: int, bmid: int, borrow: int): int`

Borrow out from middle chunk subtraction.

---

### `bigint3_sub_hi(ahi: int, bhi: int, borrow: int): int`

High chunk of 3-chunk subtraction.

---

### `bigint3_mul1_lo(a: int, b: int): int`

Low chunk of single-chunk multiply (used in 3-chunk multiply-by-small).

---

### `bigint3_mul1_hi(a: int, b: int): int`

High chunk of single-chunk multiply.

---

### `bigint3_cmp(ahi: int, amid: int, alo: int, bhi: int, bmid: int, blo: int): int`

Compare two explicit 3-chunk bigints. Returns 1 if a>b, -1 if a<b, 0 if equal.

---

### `int32_to_bigint3_lo(n: int): int`

Low chunk of int32 split into 3 chunks.

---

### `int32_to_bigint3_mid(n: int): int`

Middle chunk of int32 split into 3 chunks.

---

### `int32_to_bigint3_hi(n: int): int`

High chunk of int32 split into 3 chunks.

---

### `bigint3_to_int32(hi: int, mid: int, lo: int): int`

Reconstruct int32 from 3 chunks.

---

### `bigint3_div_chunk(chunk: int, rem: int, divisor: int): int`

Long division quotient for one chunk: `(rem * 10000 + chunk) / divisor`.

---

### `bigint3_rem_chunk(chunk: int, rem: int, divisor: int): int`

Long division remainder for one chunk: `(rem * 10000 + chunk) % divisor`.

---

### `bigint_shl1(a: int[], len: int)`

Shift bigint `a` left by one chunk (equivalent to multiplying by the base 10000). Modifies `a` in-place: each element shifts down one index, and `a[len-1]` is set to 0. The most-significant chunk is dropped. Used internally by `bigint_div`.

**Example:**
```rs
import "stdlib/bigint.mcrs";
// [1, 2345] shifted left → [2345, 0]  (×10000)
let a: int[] = [1, 2345];
bigint_shl1(a, 2);
// a is now [2345, 0]
```

---

### `bigint_cmp_window(a: int[], aoff: int, b: int[], len: int): int`

Compare the window `a[aoff..aoff+len-1]` against `b[0..len-1]`. Returns `1` if the window is greater, `-1` if less, `0` if equal. Used by `bigint_div` during trial subtraction.

**Example:**
```rs
import "stdlib/bigint.mcrs";
let a: int[] = [0, 1, 500];
let b: int[] = [1, 400];
let cmp: int = bigint_cmp_window(a, 1, b, 2);  // 1  (a[1..2] = [1,500] > [1,400])
```

---

### `bigint_sub_window(a: int[], aoff: int, b: int[], len: int)`

Subtract `b[0..len-1]` from the window `a[aoff..aoff+len-1]` in-place, with borrow propagation. Equivalent to `a[aoff..] -= b`. Used by `bigint_div` to subtract the trial product.

> **Precondition:** window must be ≥ `b` (no underflow).

**Example:**
```rs
import "stdlib/bigint.mcrs";
let a: int[] = [0, 5000, 0];
let b: int[] = [1, 200];
bigint_sub_window(a, 1, b, 2);
// a[1..2] = [5000,0] - [1,200] = [4998, 9800]
```

---

### `bigint_mul_small_into(b: int[], factor: int, out: int[], len: int)`

Multiply bigint `b[0..len-1]` by small integer `factor`, writing the result into `out[0..len-1]`. Carry propagates right-to-left. Overflow beyond `out[0]` is silently dropped (ensure `factor` fits within a single chunk multiply).

**Example:**
```rs
import "stdlib/bigint.mcrs";
let b: int[] = [1, 5000];
let out: int[] = [0, 0];
bigint_mul_small_into(b, 3, out, 2);
// out = [4, 5000]  (15000 in base-10000: chunk 0 = 1*3=3 + carry 1 = 4, chunk 1 = 5000*3 % 10000 = 5000, carry = 1)
```

---

### `bigint_div(a: int[], b: int[], quotient: int[], remainder: int[], la: int, lb: int)`

Full arbitrary-precision integer division using binary-search trial subtraction. Computes `a / b → quotient` and `a % b → remainder`. `a` has `la` chunks; `b` has `lb` chunks; all arrays are most-significant first in base 10000 (each chunk: 0–9999).

> **Precondition:** `la ≥ lb`. `quotient` must be pre-allocated with `la` elements; `remainder` with `lb` elements. `a` and `b` must not alias `quotient` or `remainder`.

Uses `bigint_cmp_window`, `bigint_sub_window`, and `bigint_mul_small_into` internally.

**Example:**
```rs
import "stdlib/bigint.mcrs";
// Divide 100000 (= [1, 0] in base-10000) by 3 (= [3])
// quotient = 33333, remainder = 1
let a: int[] = [1, 0];
let b: int[] = [3];
let q: int[] = [0, 0];
let r: int[] = [0];
bigint_div(a, b, q, r, 2, 1);
// q = [3, 3333]  (33333 in base-10000: [3, 3333])
// r = [1]
```

## Full bigint ÷ bigint Division

### `bigint_div(a: int[], b: int[], quotient: int[], remainder: int[], la: int, lb: int): void`

Full arbitrary-precision integer division using long division. Computes both `a / b` (into `quotient`) and `a % b` (into `remainder`).

- `a`: dividend, `la` chunks, most-significant first, base 10000
- `b`: divisor, `lb` chunks
- `quotient`: output array, must have `la` pre-zeroed chunks
- `remainder`: output array, must have `lb` pre-zeroed chunks
- `la >= lb` is required

Algorithm: binary-search trial subtraction per digit position — O(n² log b).

**Example:**
```rs
import "stdlib/bigint.mcrs"

// Compute 123456789 / 1000 = 123456 remainder 789
// In base 10000: a = [1, 2345, 6789], b = [0, 1000]
let a: int[] = [1, 2345, 6789]
let b: int[] = [0, 1000]
let q: int[] = [0, 0, 0]
let r: int[] = [0, 0]
bigint_div(a, b, q, r, 3, 2)
// q ≈ [0, 1, 2345]  (123456 / 1 = 123456 in base-10000)
// r ≈ [0, 789]
```

### Internal helpers (used by `bigint_div`)

| Function | Description |
|----------|-------------|
| `bigint_shl1(a, len)` | Shift bigint left by 1 chunk in-place (multiply by 10000, drops MSB) |
| `bigint_cmp_window(a, aoff, b, len)` | Compare window `a[aoff..aoff+len]` with `b[0..len]`; returns 1/0/-1 |
| `bigint_sub_window(a, aoff, b, len)` | Subtract `b` from window `a[aoff..aoff+len]` in-place |
| `bigint_mul_small_into(b, factor, out, len)` | `out = b * factor` (small int), does not modify `b` |
