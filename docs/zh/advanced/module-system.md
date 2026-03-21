# 模块系统

RedScript 的模块系统支持导入整个模块、单个 symbol，或者库模块导出的全部 public symbol。本页描述的是新版的模块导入形式。

## 库模块

一个文件只要以库模块头开始，就可以被其他文件导入：

```rs
module library

fn heal(player: entity) {
    effect(player, "instant_health", 1, 1)
}

fn heal_all() {
    foreach (player in @a) {
        heal(player)
    }
}
```

模块名来自文件名。例如 `player_utils.mcrs` 会被作为 `player_utils` 导入。

`module library` 适合放共享代码：它的主要目标不是单独作为入口编译，而是给其他文件复用。

## 导入整个模块

如果你希望保留模块命名空间，而不是把所有符号都注入当前作用域，可以使用整模块导入：

```rs
import player_utils

fn start_round() {
    player_utils::heal_all()
}
```

编译行为：

- 解析目标库模块
- 记录其导出的 public symbol
- 绑定模块名，使你可以用 `module_name::symbol` 形式访问

在大型项目里，这是最稳妥的导入风格，因为调用点足够显式。

## 导入单个 Symbol

如果你只想把一个名字引入本地作用域，使用 symbol import：

```rs
import math::sin

fn wave(angle: int) -> int {
    return sin(angle)
}
```

编译行为：

- 只导入请求的 public symbol
- 不会把整个模块都绑定到本地
- 如果 symbol 不存在或未导出，会直接报错

当一个模块很大，而你只需要一两个 helper 时，这种形式最合适。

## 通配符导入

如果你希望引入该模块导出的所有 public symbol，可以使用通配符：

```rs
import math::*

fn circle_x(cx: int, radius: int, angle: int) -> int {
    return cx + cos(angle) * radius
}
```

编译行为：

- 展开成该模块所有导出的 public symbol
- 把这些名字注入当前作用域
- 如果多个导入提供了同名符号，可能触发歧义错误

通配符导入在小文件里很方便，但在大代码库里可维护性较差。文件一旦变大，通常应该改回整模块导入或单 symbol 导入。

## 导出面

模块系统沿用了和 DCE 相同的 public/private 约定：

- 不以下划线 `_` 开头的名字是 public，可被导入
- 以下划线开头的名字是 private 实现细节

```rs
module library

fn normalize(v: int) -> int {
    return _clamp(v)
}

fn _clamp(v: int) -> int {
    if (v < 0) {
        return 0
    }
    return v
}
```

其他文件可以导入 `normalize`，但不能导入 `_clamp`。

## 循环依赖

编译器会分两个阶段处理模块循环：

1. 先扫描库模块头和导出符号表
2. 在全局模块图已知后，再解析具体函数体

这意味着，只要导入的 symbol 确实存在且签名合法，模块之间的互相引用是可以解析的。

```rs
// a.mcrs
module library
import b::pong

fn ping() {
    pong()
}

// b.mcrs
module library
import a::ping

fn pong() {
    ping()
}
```

实践建议：

- 函数声明之间的循环依赖通常没问题
- 尽量避免带真实运行时状态的顶层初始化互相依赖
- 如果两个模块互相咬得太紧，把共享类型和 helper 提到第三个公共模块里

当循环依赖开始难以收敛时，最稳妥的办法就是把共享契约拆到一个中立库模块中，让两边都去依赖它。

## 如何选择导入风格

经验规则：

- `import player_utils` 适合需要显式限定名的时候
- `import math::sin` 适合只用一个 symbol 的场景
- `import math::*` 适合体量很小、目标很单一的文件

对于大型 datapack，整模块导入通常是最耐维护的方案。
