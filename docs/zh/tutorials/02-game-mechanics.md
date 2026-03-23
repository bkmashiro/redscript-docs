# 教程：游戏机制 — 计分板、队伍与事件

<div class="tutorial-meta">
  <span class="difficulty beginner">🟢 Beginner</span>
  <span class="time">⏱️ 25 min</span>
</div>


**难度：** 入门  
**时长：** ~30 分钟  
**前置条件：** [Hello World](./01-hello-world)

## 你将构建什么

一个小型 **击杀排行榜** 迷你游戏，它能：

- 追踪每位玩家的击杀数与死亡数
- 在侧边栏实时显示 scoreboard
- 用队伍对玩家分组
- 在死亡与连杀时触发自定义事件
- 通过命令重置数据

这是几乎所有竞技 datapack 都会用到的标准模式。

---

## 第一步：Scoreboard 设置

在 `@load` 中声明所有需要用到的 scoreboard。

```rs
namespace killboard

@load
fn init() {
    // 统计用 objective
    scoreboard_add_objective("kills",  "playerKillCount")  // PvP 击杀时自动 +1
    scoreboard_add_objective("deaths", "deathCount")       // 死亡时自动 +1
    scoreboard_add_objective("streak", "dummy")            // 手动维护的连杀计数
    scoreboard_add_objective("kd",     "dummy")            // K/D 比 × 100

    // 在侧边栏显示击杀数
    scoreboard_set_display("sidebar", "kills")

    say("击杀排行榜已加载，开始厮杀吧！")
}
```

**Objective 类型说明：**

| 类型 | 行为 |
|------|------|
| `"dummy"` | 不会自动递增，由代码控制 |
| `"playerKillCount"` | 击杀玩家时自动 +1 |
| `"deathCount"` | 死亡时自动 +1 |
| `"totalKillCount"` | 所有实体击杀均计入（含怪物） |

`scoreboard_set_display("sidebar", obj)` 让所有玩家在右侧边栏看到该 objective 的数据。

---

## 第二步：处理玩家死亡

使用 `@on(PlayerDeath)` 在每次玩家死亡时执行代码。

```rs
@on(PlayerDeath)
fn on_death(player: Player) {
    // 重置连杀数
    scoreboard_set(player, "streak", 0)

    // 通知玩家
    tell(player, "💀 你死了！连杀已重置。")

    // 更新 K/D 比（击杀数 × 100 / 死亡数，避免除以零）
    let k: int = scoreboard_get(player, "kills")
    let d: int = scoreboard_get(player, "deaths")

    if (d > 0) {
        let kd: int = k * 100 / d
        scoreboard_set(player, "kd", kd)
        tell(player, f"K/D：{k}/{d}（{kd / 100}.{kd % 100}）")
    }
}
```

**为什么要乘以 100？**  
Minecraft scoreboard 只能存储整数。乘以 100 可以用整数表示两位小数。K/D 为 2.50 时存储为 `250`。

---

## 第三步：连杀追踪

```rs
@on(PlayerDeath)
fn announce_big_streak(victim: Player) {
    // 多个处理器可以订阅同一个事件。
    // RedScript 按声明顺序依次调用所有 @on(PlayerDeath) 处理器。
    let streak: int = scoreboard_get(victim, "streak")

    if (streak >= 10) {
        say(f"💥 传奇！{victim} 完成了 {streak} 连杀！")
        playsound_all("minecraft:entity.lightning_bolt.thunder", "master", 1.0, 1.2)
    } else if (streak >= 5) {
        say(f"🔥 {victim} 达成 {streak} 连杀——大杀特杀！")
    }
}
```

在 tick 中更新击杀后的连杀计数：

```rs
@tick(rate=1)
fn check_new_kills() {
    for_each_player() {
        let kills:  int = scoreboard_get(@s, "kills")
        let prev:   int = scoreboard_get(@s, "prev_kills")

        if (kills > prev) {
            scoreboard_add(@s, "streak", kills - prev)
            scoreboard_set(@s, "prev_kills", kills)

            let new_streak: int = scoreboard_get(@s, "streak")
            if (new_streak >= 3) {
                tell(@s, f"🔥 连杀：{new_streak}！")
            }
        }
    }
}
```

在 `@load` 中补充 `prev_kills`：

```rs
scoreboard_add_objective("prev_kills", "dummy")
```

---

## 第四步：队伍

队伍可以给玩家设置有色名字，并控制友伤开关。

