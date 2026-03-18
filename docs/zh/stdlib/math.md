# `math` — 基础数学运算

Import: `import math;`

RedScript 数据包的整数与定点数数学辅助库。定点数约定：比例 = 1000（1.0 → 1000，3.14 → 3140），另有说明除外。包含基础辅助函数（abs、sign、min、max、clamp、lerp）、迭代算法（isqrt、sqrt_fixed、pow_int、gcd、lcm）、通过查找表实现的三角函数、定点数算术辅助、缓动函数（smoothstep/smootherstep）、对数、指数、立方根、排列组合、线性方程求解、数值积分步骤以及反三角近似。

## Functions

### `abs<T>(x: T): T`

绝对值。适用于任意数值类型。

**Example:**
```rs
import math;
let v: int = abs(-5);  // 5
```

---

### `sign(x: int): int`

`x` 的符号：返回 1、0 或 -1。

---

### `min<T>(a: T, b: T): T`

两值中的最小值。

---

### `max<T>(a: T, b: T): T`

两值中的最大值。

---

### `clamp<T>(x: T, lo: T, hi: T): T`

将 `x` 限制在 `[lo, hi]` 范围内。

---

### `lerp(a: int, b: int, t: int): int`

线性插值。`t ∈ [0, 1000]`。`lerp(100, 200, 750)` → 175。

**Example:**
```rs
import math;
let v: int = lerp(0, 1000, 500);  // 500
```

---

### `isqrt(n: int): int`

> **Cost:** ≤16 Newton-Raphson iterations

整数平方根：`⌊√n⌋`。使用 Newton 法，对所有 int32 最多收敛 16 次迭代。

**Example:**
```rs
import math;
let r: int = isqrt(25);  // 5
```

---

### `sqrt_fixed(x: int): int`

定点数平方根（scale=1000）。返回 `√x × 1000`。`sqrt_fixed(2000)` ≈ 1414。

---

### `pow_int(base: int, exp: int): int`

> **Cost:** O(log exp)

整数幂 `base^exp`（exp ≥ 0）。快速幂算法。

---

### `gcd(a: int, b: int): int`

最大公约数（欧几里得算法）。`gcd(12, 8)` → 4。

---

### `lcm(a: int, b: int): int`

最小公倍数。`lcm(4, 6)` → 12。

---

### `map(x: int, in_lo: int, in_hi: int, out_lo: int, out_hi: int): int`

范围映射：将 `x` 从 `[in_lo, in_hi]` 线性映射到 `[out_lo, out_hi]`，使用整数算术。

**Example:**
```rs
import math;
let v: int = map(5, 0, 10, 0, 100);  // 50
```

---

### `ceil_div(a: int, b: int): int`

向上取整除法：`⌈a / b⌉`。要求 b > 0。

---

### `log2_int(n: int): int`

整数以 2 为底的对数：`⌊log₂(n)⌋`。n ≤ 0 时返回 -1。

---

### `sin_fixed(deg: int): int`

> **Precision:** ≤1 unit error (≤0.1% relative) for all integer degree inputs  
> **Cost:** ~4 MC commands + 1 NBT read  
> **Requires:** `math:tables` NBT storage must be pre-loaded (auto-loaded via `@require_on_load(_math_init)`)

`sin(deg°) × 1000`。处理任意整数角度，内部归一化。`sin_fixed(30)` → 500。

**Example:**
```rs
import math;
let s: int = sin_fixed(90);  // 1000
```

---

### `cos_fixed(deg: int): int`

> **Precision:** ≤1 unit error  
> **Cost:** ~4 MC commands + 1 NBT read  
> **Requires:** `math:tables` NBT storage must be pre-loaded

`cos(deg°) × 1000`。实现为 `sin_fixed(deg + 90)`。

---

### `mulfix(a: int, b: int): int`

定点数乘法：`(a × b) / 1000`。两个操作数均为定点数（scale=1000）时使用，避免溢出。

**Example:**
```rs
import math;
let v: int = mulfix(500, 707);  // 353  (≈ 0.5 × 0.707)
```

---

### `divfix(a: int, b: int): int`

定点数除法：`(a × 1000) / b`。b=0 时返回 0。

---

### `smoothstep(lo: int, hi: int, x: int): int`

> **Cost:** ~5 operations

光滑 Hermite 插值 `3t² - 2t³`。返回值 ∈ `[0, 1000]`。两端均有缓入/缓出效果。

**Example:**
```rs
import math;
let v: int = smoothstep(0, 100, 50);  // 500
```

