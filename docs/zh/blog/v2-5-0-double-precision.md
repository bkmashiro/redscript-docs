# RedScript v2.5.0：双精度浮点、N 阶贝塞尔与标准库大重构

> **发布日期：** 2026-03-18  
> **版本：** v2.5.0  
> **测试用例：** 1277 → 1485（+208）｜**今日提交：** ~20

---

今天是 RedScript 有史以来最密集的开发日之一。v2.5.0 带来了真正的双精度浮点运算、类型系统重设计、以及一批全新的标准库模块。这篇文章记录背后的技术细节——尤其是那些"在 Minecraft 里实现 IEEE 754"的黑魔法。

## 1. 类型系统重设计

### `float` → `fixed` 重命名

原来的 `float` 类型其实从来不是 IEEE 754 浮点——它是**基于计分板整数的定点数**，实际存储值乘以 10000。换句话说：

```rs
let x: fixed = 3.14   // 内部存储为计分板整数 31400
```

这次我们把它从 `float` 重命名为 `fixed`，名副其实。

### 新增 `double` 类型

`double` 是真正的 IEEE 754 双精度浮点，底层存储在 NBT 中：

```rs
let d: double = 3.141592653589793   // 存储于 rs:d NBT storage
```

- **存储位置：** `rs:d` NBT storage（`storage rs:d`）
- **精度：** 完整 IEEE 754 double，约 15-16 位有效数字
- **编译器内置支持：** `a + b` 两个 double 相加，MIR lowering pass 自动降级为 `double_add` intrinsic

### 禁止隐式类型转换

v2.5.0 彻底取消了隐式类型转换。所有跨类型运算必须显式 `as` 转换：

```rs
let f: fixed = 1.5
let d: double = f as double   // ✅ 显式转换
let x: double = f             // ❌ 编译错误
```

### `[FloatArithmetic]` Lint 警告

对 `fixed` 类型做乘除法会触发新的 lint 警告：

```
warning[FloatArithmetic]: fixed-point multiplication may lose precision
  --> mypack/src/main.rs:12:5
   |
12 |     let result = a * b
   |                  ^^^^^
   = note: consider using `double` for higher precision arithmetic
```

---

## 2. 在 Minecraft 里实现双精度运算（技术细节）

这是本次版本最有趣的部分——如何在没有原生浮点指令的 Minecraft 命令系统里实现 IEEE 754 double 运算。

### `double_add` / `double_sub`：实体坐标技巧

**核心观察：** `loot spawn` 命令的坐标参数没有数值限制，而 Minecraft 实体的 `Pos` 字段原生存储为 IEEE 754 double。

实现思路：

1. 使用 `/tp` 将 marker 实体传送到坐标 `x = a`
2. 再相对移动 `~ + b`（即 `execute ... tp @e[...] ~b ~ ~`）
3. 读取 `Pos[0]` → 得到 `a + b`，完整 IEEE 754 double 精度

```mcfunction
# double_add(a, b) -> a + b
data modify storage rs:d in0 set from storage rs:d a
data modify storage rs:d in1 set from storage rs:d b
# ... teleport marker to a, then +b, read Pos[0]
data get entity @e[tag=rs_marker,limit=1] Pos[0]
data modify storage rs:d result set from entity @e[tag=rs_marker,limit=1] Pos[0]
```

减法同理，`b` 取负即可。

### `double_mul_fixed`：Execute Store + 函数宏

将 double 乘以一个 fixed 定点数，利用 MC 函数宏动态注入 scale 参数：

```mcfunction
$execute store result storage rs:d out double $(scale) run data get storage rs:d input 1
```

`$(scale)` 在运行时通过 MC 函数宏机制注入，等价于 `input * scale`。这样可以用不同的缩放因子复用同一段函数逻辑。

### `double_div`：Display Entity SVD 技巧

**核心观察：** Display Entity 的变换矩阵在内部做 SVD 分解时，会将矩阵归一化到最后一个元素为 1。

利用这一点：

1. 构造一个变换矩阵，其中 `matrix[3][3] = b`，`matrix[0][0] = a`
2. 读取归一化后的矩阵 → 得到 `a / b`

这是目前已知在 Minecraft 原版命令中实现任意 double 除法的唯一方案。

### 编译器 Intrinsics

编译器的 MIR lowering pass 会自动识别 double 运算并插入对应的 intrinsic 调用：

