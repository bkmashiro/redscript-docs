# 优化器

RedScript 使用一套**固定、生产安全**的优化流水线。

CLI 中当前没有公开的优化等级开关（`-O0`、`-O1`、`-O2`、`--stats`、`--no-dce`）。每次编译都会运行同一套保守的默认流水线。

## 固定优化流水线

流水线分阶段执行：

1. **MIR 优化**（`src/optimizer/pipeline.ts`）
   - `autoInlineSmallFunctions`、`inlinePass` 在 MIR 级别函数内联前先做计划。
   - 每个函数按定点迭代进行以下安全 pass：
     `loopUnroll` → `licm` → `nbtBatchRead` → `nbtCoalesce` → `scoreboardBatchRead` → `constantFold` → `strengthReduction` → `cse` → `copyProp` → `branchSimplify` → `dce` → `blockMerge`。
   - 每个函数优化结束后再执行 `interproceduralConstProp`（模块级）。
2. **LIR 优化**（`src/optimizer/lir/pipeline.ts`）
   - 生产默认 pass：`deadSlotElimModule` → `execStorePeephole` → `constImmFold` → `deadSlotElimModule`。
   - `scoreboardRmwPassModule`（局部副本重写）默认**关闭**。

`scoreboardRmwPassModule` 是独立的可选优化模式，不在默认流水线中开启。

## DCE

优化完成后，RedScript 会移除不可达函数。它基于可达入口与运行时装饰器，再结合装饰器根节点做可达性推导。

常用规则：

- `@load`、`@tick`、`@on(...)`、`@coroutine` 等运行时装饰器入口函数会保留。
- 不可达的内部 helper 会被移除，以减小输出。
- `@keep` 可以显式保留函数，即使它在可达性上本应被删。

```rs
@load
fn init() {
    helper()
}

fn helper() {
    say("reachable")
}

fn dead_helper() {
    say("unreachable 时会被移除")
}

@keep
fn _manual_entry() {
    say("保留为手动 /function 调用")
}
```

因为 DCE 是固定流水线的一部分，所以可通过编译后检查 `data/<ns>/function` 目录来观察实际移除结果。

## 常量折叠

常量折叠会在编译期计算已知输入表达式。

```rs
let ticks_per_minute: int = 20 * 60
let doubled: int = 8 + 8
let ready: bool = 3 > 1
```

生成代码会直接使用计算后的常量值，避免等价的运行时运算。

它最适合：

- 字面量算术
- 简单布尔条件
- 固定大小循环边界
- 可在编译期确定的配置值

## `@inline`

`@inline` 是面向高频路径的小 helper 的性能提示。

```rs
@inline
fn clamp_zero(x: int) -> int {
    if (x < 0) {
        return 0
    }
    return x
}
```

当优化器接受该提示后，会在调用点直接替换函数体，再执行后续清理 pass，通常能触发更多常量折叠、复制传播和控制流简化。

使用建议：

- 只给非常小的 helper 使用
- 热循环中效果更明显
- 不要拿它替代清晰结构

## 复制传播

复制传播在安全时将临时别名替换为原值。

```rs
fn award(points: int) {
    let p = points
    let value = p
    scoreboard_add(@s, "score", value)
}
```

这样生成代码可直接使用 `points`，减少额外临时变量。

## 循环展开

循环展开会把小且固定次数的循环展开为直线代码，避免每次迭代都进行分支。

```rs
let i: int = 0
while (i < 4) {
    say("tick")
    i = i + 1
}
```

它最适合：

- 循环上界是小的编译期常量
- 循环体本身非常短
- 去掉循环控制后可让后续 pass 更顺利

大循环或运行时相关的循环通常保持循环形态。

## 基本块合并

基本块合并会在控制流线性、无需保留分支边界时合并相邻块。

通常会带来：

- 更少的函数内跳转
- 内联后更短的控制流链
- 在条件收敛后输出更干净

## 实验性局部副本重写

有一个手动启用、且默认关闭的实验性优化标志：

```bash
redscript compile main.mcrs --experimental-lir-local-copy-rewrite
```

它会在 LIR 阶段开启 `scoreboardRmwPassModule`。该开关属于**实验性/证据导向**用途；当前文档将其定位为手动验证路径，不作为生产默认行为。现有门禁报告偏向离线基准与 typed 证据，不等同于全量生产证明。

## 这些 Pass 如何配合

高层上，流水线表现为：

1. MIR 阶段的死代码清理与标量简化
2. 函数级 MIR pass 组合折叠常量、传播值并清理结构
3. 内联与 DCE 缩减热路径
4. LIR 的 dead slot 清理与 peephole 折叠

通常无需记忆精确顺序，关键是保持 helper 细粒度、合理使用装饰器、明确热路径。

## 实用建议

- 编译命令不再提供 `-O*` 优化级别。
- 直接使用 `redscript compile <file>` 来触发默认流水线。
- 通过查看 `data/<namespace>/function` 输出验证 DCE 效果。
- 若需调试阶段信息，使用 `--snapshot-stages`/`--snapshot-output`。
- 仅在需要时、并配合证据化验证开启 `--experimental-lir-local-copy-rewrite`。
