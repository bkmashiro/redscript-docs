# `pathfind` — BFS Grid Pathfinding

Import: `import "stdlib/pathfind.mcrs"`

Breadth-first search (BFS) pathfinding on a 16×16 grid. Finds the shortest path between two cells while avoiding obstacles. Includes a coroutine variant that spreads computation across multiple ticks, suitable for large maps without causing tick-rate lag.

**Grid:** x ∈ [0, 15], z ∈ [0, 15] (256 cells total).  
**Coordinate encoding:** `packed = x * 16 + z`

## Functions

### `pf_pack(x: int, z: int): int`

Encode a (x, z) coordinate pair into a single packed integer.

```rs
let p: int = pf_pack(3, 7)  // → 55  (3*16 + 7)
```

### `pf_unpack_x(packed: int): int`

Recover the x component from a packed coordinate.

```rs
let x: int = pf_unpack_x(55)  // → 3
```

### `pf_unpack_z(packed: int): int`

Recover the z component from a packed coordinate.

```rs
let z: int = pf_unpack_z(55)  // → 7
```

### `pf_new_map(): int[]`

Allocate a 256-element obstacle map with all cells passable (value 0).

```rs
let map: int[] = pf_new_map()
```

### `pf_set_blocked(map: int[], x: int, z: int): void`

Mark cell (x, z) as impassable (obstacle).

```rs
pf_set_blocked(map, 3, 5)  // block (3, 5)
```

### `pf_set_open(map: int[], x: int, z: int): void`

Mark cell (x, z) as passable (clear an obstacle).

```rs
pf_set_open(map, 3, 5)
```

### `pf_is_blocked(map: int[], x: int, z: int): int`

Returns `1` if the cell is impassable or out of bounds, `0` if passable.

```rs
let blocked: int = pf_is_blocked(map, 3, 5)
```

### `pf_heuristic(x1: int, z1: int, x2: int, z2: int): int`

Manhattan distance heuristic between two cells. Used internally by the pathfinder.

```rs
let h: int = pf_heuristic(0, 0, 7, 7)  // → 14
```

### `pathfind_bfs(map: int[], sx: int, sz: int, gx: int, gz: int): int[]`

Find the shortest path from (sx, sz) to (gx, gz) using BFS. Returns an `int[]` of packed coordinates from start to goal (inclusive). Returns an empty array if no path exists.

Runs synchronously — completes in a single tick. Suitable for small searches (≤ ~100 nodes).

```rs
import "stdlib/pathfind.mcrs"

@keep fn navigate() {
    let map: int[] = pf_new_map()
    pf_set_blocked(map, 1, 0)
    pf_set_blocked(map, 1, 1)
    pf_set_blocked(map, 1, 2)

    let path: int[] = pathfind_bfs(map, 0, 0, 3, 0)

    // Walk the path
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

Coroutine variant of BFS — spreads computation across ticks (`batch=16` nodes per tick). Writes results into the caller-supplied `out[]` array. Use `onDone` to get notified when pathfinding completes.

This variant is recommended for large maps or when called every tick, to avoid lag spikes.

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

## Complete Example

```rs
import "stdlib/pathfind.mcrs"

@keep fn demo_pathfind() {
    let map: int[] = pf_new_map()

    // Build a wall at x=4, blocking z=0..4
    pf_set_blocked(map, 4, 0)
    pf_set_blocked(map, 4, 1)
    pf_set_blocked(map, 4, 2)
    pf_set_blocked(map, 4, 3)
    pf_set_blocked(map, 4, 4)
    // Gap at (4, 5) allows passage

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

Default `onDone` callback for `pathfind_bfs_coro`. Does nothing; serves as a placeholder. Replace it by defining your own `pf_noop` function (or passing a different callback) if you need to act when the coroutine finishes.

**Example:**
```rs
import "stdlib/pathfind.mcrs"

// Override pf_noop to react when pathfinding completes
fn pf_noop() {
    tell(@a, "Pathfinding done!")
}
```
