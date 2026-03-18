# 教程 01：Hello Datapack

**难度：** 入门
**时长：** ~15 分钟
**前置条件：** [快速上手](../guide/getting-started)

## 你将构建什么

一个"hello world" datapack，它会在服务器启动时广播公告、向玩家发送私信，并在触发时发放新手礼包。

## 你将学到什么

- RedScript 文件的基本结构（namespace、函数）
- `@load` — 世界加载时执行一次
- `@tick` — 每游戏刻执行一次
- `@on_trigger` — 玩家使用 `/trigger` 时触发
- `say`、`tell`、`give`、`title`、`subtitle`
- 基础 scoreboard 设置

## 第一步：namespace 与加载

每个 datapack 都需要一个 **namespace** —— 一个对所有函数名称进行作用域限定的唯一标识符。

```rs
namespace tutorial01

@load
fn setup() {
    scoreboard_add_objective("tut01_data", "dummy")
    say("Hello! Tutorial 01 datapack loaded.")
    say("Type /trigger welcome_kit to get started!")
}
```

- `namespace tutorial01` 将 MC namespace 设为 `tutorial01`
- `@load` 在世界加载（或执行 `/reload`）时运行一次 `setup()`
- `say()` 以服务器身份广播聊天消息
- `scoreboard_add_objective` 创建一个 scoreboard 供后续使用

## 第二步：Tick 循环

```rs
@tick
fn every_tick() {
    let active: int = scoreboard_get("#active", "tut01_data")
    if (active == 1) {
        // datapack 正在运行 —— 在此添加逻辑
    }
}
```

`@tick` 每游戏刻（每秒 20 次）触发一次。请保持这类函数轻量级 —— 它们会持续运行。目前仅读取一个 scoreboard 标志位。

## 第三步：Trigger 函数

Trigger 是玩家可以通过 `/trigger <name>` 激活的 scoreboard。RedScript 会自动完成绑定。

```rs
@on_trigger("welcome_kit")
fn give_welcome_kit() {
    // tell() 只向触发该 trigger 的玩家发送消息
    tell(@s, "Welcome to Tutorial 01!")
    tell(@s, "Here is your starter kit:")

    // give() 向触发该 trigger 的玩家发放物品
    give(@s, "minecraft:bread", 16)
    give(@s, "minecraft:wooden_sword", 1)
    give(@s, "minecraft:torch", 8)

    // 向所有人广播
    announce("A player claimed the welcome kit!")
}
```

- `@s` 始终指向正在执行函数的实体（trigger 激活者）
- `@a` 指向所有玩家
- `give(selector, item, count)` 使用标准 Minecraft 物品 ID

## 第四步：标题与副标题

```rs
@on_trigger("greet")
fn greet_player() {
    tell(@s, "Hello there, adventurer!")
    title(@s, "Welcome!")
    subtitle(@s, "Enjoy the server")
}
```

`title()` 显示大字标题，`subtitle()` 显示其下方的小字副标题。

## 完整代码

```rs
namespace tutorial01

@load
fn setup() {
    scoreboard_add_objective("tut01_data", "dummy")
    say("Hello! Tutorial 01 datapack loaded.")
    say("Type /trigger welcome_kit to get started!")
}

@tick
fn every_tick() {
    let active: int = scoreboard_get("#active", "tut01_data")
    if (active == 1) {
        // datapack 运行中
    }
}

@on_trigger("welcome_kit")
fn give_welcome_kit() {
    tell(@s, "Welcome to Tutorial 01!")
    tell(@s, "Here is your starter kit:")
    give(@s, "minecraft:bread", 16)
    give(@s, "minecraft:wooden_sword", 1)
    give(@s, "minecraft:torch", 8)
    announce("A player claimed the welcome kit!")
}

@on_trigger("greet")
fn greet_player() {
    tell(@s, "Hello there, adventurer!")
    title(@s, "Welcome!")
    subtitle(@s, "Enjoy the server")
}
```

完整示例：[tutorial_01_hello.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_01_hello.mcrs)

## 试试看

1. 编译：`redscript compile tutorial_01_hello.mcrs -o ./datapack`
2. 将输出文件夹放入世界的 `datapacks/` 目录
3. 在游戏中执行 `/reload`
4. 你应该能在聊天栏看到加载消息
5. 执行 `/trigger welcome_kit` —— 你将获得面包、剑和火把
6. 执行 `/trigger greet` —— 查看标题屏幕

## 下一步

→ [教程 02：变量与控制流](./02-variables)
