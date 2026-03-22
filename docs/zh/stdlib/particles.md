# Particles

> 本文档由 `src/stdlib/particles.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [hearts_at](#hearts-at)
- [flames](#flames)
- [smoke](#smoke)
- [explosion_effect](#explosion-effect)
- [sparkles_at](#sparkles-at)
- [angry_at](#angry-at)
- [happy_at](#happy-at)
- [portal_effect](#portal-effect)
- [totem_at](#totem-at)
- [end_sparkles_at](#end-sparkles-at)
- [particle_at_fx](#particle-at-fx)
- [draw_line_2d](#draw-line-2d)
- [draw_circle](#draw-circle)
- [draw_helix](#draw-helix)
- [particle_dot](#particle-dot)

---

## `hearts_at`

在指定坐标生成爱心粒子

```redscript
fn hearts_at(x: int, y: int, z: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | X 坐标 |
| `y` | Y 坐标 |
| `z` | Z 坐标 |

---

## `flames`

在指定坐标生成火焰粒子

```redscript
fn flames(x: int, y: int, z: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | X 坐标 |
| `y` | Y 坐标 |
| `z` | Z 坐标 |

---

## `smoke`

在指定坐标生成大烟雾粒子

```redscript
fn smoke(x: int, y: int, z: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | X 坐标 |
| `y` | Y 坐标 |
| `z` | Z 坐标 |

---

## `explosion_effect`

在指定坐标生成爆炸粒子

```redscript
fn explosion_effect(x: int, y: int, z: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | X 坐标 |
| `y` | Y 坐标 |
| `z` | Z 坐标 |

---

## `sparkles_at`

在指定坐标生成附魔闪烁粒子

```redscript
fn sparkles_at(x: int, y: int, z: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | X 坐标 |
| `y` | Y 坐标 |
| `z` | Z 坐标 |

---

## `angry_at`

在指定坐标生成愤怒村民粒子

```redscript
fn angry_at(x: int, y: int, z: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | X 坐标 |
| `y` | Y 坐标 |
| `z` | Z 坐标 |

---

## `happy_at`

在指定坐标生成开心村民粒子

```redscript
fn happy_at(x: int, y: int, z: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | X 坐标 |
| `y` | Y 坐标 |
| `z` | Z 坐标 |

---

## `portal_effect`

在指定坐标生成传送门粒子

```redscript
fn portal_effect(x: int, y: int, z: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | X 坐标 |
| `y` | Y 坐标 |
| `z` | Z 坐标 |

---

## `totem_at`

在指定坐标生成不死图腾粒子

```redscript
fn totem_at(x: int, y: int, z: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | X 坐标 |
| `y` | Y 坐标 |
| `z` | Z 坐标 |

---

## `end_sparkles_at`

在指定坐标生成末地烛粒子

```redscript
fn end_sparkles_at(x: int, y: int, z: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | X 坐标 |
| `y` | Y 坐标 |
| `z` | Z 坐标 |

---

## `particle_at_fx`

在以方块 ×100 表示的定点坐标上生成粒子

```redscript
fn particle_at_fx(x_fx: int, y_fx: int, z_fx: int, particle: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `x_fx` | X 坐标（方块 ×100） |
| `y_fx` | Y 坐标（方块 ×100） |
| `z_fx` | Z 坐标（方块 ×100） |
| `particle` | 粒子 ID，如 `minecraft:flame` |

---

## `draw_line_2d`

使用线性插值绘制二维粒子直线

```redscript
fn draw_line_2d(x0: int, y0: int, x1: int, y1: int, steps: int, z: int, particle: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `x0` | 起点 X（方块 ×100） |
| `y0` | 起点 Y（方块 ×100） |
| `x1` | 终点 X（方块 ×100） |
| `y1` | 终点 Y（方块 ×100） |
| `steps` | 插值步数 |
| `z` | 所在 Z 平面（方块 ×100） |
| `particle` | 粒子 ID |

---

## `draw_circle`

在 XZ 平面绘制粒子圆环

```redscript
fn draw_circle(cx: int, cy: int, cz: int, r: int, steps: int, particle: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `cx` | 圆心 X（方块） |
| `cy` | 圆心 Y（方块） |
| `cz` | 圆心 Z（方块） |
| `r` | 半径（方块 ×100） |
| `steps` | 采样点数量 |
| `particle` | 粒子 ID |

---

## `draw_helix`

绘制可配置半径、高度和圈数的粒子螺旋

```redscript
fn draw_helix(cx: int, cy_start: int, cz: int, r: int, height: int, rotations: int, steps: int, particle: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `cx` | 中心 X（方块） |
| `cy_start` | 起始 Y（方块） |
| `cz` | 中心 Z（方块） |
| `r` | 半径（方块 ×100） |
| `height` | 总高度（方块） |
| `rotations` | 完整旋转圈数 |
| `steps` | 采样点数量 |
| `particle` | 粒子 ID |

---

## `particle_dot`

在整数方块坐标生成单个粒子

```redscript
fn particle_dot(x: int, y: int, z: int, particle: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | X 坐标（整数方块） |
| `y` | Y 坐标（整数方块） |
| `z` | Z 坐标（整数方块） |
| `particle` | 粒子 ID |

---
