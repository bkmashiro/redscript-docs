# `color` — RGB/HSL/十六进制颜色工具

Import: `import color;`

将 RGB 颜色打包/解包为整数（`0xRRGGBB = R×65536 + G×256 + B`），在颜色之间线性混合，在 RGB 与 HSL 色彩空间之间转换，以及生成打包的十六进制整数。所有 HSL 操作使用 ×10000 缩放：H ∈ [0, 3600000]，S/L ∈ [0, 10000]，×10000 缩放时 R/G/B ∈ [0, 2550000]。

## Functions

### `rgb_pack(r: int, g: int, b: int): int`

将 RGB 分量（各 0–255）打包为单一整数 `0xRRGGBB`。

**Example:**
```rs
import color;
let red: int = rgb_pack(255, 0, 0);  // 16711680
```

---

### `rgb_r(packed: int): int`

从打包 RGB 整数中提取红色分量（0–255）。

**Example:**
```rs
import color;
let r: int = rgb_r(16711680);  // 255
```

---

### `rgb_g(packed: int): int`

从打包 RGB 整数中提取绿色分量（0–255）。

---

### `rgb_b(packed: int): int`

从打包 RGB 整数中提取蓝色分量（0–255）。

---

### `rgb_lerp(a: int, b: int, t: int): int`

在两个打包颜色之间线性混合。`t ∈ [0, 1000]`——0 返回 `a`，1000 返回 `b`。对每个颜色通道独立插值。

**Example:**
```rs
import color;
let blended: int = rgb_lerp(rgb_pack(0,0,0), rgb_pack(255,255,255), 500);  // 中灰色
```

---

### `rgb_to_l(r: int, g: int, b: int): int`

HSL 中的亮度分量（×10000）。R/G/B 为原始 0–255。返回 L ∈ [0, 10000]。

**Example:**
```rs
import color;
let l: int = rgb_to_l(255, 255, 255);  // 10000
```

---

### `rgb_to_s(r: int, g: int, b: int): int`

HSL 中的饱和度分量（×10000）。返回 S ∈ [0, 10000]。

---

### `rgb_to_h(r: int, g: int, b: int): int`

HSL 中的色相分量（×10000）。返回 H ∈ [0, 3600000]（0°–360° × 10000）。

---

### `hsl_to_r(h: int, s: int, l: int): int`

将 HSL（×10000 缩放）转换为红色分量 ×10000。H ∈ [0, 3600000]，S/L ∈ [0, 10000]。返回 R ∈ [0, 2550000]。

**Example:**
```rs
import color;
let r: int = hsl_to_r(0, 10000, 5000);  // 纯红色，R=2550000
```

---

### `hsl_to_g(h: int, s: int, l: int): int`

将 HSL（×10000 缩放）转换为绿色分量 ×10000。返回 G ∈ [0, 2550000]。

---

### `hsl_to_b(h: int, s: int, l: int): int`

将 HSL（×10000 缩放）转换为蓝色分量 ×10000。返回 B ∈ [0, 2550000]。

---

### `hsl_to_packed(h: int, s: int, l: int): int`

将 HSL（×10000 缩放）直接转换为打包的 `0xRRGGBB` 整数。

**Example:**
```rs
import color;
let packed: int = hsl_to_packed(0, 10000, 5000);  // 纯红色
```

---

### `rgb_to_hex(r: int, g: int, b: int): int`

将 RGB 打包为 `0xRRGGBB` 整数。等价于 `rgb_pack`；作为显式别名提供。R/G/B ∈ [0, 255]。

**Example:**
```rs
import color;
let hex: int = rgb_to_hex(0, 128, 255);
```
