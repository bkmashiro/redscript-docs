# `matrix` — Matrix math for Display Entities

Import: `import matrix;`

2D/3D transformation matrix helpers for MC Display Entities. Provides 2D rotation, scale, 3D Euler-angle rotation (Y-up), quaternion half-angle components, billboard rotation, and angle lerp. All values ×10000 unless noted; angles in degrees ×10000. Requires `math` for `sin_fixed`, `cos_fixed`, `abs`.

## Functions

### `rotate2d_x(x: int, y: int, angle_deg: int): int`

X component after 2D rotation by `angle_deg ×10000`. Uses `cos_fixed`/`sin_fixed`.

> **Requires:** `math:tables` NBT storage must be pre-loaded

**Example:**
```rs
import matrix;
let nx: int = rotate2d_x(1000, 0, 900000);  // 0  (rotated 90°)
```

---

### `rotate2d_y(x: int, y: int, angle_deg: int): int`

Y component after 2D rotation. Returns `x×sin + y×cos`.

> **Requires:** `math:tables` NBT storage must be pre-loaded

---

### `scale_x(x: int, sx_fx: int): int`

Scale x by `sx_fx ×10000` (e.g. 20000 = 2×).

---

### `scale_y(y: int, sy_fx: int): int`

Scale y component.

---

### `scale_z(z: int, sz_fx: int): int`

Scale z component.

---

### `uniform_scale(v: int, s_fx: int): int`

Apply uniform scale to a component value.

---

### `rotate_y_x(x: int, z: int, angle_deg: int): int`

X component after rotation around Y axis (Euler, Y-up). `angle_deg ×10000`.

> **Requires:** `math:tables` NBT storage must be pre-loaded

---

### `rotate_y_z(x: int, z: int, angle_deg: int): int`

Z component after rotation around Y axis.

> **Requires:** `math:tables` NBT storage must be pre-loaded

---

### `rotate_x_y(y: int, z: int, angle_deg: int): int`

Y component after rotation around X axis.

> **Requires:** `math:tables` NBT storage must be pre-loaded

---

### `rotate_x_z(y: int, z: int, angle_deg: int): int`

Z component after rotation around X axis.

> **Requires:** `math:tables` NBT storage must be pre-loaded

---

### `quat_sin_half(angle_deg_fx: int): int`

`sin(angle/2) ×1000` for quaternion construction. `angle_deg_fx` is degrees ×10000.

> **Requires:** `math:tables` NBT storage must be pre-loaded

---

### `quat_cos_half(angle_deg_fx: int): int`

`cos(angle/2) ×1000` for quaternion construction.

> **Requires:** `math:tables` NBT storage must be pre-loaded

---

### `billboard_y(player_yaw_fx: int): int`

Y rotation for a billboard facing the player. Input: player yaw ×10000. Returns the opposite direction mod 360°.

**Example:**
```rs
import matrix;
let rot: int = billboard_y(900000);  // 2700000 (facing opposite)
```

---

### `lerp_angle(a_fx: int, b_fx: int, t: int): int`

Lerp between two angles ×10000, taking the shortest angular path (normalises difference to [-1800000, 1800000]). `t ∈ [0, 10000]`.

**Example:**
```rs
import matrix;
let a: int = lerp_angle(0, 1800000, 5000);  // 900000
```

---

### `mat3_mul_elem(a00…a22: int, b00…b22: int, row: int, col: int): int`

计算两个 3×3 矩阵 **A** 和 **B** 乘积中第 `C[row][col]` 个元素。18 个矩阵分量逐一传入，均为 ×10000 定点数。返回 `C[row][col]` ×10000。

每个点积项除以 10000 以保持 ×10000 的定点精度：`C[r][c] = Σ A[r][k] × B[k][c] / 10000`。

**示例：**
```rs
import "stdlib/matrix.mcrs";
// 单位矩阵 × 单位矩阵 → 元素 (0,0) 应为 10000（= 1.0）
let v: int = mat3_mul_elem(
    10000, 0, 0,
    0, 10000, 0,
    0, 0, 10000,
    10000, 0, 0,
    0, 10000, 0,
    0, 0, 10000,
    0, 0
);  // 10000
```

---

### `mat3_mul_vec3_elem(a00…a22: int, vx: int, vy: int, vz: int, comp: int): int`

将 3×3 矩阵与列向量 `(vx, vy, vz)` ×10000 相乘，返回结果向量的某个分量。`comp`：0 = x，1 = y，2 = z。所有值均为 ×10000。

**示例：**
```rs
import "stdlib/matrix.mcrs";
// 2× 缩放矩阵应用于向量 (10000, 0, 0) → x 分量 = 20000
let x: int = mat3_mul_vec3_elem(
    20000, 0, 0,
    0, 20000, 0,
    0, 0, 20000,
    10000, 0, 0,
    0
);  // 20000
```

---

### `mat4_mul_elem(a00…a33: int, b00…b33: int, row: int, col: int): int`

计算两个 4×4 矩阵 **A** 和 **B** 乘积中第 `C[row][col]` 个元素。32 个分量逐一传入，均为 ×10000。返回 `C[row][col]` ×10000。适用于合成 MC Display Entity TRS 变换。

**示例：**
```rs
import "stdlib/matrix.mcrs";
// 单位矩阵 × 单位矩阵 → 元素 (1,1) = 10000
let v: int = mat4_mul_elem(
    10000, 0, 0, 0,
    0, 10000, 0, 0,
    0, 0, 10000, 0,
    0, 0, 0, 10000,
    10000, 0, 0, 0,
    0, 10000, 0, 0,
    0, 0, 10000, 0,
    0, 0, 0, 10000,
    1, 1
);  // 10000
```

---

### `mat4_mul_vec4_elem(a00…a33: int, vx: int, vy: int, vz: int, vw: int, comp: int): int`

将 4×4 矩阵与齐次列向量 `(vx, vy, vz, vw)` ×10000 相乘，返回结果的某个分量。`comp`：0 = x，1 = y，2 = z，3 = w。所有值均为 ×10000。

**示例：**
```rs
import "stdlib/matrix.mcrs";
// 平移矩阵（沿 x 平移 5.0）作用于点 (1.0, 0, 0, 1.0)
// 结果 x = 1.0 + 5.0 = 6.0 → 60000
let x: int = mat4_mul_vec4_elem(
    10000, 0, 0, 50000,
    0, 10000, 0, 0,
    0, 0, 10000, 0,
    0, 0, 0, 10000,
    10000, 0, 0, 10000,
    0
);  // 60000
```
