# 表达式

表达式是能产生值的代码片段。RedScript 的表达式从简单的字面量到复杂的 match 表达式都有涵盖。

---

## 字面量

### 整数字面量

```rs
42
-7
0
2147483647
```

类型：`int`（32 位有符号计分板整数）。

### double / 定点数字面量

```rs
3.14        // 类型：fixed（内部存储为 31400）
-0.5        // 类型：fixed
45.0 as double  // 类型：double
```

带小数点的字面量默认是 `fixed`（×10000 存储）。要得到 `double`，需显式转换：`1.5 as double`。

### 字符串字面量

```rs
"hello"
"Score: ${score}"   // 使用 ${expr} 的 f-string 插值
```

字符串是不可变的文本值。在字符串字面量中使用 `${expr}` 可插入任意表达式。

### 布尔字面量

```rs
true
false
```

类型：`bool`。

### Option 字面量

```rs
Some(42)        // 包装一个 Option<int> 值
Some("hello")   // 包装一个 Option<string> 值
None            // 空的 Option
```

`Some(x)` 和 `None` 是 `Option<T>` 的两个构造器。另见下文的 [if let / match](#if-let-some--match-on-option)。

---

## 运算符

### 算术运算符

| 运算符 | 描述         | 示例      |
|--------|--------------|-----------|
| `+`    | 加法          | `a + b`   |
| `-`    | 减法          | `a - b`   |
| `*`    | 乘法          | `a * b`   |
| `/`    | 除法          | `a / b`   |
| `%`    | 取余（取模）  | `a % b`   |
| `-`（一元）| 取负      | `-a`      |

> **fixed 乘法：** 直接将两个 `fixed` 值相乘会导致双重缩放。请使用 `stdlib/math` 中的 `mulfix(a, b)` 函数。

### 比较运算符

| 运算符 | 描述       | 示例     |
|--------|------------|---------|
| `==`   | 等于        | `a == b` |
| `!=`   | 不等于      | `a != b` |
| `<`    | 小于        | `a < b`  |
| `>`    | 大于        | `a > b`  |
| `<=`   | 小于等于    | `a <= b` |
| `>=`   | 大于等于    | `a >= b` |

### 逻辑运算符

| 运算符  | 描述 | 示例        |
|---------|------|------------|
| `&&`    | 与   | `a && b`   |
| `\|\|`  | 或   | `a \|\| b` |
| `!`     | 非   | `!a`       |

### 运算符优先级（由高到低）

| 优先级 | 运算符                  | 结合性 |
|--------|------------------------|--------|
| 7      | `-`（一元）、`!`        | 右     |
| 6      | `*`、`/`、`%`          | 左     |
| 5      | `+`、`-`               | 左     |
| 4      | `<`、`>`、`<=`、`>=`   | 左     |
| 3      | `==`、`!=`             | 左     |
| 2      | `&&`                   | 左     |
| 1      | `\|\|`                 | 左     |

使用括号可覆盖默认优先级：

```rs
let x: int = (2 + 3) * 4;   // 20，而不是 14
```

---

## 函数调用

```rs
// 普通函数调用
say("Hello, world!");

// 带参数
tell(@a, "你有 ${score} 分");
give(@s, "diamond", 3);
```

参数从左到右依次求值，然后调用函数。

---

## 方法调用

方法通过点号在值上调用：

```rs
let v: Vec2 = Vec2 { x: 3, y: 4 };
let len: int = v.length_sq();   // 调用 Vec2::length_sq
let scaled: Vec2 = v.scale(2);  // 调用 Vec2::scale
```

### 链式方法调用

当每个方法都返回一个值时，可以链式调用：

```rs
let result: Vec2 = v.scale(2).add(other);
```

---

## 数组索引

用 `arr[index]` 访问数组元素：

```rs
let arr: int[] = [10, 20, 30];
let first: int = arr[0];   // 10
let last: int  = arr[2];   // 30
```

索引从 0 开始。越界访问是未定义行为。

---

## 结构体字段访问

用 `.` 访问结构体字段：

```rs
struct Point { x: int, y: int }

let p: Point = Point { x: 3, y: 7 };
let px: int = p.x;   // 3
let py: int = p.y;   // 7
```

---

## 类型转换

用 `as` 将值转换为另一种类型：

```rs
let x: int    = 42;
let f: fixed  = x as fixed;    // int → fixed（× 10000）
let d: double = x as double;   // int → double
let back: int = f as int;      // fixed → int（÷ 10000，截断小数）
```

完整转换语义见 [types.md](./types.md)。

---

## Option 构造器

```rs
let a: Option<int>    = Some(42);
let b: Option<string> = Some("hello");
let c: Option<int>    = None;
```

`Option<T>` 是内置泛型类型，表示可能为空的值。`Some(expr)` 包装一个值；`None` 表示缺失。

---

## enum 构造器

### 简单 enum（无载荷）

```rs
enum Direction { North, South, East, West }

let dir: Direction = Direction::North;
```

### 带载荷字段的 enum

```rs
enum Color {
    Red,
    RGB(r: int, g: int, b: int),
}

let c: Color = Color::RGB(r: 255, g: 128, b: 0);
```

载荷字段必须命名。在括号内以 `field: value` 对的形式传入。

---

## match 表达式

`match` 对表达式的值进行分支。每个 arm 有一个模式和一个代码块。

### 匹配整数 / 范围

```rs
let score: int = 85;

match score {
    90..100 => { say("A"); },
    80..89  => { say("B"); },
    70..79  => { say("C"); },
    _       => { say("不及格"); },
}
```

范围两端**均包含**（`min..max`）。`_` 是通配符 arm。

### 匹配 enum

```rs
enum Phase { Idle, Moving, Attacking }

let phase: Phase = Phase::Moving;

match phase {
    Phase::Idle      => { say("休息中"); },
    Phase::Moving    => { say("移动中"); },
    Phase::Attacking => { say("攻击！"); },
}
```

### 匹配带载荷的 enum

```rs
match color {
    Color::RGB(r, g, b) => { tell(@s, "r=${r} g=${g} b=${b}"); },
    Color::Red           => { say("纯红"); },
    _                    => { },
}
```

### 匹配 Option

```rs
let maybe: Option<int> = find_score(@p);

match maybe {
    Some(v) => { tell(@s, "分数：${v}"); },
    None    => { say("未找到分数"); },
}
```

---

## `unwrap_or`

安全地从 `Option<T>` 中提取值，如果为 `None` 则返回默认值：

```rs
let maybe: Option<int> = find_score(@p);
let score: int = maybe.unwrap_or(0);   // 如果为 None，返回 0
```

等价于：

```rs
let score: int = match maybe {
    Some(v) => v,
    None    => 0,
};
```

---

## Lambda 表达式

```rs
let double = (x: int) => x * 2;

let clamp = (v: int) => {
    if (v < 0) { return 0; }
    if (v > 100) { return 100; }
    return v;
};
```

Lambda 捕获词法作用域，可以传递给高阶函数。
