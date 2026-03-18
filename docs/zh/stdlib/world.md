# `world` — 世界查询与操作

Import: `import world;`

世界操作辅助函数：时间控制、天气、游戏规则、难度、区域填充辅助以及太阳角度计算。太阳角度函数使用 `×10000` 缩放，并依赖 `math` 中的 `sin_fixed`。

## Functions

### `set_day()`

将世界时间设为白天（tick 1000）。

---

### `set_night()`

将世界时间设为夜晚（tick 13000）。

---

### `set_noon()`

将世界时间设为正午（tick 6000）。

---

### `set_midnight()`

将世界时间设为午夜（tick 18000）。

---

### `weather_clear()`

将天气设为晴天。

---

### `weather_rain()`

将天气设为下雨。

---

### `weather_thunder()`

将天气设为雷雨。

---

### `enable_keep_inventory()`

将 `keepInventory` 游戏规则设为 true。

---

### `disable_keep_inventory()`

将 `keepInventory` 游戏规则设为 false。

---

### `disable_mob_griefing()`

将 `mobGriefing` 游戏规则设为 false。

---

### `disable_fire_spread()`

将 `doFireTick` 游戏规则设为 false。

---

### `set_peaceful()`

将难度设为和平。

---

### `set_easy()`

将难度设为简单。

---

### `set_normal()`

将难度设为普通。

---

### `set_hard()`

将难度设为困难。

---

### `barrier_wall(x1: int, y1: int, z1: int, x2: int, y2: int, z2: int)`

用 `minecraft:barrier`（屏障）方块填充区域。

**Example:**
```rs
import world;
barrier_wall(-50, 0, -50, 50, 256, -50);
```

---

### `clear_area(x1: int, y1: int, z1: int, x2: int, y2: int, z2: int)`

用 `minecraft:air`（空气）填充区域。

---

### `glass_box(x1: int, y1: int, z1: int, x2: int, y2: int, z2: int)`

创建空心玻璃盒：用玻璃填充外壳，用空气清空内部。

**Example:**
```rs
import world;
glass_box(0, 64, 0, 10, 74, 10);
```

---

### `sun_altitude(ticks: int): int`

> **Requires:** `math:tables` NBT storage must be pre-loaded (uses `sin_fixed`)

太阳地平线以上的仰角 ×10000。正午（tick 6000）→ 900000（+90°）；午夜（tick 18000）→ -900000（-90°）。使用 `sin_fixed`。

**Example:**
```rs
import world;
let alt: int = sun_altitude(6000);  // 900000（正头顶）
```

---

### `sun_azimuth(ticks: int): int`

太阳的罗盘方位角 ×10000。Tick 0 = 0°（东方），在 24000 tick 内线性增加到 3600000。

**Example:**
```rs
import world;
let az: int = sun_azimuth(12000);  // 1800000（180°，西方）
```
