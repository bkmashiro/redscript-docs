# 教程 03：函数与 struct

**难度：** 入门
**时长：** ~25 分钟
**前置条件：** [教程 02：变量与控制流](./02-variables)

## 你将构建什么

一个 Boss 血量追踪系统。凋灵骷髅 Boss 拥有 200 HP，随着受到伤害，它会经历三个阶段：普通（Normal）→ 狂暴（Enraged，≤50% HP）→ 濒死（Dying，≤20% HP），每个阶段都有不同的公告，死亡时掉落奖励。

## 你将学到什么

- 带参数和返回值的 `fn`
- 使用 `struct` 组织相关数据
- 用 `.` 访问字段
- 复合赋值（`state.hp = state.hp - 15`）
- 从一个函数调用另一个函数
- 提前 `return`

## 第一步：定义 struct

**struct** 将相关变量组合成一个具名类型：

```rs
struct BossState {
    max_hp: int,
    current_hp: int,
    phase: int,    // 1=普通, 2=狂暴, 3=濒死
    alive: int     // 0=死亡, 1=存活
}

// 全局实例 —— 使用 struct 字面量语法初始化
let boss: BossState = {
    max_hp: 200,
    current_hp: 200,
    phase: 1,
    alive: 0
}
```

使用点号访问字段：`boss.current_hp`、`boss.phase`。

## 第二步：辅助函数

函数让你可以为某个计算命名并复用它：

```rs
// 根据当前值和最大值返回百分比（0-100）
fn hp_percentage(current: int, max: int) -> int {
    if (max <= 0) {
        return 0
    }
    return current * 100 / max
}

// 根据当前 HP 判断 Boss 处于哪个阶段
fn get_phase(current_hp: int, max_hp: int) -> int {
    let pct: int = hp_percentage(current_hp, max_hp)
    if (pct <= 20) { return 3 }
    if (pct <= 50) { return 2 }
    return 1
}

fn describe_phase(phase: int) -> string {
    if (phase == 1) { return "Normal" }
    if (phase == 2) { return "Enraged" }
    return "Dying"
}
```

注意：`-> int` 和 `-> string` 声明返回类型，使用 `return` 传递返回值。

## 第三步：召唤 Boss

```rs
@on_trigger("spawn_boss")
fn spawn_boss() {
    boss.max_hp = 200
    boss.current_hp = 200
    boss.phase = 1
    boss.alive = 1

    scoreboard_set("#boss", "boss_hp", boss.current_hp)
    summon("minecraft:wither_skeleton", 0, 64, 0)
    say("The Boss has appeared! HP: 200")
    title(@a, "BOSS FIGHT")
}
```

## 第四步：对 Boss 造成伤害

```rs
@on_trigger("damage_boss")
fn damage_boss() {
    if (boss.alive == 0) {
        tell(@s, "No boss is active!")
        return
    }

    let damage: int = 15
    boss.current_hp = boss.current_hp - damage
    if (boss.current_hp < 0) { boss.current_hp = 0 }

    // 检查阶段切换
    let new_phase: int = get_phase(boss.current_hp, boss.max_hp)
    if (new_phase != boss.phase) {
        boss.phase = new_phase
        let phase_name: string = describe_phase(boss.phase)
        announce("Boss entered phase " + boss.phase + ": " + phase_name + "!")
        title(@a, "Phase " + boss.phase)
    }

    let pct: int = hp_percentage(boss.current_hp, boss.max_hp)
    announce("Boss HP: " + boss.current_hp + "/" + boss.max_hp + " (" + pct + "%)")

    if (boss.current_hp <= 0) {
        kill_boss()
    }
}
```

这个函数调用了 `get_phase()`、`hp_percentage()`、`describe_phase()` 和 `kill_boss()` —— 将小函数组合成更大的行为。

## 第五步：死亡与奖励

```rs
fn kill_boss() {
    boss.alive = 0
    kill(@e[type=minecraft:wither_skeleton])
    title(@a, "Boss Defeated!")

    // 奖励所有玩家
    foreach (p in @a) {
        give(p, "minecraft:diamond", 3)
        tell(p, "You earned 3 diamonds!")
    }
}
```

## 完整代码

完整示例：[tutorial_03_functions_structs.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_03_functions_structs.mcrs)

## 试试看

1. 安装并执行 `/reload`
2. 执行 `/trigger spawn_boss` —— 凋灵骷髅出现
3. 多次执行 `/trigger damage_boss`
4. 观察 50% 和 20% HP 时的阶段公告
5. HP 归零时，所有玩家获得钻石

## struct 与 scoreboard

当你有多个相互关联、一起变化的值时（比如 Boss 状态），使用 **struct**。当你需要每个玩家独立的值，或需要与原版 MC 机制交互（比如击杀计数）时，使用 **scoreboard**。

## 下一步

→ [教程 04：selector 与执行上下文](./04-selectors-context)
