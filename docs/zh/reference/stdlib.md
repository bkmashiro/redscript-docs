# 标准库

RedScript 包含常用工具函数的标准库，并在 v1.2 中新增了 Timer OOP API 与 313 个 Minecraft 标签常量。

## v2.5.0 新特性

### `double` 和 `fixed` 类型

v2.5.0 引入了两项重要类型系统变更：

**`fixed` 类型（原 `float` 重命名）：** 定点整数，缩放比例 ×10000。`10000` = 1.0，`15000` = 1.5。乘法使用 `mulfix(a, b)`（内部除以 1000 重新缩放）。用 `as fixed` 从 `int` 或 `double` 转换。

**`double` 类型：** IEEE 754 双精度浮点数，存储在 NBT（`rs:d`）中。用于高精度三角函数、物理模拟或超出 int32 范围的计算。`math_hp.mcrs` 中的函数操作 `double` 值。

```mcrs
let x: int    = 5;
let f: fixed  = x as fixed;   // 50000 (5 × 10000)
let d: double = x as double;  // 5.0

// 反向转换
let n2: int   = d as int;     // 5
let f2: fixed = d as fixed;   // 50000
```

> **必须显式转换。** v2.5.0 移除了隐式数值类型转换。不加 `as` 直接将 `int` 赋给 `fixed` 或 `double` 会导致编译错误。
>
> **`float` 算术 lint 警告。** 对 `fixed`（原 `float`）值做乘法但未使用 `mulfix`/`divfix` 时，编译器会发出警告：*"fixed-point multiplication without mulfix — result will not be rescaled"*。

### 关键说明：`mulfix(a, b)` 除数为 1000

`mulfix` 将原始乘积除以 **1000**，而非 10000。对于两个 ×10000 的定点值相乘，请直接用 `(a * b / 10000)`，或使用 `mulfix(a/10, b/10)`。

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

### vec.mcrs

2D 和 3D 定点数向量数学（比例 ×1000，单位向量各分量在 [-1000, 1000]）。依赖 `math.mcrs`。

```mcrs
import "stdlib/math.mcrs"
import "stdlib/vec.mcrs"

fn face_target(ax: int, ay: int, tx: int, ty: int) {
    let angle = atan2_fixed(ty - ay, tx - ax);  // 0-359°
    let dist  = distance2d_fixed(ax, ay, tx, ty); // ×1000
    let nx = normalize2d_x(tx - ax, ty - ay);     // ×1000
}
```

| 函数 | 描述 |
|-----|------|
| `dot2d(ax, ay, bx, by)` | 二维点积 |
| `cross2d(ax, ay, bx, by)` | 三维叉积的 Z 分量 |
| `length2d_fixed(x, y)` | 二维长度 ×1000 |
| `distance2d_fixed(x1, y1, x2, y2)` | 二维距离 ×1000 |
| `manhattan(x1, y1, x2, y2)` | 曼哈顿距离 |
| `chebyshev(x1, y1, x2, y2)` | 切比雪夫距离 |
| `normalize2d_x(x, y)` | 单位向量 X 分量 ×1000 |
| `normalize2d_y(x, y)` | 单位向量 Y 分量 ×1000 |
| `lerp2d_x(ax, ay, bx, by, t)` | 向量插值 X，t ∈ [0, 1000] |
| `lerp2d_y(ax, ay, bx, by, t)` | 向量插值 Y，t ∈ [0, 1000] |
| `atan2_fixed(y, x)` | 向量角度（度）[0, 359] |
| `rotate2d_x(x, y, deg)` | 二维旋转后的 X 分量 |
| `rotate2d_y(x, y, deg)` | 二维旋转后的 Y 分量 |
| `dot3d(ax, ay, az, bx, by, bz)` | 三维点积 |
| `cross3d_x/y/z(...)` | 三维叉积各分量 |
| `length3d_fixed(x, y, z)` | 三维长度 ×1000 |
| `distance3d_fixed(x1,y1,z1,x2,y2,z2)` | 三维距离 ×1000 |
| `manhattan3d(x1,y1,z1,x2,y2,z2)` | 三维曼哈顿距离 |
| `chebyshev3d(x1,y1,z1,x2,y2,z2)` | 三维切比雪夫距离 |
| `add2d_x/y`、`sub2d_x/y`、`scale2d_x/y`、`neg2d_x/y` | 二维分量算术 |
| `add3d_x/y/z`、`sub3d_x/y/z`、`scale3d_x/y/z`、`neg3d_x/y/z` | 三维分量算术 |

### list.mcrs

列表工具：对最多 5 个离散值进行静态 min/max/avg/sort，以及对数组进行动态原地冒泡排序（需要 RedScript ≥ 2.4.0）。

```mcrs
import "stdlib/list.mcrs"

fn example() {
    let lo = list_min3(30, 10, 20);      // 10
    let hi = list_max5(1, 5, 3, 9, 2);  // 9
    let mid = sort3(7, 2, 5, 1);        // 5（中间值）

    let nums: int[] = [30, 10, 20];
    list_sort_asc(nums, 3);             // [10, 20, 30]
}
```

