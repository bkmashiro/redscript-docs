# 教程 06：标准库速览

**难度：** 初级到中级  
**预计时间：** ~30 分钟  
**前置要求：** [教程 05](./05-structs-and-enums)

## 目标

先建立一张标准库地图，知道什么时候该去找现成模块，而不是一上来自己造轮子。

## import 基础

标准库模块在文件顶部导入：

```rs
import "stdlib/math.mcrs"
import "stdlib/random.mcrs"
import "stdlib/particles.mcrs"
```

如果没导入就直接调用 stdlib 函数，编译器会报错。

## `math`

`stdlib/math` 适合固定点辅助和常见数值工具。

典型场景：

- 限制数值范围
- 用 `mulfix` 做 fixed-point 乘法
- 写基础玩法数值逻辑

```rs
import "stdlib/math.mcrs"

fn scale_damage(base: fixed, multiplier: fixed) -> fixed {
    return mulfix(base, multiplier)
}
```

## `math_hp`

`stdlib/math_hp` 适合真的需要 `double` 精度的时候。

典型场景：

- 高精度三角函数
- 对数或更科学计算风格的需求
- 依赖 `double` API 的模块

```rs
import "stdlib/math_hp.mcrs"
```

只有在 `int` 或普通 fixed-point 不够时再上它。

## `random`

`stdlib/random` 用于程序化变化。

典型场景：

- 随机掉落
- 随机刷怪
- 事件中的轻度随机性

```rs
import "stdlib/random.mcrs"
```

## `particles`

`stdlib/particles` 用于可见反馈。

典型场景：

- 圆环、尾迹等效果
- 技能预警
- 奖励反馈

```rs
import "stdlib/particles.mcrs"
```

## `timer`

`stdlib/timer` 适合倒计时与秒表类逻辑。

典型场景：

- 回合时间
- 技能冷却
- 限时目标

```rs
import "stdlib/timer.mcrs"
```

## `state`

`stdlib/state` 适合你想复用状态机或持久状态模式，而不是每次都手写一套 scoreboard 管理。

典型场景：

- 状态机
- 命名状态切换
- 组织数据包持久状态

## `teams`、`bossbar`、`effects`、`inventory`

这些模块更偏 Minecraft 实战：

- `teams` 做队伍管理
- `bossbar` 做 UI 条
- `effects` 做效果处理
- `inventory` 做物品相关工具

## 一个小组合示例

```rs
namespace tutorial06

import "stdlib/math.mcrs"
import "stdlib/random.mcrs"
import "stdlib/particles.mcrs"

let bonus_multiplier: fixed = 1.5

@on_trigger("loot")
fn loot() {
    let roll: int = rand_range(1, 100)

    if (roll <= 10) {
        give(@s, "minecraft:diamond", 1)
    } else {
        give(@s, "minecraft:iron_ingot", 4)
    }

    tell(@s, f"Adjusted score preview: {mulfix(10.0, bonus_multiplier)}")
}
```

这一篇最重要的不是背 API，而是建立直觉：

- 数值问题先想 math 类模块
- 常见玩法工具很多已经在 stdlib 里
- import 能明确依赖边界

## 高效探索方式

1. 先看 [标准库总览](/zh/stdlib/)。
2. 再打开你猜测相关的模块页面。
3. 先复制一个最小例子。
4. 确认 stdlib 没有现成方案后，再自己写 helper。

## 练习

1. 打开 `/zh/stdlib/` 随便选一个没用过的模块。
2. 在代码里加 import 并调用一个函数。
3. 实验结束后删掉未使用的 import。

下一篇：[教程 07：事件与 Tick](./07-events-and-ticks)
