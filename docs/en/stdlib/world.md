# World

> Auto-generated from `src/stdlib/world.mcrs` — do not edit manually.

## API

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

Sets the world time to daytime.
Uses tick 1000, the standard morning daylight value in Minecraft.

```redscript
fn set_day()
```

---

## `set_night`

Sets the world time to night.
Uses tick 13000, the standard nighttime value in Minecraft.

```redscript
fn set_night()
```

---

## `set_noon`

Sets the world time to noon.
Uses tick 6000, when the sun is at its highest point.

```redscript
fn set_noon()
```

---

## `set_midnight`

Sets the world time to midnight.
Uses tick 18000, when the moon is at its highest point.

```redscript
fn set_midnight()
```

---

## `weather_clear`

Sets the weather to clear.

```redscript
fn weather_clear()
```

---

## `weather_rain`

Sets the weather to rain.

```redscript
fn weather_rain()
```

---

## `weather_thunder`

Sets the weather to thunder.

```redscript
fn weather_thunder()
```

---

## `enable_keep_inventory`

Enables the `keepInventory` gamerule.

```redscript
fn enable_keep_inventory()
```

---

## `disable_keep_inventory`

Disables the `keepInventory` gamerule.

```redscript
fn disable_keep_inventory()
```

---

## `disable_mob_griefing`

Disables mob griefing by setting `mobGriefing` to false.

```redscript
fn disable_mob_griefing()
```

---

## `disable_fire_spread`

Disables fire spread by setting `doFireTick` to false.

```redscript
fn disable_fire_spread()
```

---

## `set_peaceful`

Sets the difficulty to peaceful.

```redscript
fn set_peaceful()
```

---

## `set_easy`

Sets the difficulty to easy.

```redscript
fn set_easy()
```

---

## `set_normal`

Sets the difficulty to normal.

```redscript
fn set_normal()
```

---

## `set_hard`

Sets the difficulty to hard.

```redscript
fn set_hard()
```

---

## `barrier_wall`

Fills a cuboid with barriers.

```redscript
fn barrier_wall(x1: int, y1: int, z1: int, x2: int, y2: int, z2: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x1` | First corner X |
| `y1` | First corner Y |
| `z1` | First corner Z |
| `x2` | Opposite corner X |
| `y2` | Opposite corner Y |
| `z2` | Opposite corner Z |

---

## `clear_area`

Replaces a cuboid with air to clear the area.

```redscript
fn clear_area(x1: int, y1: int, z1: int, x2: int, y2: int, z2: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x1` | First corner X |
| `y1` | First corner Y |
| `z1` | First corner Z |
| `x2` | Opposite corner X |
| `y2` | Opposite corner Y |
| `z2` | Opposite corner Z |

---

## `glass_box`

Builds a hollow glass box.
The outer cuboid is filled with glass and the interior is then carved out.

```redscript
fn glass_box(x1: int, y1: int, z1: int, x2: int, y2: int, z2: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x1` | First corner X |
| `y1` | First corner Y |
| `z1` | First corner Z |
| `x2` | Opposite corner X |
| `y2` | Opposite corner Y |
| `z2` | Opposite corner Z |

---

## `sun_altitude`

Computes the sun elevation angle from world time.
Result is fixed-point degrees ×10000 where noon is `900000` (+90°)
and midnight is `-900000` (-90°).
Uses `sin_fixed`, so callers must also include `math.mcrs`.

```redscript
fn sun_altitude(ticks: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ticks` | World time in Minecraft ticks |

**Returns:** Sun altitude in degrees ×10000

**Example**

```redscript
let alt = sun_altitude(6000)  // 900000
```

---

## `sun_azimuth`

Computes the sun compass azimuth from world time.
Tick 0 maps to east (`0`) and advances linearly through the day.

```redscript
fn sun_azimuth(ticks: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ticks` | World time in Minecraft ticks |

**Returns:** Compass angle in degrees ×10000, wrapped to `[0, 3600000)`

**Example**

```redscript
let az = sun_azimuth(6000)  // 900000
```

---
