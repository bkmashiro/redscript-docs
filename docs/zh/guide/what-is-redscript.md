# RedScript 是什么？

RedScript 是一种**类型化脚本语言**，可编译为 Minecraft 数据包。

## 问题

用原版命令制作 Minecraft 小游戏非常痛苦：

- 40+ 个 `.mcfunction` 文件
- 数百条 `execute if score` 命令
- 没有类型检查——错误只能在游戏中发现
- 到处复制粘贴——没有可复用的函数

## 解决方案

使用 RedScript，你可以编写简洁、类型化的代码：

```rs
let countdown: int = 60;

@tick(rate=20)
fn every_second() {
    countdown = countdown - 1;
    actionbar(@a, "Time: ${countdown}s");

    if (countdown <= 0) {
        end_game();
    }
}

fn end_game() {
    title(@a, "Game Over!");
}
```

RedScript 会自动将其编译为优化的 `.mcfunction` 文件。

## 特性

| 特性 | 描述 |
|------|------|
| **类型系统** | `int`、`string`、`bool`、`float`、数组、结构体、枚举 |
| **函数** | 参数、返回值、默认参数 |
| **装饰器** | `@tick`、`@load`、`@on_trigger`、`@on_death` |
| **选择器** | 完整的 MC 选择器支持：`@a[tag=vip,distance=..10]` |
| **NBT** | 结构化的 NBT 参数，用于 give/summon |
| **Lambda** | 高阶函数和闭包 |

## 工作原理

```
hello.mcrs → RedScript 编译器 → Datapack/
                                 ├── data/
                                 │   └── hello/
                                 │       └── function/
                                 │           ├── __load.mcfunction
                                 │           ├── __tick.mcfunction
                                 │           └── every_second.mcfunction
                                 └── pack.mcmeta
```

## 下一步

准备好了吗？→ [快速开始](/zh/guide/getting-started)
