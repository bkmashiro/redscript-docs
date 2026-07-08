# 编译器内部实现

这是一份面向贡献者和高级用户的 RedScript 到 Minecraft 数据包的实现地图。内容基于当前编译器源码，重点参考 `src/emit`、`src/mir`、`src/lir`、`src/optimizer`、`src/events` 以及相关标准库和测试文件。

它适合用来判断生成结果、运行时成本，以及修改编译器前应该先看哪些模块。

## 流水线总览

当前 `src/emit/compile.ts` 中的 `compile()` 路径大致如下：

1. **预处理导入。** 字符串导入会按源文件相对路径、stdlib、include dirs 解析。声明为 `module library` 的文件会单独保留，这样未使用的库函数仍可被裁剪。
2. **解析与类型检查。** Lexer/parser 之后执行类型检查；`@config` 全局量会转成整数常量；事件运行时资源会在类型检查前规划。
3. **降低到 HIR。** HIR 阶段处理类型化结构、泛型单态化、deprecated 调用检查，并裁剪不可达的注入库。
4. **收集运行时元数据。** `@load`、`@tick`、`@on`、`@watch`、`@schedule`、`@coroutine`、`@function_tag`、`@memoize` 和 profiling 相关装饰器会在后续 lowering 丢失装饰器语法前被收集。
5. **降低到 MIR。** `src/mir/lower.ts` 把结构化代码转成显式控制流图和临时值。
6. **优化 MIR。** 默认 MIR 流水线会先做内联规划，再执行循环展开、LICM、NBT/scoreboard 读取批处理、常量折叠、CSE、复制传播、分支简化、DCE、基本块合并等固定 pass。
7. **转换协程。** `@coroutine` 函数在 MIR 层被改写为 continuation 函数和 tick dispatcher。
8. **降低到 LIR 并优化。** `src/lir/lower.ts` 把 MIR 转成面向 scoreboard/storage 的 LIR。LIR 优化执行 dead-slot 清理、peephole 和常量立即数折叠；局部 copy/RMW 重写仍是显式 opt-in。
9. **收尾运行时 LIR。** 注入 singleton helper、重命名 memoize/benchmark 的实现函数，并执行静态 tick budget 检查。
10. **生成数据包文件。** `src/emit/index.ts` 写出 `pack.mcmeta`、`.mcfunction`、Minecraft function tag、装饰器 wrapper 和可选 source map sidecar。

## 数据包入口

每次编译都会生成 `data/<namespace>/function/load.mcfunction`，用于初始化命名空间 scoreboard objective。`minecraft:load` tag 总会包含这个生成的 load 函数，用户的 `@load` 函数会追加到同一个 tag。

`@tick` 函数会写入 `data/minecraft/tags/function/tick.json`。在本次检查的活跃编译路径中，parser 接受 `@tick(rate=N)`，但运行时元数据收集器只记录 tick 函数名，没有消费 `rate` 参数。若目标版本需要依赖 rate 降频，请先检查实际生成输出。

`@schedule(ticks=N)` 不会把原函数加入 `tick.json`。它生成 `_schedule_<name>.mcfunction`，内容是 Minecraft 的 `schedule function <namespace>:<name> Nt` 命令。调用 `_schedule_<name>()` 会调度原函数。

`@function_tag("namespace:path")` 会生成普通 function tag 文件，并把被装饰函数引用加入其中。`minecraft:load` 和 `minecraft:tick` 会合并进已有 load/tick tag，避免重复文件。

`@on(EventType)` 由事件 manifest 驱动。编译器把 handler 映射到对应事件的 handler function tag，并针对使用到的事件类型注入 `src/stdlib/events.mcrs`。该运行时库用一个 `@tick` 函数轮询 tag/scoreboard，再执行 `function #rs:on_...` 分发。

`@watch("objective")` 会创建 previous-value scoreboard objective，生成 tick 注册的 `__watch_<name>` dispatcher，并在玩家的被观察 objective 发生变化时以该玩家上下文运行用户函数。

其他 wrapper 类装饰器在 `src/emit/index.ts` 中生成：`@throttle` 使用每函数 tick 计数器，`@retry` 使用 retry 计数器和 tick dispatcher，`@memoize` 把原函数改名为 `<name>_impl` 并生成 LRU-1 scoreboard 缓存 wrapper，debug profiling/benchmark 装饰器会添加计时 objective 和辅助函数。

## 生成模型

MIR 是控制流图。LIR 是扁平且贴近 Minecraft 的指令序列。一个 LIR function 对应一个 `.mcfunction`；带 `::` 的方法名会转成路径片段，例如 `Player::heal` 会生成 `player/heal.mcfunction`。

scoreboard 临时值是模块 objective 中的 fake player，通常 objective 为 `__<namespace>`。LIR lowering 会给 temp 加上当前函数名前缀，所以 `t0` 之类的临时值会变成类似 `$fn_t0 __ns` 的 slot。函数参数使用 `$p0`、`$p1`，返回值使用 `$ret`。结构体返回字段使用 `$ret_x` 这类 return-field slot。

LIR 层算术是二地址形式。MIR 中的 `dst = a + b` 会先把 `a` copy 到 `dst`，再用 scoreboard operation 把 `b` 加到 `dst`。比较通常先把目标设为 `0`，再用 `execute if/unless score` 条件设为 `1`。

控制流会变成函数和调用。分支目标和循环块可能被抽成 helper `.mcfunction`。分支生成使用 `execute if score ... run return run function ...` 处理 then 路径，之后 fall through 到 else 路径。循环因此会在调用图中表现为环，这也是静态 budget 分析能基于 LIR 调用图工作的原因。

