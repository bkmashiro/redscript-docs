# Pathfind

> 本文档由 `src/stdlib/pathfind.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [pf_pack](#pf-pack)
- [pf_unpack_x](#pf-unpack-x)
- [pf_unpack_z](#pf-unpack-z)
- [pf_new_map](#pf-new-map)
- [pf_set_blocked](#pf-set-blocked)
- [pf_set_open](#pf-set-open)
- [pf_is_blocked](#pf-is-blocked)
- [pf_heuristic](#pf-heuristic)
- [pathfind_bfs](#pathfind-bfs)
- [pf_noop](#pf-noop)

---

## `pf_pack`

**版本：** 1.0.0

将 (x, z) 网格坐标编码为单个打包整数

```redscript
fn pf_pack(x: int, z: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 网格 X 坐标 [0, 15] |
| `z` | 网格 Z 坐标 [0, 15] |

**返回：** x * 16 + z（范围 [0, 255] 内的唯一索引）

**示例**

```redscript
let p: int = pf_pack(3, 7)  // result: 55
```

---

## `pf_unpack_x`

**版本：** 1.0.0

从打包网格索引中提取 X 坐标

```redscript
fn pf_unpack_x(packed: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `packed` | 来自 pf_pack 的打包坐标 |

**返回：** X 分量：packed / 16

**示例**

```redscript
let x: int = pf_unpack_x(55)  // result: 3
```

---

## `pf_unpack_z`

**版本：** 1.0.0

从打包网格索引中提取 Z 坐标

```redscript
fn pf_unpack_z(packed: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `packed` | 来自 pf_pack 的打包坐标 |

**返回：** Z 分量：packed % 16

**示例**

```redscript
let z: int = pf_unpack_z(55)  // result: 7
```

---

## `pf_new_map`

**版本：** 1.0.0

分配一个新的 16×16 网格障碍物地图，所有格子初始可通行

```redscript
fn pf_new_map(): int[]
```

**返回：** 包含 256 个零的 int[]；0=可通行，1=阻塞

**示例**

```redscript
let map: int[] = pf_new_map()
```

---

## `pf_set_blocked`

**版本：** 1.0.0

将网格格子标记为不可通行（阻塞）

```redscript
fn pf_set_blocked(map: int[], x: int, z: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `map` | 来自 pf_new_map 的障碍物地图 |
| `x` | 格子 X 坐标 [0, 15] |
| `z` | 格子 Z 坐标 [0, 15] |

**返回：** void — 设置 map[pf_pack(x,z)] = 1

**示例**

```redscript
pf_set_blocked(map, 5, 3)  // block cell (5, 3)
```

---

## `pf_set_open`

**版本：** 1.0.0

将网格格子标记为可通行（开放）

```redscript
fn pf_set_open(map: int[], x: int, z: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `map` | 来自 pf_new_map 的障碍物地图 |
| `x` | 格子 X 坐标 [0, 15] |
| `z` | 格子 Z 坐标 [0, 15] |

**返回：** void — 设置 map[pf_pack(x,z)] = 0

**示例**

```redscript
pf_set_open(map, 5, 3)  // re-open previously blocked cell (5, 3)
```

---

## `pf_is_blocked`

**版本：** 1.0.0

检查网格格子是否被阻塞或超出边界

```redscript
fn pf_is_blocked(map: int[], x: int, z: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `map` | 来自 pf_new_map 的障碍物地图 |
| `x` | 格子 X 坐标 |
| `z` | 格子 Z 坐标 |

**返回：** 超出边界或不可通行返回 1，可通行返回 0

**示例**

```redscript
let blocked: int = pf_is_blocked(map, 5, 3)
```

---

## `pf_heuristic`

**版本：** 1.0.0

计算两个网格格子之间的曼哈顿距离（×10000 精度）

```redscript
fn pf_heuristic(x1: int, z1: int, x2: int, z2: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x1` | 第一个格子 X |
| `z1` | 第一个格子 Z |
| `x2` | 第二个格子 X |
| `z2` | 第二个格子 Z |

**返回：** (|x1-x2| + |z1-z2|) × 10000，可用作 A* 启发函数

**示例**

```redscript
let h: int = pf_heuristic(0, 0, 3, 4)  // result: 70000 (7 Manhattan steps × 10000)
```

---

## `pathfind_bfs`

**版本：** 1.0.0

使用 BFS 在 16×16 网格上寻找两格子之间的最短路径

```redscript
fn pathfind_bfs(map: int[], sx: int, sz: int, gx: int, gz: int): int[]
```

**参数**

| 参数 | 说明 |
|------|------|
| `map` | 来自 pf_new_map 的障碍物地图（已设置阻塞） |
| `sx` | 起始格子 X [0, 15] |
| `sz` | 起始格子 Z [0, 15] |
| `gx` | 目标格子 X [0, 15] |
| `gz` | 目标格子 Z [0, 15] |

**返回：** 从起点到终点（含）的打包坐标 int[]，无路径时返回空数组

**示例**

```redscript
let map: int[] = pf_new_map()
pf_set_blocked(map, 3, 5)
let path: int[] = pathfind_bfs(map, 0, 0, 7, 7)
let x0: int = pf_unpack_x(path[0])
```

---

## `pf_noop`

**版本：** 1.0.0

Default no-op onDone callback for pathfind_bfs_coro. Replace with your own handler.

```redscript
fn pf_noop()
```

---
