# 语法参考

RedScript 完整语法参考。

## 文件扩展名

RedScript 文件使用 `.mcrs` 扩展名。

## 注释

```rs
// 单行注释

/*
   多行
   注释
*/
```

## 变量

```rs
let name: type = value;       // 可变
const NAME: type = value;     // 常量
let name = value;             // 类型推断
```

### 类型

| 类型 | 描述 | 示例 |
|------|------|------|
| `int` | 整数（记分板，32 位有符号） | `42` |
| `fixed` | 定点数 ×10000（v2.5.0 中 `float` 重命名） | `10000`（= 1.0） |
| `double` | IEEE 754 双精度，NBT 存储（v2.5.0 新增） | `x as double` |
| `string` | 字符串 | `"hello"` |
| `bool` | 布尔值 | `true`、`false` |
| `int[]` | 整数数组 | `[1, 2, 3]` |
| `string[]` | 字符串数组 | `["a", "b"]` |
| `selector` | 实体选择器 | `@a`、`@e[type=zombie]` |
| `nbt` | NBT 数据 | `{Health: 20f}` |

> **v2.5.0：** `float` 已废弃并重命名为 `fixed`。v2.5.0 起数值转换必须使用显式 `as` 转换，不再支持隐式转换。对 `fixed` 值做乘法但未使用 `mulfix`/`divfix` 时会触发 lint 警告。

## 函数

```rs
fn name() {
    // 函数体
}

fn name(param: type) {
    // 函数体
}

fn name(param: type) -> return_type {
    return value;
}

fn name(param: type, optional: type = default) {
    // 函数体
}
```

## 装饰器

```rs
@decorator
fn name() { }

@decorator(key=value)
fn name() { }
```

| 装饰器 | 描述 |
|--------|------|
| `@load` | 数据包加载时运行 |
| `@tick` | 每个游戏刻运行 |
| `@tick(rate=N)` | 每 N 个游戏刻运行 |
| `@on_trigger("name")` | 玩家激活触发器时运行 |
| `@on_death` | 实体死亡时运行 |
| `@on_login` | 玩家加入服务器时运行 |
| `@on_advancement("id")` | 玩家获得进度时运行 |
| `@on_craft("item")` | 玩家合成物品时运行 |
| `@on_join_team("team")` | 玩家加入队伍时运行 |
| `@on(EventType)` | 静态事件触发时运行（PlayerDeath、PlayerJoin、BlockBreak、EntityKill、ItemUse） |
| `@keep` | 阻止 DCE 移除该函数 |

## 控制流

### if / else

```rs
if (condition) {
    // 函数体
}

if (condition) {
    // 函数体
} else {
    // 函数体
}

if (condition) {
    // 函数体
} else if (condition) {
    // 函数体
} else {
    // 函数体
}
```

### match

Match 支持枚举模式和整数范围模式：

```rs
// 枚举模式
match value {
    Pattern::A => { },
    Pattern::B => { },
    _ => { },
}

// 整数范围模式
let score: int = scoreboard_get(@s, #points);
match score {
    90..100 => { say("A 等级"); },
    80..89  => { say("B 等级"); },
    70..79  => { say("C 等级"); },
    _       => { say("C 以下"); },
}
```

范围模式使用 `min..max`（两端均包含）。

### repeat

```rs
repeat(count) {
    // 循环 count 次
}
```

### for i in 范围

遍历整数范围。上界可以是字面量**或变量**：

```rs
for i in 0..10 {
    say("${i}");   // 0 到 9
}

let count: int = get_score(@s, #rounds);
for i in 0..count {
    // 循环 count 次
}
```

范围是左闭右开的（`0..n` → 0、1、…、n-1）。

### for x in 数组

遍历数组的每个元素。循环变量依次取各元素的值：

```rs
let names: string[] = ["Alice", "Bob", "Carol"];
for name in names {
    tell(@a, "你好，${name}！");
}

let scores: int[] = [10, 20, 30];
for s in scores {
    // s 依次为 10、20、30
}
```

支持任意元素类型（`int[]`、`string[]`、结构体数组等）。若同时需要索引，使用 `for i in 0..arr.len`。

### break / continue

`break` 提前退出最内层循环，`continue` 跳到下一次迭代：

```rs
while (true) {
    if (score(@s, #lives) <= 0) {
        break;
    }
    // ...
}

foreach (player in @a) {
    if (score(player, #skip) == 1) {
        continue;
    }
    give(player, "diamond", 1);
}
```

`break` 和 `continue` 在 `while`、`foreach` 和 `for i in range` 循环中均可使用。

### execute

`execute` 语句直接映射到 Minecraft 的 `execute` 命令，并带有类型化的代码块：

```rs
execute as @a at @s run {
    setblock ~ ~-1 ~ "stone";
}

execute if block ~ ~-1 ~ "grass_block" run {
    say("Standing on grass!");
}

execute positioned 0 64 0 run {
    particle("heart", ~0, ~1, ~0);
}

execute store result score @s #points run {
    // 产生结果的命令
}
```