---

### `smootherstep(lo: int, hi: int, x: int): int`

Perlin 5 阶平滑步进 `6t⁵ - 15t⁴ + 10t³`。两端一阶和二阶导数均为零。

---

### `ln(x: int): int`

> **Precision:** max_error ≈ 0.000504 (tuned 2026-03-17, ~8–9 significant digits)  
> **Cost:** ~27 commands (auto-tuned atanh polynomial)

自然对数。输入/输出均使用 ×10000 缩放。有效范围：x ∈ [100, 1000000]（0.01–100.0）。使用 3 项 atanh 级数加范围规约。

**Example:**
```rs
import math;
let l: int = ln(27183);  // ~10000  (ln(e) ≈ 1.0)
```

---

### `sqrt_fx(x: int): int`

定点数平方根，scale ×10000。输入 x ×10000（如 40000=4.0），返回 `√(x/10000) × 10000`。`sqrt_fx(20000)` ≈ 14142。

---

### `exp_fx(x: int): int`

`e^(x/10000) × 10000`。使用范围规约 + 6 项 Horner 形式 Taylor 级数。`exp_fx(10000)` ≈ 27183。有效范围：x ∈ [-100000, 100000]。

---

### `cbrt_fx(x: int): int`

整数立方根：`⌊∛x⌋`。Newton 法，20 次迭代。

---

### `cbrt_newton(x: int): int`

在 `cbrt_fx` 基础上增加 Newton 精炼步骤的立方根。对大数值收敛更好。

---

### `factorial(n: int): int`

`n!`，n ∈ [0, 12]。（13! 超过 int32 范围。）

---

### `combinations(n: int, k: int): int`

`C(n, k)`，n ≤ 20，k ≤ n。使用乘法公式避免溢出。

---

### `log10_fx(x: int): int`

以 10 为底的对数，定点数 ×10000。使用 `ln(x) / ln(10)`。

---

### `log2_fx(x: int): int`

以 2 为底的对数，定点数 ×10000。使用 `ln(x) / ln(2)`。

---

### `loga_fx(base_fx: int, x: int): int`

以 `base_fx` 为底的 `x` 的对数，两者均 ×10000。

---

### `gamma_int(n: int): int`

正整数的 Gamma 函数：`Γ(n) = (n-1)!`。

---

### `solve2x2_x(a: int, b: int, e: int, c: int, d: int, f: int): int`

用 Cramer 法则求解 `ax + by = e, cx + dy = f` 中的 x。返回 `x × 10000`。行列式为 0 时返回 0。

---

### `solve2x2_y(a: int, b: int, e: int, c: int, d: int, f: int): int`

求解同一方程组中的 y。返回 `y × 10000`。

---

### `quadratic_disc(a: int, b: int, c: int): int`

判别式 `b² - 4ac`。正数：两个实根；零：一个实根；负数：无实根。

---

### `quadratic_x1(a: int, b: int, c: int): int`

`ax² + bx + c = 0` 的较大根，×10000。

---

### `quadratic_x2(a: int, b: int, c: int): int`

较小根，×10000。

---

### `approx_eq(a: int, b: int, eps: int): int`

若 `|a - b| ≤ eps` 则返回 1。

---

### `cubic_disc_fx(p_fx: int, q_fx: int): int`

退化三次方程 `t³ + p×t + q = 0` 的判别式，×10000 输入。

---

### `cubic_newton(a_fx: int, b_fx: int, c_fx: int, d_fx: int, x0_fx: int): int`

一般三次方程 `ax³ + bx² + cx + d = 0` 的 Newton 迭代。最多 20 次迭代。返回近似根 ×10000。

---

### `trapezoid_step(fa: int, fb: int, h: int): int`

一步梯形积分：`(fa + fb) / 2 × h`。均 ×10000。

---

### `simpson_step(fa: int, fm: int, fb: int, h: int): int`

2h 宽度上的一步 Simpson 法则：`(fa + 4×fm + fb) × h/3`。均 ×10000。

---

### `newton_step(x_fx: int, fx: int, dfx: int): int`

一步 Newton-Raphson 迭代：`x - f(x)/f'(x)`。返回新 x ×10000。

---

### `asin_approx(x_fx: int): int`

反正弦近似，`x_fx ∈ [-10000, 10000]`（×10000）。返回角度 ×10000（度）。使用 `arctan(x / √(1-x²))`。

---

### `acos_approx(x_fx: int): int`

反余弦近似。返回角度 ×10000（度）。计算为 `90° - asin(x)`。