| 函数 | 描述 |
|-----|------|
| `sort2_min(a, b)` | 两值最小 |
| `sort2_max(a, b)` | 两值最大 |
| `list_min3/max3(a,b,c)` | 三值最小/最大 |
| `list_min5/max5(a,b,c,d,e)` | 五值最小/最大 |
| `list_sum3/4/5(...)` | 3/4/5 值之和 |
| `avg3/avg5(...)` | 3/5 值均值 |
| `sort3(a,b,c,pos)` | 排序 3 值，返回 pos 位置的值（0=最小） |
| `sort4(a,b,c,d,pos)` | 排序 4 值，返回 pos 位置的值 |
| `sort5(a,b,c,d,e,pos)` | 排序 5 值，返回 pos 位置的值 |
| `weighted2(seed,w0,w1)` | 加权随机选 0 或 1 |
| `weighted3(seed,w0,w1,w2)` | 加权随机选 0、1 或 2 |
| `list_sort_asc(arr, len)` | 原地升序冒泡排序 |
| `list_sort_desc(arr, len)` | 原地降序冒泡排序 |

### bits.mcrs

用整数算术模拟位运算（MC 记分板没有原生位运算）。每次操作 O(31) 次迭代。

```mcrs
import "stdlib/bits.mcrs"

fn flag_example(flags: int) {
    flags = bit_set(flags, 3);
    let v = bit_get(flags, 3);     // 1
    flags = bit_toggle(flags, 3);
    let count = popcount(flags);   // 统计置位数
}
```

| 函数 | 描述 |
|-----|------|
| `bit_get(x, n)` | 第 n 位是否为 1，n ∈ [0, 30] |
| `bit_set(x, n)` | 将第 n 位置 1 |
| `bit_clear(x, n)` | 将第 n 位清 0 |
| `bit_toggle(x, n)` | 翻转第 n 位 |
| `bit_shl(x, n)` | 左移 n 位 |
| `bit_shr(x, n)` | 逻辑右移 n 位 |
| `bit_and(a, b)` | 按位与 |
| `bit_or(a, b)` | 按位或 |
| `bit_xor(a, b)` | 按位异或 |
| `bit_not(x)` | 按位取反（31 位，不含符号位） |
| `popcount(x)` | 统计置 1 的位数（0–31） |

### random.mcrs

伪随机数生成器。LCG 速度快，适合大多数游戏逻辑；PCG 统计质量更好。

```mcrs
import "stdlib/random.mcrs"

fn roll_loot() {
    let seed: int = 12345;
    seed = next_lcg(seed);
    let drop = random_range(seed, 0, 5);  // 0-4
    let coin = random_bool(seed);         // 0 或 1
}
```

| 函数 | 描述 |
|-----|------|
| `next_lcg(seed)` | 推进 LCG 状态，返回下一个伪随机 int32 |
| `random_range(seed, lo, hi)` | [lo, hi) 范围内的整数 |
| `random_bool(seed)` | 等概率返回 0 或 1 |
| `pcg_next_lo(state_lo)` | 推进 PCG 低位字 |
| `pcg_next_hi(state_hi, state_lo)` | 推进 PCG 高位字 |
| `pcg_output(state_lo)` | 从 PCG 状态提取输出值 |

### easing.mcrs

动画与平滑过渡的缓动函数。所有函数接受 `t ∈ [0, 10000]`（×10000），返回 `[0, 10000]`（弹性/弹跳可能略超出此范围）。依赖 `math.mcrs`。

```mcrs
import "stdlib/easing.mcrs"

@tick
fn animate() {
    let t: int = ...;  // 0-10000 进度
    let pos = ease_out_quad(t);      // 快入慢出
    let arc = ease_in_out_cubic(t);  // 两端平滑
}
```

| 函数 | 描述 |
|-----|------|
| `ease_linear(t)` | 线性，无缓动 |
| `ease_in/out/in_out_quad(t)` | 二次缓动 |
| `ease_in/out/in_out_cubic(t)` | 三次缓动 |
| `ease_in/out_quart(t)` | 四次缓动 |
| `ease_in/out/in_out_sine(t)` | 正弦近似缓动 |
| `ease_in/out_expo(t)` | 指数缓动 |
| `ease_in/out/in_out_back(t)` | 过冲（回弹）缓动 |
| `ease_out/in/in_out_bounce(t)` | 弹跳缓动 |
| `ease_smooth(t)` | Smoothstep（3t²−2t³） |
| `ease_smoother(t)` | Smootherstep（Ken Perlin，6t⁵−15t⁴+10t³） |

### noise.mcrs

用于地形生成和视觉效果的程序噪声函数。所有值使用 ×10000 定点比例。依赖 `math.mcrs`。

```mcrs
import "stdlib/noise.mcrs"

fn terrain_gen(x: int, z: int) {
    let h = terrain_height(x, z, 64, 20);  // 基准=64，±20 方块起伏
    let n = value_noise_2d(x * 10000, z * 10000);  // [0, 10000]
}
```

