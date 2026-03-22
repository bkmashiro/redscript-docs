# Matrix

> Auto-generated from `src/stdlib/matrix.mcrs` — do not edit manually.

## API

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

## `rotate2d_x` <Badge type="info" text="Since v2.0.0" />

X component after 2D rotation of `(x, y)` by `angle_deg` (×10000).

```redscript
fn rotate2d_x(x: int, y: int, angle_deg: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Input X coordinate ×10000 |
| `y` | Input Y coordinate ×10000 |
| `angle_deg` | Angle in degrees ×10000 (e.g. `450000` = 45°) |

**Returns:** `x*cos(angle) - y*sin(angle)` in ×10000

**Example**

```redscript
let rx: int = rotate2d_x(10000, 0, 900000)
```

---

## `rotate2d_y` <Badge type="info" text="Since v2.0.0" />

Y component after 2D rotation of `(x, y)` by `angle_deg` (×10000).

```redscript
fn rotate2d_y(x: int, y: int, angle_deg: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Input X coordinate ×10000 |
| `y` | Input Y coordinate ×10000 |
| `angle_deg` | Angle in degrees ×10000 |

**Returns:** `x*sin(angle) + y*cos(angle)` in ×10000

---

## `scale_x` <Badge type="info" text="Since v2.0.0" />

Scale X coordinate by `sx_fx` (×10000).

```redscript
fn scale_x(x: int, sx_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Input X value ×10000 |
| `sx_fx` | Scale factor ×10000 (e.g. `20000` = 2×) |

**Returns:** `x * sx_fx / 10000`

---

## `scale_y` <Badge type="info" text="Since v2.0.0" />

Scale Y coordinate by `sy_fx` (×10000).

```redscript
fn scale_y(y: int, sy_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `y` | Input Y value ×10000 |
| `sy_fx` | Scale factor ×10000 |

**Returns:** `y * sy_fx / 10000`

---

## `scale_z` <Badge type="info" text="Since v2.0.0" />

Scale Z coordinate by `sz_fx` (×10000).

```redscript
fn scale_z(z: int, sz_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `z` | Input Z value ×10000 |
| `sz_fx` | Scale factor ×10000 |

**Returns:** `z * sz_fx / 10000`

---

## `uniform_scale` <Badge type="info" text="Since v2.0.0" />

Apply a uniform scale factor to a single component.

```redscript
fn uniform_scale(v: int, s_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `v` | Input component value ×10000 |
| `s_fx` | Uniform scale factor ×10000 |

**Returns:** `v * s_fx / 10000`

---

## `rotate_y_x` <Badge type="info" text="Since v2.0.0" />

X component after rotation around the Y axis by `angle_deg` (×10000).

```redscript
fn rotate_y_x(x: int, z: int, angle_deg: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Input X coordinate ×10000 |
| `z` | Input Z coordinate ×10000 |
| `angle_deg` | Angle in degrees ×10000 |

**Returns:** `x*cos(angle) + z*sin(angle)` in ×10000

---

## `rotate_y_z` <Badge type="info" text="Since v2.0.0" />

Z component after rotation around the Y axis by `angle_deg` (×10000).

```redscript
fn rotate_y_z(x: int, z: int, angle_deg: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Input X coordinate ×10000 |
| `z` | Input Z coordinate ×10000 |
| `angle_deg` | Angle in degrees ×10000 |

**Returns:** `-x*sin(angle) + z*cos(angle)` in ×10000

---

## `rotate_x_y` <Badge type="info" text="Since v2.0.0" />

Y component after rotation around the X axis by `angle_deg` (×10000).

```redscript
fn rotate_x_y(y: int, z: int, angle_deg: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `y` | Input Y coordinate ×10000 |
| `z` | Input Z coordinate ×10000 |
| `angle_deg` | Angle in degrees ×10000 |

**Returns:** `y*cos(angle) - z*sin(angle)` in ×10000

---

## `rotate_x_z` <Badge type="info" text="Since v2.0.0" />

Z component after rotation around the X axis by `angle_deg` (×10000).

```redscript
fn rotate_x_z(y: int, z: int, angle_deg: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `y` | Input Y coordinate ×10000 |
| `z` | Input Z coordinate ×10000 |
| `angle_deg` | Angle in degrees ×10000 |

**Returns:** `y*sin(angle) + z*cos(angle)` in ×10000

---

## `quat_sin_half` <Badge type="info" text="Since v2.0.0" />

sin(angle/2) in ×1000 for a Display Entity Y-axis quaternion.

```redscript
fn quat_sin_half(angle_deg_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `angle_deg_fx` | Full rotation angle in degrees ×10000 |

**Returns:** `sin(angle/2)` in ×1000

---

## `quat_cos_half` <Badge type="info" text="Since v2.0.0" />

cos(angle/2) in ×1000 for a Display Entity Y-axis quaternion.

```redscript
fn quat_cos_half(angle_deg_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `angle_deg_fx` | Full rotation angle in degrees ×10000 |

**Returns:** `cos(angle/2)` in ×1000

---

## `billboard_y` <Badge type="info" text="Since v2.0.0" />

Compute the Y rotation for a billboard that faces the player.

```redscript
fn billboard_y(player_yaw_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `player_yaw_fx` | Player yaw angle ×10000 (from entity NBT `Rotation[0]`) |

**Returns:** Billboard Y rotation ×10000 (opposite of player yaw, in [0, 3600000))

**Example**

```redscript
let by: int = billboard_y(player_yaw)
```

---

## `lerp_angle` <Badge type="info" text="Since v2.0.0" />

Interpolate between two angles (×10000) taking the shortest arc.

Normalises the angular difference to [−1800000, 1800000] before interpolating.

```redscript
fn lerp_angle(a_fx: int, b_fx: int, t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a_fx` | Start angle ×10000 |
| `b_fx` | End angle ×10000 |
| `t` | Interpolation factor ×10000 (0 = a, 10000 = b) |

**Returns:** Interpolated angle ×10000

**Example**

```redscript
let a: int = lerp_angle(0, 3600000, 5000)
```

---

## `mat3_mul_elem` <Badge type="info" text="Since v2.0.0" />

Compute element `C[row][col]` of the 3×3 matrix product `A × B`.

All matrix values are ×10000 fixed-point. Pass all 18 components of A and B
individually. `row` and `col` are each in {0, 1, 2}.

```redscript
fn mat3_mul_elem( a00: int, a01: int, a02: int, a10: int, a11: int, a12: int, a20: int, a21: int, a22: int, b00: int, b01: int, b02: int, b10: int, b11: int, b12: int,
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a00` | A[0,0] … a22  A[2,2]  (9 elements, row-major) |
| `b00` | B[0,0] … b22  B[2,2]  (9 elements, row-major) |
| `row` | Target row index (0–2) |
| `col` | Target column index (0–2) |

**Returns:** `C[row][col]` in ×10000

---

## `mat3_mul_vec3_elem` <Badge type="info" text="Since v2.0.0" />

Compute one component of the 3×3 matrix–vector product `A × v`.

```redscript
fn mat3_mul_vec3_elem( a00: int, a01: int, a02: int, a10: int, a11: int, a12: int, a20: int, a21: int, a22: int, vx: int, vy: int, vz: int, comp: int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a00` | A[0,0] … a22  A[2,2]  (9 elements, row-major, ×10000) |
| `vx` | Vector X ×10000   @param vy  Vector Y ×10000   @param vz  Vector Z ×10000 |
| `comp` | Output component index (0=x, 1=y, 2=z) |

**Returns:** `(A × v)[comp]` in ×10000

---

## `mat4_mul_elem` <Badge type="info" text="Since v2.0.0" />

Compute element `C[row][col]` of the 4×4 matrix product `A × B`.

Row-major layout, all values ×10000. `row` and `col` are each in {0, 1, 2, 3}.

```redscript
fn mat4_mul_elem( a00: int, a01: int, a02: int, a03: int, a10: int, a11: int, a12: int, a13: int, a20: int, a21: int, a22: int, a23: int, a30: int, a31: int, a32: int, a33: int, b00: int, b01: int, b02: int, b03: int,
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a00` | A[0,0] … a33  A[3,3]  (16 elements, row-major, ×10000) |
| `b00` | B[0,0] … b33  B[3,3]  (16 elements, row-major, ×10000) |
| `row` | Target row index (0–3) |
| `col` | Target column index (0–3) |

**Returns:** `C[row][col]` in ×10000

---

## `mat4_mul_vec4_elem` <Badge type="info" text="Since v2.0.0" />

Compute one component of the 4×4 matrix–homogeneous-vector product `A × v`.

```redscript
fn mat4_mul_vec4_elem( a00: int, a01: int, a02: int, a03: int, a10: int, a11: int, a12: int, a13: int, a20: int, a21: int, a22: int, a23: int, a30: int, a31: int, a32: int, a33: int, vx: int, vy: int, vz: int, vw: int,
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a00` | A[0,0] … a33  A[3,3]  (16 elements, row-major, ×10000) |
| `vx` | Vector X ×10000   @param vy  Y   @param vz  Z   @param vw  W |
| `comp` | Output component index (0=x, 1=y, 2=z, 3=w) |

**Returns:** `(A × v)[comp]` in ×10000

---
