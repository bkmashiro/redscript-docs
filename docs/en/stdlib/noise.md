# Noise

> Auto-generated from `src/stdlib/noise.mcrs` — do not edit manually.

## API

- [hash_1d](#hash-1d)
- [hash_2d](#hash-2d)
- [hash_1d_pos](#hash-1d-pos)
- [hash_2d_pos](#hash-2d-pos)
- [value_noise_1d](#value-noise-1d)
- [value_noise_2d](#value-noise-2d)
- [fbm_1d](#fbm-1d)
- [fbm_2d](#fbm-2d)
- [terrain_height](#terrain-height)

---

## `hash_1d` <Badge type="info" text="v1.0.0" />

Generate a pseudo-random integer from a 1D integer coordinate.

```redscript
fn hash_1d(x: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Input coordinate (any integer) |

**Returns:** Pseudo-random integer (any value; use % to restrict range)

**Example**

```redscript
let h: int = hash_1d(42)  // deterministic hash of coordinate 42
```

---

## `hash_2d` <Badge type="info" text="v1.0.0" />

Generate a pseudo-random integer from a 2D integer coordinate pair.

```redscript
fn hash_2d(x: int, z: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | First coordinate (any integer) |
| `z` | Second coordinate (any integer) |

**Returns:** Pseudo-random integer combining both inputs deterministically

**Example**

```redscript
let h: int = hash_2d(10, 20)  // deterministic hash of (10, 20)
```

---

## `hash_1d_pos` <Badge type="info" text="v1.0.0" />

Generate a non-negative hash in [0, 10000] from a 1D coordinate.

```redscript
fn hash_1d_pos(x: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Input coordinate |

**Returns:** Integer in [0, 10000]

**Example**

```redscript
let v: int = hash_1d_pos(5)  // value between 0 and 10000
```

---

## `hash_2d_pos` <Badge type="info" text="v1.0.0" />

Generate a non-negative hash in [0, 10000] from a 2D coordinate pair.

```redscript
fn hash_2d_pos(x: int, z: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | First coordinate |
| `z` | Second coordinate |

**Returns:** Integer in [0, 10000]

**Example**

```redscript
let v: int = hash_2d_pos(3, 7)  // value between 0 and 10000
```

---

## `value_noise_1d` <Badge type="info" text="v1.0.0" />

Smooth 1D value noise at a fixed-point position.

```redscript
fn value_noise_1d(x_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x_fx` | Position ×10000 (e.g. 10000 = coordinate 1.0) |

**Returns:** Noise value in [0, 10000] with smooth interpolation between integer coords

**Example**

```redscript
let n: int = value_noise_1d(15000)  // smooth noise at x=1.5
```

---

## `value_noise_2d` <Badge type="info" text="v1.0.0" />

Smooth 2D value noise at a fixed-point position.

```redscript
fn value_noise_2d(x_fx: int, z_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x_fx` | X position ×10000 |
| `z_fx` | Z position ×10000 |

**Returns:** Noise value in [0, 10000] with bilinear smooth interpolation

**Example**

```redscript
let n: int = value_noise_2d(15000, 23000)  // noise at (1.5, 2.3)
```

---

## `fbm_1d` <Badge type="info" text="v1.0.0" />

1D Fractal Brownian Motion — stacks multiple octaves of value noise.

```redscript
fn fbm_1d(x_fx: int, octaves: int, persistence_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x_fx` | Position ×10000 |
| `octaves` | Number of noise layers (1–6; more = more detail but slower) |
| `persistence_fx` | Amplitude decay per octave ×10000 (5000 = 0.5 recommended) |

**Returns:** Normalized noise value in approximately [0, 10000]

**Example**

```redscript
let h: int = fbm_1d(50000, 4, 5000)  // 4 octave noise at x=5.0
```

---

## `fbm_2d` <Badge type="info" text="v1.0.0" />

2D Fractal Brownian Motion — stacks multiple octaves of 2D value noise.

```redscript
fn fbm_2d(x_fx: int, z_fx: int, octaves: int, persistence_fx: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x_fx` | X position ×10000 |
| `z_fx` | Z position ×10000 |
| `octaves` | Number of noise layers (1–6) |
| `persistence_fx` | Amplitude decay per octave ×10000 (5000 = 0.5) |

**Returns:** Normalized noise value in approximately [0, 10000]

**Example**

```redscript
let h: int = fbm_2d(30000, 50000, 3, 5000)  // 3 octave 2D noise
```

---

## `terrain_height` <Badge type="info" text="v1.0.0" />

Generate a terrain height using 3-octave FBM noise.

```redscript
fn terrain_height(x: int, z: int, base_y: int, amplitude: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Block X coordinate (integer, not fixed-point) |
| `z` | Block Z coordinate (integer, not fixed-point) |
| `base_y` | Baseline height in blocks |
| `amplitude` | Maximum height variation above/below base_y in blocks |

**Returns:** Block height at (x, z): base_y + noise * amplitude / 10000

**Example**

```redscript
let h: int = terrain_height(100, 200, 64, 16)  // terrain at (100, 200) near y=64
```

---
