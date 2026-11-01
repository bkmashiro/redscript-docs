# 选择器

选择器用于定位 Minecraft 世界中的实体。RedScript 使用与原版 Minecraft 相同的选择器语法，完全集成到类型系统中。

## 基础选择器

| 选择器 | 目标 |
|--------|------|
| `@a` | 所有玩家 |
| `@e` | 所有实体 |
| `@p` | 最近的玩家 |
| `@s` | 执行者（自身） |
| `@r` | 随机玩家 |

```rs
say_to(@a, "Hello everyone!");
say_to(@p, "Hello nearest player!");
kill(@e[type=zombie]);
```

## 选择器参数

在方括号中使用参数过滤目标：

```rs
// 按标签
effect(@a[tag=vip], "glowing", 10, 1);

// 按类型
kill(@e[type=zombie]);

// 按距离
give(@a[distance=..10], "diamond", 1);

// 按游戏模式
tp(@a[gamemode=survival], 0, 100, 0);

// 按名称
tp(@a[name=Alex], 0, 100, 0);
```

## 多个参数

使用逗号组合参数：

```rs
// 10 格内带有 "playing" 标签的生存模式玩家
effect(@a[gamemode=survival, distance=..10, tag=playing], "speed", 5, 1);

// 20 格内的所有僵尸
kill(@e[type=zombie, distance=..20]);
```

## 距离范围

```rs
@a[distance=..10]      // 10 格以内
@a[distance=5..]       // 5 格以外
@a[distance=5..10]     // 5 到 10 格之间
```

## 基于分数的选择

通过记分板值选择：

```rs
// 击杀数 >= 10 的玩家
give(@a[scores={kills=10..}], "gold_ingot", 1);

// 生命值在 1 到 5 之间的玩家
effect(@a[scores={health=1..5}], "regeneration", 5, 2);
```

## 限制与排序

```rs
// 按分数排序的前 3 名玩家
@a[sort=arbitrary, limit=3]

// 最近的 5 个实体
@e[sort=nearest, limit=5]

// 随机玩家
@a[sort=random, limit=1]
```

## 视角过滤器

检测玩家看向的方向：

```rs
// 抬头看 (俯仰角 < -45)
foreach (p in @a[x_rotation=-90..-45]) {
    say("在看天空！");
}

// 低头看 (俯仰角 > 45)
foreach (p in @a[x_rotation=45..90]) {
    say("在看地面！");
}

// 面向北方 (偏航角约 180)
foreach (p in @a[y_rotation=135..225]) {
    say("面向北方！");
}
```

## 位置过滤器

按坐标选择：

```rs
// 在特定区域内的玩家
foreach (p in @a[x=-10..10, y=60..70, z=-10..10]) {
    effect(@s, "glowing", 1, 0);
}
```

## 变量选择器语法 <Badge type="tip" text="v1.1.0" />

在 `foreach` 循环内，可以对循环变量使用过滤器：

```rs
foreach (p in @a) {
    // p[filters] 自动转换为 @s[filters]
    execute if entity p[x_rotation=-90..-45] run {
        tag_add(@s, "looking_up");
    }
    execute unless entity p[x_rotation=-90..-45] run {
        tag_remove(@s, "looking_up");
    }
}
```

这是语法糖 —— `p[x_rotation=-90..-45]` 编译为 `@s[x_rotation=-90..-45]`。

## 实体类型语法

在选择器中，未指定命名空间的实体类型会自动补全为 `minecraft:`：

```rs
// 以下两种写法等价（裸名自动补全）：
kill(@e[type=zombie]);              // 警告：自动补全为 minecraft:zombie
kill(@e[type=minecraft:zombie]);    // 显式命名空间

// 自定义/模组实体使用完整命名空间：
kill(@e[type=modname:custom_mob]);
```

物品在函数参数中使用字符串：

```rs
give(@a, "minecraft:diamond_sword", 1);
```

## 选择器作为参数

将选择器传递给函数：

```rs
fn buff(targets: selector) {
    effect(targets, "strength", 30, 1);
    effect(targets, "speed", 30, 1);
    effect(targets, "resistance", 30, 1);
}

buff(@a[tag=team_red]);
buff(@a[tag=team_blue]);
```

## 实际示例

基于选择器的竞技场小游戏逻辑：

```rs
let arena_center_x: int = 0;
let arena_center_z: int = 0;

@tick(rate=20)
fn arena_check() {
    // 治疗竞技场内的玩家
    effect(@a[tag=playing, distance=..50], "regeneration", 2, 0);

    // 伤害竞技场外的玩家
    effect(@a[tag=playing, distance=50..], "wither", 2, 0);

    // 移除死亡的怪物
    kill(@e[type=zombie, nbt={Health:0f}]);
}
```

## 下一步

- [第一个数据包](/zh/guide/first-datapack) — 构建完整项目
- [内置函数](/zh/reference/builtins) — 所有可用函数
