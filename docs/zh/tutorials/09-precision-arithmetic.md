# 教程 09：精度运算 —— fixed 与 double

<div class="tutorial-meta">
  <span class="difficulty advanced">🔴 高级</span>
  <span class="time">⏱️ 25 min</span>
</div>

**难度：** 高级
**时长：** ~30 分钟
**前置条件：** [教程 08：coroutine](./08-coroutines)

## 你将构建什么

一个复利计算器，用两种方式计算 A = P × 1.05^t：

- 使用语言级 `fixed`（标准 ×10000）
- 使用 `double`（NBT 后端的 IEEE 754）

结果显示在 scoreboard 上。

## 你将学到什么

- `fixed`：`×10000` 语义与转换规则
- `double`：NBT 后端 `rs:d` 类型与精度取舍
- `as fixed`、`as int`、`as double` 类型转换
- 如何按需使用低层比例明确的 stdlib 辅助函数（`fx1000`/`fx10000` 名称）

## 两种精度类型

### fixed —— 4 位小数（×10000）

`fixed` 是标准整数类型，但其语义固定为 ×10000 缩放：

```rs
let a: fixed = 1.5;     // 实际存储 15000
let b: fixed = 2.5;     // 实际存储 25000
let i: int = 5;
let c: fixed = i as fixed; // 5 as fixed -> 50000（整数 ×10000）
```

- **优点：** 快，纯 scoreboard 运算，兼容所有支持的 MC 版本
- **缺点：** 只有 4 位小数，需注意中间值避免 int32 溢出

### double —— IEEE 754 全精度

`double` 值存储在 NBT 的 Java double（`rs:d`）中：

```rs
let pi: double = 3.14159265d;
```

- **优点：** 更高精度和更大指数范围，适合复杂数学
- **缺点：** 比 fixed 慢；回到 scoreboard/int 时会经过 ×10000 边界，可能产生截断/舍入

## 第一步：语言级 fixed 运算

普通 `fixed` 运算直接使用运算符：

```rs
fn fixed_demo() {
    let a: fixed = 1.5;
    let b: fixed = 2.5;

    let sum: fixed = a + b;   // 4.0
    let diff: fixed = b - a;  // 1.0

    // 编译器会自动在 fixed×fixed 运算中恢复 ×10000 缩放
    let product: fixed = a * b;      // 3.75
    let ratio: fixed = a / b;        // 0.6

    let score: fixed = 750 as fixed;
    let max_score: fixed = 1000 as fixed;
    let pct: fixed = score / max_score;   // 0.75

    tell(@s, f"sum={sum as int}, product={product as int}, pct(raw)={pct as int}");
}
```

## 第二步：复利（fixed）

```rs
@on_trigger("compound_interest")
fn compound_interest() {
    let principal: fixed = 1000 as fixed;
    let growth: fixed = 1.05;

    let amount: fixed = principal;
    let t: int = 0;
    while (t < 10) {
        // fixed 路径：amount = amount * 1.05，缩放仍保持 ×10000
        amount = amount * growth;
        t = t + 1;
    }

    // 1000 × 1.05^10 ≈ 1628.89
    // `as int` 显示截断后的整数部分。
    // 预期整数部分约 1628
    tell(@s, f"Fixed 结果（整数部分）: {amount as int}");
    scoreboard_set("#result_fx", "result_display", amount as int);
}
```

## 第三步：复利（double）

```rs
import "stdlib/math_hp::*"

@load
fn on_load() {
    init_trig();   // math_hp 所需初始化
}

@on_trigger("compound_double")
fn compound_double() {
    // pow_real(base, exp) 使用高精度 helper 路径
    let base: double = 1.05d;
    let exp_val: double = 10.0d;

    let result: double = pow_real(base, exp_val);
    // 1.6289...

    // 转成整数显示时会截断小数部分
    let result_int: int = result as int; // 1
    scoreboard_set("#result_dbl", "result_display", result_int);
    tell(@s, f"Double 结果（整数部分）: {result_int}; 真实值约 1.6289");
}
```

## 第四步：类型转换

```rs
fn cast_demo() {
    let i: int = 42;
    let from_int: fixed = i as fixed;     // 420000 raw => 42.0

    let from_literal: fixed = 4.2;        // 42000 raw => 4.2
    let trunc_to_int: int = from_literal as int;  // 4

    let back_to_double: double = from_literal as double;
    let d_int: int = 3.14d as int;       // 3
}
```

- `int as fixed`：乘以 10000
- `fixed as int`：除以 10000（截断）
- `fixed as double`：通过 fixed 边界转换到 NBT double

## 第五步：低层 stdlib 辅助函数（比例显式）

与底层/历史 stdlib 辅助函数互操作时，请显式传入比例整数：

```rs
import "stdlib/math"

fn legacy_helper_demo() {
    // legacy trig 是 ×1000 原始整数 API
    let angle: int = 45000;      // 45.0° × 1000
    let sin45: int = sin_fx1000(angle);  // 500
    let cos45: int = cos_fx1000(angle);  // 707（近似）

    // 新代码建议使用显式的 ×1000 名称
    let blend: int = lerp_t1000(0, 1000, 500); // 500
    let mul: int = mul_fx1000(500, 707);        // 353

    // ×10000 helper
    let sqrt2: int = sqrt_fx10000(20000);       // ≈ 14142（√2 × 10000）
}
```

这些 `fx` 前缀名称会把规模约定写在调用处；不带 `fx` 的旧名字仍保持兼容可用。

## 精度对比

| 方法 | 1000 × 1.05^10 | 误差 |
|--------|----------------|-------|
| 真实值 | 1628.8946... | — |
| `fixed`（逐步计算） | ~1628（显示为整数部分） | ~0.89 |
| `double`（pow_real） | 1628.89... | <0.001 |

## 试试看

1. 安装并 `/reload`
2. `/trigger compound_interest` —— fixed 复利计算
3. `/trigger compound_double` —— double 精度复利计算
4. 在侧边栏 scoreboard 比较两者结果
5. `/trigger cast_demo` —— 观察转换行为

## 下一步

→ [教程 10：完整游戏 —— 击杀竞速](./10-full-game)
