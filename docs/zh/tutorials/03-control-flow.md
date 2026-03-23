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
