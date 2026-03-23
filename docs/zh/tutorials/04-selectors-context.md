# 教程 04：selector 与执行上下文

<div class="tutorial-meta">
  <span class="difficulty intermediate">🟡 Intermediate</span>
  <span class="time">⏱️ 25 min</span>
</div>


**难度：** 入门
**时长：** ~20 分钟
**前置条件：** [教程 03：函数与 struct](./03-functions-structs)

## 你将构建什么

一个范围检测器，每秒检查玩家是否在世界原点 10 格以内。进入区域的玩家会获得速度提升和发光效果；离开区域后效果消除。

## 你将学到什么

- selector 类型：`@s`、`@p`、`@a`、`@e`
- selector 过滤器：`[distance=..10]`、`[type=...]`、`[tag=...]`
- `foreach` 遍历匹配实体
- `tag_add` / `tag_remove` 用于追踪实体状态
- 以 `selector` 为参数类型调用函数

## 第一步：selector 基础

RedScript 支持所有原版 MC selector：

| selector | 含义 |
|----------|---------|
| `@s` | 当前正在执行的实体（函数调用者） |
| `@p` | 离执行者最近的玩家 |
| `@a` | 所有玩家 |
| `@e` | 所有实体 |
| `@a[distance=..10]` | 10 格范围内的所有玩家 |
| `@e[type=minecraft:zombie]` | 所有僵尸 |
| `@a[tag=vip]` | 所有带有 `vip` 标签的玩家 |

```rs
// 只向触发玩家发送私信
tell(@s, "You triggered this!")

// 向所有人广播
tell(@a, "Hello, world!")

// 给予最近的玩家
give(@p, "minecraft:apple", 1)
```

## 第二步：foreach 循环

`foreach` 遍历匹配某个 selector 的每个实体。在循环体内，`@s` 代表每个被匹配的实体：

```rs
// 给所有玩家发放钻石
foreach (p in @a) {
    give(p, "minecraft:diamond", 1)
    tell(p, "You got a diamond!")
}
```

## 第三步：区域检测器

```rs
import effects::*

@tick(rate=20)
fn check_zone() {
    // 执行者 10 格范围内的玩家
    foreach (p in @a[distance=..10]) {
        let was_in_zone: int = scoreboard_get(p, "in_zone")
        if (was_in_zone == 0) {
            // 刚刚进入
            scoreboard_set(p, "in_zone", 1)
            on_player_enter(p)
        }
        refresh_zone_effects(p)
    }

    // 10 格范围外、之前在区域内的玩家
    foreach (p in @a[distance=10..]) {
        let was_in_zone: int = scoreboard_get(p, "in_zone")
        if (was_in_zone == 1) {
            scoreboard_set(p, "in_zone", 0)
            on_player_leave(p)
        }
    }
}
```

## 第四步：进入与离开处理器

```rs
fn on_player_enter(p: selector) {
    tell(p, "You entered the magic zone!")
    title(p, "Zone Entered")
    subtitle(p, "You have the blessing")
}

fn on_player_leave(p: selector) {
    tell(p, "You left the magic zone.")
    effect_clear(p)
}

fn refresh_zone_effects(p: selector) {
    speed(p, 2, 1)    // 速度 II 持续 2 秒
    glow(p, 2)        // 发光效果持续 2 秒
}
```

注意 `p: selector` —— 你可以将 selector 作为函数参数传递。

## 第五步：基于标签的选择

标签允许你标记单个实体并在之后通过选择器筛选它们：

```rs
@on_trigger("mark_vip")
fn mark_vip() {
    tag_add(@s, "vip")
    tell(@s, "You are now VIP!")
}

@on_trigger("give_vip_buff")
fn give_vip_buff() {
    // 只针对带有 vip 标签的玩家
    foreach (vip in @a[tag=vip]) {
        regen(vip, 30, 1)
        tell(vip, "VIP buff granted!")
    }
}
```

## 第六步：实体类型过滤器

```rs
@on_trigger("sweep_entities")
fn sweep_entities() {
    // 只针对 20 格范围内的僵尸
    foreach (zombie in @e[type=minecraft:zombie, distance=..20]) {
        tag_add(zombie, "detected")
    }
    announce("Sweep complete!")
}
```

## 完整代码

完整示例：[tutorial_04_selectors.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_04_selectors.mcrs)

## 试试看

1. 安装并执行 `/reload`
2. 站在 (0, ?, 0) 附近 —— 进入区域，获得速度和发光效果
3. 走远 —— 效果消除
4. 执行 `/trigger mark_vip` 然后 `/trigger give_vip_buff`
5. 在僵尸旁边执行 `/trigger sweep_entities`

## selector 过滤器速查表

```rs
@a[distance=..10]           // 10 格以内
@a[distance=10..]           // 10 格以外
@e[type=minecraft:zombie]   // 仅僵尸
@a[tag=vip]                 // 带有 "vip" 标签的实体
@e[type=minecraft:zombie, distance=..5]  // 5 格以内的僵尸
```

## 下一步

→ [教程 05：decorator 与调度](./05-decorators)