| 函数 | 描述 |
|-----|------|
| `hash_1d(x)` | 一维坐标的伪随机整数 |
| `hash_2d(x, z)` | 二维坐标的伪随机整数 |
| `hash_1d_pos(x)` / `hash_2d_pos(x,z)` | 哈希值 [0, 10000] |
| `value_noise_1d(x_fx)` | 平滑一维值噪声，x_fx ×10000，返回 [0, 10000] |
| `value_noise_2d(x_fx, z_fx)` | 平滑二维值噪声，返回 [0, 10000] |
| `fbm_1d(x_fx, octaves, persistence_fx)` | 一维分形布朗运动 |
| `fbm_2d(x_fx, z_fx, octaves, persistence_fx)` | 二维分形布朗运动 |
| `terrain_height(x, z, base_y, amplitude)` | 使用 3 倍频 fBm 生成地形高度 |

### parabola.mcrs

抛射体轨迹辅助函数，使用 Minecraft 原生定点缩放（×10000）。计算箭、雪球、火球等抛射体的发射速度、飞行位置和逐 tick 阻力物理。依赖 `math.mcrs`（`mulfix`）。

**缩放约定：**
- 位置：方块（整数）
- 速度：方块/tick ×10000（如 `8000` = 0.8 方块/tick）
- 重力常量：`800`（≈ 0.08 方块/tick²）
- MC 箭矢阻力：`9900`（每 tick × 0.99）

```mcrs
import "stdlib/math.mcrs"
import "stdlib/parabola.mcrs"

// 瞄准目标：水平 10 格，垂直 3 格，15 tick 后到达
fn shoot_at(target_dx: int, target_dy: int, target_dz: int) {
    let ticks: int = 15;
    let vx: int = parabola_vx(target_dx, ticks);  // ×10000
    let vy: int = parabola_vy(target_dy, ticks);  // ×10000
    let vz: int = parabola_vz(target_dz, ticks);  // ×10000
}

// 带阻力的逐 tick 箭矢飞行模拟
fn tick_arrow() {
    let arrow_drag: int = 9900;
    arrow_vy = parabola_step_vy(arrow_vy, arrow_drag);
    arrow_vx = parabola_step_vx(arrow_vx, arrow_drag);
}
```

| 函数 | 描述 |
|-----|------|
| `parabola_gravity()` | 重力常量：`800`（0.08 方块/tick² ×10000） |
| `parabola_gravity_half()` | 半重力：`400`（用于位移公式） |
| `parabola_vx(dx, ticks)` | X 轴发射速度 ×10000，使 `dx` 方块在 `ticks` tick 后到达 |
| `parabola_vy(dy, ticks)` | Y 轴发射速度 ×10000，使 `dy` 方块在 `ticks` tick 后到达 |
| `parabola_vz(dz, ticks)` | Z 轴发射速度 ×10000，使 `dz` 方块在 `ticks` tick 后到达 |
| `parabola_speed_xz(dx, dz, ticks)` | 水平发射速度 √(vx²+vz²) ×10000 |
| `parabola_x(vx0, t)` | t tick 后的 X 位置（方块），初速度 ×10000 |
| `parabola_y(vy0, t)` | t tick 后的 Y 位置（方块），初速度 ×10000 |
| `parabola_z(vz0, t)` | t tick 后的 Z 位置（方块），初速度 ×10000 |
| `parabola_flight_time(vy0)` | 抛射体回到发射高度所需 tick 数；vy0 ≤ 0 时返回 0 |
| `parabola_max_height(vy0)` | 发射点以上最高高度（方块） |
| `parabola_step_vx(vx, drag)` | 对 X 速度施加一 tick 阻力 |
| `parabola_step_vy(vy, drag)` | 对 Y 速度施加重力后再施加阻力（一 tick） |
| `parabola_step_vz(vz, drag)` | 对 Z 速度施加一 tick 阻力 |
| `parabola_ticks_for_range(range)` | 估算水平距离所需 tick 数（箭矢启发式） |
| `parabola_in_range(dx, dz, max_range)` | 目标在水平范围内返回 1 |

### physics.mcrs

简单定点数物理模拟（位置/速度 ×100，1 方块 = 100 单位，1 tick = 1/20 秒）。包含抛体运动、阻力、弹簧和匀速圆周运动。

```mcrs
import "stdlib/physics.mcrs"

fn tick_projectile() {
    vy = apply_gravity(vy);
    vy = apply_drag(vy, air_drag_fx());  // 每 tick 0.98 衰减
    py = update_pos(py, vy);

    if (is_grounded(py, ground_y) == 1) {
        vy = bounce_v(vy, 6000);  // 60% 弹性系数
    }
}
```

