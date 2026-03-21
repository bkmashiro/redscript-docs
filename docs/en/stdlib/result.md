# `result` — Result type for fallible operations

Import: `import "stdlib/result.mcrs"`

An enum-based `Result` helper for datapack code that may fail. A value is either `Ok(value)` for success or `Err(code)` for failure, where `code` is an integer error code chosen by the caller.

## Enum

### `Result`

```rs
enum Result {
  Ok(value: int),
  Err(code: int),
}
```

Conventionally, negative integers are used for error codes:

- `-1` — generic error
- `-2` — division by zero
- `-3` — not found

## Functions

### `result_ok(value: int): Result`

Construct a successful result.

**Example:**
```rs
import "stdlib/result.mcrs";
let r: Result = result_ok(42);
```

---

### `result_err(code: int): Result`

Construct a failed result with the given error code.

**Example:**
```rs
import "stdlib/result.mcrs";
let r: Result = result_err(-1);
```

---

### `result_is_ok(r: Result): int`

Return `1` if `r` is `Ok`, otherwise `0`.

---

### `result_is_err(r: Result): int`

Return `1` if `r` is `Err`, otherwise `0`.

---

### `result_value(r: Result): int`

Extract the success value from `Ok(value)`. Returns `0` if `r` is an error, so check `result_is_ok()` first when `0` is a meaningful success value.

**Example:**
```rs
import "stdlib/result.mcrs";
let r: Result = result_ok(42);
if (result_is_ok(r) == 1) {
    let value: int = result_value(r);  // 42
}
```

---

### `result_code(r: Result): int`

Extract the error code from `Err(code)`. Returns `0` if `r` is successful, so check `result_is_err()` first when `0` could be ambiguous.

---

### `result_divide(a: int, b: int): Result`

Example helper for fallible arithmetic. Returns `Err(-2)` when `b == 0`, otherwise `Ok(a / b)`.

**Example:**
```rs
import "stdlib/result.mcrs";

let r: Result = result_divide(10, 2);
if (result_is_ok(r) == 1) {
    let q: int = result_value(r);  // 5
}
```

## Notes

- This module currently uses `int` payloads only; it is a lightweight tagged union, not a fully generic algebraic data type.
- Returning `0` from `result_value()` / `result_code()` on the opposite branch is a convenience fallback, not proof of success or failure.
