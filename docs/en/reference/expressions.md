# Expressions

An expression is any piece of code that produces a value. RedScript expressions range from simple literals to complex match expressions.

---

## Literals

### Integer literals

```rs
42
-7
0
2147483647
```

Type: `int` (32-bit signed scoreboard integer).

### Double / fixed-point literals

```rs
3.14        // type: fixed (stored as 31400 internally)
-0.5        // type: fixed
45.0 as double  // type: double
```

Bare decimal literals are `fixed` (×10000 storage). To get a `double`, cast explicitly: `1.5 as double`.

### String literals

```rs
"hello"
"Score: ${score}"   // f-string interpolation with ${expr}
```

Strings are immutable text values. Use `${expr}` inside any string literal to interpolate any expression.

### Boolean literals

```rs
true
false
```

Type: `bool`.

### Option literals

```rs
Some(42)        // wraps a value in Option<int>
Some("hello")   // wraps a value in Option<string>
None            // the empty Option
```

`Some(x)` and `None` are the two constructors for `Option<T>`. See also [if let](#if-let-some--match-on-option) below.

---

## Operators

### Arithmetic

| Operator | Description       | Example         |
|----------|-------------------|-----------------|
| `+`      | Addition           | `a + b`         |
| `-`      | Subtraction        | `a - b`         |
| `*`      | Multiplication     | `a * b`         |
| `/`      | Division           | `a / b`         |
| `%`      | Modulo (remainder) | `a % b`         |
| `-` (unary) | Negation        | `-a`            |

> **fixed multiplication:** Multiplying two `fixed` values directly double-scales. Use `mulfix(a, b)` from `stdlib/math` instead.

### Comparison

| Operator | Description     | Example    |
|----------|-----------------|------------|
| `==`     | Equal           | `a == b`   |
| `!=`     | Not equal       | `a != b`   |
| `<`      | Less than       | `a < b`    |
| `>`      | Greater than    | `a > b`    |
| `<=`     | Less or equal   | `a <= b`   |
| `>=`     | Greater or equal| `a >= b`   |

### Logical

| Operator | Description | Example    |
|----------|-------------|------------|
| `&&`     | And         | `a && b`   |
| `\|\|`   | Or          | `a \|\| b` |
| `!`      | Not         | `!a`       |

### Operator Precedence (high → low)

| Level | Operators            | Associativity |
|-------|----------------------|---------------|
| 7     | `-` (unary), `!`     | Right         |
| 6     | `*`, `/`, `%`        | Left          |
| 5     | `+`, `-`             | Left          |
| 4     | `<`, `>`, `<=`, `>=` | Left          |
| 3     | `==`, `!=`           | Left          |
| 2     | `&&`                 | Left          |
| 1     | `\|\|`               | Left          |

Use parentheses to override precedence:

```rs
let x: int = (2 + 3) * 4;   // 20, not 14
```

---

## Function Calls

```rs
// Free function call
say("Hello, world!");

// With arguments
tell(@a, "You have ${score} points");
give(@s, "diamond", 3);
```

Arguments are evaluated left to right before the function is called.

---

## Method Calls

Methods are called with dot notation on a value:

```rs
let v: Vec2 = Vec2 { x: 3, y: 4 };
let len: int = v.length_sq();   // calls Vec2::length_sq
let scaled: Vec2 = v.scale(2);  // calls Vec2::scale
```

### Chained Method Calls

Method calls can be chained when each method returns a value:

```rs
let result: Vec2 = v.scale(2).add(other);
```

---

## Array Index

Access an element of an array with `arr[index]`:

```rs
let arr: int[] = [10, 20, 30];
let first: int = arr[0];   // 10
let last: int  = arr[2];   // 30
```

Indices are zero-based. Accessing out-of-bounds is undefined behavior.

---

## Struct Field Access

Access a field of a struct with `.`:

```rs
struct Point { x: int, y: int }

let p: Point = Point { x: 3, y: 7 };
let px: int = p.x;   // 3
let py: int = p.y;   // 7
```

---

## Type Casts

Convert a value to a different type with `as`:

```rs
let x: int    = 42;
let f: fixed  = x as fixed;    // int → fixed (× 10000)
let d: double = x as double;   // int → double
let back: int = f as int;      // fixed → int (÷ 10000, truncated)
```

See [types.md](./types.md) for full cast semantics.

---

## Option Constructors

```rs
let a: Option<int>    = Some(42);
let b: Option<string> = Some("hello");
let c: Option<int>    = None;
```

`Option<T>` is a built-in generic type representing a nullable value. `Some(expr)` wraps a value; `None` represents absence.

---

## Enum Constructors

### Simple (no payload)

```rs
enum Direction { North, South, East, West }

let dir: Direction = Direction::North;
```

### With payload fields

```rs
enum Color {
    Red,
    RGB(r: int, g: int, b: int),
}

let c: Color = Color::RGB(r: 255, g: 128, b: 0);
```

Payload fields are named. Supply them as `field: value` pairs inside the parentheses.

---

## Match Expressions

`match` dispatches on the value of an expression. Each arm has a pattern and a body block.

### Match on integer / range

```rs
let score: int = 85;

match score {
    90..100 => { say("A"); },
    80..89  => { say("B"); },
    70..79  => { say("C"); },
    _       => { say("Below C"); },
}
```

Ranges are **inclusive** on both ends (`min..max`). `_` is the wildcard arm.

### Match on enum

```rs
enum Phase { Idle, Moving, Attacking }

let phase: Phase = Phase::Moving;

match phase {
    Phase::Idle      => { say("Resting"); },
    Phase::Moving    => { say("On the move"); },
    Phase::Attacking => { say("Attack!"); },
}
```

### Match on enum with payload

```rs
match color {
    Color::RGB(r, g, b) => { tell(@s, "r=${r} g=${g} b=${b}"); },
    Color::Red           => { say("plain red"); },
    _                    => { },
}
```

### Match on Option

```rs
let maybe: Option<int> = find_score(@p);

match maybe {
    Some(v) => { tell(@s, "Score: ${v}"); },
    None    => { say("No score found"); },
}
```

---

## `unwrap_or`

Safely extract the value from an `Option<T>`, falling back to a default if it is `None`:

```rs
let maybe: Option<int> = find_score(@p);
let score: int = maybe.unwrap_or(0);   // 0 if None
```

Equivalent to:

```rs
let score: int = match maybe {
    Some(v) => v,
    None    => 0,
};
```

---

## Lambda Expressions

```rs
let double = (x: int) => x * 2;

let clamp = (v: int) => {
    if (v < 0) { return 0; }
    if (v > 100) { return 100; }
    return v;
};
```

Lambdas capture their lexical environment and can be passed to higher-order functions.
