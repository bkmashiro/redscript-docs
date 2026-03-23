# 教程：优化 — 优化器与装饰器

<div class="tutorial-meta">
  <span class="difficulty intermediate">🟡 Intermediate</span>
  <span class="time">⏱️ 20 min</span>
</div>


**难度：** 入门  
**时长：** ~25 分钟  
**前置条件：** [Hello World](./01-hello-world)、[游戏机制](./02-game-mechanics)

## 为什么优化很重要

Minecraft 服务器以每秒 20 tick 的速度运行。datapack 中每个在 tick 上运行的函数都会增加延迟。一个写得不好的 `@tick` 就足以让一台有数十位玩家的服务器卡顿。

RedScript 的优化器会自动消除死代码、折叠常量并简化循环——但当你有意识地编写高性能代码并使用正确的装饰器时，它的效果最佳。

本教程介绍：

- 选择正确的优化等级（`-O0`、`-O1`、`-O2`）
- `@tick(rate=N)` — 将工作分散到不同时间
- `@inline` — 消除小函数的调用开销
- `@keep` — 防止 DCE 移除需要的函数
- `@coroutine` — 处理耗时操作而不冻结服务器
- 读懂 `--stats` 输出以了解优化器做了什么

---

## 第一步：优化等级

| 参数 | 适用场景 |
|------|---------|
| `-O0` | 调试——查看原始生成的 `.mcfunction` 文件 |
| `-O1` | 开发——安全优化，编译快 |
| `-O2` | 发布——激进的内联、循环展开、完整 DCE |

```bash
# 调试：不修改地查看所有生成文件
redscript compile src/main.mcrs -O0

# 开发（默认推荐）
redscript compile src/main.mcrs -O1 --stats

# 发布构建
redscript compile src/main.mcrs -O2 --stats
```

`--stats` 参数会打印被移除的函数数量、折叠的表达式数量以及输出函数总数。

---

## 第二步：限速 Tick

**大多数 datapack 最大的性能收益**来自于降低 tick 函数的执行频率。

❌ **差——每秒运行 20 次：**

```rs
@tick
fn update_sidebar() {
    let kills: int = scoreboard_get("#top", "kills")
    sidebar_set("最高击杀", @a, "kills")
}
```

✅ **好——每秒运行一次：**

```rs
@tick(rate=20)
fn update_sidebar() {
    let kills: int = scoreboard_get("#top", "kills")
    sidebar_set("最高击杀", @a, "kills")
}
```

✅ **更优——每 5 秒运行一次（适合慢更新）：**

```rs
@tick(rate=100)
fn update_leaderboard() {
    // 耗时的逐玩家计算
    for_each_player() {
        let k: int = scoreboard_get(@s, "kills")
        let d: int = scoreboard_get(@s, "deaths")
        if (d > 0) {
            scoreboard_set(@s, "kd", k * 100 / d)
        }
    }
}
```

**经验参考：**

| 所需更新频率 | Rate |
|------------|------|
| 每 tick（反应敏感型） | `@tick` |
| 视觉流畅（HUD） | `@tick(rate=2)` |
| 数据统计更新 | `@tick(rate=20)` – `@tick(rate=100)` |
| 排行榜、公告 | `@tick(rate=200)` – `@tick(rate=1200)` |

---

## 第三步：`@inline` 用于热路径辅助函数

每 tick 被多次调用的小型辅助函数是内联的好候选对象。优化器会在调用处直接展开函数体，消除函数调用开销。

```rs
// 没有 @inline：每次调用 clamp() 都会生成一次函数调用
fn clamp(val: int, lo: int, hi: int) -> int {
    if (val < lo) { return lo }
    if (val > hi) { return hi }
    return val
}

// 有 @inline：在每个调用处直接粘贴函数体
@inline
fn clamp(val: int, lo: int, hi: int) -> int {
    if (val < lo) { return lo }
    if (val > hi) { return hi }
    return val
}
```

使用方式完全相同——只有编译输出不同：

```rs
@tick(rate=1)
fn clamp_health() {
    for_each_player() {
        let hp: int = scoreboard_get(@s, "hp")
        let clamped: int = clamp(hp, 0, 200)   // 已内联：无函数调用
        scoreboard_set(@s, "hp", clamped)
    }
}
```

**何时使用 `@inline`：**

- 5 行以内的函数
- 在循环或逐玩家循环中调用
- 纯数学/逻辑辅助函数

**何时不用 `@inline`：**

- 大型函数（会造成代码膨胀）
- 递归函数（不支持）
- 你希望通过 `/function` 手动调用的函数

---

## 第四步：常量折叠实战

优化器会在编译期对常量表达式求值。将配置写成命名常量，让编译器去计算它们。

```rs
// 这些都在编译期折叠——运行时零开销
let TICKS_PER_SECOND: int  = 20
let TICKS_PER_MINUTE: int  = 20 * 60       // → 1200
let GRACE_PERIOD:     int  = 3 * 20        // → 60 tick = 3 秒
let MAX_STREAK_BONUS: int  = 5 * 10        // → 50

@tick(rate=TICKS_PER_MINUTE)
fn hourly_announcement() {
    say("记得给服务器投票哦！")
}

@on(PlayerJoin)
fn grace_period(player: Player) {
    // 给新玩家 3 秒无敌
    effect(player, "minecraft:resistance", GRACE_PERIOD, 255)
}
```

编译后的 datapack 直接使用 `1200`、`60`、`50`——运行时不做任何运算。

---

## 第五步：`@keep` — 防止误删

