# 字符串

RedScript 支持带插值的编译期字符串，以及用于输出的运行时 f-string。

## 字符串字面量

```mcrs
let name: string = "Alex";
let greeting: string = "Hello, World!";
```

字符串是**编译期常量**。所有字符串值都必须在编译时确定。

## 字符串插值 `${}`

使用 `${}` 将编译期常量嵌入字符串中：

```mcrs
const GAME_NAME: string = "MiniGame";
let msg: string = "Welcome to ${GAME_NAME}!";
// 编译后为: "Welcome to MiniGame!"
```

**注意**：插值的值必须是编译期常量（`const` 或字面量）。

```mcrs
const VERSION: string = "1.0";
let info: string = "Version: ${VERSION}";  // OK

let x: int = scoreboard_get(@s, #score);
let msg: string = "Score: ${x}";           // 错误：x 是运行时值
```

## f-string（格式字符串）

对于输出中的运行时值，请使用 f-string：

```mcrs
let score: int = scoreboard_get(@s, #kills);
let player: Player = @s;
say(f"You have {score} kills!");
say(f"Welcome {player}!");
title(@s, f"Score: {score}");
actionbar(@s, f"HP: {hp}");
```

f-string 会编译为 tellraw JSON：

```mcfunction
tellraw @a [{"text":"You have "},{"score":{"name":"$t0","objective":"rs"}},{"text":" kills!"}]
```

### f-string 可用的位置

- `say(f"...")`
- `tellraw(target, f"...")`
- `title(target, f"...")`
- `subtitle(target, f"...")`
- `actionbar(target, f"...")`

### 限制

- f-string 只能用于输出函数
- 不能把 f-string 的结果存入变量
- 占位符可以是运行时记分板值，也可以是 `Player` 这类受支持的显示类型

```mcrs
// OK
say(f"Score: {score}");

// 错误：不能存储 f-string
let msg: string = f"Score: {score}";
```

## 总结

| 语法 | 类型 | 用途 |
|------|------|------|
| `"text"` | `string` | 编译期字符串 |
| `"${const}"` | `string` | 编译期插值 |
| `f"{runtime}"` | `format_string` | 仅用于运行时输出 |
