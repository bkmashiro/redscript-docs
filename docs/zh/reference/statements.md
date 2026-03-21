# 语句

语句是执行的基本单位。与表达式不同，语句不直接产生值（但可能有副作用或绑定名称）。

---

## 变量声明（`let`）

```rs
// 带显式类型注解
let name: int = 42;
let msg: string = "hello";
let flag: bool = true;

// 从初始值推断类型
let x = 100;
let greeting = "hi";
```

用 `let` 声明的变量是**可变的**——可以在后续重新赋值。每个 `let` 必须有初始值。

### 常量声明（`const`）

```rs
const MAX_HEALTH: int = 20;
const PI: fixed = 3.1415;
```

`const` 声明编译期常量，值必须是字面量。

---

## `if` / `if-else`

```rs
if (condition) {
    // 分支体
}
```

```rs
if (condition) {
    // then 分支
} else {
    // else 分支
}
```

```rs
if (a > 10) {
    say("大");
} else if (a > 5) {
    say("中");
} else {
    say("小");
}
```

条件必须是 `bool` 表达式。条件两侧的括号是必须的。

---

## `while`

```rs
while (condition) {
    // 循环体
}
```

只要 `condition` 为 `true`，就反复执行循环体。

```rs
let i: int = 0;
while (i < 10) {
    say("${i}");
    i = i + 1;
}
```

使用 `break` 提前退出，`continue` 跳过本次迭代。

---

## `while let Some`

反复解包 `Option<T>`，只要选项为 `Some` 就执行循环体：

```rs
while let Some(item) = next_item() {
    process(item);
}
```

绑定 `item` 在循环体内有效。当 `next_item()` 返回 `None` 时，循环停止。

---

## `for`（范围）

遍历整数范围。上界**不包含**。

```rs
for i in 0..10 {
    say("${i}");   // 0, 1, …, 9
}
```

上界可以是变量：

```rs
let count: int = get_score(@s, #rounds);
for i in 0..count {
    // 执行 count 次
}
```

---

## `for`（数组）

遍历数组的每个元素：

```rs
let names: string[] = ["Alice", "Bob", "Carol"];
for name in names {
    tell(@a, "你好，${name}！");
}
```

如果同时需要索引，使用 `for i in 0..arr.len`。

---

## `foreach`（实体选择器）

以匹配选择器的每个实体身份执行代码块：

```rs
foreach (z in @e[type=zombie]) {
    kill(z);
}

foreach (player in @a) {
    give(player, "diamond", 1);
}
```

循环变量在编译后的子函数中绑定为 `@s`。

---

## `repeat`

固定执行次数的循环：

```rs
repeat(5) {
    say("spam");
}
```

---

## `return`

退出函数，可选地返回一个值：

```rs
fn greet(name: string) {
    say("你好，${name}！");
    return;
}

fn add(a: int, b: int) -> int {
    return a + b;
}
```

在 `void` 函数中，裸 `return`（无返回值）是合法的。

---

## `break` / `continue`

`break` 立即退出最内层循环：

```rs
while (true) {
    if (score(@s, #lives) <= 0) {
        break;
    }
}
```

`continue` 跳过本次迭代的剩余部分，跳回循环条件：

```rs
foreach (player in @a) {
    if (score(player, #skip) == 1) {
        continue;
    }
    give(player, "diamond", 1);
}
```

---

## 函数调用语句

作为语句使用时，函数调用的返回值被丢弃：

```rs
say("启动中...");
give(@s, "apple", 1);
kill(@e[type=zombie]);
```

---

## `if let Some`

条件解包 `Option<T>`：

```rs
let maybe: Option<int> = find_score(@p);

if let Some(pts) = maybe {
    tell(@s, "积分：${pts}");
}
```

等价于只有 `Some` arm 的 `match`。

---

## 结构体实例化

通过提供所有字段值来创建结构体实例：

```rs
struct Point { x: int, y: int }

let p: Point = Point { x: 10, y: 20 };
```

字段顺序遵循结构体定义；所有字段都必须提供。

---

## 赋值

对可变变量重新赋值：

```rs
let x: int = 0;
x = x + 1;                     // 递增
x = score(@s, #points);        // 从计分板读取
```

> **注意：** RedScript 没有 `+=`、`-=` 等复合赋值运算符。请使用 `x = x + 1` 的形式。

---

## `match` 语句

当各 arm 只有副作用时，`match` 也可以作为语句使用：

```rs
match phase {
    Phase::Idle      => { say("闲置"); },
    Phase::Moving    => { say("移动"); },
    Phase::Attacking => { attack(); },
}
```

完整的 `match` 语法和模式参考见 [expressions.md](./expressions.md#match-表达式)。

---

## `execute`

`execute` 语句直接映射到 Minecraft 的 `execute` 命令：

```rs
execute as @a at @s run {
    setblock ~ ~-1 ~ "stone";
}

execute if block ~ ~-1 ~ "grass_block" run {
    say("站在草方块上！");
}
```

完整的子命令列表见 [syntax.md](./syntax.md#execute)。
