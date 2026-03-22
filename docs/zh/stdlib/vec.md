# Vec

> 本文档由 `src/stdlib/vec.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [dot2d](#dot2d)
- [length2d_fixed](#length2d-fixed)
- [dot3d](#dot3d)
- [cross3d_x](#cross3d-x)
- [cross3d_y](#cross3d-y)
- [cross3d_z](#cross3d-z)

---

## `dot2d` <Badge type="info" text="v1.0.0" />

两个二维整数向量的点积

```redscript
fn dot2d(ax: int, ay: int, bx: int, by: int) -> int
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
let d = dot2d(3, 4, 3, 4)  // result: 25
```

---

## `length2d_fixed` <Badge type="info" text="v1.0.0" />

二维向量的欧几里得长度，结果 ×1000 定点数

```redscript
fn length2d_fixed(x: int, y: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | X 分量（保持 |x|, |y| ≤ ~1000 以避免溢出） |
| `y` | Y 分量 |

**返回：** sqrt(x²+y²) × 1000

**示例**

```redscript
let l = length2d_fixed(3, 4)  // result: 5000
```

---

## `dot3d` <Badge type="info" text="v1.0.0" />

两个三维整数向量的点积

```redscript
fn dot3d(ax: int, ay: int, az: int, bx: int, by: int, bz: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `ax` | 向量 A 的 X 分量 |
| `ay` | 向量 A 的 Y 分量 |
| `az` | 向量 A 的 Z 分量 |
| `bx` | 向量 B 的 X 分量 |
| `by` | 向量 B 的 Y 分量 |
| `bz` | 向量 B 的 Z 分量 |

**返回：** ax*bx + ay*by + az*bz

**示例**

```redscript
let d = dot3d(1, 0, 0, 1, 0, 0)  // result: 1
```

---

## `cross3d_x` <Badge type="info" text="v1.0.0" />

叉积 A×B 的 X 分量（ay*bz - az*by）

```redscript
fn cross3d_x(ax: int, ay: int, az: int, bx: int, by: int, bz: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `ax` | A 的 X 分量 |
| `bx` | B 的 X 分量 |

**返回：** ay*bz - az*by

---

## `cross3d_y` <Badge type="info" text="v1.0.0" />

叉积 A×B 的 Y 分量（az*bx - ax*bz）

```redscript
fn cross3d_y(ax: int, ay: int, az: int, bx: int, by: int, bz: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `ax` | A 的 X 分量 |
| `bx` | B 的 X 分量 |

**返回：** az*bx - ax*bz

---

## `cross3d_z` <Badge type="info" text="v1.0.0" />

叉积 A×B 的 Z 分量（ax*by - ay*bx）

```redscript
fn cross3d_z(ax: int, ay: int, az: int, bx: int, by: int, bz: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `ax` | A 的 X 分量 |
| `bx` | B 的 X 分量 |

**返回：** ax*by - ay*bx

**示例**

```redscript
let z = cross3d_z(1, 0, 0, 0, 1, 0)  // result: 1
```

---