死代码消除（DCE）会移除从任何入口点都无法到达的函数。有时你需要一个函数可以通过外部 `/function` 调用，但又没有在 RedScript 代码中引用它。

```rs
// 这个函数没有被任何 RedScript 代码调用，
// 但我们希望在游戏内能用 `/function killboard:debug_dump` 调用它。
@keep
fn _debug_dump() {
    for_each_player() {
        let k: int = scoreboard_get(@s, "kills")
        let d: int = scoreboard_get(@s, "deaths")
        tell(@s, f"kills={k} deaths={d}")
    }
}
```

没有 `@keep` 时，DCE 会移除 `_debug_dump`，因为没有代码调用它。有了 `@keep`，它始终会被输出。

---

## 第六步：`@coroutine` 处理耗时工作

有些操作需要遍历大量实体或进行复杂计算。在同一个 tick 内全部完成会让服务器停顿。用 `@coroutine` 让编译器自动将工作分散到多个 tick 中。

```rs
// 没有 @coroutine：这个循环会完全阻塞一个 tick
fn scan_all_entities() {
    let i: int = 0
    while (i < 500) {
        // 处理实体 i
        i = i + 1
    }
}

// 有 @coroutine：编译器每 `batch` 次迭代插入一个 yield 点
@coroutine(batch=50, onDone="scan_complete")
fn scan_all_entities() {
    let i: int = 0
    while (i < 500) {
        // 处理实体 i
        i = i + 1
    }
}

fn scan_complete() {
    say("实体扫描已完成，分散在 10 个 tick 中执行！")
}
```

`batch=50` 时，编译器将 500 次迭代的循环拆分为 10 个可恢复的 50 次迭代块。每块在单独的 tick 中运行，全部完成后调用 `scan_complete`。

---

## 整合示例

以下是教程 02 击杀排行榜的优化版本：

```rs
namespace killboard_optimized

// ─── 常量 ────────────────────────────────────────────────────

let SIDEBAR_RATE:     int = 20     // 每秒更新一次侧边栏
let LEADERBOARD_RATE: int = 200    // 每 10 秒更新一次 K/D
let GRACE_TICKS:      int = 3 * 20 // 3 秒出生保护

// ─── 初始化 ─────────────────────────────────────────────────

@load
fn init() {
    scoreboard_add_objective("kills",      "playerKillCount")
    scoreboard_add_objective("deaths",     "deathCount")
    scoreboard_add_objective("streak",     "dummy")
    scoreboard_add_objective("kd",         "dummy")
    scoreboard_add_objective("prev_kills", "dummy")
    scoreboard_set_display("sidebar", "kills")
    say("击杀排行榜（优化版）已加载！")
}

// ─── 内联辅助函数 ────────────────────────────────────────────

@inline
fn safe_kd(k: int, d: int) -> int {
    if (d == 0) { return k * 100 }
    return k * 100 / d
}

// ─── 限速 Tick ───────────────────────────────────────────────

@tick(rate=SIDEBAR_RATE)
fn update_sidebar() {
    sidebar_set("击杀数", @a, "kills")
}

@tick(rate=LEADERBOARD_RATE)
fn update_kd() {
    for_each_player() {
        let k: int = scoreboard_get(@s, "kills")
        let d: int = scoreboard_get(@s, "deaths")
        scoreboard_set(@s, "kd", safe_kd(k, d))
    }
}

// ─── 事件 ────────────────────────────────────────────────────

@on(PlayerJoin)
fn on_join(player: Player) {
    effect(player, "minecraft:resistance", GRACE_TICKS, 255)
    tell(player, "⚔️ 欢迎！你有 3 秒出生保护。")
}

@on(PlayerDeath)
fn on_death(player: Player) {
    let streak: int = scoreboard_get(player, "streak")
    if (streak >= 5) {
        say(f"🔥 {player} 以 {streak} 连杀结束了本轮！")
    }
    scoreboard_set(player, "streak", 0)
}

// ─── 调试（保留供手动 /function 调用）────────────────────────

@keep
fn _debug_stats() {
    for_each_player() {
        let k:  int = scoreboard_get(@s, "kills")
        let d:  int = scoreboard_get(@s, "deaths")
        let kd: int = scoreboard_get(@s, "kd")
        tell(@s, f"kills={k} deaths={d} kd={kd / 100}.{kd % 100}")
    }
}
```

---

## 构建并查看 Stats

```bash
redscript compile src/main.mcrs -O2 --stats
```

示例输出：

```
[redscript] compile ok  • 9 functions  • -O2
[redscript] dce         : 0 removed  (1 @keep preserved)
[redscript] const-fold  : 6 expressions folded
[redscript] inlined     : safe_kd  → 2 call sites
[redscript] output      : 9 functions  (↓ 0 vs -O1)
```

`inlined` 行确认 `safe_kd` 已在 2 个调用处展开。

---

## 小结

| 技术 | 何时使用 |
|------|---------|
| `-O1` | 开发期间始终使用 |
| `-O2` | 发布前使用 |
| `@tick(rate=N)` | 不需要每 tick 精度的 tick 函数 |
| `@inline` | 循环中调用的小型纯辅助函数 |
| `@keep` | 通过 `/function` 外部调用的函数 |
| `@coroutine` | 遍历大量实体或耗时的多步骤计算 |
| 常量 | 在多处使用的魔法数字 |

---

## 下一步

- [进阶：优化](../advanced/optimization) — 优化器完整流水线深度解析
- [进阶：装饰器](../advanced/decorators) — 完整装饰器参考
- [指南：测试](../guide/testing) — 为 datapack 编写自动化测试
