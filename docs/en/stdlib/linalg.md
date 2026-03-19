# `linalg` — Linear Algebra (2D/3D Vectors and 2×2 Matrices)

Import: `import "stdlib/linalg.mcrs"`

Double-precision linear algebra utilities for RedScript datapacks. Covers 2D and 3D vector arithmetic, 2×2 matrix operations, and a 2×2 linear system solver via Cramer's rule. All values use native IEEE 754 `double` — there is no fixed-point scaling; `1.0d` means exactly 1.0.

**Dependency:** This module requires `stdlib/math_hp` for `double_sqrt`.

## Quick Example

```rs
import "stdlib/linalg.mcrs";
import "stdlib/math_hp.mcrs";

// Normalize a 3D direction vector
let dx: double = 3.0d;
let dy: double = 0.0d;
let dz: double = 4.0d;
let nx: double = vec3d_normalize_x(dx, dy, dz);   // 0.6
let ny: double = vec3d_normalize_y(dx, dy, dz);   // 0.0
let nz: double = vec3d_normalize_z(dx, dy, dz);   // 0.8

// Solve rotation-matrix inverse: [cos θ  -sin θ] [x] = [bx]
//                                 [sin θ   cos θ] [y]   [by]
let c: double = 0.866d;    // cos 30°
let s: double = 0.5d;      // sin 30°
let ns: double = double_sub(0.0d, s);
let x: double = solve2d_x(c, ns, s, c, 1.0d, 0.0d);
let y: double = solve2d_y(c, ns, s, c, 1.0d, 0.0d);
```

## 2D Vector Functions

---

### `vec2d_dot(ax: double, ay: double, bx: double, by: double): double`

Dot product of 2D vectors **a** and **b**: ax·bx + ay·by.

**Example:**
```rs
let d: double = vec2d_dot(1.0d, 0.0d, 0.0d, 1.0d);   // 0.0  (perpendicular)
let d2: double = vec2d_dot(3.0d, 4.0d, 3.0d, 4.0d);  // 25.0
```

---

### `vec2d_length(x: double, y: double): double`

Euclidean length of 2D vector: √(x² + y²).

**Example:**
```rs
let len: double = vec2d_length(3.0d, 4.0d);   // 5.0
```

---

### `vec2d_dist(ax: double, ay: double, bx: double, by: double): double`

Euclidean distance between two 2D points: `vec2d_length(a − b)`.

**Example:**
```rs
let d: double = vec2d_dist(0.0d, 0.0d, 3.0d, 4.0d);   // 5.0
```

---

### `vec2d_normalize_x(x: double, y: double): double`

X component of the unit vector in the direction of (x, y). Returns `0.0` for zero-length input.

**Example:**
```rs
let nx: double = vec2d_normalize_x(3.0d, 4.0d);   // 0.6
```

---

### `vec2d_normalize_y(x: double, y: double): double`

Y component of the unit vector in the direction of (x, y). Returns `0.0` for zero-length input.

**Example:**
```rs
let ny: double = vec2d_normalize_y(3.0d, 4.0d);   // 0.8
```

---

## 3D Vector Functions

---

### `vec3d_dot(ax: double, ay: double, az: double, bx: double, by: double, bz: double): double`

Dot product of 3D vectors **a** and **b**: ax·bx + ay·by + az·bz.

**Example:**
```rs
let d: double = vec3d_dot(1.0d, 0.0d, 0.0d, 0.0d, 1.0d, 0.0d);   // 0.0
```

---

### `vec3d_length(x: double, y: double, z: double): double`

Euclidean length of 3D vector: √(x² + y² + z²).

**Example:**
```rs
let len: double = vec3d_length(1.0d, 2.0d, 2.0d);   // 3.0
```

---

### `vec3d_dist(ax: double, ay: double, az: double, bx: double, by: double, bz: double): double`

Euclidean distance between two 3D points.

**Example:**
```rs
let d: double = vec3d_dist(0.0d, 0.0d, 0.0d, 1.0d, 2.0d, 2.0d);   // 3.0
```

---

### Cross product — three component functions

The cross product **a** × **b** is split into three functions, one per output component.

| Function | Returns | Formula |
|----------|---------|---------|
| `vec3d_cross_x(ax,ay,az, bx,by,bz)` | x = ay·bz − az·by |
| `vec3d_cross_y(ax,ay,az, bx,by,bz)` | y = az·bx − ax·bz |
| `vec3d_cross_z(ax,ay,az, bx,by,bz)` | z = ax·by − ay·bx |

**Example:**
```rs
// (1,0,0) × (0,1,0) = (0,0,1)
let cx: double = vec3d_cross_x(1.0d, 0.0d, 0.0d, 0.0d, 1.0d, 0.0d);   // 0.0
let cy: double = vec3d_cross_y(1.0d, 0.0d, 0.0d, 0.0d, 1.0d, 0.0d);   // 0.0
let cz: double = vec3d_cross_z(1.0d, 0.0d, 0.0d, 0.0d, 1.0d, 0.0d);   // 1.0
```

