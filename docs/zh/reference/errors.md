# 错误信息指南

本指南涵盖编译 RedScript 时最常见的错误。每个错误都包含原因、触发代码示例和修复方法。

---

## TypeError：类型不匹配（int 与 fixed/double）

**分类：** `TypeError`

### 原因

RedScript 没有隐式数值类型转换。在算术运算或赋值中混用 `int` 和 `fixed`（或 `int` 和 `double`）而不进行显式转换，会导致编译时错误。

### 触发代码

```rs
let score: int = 100;
let bonus: fixed = 1.5;

// ❌ TypeError: 类型不匹配：无法隐式转换 fixed 为 int
//    （使用显式转换：'as int'）
let total: int = score + bonus;
```

```rs
fn give_xp(amount: int) { /* ... */ }

let multiplied: fixed = 2.5;
// ❌ TypeError: 函数 'give_xp' 的第 1 个参数期望 int，得到 fixed
give_xp(multiplied);
```

### 修复方法

使用 `as` 进行显式转换：

```rs
let score: int = 100;
let bonus: fixed = 1.5;

// ✅ 将 score 转换为 fixed，然后进行 fixed 算术
let total_fixed: fixed = score as fixed + bonus;
// ✅ 如果需要 int 结果，再转换回来
let total: int = total_fixed as int;
```

```rs
give_xp(multiplied as int);   // ✅ 截断小数部分
```

**转换语义：**
- `x as fixed` —— 乘以 10000（int → fixed）
- `x as int` —— 除以 10000，截断小数（fixed → int）
- `x as double` —— 提升为 IEEE 754 双精度浮点

---

## [StringConcat] 用 `+` 拼接字符串

**分类：** `TypeError`（带 `[StringConcat]` 标签的 lint 警告）

### 原因

RedScript 不支持用 `+` 运算符拼接字符串。`+` 运算符仅用于数值加法。尝试用 `+` 拼接字符串会产生此错误。

### 触发代码

```rs
let name: string = "Steve";
let greeting: string = "Hello, " + name;
// ❌ [StringConcat] 不支持用 '+' 进行字符串拼接。
//    请改用 f-string：f"文字{变量}"

let score: int = 42;
let msg: string = "Score: " + score;
// ❌ 同样的错误
```

### 修复方法

使用 **f-string**（格式字符串）：

```rs
let name: string = "Steve";
let greeting = f"Hello, {name}";       // ✅

let score: int = 42;
tell(@s, f"Score: {score}");           // ✅ —— 直接传给 tell/say/subtitle
actionbar(@a, f"Level: {level}");      // ✅
```

> **注意：** F-string 可以传给 `tell`、`say`、`subtitle`、`title`、`actionbar` 和 `announce`。它们不能存储在 `string` 变量中——f-string 的类型是 `format_string`，在调用处消费。

---

## [FloatArithmetic] 在算术中使用 float

**分类：** `TypeError`（带 `[FloatArithmetic]` 标签的 lint 警告）

### 原因

`float` 是 RedScript 旧版遗留的废弃类型。它是一种系统边界类型，仅用于读写 MC NBT 的 float 值——不用于算术运算。在算术表达式中使用 `float` 会生成此警告。结果是未定义的。

### 触发代码

```rs
let x: float = 1.5;
let y: float = 2.0;
let z: float = x * y;
// ⚠ [FloatArithmetic] 'float' 是系统边界类型（MC NBT）；
//   请使用 'fixed' 进行算术运算。Float 算术结果未定义。
```

```rs
fn compute(a: float): float {
    return a * 2.0;
// ⚠ [FloatArithmetic] 'float' 是系统边界类型（MC NBT float）；
//   请改用 'fixed' 进行算术运算。
}
```

### 修复方法

将所有 `float` 替换为 `fixed`。乘法使用 `stdlib/math` 中的 `mulfix()`：

```rs
import "stdlib/math"

let x: fixed = 1.5;
let y: fixed = 2.0;
let z: fixed = mulfix(x, y);   // ✅ = 3.0

fn compute(a: fixed): fixed {
    return mulfix(a, 2.0);     // ✅
}
```

---

## 函数未找到 / 参数数量错误

**分类：** `TypeError`

### 原因