```rs
// 用户写的代码
let c: double = a + b   // a, b 都是 double

// 编译器降级为
let c = __intrinsic_double_add(a, b)
// 最终生成调用 rs:internal/double_add 的 mcfunction
```

用户无需关心底层实现，直接用 `+` `-` `*` `/` 即可。

---

## 3. 新增标准库模块

### `parabola.mcrs` — 弹道轨迹

计算抛体运动轨迹，支持给定初速度和角度计算落点，或反解出所需仰角。用于弓箭、TNT 弹射等场景。

### `quaternion.mcrs` — Display Entity 旋转

四元数运算，主要服务于 Display Entity 的平滑旋转动画。

本次修复了一个棘手的归一化 bug：在 SLERP 插值时，当两个四元数夹角接近 180° 时，归一化步骤会产生 NaN，导致 Display Entity 突然消失。修复方案是在插值前检测反平行情况并选择备用旋转轴。

```rs
// SLERP with antipodal fix
fn slerp(q1: Quaternion, q2: Quaternion, t: fixed) -> Quaternion {
    let dot = q1.dot(q2)
    // 如果点积为负，翻转 q2 确保走短弧
    let q2 = if dot < 0 { q2.negate() } else { q2 }
    // ...
}
```

### `bezier_quartic.mcrs` + `bezier_n.mcrs` — N 阶贝塞尔

- `bezier_quartic`：四阶贝塞尔曲线，硬编码展开，性能最优
- `bezier_n`：任意阶数，基于 **De Casteljau 算法** 递归实现

De Casteljau 在 Minecraft 里的实现挺有意思——递归用函数递归调用模拟，控制点存在 NBT 数组里：

```rs
// N 阶 De Casteljau
fn de_casteljau(points: [double], t: fixed, n: int) -> double {
    if n == 1 { return points[0] }
    // 递归降阶
    let reduced = lerp_adjacent(points, t, n)
    return de_casteljau(reduced, t, n - 1)
}
```

### `bigint_mul` / `bigint_sq`

大整数乘法和平方，基于计分板整数模拟多精度运算。主要用于密码学相关的 demo 和精度要求极高的计算场景。

---

## 4. 高精度数学

### `ln_hp`：高精度自然对数

基于 `ln_5term`（5 项泰勒展开）的结果，再用 **Newton 迭代细化**，最终精度达到约 8-9 位有效数字：

```
ln_hp(x):
  y₀ = ln_5term(x)           // 初始估计（5 项展开）
  y₁ = y₀ + (x - e^y₀) / x  // Newton 步：y ← y + (x - e^y)/x
  y₂ = y₁ + (x - e^y₁) / x  // 再迭代一次
```

在 fixed 类型（×10000 精度）下，两次 Newton 步通常就能达到 8 位以上精度。

### 统计分布

新增三个随机分布生成器：

| 分布 | 算法 |
|------|------|
| **Gamma 分布** | 指数分布求和（形状参数为整数时） |
| **Poisson 分布** | Knuth 算法（乘积均匀随机数） |
| **负二项分布** | 基于 Gamma + Poisson 复合 |

Knuth Poisson 算法特别适合 Minecraft，因为它只需要均匀随机数（可用 `random value` 命令生成）：

```rs
fn poisson(lambda: fixed) -> int {
    let L = exp(-lambda)
    let k = 0
    let p: fixed = 1.0
    loop {
        k += 1
        p *= random_uniform()   // uniform [0, 1)
        if p <= L { break }
    }
    return k - 1
}
```

---

## 5. 数字

| 指标 | v2.4.x | v2.5.0 | 变化 |
|------|--------|--------|------|
| 测试用例 | 1277 | 1485 | **+208** |
| 今日提交 | — | ~20 | — |
| 新增stdlib模块 | — | 7 | — |

新增 208 个测试用例覆盖了所有新的 double 运算 intrinsics、高精度数学函数、以及各统计分布的分布特性验证（均值、方差收敛检验）。

---

## 小结

v2.5.0 是一个里程碑版本。`double` 类型的加入让 RedScript 第一次拥有了真正意义上的高精度浮点运算能力，尽管底层实现需要用实体坐标、Display Entity 矩阵这些 Minecraft 机制来"模拟" IEEE 754——这也正是在受限环境下做系统编程的乐趣所在。

下一步计划：完善 `double` 与 `fixed` 互操作的类型推导，以及为标准库补充更多文档和示例。

---

*作者：bkmashiro | RedScript 项目维护者*
