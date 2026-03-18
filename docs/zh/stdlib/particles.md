# `particles` — 粒子效果辅助函数

Import: `import particles;`

常见粒子效果在指定位置的命名包装函数，以及用于绘制二维/三维粒子图形（线、圆、螺旋）的辅助函数。除另有说明外，坐标使用方块整数。

## Functions

### `hearts_at(x: int, y: int, z: int)`

在方块坐标处生成 `heart`（爱心）粒子。

**Example:**
```rs
import particles;
hearts_at(0, 65, 0);
```

---

### `flames(x: int, y: int, z: int)`

在坐标处生成 `flame`（火焰）粒子。

---

### `smoke(x: int, y: int, z: int)`

在坐标处生成 `large_smoke`（大烟雾）粒子。

---

### `explosion_effect(x: int, y: int, z: int)`

在坐标处生成 `explosion`（爆炸）粒子。

---

### `sparkles_at(x: int, y: int, z: int)`

在坐标处生成 `enchant`（附魔闪光）粒子。

---

### `angry_at(x: int, y: int, z: int)`

在坐标处生成 `angry_villager`（愤怒村民）粒子。

---

### `happy_at(x: int, y: int, z: int)`

在坐标处生成 `happy_villager`（快乐村民）粒子。

---

### `portal_effect(x: int, y: int, z: int)`

在坐标处生成 `portal`（传送门）粒子。

---

### `totem_at(x: int, y: int, z: int)`

在坐标处生成 `totem_of_undying`（不死图腾）粒子。

---

### `end_sparkles_at(x: int, y: int, z: int)`

在坐标处生成 `end_rod`（末地烛）闪光粒子。

---

### `particle_at_fx(x_fx: int, y_fx: int, z_fx: int, particle: string)`

在定点坐标（×100；1 方块 = 100 单位）处生成粒子。发射前转换为十进制方块坐标。

**Example:**
```rs
import particles;
particle_at_fx(150, 6400, 250, "minecraft:flame");  // 1.5, 64.0, 2.5
```

---

### `draw_line_2d(x0: int, y0: int, x1: int, y1: int, steps: int, z: int, particle: string)`

从 `(x0, y0)` 到 `(x1, y1)` 用 `steps` 个粒子采样点画一条直线。所有坐标 ×100。

**Example:**
```rs
import particles;
draw_line_2d(0, 6400, 1000, 6400, 20, 0, "minecraft:flame");  // 水平线
```

---

### `draw_circle(cx: int, cy: int, cz: int, r: int, steps: int, particle: string)`

在 XZ 平面以 `(cx, cy, cz)` 为圆心画圆。`cx`、`cy`、`cz` 为方块坐标；`r` 为 ×100 单位；`steps` 个粒子。

> **Requires:** `math:tables` NBT storage must be pre-loaded (uses `sin_fixed`/`cos_fixed`)

**Example:**
```rs
import particles;
draw_circle(0, 65, 0, 500, 36, "minecraft:enchant");  // 半径 5 方块的圆
```

---

### `draw_helix(cx: int, cy_start: int, cz: int, r: int, height: int, rotations: int, steps: int, particle: string)`

画螺旋线。`r` 为 ×100 单位；`height` 为方块数。

> **Requires:** `math:tables` NBT storage must be pre-loaded

---

### `particle_dot(x: int, y: int, z: int, particle: string)`

使用 `raw()` 在整数方块坐标处生成单个粒子。
