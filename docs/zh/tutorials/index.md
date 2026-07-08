# 教程

按步骤学习 RedScript：从安装开始，到构建完整小游戏。

## 学习路线

**如果你刚开始，请从这里读起：**

| # | 教程 | 时长 | 重点 |
|---|------|------|------|
| 1 | [快速开始](./01-getting-started) | 20 分钟 | 安装 CLI、第一次编译 |
| 2 | [变量与类型](./02-variables-and-types) | 25 分钟 | `let`、`const`、基础类型 |
| 3 | [控制流](./03-control-flow) | 30 分钟 | `if`、`for`、`while`、`match` |
| 4 | [函数](./04-functions) | 25 分钟 | 参数、返回值、递归 |
| 5 | [结构体与枚举](./05-structs-and-enums) | 30 分钟 | 数据建模、`impl` 块 |
| 6 | [标准库速览](./06-stdlib-tour) | 20 分钟 | 数学、随机数、粒子 |
| 7 | [事件与 Tick](./07-events-and-ticks) | 25 分钟 | `@load`、`@tick`、`@on(...)` |
| 8 | [进阶主题](./08-advanced) | 30 分钟 | `@coroutine`、优化器 |

## 语言细节覆盖表

入门系列现在会分层带到主要语言面，而不是把关键细节都丢到参考文档里：

| 特性区域 | 第一次出现的位置 | 完整参考 |
|----------|------------------|----------|
| `let`、`const`、类型推断 | [02 — 变量与类型](./02-variables-and-types) | [语法](/zh/reference/syntax#variables) |
| `int`、`fixed`、`double`、`string`、`bool` | [02 — 变量与类型](./02-variables-and-types)、[09 — 精确算术](./09-precision-arithmetic) | [类型](/zh/reference/types) |
| 数组与动态下标 | [02 — 变量与类型](./02-variables-and-types)、[03 — 控制流](./03-control-flow) | [表达式](/zh/reference/expressions#array-index) |
| `if`、`while`、范围 `for`、数组 `for`、`foreach` | [03 — 控制流](./03-control-flow) | [语法](/zh/reference/syntax#control-flow) |
| `match`、`_`、整数范围、枚举分支 | [03 — 控制流](./03-control-flow)、[05 — 结构体与枚举](./05-structs-and-enums) | [表达式](/zh/reference/expressions#match-expressions) |
| `Option<T>`、`Some`、`None`、`if let` | [03 — 控制流](./03-control-flow) | [表达式](/zh/reference/expressions#option-constructors) |
| `struct`、`enum`、`impl` | [05 — 结构体与枚举](./05-structs-and-enums) | [类型](/zh/reference/types#structs) |
| 选择器、`@s`、execute 上下文 | [04 — 函数](./04-functions)、[04 — 选择器与上下文](./04-selectors-context) | [语法](/zh/reference/syntax#execute) |
| 装饰器、load/tick/trigger 钩子 | [07 — 事件与 Tick](./07-events-and-ticks) | [装饰器](/zh/reference/decorators) |
| 导入、保留输出、协程、优化器 | [08 — 进阶主题](./08-advanced) | [CLI](/zh/reference/cli) |

## 项目型教程

完整小游戏示例：

| 教程 | 难度 | 简介 |
|------|------|------|
| [Hello World](./01-hello-world) | 初级 | 玩家问候、计分板、标题 |
| [僵尸生存](./zombie-survival) | 中级 | 波次、刷怪、难度递增 |
| [跑酷竞速](./parkour-race) | 中级 | 检查点、计时器、排行榜 |
| [夺旗模式](./capture-the-flag) | 高级 | 队伍、计分、重生 |

## 快速参考

- [语法参考](/zh/reference/syntax)
- [内置函数](/zh/reference/builtins)
- [装饰器](/zh/reference/decorators)
- [标准库模块](/zh/stdlib/)
