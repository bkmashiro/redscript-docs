# 教程 08：进阶主题

<div class="tutorial-meta">
  <span class="difficulty advanced">🔴 Advanced</span>
  <span class="time">⏱️ 30 min</span>
</div>


**难度：** 中级到高级  
**预计时间：** ~35 分钟  
**前置要求：** [教程 07](./07-events-and-ticks)

## 目标

熟悉项目变大后真正重要的能力：模块导入、优化器行为、用协程分摊工作量，以及面向热路径的 inline 思路。

## 模块导入

到这里你已经见过 import：

```rs
import math::*
import random::*
```

它的重要性在于：

- 依赖关系显式
- stdlib 或 module-library 函数只有导入后才能用
- 编译错误更容易定位

如果某个 stdlib 函数解析不到，第一件事先检查 import 对不对。

## 优化器基础

RedScript 会做死代码消除。

语言参考里最关键的规则：

- public 函数会被保留
- 名字以下划线开头的私有风格 helper，如果不可达可能被删掉
- 带装饰器的函数会保留
- `@keep` 可以强制保留

```rs
fn public_entry() {
    _helper()
}

fn _helper() {
    say("reachable")
}

@keep
fn _manual_entry() {
    say("kept for /function calls")
}
```

当你想粗看优化器效果时，可以编译时加：

```bash
redscript compile main.mcrs -o ./out --stats
```

## `@coroutine`

重循环不要硬塞进一个 tick。`@coroutine` 用来把工作量摊到多个 tick。

```rs
@coroutine(batch=50)
fn process_players() {
    let i: int = 0
    while (i < 1000) {
        // expensive work
        i = i + 1
    }
}
```

要点：

- 挂起发生在循环回边
- `batch=N` 控制每 tick 做多少轮
- 大扫描、大循环、分块生成都该优先考虑它

也可以加完成回调：

```rs
@coroutine(batch=25, onDone="scan_complete")
fn scan_world() {
    let i: int = 0
    while (i < 500) {
        i = i + 1
    }
}

fn scan_complete() {
    say("Scan complete")
}
```

## `@inline`

如果你当前版本暴露了 `@inline`，把它当成面向性能的小型 helper 提示，而不是默认写法。

典型形状：

```rs
@inline
fn clamp_zero(x: int) -> int {
    if (x < 0) {
        return 0
    }
    return x
}
```

使用原则：

- 只给非常小的 helper 用
- 只在热路径或明确有收益时用
- 不要把它当成所有函数的默认风格

如果你当前编译器版本没有 `@inline`，仍然保留同样的工程判断：热路径上的小 helper 值得特别关注。

## 一个组合示例

```rs
namespace tutorial08

import random::*

let running: bool = false
let processed: int = 0

@keep
fn _debug_report() {
    say(f"Processed so far: {processed}")
}

@on_trigger("start_job")
fn start_job() {
    if (running) {
        tell(@s, "Job already running")
        return
    }

    running = true
    processed = 0
    run_job()
}

@coroutine(batch=50, onDone="finish_job")
fn run_job() {
    let i: int = 0
    while (i < 500) {
        processed = processed + 1
        i = i + 1
    }
}

fn finish_job() {
    running = false
    say(f"Job finished. Total: {processed}")
}
```

## 实用规则

1. 用函数前先导入正确模块。
2. 热路径 helper 要小而明确。
3. 需要保留给手动 `/function` 调用的函数，用 `@keep`。
4. 大循环优先改成 `@coroutine`。
5. 项目一大就打开 `--stats` 看优化器输出。

## 下一步

- 回头读这个目录里的项目型教程
- 需要精确语法时去看 [语法参考](/zh/reference/syntax)
- 继续查 [装饰器参考](/zh/reference/decorators) 与 [CLI 参考](/zh/reference/cli)