---

### Normalize — three component functions

| Function | Returns |
|----------|---------|
| `vec3d_normalize_x(x, y, z): double` | X component of unit vector |
| `vec3d_normalize_y(x, y, z): double` | Y component of unit vector |
| `vec3d_normalize_z(x, y, z): double` | Z component of unit vector |

All three return `0.0` for zero-length input.

**Example:**
```rs
let nx: double = vec3d_normalize_x(3.0d, 0.0d, 4.0d);   // 0.6
let ny: double = vec3d_normalize_y(3.0d, 0.0d, 4.0d);   // 0.0
let nz: double = vec3d_normalize_z(3.0d, 0.0d, 4.0d);   // 0.8
```

---

## 2×2 Matrix Functions

Matrices are represented as four individual `double` scalars in **row-major** order:

```
[ a  b ]   a = [0,0]   b = [0,1]
[ c  d ]   c = [1,0]   d = [1,1]
```

---

### `mat2d_det(a: double, b: double, c: double, d: double): double`

Determinant of a 2×2 matrix: a·d − b·c.

**Example:**
```rs
let det: double = mat2d_det(2.0d, 1.0d, 1.0d, 3.0d);   // 5.0
```

---

### Matrix multiply — four element functions

Matrix product **M0 × M1**, one element at a time:

| Function | Element | Formula |
|----------|---------|---------|
| `mat2d_mul_r0c0(a0,b0,c0,d0, a1,b1,c1,d1)` | [0,0] | a0·a1 + b0·c1 |
| `mat2d_mul_r0c1(a0,b0,c0,d0, a1,b1,c1,d1)` | [0,1] | a0·b1 + b0·d1 |
| `mat2d_mul_r1c0(a0,b0,c0,d0, a1,b1,c1,d1)` | [1,0] | c0·a1 + d0·c1 |
| `mat2d_mul_r1c1(a0,b0,c0,d0, a1,b1,c1,d1)` | [1,1] | c0·b1 + d0·d1 |

**Example:**
```rs
// Identity × Identity
let r00: double = mat2d_mul_r0c0(1.0d, 0.0d, 0.0d, 1.0d,  1.0d, 0.0d, 0.0d, 1.0d);   // 1.0
let r01: double = mat2d_mul_r0c1(1.0d, 0.0d, 0.0d, 1.0d,  1.0d, 0.0d, 0.0d, 1.0d);   // 0.0
```

---

### `mat2d_vecmul_x(a: double, b: double, c: double, d: double, vx: double, vy: double): double`

X component of the matrix-vector product **M × v**: a·vx + b·vy.

---

### `mat2d_vecmul_y(a: double, b: double, c: double, d: double, vx: double, vy: double): double`

Y component of the matrix-vector product **M × v**: c·vx + d·vy.

**Example:**
```rs
// Rotate (1, 0) by 90°: [[0,-1],[1,0]] × [1,0] = [0,1]
let rx: double = mat2d_vecmul_x(0.0d, -1.0d, 1.0d, 0.0d,  1.0d, 0.0d);   // 0.0
let ry: double = mat2d_vecmul_y(0.0d, -1.0d, 1.0d, 0.0d,  1.0d, 0.0d);   // 1.0
```

---

## Linear System Solver (Cramer's Rule)

Solves the 2×2 system:

```
[ a  b ] [x]   [ex]
[ c  d ] [y] = [ey]
```

---

### `solve2d_x(a: double, b: double, c: double, d: double, ex: double, ey: double): double`

X solution: `(ex·d − b·ey) / det(a,b,c,d)`.

---

### `solve2d_y(a: double, b: double, c: double, d: double, ex: double, ey: double): double`

Y solution: `(a·ey − ex·c) / det(a,b,c,d)`.

**Example:**
```rs
// Solve: 2x + y = 5
//         x + 3y = 7
let x: double = solve2d_x(2.0d, 1.0d, 1.0d, 3.0d,  5.0d, 7.0d);   // 1.6
let y: double = solve2d_y(2.0d, 1.0d, 1.0d, 3.0d,  5.0d, 7.0d);   // 1.8
```

> **Precondition:** The determinant must be non-zero. There is no guard — passing a singular matrix causes division by zero.

---

## Notes & Limitations

- **Double precision, not fixed-point:** All values are native `double`. Unlike other stdlib modules there is no ×10000 scale factor.
- **No `vec3d_dist` shorthand for 2D:** Use `vec2d_dist` for 2D point distances.
- **Normalize zero-vector:** Normalize functions return `0.0` component-wise rather than NaN or error when the input is a zero vector.
- **Singular matrix:** `solve2d_x`/`solve2d_y` and `mat2d_det` do not check for singular matrices. Guard with `mat2d_det(…) != 0.0d` before solving.
- **`math_hp` required:** Forgetting `import "stdlib/math_hp.mcrs"` causes a linker error at compile time since `double_sqrt` is undefined.
