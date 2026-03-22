# Pathfind

> Auto-generated from `src/stdlib/pathfind.mcrs` — do not edit manually.

## API

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

## `pf_pack` <Badge type="info" text="v1.0.0" />

Encode a (x, z) grid coordinate pair as a single packed integer.

```redscript
fn pf_pack(x: int, z: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Grid X coordinate [0, 15] |
| `z` | Grid Z coordinate [0, 15] |

**Returns:** x * 16 + z (unique index in [0, 255])

**Example**

```redscript
let p: int = pf_pack(3, 7)  // result: 55
```

---

## `pf_unpack_x` <Badge type="info" text="v1.0.0" />

Extract the X coordinate from a packed grid index.

```redscript
fn pf_unpack_x(packed: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `packed` | Packed coordinate from pf_pack |

**Returns:** X component: packed / 16

**Example**

```redscript
let x: int = pf_unpack_x(55)  // result: 3
```

---

## `pf_unpack_z` <Badge type="info" text="v1.0.0" />

Extract the Z coordinate from a packed grid index.

```redscript
fn pf_unpack_z(packed: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `packed` | Packed coordinate from pf_pack |

**Returns:** Z component: packed % 16

**Example**

```redscript
let z: int = pf_unpack_z(55)  // result: 7
```

---

## `pf_new_map` <Badge type="info" text="v1.0.0" />

Allocate a new 16×16 grid obstacle map with all cells passable.

```redscript
fn pf_new_map(): int[]
```

**Returns:** int[] of 256 zeros; index = pf_pack(x, z), 0=passable, 1=blocked

**Example**

```redscript
let map: int[] = pf_new_map()
```

---

## `pf_set_blocked` <Badge type="info" text="v1.0.0" />

Mark a grid cell as impassable (blocked).

```redscript
fn pf_set_blocked(map: int[], x: int, z: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `map` | Obstacle map from pf_new_map |
| `x` | Cell X coordinate [0, 15] |
| `z` | Cell Z coordinate [0, 15] |

**Returns:** void — sets map[pf_pack(x,z)] = 1

**Example**

```redscript
pf_set_blocked(map, 5, 3)  // block cell (5, 3)
```

---

## `pf_set_open` <Badge type="info" text="v1.0.0" />

Mark a grid cell as passable (open).

```redscript
fn pf_set_open(map: int[], x: int, z: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `map` | Obstacle map from pf_new_map |
| `x` | Cell X coordinate [0, 15] |
| `z` | Cell Z coordinate [0, 15] |

**Returns:** void — sets map[pf_pack(x,z)] = 0

**Example**

```redscript
pf_set_open(map, 5, 3)  // re-open previously blocked cell (5, 3)
```

---

## `pf_is_blocked` <Badge type="info" text="v1.0.0" />

Check whether a grid cell is blocked or out of bounds.

```redscript
fn pf_is_blocked(map: int[], x: int, z: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `map` | Obstacle map from pf_new_map |
| `x` | Cell X coordinate |
| `z` | Cell Z coordinate |

**Returns:** 1 if out of bounds (x or z outside [0,15]) or cell is blocked, 0 if passable

**Example**

```redscript
let blocked: int = pf_is_blocked(map, 5, 3)
```

---

## `pf_heuristic` <Badge type="info" text="v1.0.0" />

Compute Manhattan distance between two grid cells, scaled ×10000.

```redscript
fn pf_heuristic(x1: int, z1: int, x2: int, z2: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x1` | First cell X |
| `z1` | First cell Z |
| `x2` | Second cell X |
| `z2` | Second cell Z |

**Returns:** (|x1-x2| + |z1-z2|) * 10000 — useful as A* heuristic

**Example**

```redscript
let h: int = pf_heuristic(0, 0, 3, 4)  // result: 70000 (7 Manhattan steps × 10000)
```

---

## `pathfind_bfs` <Badge type="info" text="v1.0.0" />

Find the shortest path between two cells on a 16×16 grid using BFS.

```redscript
fn pathfind_bfs(map: int[], sx: int, sz: int, gx: int, gz: int): int[]
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `map` | Obstacle map from pf_new_map (with pf_set_blocked applied) |
| `sx` | Start cell X [0, 15] |
| `sz` | Start cell Z [0, 15] |
| `gx` | Goal cell X [0, 15] |
| `gz` | Goal cell Z [0, 15] |

**Returns:** int[] of packed coords (pf_pack) from start to goal inclusive, or [] if no path

**Example**

```redscript
let map: int[] = pf_new_map()
pf_set_blocked(map, 3, 5)
let path: int[] = pathfind_bfs(map, 0, 0, 7, 7)
let x0: int = pf_unpack_x(path[0])
```

---

## `pf_noop` <Badge type="info" text="v1.0.0" />

Default no-op onDone callback for pathfind_bfs_coro. Replace with your own handler.

```redscript
fn pf_noop()
```

---
