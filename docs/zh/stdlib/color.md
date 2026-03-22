# Color

> 本文档由 `src/stdlib/color.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [rgb_pack](#rgb-pack)
- [rgb_r](#rgb-r)
- [rgb_g](#rgb-g)
- [rgb_b](#rgb-b)
- [rgb_lerp](#rgb-lerp)
- [rgb_to_l](#rgb-to-l)
- [rgb_to_s](#rgb-to-s)
- [rgb_to_h](#rgb-to-h)
- [hsl_to_r](#hsl-to-r)
- [hsl_to_g](#hsl-to-g)
- [hsl_to_b](#hsl-to-b)
- [hsl_to_packed](#hsl-to-packed)
- [rgb_to_hex](#rgb-to-hex)

---

## `rgb_pack`

**版本：** 1.0.0

将 RGB 分量打包为单个整数（0xRRGGBB 格式）

```redscript
fn rgb_pack(r: int, g: int, b: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `r` | 红色通道，范围 [0, 255] |
| `g` | 绿色通道，范围 [0, 255] |
| `b` | 蓝色通道，范围 [0, 255] |

**返回：** r*65536 + g*256 + b

**示例**

```redscript
let red: int = rgb_pack(255, 0, 0)  // result: 16711680 (0xFF0000)
```

---

## `rgb_r`

**版本：** 1.0.0

从打包 RGB 整数中提取红色分量

```redscript
fn rgb_r(packed: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `packed` | 打包颜色整数（0xRRGGBB） |

**返回：** 红色通道值，范围 [0, 255]

**示例**

```redscript
let r: int = rgb_r(16711680)  // result: 255
```

---

## `rgb_g`

**版本：** 1.0.0

从打包 RGB 整数中提取绿色分量

```redscript
fn rgb_g(packed: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `packed` | 打包颜色整数（0xRRGGBB） |

**返回：** 绿色通道值，范围 [0, 255]

**示例**

```redscript
let g: int = rgb_g(65280)  // result: 255 (0x00FF00)
```

---

## `rgb_b`

**版本：** 1.0.0

从打包 RGB 整数中提取蓝色分量

```redscript
fn rgb_b(packed: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `packed` | 打包颜色整数（0xRRGGBB） |

**返回：** 蓝色通道值，范围 [0, 255]

**示例**

```redscript
let b: int = rgb_b(255)  // result: 255 (0x0000FF)
```

---

## `rgb_lerp`

**版本：** 1.0.0

两个打包 RGB 颜色之间的线性插值

```redscript
fn rgb_lerp(a: int, b: int, t: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 起始颜色（打包 0xRRGGBB） |
| `b` | 结束颜色（打包 0xRRGGBB） |
| `t` | 混合因子，范围 [0, 1000]（0=a，1000=b） |

**返回：** a 和 b 之间插值得到的打包 RGB 颜色

**示例**

```redscript
let mid: int = rgb_lerp(0xFF0000, 0x0000FF, 500)  // halfway between red and blue
```

---

## `rgb_to_l`

**版本：** 1.0.0

从 RGB 分量计算 HSL 亮度（×10000 精度）

```redscript
fn rgb_to_l(r: int, g: int, b: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `r` | 红色 ×10000，范围 [0, 2550000] |
| `g` | 绿色 ×10000 |
| `b` | 蓝色 ×10000 |

**返回：** 亮度，范围 [0, 10000]（0=黑，10000=白）

**示例**

```redscript
let l: int = rgb_to_l(2550000, 2550000, 2550000)  // result: 10000 (white)
```

---

## `rgb_to_s`

**版本：** 1.0.0

从 RGB 分量计算 HSL 饱和度（×10000 精度）

```redscript
fn rgb_to_s(r: int, g: int, b: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `r` | 红色 ×10000 |
| `g` | 绿色 ×10000 |
| `b` | 蓝色 ×10000 |

**返回：** 饱和度，范围 [0, 10000]（0=灰，10000=全饱和）

**示例**

```redscript
let s: int = rgb_to_s(2550000, 0, 0)  // result: 10000 (pure red is fully saturated)
```

---

## `rgb_to_h`

**版本：** 1.0.0

从 RGB 分量计算 HSL 色相（×10000 精度）

```redscript
fn rgb_to_h(r: int, g: int, b: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `r` | 红色 ×10000 |
| `g` | 绿色 ×10000 |
| `b` | 蓝色 ×10000 |

**返回：** 色相，范围 [0, 3600000]（度×10000；0=红，1200000=绿，2400000=蓝）

**示例**

```redscript
let h: int = rgb_to_h(0, 2550000, 0)  // result: 1200000 (120°, pure green)
```

---

## `hsl_to_r`

**版本：** 1.0.0

Convert HSL to the red channel of RGB (×10000 scale).

```redscript
fn hsl_to_r(h: int, s: int, l: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `h` | Hue ×10000, range [0, 3600000] |
| `s` | Saturation ×10000, range [0, 10000] |
| `l` | Lightness ×10000, range [0, 10000] |

**返回：** Red channel ×10000, range [0, 2550000]; divide by 10000 for 0-255

**示例**

```redscript
let r: int = hsl_to_r(0, 10000, 5000)  // pure red → 2550000
```

---

## `hsl_to_g`

**版本：** 1.0.0

Convert HSL to the green channel of RGB (×10000 scale).

```redscript
fn hsl_to_g(h: int, s: int, l: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `h` | Hue ×10000, range [0, 3600000] |
| `s` | Saturation ×10000, range [0, 10000] |
| `l` | Lightness ×10000, range [0, 10000] |

**返回：** Green channel ×10000, range [0, 2550000]

**示例**

```redscript
let g: int = hsl_to_g(1200000, 10000, 5000)  // pure green → 2550000
```

---

## `hsl_to_b`

**版本：** 1.0.0

Convert HSL to the blue channel of RGB (×10000 scale).

```redscript
fn hsl_to_b(h: int, s: int, l: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `h` | Hue ×10000, range [0, 3600000] |
| `s` | Saturation ×10000, range [0, 10000] |
| `l` | Lightness ×10000, range [0, 10000] |

**返回：** Blue channel ×10000, range [0, 2550000]

**示例**

```redscript
let b: int = hsl_to_b(2400000, 10000, 5000)  // pure blue → 2550000
```

---

## `hsl_to_packed`

**版本：** 1.0.0

将 HSL（×10000 精度）转换为打包 RGB 整数（0xRRGGBB）

```redscript
fn hsl_to_packed(h: int, s: int, l: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `h` | 色相 ×10000，范围 [0, 3600000] |
| `s` | 饱和度 ×10000，范围 [0, 10000] |
| `l` | 亮度 ×10000，范围 [0, 10000] |

**返回：** 打包 RGB 整数，每通道 0-255

**示例**

```redscript
let col: int = hsl_to_packed(0, 10000, 5000)  // pure red → 0xFF0000
```

---

## `rgb_to_hex`

**版本：** 1.0.0

Pack RGB into a 0xRRGGBB integer (alias for rgb_pack with explicit naming).

```redscript
fn rgb_to_hex(r: int, g: int, b: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `r` | Red channel, range [0, 255] |
| `g` | Green channel, range [0, 255] |
| `b` | Blue channel, range [0, 255] |

**返回：** r*65536 + g*256 + b (same as rgb_pack)

**示例**

```redscript
let hex: int = rgb_to_hex(0, 128, 255)  // result: 32895 (0x0080FF)
```

---
