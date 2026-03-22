# Quaternion

> 本文档由 `src/stdlib/quaternion.mcrs` 自动生成，请勿手动编辑。

## API 列表

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

**版本：** 2.0.0

单位四元数 (0,0,0,1) 的 W 分量

```redscript
fn quat_identity_w(): int
```

**返回：** 10000

---

## `quat_identity_x`

**版本：** 2.0.0

单位四元数的 X 分量

```redscript
fn quat_identity_x(): int
```

**返回：** 0

---

## `quat_identity_y`

**版本：** 2.0.0

单位四元数的 Y 分量

```redscript
fn quat_identity_y(): int
```

**返回：** 0

---

## `quat_identity_z`

**版本：** 2.0.0

单位四元数的 Z 分量

```redscript
fn quat_identity_z(): int
```

**返回：** 0

---

## `quat_axis_x_x`

**版本：** 2.0.0

绕 X 轴旋转 angle_deg° 的四元数 X 分量

```redscript
fn quat_axis_x_x(angle_deg: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `angle_deg` | 旋转角度（整数，度） |

**返回：** sin(angle/2) ×10000

---

## `quat_axis_x_y`

**版本：** 2.0.0

绕 X 轴旋转 angle_deg° 的四元数 Y 分量

```redscript
fn quat_axis_x_y(angle_deg: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `angle_deg` | 旋转角度（度） |

**返回：** 0

---

## `quat_axis_x_z`

**版本：** 2.0.0

绕 X 轴旋转 angle_deg° 的四元数 Z 分量

```redscript
fn quat_axis_x_z(angle_deg: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `angle_deg` | 旋转角度（度） |

**返回：** 0

---

## `quat_axis_x_w`

**版本：** 2.0.0

绕 X 轴旋转 angle_deg° 的四元数 W 分量

```redscript
fn quat_axis_x_w(angle_deg: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `angle_deg` | 旋转角度（度） |

**返回：** cos(angle/2) ×10000

---

## `quat_axis_y_x`

**版本：** 2.0.0

绕 Y 轴旋转 angle_deg° 的四元数 X 分量

```redscript
fn quat_axis_y_x(angle_deg: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `angle_deg` | 旋转角度（度） |

**返回：** 0

---

## `quat_axis_y_y`

**版本：** 2.0.0

绕 Y 轴旋转 angle_deg° 的四元数 Y 分量

```redscript
fn quat_axis_y_y(angle_deg: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `angle_deg` | 旋转角度（度） |

**返回：** sin(angle/2) ×10000

---

## `quat_axis_y_z`

**版本：** 2.0.0

绕 Y 轴旋转 angle_deg° 的四元数 Z 分量

```redscript
fn quat_axis_y_z(angle_deg: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `angle_deg` | 旋转角度（度） |

**返回：** 0

---

## `quat_axis_y_w`

**版本：** 2.0.0

绕 Y 轴旋转 angle_deg° 的四元数 W 分量

```redscript
fn quat_axis_y_w(angle_deg: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `angle_deg` | 旋转角度（度） |

**返回：** cos(angle/2) ×10000

---

## `quat_axis_z_x`

**版本：** 2.0.0

绕 Z 轴旋转 angle_deg° 的四元数 X 分量

```redscript
fn quat_axis_z_x(angle_deg: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `angle_deg` | 旋转角度（度） |

**返回：** 0

---

## `quat_axis_z_y`

**版本：** 2.0.0

绕 Z 轴旋转 angle_deg° 的四元数 Y 分量

```redscript
fn quat_axis_z_y(angle_deg: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `angle_deg` | 旋转角度（度） |

**返回：** 0

---

## `quat_axis_z_z`

**版本：** 2.0.0

绕 Z 轴旋转 angle_deg° 的四元数 Z 分量

```redscript
fn quat_axis_z_z(angle_deg: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `angle_deg` | 旋转角度（度） |

**返回：** sin(angle/2) ×10000

---

## `quat_axis_z_w`

**版本：** 2.0.0

绕 Z 轴旋转 angle_deg° 的四元数 W 分量

```redscript
fn quat_axis_z_w(angle_deg: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `angle_deg` | 旋转角度（度） |

**返回：** cos(angle/2) ×10000

---

## `quat_mul_x`

**版本：** 2.0.0

四元数乘积 a×b 的 X 分量（所有分量 ×10000）

```redscript
fn quat_mul_x(ax: int, ay: int, az: int, aw: int, bx: int, by: int, bz: int, bw: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `ax` | @param ay  @param az  @param aw  Quaternion a components ×10000 |
| `bx` | @param by  @param bz  @param bw  Quaternion b components ×10000 |

**返回：** (a×b) 的 X 分量 ×10000

**示例**

```redscript
let rx: int = quat_mul_x(ax, ay, az, aw, bx, by, bz, bw)
```

---

## `quat_mul_y`

**版本：** 2.0.0

四元数乘积 a×b 的 Y 分量

```redscript
fn quat_mul_y(ax: int, ay: int, az: int, aw: int, bx: int, by: int, bz: int, bw: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `ax` | @param ay  @param az  @param aw  Quaternion a components ×10000 |
| `bx` | @param by  @param bz  @param bw  Quaternion b components ×10000 |

**返回：** (a×b) 的 Y 分量 ×10000

---

## `quat_mul_z`

**版本：** 2.0.0

四元数乘积 a×b 的 Z 分量

```redscript
fn quat_mul_z(ax: int, ay: int, az: int, aw: int, bx: int, by: int, bz: int, bw: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `ax` | @param ay  @param az  @param aw  Quaternion a components ×10000 |
| `bx` | @param by  @param bz  @param bw  Quaternion b components ×10000 |

**返回：** (a×b) 的 Z 分量 ×10000

---

## `quat_mul_w`

**版本：** 2.0.0

四元数乘积 a×b 的 W 分量

```redscript
fn quat_mul_w(ax: int, ay: int, az: int, aw: int, bx: int, by: int, bz: int, bw: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `ax` | @param ay  @param az  @param aw  Quaternion a components ×10000 |
| `bx` | @param by  @param bz  @param bw  Quaternion b components ×10000 |

**返回：** (a×b) 的 W 分量 ×10000

---

## `quat_conj_x`

**版本：** 2.0.0

四元数共轭的 X 分量

```redscript
fn quat_conj_x(qx: int, qy: int, qz: int, qw: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `qx` | @param qy  @param qz  @param qw  Input quaternion ×10000 |

**返回：** -qx

---

## `quat_conj_y`

**版本：** 2.0.0

四元数共轭的 Y 分量

```redscript
fn quat_conj_y(qx: int, qy: int, qz: int, qw: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `qx` | @param qy  @param qz  @param qw  Input quaternion ×10000 |

**返回：** -qy

---

## `quat_conj_z`

**版本：** 2.0.0

四元数共轭的 Z 分量

```redscript
fn quat_conj_z(qx: int, qy: int, qz: int, qw: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `qx` | @param qy  @param qz  @param qw  Input quaternion ×10000 |

**返回：** -qz

---

## `quat_conj_w`

**版本：** 2.0.0

四元数共轭的 W 分量（不变）

```redscript
fn quat_conj_w(qx: int, qy: int, qz: int, qw: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `qx` | @param qy  @param qz  @param qw  Input quaternion ×10000 |

**返回：** qw

---

## `quat_mag_sq`

**版本：** 2.0.0

四元数的模平方（×10000）；单位四元数应等于 10000

```redscript
fn quat_mag_sq(qx: int, qy: int, qz: int, qw: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `qx` | @param qy  @param qz  @param qw  Quaternion components ×10000 |

**返回：** qx²/10000 + qy²/10000 + qz²/10000 + qw²/10000

---

## `quat_dot`

**版本：** 2.0.0

两个四元数的点积（×10000）

```redscript
fn quat_dot(ax: int, ay: int, az: int, aw: int, bx: int, by: int, bz: int, bw: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `ax` | @param ay  @param az  @param aw  Quaternion a ×10000 |
| `bx` | @param by  @param bz  @param bw  Quaternion b ×10000 |

**返回：** ax*bx/10000 + ay*by/10000 + az*bz/10000 + aw*bw/10000

---

## `quat_slerp_x`

**版本：** 2.0.0

两个四元数在 t/1000 处球面线性插值的 X 分量（LERP + 归一化近似）

```redscript
fn quat_slerp_x(ax: int, ay: int, az: int, aw: int, bx: int, by: int, bz: int, bw: int, t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `ax` | @param ay  @param az  @param aw  Start quaternion ×10000 |
| `bx` | @param by  @param bz  @param bw  End quaternion ×10000 |
| `t` | 插值系数 ×1000（0=a，1000=b） |

**返回：** 插值四元数的 X 分量 ×10000

**示例**

```redscript
let rx: int = quat_slerp_x(ax, ay, az, aw, bx, by, bz, bw, 500)
```

---

## `quat_slerp_y`

**版本：** 2.0.0

两个四元数在 t/1000 处球面线性插值的 Y 分量

```redscript
fn quat_slerp_y(ax: int, ay: int, az: int, aw: int, bx: int, by: int, bz: int, bw: int, t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `ax` | @param ay  @param az  @param aw  Start quaternion ×10000 |
| `bx` | @param by  @param bz  @param bw  End quaternion ×10000 |
| `t` | Interpolation factor ×1000 |

**返回：** 插值四元数的 Y 分量 ×10000

---

## `quat_slerp_z`

**版本：** 2.0.0

两个四元数在 t/1000 处球面线性插值的 Z 分量

```redscript
fn quat_slerp_z(ax: int, ay: int, az: int, aw: int, bx: int, by: int, bz: int, bw: int, t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `ax` | @param ay  @param az  @param aw  Start quaternion ×10000 |
| `bx` | @param by  @param bz  @param bw  End quaternion ×10000 |
| `t` | Interpolation factor ×1000 |

**返回：** 插值四元数的 Z 分量 ×10000

---

## `quat_slerp_w`

**版本：** 2.0.0

两个四元数在 t/1000 处球面线性插值的 W 分量

```redscript
fn quat_slerp_w(ax: int, ay: int, az: int, aw: int, bx: int, by: int, bz: int, bw: int, t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `ax` | @param ay  @param az  @param aw  Start quaternion ×10000 |
| `bx` | @param by  @param bz  @param bw  End quaternion ×10000 |
| `t` | Interpolation factor ×1000 |

**返回：** 插值四元数的 W 分量 ×10000

---

## `quat_euler_x`

**版本：** 2.0.0

欧拉角（YXZ 顺序，MC 约定）转换为四元数的 X 分量

```redscript
fn quat_euler_x(yaw: int, pitch: int, roll: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `yaw` | Y 轴旋转（度） |
| `pitch` | X 轴旋转（度） |
| `roll` | Z 轴旋转（度） |

**返回：** X 分量 ×10000

**示例**

```redscript
let qx: int = quat_euler_x(90, 0, 0)
```

---

## `quat_euler_y`

**版本：** 2.0.0

欧拉角（YXZ 顺序）转换为四元数的 Y 分量

```redscript
fn quat_euler_y(yaw: int, pitch: int, roll: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `yaw` | Y 轴旋转（度） |
| `pitch` | X 轴旋转（度） |
| `roll` | Z 轴旋转（度） |

**返回：** Y 分量 ×10000

---

## `quat_euler_z`

**版本：** 2.0.0

欧拉角（YXZ 顺序）转换为四元数的 Z 分量

```redscript
fn quat_euler_z(yaw: int, pitch: int, roll: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `yaw` | Y 轴旋转（度） |
| `pitch` | X 轴旋转（度） |
| `roll` | Z 轴旋转（度） |

**返回：** Z 分量 ×10000

---

## `quat_euler_w`

**版本：** 2.0.0

欧拉角（YXZ 顺序）转换为四元数的 W 分量

```redscript
fn quat_euler_w(yaw: int, pitch: int, roll: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `yaw` | Y 轴旋转（度） |
| `pitch` | X 轴旋转（度） |
| `roll` | Z 轴旋转（度） |

**返回：** W 分量 ×10000

---
