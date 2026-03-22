# Graph

> Auto-generated from `src/stdlib/graph.mcrs` — do not edit manually.

## API

- [graph_is_valid_node](#graph-is-valid-node)
- [graph_new](#graph-new)
- [graph_add_edge](#graph-add-edge)
- [graph_add_undirected](#graph-add-undirected)
- [graph_node_count](#graph-node-count)
- [graph_edge_count](#graph-edge-count)
- [graph_bfs](#graph-bfs)
- [graph_dfs](#graph-dfs)
- [graph_has_path](#graph-has-path)
- [graph_shortest_path](#graph-shortest-path)

---

## `graph_is_valid_node` <Badge type="info" text="v1.0.0" />

Check whether a node index is valid for this graph.

```redscript
fn graph_is_valid_node(g: int[], node: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `g` | Graph array (from graph_new) |
| `node` | Node index to validate |

**Returns:** 1 if node is in [0, node_count), 0 otherwise

---

## `graph_new` <Badge type="info" text="v1.0.0" />

Create a new empty graph with n nodes and capacity for 256 directed edges.

```redscript
fn graph_new(n: int): int[]
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `n` | Number of nodes (clamped to [0, 64]) |

**Returns:** Initialized graph int[] with g[0]=0 (edges), g[1]=n (nodes)

**Example**

```redscript
let g: int[] = graph_new(5)  // graph with 5 nodes, no edges
```

---

## `graph_add_edge` <Badge type="info" text="v1.0.0" />

Add a directed weighted edge to the graph.

```redscript
fn graph_add_edge(g: int[], src: int, dst: int, weight: int): int[]
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `g` | Graph array |
| `src` | Source node index |
| `dst` | Destination node index |
| `weight` | Edge weight (use 1 for unweighted graphs) |

**Returns:** Updated graph array; silently ignores invalid nodes or full edge list

**Example**

```redscript
g = graph_add_edge(g, 0, 1, 5)  // edge from 0 to 1 with weight 5
```

---

## `graph_add_undirected` <Badge type="info" text="v1.0.0" />

Add an undirected weighted edge (adds both a→b and b→a directed edges).

```redscript
fn graph_add_undirected(g: int[], a: int, b: int, weight: int): int[]
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `g` | Graph array |
| `a` | First node index |
| `b` | Second node index |
| `weight` | Edge weight |

**Returns:** Updated graph array with two directed edges added

**Example**

```redscript
g = graph_add_undirected(g, 2, 3, 2)  // bidirectional edge between 2 and 3
```

---

## `graph_node_count` <Badge type="info" text="v1.0.0" />

Return the number of nodes in the graph.

```redscript
fn graph_node_count(g: int[]): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `g` | Graph array |

**Returns:** Node count (g[1])

---

## `graph_edge_count` <Badge type="info" text="v1.0.0" />

Return the number of directed edges in the graph.

```redscript
fn graph_edge_count(g: int[]): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `g` | Graph array |

**Returns:** Edge count (g[0])

---

## `graph_bfs` <Badge type="info" text="v1.0.0" />

Breadth-first search from a start node, returning visit order.

```redscript
fn graph_bfs(g: int[], start: int, out_visited: int[]): int[]
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `g` | Graph array |
| `start` | Starting node index |
| `out_visited` | int[] of length >= node_count; cells set to 1 for visited nodes |

**Returns:** int[] of node indices in BFS visit order; empty if start is invalid

**Example**

```redscript
let vis: int[] = [0, 0, 0, 0, 0]
let order: int[] = graph_bfs(g, 0, vis)
```

---

## `graph_dfs` <Badge type="info" text="v1.0.0" />

Depth-first search from a start node, returning visit order.

```redscript
fn graph_dfs(g: int[], start: int, out_visited: int[]): int[]
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `g` | Graph array |
| `start` | Starting node index |
| `out_visited` | int[] of length >= node_count; cells set to 1 for visited nodes |

**Returns:** int[] of node indices in DFS visit order (iterative, stack-based)

**Example**

```redscript
let vis: int[] = [0, 0, 0, 0, 0]
let order: int[] = graph_dfs(g, 0, vis)
```

---

## `graph_has_path` <Badge type="info" text="v1.0.0" />

Check whether a path exists between two nodes using BFS.

```redscript
fn graph_has_path(g: int[], src: int, dst: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `g` | Graph array |
| `src` | Source node index |
| `dst` | Destination node index |

**Returns:** 1 if a directed path from src to dst exists, 0 otherwise

**Example**

```redscript
let reachable: int = graph_has_path(g, 0, 3)
```

---

## `graph_shortest_path` <Badge type="info" text="v1.0.0" />

Find the shortest weighted path from src to all nodes using Dijkstra's algorithm.

```redscript
fn graph_shortest_path(g: int[], src: int, dst: int, out_dist: int[]): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `g` | Graph array |
| `src` | Source node index |
| `dst` | Destination node index (for return value) |
| `out_dist` | int[] of length >= node_count; filled with shortest distances (-1 if unreachable) |

**Returns:** Shortest distance from src to dst, or -1 if unreachable

**Example**

```redscript
let dist: int[] = [0, 0, 0, 0, 0]
let d: int = graph_shortest_path(g, 0, 3, dist)
```

---
