# `result` — 可失败操作的 Result 类型

导入：`import "stdlib/result.mcrs"`

为可能失败的 datapack 代码提供基于枚举的 `Result` 辅助类型。一个值要么是表示成功的 `Ok(value)`，要么是表示失败的 `Err(code)`，其中 `code` 为调用方自定义的整数错误码。

## 枚举

### `Result`

```rs
enum Result {
  Ok(value: int),
  Err(code: int),
}
```

通常约定使用负整数作为错误码：

- `-1` — 通用错误
- `-2` — 除零
- `-3` — 未找到

## 函数

### `result_ok(value: int): Result`

构造一个成功结果。

**示例：**
```rs
import "stdlib/result.mcrs";
let r: Result = result_ok(42);
```

---

### `result_err(code: int): Result`

使用给定错误码构造一个失败结果。

**示例：**
```rs
import "stdlib/result.mcrs";
let r: Result = result_err(-1);
```

---

### `result_is_ok(r: Result): int`

若 `r` 为 `Ok` 则返回 `1`，否则返回 `0`。

---

### `result_is_err(r: Result): int`

若 `r` 为 `Err` 则返回 `1`，否则返回 `0`。

---

### `result_value(r: Result): int`

从 `Ok(value)` 中提取成功值。若 `r` 是错误则返回 `0`，因此当 `0` 也是合法成功值时，应先检查 `result_is_ok()`。

**示例：**
```rs
import "stdlib/result.mcrs";
let r: Result = result_ok(42);
if (result_is_ok(r) == 1) {
    let value: int = result_value(r);  // 42
}
```

---

### `result_code(r: Result): int`

从 `Err(code)` 中提取错误码。若 `r` 是成功结果则返回 `0`，因此当 `0` 可能引起歧义时，应先检查 `result_is_err()`。

---

### `result_divide(a: int, b: int): Result`

一个可失败算术操作示例。若 `b == 0` 返回 `Err(-2)`，否则返回 `Ok(a / b)`。

**示例：**
```rs
import "stdlib/result.mcrs";

let r: Result = result_divide(10, 2);
if (result_is_ok(r) == 1) {
    let q: int = result_value(r);  // 5
}
```

## 说明

- 当前模块的载荷仅使用 `int`；它是轻量级标记联合，不是完全泛型的代数数据类型。
- `result_value()` / `result_code()` 在另一分支返回 `0` 只是便利用法，不能单独作为成功或失败的判定依据。
