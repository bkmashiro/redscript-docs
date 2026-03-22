# Linalg

> 本文档由 `src/stdlib/linalg.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [vec2d_dot](#vec2d-dot)
- [vec2d_length](#vec2d-length)
- [vec2d_dist](#vec2d-dist)
- [vec2d_normalize_x](#vec2d-normalize-x)
- [vec2d_normalize_y](#vec2d-normalize-y)
- [vec3d_dot](#vec3d-dot)
- [vec3d_length](#vec3d-length)
- [vec3d_dist](#vec3d-dist)
- [vec3d_cross_x](#vec3d-cross-x)
- [vec3d_cross_y](#vec3d-cross-y)
- [vec3d_cross_z](#vec3d-cross-z)
- [vec3d_normalize_x](#vec3d-normalize-x)
- [vec3d_normalize_y](#vec3d-normalize-y)
- [vec3d_normalize_z](#vec3d-normalize-z)
- [mat2d_det](#mat2d-det)
- [mat2d_mul_r0c0](#mat2d-mul-r0c0)
- [mat2d_mul_r0c1](#mat2d-mul-r0c1)
- [mat2d_mul_r1c0](#mat2d-mul-r1c0)
- [mat2d_mul_r1c1](#mat2d-mul-r1c1)
- [mat2d_vecmul_x](#mat2d-vecmul-x)
- [mat2d_vecmul_y](#mat2d-vecmul-y)
- [solve2d_x](#solve2d-x)
- [solve2d_y](#solve2d-y)

---

## `vec2d_dot` <Badge type="info" text="v2.0.0" />

两个二维向量的点积

```redscript
fn vec2d_dot(ax: double, ay: double, bx: double, by: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `ax` | 向量 A 的 X 分量 |
| `ay` | 向量 A 的 Y 分量 |
| `bx` | 向量 B 的 X 分量 |
| `by` | 向量 B 的 Y 分量 |

**返回：** ax*bx + ay*by

**示例**

```redscript
let d: double = vec2d_dot(1.0d, 0.0d, 0.0d, 1.0d)
```

---

## `vec2d_length` <Badge type="info" text="v2.0.0" />

二维向量的欧几里得长度

```redscript
fn vec2d_length(x: double, y: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | X 分量 |
| `y` | Y 分量 |

**返回：** sqrt(x² + y²)

**示例**

```redscript
let len: double = vec2d_length(3.0d, 4.0d)
```

---

## `vec2d_dist` <Badge type="info" text="v2.0.0" />

两个二维点之间的欧几里得距离

```redscript
fn vec2d_dist(ax: double, ay: double, bx: double, by: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `ax` | 点 A 的 X 坐标 |
| `ay` | 点 A 的 Y 坐标 |
| `bx` | 点 B 的 X 坐标 |
| `by` | 点 B 的 Y 坐标 |

**返回：** sqrt((ax-bx)² + (ay-by)²)

**示例**

```redscript
let dist: double = vec2d_dist(0.0d, 0.0d, 3.0d, 4.0d)
```

---

## `vec2d_normalize_x` <Badge type="info" text="v2.0.0" />

二维单位向量的 X 分量；零向量返回 0.0

```redscript
fn vec2d_normalize_x(x: double, y: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | X 分量 |
| `y` | Y 分量 |

**返回：** x / ||(x,y)||，零向量时返回 0.0

**示例**

```redscript
let nx: double = vec2d_normalize_x(3.0d, 4.0d)
```

---

## `vec2d_normalize_y` <Badge type="info" text="v2.0.0" />

二维单位向量的 Y 分量；零向量返回 0.0

```redscript
fn vec2d_normalize_y(x: double, y: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | X 分量 |
| `y` | Y 分量 |

**返回：** y / ||(x,y)||，零向量时返回 0.0

**示例**

```redscript
let ny: double = vec2d_normalize_y(3.0d, 4.0d)
```

---

## `vec3d_dot` <Badge type="info" text="v2.0.0" />

两个三维向量的点积

```redscript
fn vec3d_dot(ax: double, ay: double, az: double, bx: double, by: double, bz: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `ax` | X component of vector A |
| `ay` | Y component of vector A |
| `az` | Z component of vector A |
| `bx` | X component of vector B |
| `by` | Y component of vector B |
| `bz` | Z component of vector B |

**返回：** ax*bx + ay*by + az*bz

**示例**

```redscript
let d: double = vec3d_dot(1.0d, 0.0d, 0.0d, 0.0d, 1.0d, 0.0d)
```

---

## `vec3d_length` <Badge type="info" text="v2.0.0" />

三维向量的欧几里得长度

```redscript
fn vec3d_length(x: double, y: double, z: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | X component |
| `y` | Y component |
| `z` | Z component |

**返回：** sqrt(x² + y² + z²)

**示例**

```redscript
let len: double = vec3d_length(1.0d, 2.0d, 2.0d)
```

---

## `vec3d_dist` <Badge type="info" text="v2.0.0" />

两个三维点之间的欧几里得距离

```redscript
fn vec3d_dist(ax: double, ay: double, az: double, bx: double, by: double, bz: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `ax` | X coordinate of point A |
| `ay` | Y coordinate of point A |
| `az` | Z coordinate of point A |
| `bx` | X coordinate of point B |
| `by` | Y coordinate of point B |
| `bz` | Z coordinate of point B |

**返回：** sqrt((ax-bx)² + (ay-by)² + (az-bz)²)

---

## `vec3d_cross_x` <Badge type="info" text="v2.0.0" />

叉积 a × b 的 X 分量

```redscript
fn vec3d_cross_x(ax: double, ay: double, az: double, bx: double, by: double, bz: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `ax` | X of A   @param ay  Y of A   @param az  Z of A |
| `bx` | X of B   @param by  Y of B   @param bz  Z of B |

**返回：** ay*bz - az*by

---

## `vec3d_cross_y` <Badge type="info" text="v2.0.0" />

叉积 a × b 的 Y 分量

```redscript
fn vec3d_cross_y(ax: double, ay: double, az: double, bx: double, by: double, bz: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `ax` | X of A   @param ay  Y of A   @param az  Z of A |
| `bx` | X of B   @param by  Y of B   @param bz  Z of B |

**返回：** az*bx - ax*bz

---

## `vec3d_cross_z` <Badge type="info" text="v2.0.0" />

叉积 a × b 的 Z 分量

```redscript
fn vec3d_cross_z(ax: double, ay: double, az: double, bx: double, by: double, bz: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `ax` | X of A   @param ay  Y of A   @param az  Z of A |
| `bx` | X of B   @param by  Y of B   @param bz  Z of B |

**返回：** ax*by - ay*bx

---

## `vec3d_normalize_x` <Badge type="info" text="v2.0.0" />

三维单位向量的 X 分量；零向量返回 0.0

```redscript
fn vec3d_normalize_x(x: double, y: double, z: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | X component   @param y  Y component   @param z  Z component |

**返回：** x / ||(x,y,z)||，零向量时返回 0.0

**示例**

```redscript
let nx: double = vec3d_normalize_x(3.0d, 4.0d, 0.0d)
```

---

## `vec3d_normalize_y` <Badge type="info" text="v2.0.0" />

三维单位向量的 Y 分量；零向量返回 0.0

```redscript
fn vec3d_normalize_y(x: double, y: double, z: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | X component   @param y  Y component   @param z  Z component |

**返回：** y / ||(x,y,z)||，零向量时返回 0.0

---

## `vec3d_normalize_z` <Badge type="info" text="v2.0.0" />

三维单位向量的 Z 分量；零向量返回 0.0

```redscript
fn vec3d_normalize_z(x: double, y: double, z: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | X component   @param y  Y component   @param z  Z component |

**返回：** z / ||(x,y,z)||，零向量时返回 0.0

---

## `mat2d_det` <Badge type="info" text="v2.0.0" />

2×2 矩阵的行列式

```redscript
fn mat2d_det(a: double, b: double, c: double, d: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | Element [0,0]   @param b  Element [0,1] |
| `c` | Element [1,0]   @param d  Element [1,1] |

**返回：** a*d - b*c

**示例**

```redscript
let det: double = mat2d_det(1.0d, 2.0d, 3.0d, 4.0d)
```

---

## `mat2d_mul_r0c0` <Badge type="info" text="v2.0.0" />

两个 2×2 矩阵乘积 M0×M1 的元素 [0,0]

```redscript
fn mat2d_mul_r0c0(a0: double, b0: double, c0: double, d0: double, a1: double, b1: double, c1: double, d1: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `a0` | M0 row-major elements (a0, b0, c0, d0) |
| `a1` | M1 row-major elements (a1, b1, c1, d1) |

**返回：** a0*a1 + b0*c1

---

## `mat2d_mul_r0c1` <Badge type="info" text="v2.0.0" />

两个 2×2 矩阵乘积 M0×M1 的元素 [0,1]

```redscript
fn mat2d_mul_r0c1(a0: double, b0: double, c0: double, d0: double, a1: double, b1: double, c1: double, d1: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `a0` | M0 row-major elements   @param a1  M1 row-major elements |

**返回：** a0*b1 + b0*d1

---

## `mat2d_mul_r1c0` <Badge type="info" text="v2.0.0" />

两个 2×2 矩阵乘积 M0×M1 的元素 [1,0]

```redscript
fn mat2d_mul_r1c0(a0: double, b0: double, c0: double, d0: double, a1: double, b1: double, c1: double, d1: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `a0` | M0 row-major elements   @param a1  M1 row-major elements |

**返回：** c0*a1 + d0*c1

---

## `mat2d_mul_r1c1` <Badge type="info" text="v2.0.0" />

两个 2×2 矩阵乘积 M0×M1 的元素 [1,1]

```redscript
fn mat2d_mul_r1c1(a0: double, b0: double, c0: double, d0: double, a1: double, b1: double, c1: double, d1: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `a0` | M0 row-major elements   @param a1  M1 row-major elements |

**返回：** c0*b1 + d0*d1

---

## `mat2d_vecmul_x` <Badge type="info" text="v2.0.0" />

2×2 矩阵与向量乘积 M×v 的 X 分量

```redscript
fn mat2d_vecmul_x(a: double, b: double, c: double, d: double, vx: double, vy: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | M[0,0]   @param b  M[0,1]   @param c  M[1,0]   @param d  M[1,1] |
| `vx` | Vector X component   @param vy  Vector Y component |

**返回：** a*vx + b*vy

---

## `mat2d_vecmul_y` <Badge type="info" text="v2.0.0" />

2×2 矩阵与向量乘积 M×v 的 Y 分量

```redscript
fn mat2d_vecmul_y(a: double, b: double, c: double, d: double, vx: double, vy: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | M[0,0]   @param b  M[0,1]   @param c  M[1,0]   @param d  M[1,1] |
| `vx` | Vector X component   @param vy  Vector Y component |

**返回：** c*vx + d*vy

---

## `solve2d_x` <Badge type="info" text="v2.0.0" />

用 Cramer 法则求解 2×2 线性方程组的 x 分量

```redscript
fn solve2d_x(a: double, b: double, c: double, d: double, ex: double, ey: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | M[0,0]   @param b   M[0,1] |
| `c` | M[1,0]   @param d   M[1,1] |
| `ex` | RHS x    @param ey  RHS y |

**返回：** (ex*d - b*ey) / det

**示例**

```redscript
let x: double = solve2d_x(1.0d, 0.0d, 0.0d, 1.0d, 3.0d, 4.0d)
```

---

## `solve2d_y` <Badge type="info" text="v2.0.0" />

用 Cramer 法则求解 2×2 线性方程组的 y 分量

```redscript
fn solve2d_y(a: double, b: double, c: double, d: double, ex: double, ey: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | M[0,0]   @param b   M[0,1] |
| `c` | M[1,0]   @param d   M[1,1] |
| `ex` | RHS x    @param ey  RHS y |

**返回：** (a*ey - ex*c) / det

**示例**

```redscript
let y: double = solve2d_y(1.0d, 0.0d, 0.0d, 1.0d, 3.0d, 4.0d)
```

---
