# 教程 01：快速开始

**难度：** 初级  
**预计时间：** ~20 分钟  
**前置要求：** 无

## 目标

安装 CLI，编译一个最小程序，并理解 RedScript 数据包大致会生成什么。

## 你将做出什么

一个会：

- 在世界加载时输出消息
- 暴露一个可手动调用函数
- 能直接放进 Minecraft 世界里测试

的数据包。

## 第一步：安装工具

如果你只是想试语言，最快的方式仍然是在线 IDE：

- [redscript-ide.pages.dev](https://redscript-ide.pages.dev)

如果你要本地开发，先装 CLI：

```bash
npm install -g redscript-mc
redscript --version
```

建议额外准备：

- VSCode 插件
- 一个专门用于测试的 Minecraft 世界

## 第二步：写第一个源文件

创建 `hello.mcrs`：

```rs
namespace getting_started

@load
fn init() {
    say("Hello from RedScript!")
}

fn greet() {
    tell(@a, "This came from a normal function.")
}
```

这里分别表示：

- `namespace getting_started` 决定 Minecraft 函数命名空间
- `@load` 会在 `/reload` 或世界加载时执行一次
- `say(...)` 向聊天栏广播
- `fn greet()` 是普通函数，不会自动运行

## 第三步：编译

```bash
redscript compile hello.mcrs -o ./my-datapack
```

会生成一个数据包目录。具体文件布局可能因版本略有差异，但通常你会看到：

- `pack.mcmeta`
- `data/getting_started/functions/...`
- 为 `#minecraft:load` 等标签生成的辅助文件

学习阶段可以顺手打开优化统计：

```bash
redscript compile hello.mcrs -o ./my-datapack --stats
```

## 第四步：安装到世界里

把 `./my-datapack` 放进世界的 `datapacks/` 目录，然后在游戏里执行：

```text
/reload
```

你应该会看到：

```text
Hello from RedScript!
```

普通函数也可以手动调：

```text
/function getting_started:greet
```

## 第五步：加一个触发器

很多入门数据包都需要一个玩家可主动触发的入口。

```rs
namespace getting_started

@load
fn init() {
    say("Hello from RedScript!")
    say("Run /trigger starter to receive a welcome item.")
}

@on_trigger("starter")
fn starter_pack() {
    give(@s, "minecraft:bread", 8)
    tell(@s, "Starter pack granted.")
}
```

这样玩家就能执行：

```text
/trigger starter
```

这里的 `@s` 就是触发这个指令的玩家。

## 第一个数据包检查清单

- 源文件有 `namespace`
- 至少有一个装饰器入口，比如 `@load`
- 编译时没有类型错误
- 输出目录被正确复制到世界里
- `/reload` 能正常执行

## 新手常见错误

### 忘记写 namespace

不写也许还能跑，但后续函数路径会更难管理。

### 改错输出目录

把 `-o` 固定成一个稳定路径，避免自己都不知道当前世界加载的是哪一版。

### 以为普通函数会自动执行

只有 `@load`、`@tick`、`@on_trigger` 这类装饰器函数才会自动接入 Minecraft 生命周期。

## 完整示例

```rs
namespace getting_started

@load
fn init() {
    say("Hello from RedScript!")
    say("Run /trigger starter to receive a welcome item.")
}

@on_trigger("starter")
fn starter_pack() {
    give(@s, "minecraft:bread", 8)
    tell(@s, "Starter pack granted.")
}

fn greet() {
    tell(@a, "This came from a normal function.")
}
```

## 下一步练习

1. 改掉 namespace 再编译一次。
2. 把面包改成别的物品。
3. 再加一个新的 `@on_trigger(...)`。

下一篇：[教程 02：变量与类型](./02-variables-and-types)
