# `pathfind` — BFS grid pathfinding

Import: `import "stdlib/pathfind.mcrs"`

Breadth-first search pathfinding on a 16×16 grid (x: 0–15, z: 0–15). Provides synchronous BFS and a coroutine-based variant that spreads computation across ticks (16 nodes/tick) for use in lag-sensitive datapacks.

Coordinate packing: cells are encoded as `x * 16 + z` (a single `int` per cell). The obstacle map is a 256-element `int[]` where 0 = passable, 1 = blocked.

## Functions

### `pf_pack(x: int, z: int): int`
Encode grid coordinates into a packed int.

### `pf_unpack_x(packed: int): int`
Recover the x component from a packed coordinate.

### `pf_unpack_z(packed: int): int`
Recover the z component from a packed coordinate.

### `pf_new_map(): int[]`
Allocate a fresh 256-element obstacle map with all cells passable.

### `pf_set_blocked(map: int[], x: int, z: int): void`
Mark cell `(x, z)` as impassable.

### `pf_set_open(map: int[], x: int, z: int): void`
Mark cell `(x, z)` as passable again.

### `pf_is_blocked(map: int[], x: int, z: int): int`
Returns `1` if `(x, z)` is out-of-bounds or blocked, `0` otherwise.

### `pathfind_bfs(map: int[], sx: int, sz: int, gx: int, gz: int): int[]`
Run BFS from `(sx, sz)` to `(gx, gz)`. Returns an `int[]` of packed coordinates from start to goal (inclusive), or an empty array if no path exists. Runs synchronously — suitable for short paths (≤ ~50 steps).

**Example:**
```rs
import "stdlib/pathfind.mcrs"

@keep fn find_path() {
    let map = pf_new_map()
    pf_set_blocked(map, 3, 0)
    pf_set_blocked(map, 3, 1)
    pf_set_blocked(map, 3, 2)

    let path = pathfind_bfs(map, 0, 0, 6, 0)
    // path[0] is packed start, path[len-1] is goal
    let step_x = pf_unpack_x(path[1])
    let step_z = pf_unpack_z(path[1])
    tell(@a, f"Next step: {step_x}, {step_z}")
}
```

### `pathfind_bfs_coro(map: int[], sx: int, sz: int, gx: int, gz: int, out: int[]): void`
Coroutine-based BFS — same algorithm as `pathfind_bfs` but decorated with `@coroutine(batch=16)`, processing 16 frontier nodes per tick. Results are pushed into the caller-supplied `out[]` array. Use `onDone` to receive a callback when the path is complete.

**Example:**
```rs
import "stdlib/pathfind.mcrs"

let path_result: int[] = []

@keep fn start_pathfind() {
    let map = pf_new_map()
    pathfind_bfs_coro(map, 0, 0, 15, 15, path_result)
}

@keep fn on_path_done() {
    // path_result is now populated
    let steps = path_result[0]  // first packed coord
    tell(@a, f"Path found with first step x={pf_unpack_x(steps)}")
}
```

## Notes

- Grid size is fixed at 16×16 (256 cells). For larger maps, tile the grid or use multiple maps.
- BFS finds the **shortest** path in terms of step count (4-directional: N/S/E/W).
- No diagonal movement.
- The coroutine variant avoids tick-timeout on large open grids where BFS may explore many cells.
