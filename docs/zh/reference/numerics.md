# 数值与精度用法

本页给出当前 RedScript 数值体系的实际用法边界，尤其是 `fixed`、已废弃的 `float`、NBT-backed `double`，以及标准库里遗留的比例整数 helper。

## 一句话规则

| 需求 | 推荐 |
|------|------|
| 计数、血量、tick、scoreboard 值 | `int` |
| 普通小数运算 | `fixed`，直接用 `+ - * /` |
| 旧 `math.mcrs` 三角/插值 helper | 使用显式比例名：`*_fx1000` / `*_t1000` |
| 需要 4 位小数比例整数 helper | 使用 `*_fx10000` / `math_hp` 的 ×10000 API |
| NBT/实体技巧支撑的高精度计算 | `double` 或 `stdlib/math_hp` |
| 旧代码里的 `float` | 迁移到 `fixed`；只在 NBT 边界语境下保留 |

## `fixed`：语言级小数

语言级 `fixed` 是编译器拥有的定点数，scale 固定为 `×10000`：

```rs verify-skip
let a: fixed = 1.5;   // raw 15000
let b: fixed = 0.25;  // raw 2500

let product: fixed = a * b; // 编译器自动做 ×10000 补偿
let ratio: fixed = a / b;   // 同样保持 fixed scale
```

不要为了普通 `fixed * fixed` 或 `fixed / fixed` 调 `mulfix` / `divfix`。这些 helper 属于旧的 `×1000` 整数约定，不是语言级 `fixed`。

## `float`：已废弃

`float` 当前按 `fixed` 家族处理，并保留为兼容别名；在算术里使用会触发 `FloatArithmetic` 警告。新文档和新代码应写 `fixed`。

```rs verify-skip
// 旧代码：避免继续新增
let x: float = 1.5;

// 新代码：用 fixed
let x: fixed = 1.5;
```

## `double`：NBT-backed IEEE 754

`double` 存在，但比 `fixed` 重。它通过 `rs:d` NBT storage 保存 Java double，适合高精度、较大范围或需要 `stdlib/math_hp` 的场景。

```rs verify-skip
let d: double = 3.14159265d;
let from_fixed: double = (1.5 as fixed) as double;
let back_to_int: int = d as int; // 截断
```

注意：`double` 类型存在不等于所有算术路径都像普通语言里的原生浮点一样便宜。跨 scoreboard / NBT 边界时会有截断、scale 或 Minecraft 命令行为约束。

## `math.mcrs`：遗留 `×1000` 家族

`src/stdlib/math.mcrs` 里仍保留一组历史 API：

- `sin_fixed` / `cos_fixed`
- `sqrt_fixed`
- `lerp`
- `mulfix` / `divfix`
- `smoothstep` / `smootherstep`

这些函数的名字里虽然有 `fixed`，但它们使用的是整数 `×1000` 约定。为避免误解，新代码优先使用显式名字：

```rs verify-skip
import "stdlib/math"

let s: int = sin_fx1000(30);        // sin(30°) ×1000 = 500
let c: int = cos_fx1000(45);        // ≈ 707
let p: int = mul_fx1000(s, c);      // (500 × 707) / 1000 ≈ 353
let q: int = div_fx1000(1, 3);      // ≈ 333
let t: int = smoothstep_t1000(0, 100, 50); // 500
```

旧名仍可用，主要用于兼容；写新示例时应优先选择带比例的名称。

## `math.mcrs`：`×10000` helper

同一个 `math.mcrs` 里也有 newer helper 使用 `×10000` 比例，例如：

- `ln(x)`：输入/输出都是 `×10000`
- `exp_fx(x)`：输入/输出都是 `×10000`
- `sqrt_fx10000(x)`：输入/输出都是 `×10000`

```rs verify-skip
import "stdlib/math"

let ln_e: int = ln(27183);             // ln(2.7183) ×10000 ≈ 10000
let e1: int = exp_fx(10000);           // e^1 ×10000 ≈ 27183
let sqrt2: int = sqrt_fx10000(20000);  // √2 ×10000 ≈ 14142
```

这些 API 接收的是 `int` 比例整数，不是 `fixed` 类型值本身；调用点应把 scale 写清楚。

## `math_hp`：高精度 helper

`stdlib/math_hp` 有两类接口：

1. `sin_hp` / `cos_hp` / `ln_hp` / `sqrt_hp` 等：通常用 `int` 表示 `×10000` 输入输出。
2. `double_add` / `double_sub` / `double_mul` / `double_div` / `pow_real` 等：使用 `double` 参数和 NBT / entity / macro 技巧。

```rs verify-skip
import "stdlib/math_hp::*"

@load
fn setup() {
    init_trig(); // trig helper entity
    init_div();  // SVD/display-entity helper
}

fn hp_demo() {
    let s: int = sin_hp(450000);      // sin(45°) ×10000 ≈ 7071
    let q: int = div_hp(10000, 3000); // (1.0 / 0.3) ×10000 ≈ 33333

    let a: double = 1.25d;
    let b: double = 2.0d;
    let m: double = double_mul(a, b);
}
```

`math_hp` 的 helper 比普通 scoreboard 运算重，只在需要更高精度或对应 Minecraft 技巧时使用。

## 推荐迁移策略

1. 看到 `float`：改成 `fixed`，除非你明确在处理 NBT float 边界。
2. 看到 `mulfix` / `divfix` / `sin_fixed` / `cos_fixed`：确认调用方是不是 `×1000` 整数。如果是，改名为 `mul_fx1000` 等显式形式；如果不是，改成语言级 `fixed` 运算或 `×10000` helper。
3. 普通小数：用 `fixed` 类型和普通运算符。
4. 需要 trig/log/sqrt 且想和 `fixed` scale 对齐：优先看 `math` / `math_hp` 的 `×10000` API。
5. 真的需要 double 精度：使用 `double` / `math_hp`，并接受更高的 runtime 成本。
