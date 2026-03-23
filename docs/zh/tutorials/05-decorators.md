# 教程 05：decorator 与调度

<div class="tutorial-meta">
  <span class="difficulty intermediate">🟡 Intermediate</span>
  <span class="time">⏱️ 20 min</span>
</div>


**难度：** 中级
**时长：** ~20 分钟
**前置条件：** [教程 04：selector 与执行上下文](./04-selectors-context)

## 你将构建什么

一个倒计时计时器系统。玩家通过 `/trigger start_countdown` 触发 10 秒倒计时，标题每秒更新一次，归零时发射烟花。另有一个 trigger 使用 `@schedule` 将消息延迟 5 秒发送。

## 你将学到什么

- `@load` — 世界加载时执行一次
- `@tick` — 每游戏刻（每秒 20 次）
- `@tick(rate=N)` — 每 N 个 tick 执行一次
- `@on_trigger("name")` — 玩家激活
- `@schedule(N)` — N 个 tick 后执行一次

## decorator 参考

| decorator | 执行时机 |
|-----------|-------------|
| `@load` | 世界加载或 `/reload` 时执行一次 |
| `@tick` | 每 tick 执行（每秒 20 次）—— 请谨慎使用！ |
| `@tick(rate=20)` | 每 20 tick = 每秒执行一次 |
| `@tick(rate=100)` | 每 100 tick = 每 5 秒执行一次 |
| `@on_trigger("x")` | 玩家执行 `/trigger x` 时 |
| `@schedule(40)` | 调用后 40 tick（2 秒）后执行一次 |

## 第一步：加载

```rs
@load
fn on_load() {
    scoreboard_add_objective("tut05_data", "dummy")
    say("Countdown system ready! /trigger start_countdown")
}
```

## 第二步：限速 tick

```rs
// 每 20 tick 运行一次 = 精确地每秒一次
@tick(rate=20)
fn every_second() {
    if (timer.running == 0) {
        return   // 无事可做
    }

    timer.seconds_left = timer.seconds_left - 1

    if (timer.seconds_left > 0) {
        show_countdown(timer.seconds_left)
    } else {
        fire_at_zero()
    }
}
```

`@tick(rate=20)` 比 `@tick` 开销小得多 —— 你的函数每秒只运行 1 次而非 20 次。

## 第三步：倒计时显示

```rs
fn show_countdown(sec: int) {
    tell(@a, f"Countdown: {sec}")
    if (sec <= 3) {
        subtitle(@a, "Hurry!")
        actionbar(@a, f"⏱ {sec} seconds!")
    } else {
        subtitle(@a, "Get ready...")
        actionbar(@a, f"Countdown: {sec}")
    }
}
```

## 第四步：Trigger

```rs
// 玩家输入：/trigger start_countdown
@on_trigger("start_countdown")
fn start_countdown() {
    if (timer.running == 1) {
        tell(@s, "A countdown is already running!")
        return
    }

    timer.running = 1
    timer.seconds_left = 10

    announce("Countdown started!")
    subtitle(@a, "Countdown begins!")
    title_times(@a, 5, 15, 5)
}
```

## 第五步：最终结果

```rs
fn fire_at_zero() {
    timer.running = 0
    timer.seconds_left = 0

    title(@a, "GO!")
    subtitle(@a, "Time is up!")
    say("Countdown complete!")
    summon("minecraft:firework_rocket", 0, 65, 0)
}
```

## 第六步：延迟单次执行

`@schedule(N)` 不会让函数按计时器运行 —— 它的作用是：当你**调用**该函数时，执行会被延迟 N 个 tick。

```rs
// 玩家输入：/trigger delayed_message
@on_trigger("delayed_message")
fn queue_delayed() {
    tell(@s, "Message will appear in 5 seconds...")
    delayed_deliver()   // 调用此函数会将其调度到 100 tick 后执行
}

// 此函数被正常调用，但会在调用后 100 tick（5 秒）才执行
@schedule(100)
fn delayed_deliver() {
    say("This message was delayed by 5 seconds!")
    title(@a, "Delayed!")
}
```

## 完整代码

完整示例：[tutorial_05_decorators.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_05_decorators.mcrs)

## 试试看

1. 安装并执行 `/reload`
2. 执行 `/trigger start_countdown` —— 倒计时开始
3. 观察标题每秒更新
4. 归零时发射烟花
5. 倒计时进行中执行 `/trigger stop_countdown` 可取消
6. 执行 `/trigger delayed_message` —— 5 秒后消息出现

## decorator 选择指南

```
需要持续运行？          → @tick 或 @tick(rate=N)
精确每秒一次？          → @tick(rate=20)
世界加载时？            → @load
玩家激活？              → @on_trigger("name")
延迟单次执行？          → @schedule(N)
```

## 下一步

→ [教程 06：标准库 —— 数学与粒子](./06-stdlib-math)
