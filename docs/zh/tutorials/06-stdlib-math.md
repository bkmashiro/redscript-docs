# 教程 06：标准库 —— 数学与粒子

**难度：** 中级
**时长：** ~25 分钟
**前置条件：** [教程 05：decorator 与调度](./05-decorators)

## 你将构建什么

一系列视觉特效：一圈火焰粒子、一条附魔粒子螺旋线，以及用末地烛粒子绘制的正弦波 —— 全部使用 `math` 和 `particles` 标准库模块。

## 你将学到什么

- `import "stdlib/math.mcrs"` 和 `import "stdlib/particles.mcrs"`
- `sin_fixed`、`cos_fixed` —— 角度制三角函数，结果 ×1000
- `sqrt_fixed`、`sqrt_fx` —— 平方根
- `lerp`、`clamp`、`abs`、`min`、`max`
- `mulfix` —— 两个定点数相乘
- particles 标准库中的 `draw_circle`、`draw_helix`、`particle_dot`

## 第一步：导入

```rs
import "stdlib/math.mcrs"
import "stdlib/particles.mcrs"
```

`import "stdlib/math.mcrs"` 引入 `math` 标准库的所有函数。无需指定路径 —— RedScript 会自动解析标准库模块。

## 第二步：核心数学函数

```rs
fn demo_math() {
    // abs —— 绝对值
    let neg: int = abs(-42)           // 42

    // min / max
    let lo: int = min(10, 20)         // 10
    let hi: int = max(10, 20)         // 20

    // clamp —— 限制在 [lo, hi] 范围内
    let clamped: int = clamp(150, 0, 100)  // 100

    // isqrt —— 整数向下取整平方根
    let root: int = isqrt(144)        // 12

    // sqrt_fixed —— 缩放因子=1000 的平方根
    // sqrt_fixed(2000) 表示 sqrt(2.0) * 1000 ≈ 1414
    let sq2: int = sqrt_fixed(2000)   // 1414

    // sqrt_fx —— 缩放因子=10000 的平方根
    let sq2_hp: int = sqrt_fx(20000)  // 14142

    // lerp —— 线性插值，t ∈ [0, 1000]
    // lerp(a, b, 500) = a 和 b 的中点
    let mid: int = lerp(100, 200, 500)  // 150
}
```

## 第三步：三角函数

`math` 模块使用**整数角度（度）**，返回值**×1000**：

```rs
// sin_fixed(degrees) → sin(deg) × 1000
let sin30: int = sin_fixed(30)   // 500  (sin 30° = 0.5)
let sin90: int = sin_fixed(90)   // 1000 (sin 90° = 1.0)
let sin45: int = sin_fixed(45)   // 707  (sin 45° ≈ 0.707)

// cos_fixed(degrees) → cos(deg) × 1000
let cos0: int = cos_fixed(0)     // 1000 (cos 0° = 1.0)
let cos60: int = cos_fixed(60)   // 500  (cos 60° = 0.5)

// mulfix —— 两个 ×1000 值相乘：a*b/1000
// 例：sin(30°) * cos(60°) = 0.5 * 0.5 = 0.25 * 1000 = 250
let prod: int = mulfix(sin30, cos60)  // 250
```

## 第四步：绘制圆形

`particles` 标准库提供了 `draw_circle()`，它在内部使用 `sin_fixed`/`cos_fixed`：

```rs
@on_trigger("draw_circle")
fn do_draw_circle() {
    // draw_circle(cx, cy, cz, radius_x100, steps, particle)
    // radius_x100=500 表示半径 5.0 格
    draw_circle(0, 65, 0, 500, 36, "minecraft:flame")
    tell(@s, "Drew a circle of 36 flame particles!")
}
```

## 第五步：绘制螺旋线

```rs
@on_trigger("draw_helix")
fn do_draw_helix() {
    // draw_helix(cx, cy_start, cz, radius_x100, height, rotations, steps, particle)
    draw_helix(0, 64, 0, 300, 10, 3, 60, "minecraft:enchant")
    tell(@s, "Drew a helix rising 10 blocks with 3 rotations!")
}
```

## 第六步：手动绘制正弦波

手动绘制正弦波可以展示三角函数的工作原理：

```rs
@on_trigger("draw_sine")
fn draw_sine_wave() {
    let i: int = 0
    while (i < 36) {
        let angle: int = i * 10          // 以 10° 为步长，从 0° 到 350°
        let sin_val: int = sin_fixed(angle)  // -1000 到 +1000

        // Y 偏移：振幅 ±3 格
        let y_offset: int = sin_val * 3 / 1000
        let y_pos: int = 65 + y_offset

        // particle_dot 在整数方块坐标处放置单个粒子
        particle_dot(i, y_pos, 0, "minecraft:end_rod")
        i = i + 1
    }
    tell(@s, "Drew a sine wave!")
}
```

关键公式：`y = base + sin(angle) * amplitude / 1000` —— 除以 1000 是因为 `sin_fixed` 使用 ×1000 缩放。

## 完整代码

完整示例：[tutorial_06_math_particles.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_06_math_particles.mcrs)

## 试试看

1. 安装并执行 `/reload`
2. `/trigger demo_math` —— 在聊天栏查看数学计算结果
3. `/trigger draw_circle` —— (0, 65, 0) 处出现一圈火焰
4. `/trigger draw_helix` —— 附魔粒子螺旋上升 10 格
5. `/trigger draw_sine` —— Z=0 处出现末地烛正弦波

## math 标准库速查表

| 函数 | 输入 | 输出 | 说明 |
|----------|-------|--------|-------|
| `abs(x)` | int | int | 绝对值 |
| `min(a,b)` | int | int | 两者中较小值 |
| `max(a,b)` | int | int | 两者中较大值 |
| `clamp(x,lo,hi)` | int | int | 限制到范围内 |
| `isqrt(n)` | int | int | 向下取整平方根 |
| `sqrt_fixed(x)` | int ×1000 | int ×1000 | 定点平方根 |
| `sqrt_fx(x)` | int ×10000 | int ×10000 | 定点平方根 |
| `sin_fixed(deg)` | 度数 | int ×1000 | 正弦 |
| `cos_fixed(deg)` | 度数 | int ×1000 | 余弦 |
| `lerp(a,b,t)` | t ∈ [0,1000] | int | 线性插值 |
| `mulfix(a,b)` | int ×1000 各一个 | int ×1000 | a*b/1000 |

## 下一步

→ [教程 07：标准库 —— 随机数与噪声](./07-stdlib-random)
