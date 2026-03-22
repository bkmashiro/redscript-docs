# Noise

> 本文档由 `src/stdlib/noise.mcrs` 自动生成，请勿手动编辑。

## API 列表

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

从一维整数坐标生成伪随机整数

```redscript
fn hash_1d(x: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 输入坐标（任意整数） |

**返回：** 伪随机整数（任意值；用 % 限制范围）

**示例**

```redscript
let h: int = hash_1d(42)  // deterministic hash of coordinate 42
```

---

## `hash_2d` <Badge type="info" text="v1.0.0" />

从二维整数坐标对生成伪随机整数

```redscript
fn hash_2d(x: int, z: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 第一个坐标 |
| `z` | 第二个坐标 |

**返回：** 确定性组合两个输入的伪随机整数

**示例**

```redscript
let h: int = hash_2d(10, 20)  // deterministic hash of (10, 20)
```

---

## `hash_1d_pos` <Badge type="info" text="v1.0.0" />

Generate a non-negative hash in [0, 10000] from a 1D coordinate.

```redscript
fn hash_1d_pos(x: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | Input coordinate |

**返回：** Integer in [0, 10000]

**示例**

```redscript
let v: int = hash_1d_pos(5)  // value between 0 and 10000
```

---

## `hash_2d_pos` <Badge type="info" text="v1.0.0" />

Generate a non-negative hash in [0, 10000] from a 2D coordinate pair.

```redscript
fn hash_2d_pos(x: int, z: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | First coordinate |
| `z` | Second coordinate |

**返回：** Integer in [0, 10000]

**示例**

```redscript
let v: int = hash_2d_pos(3, 7)  // value between 0 and 10000
```

---

## `value_noise_1d` <Badge type="info" text="v1.0.0" />

定点数位置处的平滑一维值噪声

```redscript
fn value_noise_1d(x_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x_fx` | 位置 ×10000（如 10000 = 坐标 1.0） |

**返回：** 噪声值，范围 [0, 10000]，整数坐标间平滑插值

**示例**

```redscript
let n: int = value_noise_1d(15000)  // smooth noise at x=1.5
```

---

## `value_noise_2d` <Badge type="info" text="v1.0.0" />

定点数位置处的平滑二维值噪声

```redscript
fn value_noise_2d(x_fx: int, z_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x_fx` | X 位置 ×10000 |
| `z_fx` | Z 位置 ×10000 |

**返回：** 噪声值，范围 [0, 10000]，双线性平滑插值

**示例**

```redscript
let n: int = value_noise_2d(15000, 23000)  // noise at (1.5, 2.3)
```

---

## `fbm_1d` <Badge type="info" text="v1.0.0" />

一维分形布朗运动（fBm）— 叠加多组八度值噪声

```redscript
fn fbm_1d(x_fx: int, octaves: int, persistence_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x_fx` | 位置 ×10000 |
| `octaves` | 噪声层数（1–6；越多细节越丰富但越慢） |
| `persistence_fx` | 每八度振幅衰减因子 ×10000（5000 = 0.5 推荐） |

**返回：** 归一化噪声值，约在 [0, 10000]

**示例**

```redscript
let h: int = fbm_1d(50000, 4, 5000)  // 4 octave noise at x=5.0
```

---

## `fbm_2d` <Badge type="info" text="v1.0.0" />

二维分形布朗运动 — 叠加多组二维值噪声

```redscript
fn fbm_2d(x_fx: int, z_fx: int, octaves: int, persistence_fx: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x_fx` | X 位置 ×10000 |
| `z_fx` | Z 位置 ×10000 |
| `octaves` | 噪声层数（1–6） |
| `persistence_fx` | 振幅衰减因子 ×10000 |

**返回：** 归一化噪声值，约在 [0, 10000]

**示例**

```redscript
let h: int = fbm_2d(30000, 50000, 3, 5000)  // 3 octave 2D noise
```

---

## `terrain_height` <Badge type="info" text="v1.0.0" />

使用 3 组八度 fBm 噪声生成地形高度

```redscript
fn terrain_height(x: int, z: int, base_y: int, amplitude: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 方块 X 坐标（整数，非定点数） |
| `z` | 方块 Z 坐标（整数，非定点数） |
| `base_y` | 基础高度（方块） |
| `amplitude` | 最大高度变化（方块） |

**返回：** 坐标 (x, z) 处的方块高度

**示例**

```redscript
let h: int = terrain_height(100, 200, 64, 16)  // terrain at (100, 200) near y=64
```

---
