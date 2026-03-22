# World

> 本文档由 `src/stdlib/world.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [set_day](#set-day)
- [set_night](#set-night)
- [set_noon](#set-noon)
- [set_midnight](#set-midnight)
- [weather_clear](#weather-clear)
- [weather_rain](#weather-rain)
- [weather_thunder](#weather-thunder)
- [enable_keep_inventory](#enable-keep-inventory)
- [disable_keep_inventory](#disable-keep-inventory)
- [disable_mob_griefing](#disable-mob-griefing)
- [disable_fire_spread](#disable-fire-spread)
- [set_peaceful](#set-peaceful)
- [set_easy](#set-easy)
- [set_normal](#set-normal)
- [set_hard](#set-hard)
- [barrier_wall](#barrier-wall)
- [clear_area](#clear-area)
- [glass_box](#glass-box)
- [sun_altitude](#sun-altitude)
- [sun_azimuth](#sun-azimuth)

---

## `set_day`

将世界时间设置为白天（tick 1000）

```redscript
fn set_day()
```

---

## `set_night`

将世界时间设置为夜晚（tick 13000）

```redscript
fn set_night()
```

---

## `set_noon`

将世界时间设置为正午（tick 6000）

```redscript
fn set_noon()
```

---

## `set_midnight`

将世界时间设置为午夜（tick 18000）

```redscript
fn set_midnight()
```

---

## `weather_clear`

将天气设置为晴天

```redscript
fn weather_clear()
```

---

## `weather_rain`

将天气设置为下雨

```redscript
fn weather_rain()
```

---

## `weather_thunder`

将天气设置为雷暴

```redscript
fn weather_thunder()
```

---

## `enable_keep_inventory`

启用 `keepInventory` 游戏规则

```redscript
fn enable_keep_inventory()
```

---

## `disable_keep_inventory`

关闭 `keepInventory` 游戏规则

```redscript
fn disable_keep_inventory()
```

---

## `disable_mob_griefing`

将 `mobGriefing` 设为 false，禁止生物破坏方块

```redscript
fn disable_mob_griefing()
```

---

## `disable_fire_spread`

将 `doFireTick` 设为 false，禁止火焰蔓延

```redscript
fn disable_fire_spread()
```

---

## `set_peaceful`

将难度设置为和平

```redscript
fn set_peaceful()
```

---

## `set_easy`

将难度设置为简单

```redscript
fn set_easy()
```

---

## `set_normal`

将难度设置为普通

```redscript
fn set_normal()
```

---

## `set_hard`

将难度设置为困难

```redscript
fn set_hard()
```

---

## `barrier_wall`

用屏障方块填充一个长方体区域

```redscript
fn barrier_wall(x1: int, y1: int, z1: int, x2: int, y2: int, z2: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `x1` | 第一个角点 X 坐标 |
| `y1` | 第一个角点 Y 坐标 |
| `z1` | 第一个角点 Z 坐标 |
| `x2` | 对角点 X 坐标 |
| `y2` | 对角点 Y 坐标 |
| `z2` | 对角点 Z 坐标 |

---

## `clear_area`

用空气填充一个长方体区域，以清空该区域

```redscript
fn clear_area(x1: int, y1: int, z1: int, x2: int, y2: int, z2: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `x1` | 第一个角点 X 坐标 |
| `y1` | 第一个角点 Y 坐标 |
| `z1` | 第一个角点 Z 坐标 |
| `x2` | 对角点 X 坐标 |
| `y2` | 对角点 Y 坐标 |
| `z2` | 对角点 Z 坐标 |

---

## `glass_box`

构建一个中空玻璃盒，先填满外壳再挖空内部

```redscript
fn glass_box(x1: int, y1: int, z1: int, x2: int, y2: int, z2: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `x1` | 第一个角点 X 坐标 |
| `y1` | 第一个角点 Y 坐标 |
| `z1` | 第一个角点 Z 坐标 |
| `x2` | 对角点 X 坐标 |
| `y2` | 对角点 Y 坐标 |
| `z2` | 对角点 Z 坐标 |

---

## `sun_altitude`

根据世界时间计算太阳高度角，结果为角度 ×10000 定点数

```redscript
fn sun_altitude(ticks: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `ticks` | Minecraft 世界时间（游戏刻） |

**返回：** 太阳高度角，单位为角度 ×10000

**示例**

```redscript
let alt = sun_altitude(6000)  // 900000
```

---

## `sun_azimuth`

根据世界时间计算太阳方位角，结果为角度 ×10000 定点数

```redscript
fn sun_azimuth(ticks: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `ticks` | Minecraft 世界时间（游戏刻） |

**返回：** 方位角，范围为 `[0, 3600000)`

**示例**

```redscript
let az = sun_azimuth(6000)  // 900000
```

---
