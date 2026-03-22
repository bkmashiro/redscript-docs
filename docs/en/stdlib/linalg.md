# Linalg

> Auto-generated from `src/stdlib/linalg.mcrs` — do not edit manually.

## API

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

## `vec2d_dot`

**Since:** 2.0.0

Dot product of two 2D vectors.

```redscript
fn vec2d_dot(ax: double, ay: double, bx: double, by: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ax` | X component of vector A |
| `ay` | Y component of vector A |
| `bx` | X component of vector B |
| `by` | Y component of vector B |

**Returns:** `ax*bx + ay*by`

**Example**

```redscript
let d: double = vec2d_dot(1.0d, 0.0d, 0.0d, 1.0d)
```

---

## `vec2d_length`

**Since:** 2.0.0

Euclidean length of a 2D vector.

```redscript
fn vec2d_length(x: double, y: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | X component |
| `y` | Y component |

**Returns:** `sqrt(x² + y²)`

**Example**

```redscript
let len: double = vec2d_length(3.0d, 4.0d)
```

---

## `vec2d_dist`

**Since:** 2.0.0

Euclidean distance between two 2D points.

```redscript
fn vec2d_dist(ax: double, ay: double, bx: double, by: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ax` | X coordinate of point A |
| `ay` | Y coordinate of point A |
| `bx` | X coordinate of point B |
| `by` | Y coordinate of point B |

**Returns:** `sqrt((ax-bx)² + (ay-by)²)`

**Example**

```redscript
let dist: double = vec2d_dist(0.0d, 0.0d, 3.0d, 4.0d)
```

---

## `vec2d_normalize_x`

**Since:** 2.0.0

X component of the normalized unit vector for a 2D vector.

Returns `0.0` if the vector has zero length.

```redscript
fn vec2d_normalize_x(x: double, y: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | X component |
| `y` | Y component |

**Returns:** `x / ||(x, y)||`, or `0.0` for a zero vector

**Example**

```redscript
let nx: double = vec2d_normalize_x(3.0d, 4.0d)
```

---

## `vec2d_normalize_y`

**Since:** 2.0.0

Y component of the normalized unit vector for a 2D vector.

Returns `0.0` if the vector has zero length.

```redscript
fn vec2d_normalize_y(x: double, y: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | X component |
| `y` | Y component |

**Returns:** `y / ||(x, y)||`, or `0.0` for a zero vector

**Example**

```redscript
let ny: double = vec2d_normalize_y(3.0d, 4.0d)
```

---

## `vec3d_dot`

**Since:** 2.0.0

Dot product of two 3D vectors.

```redscript
fn vec3d_dot(ax: double, ay: double, az: double, bx: double, by: double, bz: double): double
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

**Returns:** `ax*bx + ay*by + az*bz`

**Example**

```redscript
let d: double = vec3d_dot(1.0d, 0.0d, 0.0d, 0.0d, 1.0d, 0.0d)
```

---

## `vec3d_length`

**Since:** 2.0.0

Euclidean length of a 3D vector.

```redscript
fn vec3d_length(x: double, y: double, z: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | X component |
| `y` | Y component |
| `z` | Z component |

**Returns:** `sqrt(x² + y² + z²)`

**Example**

```redscript
let len: double = vec3d_length(1.0d, 2.0d, 2.0d)
```

---

## `vec3d_dist`

**Since:** 2.0.0

Euclidean distance between two 3D points.

```redscript
fn vec3d_dist(ax: double, ay: double, az: double, bx: double, by: double, bz: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ax` | X coordinate of point A |
| `ay` | Y coordinate of point A |
| `az` | Z coordinate of point A |
| `bx` | X coordinate of point B |
| `by` | Y coordinate of point B |
| `bz` | Z coordinate of point B |

**Returns:** `sqrt((ax-bx)² + (ay-by)² + (az-bz)²)`

---

## `vec3d_cross_x`

**Since:** 2.0.0

X component of the cross product `a × b`.

```redscript
fn vec3d_cross_x(ax: double, ay: double, az: double, bx: double, by: double, bz: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ax` | X of A   @param ay  Y of A   @param az  Z of A |
| `bx` | X of B   @param by  Y of B   @param bz  Z of B |

**Returns:** `ay*bz - az*by`

---

## `vec3d_cross_y`

**Since:** 2.0.0

Y component of the cross product `a × b`.

```redscript
fn vec3d_cross_y(ax: double, ay: double, az: double, bx: double, by: double, bz: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ax` | X of A   @param ay  Y of A   @param az  Z of A |
| `bx` | X of B   @param by  Y of B   @param bz  Z of B |

**Returns:** `az*bx - ax*bz`

---

## `vec3d_cross_z`

**Since:** 2.0.0

Z component of the cross product `a × b`.

```redscript
fn vec3d_cross_z(ax: double, ay: double, az: double, bx: double, by: double, bz: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `ax` | X of A   @param ay  Y of A   @param az  Z of A |
| `bx` | X of B   @param by  Y of B   @param bz  Z of B |

**Returns:** `ax*by - ay*bx`

---

## `vec3d_normalize_x`

**Since:** 2.0.0

X component of the normalized unit vector for a 3D vector.

Returns `0.0` if the vector has zero length.

```redscript
fn vec3d_normalize_x(x: double, y: double, z: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | X component   @param y  Y component   @param z  Z component |

**Returns:** `x / ||(x, y, z)||`, or `0.0` for a zero vector

**Example**

```redscript
let nx: double = vec3d_normalize_x(3.0d, 4.0d, 0.0d)
```

---

## `vec3d_normalize_y`

**Since:** 2.0.0

Y component of the normalized unit vector for a 3D vector.

Returns `0.0` if the vector has zero length.

```redscript
fn vec3d_normalize_y(x: double, y: double, z: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | X component   @param y  Y component   @param z  Z component |

**Returns:** `y / ||(x, y, z)||`, or `0.0` for a zero vector

---

## `vec3d_normalize_z`

**Since:** 2.0.0

Z component of the normalized unit vector for a 3D vector.

Returns `0.0` if the vector has zero length.

```redscript
fn vec3d_normalize_z(x: double, y: double, z: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | X component   @param y  Y component   @param z  Z component |

**Returns:** `z / ||(x, y, z)||`, or `0.0` for a zero vector

---

## `mat2d_det`

**Since:** 2.0.0

Determinant of a 2×2 matrix `[[a, b], [c, d]]`.

```redscript
fn mat2d_det(a: double, b: double, c: double, d: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | Element [0,0]   @param b  Element [0,1] |
| `c` | Element [1,0]   @param d  Element [1,1] |

**Returns:** `a*d - b*c`

**Example**

```redscript
let det: double = mat2d_det(1.0d, 2.0d, 3.0d, 4.0d)
```

---

## `mat2d_mul_r0c0`

**Since:** 2.0.0

Element [0,0] of the 2×2 matrix product `M0 × M1`.

```redscript
fn mat2d_mul_r0c0(a0: double, b0: double, c0: double, d0: double, a1: double, b1: double, c1: double, d1: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a0` | M0 row-major elements (a0, b0, c0, d0) |
| `a1` | M1 row-major elements (a1, b1, c1, d1) |

**Returns:** `a0*a1 + b0*c1`

---

## `mat2d_mul_r0c1`

**Since:** 2.0.0

Element [0,1] of the 2×2 matrix product `M0 × M1`.

```redscript
fn mat2d_mul_r0c1(a0: double, b0: double, c0: double, d0: double, a1: double, b1: double, c1: double, d1: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a0` | M0 row-major elements   @param a1  M1 row-major elements |

**Returns:** `a0*b1 + b0*d1`

---

## `mat2d_mul_r1c0`

**Since:** 2.0.0

Element [1,0] of the 2×2 matrix product `M0 × M1`.

```redscript
fn mat2d_mul_r1c0(a0: double, b0: double, c0: double, d0: double, a1: double, b1: double, c1: double, d1: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a0` | M0 row-major elements   @param a1  M1 row-major elements |

**Returns:** `c0*a1 + d0*c1`

---

## `mat2d_mul_r1c1`

**Since:** 2.0.0

Element [1,1] of the 2×2 matrix product `M0 × M1`.

```redscript
fn mat2d_mul_r1c1(a0: double, b0: double, c0: double, d0: double, a1: double, b1: double, c1: double, d1: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a0` | M0 row-major elements   @param a1  M1 row-major elements |

**Returns:** `c0*b1 + d0*d1`

---

## `mat2d_vecmul_x`

**Since:** 2.0.0

X component of the 2×2 matrix–vector product `M × v`.

```redscript
fn mat2d_vecmul_x(a: double, b: double, c: double, d: double, vx: double, vy: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | M[0,0]   @param b  M[0,1]   @param c  M[1,0]   @param d  M[1,1] |
| `vx` | Vector X component   @param vy  Vector Y component |

**Returns:** `a*vx + b*vy`

---

## `mat2d_vecmul_y`

**Since:** 2.0.0

Y component of the 2×2 matrix–vector product `M × v`.

```redscript
fn mat2d_vecmul_y(a: double, b: double, c: double, d: double, vx: double, vy: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | M[0,0]   @param b  M[0,1]   @param c  M[1,0]   @param d  M[1,1] |
| `vx` | Vector X component   @param vy  Vector Y component |

**Returns:** `c*vx + d*vy`

---

## `solve2d_x`

**Since:** 2.0.0

X solution of the 2×2 linear system `[a b; c d] * [x; y] = [ex; ey]` via Cramer's rule.

Caller must ensure `det(a, b, c, d) ≠ 0`.

```redscript
fn solve2d_x(a: double, b: double, c: double, d: double, ex: double, ey: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | M[0,0]   @param b   M[0,1] |
| `c` | M[1,0]   @param d   M[1,1] |
| `ex` | RHS x    @param ey  RHS y |

**Returns:** `(ex*d - b*ey) / det`

**Example**

```redscript
let x: double = solve2d_x(1.0d, 0.0d, 0.0d, 1.0d, 3.0d, 4.0d)
```

---

## `solve2d_y`

**Since:** 2.0.0

Y solution of the 2×2 linear system `[a b; c d] * [x; y] = [ex; ey]` via Cramer's rule.

Caller must ensure `det(a, b, c, d) ≠ 0`.

```redscript
fn solve2d_y(a: double, b: double, c: double, d: double, ex: double, ey: double): double
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | M[0,0]   @param b   M[0,1] |
| `c` | M[1,0]   @param d   M[1,1] |
| `ex` | RHS x    @param ey  RHS y |

**Returns:** `(a*ey - ex*c) / det`

**Example**

```redscript
let y: double = solve2d_y(1.0d, 0.0d, 0.0d, 1.0d, 3.0d, 4.0d)
```

---
