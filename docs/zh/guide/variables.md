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

RedScript 有四种基本类型：

| 类型 | 描述 | 示例 |
|------|------|------|
| `int` | 整数 | `42`、`-7`、`0` |
| `float` | 小数 | `3.14`、`-0.5` |
| `string` | 字符串 | `"hello"`、`"Steve"` |
| `bool` | 布尔值 | `true`、`false` |

### 整数

```rs
let score: int = 0;
let negative: int = -10;
score = score + 1;
```

### 浮点数

```rs
let speed: float = 1.5;
let ratio: float = 0.75;
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
