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
| `int` | 整数 | `42` |
| `float` | 小数 | `3.14` |
| `string` | 字符串 | `"hello"` |
| `bool` | 布尔值 | `true`、`false` |
| `int[]` | 整数数组 | `[1, 2, 3]` |
| `string[]` | 字符串数组 | `["a", "b"]` |
| `selector` | 实体选择器 | `@a`、`@e[type=zombie]` |
| `nbt` | NBT 数据 | `{Health: 20f}` |

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
| `@on_trigger("name")` | 触发器激活时运行 |
| `@on_death` | 实体死亡时运行 |
| `@on_join` | 玩家加入时运行 |
| `@on_respawn` | 玩家重生时运行 |

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

```rs
match value {
    Pattern::A => { },
    Pattern::B => { },
    _ => { },
}
```

### repeat

```rs
repeat(count) {
    // 循环 count 次
}
```

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

## Lambda

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
