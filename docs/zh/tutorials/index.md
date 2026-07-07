# 教程

这一节现在分成两条学习路线：

- 一条全新的 8 篇入门系列，从安装开始，一直讲到协程与优化器相关工作流。
- 一条项目型教程路线，适合已经会基础语法、想直接拆完整小游戏的人。

## 入门系列

| # | 教程 | 主题 |
|---|------|------|
| 1 | [快速开始](./01-getting-started) | 安装 CLI、编译文件、做出第一个数据包 |
| 2 | [变量与类型](./02-variables-and-types) | `let`、`const`、`int`、`double`、`string`、`bool` |
| 3 | [控制流](./03-control-flow) | `if`、`while`、`for`、`match`、`break`、`continue` |
| 4 | [函数](./04-functions) | `fn`、参数、返回值、递归 |
| 5 | [结构体与枚举](./05-structs-and-enums) | `struct`、`enum`、`match`、`impl` 方法 |
| 6 | [标准库速览](./06-stdlib-tour) | 常用标准库模块与导入方式 |
| 7 | [事件与 Tick](./07-events-and-ticks) | `@load`、`@tick`、`@on_trigger`、`@on(...)` |
| 8 | [进阶主题](./08-advanced) | `@coroutine`、`@inline`、优化器、模块导入 |

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

## 建议学习顺序

1. 先按顺序读完 1 到 5。
2. 需要查精确语法时，搭配 [参考文档](/zh/reference/syntax) 使用。
3. 第 6 篇更像地图，不需要一开始把所有 stdlib API 背下来。
4. 读完 8 篇之后，再进入下面的项目型教程会更顺。

## 项目型教程

| 教程 | 难度 | 主线内容 |
|------|------|----------|
| [Hello World](./01-hello-world) | 初级 | 玩家问候、计分板、标题 |
| [僵尸生存](./zombie-survival) | 中级 | 波次、刷怪、难度递增 |
| [跑酷竞速](./parkour-race) | 中级 | 检查点、计时器、排行榜 |
| [夺旗模式](./capture-the-flag) | 高级 | 队伍、计分、重生 |

## 相关指南

- [快速开始](/zh/guide/getting-started)
- [第一个数据包](/zh/guide/first-datapack)
- [变量与类型](/zh/guide/variables)
- [函数](/zh/guide/functions)
- [结构体与枚举](/zh/guide/structs-enums)
- [静态事件](/zh/guide/events)
