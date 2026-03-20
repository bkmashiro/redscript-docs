# `linalg` — 线性代数（2D/3D 向量与 2×2 矩阵）

导入：`import "stdlib/linalg.mcrs"`

用于 RedScript datapack 的双精度线性代数工具库。涵盖 2D 和 3D 向量算术、2×2 矩阵运算，以及通过 Cramer 法则求解 2×2 线性方程组。所有值使用原生 IEEE 754 `double`——没有定点数缩放；`1.0d` 就表示精确的 1.0。

**依赖：** 本模块需要 `stdlib/math_hp` 提供 `double_sqrt`。

## 快速示例

```rs
import "stdlib/linalg.mcrs";
import "stdlib/math_hp.mcrs";

// 归一化一个 3D 方向向量
let dx: double = 3.0d;
let dy: double = 0.0d;
let dz: double = 4.0d;
let nx: double = vec3d_normalize_x(dx, dy, dz);   // 0.6
let ny: double = vec3d_normalize_y(dx, dy, dz);   // 0.0
let nz: double = vec3d_normalize_z(dx, dy, dz);   // 0.8

// 求旋转矩阵的逆：[cos θ  -sin θ] [x] = [bx]
//                  [sin θ   cos θ] [y]   [by]
let c: double = 0.866d;    // cos 30°
let s: double = 0.5d;      // sin 30°
let ns: double = double_sub(0.0d, s);
let x: double = solve2d_x(c, ns, s, c, 1.0d, 0.0d);
let y: double = solve2d_y(c, ns, s, c, 1.0d, 0.0d);
```

## 2D 向量函数

---

### `vec2d_dot(ax: double, ay: double, bx: double, by: double): double`

2D 向量 **a** 与 **b** 的点积：ax·bx + ay·by。

**示例：**
```rs
let d: double = vec2d_dot(1.0d, 0.0d, 0.0d, 1.0d);   // 0.0（垂直）
let d2: double = vec2d_dot(3.0d, 4.0d, 3.0d, 4.0d);  // 25.0
```

---

### `vec2d_length(x: double, y: double): double`

2D 向量的欧氏长度：√(x² + y²)。

**示例：**
```rs
let len: double = vec2d_length(3.0d, 4.0d);   // 5.0
```

---

### `vec2d_dist(ax: double, ay: double, bx: double, by: double): double`

两个 2D 点之间的欧氏距离：`vec2d_length(a − b)`。

**示例：**
```rs
let d: double = vec2d_dist(0.0d, 0.0d, 3.0d, 4.0d);   // 5.0
```

---

### `vec2d_normalize_x(x: double, y: double): double`

(x, y) 方向单位向量的 X 分量。输入为零向量时返回 `0.0`。

**示例：**
```rs
let nx: double = vec2d_normalize_x(3.0d, 4.0d);   // 0.6
```

---

### `vec2d_normalize_y(x: double, y: double): double`

(x, y) 方向单位向量的 Y 分量。输入为零向量时返回 `0.0`。

**示例：**
```rs
let ny: double = vec2d_normalize_y(3.0d, 4.0d);   // 0.8
```

---

## 3D 向量函数

---

### `vec3d_dot(ax: double, ay: double, az: double, bx: double, by: double, bz: double): double`

3D 向量 **a** 与 **b** 的点积：ax·bx + ay·by + az·bz。

**示例：**
```rs
let d: double = vec3d_dot(1.0d, 0.0d, 0.0d, 0.0d, 1.0d, 0.0d);   // 0.0
```

---

### `vec3d_length(x: double, y: double, z: double): double`

3D 向量的欧氏长度：√(x² + y² + z²)。

**示例：**
```rs
let len: double = vec3d_length(1.0d, 2.0d, 2.0d);   // 3.0
```

---

### `vec3d_dist(ax: double, ay: double, az: double, bx: double, by: double, bz: double): double`

两个 3D 点之间的欧氏距离。

**示例：**
```rs
let d: double = vec3d_dist(0.0d, 0.0d, 0.0d, 1.0d, 2.0d, 2.0d);   // 3.0
```

---

### 叉积——三个分量函数

叉积 **a** × **b** 拆分为三个函数，每个函数对应一个输出分量。

| 函数 | 返回值 | 公式 |
|------|--------|------|
| `vec3d_cross_x(ax,ay,az, bx,by,bz)` | x = ay·bz − az·by |
| `vec3d_cross_y(ax,ay,az, bx,by,bz)` | y = az·bx − ax·bz |
| `vec3d_cross_z(ax,ay,az, bx,by,bz)` | z = ax·by − ay·bx |

**示例：**
```rs
// (1,0,0) × (0,1,0) = (0,0,1)
let cx: double = vec3d_cross_x(1.0d, 0.0d, 0.0d, 0.0d, 1.0d, 0.0d);   // 0.0
let cy: double = vec3d_cross_y(1.0d, 0.0d, 0.0d, 0.0d, 1.0d, 0.0d);   // 0.0
let cz: double = vec3d_cross_z(1.0d, 0.0d, 0.0d, 0.0d, 1.0d, 0.0d);   // 1.0
```

---