**支持的子命令：**

| 子命令 | 描述 |
|--------|------|
| `as <selector>` | 改变执行者 |
| `at <selector>` | 将位置/朝向改为实体 |
| `positioned <x> <y> <z>` | 设置执行位置 |
| `positioned as <selector>` | 将位置设为实体位置 |
| `rotated <yaw> <pitch>` | 覆盖朝向 |
| `rotated as <selector>` | 复制实体朝向 |
| `facing <x> <y> <z>` | 面向某个位置 |
| `facing entity <selector>` | 面向某个实体 |
| `anchored eyes\|feet` | 设置坐标锚点 |
| `align <axes>` | 对齐到方块网格 |
| `in <dimension>` | 切换维度 |
| `on <relation>` | 导航实体关系 |
| `if block <x> <y> <z> <block>` | 条件：方块类型 |
| `if score <target> <obj> matches <range>` | 条件：分数 |
| `unless block ...` | 取反的方块条件 |
| `unless score ...` | 取反的分数条件 |
| `store result score <target> <obj>` | 将结果存入分数 |
| `store success score <target> <obj>` | 将成功标志存入分数 |

## 运算符

### 算术运算符

| 运算符 | 描述 |
|--------|------|
| `+` | 加法 |
| `-` | 减法 |
| `*` | 乘法 |
| `/` | 除法 |
| `%` | 取模 |

### 比较运算符

| 运算符 | 描述 |
|--------|------|
| `==` | 等于 |
| `!=` | 不等于 |
| `<` | 小于 |
| `>` | 大于 |
| `<=` | 小于等于 |
| `>=` | 大于等于 |

### 逻辑运算符

| 运算符 | 描述 |
|--------|------|
| `&&` | 与 |
| `\|\|` | 或 |
| `!` | 非 |

## 字符串

```rs
let s: string = "hello";
let interpolated: string = "Hello, ${name}!";
```

### F-Strings（插值字符串）

RedScript 支持在字符串字面量中使用 `${expr}` 进行 f-string 插值，花括号内可以写任意表达式。

```rs
let player: string = "Steve";
let score: int = 42;

// 简单变量插值
let msg: string = "Hello, ${player}!";

// 表达式插值
let info: string = "Score: ${score * 2} points";

// 嵌套计算
let desc: string = "Lives: ${max_lives - used_lives}";
```

> **v2.6.0：** 使用 `"string" + var` 进行字符串拼接现在是**编译错误**，请改用 f-string：
> ```rs
> // ❌ 编译错误
> let bad: string = "Hello " + name;
>
> // ✅ 正确写法
> let good: string = "Hello ${name}";
> ```

#### F-Strings 在聊天命令中的用法

当 f-string 用于 `tell`、`title`、`subtitle`、`actionbar` 或 `announce` 时，编译器会生成正确的 Minecraft JSON 文本组件，使动态值在游戏内正确显示：

```rs
tell(@a, "Your score is ${score(@s, #points)}!");
title(@s, "Round ${round} of ${max_rounds}");
actionbar(@a, "HP: ${score(@s, #hp)} / ${score(@s, #max_hp)}");
```

这些会编译为 MC JSON 文本格式，如 `["", "Your score is ", {"score": {"name": "@s", "objective": "points"}}, "!"]`。

## 数组

```rs
let arr: int[] = [1, 2, 3];
let first: int = arr[0];
```

## 结构体

```rs
struct Name {
    field: type,
    field2: type,
}

let instance = Name {
    field: value,
    field2: value,
};

instance.field;
```

## 枚举

```rs
enum Name {
    Variant1,
    Variant2,
    Variant3,
}

let val: Name = Name::Variant1;
```

## Impl 块

`impl` 块为结构体附加方法。方法接受一个隐式的 `self` 参数，通过点符号调用。

```rs
struct Vec2 {
    x: int,
    y: int,
}

impl Vec2 {
    fn length_sq(self) -> int {
        return self.x * self.x + self.y * self.y;
    }

    fn scale(self, factor: int) -> Vec2 {
        return Vec2 { x: self.x * factor, y: self.y * factor };
    }

    fn add(self, other: Vec2) -> Vec2 {
        return Vec2 { x: self.x + other.x, y: self.y + other.y };
    }
}

let v = Vec2 { x: 3, y: 4 };
let len_sq: int = v.length_sq();   // 25
let scaled: Vec2 = v.scale(2);     // Vec2 { x: 6, y: 8 }
```

`impl` 块中定义的方法遵循与顶层函数相同的可见性规则：以 `_` 开头的名称为私有，受死代码消除影响。

## Option\<T\>

`Option<T>` 表示一个可能存在也可能不存在的值。它有两个变体：`Some(value)` 和 `None`。

```rs
// 声明可选值
let maybe: Option<int> = Some(42)
let empty: Option<int> = None

// 用 if let 解包（唯一支持的解包语法）
if let Some(v) = maybe {
    say("Got ${v}")
}
```

### 从函数返回 Option

