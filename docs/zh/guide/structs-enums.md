# 结构体与枚举

## 结构体

结构体将相关数据组合在一起。

### 定义结构体

```rs
struct Player {
    name: string,
    score: int,
    alive: bool,
}
```

### 创建结构体实例

使用结构体字面量：

```rs
let p: Player = Player {
    name: "Alex",
    score: 0,
    alive: true,
};
```

### 访问字段

```rs
say(p.name);          // Alex
p.score = p.score + 1;
```

### 在函数中使用结构体

```rs
fn announce(p: Player) {
    say("${p.name} has ${p.score} points");
}

fn kill(p: Player) {
    p.alive = false;
    say("${p.name} was eliminated");
}
```

## 枚举

枚举定义一组命名值。

### 定义枚举

```rs
enum GameState {
    Waiting,
    Running,
    Ended,
}
```

### 使用枚举

```rs
let state: GameState = GameState::Waiting;

fn start_game() {
    state = GameState::Running;
    say("Game started!");
}
```

### Match 表达式

使用 `match` 处理不同的枚举值：

```rs
fn tick_game() {
    match state {
        GameState::Waiting => {
            actionbar(@a, "Waiting for players...");
        },
        GameState::Running => {
            update_scoreboard();
        },
        GameState::Ended => {
            actionbar(@a, "Game over!");
        },
    }
}
```

### 带值的枚举

枚举可以携带关联数据：

```rs
enum Team {
    Red,
    Blue,
    Spectator,
}

fn get_color(team: Team) -> string {
    match team {
        Team::Red => return "red",
        Team::Blue => return "blue",
        Team::Spectator => return "gray",
    }
}
```

## 实际示例

结合结构体和枚举实现小游戏：

```rs
enum Role {
    Hunter,
    Runner,
}

struct GamePlayer {
    role: Role,
    catches: int,
}

let game_state: GameState = GameState::Waiting;

@tick(rate=20)
fn game_loop() {
    match game_state {
        GameState::Running => {
            check_catches();
            update_timer();
        },
        _ => {},
    }
}
```

## 下一步

- [Lambda 表达式](/zh/guide/lambdas) — 内联函数表达式
- [语法参考](/zh/reference/syntax) — 完整语法细节
