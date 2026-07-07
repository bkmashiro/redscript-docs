# 教程 03：控制流

<div class="tutorial-meta">
  <span class="difficulty beginner">🟢 Beginner</span>
  <span class="time">⏱️ 20 min</span>
</div>


**难度：** 初级  
**预计时间：** ~30 分钟  
**前置要求：** [教程 02](./02-variables-and-types)

## 目标

学会用条件分支和循环来决定逻辑什么时候执行、执行多少次。

## `if` 与 `else`

最基础的分支：

```rs
if (score > 10) {
    say("High score!")
}
```

带 `else`：

```rs
if (lives > 0) {
    say("Still alive")
} else {
    say("Game over")
}
```

也可以链式判断：

```rs
if (wave == 1) {
    say("Warmup")
} else if (wave < 5) {
    say("Main phase")
} else {
    say("Final phase")
}
```

## `while`

`while` 会在条件为真时反复执行：

```rs
let i: int = 0
while (i < 3) {
    say(f"Loop: {i}")
    i = i + 1
}
```

当退出条件取决于运行时状态变化时，`while` 很合适。

## `for`

已知循环次数时，范围 `for` 更清晰：

```rs
for i in 0..5 {
    say(f"Round {i}")
}
```

上界是排他的，所以 `0..5` 实际跑 `0, 1, 2, 3, 4`。

也可以直接遍历数组里的值：

```rs
let rewards: int[] = [5, 10, 20]
for reward in rewards {
    say(f"Reward: {reward}")
}
```

需要下标时用范围循环；只关心值时用数组循环。

## 遍历 Minecraft 选择器：`foreach`

当数据源是 Minecraft 选择器，而不是 RedScript 数组时，用 `foreach`：

```rs
foreach (player in @a[tag=joined]) {
    tell(player, "Round starting")
}

foreach (zombie in @e[type=zombie,distance=..12]) {
    kill(zombie)
}
```

选择器循环里的变量是一个实体目标；这和 `for reward in rewards` 里拿到普通 RedScript 值不同。

## `break`

立即退出最近一层循环：

```rs
let i: int = 0
while (i < 10) {
    if (i == 4) {
        break
    }
    say(f"i = {i}")
    i = i + 1
}
```

## `continue`

跳过当前这轮的剩余逻辑：

```rs
for i in 0..6 {
    if (i == 2) {
        continue
    }
    say(f"Processed {i}")
}
```

## `match`

当一个值有多个命名状态时，`match` 比一串 `if` 更清楚。

```rs
enum Phase { Lobby, Playing, Finished }

let phase: Phase = Phase::Lobby

fn show_phase() {
    match phase {
        Phase::Lobby => { say("Waiting for players") },
        Phase::Playing => { say("Match running") },
        Phase::Finished => { say("Results screen") },
    }
}
```

`match` 也可以匹配整数范围和通配分支：

```rs
let score: int = 86
match score {
    90..100 => { say("A") },
    80..89 => { say("B") },
    _ => { say("Keep practicing") },
}
```

`match` 里的范围两端都是包含的。

## `if let Some(...)`

`Option<T>` 用 `if let Some(name) = value` 处理：

```rs
let maybe_kills: Option<int> = Some(3)

if let Some(kills) = maybe_kills {
    say(f"Kills: {kills}")
} else {
    say("No kill count yet")
}
```

当 helper 可能返回值、也可能没有值时，用这个形式。`Some(...)` 里的变量只在这个分支里可用。

## 组合起来看

```rs
namespace tutorial03

enum GameState { Idle, CountingDown, Running }

let state: GameState = GameState::Idle
let timer: int = 5

@tick(rate=20)
fn game_loop() {
    match state {
        GameState::Idle => {
            actionbar(@a, "Waiting...")
        },
        GameState::CountingDown => {
            if (timer > 0) {
                title(@a, f"{timer}")
                timer = timer - 1
            } else {
                state = GameState::Running
                say("Go!")
            }
        },
        GameState::Running => {
            actionbar(@a, "Game is running")
        },
    }
}

@on_trigger("start")
fn start_game() {
    state = GameState::CountingDown
    timer = 5
}
```

这里同时用到了：

- `match` 管理大状态
- `if` 处理局部条件
- `@tick(rate=20)` 每秒推进一次逻辑

## 什么时候用哪一种

- 单纯布尔判断用 `if`
- 命名状态切换用 `match`
- 已知次数循环用 `for`
- 动态退出条件用 `while`

## 练习

1. 给 `GameState` 加一个 `Paused`。
2. 写一个 `for` 循环给玩家发 5 个苹果。
3. 写一个 `while` 倒计时从 10 到 1。

下一篇：[教程 04：函数](./04-functions)
