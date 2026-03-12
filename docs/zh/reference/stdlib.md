# 标准库

RedScript 包含常用工具函数的标准库。

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

计时器工具。

```mcrs
import "stdlib/timer.mcrs"

fn start_game() {
    timer_start("game", 6000);  // 5 分钟计时
}

@tick
fn check_timer() {
    timer_tick();
    if (timer_done("game") == 1) {
        announce("游戏结束！");
    }
}
```

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
