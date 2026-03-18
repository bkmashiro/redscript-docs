# 变量与类型

## 声明变量

使用 `let` 声明可变变量，`const` 声明常量：

```rs
let health: int = 20;
let name: string = "Steve";
const MAX_PLAYERS: int = 16;
```

`const` 的值不能重新赋值：

```rs
const PI: float = 3.14;
PI = 3.15; // 错误：不能重新赋值常量
```

`const` 声明支持负数字面量：

```rs
const MIN_SCORE: int = -50;
const DEPTH: int = -64;      // 例如 Minecraft 基岩层高度
```

## 类型

RedScript 有五种基本类型：

| 类型 | 描述 | 示例 |
|------|------|------|
| `int` | 整数（记分板，32 位有符号） | `42`、`-7`、`0` |
| `fixed` | 定点数，缩放 ×10000（v2.5.0 中 `float` 重命名） | `10000`（= 1.0）、`15000`（= 1.5） |
| `double` | IEEE 754 双精度，NBT 存储（v2.5.0 新增） | `x as double` |
| `string` | 字符串 | `"hello"`、`"Steve"` |
| `bool` | 布尔值 | `true`、`false` |

> **v2.5.0 说明：** `float` 已重命名为 `fixed`。现有代码使用 `float` 会触发废弃警告，应迁移至 `fixed`。`double` 类型为全新类型。

### 整数

```rs
let score: int = 0;
let negative: int = -10;
score = score + 1;
```

### 定点数（`fixed`）

`fixed` 将小数表示为 ×10000 缩放的整数。这是在数据包中进行分数运算而无需浮点硬件的标准方法。

```rs
let speed: fixed = 15000;   // 1.5 — 存储为整数 15000
let half: fixed  = 5000;    // 0.5
let one: fixed   = 10000;   // 1.0
```

**关键规则：**
- `10000` = 1.0，`15000` = 1.5，`0` = 0.0
- 两个 `fixed` 值相乘用 `mulfix(a, b)` — 内部除以 1000 重新缩放：`mulfix(15000, 20000)` = `30000`（1.5 × 2.0 = 3.0）
- 用 `as fixed` 从 `int` 或 `double` 转换

```rs
let x: int = 5;
let xf: fixed = x as fixed;  // 5 * 10000 = 50000

let d: double = 3 as double;
let df: fixed = d as fixed;   // floor(3.0 * 10000) = 30000
```

> **警告：** 直接对两个 `fixed` 值做乘法（如 `a * b`）不会自动重新缩放。编译器会发出 lint 警告。乘法用 `mulfix`，除法用 `divfix`。

### 双精度（`double`）

`double` 将 IEEE 754 双精度浮点数存储在 NBT 中（`rs:d`）。用于高精度三角函数、物理模拟或超出 int32 范围的值。

```rs
let n: int    = 42;
let d: double = n as double;   // 42.0

let f: fixed  = 15000;          // 1.5
let d2: double = f as double;   // 1.5（自动除以 10000）

let back: fixed = d as fixed;   // floor(d * 10000)
let back_int: int = d as int;   // floor(d)
```

> **NBT 存储：** `double` 值存储在 `rs:d __dp0`（及 `__dp1`、`__dp2` 等）。算术运算使用 `stdlib/math_hp.mcrs` 中的函数。

### 显式 `as` 转换

v2.5.0 起，数值类型转换需要显式 `as` 转换。`int`、`fixed`、`double` 之间不再支持隐式转换。

```rs
// ✅ 正确 — 显式转换
let n: int   = 5;
let f: fixed = n as fixed;   // 50000

// ❌ 错误 — 隐式转换已移除
let f2: fixed = n;           // 编译错误：期望 fixed，得到 int
```

### 字符串

字符串支持 `${}` 插值：

```rs
let player: string = "Alex";
let msg: string = "Hello, ${player}!";
say(msg); // Hello, Alex!
```

### 布尔值

```rs
let alive: bool = true;
let creative: bool = false;
```

## 数组

数组存储多个相同类型的值：

```rs
let scores: int[] = [10, 20, 30];
let names: string[] = ["Alice", "Bob"];
```

通过索引访问元素：

```rs
let first: int = scores[0]; // 10
```

## 类型推断

当值很明确时，RedScript 可以推断类型：

```rs
let health = 20;        // 推断为 int
let name = "Steve";     // 推断为 string
let alive = true;       // 推断为 bool
let speed = 1.5;        // 推断为 float
```

`const` 也支持类型推断 — 类型注解是可选的：

```rs
const MAX_PLAYERS = 16;     // 推断为 int
const PREFIX = "[Game]";    // 推断为 string
const RATE = 0.5;           // 推断为 float
```

显式类型声明更清晰，但不是必须的。

## 全局变量

在顶层声明的变量是全局的，可以从任何函数访问：

```rs
let score: int = 0;

@tick(rate=20)
fn update() {
    score = score + 1;
    actionbar(@a, "Score: ${score}");
}

fn reset() {
    score = 0;
}
```

全局变量存储为 Minecraft 记分板目标。

## 下一步

- [函数](/zh/guide/functions) — 定义可复用逻辑
- [结构体与枚举](/zh/guide/structs-enums) — 自定义数据类型
