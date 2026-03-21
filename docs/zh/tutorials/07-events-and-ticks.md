# 教程 07：事件与 Tick

**难度：** 中级  
**预计时间：** ~30 分钟  
**前置要求：** [教程 06](./06-stdlib-tour)

## 目标

理解 RedScript 代码是怎样接入 Minecraft 执行模型的。

## `@load`

`@load` 用于初始化：

```rs
@load
fn setup() {
    say("Datapack loaded")
}
```

常见用途：

- 初始化 scoreboard
- 重置初始状态
- 输出欢迎消息

## `@tick`

`@tick` 适合每 tick 都要跑的逻辑：

```rs
@tick
fn every_tick() {
    // 每秒 20 次
}
```

要克制使用。Tick 函数天然在热路径上。

如果不需要这么频繁，优先用 `@tick(rate=N)`：

```rs
@tick(rate=20)
fn every_second() {
    actionbar(@a, "One second passed")
}
```

## `@on_trigger`

`@on_trigger("name")` 适合玩家主动触发的入口。

```rs
@on_trigger("kit")
fn kit() {
    give(@s, "minecraft:bread", 8)
}
```

玩家执行：

```text
/trigger kit
```

这里 `@s` 就是触发该指令的玩家。

## `@on(...)`

`@on(EventType)` 适合类型化静态事件。

```rs
@on(PlayerJoin)
fn welcome() {
    title(@s, "Welcome!")
}
```

当前参考文档已经覆盖的事件类型包括：

- `PlayerJoin`
- `PlayerDeath`
- `BlockBreak`
- `EntityKill`
- `ItemUse`

## 一个完整的事件驱动示例

```rs
namespace tutorial07

let online_count: int = 0

@load
fn setup() {
    say("Event tutorial loaded")
}

@tick(rate=20)
fn heartbeat() {
    actionbar(@a, f"Tracked players: {online_count}")
}

@on_trigger("kit")
fn give_kit() {
    give(@s, "minecraft:stone_sword", 1)
    give(@s, "minecraft:bread", 8)
    tell(@s, "Starter kit granted")
}

@on(PlayerJoin)
fn on_join() {
    online_count = online_count + 1
    title(@s, "Welcome to the server")
}

@on(PlayerDeath)
fn on_death() {
    tell(@s, "Respawn and try again")
}
```

## 该怎么选入口

- 一次性初始化用 `@load`
- 周期逻辑用 `@tick(rate=N)`
- 玩家主动操作用 `@on_trigger`
- 事件反应用 `@on(...)`

## Tick 设计建议

- tick 函数尽量短
- 普通 `@tick` 里避免大循环
- 把复杂逻辑拆成 helper
- 昂贵循环放到 coroutine

## 练习

1. 再加一个 `@on_trigger("rules")`。
2. 把 heartbeat 频率从 20 tick 改成 100 tick。
3. 再加一个 `@on(BlockBreak)` 处理器。

下一篇：[教程 08：进阶主题](./08-advanced)
