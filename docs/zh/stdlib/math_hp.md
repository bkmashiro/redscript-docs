# Math_hp

> 本文档由 `src/stdlib/math_hp.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [double_mul_fixed](#double-mul-fixed)
- [double_mul](#double-mul)
- [ln_hp](#ln-hp)
- [ln_5term](#ln-5term)
- [double_sqrt](#double-sqrt)
- [pow_fast](#pow-fast)

---

## `double_mul_fixed` <Badge type="info" text="v1.3.0" />

使用宏技巧将双精度值 d 乘以定点整数 f（×10000），全程保持 IEEE 754 双精度精度。

```redscript
fn double_mul_fixed(d: double, f: int): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `d` | 双精度操作数（NBT 存储） |
| `f` | 定点乘数 ×10000（如 15000 = 1.5） |

**返回：** d × (f/10000) 的双精度结果

**示例**

```redscript
let r: double = double_mul_fixed(3.14d, 20000); // 6.28  (3.14 × 2.0)
```

---

## `double_mul` <Badge type="info" text="v1.3.0" />

通过计分板整数近似实现双精度乘法（约 4 位有效小数）。|a|×|b| > ~21474 时会溢出。

```redscript
fn double_mul(a: double, b: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 第一个因数（双精度） |
| `b` | 第二个因数（双精度） |

**返回：** a × b（近似，约 4 位精度）

---

## `ln_hp` <Badge type="info" text="v1.3.0" />

高精度自然对数，通过对 5 项 atanh 级数结果进行一次 Newton 修正（~8–9 位精度）。有效范围 x ∈ [100, 1000000]。

```redscript
fn ln_hp(x: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 输入值 ×10000（如 10000 = 1.0，27183 ≈ e） |

**返回：** ln(x/10000) ×10000

**示例**

```redscript
let r: int = ln_hp(27183); // ≈ 10000  (ln(e) ≈ 1.0)
```

---

## `ln_5term` <Badge type="info" text="v1.3.0" />

使用 5 项 atanh 级数计算自然对数（比 3 项 ln() 精度高 2 倍，最大误差 ≈ 0.000002）。

```redscript
fn ln_5term(x: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 输入值 ×10000 |

**返回：** ln(x/10000) ×10000

---

## `double_sqrt` <Badge type="info" text="v1.3.0" />

双精度平方根，内部转换为定点数后用 isqrt 计算，再转回双精度。

```redscript
fn double_sqrt(x: double): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 输入双精度值（必须 ≥ 0） |

**返回：** √x（双精度）

---

## `pow_fast` <Badge type="info" text="v1.3.0" />

双精度底数的整数次方，使用二进制快速幂（O(log n)），支持负指数。

```redscript
fn pow_fast(base: double, exp_val: int): double
```

**参数**

| 参数 | 说明 |
|------|------|
| `base` | 底数（双精度） |
| `exp_val` | 整数指数（可以为负） |

**返回：** base^exp_val（双精度）

**示例**

```redscript
let r: double = pow_fast(2.0d, 10); // 1024.0
```

---
