# `pathfind` — BFS 网格寻路

导入：`import "stdlib/pathfind.mcrs"`

在 16×16 的网格上使用广度优先搜索（BFS）进行寻路。在避开障碍物的同时，找出两个格子之间的最短路径。包含 coroutine 变体，可将计算分散到多个 tick 中执行，适合大型地图而不会导致 tick 速率卡顿。

**网格：** x ∈ [0, 15]，z ∈ [0, 15]（共 256 个格子）。  
**坐标编码：** `packed = x * 16 + z`

## 函数

### `pf_pack(x: int, z: int): int`

将 (x, z) 坐标对编码为单个压缩整数。

```rs
let p: int = pf_pack(3, 7)  // → 55  (3*16 + 7)
```

### `pf_unpack_x(packed: int): int`

从压缩坐标中还原 x 分量。

```rs
let x: int = pf_unpack_x(55)  // → 3
```

### `pf_unpack_z(packed: int): int`

从压缩坐标中还原 z 分量。

```rs
let z: int = pf_unpack_z(55)  // → 7
```

### `pf_new_map(): int[]`

分配一个 256 元素的障碍物地图，所有格子均可通行（值为 0）。

```rs
let map: int[] = pf_new_map()
```

### `pf_set_blocked(map: int[], x: int, z: int): void`

将格子 (x, z) 标记为不可通行（障碍物）。

```rs
pf_set_blocked(map, 3, 5)  // 阻塞 (3, 5)
```

### `pf_set_open(map: int[], x: int, z: int): void`

将格子 (x, z) 标记为可通行（清除障碍物）。

```rs
pf_set_open(map, 3, 5)
```

### `pf_is_blocked(map: int[], x: int, z: int): int`

如果格子不可通行或超出边界，返回 `1`；可通行则返回 `0`。

```rs
let blocked: int = pf_is_blocked(map, 3, 5)
```

### `pf_heuristic(x1: int, z1: int, x2: int, z2: int): int`

两个格子之间的曼哈顿距离启发式函数。由寻路器内部使用。

```rs
let h: int = pf_heuristic(0, 0, 7, 7)  // → 14
```

### `pathfind_bfs(map: int[], sx: int, sz: int, gx: int, gz: int): int[]`

使用 BFS 查找从 (sx, sz) 到 (gx, gz) 的最短路径。返回从起点到终点（含）的压缩坐标 `int[]`。如果不存在路径则返回空数组。

同步运行——在单个 tick 内完成。适合小型搜索（≤ ~100 个节点）。

```rs
import "stdlib/pathfind.mcrs"

@keep fn navigate() {
    let map: int[] = pf_new_map()
    pf_set_blocked(map, 1, 0)
    pf_set_blocked(map, 1, 1)
    pf_set_blocked(map, 1, 2)

    let path: int[] = pathfind_bfs(map, 0, 0, 3, 0)

    // 遍历路径
    let i: int = 0
    while (i < path.len()) {
        let step_x: int = pf_unpack_x(path[i])
        let step_z: int = pf_unpack_z(path[i])
        tell(@a, f"Step {i}: ({step_x}, {step_z})")
        i = i + 1
    }
}
```

### `pathfind_bfs_coro(map: int[], sx: int, sz: int, gx: int, gz: int, out: int[]): void`

BFS 的 coroutine 变体——将计算分散到多个 tick 中（每 tick 处理 `batch=16` 个节点）。将结果写入调用方提供的 `out[]` 数组。使用 `onDone` 在寻路完成时获得通知。

对于大型地图或每 tick 调用的情况，推荐使用此变体，以避免 lag spike。

```rs
import "stdlib/pathfind.mcrs"

let g_map: int[] = []
let g_path: int[] = []

@keep fn start_search() {
    g_map = pf_new_map()
    pf_set_blocked(g_map, 5, 5)
    g_path = []
    pathfind_bfs_coro(g_map, 0, 0, 10, 10, g_path)
}

@keep fn on_path_done() {
    tell(@a, f"Path found! Length: {g_path.len()}")
}
```

## 完整示例

```rs
import "stdlib/pathfind.mcrs"

@keep fn demo_pathfind() {
    let map: int[] = pf_new_map()

    // 在 x=4 处建一堵墙，阻塞 z=0..4
    pf_set_blocked(map, 4, 0)
    pf_set_blocked(map, 4, 1)
    pf_set_blocked(map, 4, 2)
    pf_set_blocked(map, 4, 3)
    pf_set_blocked(map, 4, 4)
    // (4, 5) 处的缺口允许通过

    let path: int[] = pathfind_bfs(map, 0, 0, 8, 0)

    if (path.len() == 0) {
        tell(@a, "No path found!")
    } else {
        tell(@a, f"Path length: {path.len()} steps")
        let gx: int = pf_unpack_x(path[path.len() - 1])
        let gz: int = pf_unpack_z(path[path.len() - 1])
        tell(@a, f"Goal reached: ({gx}, {gz})")
    }
}
```

---

### `pf_noop()`

`pathfind_bfs_coro` 的默认 `onDone` 回调。什么都不做，作为占位符使用。如果需要在 coroutine 完成时执行操作，可通过定义自己的 `pf_noop` 函数（或传入不同的回调）来替换它。

**示例：**
```rs
import "stdlib/pathfind.mcrs"

// 覆盖 pf_noop 以在寻路完成时作出响应
fn pf_noop() {
    tell(@a, "Pathfinding done!")
}
```
