# `geometry` — 三维几何与选择区域

Import: `import geometry;`

Minecraft 数据包的三维几何辅助函数：包围盒与球体包含检测、竖直圆柱与圆锥检测、二维扇形（扇区）选择、抛物线辅助、网格/格子数学、角度工具以及太阳角度转换。定点数约定：坐标 ×100（1 方块 = 100 单位）；角度为角度 ×10000。依赖 `math` 中的 `sqrt_fx`、`sin_fixed`、`cos_fixed`、`abs`。

## Functions

### `midpoint(a: int, b: int): int`

两坐标的整数中点：`(a + b) / 2`。

---

### `aabb_contains(px: int, py: int, pz: int, minx: int, miny: int, minz: int, maxx: int, maxy: int, maxz: int): int`

若点 `(px, py, pz)` 在轴对齐包围盒内则返回 1，否则返回 0。

**Example:**
```rs
import geometry;
let inside: int = aabb_contains(50, 64, 50, 0, 60, 0, 100, 80, 100);  // 1
```

---

### `sphere_contains(px: int, py: int, pz: int, cx: int, cy: int, cz: int, r: int): int`

若点在球体内则返回 1。通过比较平方距离避免开方。

**Example:**
```rs
import geometry;
let inside: int = sphere_contains(5, 0, 0, 0, 0, 0, 10);  // 1 (dist=5 < r=10)
```

---

### `cylinder_contains(px: int, pz: int, cx: int, cz: int, r: int): int`

若 `(px, pz)` 在竖直圆柱内则返回 1（忽略 Y 轴）。2D 圆形检测。

**Example:**
```rs
import geometry;
let inside: int = cylinder_contains(3, 4, 0, 0, 10);  // 1
```

---

### `parabola_y(y0: int, vy0: int, t: int): int`

抛物线弧在第 `t` tick 时的 Y 位置。`y0`：初始 Y ×100，`vy0`：初始 Y 速度 ×100。重力：5 单位/tick²（= 0.05 方块/tick²）。

---

### `parabola_x(x0: int, vx0: int, t: int): int`

第 `t` tick 时的水平 X 位置（无阻力，匀速）。

---

### `parabola_land_t(vy0: int): int`

抛射体回到 Y=0 的近似 tick：`t ≈ 2 × vy0 / 5`。

---

### `tile_of(coord: int, tile_size: int): int`

坐标所属的格子（向下取整，正确处理负坐标）。

---

### `tile_center(tile: int, tile_size: int): int`

格子的中心坐标。

---

### `angle_normalize(deg: int): int`

将角度归一化到 `[0, 3600000)`（角度 ×10000）。

---

### `angle_diff(a: int, b: int): int`

两个角度之间带符号的最短角差（角度 ×10000）。结果 ∈ `(-1800000, 1800000]`。

---

### `mc_day_angle(daytime: int): int`

将 MC `/time query daytime`（0–24000）转换为太阳角度 ×10000。Tick 0 = 黎明（90°），tick 6000 = 正午（180°）。

---

### `in_cylinder(px: int, py: int, pz: int, cx: int, cz: int, radius: int, y_lo: int, y_hi: int): int`

若 `(px, py, pz)` 在以 `(cx, *, cz)` 为中心、给定高度范围的竖直圆柱内则返回 1。所有坐标 ×10000（1 方块 = 10000 单位）。

> **Note:** Radius up to ~46340 (≈4.6 blocks at ×10000 scale) to avoid overflow. For larger radii, divide all coords by 10 first.

**Example:**
```rs
import geometry;
let inside: int = in_cylinder(50000, 64000, 50000, 50000, 50000, 30000, 60000, 70000);
```

---

### `in_cone(px: int, py: int, pz: int, apex_x: int, apex_y: int, apex_z: int, dir_y: int, half_angle_tan: int, height: int): int`

若点在直立圆锥内（轴沿 ±Y 方向）则返回 1。`half_angle_tan = tan(半角) × 10000`（如 45° → 10000，30° → 5773）。`dir_y > 0` 为向上圆锥，`dir_y < 0` 为向下圆锥。

---

### `in_sector_2d(px: int, pz: int, cx: int, cz: int, dir_angle: int, half_angle: int, radius: int): int`

若 `(px, pz)` 在 XZ 平面的二维扇形（扇区）内则返回 1。`dir_angle` 和 `half_angle` 为 ×10000 弧度（整圈 = 628318）。需要 `vec` 中的 `atan2_fixed`。

> **Requires:** `math:tables` NBT storage must be pre-loaded (via `@require_on_load(_atan_init)`)

**Example:**
```rs
import geometry;
// 点是否在面向东方（+X）的 90° 扇形内？
let inside: int = in_sector_2d(10, 0, 0, 0, 0, 157080, 20);
```
