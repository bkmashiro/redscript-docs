# Matrix

> 本文档由 `src/stdlib/matrix.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [rotate2d_x](#rotate2d-x)
- [rotate2d_y](#rotate2d-y)
- [scale_x](#scale-x)
- [scale_y](#scale-y)
- [scale_z](#scale-z)
- [uniform_scale](#uniform-scale)
- [rotate_y_x](#rotate-y-x)
- [rotate_y_z](#rotate-y-z)
- [rotate_x_y](#rotate-x-y)
- [rotate_x_z](#rotate-x-z)
- [quat_sin_half](#quat-sin-half)
- [quat_cos_half](#quat-cos-half)
- [billboard_y](#billboard-y)
- [lerp_angle](#lerp-angle)
- [mat3_mul_elem](#mat3-mul-elem)
- [mat3_mul_vec3_elem](#mat3-mul-vec3-elem)
- [mat4_mul_elem](#mat4-mul-elem)
- [mat4_mul_vec4_elem](#mat4-mul-vec4-elem)

---

## `rotate2d_x`

**版本：** 2.0.0

将 (x, y) 绕原点旋转 angle_deg（×10000°）后的 X 分量

```redscript
fn rotate2d_x(x: int, y: int, angle_deg: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 输入 X 坐标 ×10000 |
| `y` | 输入 Y 坐标 ×10000 |
| `angle_deg` | 角度 ×10000（如 450000 = 45°） |

**返回：** x*cos(angle) - y*sin(angle)，×10000

**示例**

```redscript
let rx: int = rotate2d_x(10000, 0, 900000)
```

---

## `rotate2d_y`

**版本：** 2.0.0

将 (x, y) 绕原点旋转 angle_deg（×10000°）后的 Y 分量

```redscript
fn rotate2d_y(x: int, y: int, angle_deg: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 输入 X 坐标 ×10000 |
| `y` | 输入 Y 坐标 ×10000 |
| `angle_deg` | 角度 ×10000 |

**返回：** x*sin(angle) + y*cos(angle)，×10000

---

## `scale_x`

**版本：** 2.0.0

对 X 坐标施加缩放（sx_fx ×10000）

```redscript
fn scale_x(x: int, sx_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 输入 X 值 ×10000 |
| `sx_fx` | 缩放系数 ×10000（如 20000 = 2×） |

**返回：** x * sx_fx / 10000

---

## `scale_y`

**版本：** 2.0.0

对 Y 坐标施加缩放

```redscript
fn scale_y(y: int, sy_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `y` | 输入 Y 值 ×10000 |
| `sy_fx` | 缩放系数 ×10000 |

**返回：** y * sy_fx / 10000

---

## `scale_z`

**版本：** 2.0.0

对 Z 坐标施加缩放

```redscript
fn scale_z(z: int, sz_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `z` | 输入 Z 值 ×10000 |
| `sz_fx` | 缩放系数 ×10000 |

**返回：** z * sz_fx / 10000

---

## `uniform_scale`

**版本：** 2.0.0

对单个分量施加均匀缩放

```redscript
fn uniform_scale(v: int, s_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `v` | 输入分量 ×10000 |
| `s_fx` | 均匀缩放系数 ×10000 |

**返回：** v * s_fx / 10000

---

## `rotate_y_x`

**版本：** 2.0.0

绕 Y 轴旋转 angle_deg（×10000°）后的 X 分量

```redscript
fn rotate_y_x(x: int, z: int, angle_deg: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | Input X coordinate ×10000 |
| `z` | Input Z coordinate ×10000 |
| `angle_deg` | 角度 ×10000 |

**返回：** x*cos + z*sin，×10000

---

## `rotate_y_z`

**版本：** 2.0.0

绕 Y 轴旋转 angle_deg（×10000°）后的 Z 分量

```redscript
fn rotate_y_z(x: int, z: int, angle_deg: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | Input X coordinate ×10000 |
| `z` | Input Z coordinate ×10000 |
| `angle_deg` | 角度 ×10000 |

**返回：** -x*sin + z*cos，×10000

---

## `rotate_x_y`

**版本：** 2.0.0

绕 X 轴旋转 angle_deg（×10000°）后的 Y 分量

```redscript
fn rotate_x_y(y: int, z: int, angle_deg: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `y` | Input Y coordinate ×10000 |
| `z` | Input Z coordinate ×10000 |
| `angle_deg` | 角度 ×10000 |

**返回：** y*cos - z*sin，×10000

---

## `rotate_x_z`

**版本：** 2.0.0

绕 X 轴旋转 angle_deg（×10000°）后的 Z 分量

```redscript
fn rotate_x_z(y: int, z: int, angle_deg: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `y` | Input Y coordinate ×10000 |
| `z` | Input Z coordinate ×10000 |
| `angle_deg` | 角度 ×10000 |

**返回：** y*sin + z*cos，×10000

---

## `quat_sin_half`

**版本：** 2.0.0

用于 Display Entity Y 轴四元数的 sin(angle/2)，×1000

```redscript
fn quat_sin_half(angle_deg_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `angle_deg_fx` | 完整旋转角度 ×10000 |

**返回：** sin(angle/2)，×1000

---

## `quat_cos_half`

**版本：** 2.0.0

用于 Display Entity Y 轴四元数的 cos(angle/2)，×1000

```redscript
fn quat_cos_half(angle_deg_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `angle_deg_fx` | 完整旋转角度 ×10000 |

**返回：** cos(angle/2)，×1000

---

## `billboard_y`

**版本：** 2.0.0

计算朝向玩家的广告牌 Y 轴旋转角度

```redscript
fn billboard_y(player_yaw_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `player_yaw_fx` | 玩家偏航角 ×10000（来自实体 NBT Rotation[0]） |

**返回：** 广告牌 Y 旋转 ×10000，范围 [0, 3600000)

**示例**

```redscript
let by: int = billboard_y(player_yaw)
```

---

## `lerp_angle`

**版本：** 2.0.0

在两个角度（×10000）之间沿最短弧线性插值

```redscript
fn lerp_angle(a_fx: int, b_fx: int, t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a_fx` | 起始角度 ×10000 |
| `b_fx` | 终止角度 ×10000 |
| `t` | 插值系数 ×10000（0 = a，10000 = b） |

**返回：** 插值角度 ×10000

**示例**

```redscript
let a: int = lerp_angle(0, 3600000, 5000)
```

---

## `mat3_mul_elem`

**版本：** 2.0.0

计算 3×3 矩阵乘积 A×B 的元素 C[row][col]（×10000）

```redscript
fn mat3_mul_elem( a00: int, a01: int, a02: int, a10: int, a11: int, a12: int, a20: int, a21: int, a22: int, b00: int, b01: int, b02: int, b10: int, b11: int, b12: int,
```

**参数**

| 参数 | 说明 |
|------|------|
| `a00` | A[0,0] … a22: A[2,2]（9 个行主序元素，×10000） |
| `b00` | B[0,0] … b22: B[2,2]（9 个行主序元素，×10000） |
| `row` | 目标行索引（0–2） |
| `col` | 目标列索引（0–2） |

**返回：** C[row][col]，×10000

---

## `mat3_mul_vec3_elem`

**版本：** 2.0.0

计算 3×3 矩阵与列向量乘积 A×v 的一个分量

```redscript
fn mat3_mul_vec3_elem( a00: int, a01: int, a02: int, a10: int, a11: int, a12: int, a20: int, a21: int, a22: int, vx: int, vy: int, vz: int, comp: int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a00` | A 的 9 个行主序元素，×10000 |
| `vx` | Vector X ×10000   @param vy  Vector Y ×10000   @param vz  Vector Z ×10000 |
| `comp` | 输出分量索引（0=x, 1=y, 2=z） |

**返回：** (A×v)[comp]，×10000

---

## `mat4_mul_elem`

**版本：** 2.0.0

计算 4×4 矩阵乘积 A×B 的元素 C[row][col]（×10000）

```redscript
fn mat4_mul_elem( a00: int, a01: int, a02: int, a03: int, a10: int, a11: int, a12: int, a13: int, a20: int, a21: int, a22: int, a23: int, a30: int, a31: int, a32: int, a33: int, b00: int, b01: int, b02: int, b03: int,
```

**参数**

| 参数 | 说明 |
|------|------|
| `a00` | A 的 16 个行主序元素，×10000 |
| `b00` | B 的 16 个行主序元素，×10000 |
| `row` | 目标行索引（0–3） |
| `col` | 目标列索引（0–3） |

**返回：** C[row][col]，×10000

---

## `mat4_mul_vec4_elem`

**版本：** 2.0.0

计算 4×4 矩阵与齐次向量乘积 A×v 的一个分量

```redscript
fn mat4_mul_vec4_elem( a00: int, a01: int, a02: int, a03: int, a10: int, a11: int, a12: int, a13: int, a20: int, a21: int, a22: int, a23: int, a30: int, a31: int, a32: int, a33: int, vx: int, vy: int, vz: int, vw: int,
```

**参数**

| 参数 | 说明 |
|------|------|
| `a00` | A 的 16 个行主序元素，×10000 |
| `vx` | Vector X ×10000   @param vy  Y   @param vz  Z   @param vw  W |
| `comp` | 输出分量索引（0=x, 1=y, 2=z, 3=w） |

**返回：** (A×v)[comp]，×10000

---
