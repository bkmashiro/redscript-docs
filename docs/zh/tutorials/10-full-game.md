# 教程 10：完整游戏 —— 击杀竞速

<div class="tutorial-meta">
  <span class="difficulty advanced">🔴 Advanced</span>
  <span class="time">⏱️ 45 min</span>
</div>


**难度：** 高级
**时长：** ~30 分钟
**前置条件：** 所有前置教程（01–09）

## 你将构建什么

一个完整可玩的小游戏：玩家在 3 分钟内比拼谁的击杀数最多。包含完整的阶段状态机（大厅 → 倒计时 → 游戏中 → 已结束）、血条计时器、随机物品掉落和连杀奖励。

## 你将学到什么

- 在真实项目中综合运用所有 RedScript 特性
- 使用 struct 构建阶段状态机
- 使用 `create_timer_bar` / `update_bar` 实现血条 UI
- 同时使用多个标准库模块（`effects`、`bossbar`、`teams`、`random`）
- `@schedule` 延迟清理
- 基于 LCG 的确定性随机战利品掉落

## 完整源码

```mcrs
// ============================================
// 教程 10：完整游戏 —— 击杀竞速
// ============================================
// 玩家在 3 分钟内竞争击杀数最多。
// 阶段机：大厅 → 倒计时（10秒）→ 游戏中（180秒）→ 已结束
// ============================================

namespace tutorial10

import effects::*
import bossbar::*
import teams::*
import random::*

// ─── 常量 ───────────────────────────────────────────────────────────────────

// 阶段
let PHASE_LOBBY: int = 0
let PHASE_COUNTDOWN: int = 1
let PHASE_PLAYING: int = 2
let PHASE_ENDED: int = 3

// 各阶段持续时间（秒）
let COUNTDOWN_SECS: int = 10
let GAME_SECS: int = 180   // 3 分钟

// ─── 游戏状态 ────────────────────────────────────────────────────────────────

struct GameState {
    phase: int,
    timer: int,     // 当前阶段剩余秒数
    active: int     // 1 表示游戏进行中
}

let game: GameState = {
    phase: 0,
    timer: 0,
    active: 0
}

// ─── 初始化 ──────────────────────────────────────────────────────────────────

@load
fn setup() {
    // kills 目标会自动追踪玩家击杀数
    scoreboard_add_objective("kr_kills", "playerKillCount")
    scoreboard_add_objective("kr_streak", "dummy")
    scoreboard_add_objective("kr_seed", "dummy")

    scoreboard_display("sidebar", "kr_kills")

    // RNG 种子
    scoreboard_set("#seed", "kr_seed", 123456789)

    say("Kill Race loaded! /trigger join_game  /trigger start_game")
}

// ─── 1 秒计时器（rate=20 tick）──────────────────────────────────────────────

@tick(rate=20)
fn game_timer() {
    if (game.active == 0) {
        return
    }

    if (game.phase == PHASE_COUNTDOWN) {
        countdown_tick()
    } else {
        if (game.phase == PHASE_PLAYING) {
            playing_tick()
        }
    }
}

fn countdown_tick() {
    game.timer = game.timer - 1
    actionbar(@a, f"Game starting in {game.timer}...")

    if (game.timer <= 0) {
        begin_game()
    }
}

fn playing_tick() {
    game.timer = game.timer - 1

    // 更新血条
    update_bar("kr:timer", game.timer)
    update_bar_color("kr:timer", game.timer * 100 / GAME_SECS)

    // 显示剩余时间的 actionbar
    let mins: int = game.timer / 60
    let secs: int = game.timer % 60
    actionbar(@a, f"⏱ {mins}m {secs}s remaining — get kills!")

    if (game.timer <= 10) {
        // 最后阶段警告
        actionbar(@a, f"⚠ FINAL {game.timer} SECONDS!")
    }

    if (game.timer <= 0) {
        end_game()
    }
}

// ─── 击杀追踪 ─────────────────────────────────────────────────────────────────

// 每 tick 检查：在游戏阶段是否有玩家击杀
@tick(rate=20)
fn check_kill_streaks() {
    if (game.phase != PHASE_PLAYING) {
        return
    }

    foreach (p in @a) {
        let kills: int = scoreboard_get(p, "kr_kills")
        let streak: int = scoreboard_get(p, "kr_streak")

        // 连杀奖励
        if (kills > 0) {
            if (kills % 5 == 0) {
                // 每 5 杀：速度提升
                speed(p, 5, 1)
                tell(p, "Kill streak! Speed boost!")
            }
            if (kills % 10 == 0) {
                // 每 10 杀：力量
                strength(p, 10, 0)
                tell(p, "10-kill streak! Strength boost!")
                // 随机奖励战利品
                drop_bonus_loot(p)
            }
        }
    }
}

fn drop_bonus_loot(p: selector) {
    let seed: int = scoreboard_get("#seed", "kr_seed")
    seed = next_lcg(seed)
    scoreboard_set("#seed", "kr_seed", seed)

    let roll: int = random_range(seed, 0, 3)
    if (roll == 0) {
        give(p, "minecraft:golden_apple", 1)
        tell(p, "Bonus: Golden Apple!")
    } else {
        if (roll == 1) {
            give(p, "minecraft:arrow", 16)
            tell(p, "Bonus: 16 Arrows!")
        } else {
            give(p, "minecraft:cooked_beef", 8)
            tell(p, "Bonus: 8 Steaks!")
        }
    }
}

// ─── Trigger ─────────────────────────────────────────────────────────────────

@on_trigger("join_game")
fn join_game() {
    if (game.phase == PHASE_PLAYING) {
        tell(@s, "A game is already in progress!")
        return
    }

    tag_add(@s, "kr_joined")
    tell(@s, "You joined Kill Race! Wait for the game to start.")
    announce("A player joined Kill Race! /trigger join_game to join!")
}

@on_trigger("start_game")
fn start_game() {
    if (game.active == 1) {
        tell(@s, "A game is already running!")
        return
    }

    let joined: int = 0
    foreach (p in @a[tag=kr_joined]) {
        joined = joined + 1
    }
    if (joined < 1) {
        tell(@s, "At least 1 player must join first!")
        return
    }

    game.active = 1
    game.phase = PHASE_COUNTDOWN
    game.timer = COUNTDOWN_SECS

    // 重置击杀数
    foreach (p in @a[tag=kr_joined]) {
        scoreboard_set(p, "kr_kills", 0)
        scoreboard_set(p, "kr_streak", 0)
        clear(p)
        give(p, "minecraft:iron_sword", 1)
        give(p, "minecraft:bow", 1)
        give(p, "minecraft:arrow", 32)
        give(p, "minecraft:cooked_beef", 8)
    }

    say("Kill Race countdown started!")
    title(@a, "Kill Race")
    subtitle(@a, "Get the most kills in 3 minutes!")
}

fn begin_game() {
    game.phase = PHASE_PLAYING
    game.timer = GAME_SECS

    // 创建计时血条
    create_timer_bar("kr:timer", "Kill Race", GAME_SECS)

    title(@a, "FIGHT!")
    subtitle(@a, "Kill Race — 3 minutes")
    say("Kill Race has begun!")

    // 设置生存模式
    foreach (p in @a[tag=kr_joined]) {
        effect(p, "minecraft:speed", 3, 1)
    }
}

fn end_game() {
    game.phase = PHASE_ENDED
    game.active = 0

    hide_bar("kr:timer")
    say("Kill Race ended!")

    // 找出获胜者
    announce_winner()

    // 10 秒后延迟清理
    cleanup_game()
}

fn announce_winner() {
    let top_kills: int = 0

    // 找最高击杀数
    foreach (p in @a[tag=kr_joined]) {
        let k: int = scoreboard_get(p, "kr_kills")
        if (k > top_kills) {
            top_kills = k
        }
    }

    if (top_kills == 0) {
        say("No kills scored! It's a draw.")
        title(@a, "Draw!")
        return
    }

    // 奖励获胜者（并列第一的所有人）
    foreach (p in @a[tag=kr_joined]) {
        let k: int = scoreboard_get(p, "kr_kills")
        if (k == top_kills) {
            title(p, "You Win!")
            subtitle(p, f"Top score: {top_kills} kills!")
            buff_all(p, 60)
            give(p, "minecraft:diamond", top_kills)
            tell(p, f"Winner's prize: {top_kills} diamonds!")
        } else {
            title(p, "Game Over")
            subtitle(p, f"Your kills: {k}")
        }
    }

    announce(f"Kill Race winner had {top_kills} kills!")
}

@schedule(200)
fn cleanup_game() {
    // 移除标签
    foreach (p in @a[tag=kr_joined]) {
        tag_remove(p, "kr_joined")
        effect_clear(p)
    }

    // 重置阶段
    game.phase = PHASE_LOBBY
    game.active = 0

    // 移除血条
    remove_bar("kr:timer")

    say("Kill Race lobby reset. /trigger join_game to play again!")
}
```

