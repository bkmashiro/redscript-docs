# `math_hp` — 高精度数学

Import: `import math_hp;`

利用 Minecraft 内部 IEEE 754 双精度存储实现的高精度算术。通过 Marker 实体旋转技巧提供双精度 sin/cos，通过 Display Entity SVD 实现高精度除法，以及双精度算术（加、减、乘、除）、高精度 ln（Newton 精炼）、双精度 sqrt 和实数幂运算。需要设置：在 `@load` 函数中调用 `init_trig()`（以及可选的 `init_div()`、`init_double_add()`）。

> **需要设置：** 在 `@load` 函数中调用 `init_trig()`。这些函数通过 `@require_on_load` 自动注册，但实体必须在运行时存在。

## Functions

### `init_trig()`

创建 `sin_hp`/`cos_hp`/`norm3_hp` 所需的 `rs_trig` Marker 实体。可多次调用（不存在时才生成）。通过 `@require_on_load` 自动调用。

---

### `sin_hp(angle: int): int`

> **Precision:** ~15 significant figures (Java `Math.sin` double precision)  
> **Cost:** ~8 commands + entity NBT read/write  
> **Requires:** `rs_trig` Marker entity must exist (call `init_trig()` in `@load`)

高精度正弦。`angle` 为角度 ×10000（如 450000 = 45°）。返回 `sin(angle/10000°) × 10000`。

**Example:**
```rs
import math_hp;

@load fn setup() { init_trig(); }

fn my_fn() {
    let s: int = sin_hp(900000);  // 10000  (sin 90° = 1.0)
}
```

---

### `cos_hp(angle: int): int`

> **Precision:** ~15 significant figures  
> **Cost:** ~8 commands + entity NBT read/write  
> **Requires:** `rs_trig` Marker entity

高精度余弦。`angle` 为角度 ×10000。返回 `cos(angle/10000°) × 10000`。

---

### `init_div()`

创建 `div_hp`、`div3_hp`、`double_div` 所需的 `rs_div` block_display 实体。通过 `@require_on_load` 自动调用。

---

### `div_hp(a: int, b: int): int`

> **Precision:** ~15 significant figures (Display Entity SVD, Java double)  
> **Cost:** ~10 commands + entity transformation write/read  
> **Requires:** `rs_div` block_display entity (call `init_div()` in `@load`)

高精度整数除法 `a/b`，返回 `(a/b) × 10000`。示例：`div_hp(10000, 3000)` ≈ 33333。

**Example:**
```rs
import math_hp;
let result: int = div_hp(10000, 3000);  // ~33333
```

---

### `div3_hp(a: int, b: int, c: int, d: int): int`

> **Precision:** ~15 significant figures  
> **Requires:** `rs_div` entity

通过对角矩阵分解同时将三个值除以 `d`。返回 `a/d × 10000`。`b/d` 和 `c/d` 的结果分别存在记分板 `$div3_y` 和 `$div3_z __rs_math_hp` 中。

---

### `sqrt_hp(x: int): int`

> **Precision:** ~8 significant figures (two Newton refinement steps using `div_hp`)  
> **Requires:** `rs_div` entity

高精度平方根。输入 `x ×10000`。返回 `√(x/10000) × 10000`。

---

### `norm3_hp(x: int, y: int, z: int): int`

> **Requires:** `rs_trig` entity

高精度三维向量模长 `√(x²+y²+z²)`。所有输入 ×10000，返回 ×10000。

---

### `double_mul_fixed(d: double, f: int): double`

> **Precision:** Full IEEE 754 double (no integer intermediate for the multiplication)  
> **Cost:** ~5 commands + macro function call

将双精度值 `d` 乘以定点整数 `f`（×10000 缩放）。使用函数宏技巧在 IEEE 754 双精度算术中计算 `d × (f / 10000)`。

---

### `init_double_add()`

生成 `double_add`/`double_sub` 所需的 AEC Marker 实体。通过 `@require_on_load` 自动调用。

---

### `double_add(a: double, b: double): double`

> **Precision:** Full IEEE 754 double (~15 significant figures)  
> **Cost:** ~6 commands + entity teleport

`a + b`，通过实体坐标技巧实现真正双精度（Marker 传送到 `x=a`，再相对 TP `+b`）。

---

### `double_sub(a: double, b: double): double`

> **Precision:** Full IEEE 754 double. Note: catastrophic cancellation applies when a ≈ b  
> **Cost:** ~7 commands

双精度 `a - b`。通过 execute-store scale=-1 对 `b` 取反，然后调用 `double_add`。

---

### `double_mul(a: double, b: double): double`

> **Precision:** ~4 decimal digits (10000× scale integer intermediary; NOT full double precision)  
> **Cost:** ~5 commands  
> **Note:** Overflow for |a|×|b| > ~21474; safe for small values only

通过记分板整数近似计算 `a × b`。较大值请使用 ln/exp 分解。

---

### `double_div(a: double, b: double): double`

> **Precision:** Full IEEE 754 double  
> **Cost:** ~6 commands + entity transformation  
> **Requires:** `rs_div` entity  
> **Warning:** Division by zero produces Java Infinity/NaN which corrupts NBT

通过 Display Entity SVD 技巧实现真正双精度 `a / b`。

---

### `ln_hp(x: int): int`

> **Precision:** ~8–9 significant digits (one Newton step on top of `ln_5term`)  
> **Cost:** ~35 commands (ln_5term + exp_fx + correction)

高精度自然对数。输入/输出均 ×10000。有效范围：x ∈ [100, 1000000]。算法：通过 5 项 atanh 级数得到初始估算，再进行一步 Newton 精炼。

---

### `ln_5term(x: int): int`

> **Precision:** max_error ≈ 0.000002 (2× better than 3-term `ln()`)  
> **Cost:** ~30 commands

使用 5 项 atanh 级数加范围规约的自然对数。输入/输出均 ×10000。有效范围：x ∈ [100, 1000000]。

---

### `double_sqrt(x: double): double`

双精度值的平方根。策略：转换为 ×10000 整数，应用 `isqrt`，再缩放回 double。

---

### `pow_real(base: double, exp_val: double): double`

> **Requires:** `rs_trig` entity  
> **Precision:** ~6–8 significant digits (limited by exp_fx precision)

双精度输入的 `base^exp_val`，使用 `e^(exp_val × ln(base))` 通过定点数辅助函数计算。

---

### `pow_fast(base: double, exp_val: int): double`

双精度底数、整数指数的 `base^exp_val`。使用二进制幂运算。支持负指数（通过 `double_div`）。递归实现。
