# 装饰器

装饰器为函数附加行为，控制函数**何时**以及**如何**被调用。

## @load

在数据包加载时（或 `/reload` 时）运行一次：

```rs
@load
fn init() {
    say("Datapack loaded!");
    scoreboard_add_objective("kills", "playerKillCount");
}
```

## @tick

每个游戏刻运行一次（每秒 20 次）：

```rs
@tick
fn check_health() {
    foreach (player in @a) {
        if (scoreboard_get(player, "health") <= 5) {
            effect(player, "glowing", 1, 1);
        }
    }
}
```

### @throttle(ticks=N)

每 N 个游戏刻运行一次：

```rs
@throttle(ticks=20)
fn every_second() {
    say("One second passed");
}

@throttle(ticks=100)
fn every_five_seconds() {
    actionbar(@a, "Server running");
}
```

## @on_trigger

当玩家激活触发器记分板时运行：

```rs
@on_trigger("shop")
fn open_shop() {
    tellraw(@s, "Welcome to the shop!");
}
```

玩家在游戏内通过以下命令触发：
```
/trigger shop
```

## 运行时事件：@on(EventType)

使用 `@on(EventType)` 绑定编译器支持的事件分发器。这是当前会接入生成运行时资源的事件 API。

支持的事件类型：

| 事件 | 说明 |
|------|------|
| `PlayerDeath` | 玩家死亡 |
| `PlayerJoin` | 玩家加入服务器 |
| `EntityKill` | 玩家击杀实体 |
| `ItemUse` | 玩家使用物品 |

```rs
@on(PlayerDeath)
fn handle_death() {
    scoreboard_add(@s, "deaths", 1);
}

@on(PlayerJoin)
fn handle_join() {
    title(@s, "Welcome!");
}
```

事件运行时会把 execute 上下文设置为触发事件的玩家/实体，因此推荐使用无参数 handler，并在函数体内使用 `@s`。

## 旧式专用事件装饰器

解析器仍会为了兼容识别 `@on_death`、`@on_login`、`@on_advancement("id")`、`@on_craft("item")`、`@on_join_team("team")` 等旧名字。新代码不要用它们写事件逻辑：它们不是当前接入运行时事件系统的路径。请改用 `@on(PlayerDeath)`、`@on(PlayerJoin)`、`@on(EntityKill)`、`@on(ItemUse)`，或使用显式的 `@function_tag(...)` 配合你自己的 dispatcher。

## @on(EventType)

这是当前推荐的事件装饰器。更详细说明见 [静态事件](/zh/guide/events)。

## @keep

阻止死代码消除（DCE）优化器移除函数。默认情况下，以 `_` 开头的函数被视为私有/内部函数，如果不可达则可能被移除。使用 `@keep` 强制保留：

```rs
@keep
fn _internal_helper() {
    // 即使名称以 _ 开头，也不会被移除
}
```

## 组合装饰器

一个函数可以有多个装饰器：

```rs
@load
@throttle(ticks=200)
fn scoreboard_display() {
    // 在加载时和每 10 秒都运行
    sidebar_set("Kills", @a, "kills");
}
```

## DCE 与私有函数

RedScript 的死代码消除（DCE）优化器会自动移除不可达的函数：

- 名称**不以** `_` 开头的函数为**公有**——始终生成，可通过 `/function` 调用
- 以 `_` 开头的函数为**私有**——仅在被调用时保留，或使用 `@keep` 强制保留
- 带入口装饰器的函数（`@tick`、`@load`、`@on_trigger`、`@on(EventType)` 等）无论名称如何，始终保留

## 装饰器原理

装饰器编译为 Minecraft 的函数标签系统：

| 装饰器 | 编译为 |
|--------|--------|
| `@load` | `#minecraft:load` 标签 |
| `@tick` | `#minecraft:tick` 标签 |
| `@throttle(ticks=N)` | 带间隔的 schedule 命令 |
| `@on_trigger("x")` | 触发器记分板检测 |
| `@on(EventType)` | PlayerDeath/PlayerJoin/EntityKill/ItemUse 的运行时事件分发 |
| 旧式 `@on_*` 事件装饰器 | 仅保留解析兼容；新代码优先用 `@on(EventType)` |

## 下一步

- [结构体与枚举](/zh/guide/structs-enums) — 自定义数据类型
- [装饰器参考](/zh/reference/decorators) — 完整的装饰器列表
