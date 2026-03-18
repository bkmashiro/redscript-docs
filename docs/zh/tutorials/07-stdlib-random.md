# 教程 07：标准库 —— 随机数与噪声

**难度：** 中级
**时长：** ~25 分钟
**前置条件：** [教程 06：数学与粒子](./06-stdlib-math)

## 你将构建什么

一个宝箱生成器，使用随机战利品表、数值噪声作为自然感奖励倍率，以及二项分布采样决定奖励宝箱数量 —— 所有这些都从一个持久化的 scoreboard 值中取种子。

## 你将学到什么

- `import random::*` —— 基于 LCG 的伪随机数
- `next_lcg`、`random_range`、`random_bool`
- `binomial_sample` —— 概率试验计数
- `import noise::*` —— 平滑程序化噪声
- `value_noise_1d`、`fbm_1d`、`terrain_height`

## 第一步：LCG 种子模式

RedScript 的 `random` 模块使用**线性同余生成器（LCG）**。你需要维护一个种子变量，用 `next_lcg` 推进它，并从中提取随机值：

```rs
import random::*

@load
fn setup() {
    scoreboard_add_objective("rng_seed", "dummy")
    // 初始种子 —— 任意非零整数
    scoreboard_set("#seed", "rng_seed", 987654321)
}

fn advance_seed() -> int {
    let seed: int = scoreboard_get("#seed", "rng_seed")
    seed = next_lcg(seed)
    scoreboard_set("#seed", "rng_seed", seed)
    return seed
}
```

始终将种子存储在 scoreboard 中，这样它可以在 tick 之间和服务器重启后持续保留。

## 第二步：random_range

```rs
// random_range(seed, lo, hi) → [lo, hi) 范围内的整数（hi 不包含）
let seed: int = advance_seed()
let roll: int = random_range(seed, 0, 10)   // 0, 1, 2, ... 9
```

用于战利品表：

```rs
fn pick_loot_item(seed: int) -> string {
    let roll: int = random_range(seed, 0, 10)
    if (roll < 2) { return "minecraft:diamond" }     // 20%
    if (roll < 5) { return "minecraft:gold_ingot" }  // 30%
    if (roll < 8) { return "minecraft:iron_ingot" }  // 30%
    return "minecraft:bread"                          // 20%
}
```

## 第三步：value_noise_1d —— 平滑随机性

`random_range` 给出独立随机值，而 `value_noise_1d` 给出**平滑**过渡的值 —— 非常适合自然感的奖励：

```rs
import noise::*

// value_noise_1d(x_fx) → [0, 10000]
// x_fx 是定点坐标（×10000）
// 相邻位置返回相似值（平滑插值）

let seed2: int = advance_seed()
let noise_val: int = value_noise_1d(seed2)  // 0..10000

// 映射到 [1, 3]：1 + noise * 2 / 10000
let count: int = 1 + noise_val * 2 / 10000  // 1、2 或 3
```

## 第四步：binomial_sample —— 概率试验

`binomial_sample(n, p, seed)` 模拟 n 次独立伯努利试验，每次成功概率为 p，返回成功次数：

```rs
// binomial_sample(n, p_x10000, seed)
// n=3 次试验，p=0.25（25%）→ 返回 0、1、2 或 3
let seed3: int = advance_seed()
let bonus: int = binomial_sample(3, 2500, seed3)
```

对于"有多少个奖励宝箱"这类问题，它比 `random_range` 更符合现实 —— 结果自然地聚集在期望值附近（此处为 0.75）。

## 第五步：宝箱 trigger

```rs
@on_trigger("open_chest")
fn open_chest() {
    // 第一步：选择战利品类型
    let seed1: int = advance_seed()
    let item: string = pick_loot_item(seed1)

    // 第二步：用平滑噪声决定数量（1-3）
    let seed2: int = advance_seed()
    let noise_val: int = value_noise_1d(seed2)
    let count: int = 1 + noise_val * 2 / 10000

    // 第三步：用二项分布决定奖励宝箱数量
    let seed3: int = advance_seed()
    let bonus: int = binomial_sample(3, 2500, seed3)

    give(@s, item, count)
    tell(@s, "Found: " + count + "x loot!")

    if (bonus > 0) {
        tell(@s, "BONUS: " + bonus + " extra chests!")
        let b: int = 0
        while (b < bonus) {
            let bseed: int = advance_seed()
            give(@s, pick_loot_item(bseed), 1)
            b = b + 1
        }
    }
}
```

## 第六步：用 FBM 生成地形高度

如需自然感的地形生成，使用 `fbm_1d` 或便捷函数 `terrain_height`：

```rs
// terrain_height(x, z, base_y, amplitude)
// 内部使用 3 倍频 FBM 噪声
let h: int = terrain_height(10, 5, 64, 20)  // 基准=64，±20 格变化
```

FBM（分形布朗运动）叠加多个噪声倍频，产生丰富自然的变化：

```rs
// fbm_1d(x_fx, octaves, persistence_fx)
// persistence=5000 表示每个倍频的振幅是上一个的一半
let n: int = fbm_1d(50000, 4, 5000)   // x=5.0，4 个倍频，persistence=0.5
```

## 完整代码

完整示例：[tutorial_07_random.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_07_random.mcrs)

## 试试看

1. 安装并执行 `/reload`
2. 多次执行 `/trigger open_chest` —— 观察不同的战利品和数量
3. `/trigger terrain_demo` —— 查看基于噪声的坐标高度
4. `/trigger fbm_demo` —— 查看 8 个位置的 FBM 值
5. `/trigger coin_flip` —— 50/50 随机布尔值

## 随机数与噪声对比

| 使用场景 | 函数 | 说明 |
|----------|----------|-------|
| 独立随机事件 | `random_range`、`random_bool` | 每次调用互相独立 |
| 空间上的平滑值 | `value_noise_1d/2d` | 相邻点 → 相似值 |
| 丰富的地形变化 | `fbm_1d/2d` | 多倍频平滑噪声 |
| 统计 n 次试验的成功次数 | `binomial_sample` | 比简单百分比更真实 |
| 地形生成 | `terrain_height` | fbm_2d 的便捷封装 |

## 下一步

→ [教程 08：coroutine —— 分散繁重工作](./08-coroutines)
