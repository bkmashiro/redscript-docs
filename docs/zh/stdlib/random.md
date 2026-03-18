# `random` — LCG/PCG 随机数生成器与概率分布

Import: `import random;`

伪随机数生成器与统计采样。LCG（线性同余生成器），参数来自 Numerical Recipes（a=1664525，c=1013904223，通过 int32 溢出实现模 2³²）。还提供简化的 PCG32 变体、二项分布采样和超几何分布采样。

## Functions

### `next_lcg(seed: int): int`

推进 LCG 状态：`seed × 1664525 + 1013904223`。返回值既是新种子，也是随机输出。速度快，适合大多数游戏逻辑。

**Example:**
```rs
import random;
let seed: int = 12345;
seed = next_lcg(seed);
```

---

### `random_range(seed: int, lo: int, hi: int): int`

返回 `[lo, hi)` 范围内的整数。`seed` 应为 `next_lcg` 的输出。使用绝对值 + 取模。

**Example:**
```rs
import random;
let seed: int = next_lcg(42);
let roll: int = random_range(seed, 1, 7);  // d6: 1–6
```

---

### `random_bool(seed: int): int`

以等概率返回 0 或 1。

---

### `pcg_next_lo(state_lo: int): int`

推进 PCG 状态低位字。与 `pcg_next_hi` 配合使用以维护双字状态。

---

### `pcg_next_hi(state_hi: int, state_lo: int): int`

推进 PCG 状态高位字。

---

### `pcg_output(state_lo: int): int`

使用 XSH-RR 置换（简化异或移位）从 PCG 低位字提取输出值。

> **Note:** Statistical quality is better than plain LCG but this is a simplified PCG32 variant, not the full reference implementation.

---

### `binomial_sample(n: int, p_x10000: int, seed: int): int`

> **Cost:** O(n) — n LCG advances

统计 `n` 次 Bernoulli 试验中的成功次数。`p_x10000`：概率 ×10000（5000 = 50%）。返回计数 ∈ `[0, n]`。

**Example:**
```rs
import random;
let hits: int = binomial_sample(10, 3000, 99999);  // 10 次试验，每次 30% 概率
```

---

### `hypergeometric_sample(pop_size: int, success_states: int, draws: int, seed: int): int`

> **Cost:** O(draws)

从 `pop_size` 个物品（其中 `success_states` 个为成功项）中无放回抽取 `draws` 个。返回抽到的成功项数 ∈ `[0, min(draws, success_states)]`。

**Example:**
```rs
import random;
// 从 52 张牌中抽 5 张，其中有 4 张 A
let aces: int = hypergeometric_sample(52, 4, 5, 12345);
```