| 函数 | 描述 |
|-----|------|
| `gravity_fx()` | 重力常量：8（0.08 方块/tick² × 100） |
| `air_drag_fx()` | 空气阻力：9800（0.98 × 10000） |
| `water_drag_fx()` | 水中阻力：8000（0.80 × 10000） |
| `projectile_y(p0, v0, t)` | t tick 后的 Y 位置（无阻力） |
| `projectile_x(p0, v0, t)` | t tick 后的 X 位置（匀速） |
| `projectile_vy(v0, t)` | t tick 后的 Y 速度 |
| `projectile_land_t(v0y)` | 近似落地 tick |
| `projectile_max_height(v0y)` | 最大高度 ×100 |
| `apply_drag(v_fx, drag_fx)` | 对速度施加阻力 |
| `apply_gravity(vy_fx)` | 对 Y 速度施加一次重力 |
| `update_pos(p_fx, v_fx)` | 前进一 tick 更新位置 |
| `bounce_v(v_fx, restitution_fx)` | 速度反射并损失能量 |
| `clamp_velocity(v_fx, max_fx)` | 限制速度上限 |
| `spring_force(pos_fx, target_fx, k_fx)` | 胡克定律弹力 |
| `spring_update_v(v_fx, pos_fx, target_fx, k_fx, damping_fx)` | 弹簧 + 阻尼更新速度 |
| `circular_x/z(c, r, angle_deg)` | 给定角度的圆周 X/Z 坐标 |
| `friction_decel(v_fx, friction_fx)` | 摩擦力使速度向零减小 |
| `is_grounded(y_fx, ground_y_fx)` | 是否在地面（返回 1/0） |
| `impact_velocity(h_fx)` | 从高度 h ×100 自由落体的撞击速度 |

### matrix.mcrs

用于 Minecraft 展示实体的 2D/3D 变换辅助函数。值 ×10000；角度 ×10000（度）。需用 `raw()` 命令将变换应用到实体。依赖 `math.mcrs`。

```mcrs
import "stdlib/matrix.mcrs"

fn spin_display(angle_fx: int) {
    let s = quat_sin_half(angle_fx);
    let c = quat_cos_half(angle_fx);
    raw("data modify entity @e[tag=my_display,limit=1] transformation.left_rotation set value [0f,{s}f,0f,{c}f]");
}
```

| 函数 | 描述 |
|-----|------|
| `rotate2d_x/y(x, y, angle_deg)` | 二维旋转分量；角度 ×10000 |
| `scale_x/y/z(v, s_fx)` | 缩放分量，因子 ×10000 |
| `uniform_scale(v, s_fx)` | 均匀缩放 ×10000 |
| `rotate_y_x/z(x, z, angle_deg)` | 绕 Y 轴旋转的 X/Z 分量 |
| `rotate_x_y/z(y, z, angle_deg)` | 绕 X 轴旋转的 Y/Z 分量 |
| `quat_sin_half(angle_deg_fx)` | Y 轴四元数 sin(angle/2) ×1000 |
| `quat_cos_half(angle_deg_fx)` | Y 轴四元数 cos(angle/2) ×1000 |
| `billboard_y(player_yaw_fx)` | 面向玩家的广告牌 Y 旋转 |
| `lerp_angle(a_fx, b_fx, t)` | 角度最短路径插值 |

### quaternion.mcrs

用于 Minecraft 展示实体旋转的四元数数学。所有分量使用 ×10000 缩放（如 `7071` = 0.7071）。依赖 `math.mcrs`（`sin_fixed`、`cos_fixed`、`mulfix`、`isqrt`）。

**MC 展示实体四元数格式：** `[x, y, z, w]` — 以浮点数存储在 `left_rotation` / `right_rotation` 中。单位四元数满足 x²+y²+z²+w² = 1。

```mcrs
import "stdlib/math.mcrs"
import "stdlib/quaternion.mcrs"

// 绕 Y 轴旋转 45°
fn rotate_display_y45() {
    let qx: int = quat_axis_y_x(45);  // 0
    let qy: int = quat_axis_y_y(45);  // sin(22.5°) × 10000 ≈ 3827
    let qz: int = quat_axis_y_z(45);  // 0
    let qw: int = quat_axis_y_w(45);  // cos(22.5°) × 10000 ≈ 9239
    raw("data modify entity @e[tag=my_display,limit=1] transformation.left_rotation set value [{qx}f,{qy}f,{qz}f,{qw}f]");
}

// 在 20 tick 内平滑插值旋转
let interp_tick: int = 0;
fn slerp_step() {
    interp_tick = interp_tick + 50;  // 1000/20 = 每 tick 50
    if (interp_tick > 1000) { interp_tick = 1000; }
    let rx: int = quat_slerp_x(ax, ay, az, aw, bx, by, bz, bw, interp_tick);
    let ry: int = quat_slerp_y(ax, ay, az, aw, bx, by, bz, bw, interp_tick);
    let rz: int = quat_slerp_z(ax, ay, az, aw, bx, by, bz, bw, interp_tick);
    let rw: int = quat_slerp_w(ax, ay, az, aw, bx, by, bz, bw, interp_tick);
}
```

**构造函数：**

| 函数 | 描述 |
|-----|------|
| `quat_identity_x/y/z/w()` | 单位四元数 (0, 0, 0, 10000) — 无旋转 |
| `quat_axis_x_x/y/z/w(angle_deg)` | 绕 X 轴旋转 `angle_deg` 度的四元数 |
| `quat_axis_y_x/y/z/w(angle_deg)` | 绕 Y 轴旋转的四元数 |
| `quat_axis_z_x/y/z/w(angle_deg)` | 绕 Z 轴旋转的四元数 |
| `quat_euler_x/y/z/w(yaw, pitch, roll)` | 欧拉角 → 四元数（YXZ 顺序，MC 约定） |

