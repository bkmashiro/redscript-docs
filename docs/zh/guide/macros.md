# 宏函数

RedScript 自动使用 MC 1.20.2+ 的函数宏功能，允许在通常需要编译时字面量的位置（坐标、实体类型等）使用运行时变量。

## 问题

在原版 Minecraft 命令中，某些值必须是字面量：

```mcfunction
# ❌ 这不行 - 坐标不能是计分板值
teleport @s $x $y $z
```

## 解决方案

RedScript 自动检测你在这些位置使用变量的情况，并编译为宏语法：

```rs
fn spawn_at(x: int, y: int, z: int) {
    summon("minecraft:zombie", x, y, z);
}

// 用运行时值调用
let px: int = get_player_x();
spawn_at(px, 64, 100);
```

**编译结果：**
```mcfunction
# spawn_at.mcfunction
$summon minecraft:zombie $(x) $(y) $(z)

# 调用处：
execute store result storage rs:macro_args x int 1 run scoreboard players get $px rs
data modify storage rs:macro_args y set value 64
data modify storage rs:macro_args z set value 100
function ns:spawn_at with storage rs:macro_args
```

## 自动优化

RedScript 智能决定何时使用宏：

```rs
spawn_at(100, 64, 200);   // 全常量 → 直接内联，不用宏
spawn_at(px, 64, pz);     // 有变量 → 使用宏
```

## 支持的内置函数

以下内置函数支持自动宏编译：

| 内置函数 | 宏支持的位置 |
|---------|-------------|
| `summon` | 坐标、实体类型 |
| `teleport` / `tp` | 坐标 |
| `particle` | 坐标 |
| `setblock` | 坐标、方块类型 |
| `fill` | 坐标、方块类型 |
| `clone` | 坐标 |
| `playsound` | 坐标 |
| `effect` | 效果类型、持续时间、等级 |
| `give` | 物品类型、数量 |

## 示例：动态传送

```rs
struct Waypoint {
    x: int,
    y: int,
    z: int
}

fn tp_to_waypoint(wp: Waypoint) {
    teleport(@s, wp.x, wp.y, wp.z);
}

@keep fn go_home() {
    let home: Waypoint = { x: 100, y: 64, z: -200 };
    tp_to_waypoint(home);
}
```

## 示例：粒子网格

```rs
fn spawn_particle_at(x: int, y: int, z: int) {
    particle("minecraft:flame", x, y, z, 0, 0, 0, 0, 1);
}

@keep fn draw_grid() {
    for (let i: int = 0; i < 10; i = i + 1) {
        for (let j: int = 0; j < 10; j = j + 1) {
            spawn_particle_at(i * 2, 64, j * 2);
        }
    }
}
```

## 要求

- Minecraft 1.20.2 或更高版本（函数宏在此版本添加）
- 早期版本无法使用宏编译的函数

## 工作原理

1. **检测**：编译时，RedScript 扫描函数体
2. **标记**：在需要字面量位置使用的参数被标记
3. **生成**：被标记的函数生成 `$` 前缀的命令
4. **调用处**：变量参数通过 NBT storage 传递

这一切都是自动的 - 你不需要任何特殊语法或装饰器。

## 下一步

- [变量与类型](/zh/guide/variables) — 数据类型和声明
- [函数](/zh/guide/functions) — 函数定义
