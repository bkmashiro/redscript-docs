# Result

> Auto-generated from `src/stdlib/result.mcrs` — do not edit manually.

## Functions

- [result_ok](#result-ok)
- [result_err](#result-err)
- [result_is_ok](#result-is-ok)
- [result_is_err](#result-is-err)
- [result_value](#result-value)
- [result_code](#result-code)
- [result_divide](#result-divide)

---

## `result_ok`

**Since:** 1.0.0

Construct a successful Result with the given value.

```redscript
fn result_ok(value: int): Result
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `value` | The success value (any integer) |

**Returns:** Result::Ok(value)

**Example**

```redscript
let r = result_ok(42)  // Ok result carrying 42
```

---

## `result_err`

**Since:** 1.0.0

Construct a failed Result with the given error code.

```redscript
fn result_err(code: int): Result
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `code` | Error code (use negative by convention: -1 generic, -2 div/zero) |

**Returns:** Result::Err(code)

**Example**

```redscript
let r = result_err(-2)  // division-by-zero error
```

---

## `result_is_ok`

**Since:** 1.0.0

Returns 1 if the Result is Ok, 0 otherwise.

```redscript
fn result_is_ok(r: Result): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `r` | The Result to test |

**Returns:** 1 if Ok, 0 if Err

**Example**

```redscript
let ok = result_is_ok(result_ok(5))  // result: 1
```

---

## `result_is_err`

Returns 1 if the Result is Err, 0 otherwise.

```redscript
fn result_is_err(r: Result): int
```

---

## `result_value`

**Since:** 1.0.0

Extract the value from an Ok result.
Returns 0 if the Result is Err (check result_is_ok first).

```redscript
fn result_value(r: Result): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `r` | The Result to unwrap |

**Returns:** The Ok value, or 0 if Err

**Example**

```redscript
let v = result_value(result_ok(99))  // result: 99
```

---

## `result_code`

Extract the error code from an Err result.
Returns 0 if the Result is Ok (check result_is_err first).

```redscript
fn result_code(r: Result): int
```

---

## `result_divide`

Divide a by b; returns Err(-2) on division by zero.

```redscript
fn result_divide(a: int, b: int): Result
```

---