**运算：**

| 函数 | 描述 |
|-----|------|
| `quat_mul_x/y/z/w(ax,ay,az,aw, bx,by,bz,bw)` | 四元数乘法 a × b；所有分量 ×10000 |
| `quat_conj_x/y/z/w(qx,qy,qz,qw)` | 共轭（对单位四元数即为逆）：x/y/z 取反，w 不变 |
| `quat_dot(ax,ay,az,aw, bx,by,bz,bw)` | 四元数点积 ×10000 |
| `quat_mag_sq(qx,qy,qz,qw)` | 模长平方 ×10000（单位四元数应为 10000） |
| `quat_slerp_x/y/z/w(ax,ay,az,aw, bx,by,bz,bw, t)` | SLERP 插值；t ∈ [0, 1000] |

> **SLERP 实现：** 使用归一化线性插值（nlerp）近似，比真正的球面插值更高效，对 Minecraft 动画速度完全够用。结果始终为单位四元数。

### signal.mcrs

用于战利品表、生成权重和游戏事件的统计分布与概率辅助函数。值 ×10000。`exp_dist_approx` 依赖 `math.mcrs`。

```mcrs
import "stdlib/signal.mcrs"

fn loot_roll(seed: int) {
    let item = weighted3(seed, 60, 30, 10);  // 60% / 30% / 10%
    let hit  = bernoulli(seed, 2500);        // 25% 概率返回 1
    let dmg  = uniform_int(seed, 5, 15);     // 5–15
}
```

| 函数 | 描述 |
|-----|------|
| `uniform_int(seed, lo, hi)` | [lo, hi] 内的整数（含两端） |
| `uniform_frac(seed)` | [0, 10000] 内的均匀分布分数 |
| `normal_approx12(seed)` | 近似 N(0,1) ×10000；范围约 [-60000, 60000] |
| `exp_dist_approx(seed, lambda_fx)` | 指数分布变量 ×10000；lambda ×10000 |
| `bernoulli(seed, p_fx)` | 以 p/10000 概率返回 1，否则返回 0 |
| `weighted2(seed, w0, w1)` | 加权选 0 或 1 |
| `weighted3(seed, w0, w1, w2)` | 加权选 0、1 或 2 |
| `gamma_sample(shape_k, scale_theta, seed)` | Gamma(k, θ) 变量 ×10000；shape_k 和 scale_theta ×10000；k ∈ [1, 5] |
| `poisson_sample(lambda, seed)` | Poisson(λ) 计数（普通 int）；lambda ×10000；λ ≤ 20 效果最佳 |
| `geometric_sample(p_success, seed)` | Geometric(p) — 首次成功前的失败次数；p_success ×10000 |
| `negative_binomial_sample(r, p_success, seed)` | NegBin(r, p) — r 次成功前的总失败次数；p_success ×10000 |

#### 新分布（v2.5.0）

```mcrs
import "stdlib/math.mcrs"
import "stdlib/signal.mcrs"

fn loot_example(seed: int) {
    // Gamma 分布 — 武器伤害（形状=2，尺度=1.5）
    let dmg: int = gamma_sample(20000, 15000, seed);  // Gamma(2, 1.5) ×10000

    // Poisson 分布 — 每波随机刷怪数（λ=3）
    let spawns: int = poisson_sample(30000, seed);    // 整数计数

    // 几何分布 — 直到合成成功的尝试次数（p=0.3）
    let tries: int = geometric_sample(3000, seed);    // 整数计数

    // 负二项分布 — 3 次成功前的总失败数（p=0.5）
    let total_fail: int = negative_binomial_sample(3, 5000, seed);
}
```

> `gamma_sample` 使用 `stdlib/math.mcrs` 中的 `ln`（整数 ×10000 对数），支持整数形状参数 k = 1..5（×10000 表示为 10000..50000）。`poisson_sample` 使用 `stdlib/math.mcrs` 中的 `exp_fx`。

### bigint.mcrs

使用 base-10000 分块数组（大端序）的多精度整数算术。3 块 API 支持最多 96 位；数组 API 支持任意长度（需 RedScript ≥ 2.4.0）。

```mcrs
import "stdlib/bigint.mcrs"

fn big_add_example() {
    let carry_lo = bigint3_carry_lo(6789, 1);
    let lo = bigint3_add_lo(6789, 1);   // 6790
}
```

