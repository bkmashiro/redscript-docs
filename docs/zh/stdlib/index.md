# 标准库

RedScript 内置 35 个标准库模块。使用 `import <name>;` 导入任意模块。

## 分类

### 数学
- [math](/zh/stdlib/math) — 基础数学（`abs`, `clamp`, `lerp`, `sin_fixed`, `sqrt_fx`, `ln`, `exp_fx`, `smoothstep`, ...）
- [math_hp](/zh/stdlib/math_hp) — 高精度（`sin_hp`, `cos_hp`, `ln_hp`, `double_sqrt`, `pow_real`, ...）
- [bits](/zh/stdlib/bits) — 位运算（`bit_and`, `bit_or`, `bit_xor`, `bit_shl`, `popcount`, ...）
- [bigint](/zh/stdlib/bigint) — 多字整数（base-10000 大整数加减乘除，任意长度）
- [calculus](/zh/stdlib/calculus) — 数值积分/微分（梯形法、Simpson 法、Welford 统计）

### 数据结构
- [list](/zh/stdlib/list) — 数组聚合（`sum`, `avg`, `min`, `max`, `sort3`–`sort5`, `shuffle`, ...）
- [sets](/zh/stdlib/sets) — 集合操作（`set_new`, `set_add`, `set_contains`, `set_remove`）
- [matrix](/zh/stdlib/matrix) — Display Entity 矩阵数学（2D/3D 旋转、缩放、四元数辅助）
- [vec](/zh/stdlib/vec) — 2D/3D 向量（`dot2d`, `cross3d`, `length2d_fixed`, `atan2_fixed`, `normalize2d_x`, ...）
- [quaternion](/zh/stdlib/quaternion) — 3D 旋转（`quat_mul`, `quat_slerp`, `quat_euler`，轴角构造器）

### 随机与统计
- [random](/zh/stdlib/random) — LCG/PCG 随机数生成器，二项分布和超几何采样
- [noise](/zh/stdlib/noise) — 程序化噪声（一维/二维值噪声、分形布朗运动、地形高度）

### 信号处理
- [signal](/zh/stdlib/signal) — DFT（最多 8 个样本），高斯/指数/泊松/几何分布
- [expr](/zh/stdlib/expr) — RPN 表达式求值器（运行时动态公式求值）

### 几何与图形
- [geometry](/zh/stdlib/geometry) — 选择区域（AABB、球体、圆柱体、圆锥、扇形）
- [advanced](/zh/stdlib/advanced) — 贝塞尔曲线（二阶–N 阶），Mandelbrot/Julia 集，模幂运算
- [parabola](/zh/stdlib/parabola) — 抛体轨迹（弹道瞄准，阻力物理）
- [easing](/zh/stdlib/easing) — 缓动函数（quad、cubic、quartic、sine、expo、back、bounce、smoothstep）
- [particles](/zh/stdlib/particles) — 粒子辅助（心形、火焰、烟雾；绘制线、圆、螺旋）
- [color](/zh/stdlib/color) — RGB/HSL/十六进制颜色工具（打包/解包、插值、RGB↔HSL 转换）

### 物理
- [physics](/zh/stdlib/physics) — 速度、重力、碰撞（抛体运动、阻力、弹簧、摩擦力）
- [strings](/zh/stdlib/strings) — 字符串工具（`str_len`）

### Minecraft 游戏机制
- [player](/zh/stdlib/player) — 玩家工具（`heal`, `damage`, `is_op`）
- [mobs](/zh/stdlib/mobs) — 生物类型字符串常量（所有原版实体 ID）
- [combat](/zh/stdlib/combat) — 伤害与生命值（`weapon_damage`, `apply_damage`）
- [effects](/zh/stdlib/effects) — 药水效果（`speed`, `jump`, `regen`, `buff_all`, ...）
- [spawn](/zh/stdlib/spawn) — 实体生成与传送（`teleport_to`, `goto_lobby`, `goto_arena`）
- [interactions](/zh/stdlib/interactions) — 交互实体（右键、潜行、视线方向检测）
- [inventory](/zh/stdlib/inventory) — 物品栏管理（`clear_inventory`, `give_kit_warrior`, ...）
- [bossbar](/zh/stdlib/bossbar) — Boss 栏 UI（`create_timer_bar`, `create_health_bar`, `update_bar_color`）
- [cooldown](/zh/stdlib/cooldown) — 技能冷却（`cooldown_start`, `cooldown_ready`, `cooldown_tick`）
- [timer](/zh/stdlib/timer) — 倒计时器（`Timer` 结构体，包含 `start`, `done`, `remaining`）
- [tags](/zh/stdlib/tags) — Minecraft 方块/实体/物品/伤害类型标签字符串常量
- [teams](/zh/stdlib/teams) — 队伍管理（`setup_two_teams`, `setup_four_teams`, `add_to_team`）
- [world](/zh/stdlib/world) — 世界查询（`set_day`, `weather_clear`, `sun_altitude`, `glass_box`, ...）
