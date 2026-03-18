# 教程 09：精度运算 —— fixed 与 double

**难度：** 高级
**时长：** ~30 分钟
**前置条件：** [教程 08：coroutine](./08-coroutines)

## 你将构建什么

一个复利计算器，用两种方式计算 A = P × 1.05^t：一次使用 `fixed` 定点运算（4 位小数），一次使用 `double` 精度 IEEE 754（8 位以上小数）。结果显示在 scoreboard 上。

## 你将学到什么

- `fixed` 类型：×10000 整数，存储在 scoreboard 中
- `double` 类型：IEEE 754，存储在 NBT（`rs:d`）中
- `as fixed`、`as int`、`as double` 类型转换
- `import "stdlib/math_hp.mcrs"` —— 高精度函数
- `pow_real(base, exp)` —— 实数幂运算
- 何时使用 `fixed` vs `double`

## 两种精度类型

### fixed —— 4 位小数

`fixed` 本质上是一个带隐式 ×10000 缩放的普通整数：

```rs
// 1.5 存储为 15000
let a: fixed = 15000 as fixed

// "真实值"始终为：存储整数 / 10000
// 15000 / 10000 = 1.5  ✓
```

**优点：** 速度快，使用 scoreboard，兼容所有 MC 版本。
**局限：** 只有 4 位小数；原始整数溢出上限为 ±214748（×10000 → ±21.4748 亿）。

### double —— IEEE 754 全精度

`double` 使用 MC 的 NBT 存储（`rs:d`）实现真正的 IEEE 754 64 位浮点数：

```rs
let base: double = 1.05d    // d 后缀 = double 字面量

// ~15 位有效数字
// 比 fixed 慢（需要实体/存储操作）
// 需要 import "stdlib/math_hp.mcrs"
```

**优点：** ~15 位有效数字，可表示非常大和非常小的值。
**局限：** 比 `fixed` 慢；算术运算需要 `import "stdlib/math_hp.mcrs"`。

## 第一步：fixed 运算

```rs
fn fixed_demo() {
    // 加减法：直接对原始整数进行运算
    let a: fixed = 15000 as fixed   // 1.5
    let b: fixed = 25000 as fixed   // 2.5
    let sum: int = (a as int) + (b as int)   // 40000 = 4.0  ✓

    // 乘法：相乘后除以 10000 以保持缩放比例
    let product: int = (a as int) * (b as int) / 10000  // 37500 = 3.75  ✓

    // 百分比：score * 10000 / max
    let score: int = 750
    let pct: fixed = (score * 10000 / 1000) as fixed   // 7500 = 75.00%
}
```

## 第二步：复利（fixed）

```rs
@on_trigger("compound_interest")
fn compound_interest() {
    let principal: int = 1000
    let base_fx: int = 10500   // 1.05 × 10000

    let amount: int = principal
    let t: int = 0
    while (t < 10) {
        // A = A * 1.05  →  A = A * 10500 / 10000
        amount = amount * base_fx / 10000
        t = t + 1
    }

    // 期望值：1000 * 1.05^10 ≈ 1628.89
    // fixed 结果：1628（每步截断累积小误差）
    tell(@s, "Fixed result: " + amount + " (expected ~1629)")
    scoreboard_set("#result_fx", "result_display", amount)
}
```

## 第三步：复利（double）

```rs
import "stdlib/math_hp.mcrs"

@load
fn on_load() {
    init_trig()   // math_hp 模块所需
}

@on_trigger("compound_double")
fn compound_double() {
    // pow_real(base, exp) 使用 ln/exp 方法计算 base^exp
    let base: double = 1.05d
    let exp_val: double = 10.0d

    let result: double = pow_real(base, exp_val) as double
    // result ≈ 1.6289（IEEE 754 精度）

    // 转换为 ×10000 整数以供显示
    let result_int: int = result as int   // 16289
    scoreboard_set("#result_dbl", "result_display", result_int)
    tell(@s, "Double result (×10000): " + result_int + " = 1.6289")
}
```

## 第四步：类型转换

```rs
fn cast_demo() {
    // int → fixed：标记为 fixed（无转换，只是类型注解）
    let i: int = 42
    let f: fixed = i as fixed         // 仍然存储 42（表示 0.0042！）

    // 若要表示 4.2：存储 42000
    let four_two: fixed = 42000 as fixed   // 表示 4.2

    // fixed → int：去掉类型，保留原始数字
    let raw: int = four_two as int         // 42000

    // 提取各部分：
    let integer_part: int = raw / 10000     // 4
    let decimal_part: int = raw % 10000     // 2000（= 0.2 × 10000）

    // double → int：读取值 × 10000
    let d: double = 3.14d
    let d_int: int = d as int    // 31400（3.14 × 10000）
}
```

## 第五步：如何选择

| 场景 | 使用 |
|-----------|-----|
| 百分比、比率、分数 | `fixed` |
| 简单游戏数学（HP 百分比、计时器） | `fixed` |
| 需要超过 4 位小数 | `double` |
| 科学/金融计算 | `double` |
| 复利、对数 | `double` + `math_hp` |
| 必须在 MC 1.16+ 上运行且不用实体技巧 | `fixed` |

## 完整代码

完整示例：[tutorial_09_precision.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_09_precision.mcrs)

## 试试看

1. 安装并执行 `/reload`
2. `/trigger fixed_demo` —— 在聊天栏查看定点运算结果
3. `/trigger compound_interest` —— 定点复利计算
4. `/trigger compound_double` —— double 精度复利计算
5. 在边栏 scoreboard 中比较两个结果
6. `/trigger cast_demo` —— 观察类型转换的效果

## 精度对比

| 方法 | 1000 × 1.05^10 | 误差 |
|--------|----------------|-------|
| 真实值 | 1628.8946... | — |
| `fixed`（逐步计算） | 1628 | ~0.89 |
| `double`（pow_real） | 1628.89... | <0.001 |

## 下一步

→ [教程 10：完整游戏 —— 击杀竞速](./10-full-game)