| 函数 | 描述 |
|-----|------|
| `bigint_base()` | 返回 10000（块基数） |
| `chunk_hi/lo(n)` | 块的高/低 4 位十进制数 |
| `bigint3_add_lo/mid/hi(...)` | 3 块加法（含进位） |
| `bigint3_sub_lo/mid/hi(...)` | 3 块减法（含借位） |
| `bigint3_mul1_lo/hi(a, b)` | 单块乘法低/高结果 |
| `bigint3_cmp(ahi,amid,alo,bhi,bmid,blo)` | 比较两个 3 块值：1/-1/0 |
| `int32_to_bigint3_lo/mid/hi(n)` | int32 拆分为 3 块 |
| `bigint3_to_int32(hi, mid, lo)` | 3 块合并为 int32 |
| `bigint_zero/copy/cmp(...)` | 数组置零/复制/比较 |
| `bigint_add(a,b,result,len)` | n 块加法，返回进位 |
| `bigint_sub(a,b,result,len)` | n 块减法（a ≥ b） |
| `bigint_mul_small(a,n,result,len)` | n 块 × 小整数（≤ 9999） |
| `bigint_shift_left(arr, len)` | 乘以 10000（左移一块） |
| `bigint_is_zero(arr, len)` | 全为 0 返回 1 |
| `bigint_leading_zeros(arr, len)` | 计算前导零块数 |
| `bigint_div_small(a,divisor,result,len)` | 除以小整数，返回余数 |
| `bigint_mod_small(a, divisor, len)` | a % divisor |
| `bigint_chunk(a, i)` | 读取第 i 个块 |

### advanced.mcrs

高级整数数学：数论、哈希、贝塞尔曲线和分形。依赖 `math.mcrs`，`angle_between` 还需 `vec.mcrs`。

```mcrs
import "stdlib/advanced.mcrs"

fn showcase() {
    let f10 = fib(10);               // 55
    let p   = is_prime(97);          // 1
    let pos = bezier_quad(0, 500, 1000, 500);  // 500（曲线中点）
    let itr = mandelbrot_iter(-500, 0, 100);   // 逃逸迭代次数
}
```

| 函数 | 描述 |
|-----|------|
| `fib(n)` | 斐波那契数 F(n)；n ≤ 46 |
| `is_prime(n)` | 质数返回 1，否则返回 0 |
| `collatz_steps(n)` | Collatz 序列到 1 的步数 |
| `digit_sum(n)` | 十进制各位之和 |
| `count_digits(n)` | 十进制位数 |
| `reverse_int(n)` | 翻转十进制数字 |
| `mod_pow(base, exp, m)` | (base^exp) mod m，快速幂；m ≤ 46340 |
| `hash_int(n)` | 确定性整数哈希，返回非负值 |
| `noise1d(x)` | 一维值噪声；x ×1000，输出 [0, 999] |
| `bezier_quad(p0,p1,p2,t)` | 二次贝塞尔曲线；t ∈ [0, 1000] |
| `bezier_cubic(p0,p1,p2,p3,t)` | 三次贝塞尔曲线；t ∈ [0, 1000] |
| `mandelbrot_iter(cx,cy,max_iter)` | Mandelbrot 迭代次数；cx/cy ×1000 |
| `julia_iter(z0r,z0i,cr,ci,max_iter)` | Julia 集迭代次数 |
| `angle_between(x1,y1,x2,y2)` | 两个二维向量夹角（度）[0, 180] |
| `clamp_circle_x/y(x, y, r)` | 将二维点夹至半径 r 的圆内 |
| `newton_sqrt(n)` | Newton 法整数平方根 |
| `digital_root(n)` | 反复求各位之和直至单位数 |
| `spiral_ring(n)` | Ulam 螺旋环号 |

### calculus.mcrs

数值微积分：微分、积分（梯形/Simpson）、黎曼和、曲线长度以及 Welford 在线统计。所有值 ×10000。

```mcrs
import "stdlib/calculus.mcrs"

fn integrate_example(vals: int[], n: int) {
    let area  = integrate_trapezoid(vals, n, 1000);  // 步长 h = 0.1
    let area2 = integrate_simpson(vals, n, 1000);    // 精度更高
    let deriv = deriv_central(vals[2], vals[0], 2000);
}
```

| 函数 | 描述 |
|-----|------|
| `deriv_forward(f1, f0, h_fx)` | 前向差分导数 ×10000 |
| `deriv_central(f_plus, f_minus, h_fx)` | 中心差分（更精确）×10000 |
| `second_deriv(f_plus, f0, f_minus, h_fx)` | 二阶导数 ×10000 |
| `integrate_trapezoid(vals, n, h_fx)` | 梯形法数值积分 |
| `integrate_simpson(vals, n, h_fx)` | Simpson 1/3 法则（n 须为奇数，≥ 3） |
| `riemann_left/right/mid(vals, n, h_fx)` | 左/右/中点黎曼和 |
| `curve_length_2d(xs, ys, n)` | 二维折线弧长 |
| `running_mean(prev_mean, new_val, n)` | Welford 在线均值更新 |
| `running_m2(prev_m2, prev_mean, new_mean, new_val)` | Welford M2 更新（用于方差） |
| `variance_from_m2(m2, n)` | 从 Welford M2 计算方差 |
| `std_dev_approx(variance_fx)` | 近似标准差 |

### geometry.mcrs

三维几何辅助：包围盒、球/圆柱体包含检测、抛物线运动、格子坐标、角度工具和 MC 太阳角度。坐标 ×100；角度 ×10000。依赖 `math.mcrs`。

