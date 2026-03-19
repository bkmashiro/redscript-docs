# `graph` — Directed/Undirected Weighted Graphs

Import: `import "stdlib/graph.mcrs"`

Fixed-capacity weighted graph for RedScript datapacks. Supports up to **64 nodes** and **256 directed edges** stored in a flat `int[]` array. Provides BFS, DFS, reachability, and Dijkstra shortest-path queries — all without external allocations.

## Internal Layout

The graph lives in a single `int[]` of 770 slots with a packed edge-list format:

| Index | Contents |
|-------|----------|
| `g[0]` | Number of edges currently stored |
| `g[1]` | Number of nodes |
| `g[2 + i*3]` | Source node of edge `i` |
| `g[2 + i*3 + 1]` | Destination node of edge `i` |
| `g[2 + i*3 + 2]` | Weight of edge `i` |

Nodes are zero-indexed integers in the range `[0, node_count)`.

## Quick Example

```rs
import "stdlib/graph.mcrs";

// Build a 5-node graph
let g: int[] = graph_new(5);
g = graph_add_edge(g, 0, 1, 1);           // 0 → 1, weight 1
g = graph_add_edge(g, 0, 2, 4);           // 0 → 2, weight 4
g = graph_add_undirected(g, 2, 3, 2);     // 2 ↔ 3, weight 2
g = graph_add_edge(g, 1, 3, 2);           // 1 → 3, weight 2
g = graph_add_edge(g, 3, 4, 1);           // 3 → 4, weight 1

// BFS from node 0
let vis: int[] = [0, 0, 0, 0, 0];
let order: int[] = graph_bfs(g, 0, vis);
// order = [0, 1, 2, 3, 4]  (visit order)

// Shortest path from 0 to 4
let dist: int[] = [0, 0, 0, 0, 0];
let d: int = graph_shortest_path(g, 0, 4, dist);
// d = 4  (0→1→3→4, total weight 1+2+1)
// dist[2] = 4  (0→2 direct, weight 4)
```

## API Reference

---

### `graph_new(n: int): int[]`

Allocate a new graph with `n` nodes and no edges. `n` is clamped to `[0, 64]`.

| Param | Type | Description |
|-------|------|-------------|
| `n` | `int` | Number of nodes |

**Returns:** Zeroed `int[770]` with `g[1] = n`.

**Example:**
```rs
let g: int[] = graph_new(6);
```

---

### `graph_add_edge(g: int[], src: int, dst: int, weight: int): int[]`

Add a single directed edge `src → dst` with the given weight. Silently ignored if `src` or `dst` is out of range, or if the edge limit (256) is reached.

| Param | Type | Description |
|-------|------|-------------|
| `g` | `int[]` | The graph array |
| `src` | `int` | Source node index |
| `dst` | `int` | Destination node index |
| `weight` | `int` | Edge weight (integer) |

**Returns:** Updated graph array.

**Example:**
```rs
g = graph_add_edge(g, 0, 1, 10);   // directed: 0 → 1, weight 10
```

---

### `graph_add_undirected(g: int[], a: int, b: int, weight: int): int[]`

Add two directed edges `a → b` and `b → a` with the same weight, effectively creating an undirected edge. Consumes two edge slots.

| Param | Type | Description |
|-------|------|-------------|
| `g` | `int[]` | The graph array |
| `a` | `int` | First node index |
| `b` | `int` | Second node index |
| `weight` | `int` | Edge weight |

**Returns:** Updated graph array.

**Example:**
```rs
g = graph_add_undirected(g, 2, 3, 5);   // 2 ↔ 3, weight 5
```

---

### `graph_node_count(g: int[]): int`

Return the number of nodes in the graph.

**Example:**
```rs
let n: int = graph_node_count(g);   // 5 if graph_new(5)
```

---

### `graph_edge_count(g: int[]): int`

Return the number of directed edges currently stored.

**Example:**
```rs
let e: int = graph_edge_count(g);
```

---

### `graph_bfs(g: int[], start: int, out_visited: int[]): int[]`

Breadth-first search from `start`. Visits reachable nodes level by level.

| Param | Type | Description |
|-------|------|-------------|
| `g` | `int[]` | The graph array |
| `start` | `int` | Starting node index |
| `out_visited` | `int[]` | Caller-provided array (length ≥ node count); each reachable node `i` gets `out_visited[i] = 1` |

**Returns:** `int[]` containing visited node indices in BFS order.

> **Note:** `out_visited` is modified in place. Pre-initialize it to all zeros.

**Example:**
```rs
let vis: int[] = [0, 0, 0, 0, 0];
let order: int[] = graph_bfs(g, 0, vis);
// order holds nodes in visit order; vis[i] == 1 for all reached nodes
```

---

### `graph_dfs(g: int[], start: int, out_visited: int[]): int[]`

Depth-first search from `start`. Explores as deep as possible before backtracking.

| Param | Type | Description |
|-------|------|-------------|
| `g` | `int[]` | The graph array |
| `start` | `int` | Starting node index |
| `out_visited` | `int[]` | Caller-provided visited array (same semantics as BFS) |

**Returns:** `int[]` containing visited node indices in DFS order.

**Example:**
```rs
let vis: int[] = [0, 0, 0, 0, 0];
let dfs_order: int[] = graph_dfs(g, 0, vis);
```

---

### `graph_has_path(g: int[], src: int, dst: int): int`

Check whether a directed path exists from `src` to `dst` using BFS. Returns `1` if reachable, `0` otherwise. Returns `0` for invalid node indices.

| Param | Type | Description |
|-------|------|-------------|
| `g` | `int[]` | The graph array |
| `src` | `int` | Source node |
| `dst` | `int` | Destination node |

**Returns:** `1` if path exists, `0` if unreachable or invalid.

**Example:**
```rs
let reachable: int = graph_has_path(g, 0, 4);   // 1 or 0
```

---

### `graph_shortest_path(g: int[], src: int, dst: int, out_dist: int[]): int`

Compute shortest paths from `src` to all nodes using Dijkstra's algorithm (O(n²) with integer weights). Fills `out_dist[i]` with the shortest distance from `src` to node `i`, or `-1` if unreachable.

| Param | Type | Description |
|-------|------|-------------|
| `g` | `int[]` | The graph array |
| `src` | `int` | Source node |
| `dst` | `int` | Target node for the return value |
| `out_dist` | `int[]` | Caller-provided array (length ≥ node count); filled with distances |

**Returns:** Shortest distance from `src` to `dst`, or `-1` if unreachable or invalid.

> **Note:** `out_dist` is always fully written for all nodes, not just `dst`.

**Example:**
```rs
let dist: int[] = [0, 0, 0, 0, 0];
let d: int = graph_shortest_path(g, 0, 4, dist);
// d == -1 means 4 is unreachable from 0
// dist[3] holds cost to node 3
```

---

## Notes & Limitations

- **Capacity:** Max 64 nodes, 256 directed edges. Excess additions are silently ignored.
- **Weights:** All weights are plain integers. Negative weights are not supported — Dijkstra requires non-negative edges.
- **Self-loops:** Permitted but not meaningful for path queries.
- **Array size:** Each `graph_new()` call allocates a 770-element `int[]`. Avoid creating many graphs simultaneously.
- **`out_visited` / `out_dist` sizing:** These arrays must have at least `graph_node_count(g)` elements. Under-sizing causes out-of-bounds writes.