调用了作用域中未声明的函数。常见原因：
1. 忘记 `import` 标准库模块
2. 函数名拼写错误
3. 调用了 `module library` 中的函数但没有 import

### 触发代码

```rs
// ❌ mulfix 来自 stdlib/math —— 需要 import
let result: fixed = mulfix(1.5, 2.0);
```

```rs
// ❌ 拼写错误
let s: int = sin_Hp(450000);   // 应该是 sin_hp
```

```rs
// ❌ import 了错误的模块
import "stdlib/math"    // 错误模块
let s: int = sin_hp(450000);   // sin_hp 在 stdlib/math_hp 中
```

### 修复方法

在文件顶部添加正确的 `import` 语句：

```rs
import "stdlib/math"       // mulfix, divfix, abs_fixed, clamp_fixed, …
import "stdlib/math_hp"    // sin_hp, cos_hp, ln_hp, init_trig
import "stdlib/random"     // rand, rand_range
import "stdlib/list"       // list_sort, list_filter, …

let result: fixed = mulfix(1.5, 2.0);   // ✅
```

注意大小写——函数名区分大小写。

---

## 参数数量错误

**分类：** `TypeError`

### 原因

调用函数时传入了过多或过少的参数。

### 触发代码

```rs
fn greet(name: string, title: string) {
    say(f"Hello, {title} {name}!");
}

greet("Steve");
// ❌ TypeError: 函数 'greet' 期望 2 个参数，得到 1 个
```

### 修复方法

```rs
greet("Steve", "Sir");   // ✅
```

对于有默认参数的函数，可以省略末尾的参数：

```rs
fn greet(name: string, title: string = "Player") {
    say(f"Hello, {title} {name}!");
}

greet("Steve");           // ✅ title 默认为 "Player"
greet("Steve", "Sir");    // ✅ 显式指定 title
```

---

## 返回类型不匹配

**分类：** `TypeError`

### 原因

函数返回的值与声明的返回类型不匹配。

### 触发代码

```rs
fn get_ratio(): fixed {
    return 42;
    // ❌ 返回类型不匹配：无法隐式转换 int 为 fixed
    //    （使用显式转换：'as fixed'）
}
```

### 修复方法

```rs
fn get_ratio(): fixed {
    return 42 as fixed;   // ✅
}
```

---

## 对 const 赋值

**分类：** `TypeError`

### 原因

试图对 `const` 变量重新赋值。

### 触发代码

```rs
const MAX_PLAYERS: int = 8;
MAX_PLAYERS = 16;
// ❌ TypeError: 无法对 const 'MAX_PLAYERS' 赋值
```

### 修复方法

如果变量需要可变，使用 `let`：

```rs
let max_players: int = 8;
max_players = 16;   // ✅
```

---

## 在循环或条件内调用 setTimeout / setInterval

**分类：** `TypeError`

### 原因

`setTimeout` 和 `setInterval` 在编译时分配计分板槽位。它们不能在循环或条件体内调用，因为那样分配会是模糊的。

### 触发代码

```rs
fn setup_timers(count: int) {
    for i in 0..count {
        setTimeout(20, fn() { say("tick"); });
        // ❌ setTimeout() 不能在循环内调用。
        //    请在顶层声明计时器。
    }
}
```

### 修复方法

将计时器声明移到函数顶层（循环和条件之外）：

```rs
fn setup_timers() {
    setTimeout(20, fn() { say("tick"); });   // ✅
}
```

---

## 快速参考

| 错误标签 | 含义 | 快速修复 |
|---------|------|---------|
| `TypeError: cannot implicitly convert X to Y` | 混用了不同数值类型 | 添加 `as Y` 转换 |
| `[StringConcat]` | 对字符串使用了 `+` | 改用 `f"...{var}..."` f-string |
| `[FloatArithmetic]` | 在算术中使用了废弃的 `float` | 改用 `fixed`，使用 `mulfix()` |
| `Function 'X' expects N arguments, got M` | 参数数量错误 | 检查函数签名 |
| `Return type mismatch` | 返回值类型与声明不匹配 | 对返回值进行转换 |
| `Cannot assign to const` | 对 const 变量重新赋值 | 改用 `let` |
| `setTimeout() cannot be called inside a loop` | 计时器在循环/条件内 | 移到顶层 |