```mcrs
import "stdlib/geometry.mcrs"

fn in_arena(px: int, py: int, pz: int) -> int {
    return aabb_contains(px, py, pz, 0, 60, 0, 200, 80, 200);
}
```

| 函数 | 描述 |
|-----|------|
| `midpoint(a, b)` | 两坐标的整数中点 |
| `aabb_contains(...)` | 点是否在 AABB 包围盒内 |
| `sphere_contains(...)` | 点是否在球体内（无需开方） |
| `cylinder_contains(px,pz,cx,cz,r)` | 点是否在竖直圆柱内 |
| `parabola_y(y0, vy0, t)` | t tick 后的抛体 Y 位置 ×100 |
| `parabola_x(x0, vx0, t)` | t tick 后的 X 位置（匀速） |
| `parabola_land_t(vy0)` | 近似落地 tick |
| `tile_of(coord, tile_size)` | 坐标所在格子 |
| `tile_center(tile, tile_size)` | 格子中心坐标 |
| `angle_normalize(deg)` | 角度规范化至 [0, 3600000) ×10000 |
| `angle_diff(a, b)` | 带符号的最短角差 ×10000 |
| `mc_day_angle(daytime)` | 从 `/time query daytime` 得到 MC 太阳角度 ×10000 |

### particles.mcrs

粒子效果辅助函数与粒子绘图工具。调用 `raw()` 命令生成粒子。

```mcrs
import "stdlib/particles.mcrs"

fn on_kill() {
    explosion_effect(0, 64, 0);
    hearts_at(0, 65, 0);
}

fn draw_ring(cx: int, cy: int, cz: int) {
    draw_circle(cx, cy, cz, 500, 32, "minecraft:flame");  // 半径 5 方块 ×100
}
```

| 函数 | 描述 |
|-----|------|
| `hearts_at(x,y,z)` | 爱心粒子 |
| `flames(x,y,z)` | 火焰粒子 |
| `smoke(x,y,z)` | 大烟雾效果 |
| `explosion_effect(x,y,z)` | 爆炸粒子 |
| `sparkles_at(x,y,z)` | 附魔闪光 |
| `angry_at(x,y,z)` | 愤怒村民粒子 |
| `happy_at(x,y,z)` | 快乐村民粒子 |
| `portal_effect(x,y,z)` | 传送门粒子 |
| `totem_at(x,y,z)` | 不死图腾粒子 |
| `end_sparkles_at(x,y,z)` | 末地烛闪光 |
| `particle_at_fx(x_fx,y_fx,z_fx,particle)` | 在定点坐标 ×100 处生成单个粒子 |
| `draw_line_2d(x0,y0,x1,y1,steps,z,particle)` | 用粒子画线；坐标 ×100 |
| `draw_circle(cx,cy,cz,r,steps,particle)` | 在 XZ 平面画圆；r ×100 |
| `draw_helix(cx,cy_start,cz,r,height,rotations,steps,particle)` | 画螺旋线 |
| `particle_dot(x,y,z,particle)` | 在整数方块坐标处生成单个粒子 |

### spawn.mcrs

出生点与传送辅助函数。

```mcrs
import "stdlib/spawn.mcrs"

fn start_game() {
    gather_all(0, 64, 0);  // 将所有人传送到出生点
    goto_arena(@s);        // 将当前玩家传送到竞技场
}
```

| 函数 | 描述 |
|-----|------|
| `teleport_to(target, x, y, z)` | 将选择器传送到坐标 |
| `teleport_to_entity(target, dest)` | 将选择器传送到另一实体处 |
| `spread_players(x, z, radius)` | 在区域内随机扩散所有玩家 |
| `gather_all(x, y, z)` | 将所有玩家传送到同一位置 |
| `launch_up(target, height)` | 将目标向上传送 height 方块 |
| `goto_lobby(target)` | 传送到大厅（0, 64, 0），并显示标题 |
| `goto_arena(target)` | 传送到竞技场（100, 64, 100），并显示标题 |

### strings.mcrs

最小化字符串辅助函数。数据包中的运行时字符串操作受限；`str_len` 对字面量字符串由编译器辅助实现。

```mcrs
import "stdlib/strings.mcrs"

fn example() {
    let n = str_len("hello");  // 编译器对字符串字面量求解
}
```

| 函数 | 描述 |
|-----|------|
| `str_len(s)` | 字符串长度（对字面量由编译器辅助） |

### teams.mcrs

封装 Minecraft `/team` 命令的队伍管理辅助函数。

```mcrs
import "stdlib/teams.mcrs"

@load
fn setup() {
    setup_four_teams();
}

fn assign(p: selector) {
    add_to_team(p, "red");
}
```

| 函数 | 描述 |
|-----|------|
| `create_team(name, color)` | 创建指定名称和颜色的队伍 |
| `create_red/blue/green/yellow_team()` | 创建对应颜色队伍（关闭友伤） |
| `add_to_team(target, team_name)` | 将选择器加入队伍 |
| `remove_from_teams(target)` | 将选择器从所有队伍移除 |
| `setup_two_teams()` | 创建红队和蓝队 |
| `setup_four_teams()` | 创建红、蓝、绿、黄四支队伍 |
| `cleanup_teams()` | 删除四支默认队伍 |

