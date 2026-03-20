# `graph` — 有向/无向加权图

导入：`import "stdlib/graph.mcrs"`

用于 RedScript datapack 的固定容量加权图。支持最多 **64 个节点**和 **256 条有向边**，存储在一个扁平的 `int[]` 数组中。提供 BFS、DFS、可达性检测以及 Dijkstra 最短路径查询——无需外部内存分配。

## 内部布局

图存储在一个 770 槽的 `int[]` 中，采用压缩边列表格式：

| 索引 | 内容 |
|------|------|
| `g[0]` | 当前已存储的边数 |
| `g[1]` | 节点数 |
| `g[2 + i*3]` | 第 `i` 条边的源节点 |
| `g[2 + i*3 + 1]` | 第 `i` 条边的目标节点 |
| `g[2 + i*3 + 2]` | 第 `i` 条边的权重 |

节点为零索引整数，范围 `[0, node_count)`。

## 快速示例

```rs
import "stdlib/graph.mcrs";

// 构建一个 5 节点图
let g: int[] = graph_new(5);
g = graph_add_edge(g, 0, 1, 1);           // 0 → 1，权重 1
g = graph_add_edge(g, 0, 2, 4);           // 0 → 2，权重 4
g = graph_add_undirected(g, 2, 3, 2);     // 2 ↔ 3，权重 2
g = graph_add_edge(g, 1, 3, 2);           // 1 → 3，权重 2
g = graph_add_edge(g, 3, 4, 1);           // 3 → 4，权重 1

// 从节点 0 开始 BFS
let vis: int[] = [0, 0, 0, 0, 0];
let order: int[] = graph_bfs(g, 0, vis);
// order = [0, 1, 2, 3, 4]（访问顺序）

// 从 0 到 4 的最短路径
let dist: int[] = [0, 0, 0, 0, 0];
let d: int = graph_shortest_path(g, 0, 4, dist);
// d = 4  (0→1→3→4，总权重 1+2+1)
// dist[2] = 4  (0→2 直接，权重 4)
```

## API 参考

---

### `graph_new(n: int): int[]`

分配一个有 `n` 个节点、无边的新图。`n` 限制在 `[0, 64]` 范围内。

| 参数 | 类型 | 说明 |
|------|------|------|
| `n` | `int` | 节点数量 |

**返回值：** 已清零的 `int[770]`，其中 `g[1] = n`。

**示例：**
```rs
let g: int[] = graph_new(6);
```

---

### `graph_add_edge(g: int[], src: int, dst: int, weight: int): int[]`

添加一条有向边 `src → dst`，权重为给定值。如果 `src` 或 `dst` 超出范围，或已达到边数上限（256），则静默忽略。

| 参数 | 类型 | 说明 |
|------|------|------|
| `g` | `int[]` | 图数组 |
| `src` | `int` | 源节点索引 |
| `dst` | `int` | 目标节点索引 |
| `weight` | `int` | 边权重（整数） |

**返回值：** 更新后的图数组。

**示例：**
```rs
g = graph_add_edge(g, 0, 1, 10);   // 有向边：0 → 1，权重 10
```

---

### `graph_add_undirected(g: int[], a: int, b: int, weight: int): int[]`

添加两条有向边 `a → b` 和 `b → a`，权重相同，实际上创建了一条无向边。会占用两个边槽位。

| 参数 | 类型 | 说明 |
|------|------|------|
| `g` | `int[]` | 图数组 |
| `a` | `int` | 第一个节点索引 |
| `b` | `int` | 第二个节点索引 |
| `weight` | `int` | 边权重 |

**返回值：** 更新后的图数组。

**示例：**
```rs
g = graph_add_undirected(g, 2, 3, 5);   // 2 ↔ 3，权重 5
```

---

### `graph_node_count(g: int[]): int`

返回图中的节点数量。

**示例：**
```rs
let n: int = graph_node_count(g);   // 若 graph_new(5) 则为 5
```

---

### `graph_edge_count(g: int[]): int`

