# Variables & Types

## Declaring Variables

Use `let` for mutable variables and `const` for constants:

```rs
let health: int = 20;
let name: string = "Steve";
const MAX_PLAYERS: int = 16;
```

`const` values cannot be reassigned:

```rs
const PI: float = 3.14;
PI = 3.15; // Error: cannot reassign constant
```

Negative literals work in `const` declarations:

```rs
const MIN_SCORE: int = -50;
const DEPTH: int = -64;      // e.g. Minecraft bedrock level
```

## Types

RedScript has four primitive types:

| Type | Description | Example |
|------|-------------|---------|
| `int` | Integer numbers | `42`, `-7`, `0` |
| `float` | Decimal numbers | `3.14`, `-0.5` |
| `string` | Text | `"hello"`, `"Steve"` |
| `bool` | Boolean | `true`, `false` |

### Integers

```rs
let score: int = 0;
let negative: int = -10;
score = score + 1;
```

### Floats

```rs
let speed: float = 1.5;
let ratio: float = 0.75;
```

### Strings

Strings support interpolation with `${}`:

```rs
let player: string = "Alex";
let msg: string = "Hello, ${player}!";
say(msg); // Hello, Alex!
```

### Booleans

```rs
let alive: bool = true;
let creative: bool = false;
```

## Arrays

Arrays hold multiple values of the same type:

```rs
let scores: int[] = [10, 20, 30];
let names: string[] = ["Alice", "Bob"];
```

Access elements by index:

```rs
let first: int = scores[0]; // 10
```

## Type Inference

RedScript can infer the type when the value is obvious:

```rs
let health = 20;        // inferred as int
let name = "Steve";     // inferred as string
let alive = true;       // inferred as bool
let speed = 1.5;        // inferred as float
```

This also works for `const` — the type annotation is optional:

```rs
const MAX_PLAYERS = 16;     // inferred as int
const PREFIX = "[Game]";    // inferred as string
const RATE = 0.5;           // inferred as float
```

Explicit types are recommended for clarity, but optional.

## Global Variables

Variables declared at the top level are global and accessible from any function:

```rs
let score: int = 0;

@tick(rate=20)
fn update() {
    score = score + 1;
    actionbar(@a, "Score: ${score}");
}

fn reset() {
    score = 0;
}
```

Global variables are stored as Minecraft scoreboard objectives.

## Next Steps

- [Functions](/en/guide/functions) — Define reusable logic
- [Structs & Enums](/en/guide/structs-enums) — Custom data types
