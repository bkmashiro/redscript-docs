# 结构体与枚举

结构体和枚举是 RedScript 中给游戏状态命名的主要工具。它们能让大量记分板 / NBT 逻辑更可读，但不会改变最终仍然编译成 datapack 命令这一点。

## 结构体

结构体将相关数据组合在一起。

### 定义结构体

```rs verify-skip
struct PlayerState {
    score: int,
    alive: bool,
}
```

### 创建结构体实例

使用结构体字面量。写上类型名是可以的；在类型已经明确的位置，也经常会看到更短的 `{ ... }` 写法。

```rs verify-skip
let p: PlayerState = PlayerState {
    score: 0,
    alive: true,
};

let p2: PlayerState = {
    score: 10,
    alive: true,
};
```

### 访问字段

```rs verify-skip
say(f"Score: {p.score}");
p.score = p.score + 1;
```

### 在函数中使用结构体

```rs verify-skip
fn announce(p: PlayerState) {
    say(f"Score: {p.score}");
}

fn mark_dead(p: PlayerState) -> PlayerState {
    return PlayerState { score: p.score, alive: false };
}
```

结构体适合表示总是一起传递的值：位置、记分板快照、计时器配置、小玩法的状态记录等。

## 枚举

枚举定义一组命名状态。当一个 `int` 需要靠注释解释魔法值时，通常就该考虑枚举。

### 定义枚举

```rs verify-skip
enum GamePhase {
    Lobby,
    Starting,
    Running,
    Ended,
}
```

也可以显式指定整数值：

```rs verify-skip
enum Rank {
    Bronze = 1,
    Silver = 2,
    Gold = 3,
    Diamond = 10,
}
```

### 使用枚举

Guide 中统一使用 `Type::Variant`。一些旧示例或测试里可能还能看到 `Type.Variant`；两种写法编译器都接受，但参考文档当前以 `::` 为主。

```rs verify-skip
let phase: GamePhase = GamePhase::Lobby;

fn start_game() {
    phase = GamePhase::Running;
    say("Game started!");
}
```

### Match 表达式

使用 `match` 处理不同的枚举值：

```rs verify-skip
fn tick_game() {
    match phase {
        GamePhase::Lobby => {
            actionbar(@a, "Waiting for players...");
        },
        GamePhase::Running => {
            update_scoreboard();
        },
        GamePhase::Ended => {
            actionbar(@a, "Game over!");
        },
        _ => {},
    }
}
```

如果 guide 示例里故意不处理所有分支，就加 `_` 通配分支。

### 携带数据的变体

枚举变体可以携带具名字段。构造时使用 `Type::Variant(field: value)`，在 `match` 中用 `Type::Variant(name, ...)` 绑定字段。

```rs verify-skip
enum Reward {
    None,
    Coins(amount: int),
    Item(id: string, count: int),
}

fn describe_reward(reward: Reward) {
    match reward {
        Reward::Coins(amount) => {
            say(f"Coins: {amount}");
        },
        Reward::Item(id, count) => {
            say(f"Item: {id} x{count}");
        },
        Reward::None => {
            say("No reward");
        },
    }
}

let reward: Reward = Reward::Coins(amount: 25);
```

带数据的枚举会通过生成的记分板 / NBT 存储实现，所以适合用来清晰表达状态，不适合滥用成极热循环里的小数据结构。

## 实际示例

结合结构体和枚举实现小游戏：

```rs verify-skip
enum Role {
    Hunter,
    Runner,
}

struct GamePlayer {
    role: Role,
    catches: int,
}

let game_phase: GamePhase = GamePhase::Lobby;

@throttle(ticks=20)
fn game_loop() {
    match game_phase {
        GamePhase::Running => {
            check_catches();
            update_timer();
        },
        _ => {},
    }
}
```

## 下一步

- [impl 块](/zh/guide/impl-blocks) — 给自定义类型绑定方法
- [语法参考](/zh/reference/syntax) — 完整语法细节