## 逐步解析

### 第一步 —— 导入与常量

```mcrs
import effects::*
import bossbar::*
import teams::*
import random::*
```

这个游戏使用了**四个标准库模块**：

| 模块 | 用途 |
|--------|----------|
| `effects` | `speed()`、`strength()`、`effect_clear()` |
| `bossbar` | `create_timer_bar()`、`update_bar()`、`hide_bar()`、`remove_bar()` |
| `teams` | 队伍设置辅助函数 |
| `random` | `next_lcg()`、`random_range()` 用于战利品 |

阶段常量为原始整数赋予了名称，让状态机代码更易读：

```mcrs
let PHASE_LOBBY: int = 0
let PHASE_COUNTDOWN: int = 1
let PHASE_PLAYING: int = 2
let PHASE_ENDED: int = 3
```

### 第二步 —— 游戏状态 struct

```mcrs
struct GameState {
    phase: int,
    timer: int,
    active: int
}

let game: GameState = { phase: 0, timer: 0, active: 0 }
```

单一的 `GameState` struct 保存所有可变的游戏状态。将其存储在一个 struct 中而非三个独立全局变量，可以让代码更有组织，并避免与其他 namespace 的命名冲突。`active` 是一个标志位（`0`/`1`），让 `@tick` 处理器在没有游戏运行时可以提前退出。

