# Vec

> Auto-generated from `src/stdlib/vec.mcrs` — do not edit manually.

## API

- [dot2d](#dot2d)
- [length2d_fixed](#length2d-fixed)
- [dot3d](#dot3d)
- [cross3d_x](#cross3d-x)
- [cross3d_y](#cross3d-y)
- [cross3d_z](#cross3d-z)

---

## `dot2d` <Badge type="info" text="Since v1.0.0" />

Dot product of two 2D integer vectors.

```redscript
fn dot2d(ax: int, ay: int, bx: int, by: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ax` | X component of vector A |
| `ay` | Y component of vector A |
| `bx` | X component of vector B |
| `by` | Y component of vector B |

**Returns:** ax*bx + ay*by

**Example**

```redscript
let d = dot2d(3, 4, 3, 4)  // result: 25
```

---

## `length2d_fixed` <Badge type="info" text="Since v1.0.0" />

Euclidean length of a 2D vector, returned as ×1000 fixed-point.

```redscript
fn length2d_fixed(x: int, y: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | X component (raw integer; keep |x|,|y| ≤ ~1000 to avoid overflow) |
| `y` | Y component |

**Returns:** sqrt(x²+y²) × 1000

**Example**

```redscript
let l = length2d_fixed(3, 4)  // result: 5000
```

---

## `dot3d` <Badge type="info" text="Since v1.0.0" />

Dot product of two 3D integer vectors.

```redscript
fn dot3d(ax: int, ay: int, az: int, bx: int, by: int, bz: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ax` | X component of vector A |
| `ay` | Y component of vector A |
| `az` | Z component of vector A |
| `bx` | X component of vector B |
| `by` | Y component of vector B |
| `bz` | Z component of vector B |

**Returns:** ax*bx + ay*by + az*bz

**Example**

```redscript
let d = dot3d(1, 0, 0, 1, 0, 0)  // result: 1
```

---

## `cross3d_x` <Badge type="info" text="Since v1.0.0" />

X component of the cross product A×B (ay*bz − az*by).

```redscript
fn cross3d_x(ax: int, ay: int, az: int, bx: int, by: int, bz: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ax` | X of A  @param ay  Y of A  @param az  Z of A |
| `bx` | X of B  @param by  Y of B  @param bz  Z of B |

**Returns:** ay*bz - az*by

---

## `cross3d_y` <Badge type="info" text="Since v1.0.0" />

Y component of the cross product A×B (az*bx − ax*bz).

```redscript
fn cross3d_y(ax: int, ay: int, az: int, bx: int, by: int, bz: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ax` | X of A  @param ay  Y of A  @param az  Z of A |
| `bx` | X of B  @param by  Y of B  @param bz  Z of B |

**Returns:** az*bx - ax*bz

---

## `cross3d_z` <Badge type="info" text="Since v1.0.0" />

Z component of the cross product A×B (ax*by − ay*bx).

```redscript
fn cross3d_z(ax: int, ay: int, az: int, bx: int, by: int, bz: int) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ax` | X of A  @param ay  Y of A  @param az  Z of A |
| `bx` | X of B  @param by  Y of B  @param bz  Z of B |

**Returns:** ax*by - ay*bx

**Example**

```redscript
let z = cross3d_z(1, 0, 0, 0, 1, 0)  // result: 1
```

---
