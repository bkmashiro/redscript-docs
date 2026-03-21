# Statements

A statement is a unit of execution. Unlike expressions, statements do not produce a value directly (they may have side effects or bind names).

---

## Variable Declaration (`let`)

```rs
// With explicit type annotation
let name: int = 42;
let msg: string = "hello";
let flag: bool = true;

// Type inferred from initializer
let x = 100;
let greeting = "hi";
```

Variables declared with `let` are **mutable** — you can assign new values to them later. Every `let` must have an initializer.

### Constant declaration (`const`)

```rs
const MAX_HEALTH: int = 20;
const PI: fixed = 3.1415;
```

`const` declares a compile-time constant. The value must be a literal.

---

## `if` / `if-else`

```rs
if (condition) {
    // body
}
```

```rs
if (condition) {
    // then branch
} else {
    // else branch
}
```

```rs
if (a > 10) {
    say("big");
} else if (a > 5) {
    say("medium");
} else {
    say("small");
}
```

The condition must be a `bool` expression. Parentheses around the condition are required.

---

## `while`

```rs
while (condition) {
    // body
}
```

Executes the body repeatedly as long as `condition` is `true`.

```rs
let i: int = 0;
while (i < 10) {
    say("${i}");
    i = i + 1;
}
```

Use `break` to exit early and `continue` to skip to the next iteration.

---

## `while let Some`

Repeatedly unwraps an `Option<T>`, executing the body while the option is `Some`:

```rs
while let Some(item) = next_item() {
    process(item);
}
```

The binding `item` is available inside the loop body. When `next_item()` returns `None`, the loop stops.

---

## `for` (range)

Iterate over an integer range. The upper bound is **exclusive**.

```rs
for i in 0..10 {
    say("${i}");   // 0, 1, …, 9
}
```

The upper bound can be a variable:

```rs
let count: int = get_score(@s, #rounds);
for i in 0..count {
    // runs 'count' times
}
```

---

## `for` (array / foreach)

Iterate over every element of an array:

```rs
let names: string[] = ["Alice", "Bob", "Carol"];
for name in names {
    tell(@a, "Hello, ${name}!");
}
```

Use `for i in 0..arr.len` when you also need the index.

---

## `foreach` (entity selector)

Run a block as each entity matching a selector:

```rs
foreach (z in @e[type=zombie]) {
    kill(z);
}

foreach (player in @a) {
    give(player, "diamond", 1);
}
```

The loop variable is bound as `@s` inside the compiled sub-function.

---

## `repeat`

Execute a block a fixed number of times:

```rs
repeat(5) {
    say("spam");
}
```

---

## `return`

Exit a function, optionally returning a value:

```rs
fn greet(name: string) {
    say("Hello, ${name}!");
    return;
}

fn add(a: int, b: int) -> int {
    return a + b;
}
```

A bare `return` (no value) is valid in `void` functions.

---

## `break` / `continue`

`break` exits the innermost loop immediately:

```rs
while (true) {
    if (score(@s, #lives) <= 0) {
        break;
    }
}
```

`continue` skips the rest of the current iteration and jumps back to the loop condition:

```rs
foreach (player in @a) {
    if (score(player, #skip) == 1) {
        continue;
    }
    give(player, "diamond", 1);
}
```

---

## Function Call Statements

A function call used as a statement discards its return value:

```rs
say("Starting up...");
give(@s, "apple", 1);
kill(@e[type=zombie]);
```

---

## `if let Some`

Unwrap an `Option<T>` conditionally:

```rs
let maybe: Option<int> = find_score(@p);

if let Some(pts) = maybe {
    tell(@s, "Points: ${pts}");
}
```

Equivalent to a `match` with a `Some` arm and no `None` arm.

---

## Struct Instantiation

Create a new instance of a struct by supplying all field values:

```rs
struct Point { x: int, y: int }

let p: Point = Point { x: 10, y: 20 };
```

Field order follows the struct definition; all fields must be provided.

---

## Assignment

Re-assign a mutable variable:

```rs
let x: int = 0;
x = x + 1;       // increment
x = score(@s, #points);  // read from scoreboard
```

> **Note:** RedScript does not have `+=`, `-=`, etc. compound assignment operators. Use `x = x + 1` instead.

---

## `match` Statement

`match` can also be used as a statement when the arms have only side effects:

```rs
match phase {
    Phase::Idle      => { say("idle"); },
    Phase::Moving    => { say("moving"); },
    Phase::Attacking => { attack(); },
}
```

See [expressions.md](./expressions.md#match-expressions) for the full `match` syntax and pattern reference.

---

## `execute`

The `execute` statement maps directly to Minecraft's `execute` command:

```rs
execute as @a at @s run {
    setblock ~ ~-1 ~ "stone";
}

execute if block ~ ~-1 ~ "grass_block" run {
    say("Standing on grass!");
}
```

See [syntax.md](./syntax.md#execute) for the full list of supported subcommands.
