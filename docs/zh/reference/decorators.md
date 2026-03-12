# 装饰器参考

RedScript 所有装饰器的完整参考。

## @load

在数据包加载或重载时运行函数。

**语法：** `@load`

```rs
@load
fn init() {
    say("Loaded!");
}
```

**编译为：** 将函数添加到 `#minecraft:load` 函数标签。

**使用场景：**
- 初始化记分板
- 设置队伍
- 重置游戏状态
- 显示欢迎消息

## @tick

每个游戏刻运行函数（每秒 20 次）。

**语法：** `@tick`

```rs
@tick
fn update() {
    // 每秒运行 20 次
}
```

**编译为：** 将函数添加到 `#minecraft:tick` 函数标签。

::: warning
谨慎使用 `@tick`。每秒运行 20 次复杂逻辑可能导致卡顿。尽量使用 `@tick(rate=N)`。
:::

## @tick(rate=N)

每 N 个游戏刻运行函数。

**语法：** `@tick(rate=N)`

| 频率 | 运行间隔 |
|------|----------|
| `rate=1` | 每个游戏刻（同 `@tick`） |
| `rate=20` | 每秒 |
| `rate=100` | 每 5 秒 |
| `rate=200` | 每 10 秒 |
| `rate=1200` | 每分钟 |

```rs
@tick(rate=20)
fn every_second() {
    // 每秒运行一次
}

@tick(rate=1200)
fn every_minute() {
    // 每分钟运行一次
}
```

**编译为：** 使用 `schedule` 命令和指定间隔。

## @on_trigger

当玩家激活触发器记分板时运行。

**语法：** `@on_trigger("trigger_name")`

```rs
@on_trigger("menu")
fn open_menu() {
    tellraw(@s, "Menu opened!");
}
```

**玩家激活方式：** `/trigger menu`

**编译为：**
1. 创建触发器记分板目标
2. 检测分数从 0 变化
3. 执行后重置触发器

**使用场景：**
- 玩家激活菜单
- 商店系统
- 投票系统
- 自定义命令

## @on_death

当实体死亡时运行。

**语法：** `@on_death`

```rs
@on_death
fn handle_death() {
    tellraw(@s, "You died!");
    scoreboard_add_score(@s, "deaths", 1);
}
```

**编译为：** 使用基于进度的死亡检测。

**上下文：** `@s` 指代死亡的玩家。

## @on_join

当玩家加入服务器时运行。

**语法：** `@on_join`

```rs
@on_join
fn welcome() {
    title(@s, "Welcome!");
    tag_add(@s, "joined");
}
```

**编译为：** 检测没有 "joined" 标签的玩家并运行函数。

**上下文：** `@s` 指代加入的玩家。

## @on_respawn

当玩家死亡后重生时运行。

**语法：** `@on_respawn`

```rs
@on_respawn
fn on_respawn() {
    effect(@s, "regeneration", 10, 1);
    give(@s, "bread", 5);
}
```

**编译为：** 基于进度的重生检测。

**上下文：** `@s` 指代重生的玩家。

## 组合装饰器

函数可以有多个装饰器：

```rs
@load
@tick(rate=200)
fn refresh_display() {
    sidebar_set("Stats", @a, "kills");
}
```

此函数在加载时和每 10 秒都会运行。

## 装饰器总结

| 装饰器 | 触发条件 | `@s` 上下文 |
|--------|----------|-------------|
| `@load` | 数据包加载 / `/reload` | 服务器 |
| `@tick` | 每个游戏刻（20次/秒） | 服务器 |
| `@tick(rate=N)` | 每 N 个游戏刻 | 服务器 |
| `@on_trigger("x")` | 玩家运行 `/trigger x` | 触发的玩家 |
| `@on_death` | 实体死亡 | 死亡的实体 |
| `@on_join` | 玩家加入 | 加入的玩家 |
| `@on_respawn` | 玩家重生 | 重生的玩家 |
