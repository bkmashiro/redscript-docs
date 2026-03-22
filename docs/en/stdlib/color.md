# Color

> Auto-generated from `src/stdlib/color.mcrs` — do not edit manually.

## API

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

**Since:** 1.0.0

Pack RGB components into a single integer (0xRRGGBB format).

```redscript
fn rgb_pack(r: int, g: int, b: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `r` | Red channel, range [0, 255] |
| `g` | Green channel, range [0, 255] |
| `b` | Blue channel, range [0, 255] |

**Returns:** r*65536 + g*256 + b

**Example**

```redscript
let red: int = rgb_pack(255, 0, 0)  // result: 16711680 (0xFF0000)
```

---

## `rgb_r`

**Since:** 1.0.0

Extract the red component from a packed RGB integer.

```redscript
fn rgb_r(packed: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `packed` | Packed color integer (0xRRGGBB) |

**Returns:** Red channel value in [0, 255]

**Example**

```redscript
let r: int = rgb_r(16711680)  // result: 255
```

---

## `rgb_g`

**Since:** 1.0.0

Extract the green component from a packed RGB integer.

```redscript
fn rgb_g(packed: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `packed` | Packed color integer (0xRRGGBB) |

**Returns:** Green channel value in [0, 255]

**Example**

```redscript
let g: int = rgb_g(65280)  // result: 255 (0x00FF00)
```

---

## `rgb_b`

**Since:** 1.0.0

Extract the blue component from a packed RGB integer.

```redscript
fn rgb_b(packed: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `packed` | Packed color integer (0xRRGGBB) |

**Returns:** Blue channel value in [0, 255]

**Example**

```redscript
let b: int = rgb_b(255)  // result: 255 (0x0000FF)
```

---

## `rgb_lerp`

**Since:** 1.0.0

Linear interpolation between two packed RGB colors.

```redscript
fn rgb_lerp(a: int, b: int, t: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | Start color (packed 0xRRGGBB) |
| `b` | End color (packed 0xRRGGBB) |
| `t` | Blend factor in [0, 1000] (0 = a, 1000 = b) |

**Returns:** Packed RGB interpolated between a and b

**Example**

```redscript
let mid: int = rgb_lerp(0xFF0000, 0x0000FF, 500)  // halfway between red and blue
```

---

## `rgb_to_l`

**Since:** 1.0.0

Compute the HSL lightness from RGB components (×10000 scale).

```redscript
fn rgb_to_l(r: int, g: int, b: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `r` | Red ×10000, range [0, 2550000] |
| `g` | Green ×10000, range [0, 2550000] |
| `b` | Blue ×10000, range [0, 2550000] |

**Returns:** Lightness in [0, 10000] (0 = black, 10000 = white)

**Example**

```redscript
let l: int = rgb_to_l(2550000, 2550000, 2550000)  // result: 10000 (white)
```

---

## `rgb_to_s`

**Since:** 1.0.0

Compute the HSL saturation from RGB components (×10000 scale).

```redscript
fn rgb_to_s(r: int, g: int, b: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `r` | Red ×10000, range [0, 2550000] |
| `g` | Green ×10000, range [0, 2550000] |
| `b` | Blue ×10000, range [0, 2550000] |

**Returns:** Saturation in [0, 10000] (0 = grey, 10000 = fully saturated)

**Example**

```redscript
let s: int = rgb_to_s(2550000, 0, 0)  // result: 10000 (pure red is fully saturated)
```

---

## `rgb_to_h`

**Since:** 1.0.0

Compute the HSL hue from RGB components (×10000 scale).

```redscript
fn rgb_to_h(r: int, g: int, b: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `r` | Red ×10000, range [0, 2550000] |
| `g` | Green ×10000, range [0, 2550000] |
| `b` | Blue ×10000, range [0, 2550000] |

**Returns:** Hue in [0, 3600000] (degrees × 10000; 0=red, 1200000=green, 2400000=blue)

**Example**

```redscript
let h: int = rgb_to_h(0, 2550000, 0)  // result: 1200000 (120°, pure green)
```

---

## `hsl_to_r`

**Since:** 1.0.0

Convert HSL to the red channel of RGB (×10000 scale).

```redscript
fn hsl_to_r(h: int, s: int, l: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `h` | Hue ×10000, range [0, 3600000] |
| `s` | Saturation ×10000, range [0, 10000] |
| `l` | Lightness ×10000, range [0, 10000] |

**Returns:** Red channel ×10000, range [0, 2550000]; divide by 10000 for 0-255

**Example**

```redscript
let r: int = hsl_to_r(0, 10000, 5000)  // pure red → 2550000
```

---

## `hsl_to_g`

**Since:** 1.0.0

Convert HSL to the green channel of RGB (×10000 scale).

```redscript
fn hsl_to_g(h: int, s: int, l: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `h` | Hue ×10000, range [0, 3600000] |
| `s` | Saturation ×10000, range [0, 10000] |
| `l` | Lightness ×10000, range [0, 10000] |

**Returns:** Green channel ×10000, range [0, 2550000]

**Example**

```redscript
let g: int = hsl_to_g(1200000, 10000, 5000)  // pure green → 2550000
```

---

## `hsl_to_b`

**Since:** 1.0.0

Convert HSL to the blue channel of RGB (×10000 scale).

```redscript
fn hsl_to_b(h: int, s: int, l: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `h` | Hue ×10000, range [0, 3600000] |
| `s` | Saturation ×10000, range [0, 10000] |
| `l` | Lightness ×10000, range [0, 10000] |

**Returns:** Blue channel ×10000, range [0, 2550000]

**Example**

```redscript
let b: int = hsl_to_b(2400000, 10000, 5000)  // pure blue → 2550000
```

---

## `hsl_to_packed`

**Since:** 1.0.0

Convert HSL (×10000 scale) to a packed RGB integer (0xRRGGBB).

```redscript
fn hsl_to_packed(h: int, s: int, l: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `h` | Hue ×10000, range [0, 3600000] |
| `s` | Saturation ×10000, range [0, 10000] |
| `l` | Lightness ×10000, range [0, 10000] |

**Returns:** Packed RGB integer (0xRRGGBB), each channel 0-255

**Example**

```redscript
let col: int = hsl_to_packed(0, 10000, 5000)  // pure red → 0xFF0000
```

---

## `rgb_to_hex`

**Since:** 1.0.0

Pack RGB into a 0xRRGGBB integer (alias for rgb_pack with explicit naming).

```redscript
fn rgb_to_hex(r: int, g: int, b: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `r` | Red channel, range [0, 255] |
| `g` | Green channel, range [0, 255] |
| `b` | Blue channel, range [0, 255] |

**Returns:** r*65536 + g*256 + b (same as rgb_pack)

**Example**

```redscript
let hex: int = rgb_to_hex(0, 128, 255)  // result: 32895 (0x0080FF)
```

---
