# Result

> 本文档由 `src/stdlib/result.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [result_ok](#result-ok)
- [result_err](#result-err)
- [result_is_ok](#result-is-ok)
- [result_is_err](#result-is-err)
- [result_value](#result-value)
- [result_code](#result-code)
- [result_divide](#result-divide)

---

## `result_ok` <Badge type="info" text="Since v1.0.0" />

构造一个携带成功值的 Result

```redscript
fn result_ok(value: int): Result
```

**参数**

| 参数 | 说明 |
|------|------|
| `value` | 成功值（任意整数） |

**返回：** Result::Ok(value)

**示例**

```redscript
let r = result_ok(42)  // Ok result carrying 42
```

---

## `result_err` <Badge type="info" text="Since v1.0.0" />

构造一个携带错误码的 Result

```redscript
fn result_err(code: int): Result
```

**参数**

| 参数 | 说明 |
|------|------|
| `code` | 错误码（按惯例使用负数：-1 通用错误，-2 除零） |

**返回：** Result::Err(code)

**示例**

```redscript
let r = result_err(-2)  // division-by-zero error
```

---

## `result_is_ok` <Badge type="info" text="Since v1.0.0" />

判断 Result 是否为 Ok

```redscript
fn result_is_ok(r: Result): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `r` | 要检测的 Result |

**返回：** Ok 返回 1，Err 返回 0

**示例**

```redscript
let ok = result_is_ok(result_ok(5))  // result: 1
```

---

## `result_is_err`

判断 Result 是否为 Err

```redscript
fn result_is_err(r: Result): int
```

**返回：** Err 返回 1，Ok 返回 0

---

## `result_value` <Badge type="info" text="Since v1.0.0" />

从 Ok 结果中提取值（Err 时返回 0，请先调用 result_is_ok 检查）

```redscript
fn result_value(r: Result): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `r` | 要解包的 Result |

**返回：** Ok 的值，或 0（Err 时）

**示例**

```redscript
let v = result_value(result_ok(99))  // result: 99
```

---

## `result_code`

从 Err 结果中提取错误码（Ok 时返回 0）

```redscript
fn result_code(r: Result): int
```

**返回：** Err 的错误码，或 0（Ok 时）

---

## `result_divide`

带安全检查的整数除法，除数为零时返回 Err(-2)

```redscript
fn result_divide(a: int, b: int): Result
```

**返回：** Ok(a/b) 或 Err(-2)（b == 0 时）

---
