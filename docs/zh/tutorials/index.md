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

## 建议学习顺序

1. 先按顺序读完 1 到 5。
2. 需要查精确语法时，搭配 [参考文档](/zh/reference/syntax) 使用。
3. 第 6 篇更像地图，不需要一开始把所有 stdlib API 背下来。
4. 读完 8 篇之后，再进入下面的项目型教程会更顺。

## 项目型教程

| 教程 | 难度 | 主线内容 |
|------|------|----------|
| [Hello 数据包](./01-hello-datapack) | 初级 | 加载钩子、触发器、起始物资 |
| [变量与控制流](./02-variables) | 初级 | 可变状态、循环、简单玩法逻辑 |
| [函数与结构体](./03-functions-structs) | 初级 | 逻辑复用与数据建模 |
| [选择器与上下文](./04-selectors-context) | 中级 | `foreach`、`execute`、选择器驱动逻辑 |
| [装饰器与调度](./05-decorators) | 中级 | 定时系统与玩法钩子 |
| [数学与粒子](./06-stdlib-math) | 中级 | 用 stdlib 做可视化效果 |
| [随机数与噪声](./07-stdlib-random) | 中级 | 程序化变化 |
| [协程](./08-coroutines) | 高级 | 把重计算摊到多个 tick |
| [精确算术](./09-precision-arithmetic) | 高级 | `double`、`math_hp` |
| [完整游戏：击杀竞赛](./10-full-game) | 高级 | 综合实战 |

## 相关指南

- [快速开始](/zh/guide/getting-started)
- [第一个数据包](/zh/guide/first-datapack)
- [变量与类型](/zh/guide/variables)
- [函数](/zh/guide/functions)
- [结构体与枚举](/zh/guide/structs-enums)
- [静态事件](/zh/guide/events)
