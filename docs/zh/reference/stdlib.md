# 标准库

RedScript 包含常用工具函数的标准库，并在 v1.2 中新增了 Timer OOP API 与 313 个 Minecraft 标签常量。

## 使用方法

```mcrs
import "stdlib/effects.mcrs"
import "stdlib/world.mcrs"

fn game_start() {
    set_day();
    weather_clear();
    buff_all(@a, 600);
}
```

## 模块

### math.mcrs

基础数学运算。

```mcrs
import "stdlib/math.mcrs"

fn example() {
    let a = abs(-5);          // 5
    let b = min(3, 7);        // 3
    let c = max(3, 7);        // 7
    let d = clamp(15, 0, 10); // 10
    let s = sign(-42);        // -1
}
```

| 函数 | 描述 |
|-----|------|
| `abs(x)` | 绝对值 |
| `min(a, b)` | 最小值 |
| `max(a, b)` | 最大值 |
| `clamp(x, min, max)` | 限制范围 |
| `sign(x)` | 符号 (-1, 0, 1) |

### effects.mcrs

常用药水效果快捷函数。

```mcrs
import "stdlib/effects.mcrs"

fn power_up() {
    speed(@p, 200, 2);      // 速度 II 10 秒
    strength(@p, 200, 1);   // 力量 I 10 秒
    regen(@p, 100, 0);      // 生命恢复 I 5 秒
}
```

| 函数 | 描述 |
|-----|------|
| `speed(target, duration, level)` | 速度 |
| `jump(target, duration, level)` | 跳跃提升 |
| `regen(target, duration, level)` | 生命恢复 |
| `resistance(target, duration, level)` | 抗性提升 |
| `strength(target, duration, level)` | 力量 |
| `invisible(target, duration)` | 隐身 |
| `night_vision(target, duration)` | 夜视 |
| `slow_fall(target, duration)` | 缓降 |
| `glow(target, duration)` | 发光 |
| `clear_effects(target)` | 清除所有效果 |
| `buff_all(target, duration)` | 速度 + 力量 + 恢复 + 抗性 |

### world.mcrs

世界和游戏规则工具。

```mcrs
import "stdlib/world.mcrs"

@load
fn setup() {
    set_day();
    weather_clear();
    enable_keep_inventory();
    disable_mob_griefing();
}
```

**时间：**
- `set_day()`, `set_night()`, `set_noon()`, `set_midnight()`

**天气：**
- `weather_clear()`, `weather_rain()`, `weather_thunder()`

**游戏规则：**
- `enable_keep_inventory()`, `disable_keep_inventory()`
- `disable_mob_griefing()`, `disable_fire_spread()`

**难度：**
- `set_peaceful()`, `set_easy()`, `set_normal()`, `set_hard()`

**建筑：**
- `barrier_wall(x1, y1, z1, x2, y2, z2)` — 创建屏障墙
- `clear_area(x1, y1, z1, x2, y2, z2)` — 填充空气
- `glass_box(x1, y1, z1, x2, y2, z2)` — 空心玻璃盒

### inventory.mcrs

背包管理。

```mcrs
import "stdlib/inventory.mcrs"

fn respawn_player(player: selector) {
    clear_inventory(player);
    give_kit_warrior(player);
}
```

| 函数 | 描述 |
|-----|------|
| `clear_inventory(target)` | 清空背包 |
| `give_kit_warrior(target)` | 铁甲 + 铁剑 + 盾牌 |
| `give_kit_archer(target)` | 弓 + 箭 + 皮甲 |
| `give_kit_mage(target)` | 药水 + 末影珍珠 |
| `remove_item(target, item)` | 移除特定物品 |

### cooldown.mcrs

使用记分板的冷却系统。

```mcrs
import "stdlib/cooldown.mcrs"

fn use_ability() {
    if (is_on_cooldown(@s) == 0) {
        say("技能释放！");
        cooldown_start(@s, 100);  // 5 秒冷却
    }
}

@tick
fn tick_cooldowns() {
    cooldown_tick();
}
```

### timer.mcrs

计时器工具，以及 v1.2 的面向对象 Timer API。

```mcrs
import "stdlib/timer.mcrs"

let timer = Timer::new(200);
timer.start();

@tick
fn update_timer() {
    timer.tick();

    if (timer.done()) {
        say("Time's up!");
    }
}
```

**实例方法：**
- `Timer::new(duration)` — 创建新计时器
- `timer.start()` — 启动计时器
- `timer.tick()` — 推进计时器，通常每 tick 调用一次
- `timer.done()` — 检查是否结束
- `timer.pause()` — 暂停但不重置进度
- `timer.reset()` — 重置到初始时长

**旧版函数式 API：**
- `timer_start(id, duration)`
- `timer_tick(id)`
- `timer_done(id)`

对于新代码，推荐优先使用面向对象风格 API。它和 `impl` 块配合自然，也更方便把计时器状态与行为放在一起。

### 调度辅助函数

RedScript 还提供了基于 Minecraft 调度系统的回调式计时辅助函数。

```mcrs
setTimeout(100, () => {
    say("Delayed!");
});

let id = setInterval(20, () => {
    say("Repeating!");
});

clearInterval(id);
```

| 函数 | 描述 |
|------|------|
| `setTimeout(delay, callback)` | 在 `delay` 个 tick 后执行一次回调 |
| `setInterval(interval, callback)` | 按固定间隔重复执行回调 |
| `clearInterval(id)` | 取消重复回调 |

这些辅助函数会编译为通过 Minecraft `schedule function` 命令调度的生成函数。

### tags.mcrs

用于物品、方块和实体的 Minecraft 标签常量。

```mcrs
import "stdlib/tags.mcrs"

fn mark_tools() {
    if (held_item_is(#minecraft_tools)) {
        say("Tool detected");
    }
}
```

RedScript v1.2 内置了 313 个预定义标签常量，引用常用标签时不需要再手写原始字符串。

### player.mcrs

玩家状态辅助函数。

```mcrs
import "stdlib/player.mcrs"

fn heal_player() {
    heal(10);  // 增加 10 生命
}

fn check_admin() {
    if (is_op() == 1) {
        say("你是管理员");
    }
}
```

### combat.mcrs

战斗工具。

```mcrs
import "stdlib/combat.mcrs"

fn on_hit(target: selector) {
    apply_damage(target, 5);
    knockback(target, 2);
}
```

### mobs.mcrs

怪物生成辅助。

```mcrs
import "stdlib/mobs.mcrs"

fn spawn_wave() {
    spawn_zombie(0, 64, 0);
    spawn_skeleton(5, 64, 0);
    spawn_creeper(-5, 64, 0);
}
```