```rs
fn find_score(target: selector) -> Option<int> {
    let s: int = score(target, #points)
    if (s < 0) {
        return None
    }
    return Some(s)
}

let result: Option<int> = find_score(@p)
if let Some(pts) = result {
    tell(@s, "Points: ${pts}")
}
```

> **注意：** RedScript 目前只支持 `if let Some(x) = opt { ... }` 语法解包 Option。
> `match`、`.unwrap()`、`.is_some()`、`.is_none()`、`.unwrap_or()` 尚未实现。

## 泛型

函数和结构体可以用一个或多个类型变量参数化。类型变量写在名称后的尖括号中，可在该定义中任何需要类型的地方使用。

```rs
// 泛型函数——返回任意类型数组的第一个元素
fn first<T>(arr: T[]): T {
    return arr[0];
}

let n: int = first<int>([10, 20, 30]);      // 10
let s: string = first<string>(["a", "b"]); // "a"

// 多个类型参数
fn zip<A, B>(a: A, b: B): string {
    return "${a} / ${b}";
}

// 泛型结构体
struct Pair<T> {
    left: T,
    right: T,
}

let p: Pair<int> = Pair { left: 1, right: 2 };
```

> 当编译器可以从参数推断类型时，函数调用支持类型推断。显式类型参数（`first<int>(...)`）始终被接受。

## Lambdas

```rs
let f = (x: int) => x * 2;
let g = (x: int) => {
    // 多行函数体
    return x * 2;
};
```

## 选择器

```rs
@a                          // 所有玩家
@e                          // 所有实体
@p                          // 最近的玩家
@s                          // 自身
@r                          // 随机玩家
@a[tag=x, distance=..10]   // 带参数
```

## NBT 字面量

```rs
1b          // byte
100s        // short
1000L       // long
1.5f        // float
3.14d       // double
42          // int

{key: value}                    // 复合标签
[1, 2, 3]                      // 列表
[B; 1b, 0b]                    // 字节数组
[I; 1, 2, 3]                   // 整数数组
[L; 100L, 200L]                // 长整数数组
```

## foreach

```rs
// 以每个匹配选择器的实体身份运行代码
foreach (z in @e[type=zombie]) {
    kill(z);  // z 在编译后的函数中变为 @s
}

foreach (player in @a) {
    give(player, "minecraft:diamond", 1);
}
```

编译为：
```mcfunction
execute as @e[type=minecraft:zombie] run function ns:fn/foreach_0
```

### 执行上下文修饰符

可以在 `foreach` 循环中附加执行上下文修饰符，用于控制循环体的执行位置和方式。修饰符写在选择器之后、代码块之前，可以任意顺序叠加使用。

```rs
// 在每个玩家的位置执行
foreach (p in @a) at @s {
    // 循环体在每个玩家的坐标处运行
}

// 在每只僵尸上方 2 格处执行
foreach (z in @e[type=zombie]) at @s positioned ~ ~2 ~ {
    // 循环体在每只僵尸上方 2 格处运行
}

// 在每个玩家位置执行，面向最近的僵尸
foreach (p in @a) at @s rotated ~ 0 facing entity @e[type=zombie,limit=1,sort=nearest] {
    // 循环体在玩家位置、朝向最近僵尸的角度运行
}
```

#### 支持的修饰符

| 修饰符 | 说明 |
|--------|------|
| `at @s` | 在被迭代实体的位置和朝向处执行 |
| `positioned <x> <y> <z>` | 偏移执行坐标（支持相对坐标 `~` 和局部坐标 `^`） |
| `rotated <yaw> <pitch>` | 覆盖执行朝向（单位为度；`~` 保持当前轴向） |
| `facing entity <selector>` | 将执行朝向旋转为面向匹配的实体 |
| `facing <x> <y> <z>` | 将执行朝向旋转为面向固定坐标 |
| `anchored eyes\|feet` | 设置 `^` 相对坐标的锚点（`eyes` 或 `feet`） |
| `align <axes>` | 将坐标对齐到指定轴的方块网格（如 `xyz`、`xz`） |

修饰符会直接编译为生成的 `.mcfunction` 文件中的 `execute` 子命令，例如：

```mcfunction
# foreach (p in @a) at @s positioned ~ ~2 ~
execute as @a at @s positioned ~ ~2 ~ run function ns:fn/foreach_1
```

## 死代码消除（DCE）

RedScript 的优化器会自动从编译输出中移除不可达函数。

**可见性规则：**

- 名称**不以** `_` 开头的函数为**公有**——始终生成（可通过 `/function namespace:name` 调用）
- 以 `_` 开头的函数为**私有**——仅在被可达代码调用时保留
- 带有装饰器（`@tick`、`@load`、`@on_*`、`@on`、`@keep`）的函数始终保留

```rs
fn public_fn() { }       // 公有，始终生成

fn _helper() { }         // 私有，未被调用时移除

@keep
fn _kept_helper() { }    // 私有名称，但 @keep 强制保留
```

这意味着你可以自由编写私有工具函数——如果从未被调用，它们不会增大数据包体积。
