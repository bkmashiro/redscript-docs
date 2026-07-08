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

## @function_tag

将函数注册到 Minecraft function tag。这是标签式入口点的通用 primitive。

**语法：** `@function_tag("namespace:path")`

```rs
@function_tag("minecraft:load")
fn init() {
    say("Loaded through a function tag");
}

@function_tag("rs:on_player_death")
fn on_player_death() {
    scoreboard_add(@s, "deaths", 1);
}
```

**编译为：** 将函数引用加入 `data/<namespace>/tags/function/<path>.json`。

`@load` 等价于 `@function_tag("minecraft:load")`，`@tick` 等价于 `@function_tag("minecraft:tick")`。如果两种写法指向同一个 tag，编译器会合并并去重。

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

## 旧式专用事件装饰器

解析器仍会识别旧式专用事件装饰器名称：

- `@on_death`
- `@on_login`
- `@on_advancement("advancement_id")`
- `@on_craft("item_id")`
- `@on_join_team("team_name")`

这些名称保留用于兼容和工具支持，但它们**不是**当前接入运行时事件系统的 API。新事件逻辑不要使用它们，也不要假设它们会生成死亡、登录、进度、合成或队伍检测资源。

请改用：

- `@on(PlayerDeath)` / `@on(PlayerJoin)` / `@on(EntityKill)` / `@on(ItemUse)` 处理编译器已知的运行时事件。
- `@function_tag("namespace:path")` 搭配显式的 Minecraft 或 stdlib dispatcher，处理自定义事件接线。

## @on(EventType)

处理编译器已知的运行时事件类型。事件 runtime 会注入执行上下文，因此推荐写零参数 handler，并在函数体内用 `@s` 表示触发事件的玩家/实体。旧版单个 `Player` 参数仍兼容，但它应理解为事件执行者的 alias，而不是普通函数参数。

**语法：** `@on(EventType)`

**支持的事件类型：**

| 事件 | 描述 | 检测方式 | `@s` 上下文 |
|------|------|----------|-------------|
| `PlayerDeath` | 玩家死亡 | 记分板 / runtime asset | `Player` |
| `PlayerJoin` | 玩家加入服务器 | 标签 / runtime asset | `Player` |
| `EntityKill` | 玩家击杀实体 | 记分板 / runtime asset | `Player` |
| `ItemUse` | 玩家使用物品 | 记分板 / runtime asset | `Player` |

```rs
@on(PlayerDeath)
fn handle_player_death() {
    scoreboard_add(@s, "deaths", 1);
}

// 兼容旧写法：参数会被降低为事件执行者。
@on(PlayerJoin)
fn handle_player_join(player: Player) {
    title(player, "Welcome to the Server!");
}
```

**编译为：** 将 handler 加入该事件的 function tag（例如 `rs:on_player_death`），并自动包含标准库中需要的事件 runtime asset。不支持的事件请用 `@function_tag` 加显式 stdlib/runtime dispatcher 组合。

## @schedule

在数据包加载后经过固定延迟（以 tick 为单位）后，调度函数执行一次。

**语法：** `@schedule(ticks=N)`

| 参数 | 描述 |
|------|------|
| `ticks=N` | 函数执行前等待的 tick 数。 |

```rs
@schedule(ticks=100)
fn delayed_start() {
    // 在数据包加载后 5 秒（100 tick）运行
    say("Game starting!");
}

@schedule(ticks=1200)
fn end_game() {
    // 在数据包加载后 60 秒（1200 tick）运行
    say("Time's up!");
    scoreboard_display("sidebar", "kills");
}
```

**编译为：** 编译器生成调度包装入口，并从启动路径执行 `schedule function <ns>:<name> <ticks>t`。

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
| `@function_tag("namespace:path")` | Function tag 注册 | 调用方 / tag runtime |
| `@on_trigger("x")` | 玩家运行 `/trigger x` | 触发的玩家 |
| `@on(EventType)` | runtime 支撑的事件触发 | 事件执行者（内置事件为 `Player`） |
| 旧式 `@on_*` 事件装饰器 | 仅保留解析兼容 | 不要用于运行时事件 |
| `@schedule(ticks=N)` | 数据包加载后 N 个 tick 运行一次函数 | 服务器 |
| `@keep` | （优化器提示，无运行时效果） | — |
| `@coroutine` | 将函数标记为协程（在循环回边处让出控制权） | — |
