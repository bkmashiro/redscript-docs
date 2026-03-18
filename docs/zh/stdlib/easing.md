# `easing` — 动画与过渡缓动函数

Import: `import easing;`

用于平滑动画、UI 过渡和抛射体弧线的标准缓动函数。所有函数接受 `t ∈ [0, 10000]`（定点数 ×10000），返回值 ∈ `[0, 10000]`（弹性/弹跳可能略超出此范围）。依赖 `math` 中的 `abs`、`clamp`。

## Functions

### `ease_linear(t: int): int`

线性缓动——无变换。

**Example:**
```rs
import easing;
let v: int = ease_linear(5000);  // 5000
```

---

### `ease_in_quad(t: int): int`

二次缓入：慢起步，快结束。`f(t) = t²`。

**Example:**
```rs
import easing;
let v: int = ease_in_quad(5000);  // 2500
```

---

### `ease_out_quad(t: int): int`

二次缓出：快起步，慢结束。

---

### `ease_in_out_quad(t: int): int`

二次缓入缓出：慢起步慢结束，中间快。

---

### `ease_in_cubic(t: int): int`

三次缓入：`f(t) = t³`。

---

### `ease_out_cubic(t: int): int`

三次缓出。

---

### `ease_in_out_cubic(t: int): int`

三次缓入缓出。

---

### `ease_in_quart(t: int): int`

四次缓入：`f(t) = t⁴`。

---

### `ease_out_quart(t: int): int`

四次缓出。

---

### `ease_in_sine(t: int): int`

正弦近似缓入，使用 `1 - cos(t×π/2)` 的多项式近似。

---

### `ease_out_sine(t: int): int`

正弦近似缓出。

---

### `ease_in_out_sine(t: int): int`

正弦近似缓入缓出。

---

### `ease_in_expo(t: int): int`

指数缓入：极慢起步，爆发式结束。使用三次代理近似。

---

### `ease_out_expo(t: int): int`

指数缓出。

---

### `ease_in_back(t: int): int`

回弹缓入：前进前先轻微后退。过冲常数 c1 ≈ 1.70158。

---

### `ease_out_back(t: int): int`

回弹缓出。

---

### `ease_in_out_back(t: int): int`

回弹缓入缓出。

---

### `ease_out_bounce(t: int): int`

弹跳缓出：结尾产生弹跳效果（落球效果）。分段实现，含 4 段弹跳。

---

### `ease_in_bounce(t: int): int`

弹跳缓入。

---

### `ease_in_out_bounce(t: int): int`

弹跳缓入缓出。

---

### `ease_smooth(t: int): int`

Smoothstep：`3t² - 2t³`。等价于 Ken Perlin 的 smoothstep，在此重新导出以方便使用。

---

### `ease_smoother(t: int): int`

Smootherstep（Ken Perlin 5 阶）：`6t⁵ - 15t⁴ + 10t³`。加速曲线更平滑，两端一阶和二阶导数均为零。

**Example:**
```rs
import easing;
let t: int = 3000;  // 动画进行到 30%
let v: int = ease_out_bounce(t);
// 使用 v 插值位置
```
