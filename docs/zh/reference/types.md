# 类型系统指南

RedScript 有四种数值类型。选择正确的类型很重要——混用不同类型需要显式转换，编译器会拒绝隐式类型转换。

## 四种数值类型

| 类型 | 底层实现 | 范围 | 小数 | 适用场景 |
|------|---------|------|------|---------|
| `int` | 计分板（32位有符号整数） | ±2,147,483,647 | 无 | 大多数数值的默认类型 |
| `fixed` | 计分板 × 10000 | ±214,748 | 4位小数 | 需要小数的数学运算 |
| `double` | NBT IEEE 754 双精度浮点 | ±1.8 × 10³⁰⁸ | 完整精度 | 高精度/科学计算 |
| `float` | *（已废弃）* | 与 `fixed` 相同 | 精度较低 | **避免使用，改用 `fixed`** |

### `int`

普通的 32 位有符号整数，由计分板条目支撑。没有小数部分。这是计数器、血量、等级等不需要小数的值的默认类型。

```rs
let score: int = 42;
let health: int = 20;
```

### `fixed`

定点数，以整数 × 10000 的形式存储。值 `10000` 代表 `1.0`，`5000` 代表 `0.5`，`-7071` 代表 `≈ −0.7071`。

- 范围：±214,748（即 ±2,147,483,647 / 10,000）
- 精度：精确到 4 位小数

当你需要游戏内数学的小数值时（速度、百分比、角度等），使用 `fixed`。

```rs
let speed: fixed = 1.5;       // 内部存储为 15000
let ratio: fixed = 0.25;      // 内部存储为 2500

// 两个 fixed 值相乘后，需要除以 10000 以补偿双重缩放
// 正确做法：使用标准库的 mulfix()
import "stdlib/math"
let a: fixed = 0.5;
let b: fixed = 0.4;
let result: fixed = mulfix(a, b);   // = 0.2（内部值 2000）
```

> **乘法补偿：** 直接将两个 `fixed` 值相乘会导致结果被 10000² 缩放。使用标准库的 `mulfix(a, b)` 函数，它会在乘法后自动除以 10000。

### `double`

IEEE 754 双精度浮点数，由 NBT 支撑。完整精度（约 15 位有效数字）。比 `fixed` 更重，因为它读写 NBT 而不是计分板。

只有在需要科学精度或使用 `stdlib/math_hp`（高精度三角/对数函数）时才使用 `double`。

```rs
let angle: double = 45.0 as double;
import "stdlib/math_hp"
let s: int = sin_hp(450000);   // sin_hp 接收 int（角度 × 10000），返回 int × 10000
```

### `float`（已废弃）

`float` 是旧版 RedScript 遗留的 `fixed` 别名。它精度较低，使用会触发 `[FloatArithmetic]` 警告。**新代码中不要使用 `float`。**

---

## 显式类型转换

**没有隐式数值转换。** 编译器会拒绝不带显式转换的混用类型。

```rs
// 语法：<表达式> as <类型>
let x: int    = 42;
let f: fixed  = x as fixed;   // int → fixed（值 × 10000）
let d: double = x as double;  // int → double
let back: int = f as int;     // fixed → int（值 ÷ 10000，截断小数）
```

转换语义：

| 从 → 到 | 操作 |
|---------|------|
| `int` → `fixed` | 乘以 10000 |
| `int` → `double` | 精确提升 |
| `fixed` → `int` | 除以 10000（截断小数） |
| `fixed` → `double` | 除以 10000，存入 NBT |
| `double` → `int` | 截断为整数 |
| `double` → `fixed` | 乘以 10000，存入计分板 |

---

## 何时使用哪种类型

| 场景 | 推荐类型 |
|------|---------|
| 计数器、血量、等级、刻数 | `int` |
| 速度、百分比、角度 | `fixed` |
| 科学计算、高精度三角函数 | `double` + `stdlib/math_hp` |
| 任何标注为 `float` 的变量 | 重构为 `fixed` |

**经验法则：** 默认用 `int`。需要小数时升级到 `fixed`。只有当 `fixed` 的精度（4 位小数）不够时，才使用 `double`。

---

## 常见错误

### 混用 `int` 和 `fixed` 而不转换

```rs
let score: int = 10;
let multiplier: fixed = 1.5;

// ❌ TypeError: 类型不匹配——无法隐式转换 fixed 为 int
//    （使用显式转换：'as fixed'）
let result: int = score + multiplier;

// ✅ 先转换
let result: int = (score as fixed + multiplier) as int;
```

### 忘记在 `fixed` 乘法后补偿

