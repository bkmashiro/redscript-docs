# Geometry

> 本文档由 `src/stdlib/geometry.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [midpoint](#midpoint)
- [aabb_contains](#aabb-contains)
- [sphere_contains](#sphere-contains)
- [cylinder_contains](#cylinder-contains)
- [parabola_y](#parabola-y)
- [parabola_x](#parabola-x)
- [parabola_land_t](#parabola-land-t)
- [tile_of](#tile-of)
- [tile_center](#tile-center)
- [angle_normalize](#angle-normalize)
- [angle_diff](#angle-diff)
- [mc_day_angle](#mc-day-angle)
- [in_cylinder](#in-cylinder)
- [in_cone](#in-cone)
- [in_sector_2d](#in-sector-2d)

---

## `midpoint` <Badge type="info" text="Since v1.0.0" />

计算两个坐标的整数中点

```redscript
fn midpoint(a: int, b: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 第一个坐标 |
| `b` | 第二个坐标 |

**返回：** (a + b) / 2（整数截断）

**示例**

```redscript
let m: int = midpoint(100, 300)  // result: 200
```

---

## `aabb_contains` <Badge type="info" text="Since v1.0.0" />

检测三维点是否在轴对齐包围盒（AABB）内

```redscript
fn aabb_contains(px: int, py: int, pz: int, minx: int, miny: int, minz: int, maxx: int, maxy: int, maxz: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `px` | 点 X 坐标 |
| `py` | 点 Y 坐标 |
| `pz` | 点 Z 坐标 |
| `minx` | 包围盒最小 X（含） |
| `miny` | 包围盒最小 Y（含） |
| `minz` | 包围盒最小 Z（含） |
| `maxx` | 包围盒最大 X（含） |
| `maxy` | 包围盒最大 Y（含） |
| `maxz` | 包围盒最大 Z（含） |

**返回：** 点在包围盒内或边界上返回 1，否则返回 0

**示例**

```redscript
let inside: int = aabb_contains(50, 64, 50, 0, 60, 0, 100, 70, 100)
```

---

## `sphere_contains` <Badge type="info" text="Since v1.0.0" />

检测三维点是否在球体内（用平方距离避免 sqrt）

```redscript
fn sphere_contains(px: int, py: int, pz: int, cx: int, cy: int, cz: int, r: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `px` | 点 X |
| `py` | 点 Y |
| `pz` | 点 Z |
| `cx` | 球心 X |
| `cy` | 球心 Y |
| `cz` | 球心 Z |
| `r` | 球半径（与坐标同单位） |

**返回：** 点在球内返回 1，否则返回 0

**示例**

```redscript
let hit: int = sphere_contains(10, 64, 10, 0, 64, 0, 15)
```

---

## `cylinder_contains` <Badge type="info" text="Since v1.0.0" />

检测二维点（XZ 平面）是否在竖直圆柱截面内（忽略 Y 轴）

```redscript
fn cylinder_contains(px: int, pz: int, cx: int, cz: int, r: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `px` | 点 X |
| `pz` | 点 Z |
| `cx` | 圆柱中心 X |
| `cz` | 圆柱中心 Z |
| `r` | 圆柱半径 |

**返回：** 点在圆柱截面内返回 1，否则返回 0

**示例**

```redscript
let in_zone: int = cylinder_contains(5, 5, 0, 0, 8)
```

---

## `parabola_y` <Badge type="info" text="Since v1.0.0" />

Compute Y position of a projectile along a parabolic arc at tick t.

```redscript
fn parabola_y(y0: int, vy0: int, t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `y0` | Initial Y ×100 |
| `vy0` | Initial Y velocity ×100 (blocks/tick × 100) |
| `t` | Tick index |

**返回：** y0 + vy0*t - 5*t²/2 (gravity = 5 units/tick² = 0.05 blocks/tick²×100)

**示例**

```redscript
let y: int = parabola_y(6400, 100, 10)  // at tick 10, v0=1 block/tick
```

---

## `parabola_x` <Badge type="info" text="Since v1.0.0" />

Compute horizontal X position along a parabolic path (constant velocity).

```redscript
fn parabola_x(x0: int, vx0: int, t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x0` | Initial X ×100 |
| `vx0` | Horizontal X velocity ×100 |
| `t` | Tick index |

**返回：** x0 + vx0*t

**示例**

```redscript
let x: int = parabola_x(0, 50, 10)  // 0 + 50*10 = 500
```

---

## `parabola_land_t` <Badge type="info" text="Since v1.0.0" />

Estimate the tick when a projectile launched upward returns to Y=0.

```redscript
fn parabola_land_t(vy0: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `vy0` | Initial upward Y velocity ×100 |

**返回：** Approximate landing tick: 2 * vy0 / 5

**示例**

```redscript
let land: int = parabola_land_t(100)  // tick when projectile lands
```

---

## `tile_of` <Badge type="info" text="Since v1.0.0" />

Compute which tile a coordinate falls in (floor division, handles negatives).

```redscript
fn tile_of(coord: int, tile_size: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `coord` | Coordinate value (any unit) |
| `tile_size` | Size of each tile in the same unit |

**返回：** Floor-divided tile index (correct for negative coordinates)

**示例**

```redscript
let tile: int = tile_of(250, 100)  // result: 2 (tile index 2)
```

---

## `tile_center` <Badge type="info" text="Since v1.0.0" />

Compute the center coordinate of a tile.

```redscript
fn tile_center(tile: int, tile_size: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `tile` | Tile index |
| `tile_size` | Size of each tile |

**返回：** tile * tile_size + tile_size / 2

**示例**

```redscript
let c: int = tile_center(2, 100)  // result: 250 (center of tile 2)
```

---

## `angle_normalize` <Badge type="info" text="Since v1.0.0" />

将角度（度×10000）归一化到 [0, 3600000) 范围

```redscript
fn angle_normalize(deg: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `deg` | 输入角度 ×10000（可为负数或超过 360°） |

**返回：** 等效角度在 [0, 3600000) 范围内

**示例**

```redscript
let a: int = angle_normalize(-900000)  // result: 2700000 (270°)
```

---

## `angle_diff` <Badge type="info" text="Since v1.0.0" />

计算两角度之间的有符号最短角度差（度×10000）

```redscript
fn angle_diff(a: int, b: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 起始角 ×10000 |
| `b` | 目标角 ×10000 |

**返回：** 有符号差值在 (-1800000, 1800000]

**示例**

```redscript
let diff: int = angle_diff(3500000, 100000)  // ≈ -3400000 → wraps to short arc
```

---

## `mc_day_angle` <Badge type="info" text="Since v1.0.0" />

Convert Minecraft daytime ticks to sun angle in degrees ×10000.

```redscript
fn mc_day_angle(daytime: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `daytime` | /time query daytime value (0-23999; 0=dawn, 6000=noon) |

**返回：** Sun angle in [0, 3600000) degrees ×10000

**示例**

```redscript
let sun: int = mc_day_angle(6000)  // noon → 1800000 (180°)
```

---

## `in_cylinder` <Badge type="info" text="Since v1.0.0" />

Test whether a point is inside a vertical cylinder (XZ circle with Y bounds).

```redscript
fn in_cylinder(px: int, py: int, pz: int, cx: int, cz: int, radius: int, y_lo: int, y_hi: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `px` | Point X ×10000 |
| `py` | Point Y ×10000 |
| `pz` | Point Z ×10000 |
| `cx` | Cylinder center X ×10000 |
| `cz` | Cylinder center Z ×10000 |
| `radius` | Cylinder radius ×10000 (keep ≤ 46340 to avoid overflow) |
| `y_lo` | Y lower bound ×10000 (inclusive) |
| `y_hi` | Y upper bound ×10000 (inclusive) |

**返回：** 1 if point is inside the cylinder, 0 otherwise

**示例**

```redscript
let hit: int = in_cylinder(100000, 640000, 100000, 0, 0, 80000, 600000, 800000)
```

---

## `in_cone` <Badge type="info" text="Since v1.0.0" />

Test whether a point is inside an upright cone (axis along +Y or -Y from apex).

```redscript
fn in_cone(px: int, py: int, pz: int, apex_x: int, apex_y: int, apex_z: int, dir_y: int, half_angle_tan: int, height: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `px` | Point X ×10000 |
| `py` | Point Y ×10000 |
| `pz` | Point Z ×10000 |
| `apex_x` | Cone apex X ×10000 |
| `apex_y` | Cone apex Y ×10000 |
| `apex_z` | Cone apex Z ×10000 |
| `dir_y` | Cone direction: positive = upward, negative = downward |
| `half_angle_tan` | tan(half-angle) ×10000 (45° = 10000, 30° = 5773) |
| `height` | Cone height ×10000 |

**返回：** 1 if point is inside the cone, 0 otherwise

**示例**

```redscript
let hit: int = in_cone(px, py, pz, apex_x, apex_y, apex_z, 1, 10000, 50000)
```

---

## `in_sector_2d` <Badge type="info" text="Since v1.0.0" />

Test whether a 2D point is inside a sector (pie-slice) in the XZ plane.

```redscript
fn in_sector_2d(px: int, pz: int, cx: int, cz: int, dir_angle: int, half_angle: int, radius: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `px` | Point X ×10000 |
| `pz` | Point Z ×10000 |
| `cx` | Sector center X ×10000 |
| `cz` | Sector center Z ×10000 |
| `dir_angle` | Sector center direction in ×10000 radians (0 = +X, 628318 = 2π) |
| `half_angle` | Half-width of sector in ×10000 radians |
| `radius` | Maximum radius (same units as px, pz) |

**返回：** 1 if point is within the sector, 0 otherwise

**示例**

```redscript
let hit: int = in_sector_2d(px, pz, 0, 0, 0, 157079, 100000)  // quarter-circle facing +X
```

---