对 selector 的 `foreach` 会把循环体抽成 helper，并生成 `call_context`，最终变成 `execute as <selector> ... run function <helper>`。在 helper 内，绑定变量在命令上下文中会被视为 `@s`。`execute { ... }` 块对已支持的上下文子命令采用同样的 helper 模型，例如 `as`、`at`、`positioned`、`rotated`、`in`、`anchored`。

最终 emitter 会把每条 LIR 指令映射为 Minecraft 命令，并执行 `flattenExecute`。它会在语义等价时把嵌套的 `execute if ... run execute if ...` 合并成一条 execute 命令。

## 存储与计算

普通 `int` 和 `bool` 使用 scoreboard。scoreboard 立即数受 Minecraft 有符号 32 位范围限制。

`fixed`/`float` 使用 `x10000` 的整数缩放并存储在 scoreboard 上。两个 fixed 相乘后会除以 `10000` 修正缩放；两个 fixed 相除前会先把被除数乘以 `10000`。

`double` 存在 `rs:d` NBT storage。double 字面量和变量通过 `data modify storage` 写入；读取为 fixed-point 时使用 `data get storage ... 10000.0`。double 算术会通过 `rs:d __dp0` 和 `__dp1` 传递操作数，并调用 `math_hp:double_add`、`double_sub`、`double_mul` 或 `double_div`。

数组是 NBT-backed，位于 `<namespace>:arrays`。字面量数组可以用一条 `data modify storage ... set value [...]` 初始化。常量索引降低为直接 NBT 读写。动态索引会把索引和值写入 `rs:macro_args`，再用 `with storage` 调用生成的 function macro，因此依赖 Minecraft function macro 支持。

字符串变量存放在 `rs:strings`，不是通用 scoreboard 表达式。`say(f"...")` 会通过生成的 macro helper 和 `rs:macro_args` 实现；普通 `say("...")` 保持为内联命令。`tellraw`、`title`、`subtitle`、`actionbar`、`announce` 等文本 builtin 可以把 f-string 转成带 scoreboard 组件的 JSON text。`Display::to_string` 会内联到 f-string 上下文，而不是作为独立运行时调用生成。

全局变量读写 scoreboard slot。`@singleton` 结构体会生成每字段 objective，并注入合成的 `Struct::get` 与 `Struct::set` 函数，在这些 objective 与普通返回/参数 slot 之间复制。

## 运行时成本模型

主要成本倍数不是 RedScript 源码行数，而是生成的 Minecraft 命令数，再乘以 selector 和 tick root 的触发频率。

| 模式 | 运行时形态 | 成本信号 |
| --- | --- | --- |
| `@tick` | function tag 每游戏 tick 运行 | 成本每秒重复 20 次。 |
| `execute as @a` 或 selector `foreach` | 每个匹配实体调用一次 helper | 成本随选中的玩家/实体数量增长。 |
| `@on(...)` | 注入事件轮询 tick，并通过 handler function tag 分发 | 一旦注入事件运行时，就有轮询成本；handler 成本随事件触发增长。 |
| `@watch` | 每个 watch 一个 tick dispatcher，通常遍历 `@a` | 成本随玩家数和 watched objective 数量增长。 |
| `@schedule` | 调用 wrapper 时执行一条 schedule 命令 | 除非被调度函数再次调度自己，否则没有每 tick 轮询。 |
| `@coroutine` | tick dispatcher、continuation 函数和持久 scoreboard 状态 | 把循环工作分散到多个 tick；`batch` 控制每 tick 工作量。 |
| 动态数组访问 | 写 `rs:macro_args` 加 function macro 调用 | 明显重于 scoreboard 算术或常量索引 NBT。 |
| `set_int` helper | NBT list load/store 加线性扫描 | 适合小集合；避免大集合热路径扫描。 |
| `heap` stdlib | NBT int array，sift-up/sift-down 循环，容量 64 | 逻辑上 O(log n)，但每步都触碰 NBT-backed 数组槽。 |
| `scheduler_tick()` | 固定 scoreboard 命令组，包含 per-player `execute as @a` 槽位 | 从全局 tick root 调用一次，不要放进 per-player 循环。 |

静态 budget pass 会从 LIR 估算命令数。超过 Minecraft 默认 `maxCommandChainLength` 的一半时给 warning，超过默认完整限制时给 error。`@coroutine` 函数会被排除在该单函数检查外，因为它的工作被刻意切分到多个 tick。

## 实用建议

- 当行为或成本重要时，直接检查生成的 `data/<namespace>/function` 输出。它是 selector、函数切分和 wrapper 的最可靠真相。
- 保持热 `@tick` root 短小。较慢工作放到 `@throttle`、`@schedule`、显式计数器、`setInterval` 或 `@coroutine` 后面。
- 避免在嵌套循环中使用宽 selector。一个经 `execute as @a` 调用的 helper 再执行 `foreach @e[...]`，会把两层 selector 成本相乘。
- 热路径计数器、标志位和小型数字状态优先使用 scoreboard 变量。
- 数组、集合、heap 和 double precision 在需要表达能力时很有用，但应按 storage-backed 操作看待。
- 如果固定索引或固定大小结构体字段能解决问题，就不要在紧密 tick 循环里使用动态数组索引。
- 小的纯 helper 保持小即可。优化器会自动内联非常小、非递归、非 raw 的 helper；`@inline` 更适合极小的热路径 helper。
- 手动 `/function` 入口请加 `@keep`；否则注入库函数和私有 helper 在不可达时都可能被裁剪。
- 谨慎使用 raw 命令。它们作为副作用会被保留，也会成为优化屏障；这通常正确，但可能阻止进一步简化。
- 若现有事件运行时能表达需求，事件式逻辑优先使用 `@on`；只有条件无法表达时再写原始 tick 轮询。
