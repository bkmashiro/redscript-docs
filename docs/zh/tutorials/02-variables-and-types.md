# 教程 02：变量与类型

**难度：** 初级  
**预计时间：** ~25 分钟  
**前置要求：** [教程 01](./01-getting-started)

## 目标

学会用 `let` 和 `const` 存值，并掌握最常见、最适合初学者的类型：`int`、`double`、`string`、`bool`。

## `let` 与 `const`

`let` 用来声明可变变量：

```rs
let score: int = 0
let running: bool = true
```

`const` 用来声明编译期常量：

```rs
const MAX_ROUNDS: int = 5
const GREETING: string = "Welcome!"
```

实际区别很简单：

- `let` 后续可以修改
- `const` 不能修改，而且值必须是字面量常量

## `int`

`int` 是默认整数类型，最适合：

- 计数器
- 计时器
- 回合数
- 血量类数据
- 以 scoreboard 为主的逻辑

```rs
let lives: int = 3
let wave: int = 1

wave = wave + 1
```

如果你不确定该用什么数字类型，先用 `int`。

## `double`

`double` 适合你真的需要浮点精度的时候。

```rs
let gravity: double = 9.81
let launch_angle: double = 45.0 as double
```

RedScript 不会做隐式数字转换，所以要显式 cast：

```rs
let count: int = 5
let precise: double = count as double
```

如果你只需要整数，继续用 `int`，通常更简单。

## `string`

`string` 用于名字、消息、ID 等文本内容。

```rs
let player_name: string = "Alex"
let item_id: string = "minecraft:golden_apple"
```

输出字符串时优先用 f-string：

```rs
let score: int = 12
say(f"Current score: {score}")
```

## `bool`

`bool` 只有 `true` 和 `false`。

```rs
let running: bool = false
let debug_mode: bool = true
```

布尔值最常见的用途就是条件判断：

```rs
if (debug_mode) {
    say("Debug mode is enabled")
}
```

## 类型推断

初始化足够明显时，可以不写类型：

```rs
let coins = 10
let title = "Shop"
let enabled = true
```

但在教程和学习阶段，显式写类型通常更清楚。

## 一个小状态示例

```rs
namespace tutorial02

const START_LIVES: int = 3

let lives: int = START_LIVES
let level_name: string = "Training Grounds"
let active: bool = false
let spawn_x: double = 12.5

@load
fn setup() {
    active = true
    say(f"Loaded {level_name}")
    say(f"Lives: {lives}")
}
```

这个例子里：

- 常量负责稳定配置
- 可变变量负责运行时状态
- 字符串负责可读消息
- 布尔值负责开关
- `double` 负责更精确的位置或计算

## 更新变量

```rs
@on_trigger("lose_life")
fn lose_life() {
    if (lives > 0) {
        lives = lives - 1
        say(f"Lives left: {lives}")
    }
}
```

## `int` 与 `double` 的转换

```rs
fn average(total: int, players: int) -> double {
    return total as double / players as double
}
```

显式转换能让编译器知道你要走哪套数值语义。

## 完整示例

```rs
namespace tutorial02

const START_LIVES: int = 3
const PACK_NAME: string = "Training Pack"

let lives: int = START_LIVES
let active: bool = false
let accuracy: double = 0.95

@load
fn setup() {
    active = true
    say(f"{PACK_NAME} loaded")
    say(f"Accuracy target: {accuracy}")
}

@on_trigger("status")
fn status() {
    tell(@s, f"Lives: {lives}")
    tell(@s, f"Active: {active}")
}

@on_trigger("lose_life")
fn lose_life() {
    if (lives > 0) {
        lives = lives - 1
        tell(@s, f"Lives left: {lives}")
    }
}
```

## 练习

1. 加一个 `const PACK_VERSION: string`。
2. 加一个表示半径或速度的 `double`。
3. 加一个控制调试消息的 `bool`。

下一篇：[教程 03：控制流](./03-control-flow)
