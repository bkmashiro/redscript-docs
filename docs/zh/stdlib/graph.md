# Graph

> 本文档由 `src/stdlib/graph.mcrs` 自动生成，请勿手动编辑。

## API 列表

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

**参数**

| 参数 | 说明 |
|------|------|
| `g` | Graph array (from graph_new) |
| `node` | Node index to validate |

**返回：** 1 if node is in [0, node_count), 0 otherwise

---

## `graph_new` <Badge type="info" text="v1.0.0" />

创建含 n 个节点、最多 256 条有向边的新空图

```redscript
fn graph_new(n: int): int[]
```

**参数**

| 参数 | 说明 |
|------|------|
| `n` | 节点数量（限制在 [0, 64]） |

**返回：** 初始化的图 int[]，g[0]=0（边数），g[1]=n（节点数）

**示例**

```redscript
let g: int[] = graph_new(5)  // graph with 5 nodes, no edges
```

---

## `graph_add_edge` <Badge type="info" text="v1.0.0" />

向图中添加一条有向加权边

```redscript
fn graph_add_edge(g: int[], src: int, dst: int, weight: int): int[]
```

**参数**

| 参数 | 说明 |
|------|------|
| `g` | 图数组 |
| `src` | 源节点索引 |
| `dst` | 目标节点索引 |
| `weight` | 边权重（无权图使用 1） |

**返回：** 更新后的图数组；节点无效或边数已满时静默忽略

**示例**

```redscript
g = graph_add_edge(g, 0, 1, 5)  // edge from 0 to 1 with weight 5
```

---

## `graph_add_undirected` <Badge type="info" text="v1.0.0" />

添加无向加权边（同时添加 a→b 和 b→a 两条有向边）

```redscript
fn graph_add_undirected(g: int[], a: int, b: int, weight: int): int[]
```

**参数**

| 参数 | 说明 |
|------|------|
| `g` | 图数组 |
| `a` | 第一个节点索引 |
| `b` | 第二个节点索引 |
| `weight` | 边权重 |

**返回：** 添加了两条有向边的更新图数组

**示例**

```redscript
g = graph_add_undirected(g, 2, 3, 2)  // bidirectional edge between 2 and 3
```

---

## `graph_node_count` <Badge type="info" text="v1.0.0" />

Return the number of nodes in the graph.

```redscript
fn graph_node_count(g: int[]): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `g` | Graph array |

**返回：** Node count (g[1])

---

## `graph_edge_count` <Badge type="info" text="v1.0.0" />

Return the number of directed edges in the graph.

```redscript
fn graph_edge_count(g: int[]): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `g` | Graph array |

**返回：** Edge count (g[0])

---

## `graph_bfs` <Badge type="info" text="v1.0.0" />

从起始节点广度优先搜索，返回访问顺序

```redscript
fn graph_bfs(g: int[], start: int, out_visited: int[]): int[]
```

**参数**

| 参数 | 说明 |
|------|------|
| `g` | 图数组 |
| `start` | 起始节点索引 |
| `out_visited` | 长度 >= node_count 的 int[]；已访问节点对应格设为 1 |

**返回：** BFS 访问顺序的节点索引 int[]；起始节点无效时返回空数组

**示例**

```redscript
let vis: int[] = [0, 0, 0, 0, 0]
let order: int[] = graph_bfs(g, 0, vis)
```

---

## `graph_dfs` <Badge type="info" text="v1.0.0" />

从起始节点深度优先搜索，返回访问顺序（迭代实现，基于栈）

```redscript
fn graph_dfs(g: int[], start: int, out_visited: int[]): int[]
```

**参数**

| 参数 | 说明 |
|------|------|
| `g` | 图数组 |
| `start` | 起始节点索引 |
| `out_visited` | 长度 >= node_count 的 int[] |

**返回：** DFS 访问顺序的节点索引 int[]

**示例**

```redscript
let vis: int[] = [0, 0, 0, 0, 0]
let order: int[] = graph_dfs(g, 0, vis)
```

---

## `graph_has_path` <Badge type="info" text="v1.0.0" />

使用 BFS 检测两节点之间是否存在有向路径

```redscript
fn graph_has_path(g: int[], src: int, dst: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `g` | 图数组 |
| `src` | 源节点索引 |
| `dst` | 目标节点索引 |

**返回：** 存在从 src 到 dst 的有向路径返回 1，否则返回 0

**示例**

```redscript
let reachable: int = graph_has_path(g, 0, 3)
```

---

## `graph_shortest_path` <Badge type="info" text="v1.0.0" />

使用 Dijkstra 算法计算从源节点到所有节点的最短加权路径

```redscript
fn graph_shortest_path(g: int[], src: int, dst: int, out_dist: int[]): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `g` | 图数组 |
| `src` | 源节点索引 |
| `dst` | 目标节点索引（用于返回值） |
| `out_dist` | 长度 >= node_count 的 int[]；填入最短距离（不可达为 -1） |

**返回：** src 到 dst 的最短距离，不可达返回 -1

**示例**

```redscript
let dist: int[] = [0, 0, 0, 0, 0]
let d: int = graph_shortest_path(g, 0, 3, dist)
```

---
