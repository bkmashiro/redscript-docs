# 教程 04：函数

<div class="tutorial-meta">
  <span class="difficulty beginner">🟢 Beginner</span>
  <span class="time">⏱️ 20 min</span>
</div>


**难度：** 初级  
**预计时间：** ~25 分钟  
**前置要求：** [教程 03](./03-control-flow)

## 目标

把重复逻辑收进可复用函数，并理解参数、返回值、递归分别解决什么问题。

## 声明函数

```rs
fn greet() {
    say("Hello!")
}
```

调用：

```rs
greet()
```

## 参数

参数让同一段逻辑可以处理不同输入：

```rs
fn reward(target: selector, amount: int) {
    give(target, "minecraft:emerald", amount)
}

reward(@s, 3)
```

## 返回值

用 `->` 声明返回类型：

```rs
fn double_it(x: int) -> int {
    return x * 2
}

let result: int = double_it(6)
```

当函数主要是“算一个值”而不是“直接发命令”时，返回值最有用。

## 多个参数

```rs
fn announce_round(round: int, total: int) {
    say(f"Round {round} / {total}")
}
```

如果参数越来越多，而且它们天然属于同一组数据，下一步通常就是用 `struct`。

## 递归

递归就是函数调用自己。

```rs
fn countdown(n: int) {
    if (n <= 0) {
        say("Go!")
        return
    }

    say(f"{n}")
    countdown(n - 1)
}
```

能工作的关键是必须有“终止条件”，这里就是 `n <= 0`。

没有终止条件，递归就不会停。

## 小工具函数

```rs
fn is_final_round(round: int, max_rounds: int) -> bool {
    return round == max_rounds
}

fn average(total: int, players: int) -> double {
    return total as double / players as double
}
```

这类函数的特点是：

- 输入清晰
- 职责单一
- 输出稳定

## 一个实用例子

```rs
namespace tutorial04

const MAX_ROUNDS: int = 3
let current_round: int = 1

fn next_round(round: int) -> int {
    return round + 1
}

fn show_round(round: int) {
    title(@a, f"Round {round}")
}

fn is_last_round(round: int) -> bool {
    return round == MAX_ROUNDS
}

fn countdown(n: int) {
    if (n <= 0) {
        say("Fight!")
        return
    }

    say(f"{n}")
    countdown(n - 1)
}

@on_trigger("advance")
fn advance() {
    show_round(current_round)
    countdown(3)

    if (is_last_round(current_round)) {
        say("This is the last round.")
    }

    current_round = next_round(current_round)
}
```

## 好函数的基本标准

- 名字要明确
- 副作用要一眼看得出
- 需要结果时就返回值
- 写递归时先想清楚终止条件

## 练习

1. 写 `fn add(a: int, b: int) -> int`。
2. 写 `fn alive_message(alive: bool) -> string`。
3. 写一个从 `n` 倒数到 `0` 的递归函数。

下一篇：[教程 05：结构体与枚举](./05-structs-and-enums)
