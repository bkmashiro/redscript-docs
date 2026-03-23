# 教程 02：变量与控制流

<div class="tutorial-meta">
  <span class="difficulty beginner">🟢 Beginner</span>
  <span class="time">⏱️ 15 min</span>
</div>


**难度：** 入门
**时长：** ~20 分钟
**前置条件：** [教程 01：Hello World](./01-hello-world)

## 你将构建什么

一个服务器投票系统：玩家投赞成或反对票，主持人发起计票后，系统会通过标题屏幕宣布获胜方并展示百分比详情。

## 你将学到什么

- 所有基本类型：`int`、`bool`、`fixed`、`string`
- `let` 声明
- `if / else` 分支
- `while` 循环
- `foreach` 遍历 selector
- 为什么 `fixed` 使用 ×10000 缩放

## 第一步：变量类型

```rs
// int：整数，存储在 scoreboard 中
let count: int = 42
let negative: int = -7

// bool：true 或 false
let is_active: bool = true
let has_voted: bool = false

// fixed：十进制数，以整数 × 10000 的形式存储
// 1.5  → 存储为 15000
// 0.75 → 存储为 7500
// 从整数字面量赋值时需要显式类型转换：
let percentage: fixed = 7500 as fixed   // 表示 75.00%
let half: fixed = 5000 as fixed         // 表示 0.5

// string：文本标签
let winner: string = "yes"
```

**为什么是 ×10000？** Minecraft scoreboard 只能存储整数。RedScript 采用定点数约定，"真实值" = 存储整数 ÷ 10000。这在不使用浮点硬件的情况下提供了 4 位小数精度。

## 第二步：投票系统初始化

```rs
@load
fn setup() {
    scoreboard_add_objective("votes_yes", "dummy")
    scoreboard_add_objective("votes_no", "dummy")
    scoreboard_add_objective("vote_cast", "dummy")
    say("Vote system ready! /trigger vote_yes  or  /trigger vote_no")
}
```

## 第三步：投票（if/else）

```rs
@on_trigger("vote_yes")
fn cast_yes() {
    // 检查玩家是否已投过票
    let already_voted: int = scoreboard_get(@s, "vote_cast")
    if (already_voted == 1) {
        tell(@s, "You already voted!")
        return
    }

    scoreboard_set(@s, "vote_cast", 1)
    let yes_count: int = scoreboard_get("#total", "votes_yes")
    yes_count = yes_count + 1
    scoreboard_set("#total", "votes_yes", yes_count)

    tell(@s, "You voted YES!")
    announce("A player voted YES")
}
```

`return` 语句可提前退出函数 —— 非常适合用作守卫条件。

## 第四步：公布结果

```rs
@on_trigger("tally_votes")
fn tally() {
    let yes_count: int = scoreboard_get("#total", "votes_yes")
    let no_count: int = scoreboard_get("#total", "votes_no")
    let total: int = yes_count + no_count

    if (total == 0) {
        say("No votes cast yet!")
        return
    }

    // 嵌套 if/else 处理三种结果
    if (yes_count > no_count) {
        title(@a, "YES wins!")
    } else {
        if (no_count > yes_count) {
            title(@a, "NO wins!")
        } else {
            title(@a, "It's a tie!")
        }
    }

    // 定点数百分比：先乘后除以保留精度
    let yes_pct: fixed = (yes_count * 10000 / total) as fixed
    announce(f"YES percentage (×10000): {yes_pct}")
}
```

## 第五步：用 foreach 重置

`foreach` 可遍历匹配某个 selector 的所有实体：

```rs
@on_trigger("reset_votes")
fn reset_votes() {
    scoreboard_set("#total", "votes_yes", 0)
    scoreboard_set("#total", "votes_no", 0)

    // 重置每位玩家的 vote_cast 标志
    foreach (p in @a) {
        scoreboard_set(p, "vote_cast", 0)
    }
    say("Votes reset! Everyone can vote again.")
}
```

## 第六步：while 循环

```rs
@on_trigger("count_down")
fn count_down() {
    let i: int = 5
    while (i > 0) {
        tell(@s, f"Countdown: {i}")
        i = i - 1
    }
    tell(@s, "Done!")
}
```

## 完整代码

完整示例：[tutorial_02_variables.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_02_variables.mcrs)

## 试试看

1. 编译并安装 datapack
2. 多个玩家执行 `/trigger vote_yes` 或 `/trigger vote_no`
3. 主持人执行 `/trigger tally_votes` —— 宣布获胜方
4. 执行 `/trigger reset_votes` 重新开始
5. 尝试 `/trigger count_down` 查看 while 循环效果

## 类型速查表

| 类型 | 示例 | 说明 |
|------|---------|-------|
| `int` | `let x: int = 42` | 整数，以 scoreboard 为后端 |
| `bool` | `let b: bool = true` | 布尔值 |
| `fixed` | `let f: fixed = 5000 as fixed` | 十进制数 ×10000，需要 `as fixed` 转换 |
| `string` | `let s: string = "hello"` | 文本 |

## 下一步

→ [教程 03：函数与 struct](./03-functions-structs)
