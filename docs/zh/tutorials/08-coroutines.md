# 教程 08：coroutine —— 分散繁重工作

**难度：** 高级
**时长：** ~30 分钟
**前置条件：** [教程 07：随机数与噪声](./07-stdlib-random)

## 你将构建什么

一个两阶段区域扫描器：阶段一使用 `@coroutine(batch=50)` 将对 100×100 区域（10,000 次迭代）的扫描分散到 200 个 tick 中完成；阶段二在扫描完成后自动公告结果。

## 你将学到什么

- 为什么大型循环会触发 `maxCommandChainLength` 错误
- `@coroutine(batch=N)` —— 将循环迭代分散到多个 tick 中
- yield 在循环**回边**（back-edge）处发生（而非通过 `yield` 关键字）
- `onDone` —— coroutine 结束时自动回调
- coroutine 链式调用（顺序流水线）

## 问题：maxCommandChainLength

Minecraft 限制了单个 tick 内可运行的命令数量（默认：65,536）。一个有 10,000 次迭代的紧凑循环很容易超出这个限制：

```rs
// 没有 @coroutine —— 在大型输入下会崩溃！
fn scan_region_bad() {
    let i: int = 0
    while (i < 10000) {
        // 每次迭代 = 多条 MC 命令
        // 10000 × 5 条命令 = 50,000 → 接近限制！
        scan_block(i)
        i = i + 1
    }
}
```

## 解决方案：@coroutine(batch=N)

`@coroutine(batch=50)` 让循环每 50 次迭代就 yield 一次，而不是一次性全部运行：

```rs
@coroutine(batch=50)
fn run_scan() {
    let i: int = 0
    while (i < 10000) {
        // ... 工作 ...
        i = i + 1
        // ← 回边：每 50 次迭代在此 yield
    }
    scan_complete()   // onDone：循环结束时自动调用
}
```

**时间线：**
- 第 1 tick：迭代 0-49
- 第 2 tick：迭代 50-99
- ...
- 第 200 tick：迭代 9950-9999
- 第 201 tick：调用 `scan_complete()`

## yield 的工作原理

> **重要：** 没有 `yield` 关键字。yield 自动发生在每个循环的**回边**处 —— 即再次检查循环条件的那一刻。当 `batch=50` 时，coroutine 在每 50 次回边越过后暂停。

```rs
@coroutine(batch=10)
fn my_coroutine() {
    let i: int = 0
    while (i < 100) {
        do_work(i)
        i = i + 1
        // ← 这就是回边。每经过 10 次，暂停直到下一个 tick。
    }
    // while 正常退出后，下一行在同一个 tick 内运行：
    on_done()
}
```

## 第一步：状态与初始化

```rs
struct ScanState {
    blocks_checked: int,
    special_found: int,
    scan_running: int
}

let scan: ScanState = {
    blocks_checked: 0,
    special_found: 0,
    scan_running: 0
}

@load
fn setup() {
    scoreboard_add_objective("scan_data", "dummy")
    say("Coroutine tutorial! /trigger start_scan")
}
```

## 第二步：Trigger

```rs
@on_trigger("start_scan")
fn start_scan() {
    if (scan.scan_running == 1) {
        tell(@s, "Scan in progress!")
        return
    }

    scan.blocks_checked = 0
    scan.special_found = 0
    scan.scan_running = 1

    announce("Starting 100x100 scan... (~10 seconds)")
    run_scan()
}
```

## 第三步：coroutine

```rs
@coroutine(batch=50)
fn run_scan() {
    let i: int = 0
    while (i < 10000) {
        // 模拟方块检查：x = i%100, z = i/100
        if (i % 200 == 0) {
            scan.special_found = scan.special_found + 1
        }
        scan.blocks_checked = scan.blocks_checked + 1

        // 每 1000 个方块显示一次进度
        if (scan.blocks_checked % 1000 == 0) {
            let pct: int = scan.blocks_checked * 100 / 10000
            actionbar(@a, f"Scanning: {pct}%")
        }

        i = i + 1
        // ← 每 50 次迭代 yield
    }
    scan_complete()   // 完成后自动触发
}
```

## 第四步：完成处理器

```rs
fn scan_complete() {
    scan.scan_running = 0

    say("=== Scan Complete! ===")
    say(f"Checked: {scan.blocks_checked} blocks")
    say(f"Special: {scan.special_found} blocks found")

    title(@a, "Scan Done!")
    let found: int = scan.special_found
    subtitle(@a, f"Special blocks found: {found}")
}
```

## 第五步：coroutine 链式调用

你可以将多个 coroutine 链接成流水线 —— 每个 coroutine 将下一个作为其 `onDone` 调用：

```rs
@on_trigger("chained_scan")
fn start_chained() {
    phase1_collect()
}

@coroutine(batch=100)
fn phase1_collect() {
    let i: int = 0
    while (i < 500) { i = i + 1 }
    announce("Phase 1 done — starting phase 2")
    phase2_process()
}

@coroutine(batch=25)
fn phase2_process() {
    let i: int = 0
    while (i < 200) { i = i + 1 }
    announce("Phase 2 done — starting phase 3")
    phase3_report()
}

fn phase3_report() {
    say("Pipeline complete!")
}
```

## 完整代码

完整示例：[tutorial_08_coroutine.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_08_coroutine.mcrs)

## 试试看

1. 安装并执行 `/reload`
2. `/trigger start_scan` —— 观察约 10 秒内的 actionbar 进度
3. 完成后，结果显示在聊天栏和屏幕上
4. 随时执行 `/trigger scan_status` 查看当前进度
5. `/trigger chained_scan` 查看三阶段流水线

## 选择 batch 大小

| batch 大小 | 10,000 次迭代所需 tick |
|-----------|----------------------------|
| 10 | 1,000 tick（50 秒） |
| 50 | 200 tick（10 秒） |
| 100 | 100 tick（5 秒） |
| 500 | 20 tick（1 秒） |

经验法则：`batch ≈ commandBudget / commandsPerIteration`。如果每个循环体运行约 10 条 MC 命令，使用 `batch ≤ 500` 以保持在每 tick 65,536 条命令限制以内。

## 何时使用 coroutine

✅ 适合的场景：
- 扫描、填充或检查大片区域
- 逐方块生成程序化地形
- 对大量实体运行复杂算法

❌ 不适合的场景：
- 必须在单个 tick 内完成的逻辑（例如游戏关键性检查）
- 小型循环（< 1,000 次迭代）—— 开销不值得

## 下一步

→ [教程 09：精度运算 —— fixed 与 double](./09-precision-arithmetic)
