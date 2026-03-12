# Lambda 表达式

Lambda 是内联的匿名函数。

## 语法

```rs
(parameters) => expression
```

简单示例：

```rs
let double = (x: int) => x * 2;
```

多行 lambda 使用花括号：

```rs
let greet = (name: string) => {
    say("Hello, ${name}!");
    say("Welcome to the server!");
};
```

## 高阶函数

接受其他函数作为参数的函数：

```rs
fn apply_to_all(targets: selector, action: (selector) => void) {
    action(targets);
}

apply_to_all(@a, (s: selector) => {
    effect(s, "speed", 10, 2);
});
```

### for_each

对集合中的每个元素应用 lambda：

```rs
let teams: string[] = ["red", "blue", "green"];

for_each(teams, (team: string) => {
    team_add(team);
    say("Created team: ${team}");
});
```

### map

转换值：

```rs
let scores: int[] = [10, 20, 30];
let doubled: int[] = map(scores, (x: int) => x * 2);
// [20, 40, 60]
```

### filter

筛选匹配的值：

```rs
let scores: int[] = [5, 15, 25, 35];
let high: int[] = filter(scores, (x: int) => x > 20);
// [25, 35]
```

## 闭包

Lambda 可以捕获外层作用域的变量：

```rs
let bonus: int = 10;

let add_bonus = (score: int) => score + bonus;

add_bonus(5);  // 15
add_bonus(20); // 30
```

更实际的例子：

```rs
fn create_reward(base_xp: int) {
    let give_reward = (player: selector) => {
        xp_add(player, base_xp);
        say("Rewarded ${base_xp} XP!");
    };

    give_reward(@a[tag=winner]);
}
```

## 实际示例

使用 lambda 构建可配置的事件系统：

```rs
let on_game_start: () => void = () => {
    say("Game started!");
    effect(@a, "speed", 30, 1);
};

let on_game_end: () => void = () => {
    say("Game over!");
    clear(@a);
};

fn trigger_event(handler: () => void) {
    handler();
}

@load
fn init() {
    trigger_event(on_game_start);
}
```

## 下一步

- [NBT 数据](/zh/guide/nbt) — 使用 Minecraft NBT
- [选择器](/zh/guide/selectors) — 定位实体