### 第三步 —— @load 初始化

```mcrs
@load
fn setup() {
    scoreboard_add_objective("kr_kills", "playerKillCount")
    scoreboard_add_objective("kr_streak", "dummy")
    scoreboard_add_objective("kr_seed", "dummy")
    scoreboard_display("sidebar", "kr_kills")
    scoreboard_set("#seed", "kr_seed", 123456789)
    say("Kill Race loaded! /trigger join_game  /trigger start_game")
}
```

`@load` 在 datapack 加载时运行一次。注意：
- `playerKillCount` 是一个 **Minecraft 条件** —— 每次玩家击杀另一个玩家时分数自动增加，无需手动追踪。
- `kr_seed` 存储一个运行中的 LCG 种子用于确定性随机数。
- `#seed` 使用**假玩家**（`#` 约定）来保存不会出现在边栏中的服务端数据。

### 第四步 —— 1 秒 tick

```mcrs
@tick(rate=20)
fn game_timer() {
    if (game.active == 0) { return }
    if (game.phase == PHASE_COUNTDOWN) {
        countdown_tick()
    } else {
        if (game.phase == PHASE_PLAYING) {
            playing_tick()
        }
    }
}
```

`@tick(rate=20)` 每 20 个游戏 tick 触发一次 = 每现实秒一次。在 `active == 0` 时提前返回意味着空闲时此函数几乎什么都不做 —— 对服务器性能很重要。

**`countdown_tick`** 递减计时器并显示 actionbar 消息。归零时调用 `begin_game()`。

**`playing_tick`** 做的事更多：
1. 递减计时器
2. 调用 `update_bar` 移动血条进度
3. 通过整数除法计算 `mins`/`secs` 用于格式化显示
4. 最后 10 秒显示紧急警告
5. 时间用完时调用 `end_game()`

### 第五步 —— 连杀奖励

```mcrs
@tick(rate=20)
fn check_kill_streaks() {
    if (game.phase != PHASE_PLAYING) { return }

    foreach (p in @a) {
        let kills: int = scoreboard_get(p, "kr_kills")
        if (kills > 0) {
            if (kills % 5 == 0) {
                speed(p, 5, 1)
                tell(p, "Kill streak! Speed boost!")
            }
            if (kills % 10 == 0) {
                strength(p, 10, 0)
                tell(p, "10-kill streak! Strength boost!")
                drop_bonus_loot(p)
            }
        }
    }
}
```

游戏进行阶段每秒遍历所有玩家并检查他们的击杀分数。`%`（取模）运算符让里程碑触发变得简洁：每第 5 杀给予速度 II，每第 10 杀额外给予力量和随机战利品。

### 第六步 —— LCG 随机战利品

```mcrs
fn drop_bonus_loot(p: selector) {
    let seed: int = scoreboard_get("#seed", "kr_seed")
    seed = next_lcg(seed)
    scoreboard_set("#seed", "kr_seed", seed)

    let roll: int = random_range(seed, 0, 3)
    if (roll == 0) { give(p, "minecraft:golden_apple", 1) }
    else { if (roll == 1) { give(p, "minecraft:arrow", 16) }
    else { give(p, "minecraft:cooked_beef", 8) } }
}
```

