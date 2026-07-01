# 高级装饰器

这一页汇总新版 RedScript 中偏进阶、偏编译器侧的装饰器。入门视角的生命周期说明请先看 [装饰器指南](/zh/guide/decorators)。

## `@tick`

**语法：** `@tick` 或 `@tick(rate=N)`

**编译行为：** 把函数注册为 tick 入口。`@tick` 每个 tick 执行一次；`@tick(rate=N)` 会 lowering 成每隔 `N` 个 tick 调度一次的重复执行。

```rs
@tick(rate=20)
fn update_sidebar() {
    sidebar_set("Kills", @a, "kills")
}
```

除非真的需要每 tick 跑一次，否则优先使用 `rate=N`。

## `@load`

**语法：** `@load`

**编译行为：** 把函数加入 datapack 的 load 入口，在世界加载和 `/reload` 时运行。

```rs
@load
fn init() {
    scoreboard_add_objective("kills", "playerKillCount")
}
```

这类函数适合做初始化、创建记分板和一次性启动逻辑。

## `@coroutine`

**语法：** `@coroutine`、`@coroutine(batch=N)` 或 `@coroutine(batch=N, onDone="fn_name")`

**编译行为：** 把重循环函数改写成可恢复的状态机。编译器会在循环回边插入 yield 点，把协程状态存到跨 tick 的存储里，并在后续 tick 调度恢复。

```rs
@coroutine(batch=50, onDone="scan_done")
fn scan_area() {
    let i: int = 0
    while (i < 1000) {
        i = i + 1
    }
}

fn scan_done() {
    say("Scan finished")
}
```

当工作量大到一个 tick 放不下时，就该优先考虑它。

## `@inline`

**语法：** `@inline`

**编译行为：** 把小 helper 标记为可在优化阶段做调用点替换。完成内联后，后续 pass 往往更容易做常量折叠、删临时变量和合并基本块。

```rs
@inline
fn clamp_zero(x: int) -> int {
    if (x < 0) {
        return 0
    }
    return x
}
```

把它当成提示，而不是“所有函数都该内联”的命令。

## `@deprecated`

**语法：** `@deprecated("message")`

**编译行为：** 保留这个 symbol，但当其他代码引用它时发出编译期 warning。适合在保留兼容性的同时，把用户迁移到新 API。

```rs
@deprecated("Use grant_reward_v2 instead")
fn grant_reward() {
    say("legacy reward")
}
```

它是迁移工具，不是删除机制。

## `@watch`

**语法：** `@watch("scoreboard_objective")`

**编译行为：** 把无参数 handler 注册到编译器生成的 watch dispatcher。编译器会创建一个保存上次值的 objective，并生成 tick 入口；当某个玩家在被监听的 scoreboard objective 上的值发生变化时，调用对应 handler。

```rs
@watch("rs.kills")
fn on_kills_changed() {
    let kills: int = scoreboard_get("@s", "rs.kills")
    if (kills >= 10) {
        title("@s", "Achievement Unlocked!")
    }
}
```

适合对低频 scoreboard 变化做响应。它监听的是 Minecraft scoreboard objective，不是任意 RedScript 全局变量。

## `@singleton`

**语法：** 在 `struct` 上使用 `@singleton`

**编译行为：** 把 struct 标记为全局 scoreboard-backed 状态。类型检查器会暴露合成的静态方法 `StructName::get()` 和 `StructName::set(value)`；编译器会为每个字段生成 scoreboard objective 和辅助函数。

```rs
@singleton
struct MatchState {
    round: int,
    running: int,
}

@keep
fn advance_round() {
    let state = MatchState::get()
    state.round = state.round + 1
    MatchState::set(state)
}
```

它适合少量全局游戏状态。目前这是 struct 特性，不是通用的函数/工厂 singleton。

## `@config`

**语法：** 在全局 `let` 上使用 `@config("key", default: N)`

**编译行为：** 把被装饰的全局变量替换成整数编译期常量。值来自 `CompileOptions.config`；缺少 key 时使用声明里的数字 `default`，没有 default 时为 `0`。它不会生成运行时/加载期读取配置的胶水代码。

```rs
@config("max_players", default: 20)
let MAX_PLAYERS: int

fn get_max_players(): int {
    return MAX_PLAYERS
}
```

一旦构建脚本或下游项目开始依赖某个配置键，就应尽量保持它稳定。

## `@on(EventType)`

**语法：** `@on(EventType)`

**编译行为：** 把函数注册到指定静态事件类型的分发器中。生成出的 datapack 会轮询相应事件源，并在事件触发时调用 handler。

```rs
@on(PlayerJoin)
fn welcome_player() {
    title(@s, "Welcome!")
}
```

如果你想要类型化、事件驱动的逻辑，而不是手写 tick 轮询，优先用 `@on(...)`。

## 实用提示

- `@load`、`@tick`、`@on(...)` 会创建入口点，因此总会被 DCE 保留。
- `@coroutine` 会改变执行形状，所以循环体应尽量写得直接、易推理。
- `@inline` 和 `@deprecated` 是编译期提示，不会创建运行时入口。
- `@watch`、`@singleton`、`@config` 适合少量地围绕共享状态或编译器生成基础设施来用。