### 归一化——三个分量函数

| 函数 | 返回值 |
|------|--------|
| `vec3d_normalize_x(x, y, z): double` | 单位向量的 X 分量 |
| `vec3d_normalize_y(x, y, z): double` | 单位向量的 Y 分量 |
| `vec3d_normalize_z(x, y, z): double` | 单位向量的 Z 分量 |

输入为零向量时，三个函数均返回 `0.0`。

**示例：**
```rs
let nx: double = vec3d_normalize_x(3.0d, 0.0d, 4.0d);   // 0.6
let ny: double = vec3d_normalize_y(3.0d, 0.0d, 4.0d);   // 0.0
let nz: double = vec3d_normalize_z(3.0d, 0.0d, 4.0d);   // 0.8
```

---

## 2×2 矩阵函数

矩阵以**行优先**顺序表示为四个独立的 `double` 标量：

```
[ a  b ]   a = [0,0]   b = [0,1]
[ c  d ]   c = [1,0]   d = [1,1]
```

---

### `mat2d_det(a: double, b: double, c: double, d: double): double`

2×2 矩阵的行列式：a·d − b·c。

**示例：**
```rs
let det: double = mat2d_det(2.0d, 1.0d, 1.0d, 3.0d);   // 5.0
```

---

### 矩阵乘法——四个元素函数

矩阵乘积 **M0 × M1**，每次计算一个元素：

| 函数 | 元素 | 公式 |
|------|------|------|
| `mat2d_mul_r0c0(a0,b0,c0,d0, a1,b1,c1,d1)` | [0,0] | a0·a1 + b0·c1 |
| `mat2d_mul_r0c1(a0,b0,c0,d0, a1,b1,c1,d1)` | [0,1] | a0·b1 + b0·d1 |
| `mat2d_mul_r1c0(a0,b0,c0,d0, a1,b1,c1,d1)` | [1,0] | c0·a1 + d0·c1 |
| `mat2d_mul_r1c1(a0,b0,c0,d0, a1,b1,c1,d1)` | [1,1] | c0·b1 + d0·d1 |

**示例：**
```rs
// 单位矩阵 × 单位矩阵
let r00: double = mat2d_mul_r0c0(1.0d, 0.0d, 0.0d, 1.0d,  1.0d, 0.0d, 0.0d, 1.0d);   // 1.0
let r01: double = mat2d_mul_r0c1(1.0d, 0.0d, 0.0d, 1.0d,  1.0d, 0.0d, 0.0d, 1.0d);   // 0.0
```

---

### `mat2d_vecmul_x(a: double, b: double, c: double, d: double, vx: double, vy: double): double`

矩阵-向量乘积 **M × v** 的 X 分量：a·vx + b·vy。

---

### `mat2d_vecmul_y(a: double, b: double, c: double, d: double, vx: double, vy: double): double`

矩阵-向量乘积 **M × v** 的 Y 分量：c·vx + d·vy。

**示例：**
```rs
// 将 (1, 0) 旋转 90°：[[0,-1],[1,0]] × [1,0] = [0,1]
let rx: double = mat2d_vecmul_x(0.0d, -1.0d, 1.0d, 0.0d,  1.0d, 0.0d);   // 0.0
let ry: double = mat2d_vecmul_y(0.0d, -1.0d, 1.0d, 0.0d,  1.0d, 0.0d);   // 1.0
```

---

## 线性方程组求解器（Cramer 法则）

求解 2×2 方程组：

```
[ a  b ] [x]   [ex]
[ c  d ] [y] = [ey]
```

---

### `solve2d_x(a: double, b: double, c: double, d: double, ex: double, ey: double): double`

x 的解：`(ex·d − b·ey) / det(a,b,c,d)`。

---

### `solve2d_y(a: double, b: double, c: double, d: double, ex: double, ey: double): double`

y 的解：`(a·ey − ex·c) / det(a,b,c,d)`。

**示例：**
```rs
// 求解：2x + y = 5
//        x + 3y = 7
let x: double = solve2d_x(2.0d, 1.0d, 1.0d, 3.0d,  5.0d, 7.0d);   // 1.6
let y: double = solve2d_y(2.0d, 1.0d, 1.0d, 3.0d,  5.0d, 7.0d);   // 1.8
```

> **前提条件：** 行列式必须非零。函数内部没有保护——传入奇异矩阵会导致除以零。

---

## 注意事项与限制

- **双精度而非定点数：** 所有值均为原生 `double`。与其他 stdlib 模块不同，这里没有 ×10000 缩放因子。
- **2D 无 `vec3d_dist` 简写：** 2D 点距离请使用 `vec2d_dist`。
- **零向量归一化：** 当输入为零向量时，归一化函数逐分量返回 `0.0`，而不是 NaN 或错误。
- **奇异矩阵：** `solve2d_x`/`solve2d_y` 和 `mat2d_det` 不检查奇异矩阵。求解前请用 `mat2d_det(…) != 0.0d` 进行保护。
- **`math_hp` 是必需依赖：** 忘记 `import "stdlib/math_hp.mcrs"` 会导致编译时链接错误，因为 `double_sqrt` 未定义。