由于 Minecraft datapack 无法调用真正的系统随机数，我们在 scoreboard 中维护一个**线性同余生成器（LCG）**种子。`next_lcg` 推进种子，`random_range(seed, 0, 3)` 将其映射到 `[0, 2]`（含两端） —— 三种可能的战利品结果。

这是教程 07 中介绍的同一技术 —— 这里我们看到它在真实游戏场景中的应用。

### 第七步 —— 玩家 Trigger

```mcrs
@on_trigger("join_game")
fn join_game() { ... }

@on_trigger("start_game")
fn start_game() { ... }
```

`@on_trigger` 监听玩家的 `/trigger <name>` 命令。这是小游戏的标准自助式交互体验：无需管理员命令。

`join_game` 给调用玩家打上 `kr_joined` 标签，所有后续循环都使用此标签过滤参与者。

`start_game` 检查至少有一个玩家加入，然后：
- 设置 `game.active = 1` 和 `game.phase = PHASE_COUNTDOWN`
- 将所有人的击杀数/连杀数重置为 0
- 清空背包并发放标准装备
- 向所有玩家显示标题/副标题

### 第八步 —— 阶段切换

```
大厅 ──(start_game trigger)──▶ 倒计时 ──(timer=0)──▶ 游戏中 ──(timer=0)──▶ 已结束
                                                                                    │
                                 ◀──────────────────(@schedule 200t 清理)───────────┘
```

| 切换 | 触发条件 |
|-----------|---------|
| 大厅 → 倒计时 | 玩家执行 `/trigger start_game` |
| 倒计时 → 游戏中 | 计时器归零时调用 `begin_game()` |
| 游戏中 → 已结束 | 计时器归零时调用 `end_game()` |
| 已结束 → 大厅 | `cleanup_game()` 在 200 tick（10 秒）后运行 |

`begin_game()` 创建血条并给所有加入玩家施加初始速度提升。

`end_game()` 隐藏血条、公告获胜者并调度清理：

```mcrs
@schedule(200)
fn cleanup_game() { ... }
```

`@schedule(200)` 表示函数体将在 **200 tick（10 秒）后**运行。这给玩家留出时间查看结果，然后一切重置。

### 第九步 —— 公告获胜者

```mcrs
fn announce_winner() {
    let top_kills: int = 0

    foreach (p in @a[tag=kr_joined]) {
        let k: int = scoreboard_get(p, "kr_kills")
        if (k > top_kills) { top_kills = k }
    }

    if (top_kills == 0) {
        say("No kills scored! It's a draw.")
        title(@a, "Draw!")
        return
    }

    foreach (p in @a[tag=kr_joined]) {
        let k: int = scoreboard_get(p, "kr_kills")
        if (k == top_kills) {
            title(p, "You Win!")
            give(p, "minecraft:diamond", top_kills)
        } else {
            title(p, "Game Over")
        }
    }
}
```

两次遍历加入的玩家：第一次找出 `top_kills`，然后奖励所有达到该分数的人。这样可以正确处理**平局** —— 多个获胜者各自收到其钻石。

## 概念回顾

| 概念 | 使用位置 |
|--------|-----------|
| `struct` | `GameState` 存储所有可变游戏数据 |
| `@load` | 一次性 scoreboard 初始化 |
| `@tick(rate=20)` | 每秒游戏循环 |
| `@on_trigger` | 自助加入/开始命令 |
| `@schedule` | 延迟赛后清理 |
| `foreach` + selector 过滤 | 只遍历已加入的玩家 |
| 取模 `%` | 连杀里程碑 |
| LCG 随机数 | 确定性战利品掉落 |
| bossbar 标准库 | 实时倒计时 UI |
| effects 标准库 | 速度/力量 buff |

## 试试看

1. 编译并安装 datapack
2. 至少一个玩家执行 `/trigger join_game`
3. 执行 `/trigger start_game` 开始倒计时
4. 击杀其他玩家（或在创造模式下用 `/kill @r` 测试计分）
5. 观察血条倒计时和 5/10 杀时触发的连杀效果
6. 等待 3 分钟计时器到期，查看获胜者屏幕

## 练习题

1. **添加队伍**：使用 `teams` 模块将玩家分为红队和蓝队，分别追踪队伍击杀数。
2. **生成怪物**：使用 `@schedule` 定期生成怪物增加混乱度。
3. **掉落强化道具**：不直接给予物品，而是在玩家位置生成物品实体。
4. **可配置时长**：将 `GAME_SECS` 变为由 trigger 控制的值，让管理员可以设置游戏时长。
5. **排行榜**：游戏结束后，用 `title`/`subtitle` 循环展示所有玩家的分数。