返回当前已存储的有向边数量。

**示例：**
```rs
let e: int = graph_edge_count(g);
```

---

### `graph_bfs(g: int[], start: int, out_visited: int[]): int[]`

从 `start` 开始进行广度优先搜索。逐层访问可达节点。

| 参数 | 类型 | 说明 |
|------|------|------|
| `g` | `int[]` | 图数组 |
| `start` | `int` | 起始节点索引 |
| `out_visited` | `int[]` | 调用方提供的数组（长度 ≥ 节点数）；每个可达节点 `i` 会被设置 `out_visited[i] = 1` |

**返回值：** 包含按 BFS 顺序访问的节点索引的 `int[]`。

> **注意：** `out_visited` 会被原地修改。调用前请将其初始化为全零。

**示例：**
```rs
let vis: int[] = [0, 0, 0, 0, 0];
let order: int[] = graph_bfs(g, 0, vis);
// order 按访问顺序存放节点；所有可达节点 i 的 vis[i] == 1
```

---

### `graph_dfs(g: int[], start: int, out_visited: int[]): int[]`

从 `start` 开始进行深度优先搜索。尽可能深入探索后再回溯。

| 参数 | 类型 | 说明 |
|------|------|------|
| `g` | `int[]` | 图数组 |
| `start` | `int` | 起始节点索引 |
| `out_visited` | `int[]` | 调用方提供的已访问数组（语义与 BFS 相同） |

**返回值：** 包含按 DFS 顺序访问的节点索引的 `int[]`。

**示例：**
```rs
let vis: int[] = [0, 0, 0, 0, 0];
let dfs_order: int[] = graph_dfs(g, 0, vis);
```

---

### `graph_has_path(g: int[], src: int, dst: int): int`

使用 BFS 检查从 `src` 到 `dst` 是否存在有向路径。可达返回 `1`，否则返回 `0`。节点索引无效时返回 `0`。

| 参数 | 类型 | 说明 |
|------|------|------|
| `g` | `int[]` | 图数组 |
| `src` | `int` | 源节点 |
| `dst` | `int` | 目标节点 |

**返回值：** 路径存在返回 `1`，不可达或无效返回 `0`。

**示例：**
```rs
let reachable: int = graph_has_path(g, 0, 4);   // 1 或 0
```

---

### `graph_shortest_path(g: int[], src: int, dst: int, out_dist: int[]): int`

使用 Dijkstra 算法（整数权重下 O(n²) 复杂度）计算从 `src` 到所有节点的最短路径。将 `out_dist[i]` 填充为从 `src` 到节点 `i` 的最短距离，不可达则为 `-1`。

| 参数 | 类型 | 说明 |
|------|------|------|
| `g` | `int[]` | 图数组 |
| `src` | `int` | 源节点 |
| `dst` | `int` | 目标节点（用于返回值） |
| `out_dist` | `int[]` | 调用方提供的数组（长度 ≥ 节点数）；填充各节点距离 |

**返回值：** 从 `src` 到 `dst` 的最短距离，不可达或无效则返回 `-1`。

> **注意：** `out_dist` 始终对所有节点完整写入，而不仅仅是 `dst`。

**示例：**
```rs
let dist: int[] = [0, 0, 0, 0, 0];
let d: int = graph_shortest_path(g, 0, 4, dist);
// d == -1 表示从 0 无法到达 4
// dist[3] 存储到达节点 3 的代价
```

---

## 注意事项与限制

- **容量：** 最多 64 个节点，256 条有向边。超出部分会被静默忽略。
- **权重：** 所有权重为普通整数。不支持负权重——Dijkstra 要求边权为非负数。
- **自环：** 允许但对路径查询没有意义。
- **数组大小：** 每次 `graph_new()` 调用会分配一个 770 元素的 `int[]`。避免同时创建大量图。
- **`out_visited` / `out_dist` 大小：** 这些数组至少需要有 `graph_node_count(g)` 个元素。大小不足会导致越界写入。
