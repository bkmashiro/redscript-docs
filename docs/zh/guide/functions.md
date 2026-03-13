# 函数

## 基本函数

使用 `fn` 定义函数：

```rs
fn greet() {
    say("Hello, world!");
}
```

通过名称调用函数：

```rs
greet();
```

## 参数

函数可以接受带类型注解的参数：

```rs
fn heal(target: selector, amount: int) {
    effect(target, "instant_health", amount, 1);
    say("Healed!");
}

heal(@a, 2);
```

## 返回类型

使用 `->` 指定返回类型：

```rs
fn double(x: int) -> int {
    return x * 2;
}

let result: int = double(5); // 10
```

## 默认参数

参数可以有默认值：

```rs
fn spawn_mob(mob: string, count: int = 1) {
    repeat(count) {
        summon(mob);
    }
}

spawn_mob("zombie");       // 生成 1 只僵尸
spawn_mob("skeleton", 5);  // 生成 5 只骷髅
```

## 多个参数

```rs
fn setup_team(team_name: string, color: string, friendly_fire: bool = false) {
    team_add(team_name);
    team_modify(team_name, "color", color);
    if (!friendly_fire) {
        team_modify(team_name, "friendlyFire", "false");
    }
}

setup_team("red", "red");
setup_team("blue", "blue", true);
```

## 调用函数

函数编译为 `.mcfunction` 文件。它们可以通过以下方式调用：

- 从其他函数调用
- 通过装饰器如 `@tick` 和 `@load` 自动调用
- 在游戏内作为命令目标通过 `/function namespace:function_name` 调用

```rs
@load
fn init() {
    setup_team("red", "red");
    setup_team("blue", "blue");
    say("Teams ready!");
}
```

## 范围循环

使用 `for i in start..end` 遍历整数范围。上界可以是变量：

```rs
fn give_reward(player: selector, count: int) {
    for i in 0..count {
        give(player, "diamond", 1);
    }
}

give_reward(@s, 5);   // 给予 5 颗钻石
```

两个边界都可以是变量：

```rs
let start: int = 1;
let end: int = 10;
for i in start..end {
    say("${i}");
}
```

范围是**左闭右开**的（`0..5` 遍历 0、1、2、3、4）。

## 仅声明函数

使用 `declare fn` 声明函数签名而不提供函数体。用于声明文件（如 `builtins.d.mcrs`）中，向类型检查器描述内置函数：

```rs
// builtins.d.mcrs
declare fn say(msg: string);
declare fn give(target: selector, item: string, count: int);
declare fn effect(target: selector, effect: string, duration: int, amplifier: int);
```

`declare fn` 桩函数不会被编译为 `.mcfunction` 文件 — 它们仅用于类型检查和 IDE 支持。

## 下一步

- [装饰器](/zh/guide/decorators) — 自动触发函数
- [Lambda 表达式](/zh/guide/lambdas) — 内联函数表达式