```rs
@load
fn setup_teams() {
    // 创建两支队伍
    team_add("red")
    team_add("blue")

    // 配置队伍
    team_set_friendly_fire("red",  false)
    team_set_friendly_fire("blue", false)
    team_set_color("red",  "red")
    team_set_color("blue", "aqua")

    team_set_prefix("red",  "[🔴 红队] ")
    team_set_prefix("blue", "[🔵 蓝队] ")
}

// 玩家加入时自动分配队伍
@on(PlayerJoin)
fn assign_team(player: Player) {
    let red_count:  int = team_count("red")
    let blue_count: int = team_count("blue")

    if (red_count <= blue_count) {
        team_join(player, "red")
        tell(player, "你加入了 🔴 红队！")
    } else {
        team_join(player, "blue")
        tell(player, "你加入了 🔵 蓝队！")
    }
}
```

---

## 第五步：重置命令

给管理员（或所有人，毕竟是演示）一种清空所有数据的方式。

```rs
@on_trigger("reset_stats")
fn reset_all_stats() {
    scoreboard_reset_all("kills")
    scoreboard_reset_all("deaths")
    scoreboard_reset_all("streak")
    scoreboard_reset_all("kd")
    scoreboard_reset_all("prev_kills")

    say(f"📊 数据已被 {at_s()} 重置！")
    title(@a, "数据重置")
    subtitle(@a, "新一轮开始！")
}
```

---

## 完整代码

```rs
namespace killboard

// ─── 初始化 ─────────────────────────────────────────────────

@load
fn init() {
    scoreboard_add_objective("kills",      "playerKillCount")
    scoreboard_add_objective("deaths",     "deathCount")
    scoreboard_add_objective("streak",     "dummy")
    scoreboard_add_objective("kd",         "dummy")
    scoreboard_add_objective("prev_kills", "dummy")

    scoreboard_set_display("sidebar", "kills")

    team_add("red")
    team_add("blue")
    team_set_friendly_fire("red",  false)
    team_set_friendly_fire("blue", false)
    team_set_color("red",  "red")
    team_set_color("blue", "aqua")
    team_set_prefix("red",  "[🔴 红队] ")
    team_set_prefix("blue", "[🔵 蓝队] ")

    say("击杀排行榜已加载！")
}

// ─── 事件 ────────────────────────────────────────────────────

@on(PlayerJoin)
fn assign_team(player: Player) {
    let red_count:  int = team_count("red")
    let blue_count: int = team_count("blue")

    if (red_count <= blue_count) {
        team_join(player, "red")
        tell(player, "你加入了 🔴 红队！")
    } else {
        team_join(player, "blue")
        tell(player, "你加入了 🔵 蓝队！")
    }
}

@on(PlayerDeath)
fn on_death(player: Player) {
    let streak: int = scoreboard_get(player, "streak")
    if (streak >= 5) {
        say(f"🔥 {player} 以 {streak} 连杀结束了本轮！")
    }

    scoreboard_set(player, "streak", 0)
    tell(player, "💀 你死了！连杀已重置。")

    let k: int = scoreboard_get(player, "kills")
    let d: int = scoreboard_get(player, "deaths")
    if (d > 0) {
        scoreboard_set(player, "kd", k * 100 / d)
    }
}

// ─── 连杀追踪 ────────────────────────────────────────────────

@tick(rate=1)
fn check_new_kills() {
    for_each_player() {
        let kills: int = scoreboard_get(@s, "kills")
        let prev:  int = scoreboard_get(@s, "prev_kills")

        if (kills > prev) {
            scoreboard_add(@s, "streak", kills - prev)
            scoreboard_set(@s, "prev_kills", kills)

            let streak: int = scoreboard_get(@s, "streak")
            if (streak >= 3) {
                tell(@s, f"🔥 连杀：{streak}！")
            }
        }
    }
}

// ─── 重置 ────────────────────────────────────────────────────

@on_trigger("reset_stats")
fn reset_all_stats() {
    scoreboard_reset_all("kills")
    scoreboard_reset_all("deaths")
    scoreboard_reset_all("streak")
    scoreboard_reset_all("kd")
    scoreboard_reset_all("prev_kills")

    say("📊 数据已被重置！")
    title(@a, "数据重置")
    subtitle(@a, "新一轮开始！")
}
```

---

## 构建与测试

```bash
redscript compile src/main.mcrs -O1 --stats
```

`--stats` 参数会打印优化器移除了多少内容。预期输出：

```
[redscript] compile ok  • 8 functions  • -O1
[redscript] dce         : 0 removed
[redscript] const-fold  : 3 expressions folded
```

---

## 下一步

- [教程 03：优化](./03-optimization) — 榨干每一个 tick 的性能
- [指南：事件](../guide/events) — 完整事件参考
- [指南：结构体与枚举](../guide/structs-enums) — 对复杂游戏状态建模
