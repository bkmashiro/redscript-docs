# 装饰器

装饰器为函数附加行为，控制函数**何时**以及**如何**被调用。

## @load

在数据包加载时（或 `/reload` 时）运行一次：

```rs
@load
fn init() {
    say("Datapack loaded!");
    scoreboard_add("kills", "playerKillCount");
}
```

## @tick

每个游戏刻运行一次（每秒 20 次）：

```rs
@tick
fn check_health() {
    execute_if_score(@a, "health", "..5") {
        effect(@s, "glowing", 1, 1);
    }
}
```

### @tick(rate=N)

每 N 个游戏刻运行一次：

```rs
@tick(rate=20)
fn every_second() {
    say("One second passed");
}

@tick(rate=100)
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

## @on_death

当实体死亡时运行：

```rs
@on_death
fn on_player_death() {
    say("A player has fallen!");
    scoreboard_add_score(@s, "deaths", 1);
}
```

## @on_join

当玩家加入服务器时运行：

```rs
@on_join
fn welcome() {
    title(@s, "Welcome!");
    tellraw(@s, "Type /trigger help for commands");
}
```

## @on_respawn

当玩家重生时运行：

```rs
@on_respawn
fn on_respawn() {
    effect(@s, "regeneration", 5, 2);
    tellraw(@s, "You have respawned!");
}
```

## 组合装饰器

一个函数可以有多个装饰器：

```rs
@load
@tick(rate=200)
fn scoreboard_display() {
    // 在加载时和每 10 秒都运行
    sidebar_set("Kills", @a, "kills");
}
```

## 装饰器原理

装饰器编译为 Minecraft 的函数标签系统：

| 装饰器 | 编译为 |
|--------|--------|
| `@load` | `#minecraft:load` 标签 |
| `@tick` | `#minecraft:tick` 标签 |
| `@tick(rate=N)` | 带间隔的 schedule 命令 |
| `@on_trigger` | 触发器记分板检测 |
| `@on_death` | 基于进度的死亡检测 |

## 下一步

- [结构体与枚举](/zh/guide/structs-enums) — 自定义数据类型
- [装饰器参考](/zh/reference/decorators) — 完整的装饰器列表
