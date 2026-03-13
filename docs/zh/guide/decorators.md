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

当实体死亡时运行（基于进度检测）：

```rs
@on_death
fn on_player_death() {
    say("A player has fallen!");
    scoreboard_add(@s, "deaths", 1);
}
```

## @on_login

当玩家登录（加入）服务器时运行：

```rs
@on_login
fn welcome() {
    title(@s, "Welcome!");
    tellraw(@s, "Type /trigger help for commands");
}
```

## @on_advancement

当玩家获得特定进度时运行：

```rs
@on_advancement("story/mine_diamond")
fn got_diamonds() {
    tellraw(@s, "You found diamonds!");
}
```

## @on_craft

当玩家合成特定物品时运行：

```rs
@on_craft("minecraft:diamond_sword")
fn crafted_sword() {
    tellraw(@s, "You crafted a diamond sword!");
}
```

## @on_join_team

当玩家加入特定队伍时运行：

```rs
@on_join_team("red")
fn joined_red() {
    title(@s, "Red Team");
    effect(@s, "speed", 200, 1);
}
```

## @on(EventType)

处理静态事件类型。支持的事件类型：

| 事件 | 描述 |
|------|------|
| `PlayerDeath` | 玩家死亡 |
| `PlayerJoin` | 玩家加入服务器 |
| `BlockBreak` | 玩家破坏方块 |
| `EntityKill` | 玩家击杀实体 |
| `ItemUse` | 玩家使用物品 |

```rs
@on(PlayerDeath)
fn handle_death() {
    say("A player has died!");
}

@on(PlayerJoin)
fn handle_join() {
    title(@s, "Welcome to the Server!");
}
```

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
@tick(rate=200)
fn scoreboard_display() {
    // 在加载时和每 10 秒都运行
    sidebar_set("Kills", @a, "kills");
}
```

## DCE 与私有函数

RedScript 的死代码消除（DCE）优化器会自动移除不可达的函数：

- 名称**不以** `_` 开头的函数为**公有**——始终生成，可通过 `/function` 调用
- 以 `_` 开头的函数为**私有**——仅在被调用时保留，或使用 `@keep` 强制保留
- 带有装饰器的函数（`@tick`、`@load`、`@on_*` 等）无论名称如何，始终保留

## 装饰器原理

装饰器编译为 Minecraft 的函数标签系统：

| 装饰器 | 编译为 |
|--------|--------|
| `@load` | `#minecraft:load` 标签 |
| `@tick` | `#minecraft:tick` 标签 |
| `@tick(rate=N)` | 带间隔的 schedule 命令 |
| `@on_trigger("x")` | 触发器记分板检测 |
| `@on_death` | 基于进度的死亡检测 |
| `@on_login` | 基于标签的加入检测 |
| `@on_advancement("id")` | 进度奖励函数 |
| `@on_craft("item")` | 进度 inventory_changed 检测 |
| `@on_join_team("team")` | 队伍加入检测 |
| `@on(EventType)` | 每 tick 轮询事件标签 |

## 下一步

- [结构体与枚举](/zh/guide/structs-enums) — 自定义数据类型
- [装饰器参考](/zh/reference/decorators) — 完整的装饰器列表