### color.mcrs

打包 RGB 整数与 HSL ↔ RGB 转换的颜色工具。打包格式：`R×65536 + G×256 + B`（无原生位运算）。

```mcrs
import "stdlib/color.mcrs"

fn rainbow(hue: int) {
    let col = hsl_to_packed(hue, 100, 50);  // H=0-360, S=100, L=50
    let r = rgb_r(col);
    let blend = rgb_lerp(col, 16777215, 500);  // 与白色各 50% 混合
}
```

| 函数 | 描述 |
|-----|------|
| `rgb_pack(r, g, b)` | 将 RGB（各 0–255）打包为单一整数 |
| `rgb_r/g/b(packed)` | 提取 R/G/B 分量 |
| `rgb_lerp(a, b, t)` | 混合两个打包颜色；t ∈ [0, 1000] |
| `hsl_to_r/g/b(h, s, l)` | HSL → 各 RGB 分量；H 0–360，S/L 0–100 |
| `hsl_to_packed(h, s, l)` | HSL → 打包 RGB 整数 |
| `rgb_to_h/s/l(r, g, b)` | RGB → 色相/饱和度/亮度 |

### interactions.mcrs

玩家交互检测辅助函数：右键（胡萝卜钓竿）、潜行、视角方向及组合输入。使用记分板。在 `@load` 中调用一次 `interactions_init()`。

```mcrs
import "stdlib/interactions.mcrs"

@load fn setup() { interactions_init(); }

@tick
fn handle_input() {
    on_sneak_click();

    foreach (p in @a[tag=rs.clicked]) {
        say("点击了！");
        tag_remove(p, "rs.clicked");
    }
}
```

| 函数 | 描述 |
|-----|------|
| `interactions_init()` | 注册点击、潜行和攻击检测所需的记分板 |
| `on_right_click(callback_fn)` | 将右键点击玩家标记为 `rs.clicked` |
| `is_sneaking(target)` | 目标正在潜行返回 1 |
| `on_sneak_start()` | 将刚开始潜行的玩家标记为 `rs.sneak_start` |
| `check_look_up/down/straight()` | 按俯仰角为玩家添加对应标签 |
| `check_holding_item(item_id)` | 检测手持特定物品（需谓词文件） |
| `on_sneak_click()` | 检测潜行+右键组合，标记 `rs.sneak_click` 或 `rs.clicked` |
| `on_double_sneak()` | 检测 10 tick 内的双击潜行，标记 `rs.double_sneak` |

### math_hp.mcrs

利用 Minecraft 内部 Java `Math.sin/cos`（双精度）和展示实体 SVD 技巧实现的高精度三角函数与算术。角度 ×10000；输出 ×10000。需在 `@load` 中调用 `init_trig()` 和 `init_div()`。

```mcrs
import "stdlib/math_hp.mcrs"

@load fn setup() {
    init_trig();
    init_div();
}

fn example() {
    let s = sin_hp(450000);      // sin(45°) ≈ 7071
    let c = cos_hp(900000);      // cos(90°) ≈ 0
    let d = div_hp(10000, 3000); // ≈ 33333（10000/3000 × 10000）
    let r = sqrt_hp(20000);      // ≈ 14142（√2 × 10000）
}
```

| 函数 | 描述 |
|-----|------|
| `init_trig()` | 召唤 Marker 实体 `rs_trig`；在 `@load` 中调用 |
| `sin_hp(angle)` | 高精度正弦；角度 ×10000，返回 ×10000 |
| `cos_hp(angle)` | 高精度余弦；角度 ×10000，返回 ×10000 |
| `init_div()` | 召唤 block_display 实体 `rs_div`；在 `@load` 中调用 |
| `div_hp(a, b)` | 高精度除法 a/b ×10000 |
| `div3_hp(a, b, c, d)` | 三个值同除以 d；结果存于 `$div3_x/y/z` 记分板 |
| `sqrt_hp(x)` | 高精度平方根；x ×10000，返回 ×10000 |
| `norm3_hp(x, y, z)` | 三维向量模长 √(x²+y²+z²)；输入 ×10000 |

### sets.mcrs

基于 NBT 存储的运行时集合，添加时强制唯一性。实际实现内置于编译器；本模块提供接口文档。

```mcrs
import "stdlib/sets.mcrs"

fn example() {
    let s = set_new();
    set_add(s, "player1");
    set_add(s, "player1");          // 重复值忽略
    let found = set_contains(s, "player1");  // 1
    set_remove(s, "player1");
    set_clear(s);
}
```

| 函数 | 描述 |
|-----|------|
| `set_new()` | 创建新的空集合，返回唯一集合 ID |
| `set_add(set, value)` | 若值不存在则添加 |
| `set_contains(set, value)` | 值存在返回 1，否则返回 0 |
| `set_remove(set, value)` | 从集合中移除值 |
| `set_clear(set)` | 清空集合所有值 |
