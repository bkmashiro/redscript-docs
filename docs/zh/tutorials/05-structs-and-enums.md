# 教程 05：结构体与枚举

<div class="tutorial-meta">
  <span class="difficulty intermediate">🟡 Intermediate</span>
  <span class="time">⏱️ 25 min</span>
</div>


**难度：** 初级  
**预计时间：** ~35 分钟  
**前置要求：** [教程 04](./04-functions)

## 目标

用 `struct` 和 `enum` 建模玩法状态，再用 `match` 与 `impl` 把逻辑组织起来。

## `struct`

`struct` 用来把一组相关字段打包成一个命名类型。

```rs
struct PlayerStats {
    name: string,
    kills: int,
    alive: bool,
}
```

创建值：

```rs
let stats: PlayerStats = {
    name: "Alex",
    kills: 0,
    alive: true
}
```

字段访问使用点语法：

```rs
stats.kills = stats.kills + 1
```

## `enum`

`enum` 表示“这个值只能是若干命名变体之一”。

```rs
enum MatchState {
    Lobby,
    Countdown,
    Running,
    Finished,
}
```

这比用裸整数表示状态更可读。

## `match`

处理 enum 时，`match` 是最自然的写法：

```rs
fn show_state(state: MatchState) {
    match state {
        MatchState::Lobby => { say("In lobby") },
        MatchState::Countdown => { say("Starting soon") },
        MatchState::Running => { say("Match live") },
        MatchState::Finished => { say("Match ended") },
    }
}
```

## `impl` 方法

用 `impl` 给 struct 绑定方法。

```rs
struct Counter {
    value: int,
}

impl Counter {
    fn increment(self) {
        self.value = self.value + 1
    }

    fn reset(self) {
        self.value = 0
    }
}
```

这样数据和相关行为会靠得更近。

## 完整示例

```rs
namespace tutorial05

enum MatchState {
    Lobby,
    Countdown,
    Running,
    Finished,
}

struct Game {
    round: int,
    max_rounds: int,
    active: bool,
    state: MatchState,
}

impl Game {
    fn start(self) {
        self.active = true
        self.state = MatchState::Countdown
    }

    fn next_round(self) {
        self.round = self.round + 1
        if (self.round > self.max_rounds) {
            self.state = MatchState::Finished
            self.active = false
        }
    }

    fn summary(self) -> string {
        return f"Round {self.round}/{self.max_rounds}, active={self.active}"
    }
}

let game: Game = {
    round: 1,
    max_rounds: 3,
    active: false,
    state: MatchState::Lobby
}

@on_trigger("start_match")
fn start_match() {
    game.start()
    say("Match is starting")
}

@tick(rate=20)
fn tick_game() {
    match game.state {
        MatchState::Lobby => {
            actionbar(@a, "Lobby")
        },
        MatchState::Countdown => {
            title(@a, "3...")
            game.state = MatchState::Running
        },
        MatchState::Running => {
            actionbar(@a, game.summary())
        },
        MatchState::Finished => {
            actionbar(@a, "Finished")
        },
    }
}
```

## 为什么这套模型重要

- `struct` 让相关字段不再散落
- `enum` 给合法状态命名
- `match` 让状态处理一目了然
- `impl` 让行为和数据靠在一起

## 练习

1. 给 `Game` 加一个 `wins: int`。
2. 给 enum 加一个 `Paused`。
3. 写一个把游戏重置回 `Lobby` 的 `impl` 方法。

下一篇：[教程 06：标准库速览](./06-stdlib-tour)
