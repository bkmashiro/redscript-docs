# Quaternion

> Auto-generated from `src/stdlib/quaternion.mcrs` — do not edit manually.

## API

- [quat_identity_w](#quat-identity-w)
- [quat_identity_x](#quat-identity-x)
- [quat_identity_y](#quat-identity-y)
- [quat_identity_z](#quat-identity-z)
- [quat_axis_x_x](#quat-axis-x-x)
- [quat_axis_x_y](#quat-axis-x-y)
- [quat_axis_x_z](#quat-axis-x-z)
- [quat_axis_x_w](#quat-axis-x-w)
- [quat_axis_y_x](#quat-axis-y-x)
- [quat_axis_y_y](#quat-axis-y-y)
- [quat_axis_y_z](#quat-axis-y-z)
- [quat_axis_y_w](#quat-axis-y-w)
- [quat_axis_z_x](#quat-axis-z-x)
- [quat_axis_z_y](#quat-axis-z-y)
- [quat_axis_z_z](#quat-axis-z-z)
- [quat_axis_z_w](#quat-axis-z-w)
- [quat_mul_x](#quat-mul-x)
- [quat_mul_y](#quat-mul-y)
- [quat_mul_z](#quat-mul-z)
- [quat_mul_w](#quat-mul-w)
- [quat_conj_x](#quat-conj-x)
- [quat_conj_y](#quat-conj-y)
- [quat_conj_z](#quat-conj-z)
- [quat_conj_w](#quat-conj-w)
- [quat_mag_sq](#quat-mag-sq)
- [quat_dot](#quat-dot)
- [quat_slerp_x](#quat-slerp-x)
- [quat_slerp_y](#quat-slerp-y)
- [quat_slerp_z](#quat-slerp-z)
- [quat_slerp_w](#quat-slerp-w)
- [quat_euler_x](#quat-euler-x)
- [quat_euler_y](#quat-euler-y)
- [quat_euler_z](#quat-euler-z)
- [quat_euler_w](#quat-euler-w)

---

## `quat_identity_w`

**Since:** 2.0.0

W component of the identity quaternion `(0, 0, 0, 1)`.

```redscript
fn quat_identity_w(): int
```

**Returns:** `10000`

---

## `quat_identity_x`

**Since:** 2.0.0

X component of the identity quaternion.

```redscript
fn quat_identity_x(): int
```

**Returns:** `0`

---

## `quat_identity_y`

**Since:** 2.0.0

Y component of the identity quaternion.

```redscript
fn quat_identity_y(): int
```

**Returns:** `0`

---

## `quat_identity_z`

**Since:** 2.0.0

Z component of the identity quaternion.

```redscript
fn quat_identity_z(): int
```

**Returns:** `0`

---

## `quat_axis_x_x`

**Since:** 2.0.0

X component of a quaternion representing rotation by `angle_deg` around the X axis.

```redscript
fn quat_axis_x_x(angle_deg: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `angle_deg` | Rotation angle in degrees (integer) |

**Returns:** `sin(angle/2)` ×10000

---

## `quat_axis_x_y`

**Since:** 2.0.0

Y component of a quaternion representing rotation by `angle_deg` around the X axis.

```redscript
fn quat_axis_x_y(angle_deg: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `angle_deg` | Rotation angle in degrees |

**Returns:** `0`

---

## `quat_axis_x_z`

**Since:** 2.0.0

Z component of a quaternion representing rotation by `angle_deg` around the X axis.

```redscript
fn quat_axis_x_z(angle_deg: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `angle_deg` | Rotation angle in degrees |

**Returns:** `0`

---

## `quat_axis_x_w`

**Since:** 2.0.0

W component of a quaternion representing rotation by `angle_deg` around the X axis.

```redscript
fn quat_axis_x_w(angle_deg: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `angle_deg` | Rotation angle in degrees |

**Returns:** `cos(angle/2)` ×10000

---

## `quat_axis_y_x`

**Since:** 2.0.0

X component of a quaternion representing rotation by `angle_deg` around the Y axis.

```redscript
fn quat_axis_y_x(angle_deg: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `angle_deg` | Rotation angle in degrees |

**Returns:** `0`

---

## `quat_axis_y_y`

**Since:** 2.0.0

Y component of a quaternion representing rotation by `angle_deg` around the Y axis.

```redscript
fn quat_axis_y_y(angle_deg: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `angle_deg` | Rotation angle in degrees |

**Returns:** `sin(angle/2)` ×10000

---

## `quat_axis_y_z`

**Since:** 2.0.0

Z component of a quaternion representing rotation by `angle_deg` around the Y axis.

```redscript
fn quat_axis_y_z(angle_deg: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `angle_deg` | Rotation angle in degrees |

**Returns:** `0`

---

## `quat_axis_y_w`

**Since:** 2.0.0

W component of a quaternion representing rotation by `angle_deg` around the Y axis.

```redscript
fn quat_axis_y_w(angle_deg: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `angle_deg` | Rotation angle in degrees |

**Returns:** `cos(angle/2)` ×10000

---

## `quat_axis_z_x`

**Since:** 2.0.0

X component of a quaternion representing rotation by `angle_deg` around the Z axis.

```redscript
fn quat_axis_z_x(angle_deg: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `angle_deg` | Rotation angle in degrees |

**Returns:** `0`

---

## `quat_axis_z_y`

**Since:** 2.0.0

Y component of a quaternion representing rotation by `angle_deg` around the Z axis.

```redscript
fn quat_axis_z_y(angle_deg: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `angle_deg` | Rotation angle in degrees |

**Returns:** `0`

---

## `quat_axis_z_z`

**Since:** 2.0.0

Z component of a quaternion representing rotation by `angle_deg` around the Z axis.

```redscript
fn quat_axis_z_z(angle_deg: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `angle_deg` | Rotation angle in degrees |

**Returns:** `sin(angle/2)` ×10000

---

## `quat_axis_z_w`

**Since:** 2.0.0

W component of a quaternion representing rotation by `angle_deg` around the Z axis.

```redscript
fn quat_axis_z_w(angle_deg: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `angle_deg` | Rotation angle in degrees |

**Returns:** `cos(angle/2)` ×10000

---

## `quat_mul_x`

**Since:** 2.0.0

X component of quaternion product `a × b`.

```redscript
fn quat_mul_x(ax: int, ay: int, az: int, aw: int, bx: int, by: int, bz: int, bw: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ax` | @param ay  @param az  @param aw  Quaternion a components ×10000 |
| `bx` | @param by  @param bz  @param bw  Quaternion b components ×10000 |

**Returns:** X component of `a × b` ×10000

**Example**

```redscript
let rx: int = quat_mul_x(ax, ay, az, aw, bx, by, bz, bw)
```

---

## `quat_mul_y`

**Since:** 2.0.0

Y component of quaternion product `a × b`.

```redscript
fn quat_mul_y(ax: int, ay: int, az: int, aw: int, bx: int, by: int, bz: int, bw: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ax` | @param ay  @param az  @param aw  Quaternion a components ×10000 |
| `bx` | @param by  @param bz  @param bw  Quaternion b components ×10000 |

**Returns:** Y component of `a × b` ×10000

---

## `quat_mul_z`

**Since:** 2.0.0

Z component of quaternion product `a × b`.

```redscript
fn quat_mul_z(ax: int, ay: int, az: int, aw: int, bx: int, by: int, bz: int, bw: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ax` | @param ay  @param az  @param aw  Quaternion a components ×10000 |
| `bx` | @param by  @param bz  @param bw  Quaternion b components ×10000 |

**Returns:** Z component of `a × b` ×10000

---

## `quat_mul_w`

**Since:** 2.0.0

W component of quaternion product `a × b`.

```redscript
fn quat_mul_w(ax: int, ay: int, az: int, aw: int, bx: int, by: int, bz: int, bw: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ax` | @param ay  @param az  @param aw  Quaternion a components ×10000 |
| `bx` | @param by  @param bz  @param bw  Quaternion b components ×10000 |

**Returns:** W component of `a × b` ×10000

---

## `quat_conj_x`

**Since:** 2.0.0

X component of the conjugate of quaternion `(qx, qy, qz, qw)`.

```redscript
fn quat_conj_x(qx: int, qy: int, qz: int, qw: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `qx` | @param qy  @param qz  @param qw  Input quaternion ×10000 |

**Returns:** `-qx`

---

## `quat_conj_y`

**Since:** 2.0.0

Y component of the conjugate of quaternion `(qx, qy, qz, qw)`.

```redscript
fn quat_conj_y(qx: int, qy: int, qz: int, qw: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `qx` | @param qy  @param qz  @param qw  Input quaternion ×10000 |

**Returns:** `-qy`

---

## `quat_conj_z`

**Since:** 2.0.0

Z component of the conjugate of quaternion `(qx, qy, qz, qw)`.

```redscript
fn quat_conj_z(qx: int, qy: int, qz: int, qw: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `qx` | @param qy  @param qz  @param qw  Input quaternion ×10000 |

**Returns:** `-qz`

---

## `quat_conj_w`

**Since:** 2.0.0

W component of the conjugate of quaternion `(qx, qy, qz, qw)`.

```redscript
fn quat_conj_w(qx: int, qy: int, qz: int, qw: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `qx` | @param qy  @param qz  @param qw  Input quaternion ×10000 |

**Returns:** `qw` (unchanged)

---

## `quat_mag_sq`

**Since:** 2.0.0

Magnitude squared of a quaternion in ×10000 scale.

For a unit quaternion this should equal `10000`.

```redscript
fn quat_mag_sq(qx: int, qy: int, qz: int, qw: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `qx` | @param qy  @param qz  @param qw  Quaternion components ×10000 |

**Returns:** `qx²/10000 + qy²/10000 + qz²/10000 + qw²/10000` (×10000)

---

## `quat_dot`

**Since:** 2.0.0

Dot product of two quaternions in ×10000 scale.

```redscript
fn quat_dot(ax: int, ay: int, az: int, aw: int, bx: int, by: int, bz: int, bw: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ax` | @param ay  @param az  @param aw  Quaternion a ×10000 |
| `bx` | @param by  @param bz  @param bw  Quaternion b ×10000 |

**Returns:** `ax*bx/10000 + ay*by/10000 + az*bz/10000 + aw*bw/10000`

---

## `quat_slerp_x`

**Since:** 2.0.0

X component of the SLERP interpolation between quaternions `a` and `b` at `t/1000`.

Uses LERP + normalise (good approximation for small angles).

```redscript
fn quat_slerp_x(ax: int, ay: int, az: int, aw: int, bx: int, by: int, bz: int, bw: int, t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ax` | @param ay  @param az  @param aw  Start quaternion ×10000 |
| `bx` | @param by  @param bz  @param bw  End quaternion ×10000 |
| `t` | Interpolation factor ×1000 (0 = a, 1000 = b) |

**Returns:** X component of interpolated quaternion ×10000

**Example**

```redscript
let rx: int = quat_slerp_x(ax, ay, az, aw, bx, by, bz, bw, 500)
```

---

## `quat_slerp_y`

**Since:** 2.0.0

Y component of the SLERP interpolation between quaternions `a` and `b` at `t/1000`.

```redscript
fn quat_slerp_y(ax: int, ay: int, az: int, aw: int, bx: int, by: int, bz: int, bw: int, t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ax` | @param ay  @param az  @param aw  Start quaternion ×10000 |
| `bx` | @param by  @param bz  @param bw  End quaternion ×10000 |
| `t` | Interpolation factor ×1000 |

**Returns:** Y component of interpolated quaternion ×10000

---

## `quat_slerp_z`

**Since:** 2.0.0

Z component of the SLERP interpolation between quaternions `a` and `b` at `t/1000`.

```redscript
fn quat_slerp_z(ax: int, ay: int, az: int, aw: int, bx: int, by: int, bz: int, bw: int, t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ax` | @param ay  @param az  @param aw  Start quaternion ×10000 |
| `bx` | @param by  @param bz  @param bw  End quaternion ×10000 |
| `t` | Interpolation factor ×1000 |

**Returns:** Z component of interpolated quaternion ×10000

---

## `quat_slerp_w`

**Since:** 2.0.0

W component of the SLERP interpolation between quaternions `a` and `b` at `t/1000`.

```redscript
fn quat_slerp_w(ax: int, ay: int, az: int, aw: int, bx: int, by: int, bz: int, bw: int, t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ax` | @param ay  @param az  @param aw  Start quaternion ×10000 |
| `bx` | @param by  @param bz  @param bw  End quaternion ×10000 |
| `t` | Interpolation factor ×1000 |

**Returns:** W component of interpolated quaternion ×10000

---

## `quat_euler_x`

**Since:** 2.0.0

X component of the quaternion from Euler angles (YXZ order, MC convention).

```redscript
fn quat_euler_x(yaw: int, pitch: int, roll: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `yaw` | Y-axis rotation in degrees |
| `pitch` | X-axis rotation in degrees |
| `roll` | Z-axis rotation in degrees |

**Returns:** X component ×10000

**Example**

```redscript
let qx: int = quat_euler_x(90, 0, 0)
```

---

## `quat_euler_y`

**Since:** 2.0.0

Y component of the quaternion from Euler angles (YXZ order, MC convention).

```redscript
fn quat_euler_y(yaw: int, pitch: int, roll: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `yaw` | Y-axis rotation in degrees |
| `pitch` | X-axis rotation in degrees |
| `roll` | Z-axis rotation in degrees |

**Returns:** Y component ×10000

---

## `quat_euler_z`

**Since:** 2.0.0

Z component of the quaternion from Euler angles (YXZ order, MC convention).

```redscript
fn quat_euler_z(yaw: int, pitch: int, roll: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `yaw` | Y-axis rotation in degrees |
| `pitch` | X-axis rotation in degrees |
| `roll` | Z-axis rotation in degrees |

**Returns:** Z component ×10000

---

## `quat_euler_w`

**Since:** 2.0.0

W component of the quaternion from Euler angles (YXZ order, MC convention).

```redscript
fn quat_euler_w(yaw: int, pitch: int, roll: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `yaw` | Y-axis rotation in degrees |
| `pitch` | X-axis rotation in degrees |
| `roll` | Z-axis rotation in degrees |

**Returns:** W component ×10000

---
