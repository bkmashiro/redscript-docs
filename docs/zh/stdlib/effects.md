# Effects

> 本文档由 `src/stdlib/effects.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [speed](#speed)
- [jump](#jump)
- [regen](#regen)
- [resistance](#resistance)
- [strength](#strength)
- [invisible](#invisible)
- [night_vision](#night-vision)
- [slow_fall](#slow-fall)
- [glow](#glow)
- [clear_effects](#clear-effects)
- [clear_effect](#clear-effect)
- [buff_all](#buff-all)

---

## `speed` <Badge type="info" text="v1.0.0" />

给目标实体施加速度提升效果

```redscript
fn speed(target: selector, duration: int, level: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 实体选择器（如 @p, @a, @e[...]） |
| `duration` | 效果持续时间（刻，20 刻 = 1 秒） |
| `level` | 效果等级（0 = 速度 I，1 = 速度 II，...） |

**返回：** void — 应用 minecraft:speed 效果

**示例**

```redscript
speed(@p, 200, 1)  // Speed II for 10 seconds
```

---

## `jump` <Badge type="info" text="v1.0.0" />

给目标实体施加跳跃提升效果

```redscript
fn jump(target: selector, duration: int, level: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 实体选择器 |
| `duration` | 效果持续时间（刻） |
| `level` | 效果等级（0 = 跳跃 I，...） |

**返回：** void — 应用 minecraft:jump_boost 效果

**示例**

```redscript
jump(@p, 100, 0)  // Jump Boost I for 5 seconds
```

---

## `regen` <Badge type="info" text="v1.0.0" />

给目标实体施加生命恢复效果

```redscript
fn regen(target: selector, duration: int, level: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 实体选择器 |
| `duration` | 效果持续时间（刻） |
| `level` | 效果等级 |

**返回：** void — 应用 minecraft:regeneration 效果

**示例**

```redscript
regen(@p, 60, 0)  // Regeneration I for 3 seconds
```

---

## `resistance` <Badge type="info" text="v1.0.0" />

给目标实体施加伤害抵抗效果

```redscript
fn resistance(target: selector, duration: int, level: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 实体选择器 |
| `duration` | 效果持续时间（刻） |
| `level` | 效果等级 |

**返回：** void — 应用 minecraft:resistance 效果

**示例**

```redscript
resistance(@p, 400, 0)  // Resistance I for 20 seconds
```

---

## `strength` <Badge type="info" text="v1.0.0" />

给目标实体施加力量提升效果

```redscript
fn strength(target: selector, duration: int, level: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 实体选择器 |
| `duration` | 效果持续时间（刻） |
| `level` | 效果等级（0 = 力量 I，1 = 力量 II，...） |

**返回：** void — 应用 minecraft:strength 效果

**示例**

```redscript
strength(@p, 200, 1)  // Strength II for 10 seconds
```

---

## `invisible` <Badge type="info" text="v1.0.0" />

使目标实体隐身

```redscript
fn invisible(target: selector, duration: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 实体选择器 |
| `duration` | 效果持续时间（刻） |

**返回：** void — 应用 minecraft:invisibility（等级 0）

**示例**

```redscript
invisible(@p, 300)  // invisibility for 15 seconds
```

---

## `night_vision` <Badge type="info" text="v1.0.0" />

给目标实体施加夜视效果

```redscript
fn night_vision(target: selector, duration: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 实体选择器 |
| `duration` | 效果持续时间（刻） |

**返回：** void — 应用 minecraft:night_vision

**示例**

```redscript
night_vision(@p, 6000)  // night vision for 5 minutes
```

---

## `slow_fall` <Badge type="info" text="v1.0.0" />

给目标实体施加缓降效果

```redscript
fn slow_fall(target: selector, duration: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 实体选择器 |
| `duration` | 效果持续时间（刻） |

**返回：** void — 应用 minecraft:slow_falling

**示例**

```redscript
slow_fall(@p, 200)  // slow falling for 10 seconds
```

---

## `glow` <Badge type="info" text="v1.0.0" />

使目标实体发光轮廓

```redscript
fn glow(target: selector, duration: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 实体选择器 |
| `duration` | 效果持续时间（刻） |

**返回：** void — 应用 minecraft:glowing

**示例**

```redscript
glow(@e[type=zombie], 100)  // make all zombies glow for 5 seconds
```

---

## `clear_effects` <Badge type="info" text="v1.0.0" />

清除目标实体的所有药水效果

```redscript
fn clear_effects(target: selector)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 实体选择器 |

**返回：** void

**示例**

```redscript
clear_effects(@p)  // remove all effects from nearest player
```

---

## `clear_effect` <Badge type="info" text="v1.0.0" />

清除目标实体的特定效果

```redscript
fn clear_effect(target: selector, eff: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 实体选择器 |
| `eff` | 效果资源位置字符串（如 "minecraft:speed"） |

**返回：** void

**示例**

```redscript
clear_effect(@p, "minecraft:poison")  // cure poison
```

---

## `buff_all` <Badge type="info" text="v1.0.0" />

给目标施加完整增益套餐（速度 I、力量 I、生命恢复 I、抵抗 I）

```redscript
fn buff_all(target: selector, duration: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 实体选择器 |
| `duration` | 所有效果的持续时间（刻） |

**返回：** void

**示例**

```redscript
buff_all(@p, 600)  // full buff for 30 seconds
```

---
