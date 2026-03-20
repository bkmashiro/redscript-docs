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
    scoreboard_add(@s, "deaths", 1);
}
```

**编译为：** 使用基于进度的死亡检测。

**上下文：** `@s` 指代死亡的玩家。

## @on_login

当玩家登录（加入）服务器时运行。

**语法：** `@on_login`

```rs
@on_login
fn welcome() {
    title(@s, "Welcome!");
    tag_add(@s, "joined");
}
```

**编译为：** 基于标签的检测——每 tick 检查没有加入标签的玩家。

**上下文：** `@s` 指代加入的玩家。

## @on_advancement

当玩家获得特定进度时运行。

**语法：** `@on_advancement("advancement_id")`

```rs
@on_advancement("story/mine_diamond")
fn got_diamonds() {
    tellraw(@s, "You found diamonds! Here's a reward.");
    give(@s, "emerald", 5);
}
```

**编译为：** 使用进度奖励函数机制。

**上下文：** `@s` 指代获得进度的玩家。

## @on_craft

当玩家合成特定物品时运行。

**语法：** `@on_craft("item_id")`

```rs
@on_craft("minecraft:diamond_sword")
fn crafted_sword() {
    tellraw(@s, "You crafted a diamond sword!");
    effect(@s, "strength", 200, 1);
}
```

**编译为：** 带 `inventory_changed` 触发器条件的进度检测。

**上下文：** `@s` 指代合成的玩家。

## @on_join_team

当玩家加入特定队伍时运行。

**语法：** `@on_join_team("team_name")`

```rs
@on_join_team("red")
fn joined_red_team() {
    title(@s, "Red Team!");
    effect(@s, "speed", 200, 1);
}
```

**编译为：** 队伍加入检测。

**上下文：** `@s` 指代加入队伍的玩家。

## @on(EventType)

处理静态事件类型。事件处理器每 tick 通过标签检测轮询。

**语法：** `@on(EventType)`

**支持的事件类型：**

| 事件 | 描述 | 检测方式 |
|------|------|----------|
| `PlayerDeath` | 玩家死亡 | 基于分数 |
| `PlayerJoin` | 玩家加入服务器 | 基于标签 |
| `BlockBreak` | 玩家破坏方块 | 基于进度 |
| `EntityKill` | 玩家击杀实体 | 基于分数 |
| `ItemUse` | 玩家使用物品 | 基于分数 |

```rs
@on(PlayerDeath)
fn handle_player_death() {
    say("A player has died!");
    scoreboard_add(@s, "deaths", 1);
}

@on(PlayerJoin)
fn handle_player_join() {
    title(@s, "Welcome to the Server!");
}

@on(BlockBreak)
fn handle_block_break() {
    scoreboard_add(@s, "blocks_broken", 1);
}
```

**编译为：** 每 tick 使用事件内部标签（如 `rs.just_died`）对 `@a` 进行标签检查。

## @schedule

在数据包加载后经过固定延迟（以 tick 为单位）后，调度函数执行一次。

**语法：** `@schedule(delay=N)`

| 参数 | 描述 |
|------|------|
| `delay=N` | 函数执行前等待的 tick 数。 |

```rs
@schedule(delay=100)
fn delayed_start() {
    // 在数据包加载后 5 秒（100 tick）运行
    say("Game starting!");
}

@schedule(delay=1200)
fn end_game() {
    // 在数据包加载后 60 秒（1200 tick）运行
    say("Time's up!");
    scoreboard_display("sidebar", "kills");
}
```

**编译为：** 在 `@load` 初始化函数中生成 `schedule function <ns>:<name> <delay>t`。

::: tip
对于重复性调度任务，请使用 `@tick(rate=N)`。`@schedule` 仅用于一次性的启动延迟。
:::

## @keep

阻止死代码消除（DCE）优化器移除函数。

**语法：** `@keep`

默认情况下，以 `_` 开头的函数被视为私有函数，如果不可达则可能被移除。`@keep` 强制将其包含在编译输出中。

```rs
@keep
fn _internal_helper() {
    // 即使名称以 _ 开头，也会保留
}
```

**使用场景：**
- 只通过游戏内 `/function` 调用的工具函数
- 需要在激进 DCE 后仍保留的函数

## @coroutine

将函数标记为协程——一种可在循环回边处将控制权交还给 Minecraft 的长期任务，防止复杂计算导致服务器超时。

**语法：** `@coroutine` 或 `@coroutine(batch=N)` 或 `@coroutine(onDone="fn_name")`

```rs
@coroutine(batch=10, onDone="on_done")
fn process_all_players() {
    foreach (p in @a) {
        heavy_computation(p);
        // 每 10 次迭代在循环回边处让出控制权
    }
}

fn on_done() {
    say("Processing complete!");
}
```

**参数：**

| 参数 | 描述 |
|------|------|
| `batch=N` | 每 tick 执行的循环迭代次数，之后让出控制权。默认值：1（每次迭代都让出）。 |
| `onDone="fn"` | 协程完成所有迭代后调用的无参函数名。 |

**行为：**
- 在循环回边处（每次 `foreach` / `for` / `while` 循环体迭代结束时）让出控制权。
- 使用 `schedule function ... 1t` 在下一个 tick 恢复执行。
- 状态在 tick 之间通过专用记分板保存。
- 同一时间只有一个协程实例在运行；在协程运行时再次启动为空操作。

**使用场景：**
- 处理大量实体列表而不导致 `/tick warp` 超时
- 将繁重的地图生成分散到多个 tick 中
- 分块批量操作（物品栏扫描、世界编辑）

## 装饰器总结

| 装饰器 | 触发条件 | `@s` 上下文 |
|--------|----------|-------------|
| `@load` | 数据包加载 / `/reload` | 服务器 |
| `@tick` | 每个游戏刻（20次/秒） | 服务器 |
| `@tick(rate=N)` | 每 N 个游戏刻 | 服务器 |
| `@on_trigger("x")` | 玩家运行 `/trigger x` | 触发的玩家 |
| `@on_death` | 实体死亡 | 死亡的实体 |
| `@on_login` | 玩家加入服务器 | 加入的玩家 |
| `@on_advancement("id")` | 玩家获得进度 | 玩家 |
| `@on_craft("item")` | 玩家合成物品 | 合成的玩家 |
| `@on_join_team("team")` | 玩家加入队伍 | 玩家 |
| `@on(EventType)` | 静态事件触发 | 事件玩家 |
| `@schedule(delay=N)` | 数据包加载后 N 个 tick 运行一次函数 | 服务器 |
| `@keep` | （优化器提示，无运行时效果） | — |
| `@coroutine` | 将函数标记为协程（在循环回边处让出控制权） | — |