```rs
// ❌ 错误：直接乘法导致双重缩放
let a: fixed = 2.0;   // 内部值 20000
let b: fixed = 3.0;   // 内部值 30000
let bad: fixed = a * b;   // 600000000 —— 代表 60000.0，而不是 6.0

// ✅ 正确：使用 mulfix
import "stdlib/math"
let good: fixed = mulfix(a, b);   // 60000 —— 代表 6.0
```

### 在算术中使用 `float`

```rs
// ❌ 触发 [FloatArithmetic] 警告；float 已废弃
let x: float = 1.5;
let y: float = x * 2.0;

// ✅ 改用 fixed
let x: fixed = 1.5;
let y: fixed = mulfix(x, 2.0);
```

### 用 `+` 拼接字符串

```rs
// ❌ [StringConcat] 错误——不支持 + 字符串拼接
let msg: string = "Score: " + score;

// ✅ 使用 f-string
say(f"Score: {score}");
tell(@s, f"Your health: {health}");
```

---

## 完整示例：速度计算

```rs
import "stdlib/math"

fn tick_physics(vx: fixed, vy: fixed, drag: fixed): (fixed, fixed) {
    // 施加阻力：速度乘以阻力系数
    let new_vx: fixed = mulfix(vx, drag);
    let new_vy: fixed = mulfix(vy, drag);
    return (new_vx, new_vy);
}

fn show_speed(vx: fixed, vy: fixed) {
    // 转换为 int 显示（丢弃小数部分）
    let speed_int: int = vx as int;
    tell(@s, f"Speed X: {speed_int}");
}
```

---

## enum 类型

### 简单 enum

变体被映射为整数常量（0、1、2……）并编译到计分板上。

```rs
enum Phase { Idle, Moving, Attacking }

let phase: Phase = Phase::Moving;

match phase {
    Phase::Idle      => { say("闲置"); },
    Phase::Moving    => { say("移动"); },
    Phase::Attacking => { say("攻击！"); },
    _                => { },
}
```

### 带载荷字段的 enum

变体可以携带命名的载荷字段，每个字段占用独立的计分板槽位。

```rs
enum Color {
    Red,
    RGB(r: int, g: int, b: int),
}

// 构造
let c: Color = Color::RGB(r: 255, g: 128, b: 0);

// 在 match 中解构
match c {
    Color::RGB(r, g, b) => { tell(@s, "r=${r} g=${g} b=${b}"); },
    Color::Red           => { say("纯红"); },
    _                    => { },
}
```

载荷字段必须**命名**——构造时以 `field: value` 对传入，match 模式中绑定同名变量。

---

## Option\<T\>

`Option<T>` 表示可能存在也可能不存在的值。

```rs
let a: Option<int> = Some(42);
let b: Option<int> = None;
```

### 检查与解包

**`if let`：**

```rs
if let Some(v) = a {
    tell(@s, "Got ${v}");
}
```

**`while let`：**

```rs
while let Some(item) = next_item() {
    process(item);
}
```

**`match`：**

```rs
match a {
    Some(v) => { tell(@s, "值：${v}"); },
    None    => { say("空"); },
}
```

**`unwrap_or`：**

```rs
let score: int = a.unwrap_or(0);   // 为 None 时返回 0
```

### 从函数返回 Option

```rs
fn find_score(target: selector) -> Option<int> {
    let s: int = score(target, #points);
    if (s < 0) { return None; }
    return Some(s);
}
```

---

## 方法链

当 `impl` 方法返回 `self` 或相同类型的新值时，可以链式调用：

```rs
struct Vec2 { x: int, y: int }

impl Vec2 {
    fn scale(self, factor: int) -> Vec2 {
        return Vec2 { x: self.x * factor, y: self.y * factor };
    }
    fn add(self, other: Vec2) -> Vec2 {
        return Vec2 { x: self.x + other.x, y: self.y + other.y };
    }
}

let v: Vec2 = Vec2 { x: 1, y: 2 };
let result: Vec2 = v.scale(3).add(Vec2 { x: 10, y: 0 });
// result = Vec2 { x: 13, y: 6 }
```

方法调用从左到右依次求值，前一个调用的返回值成为下一个调用的接收者。

---

## 泛型

函数和结构体可以用一个或多个类型变量进行参数化：

```rs
fn first<T>(arr: T[]) -> T {
    return arr[0];
}

struct Pair<T> {
    left: T,
    right: T,
}

let n: int = first<int>([10, 20, 30]);
let p: Pair<int> = Pair { left: 1, right: 2 };
```

当编译器能从参数推断类型时，函数调用支持类型推断。
