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

RedScript has five primitive types:

| Type | Description | Example |
|------|-------------|---------|
| `int` | Integer (scoreboard, 32-bit) | `42`, `-7`, `0` |
| `fixed` | Fixed-point decimal, scale ×10000 | `10000` (= 1.0), `15000` (= 1.5) |
| `double` | IEEE 754 double (NBT-backed) | `x as double` |
| `string` | Text | `"hello"`, `"Steve"` |
| `bool` | Boolean | `true`, `false` |

> **v2.5.0 note:** `float` has been renamed to `fixed`. Any existing code using `float` will trigger a deprecation warning and should be migrated to `fixed`. The `double` type is new.

### Integers

```rs
let score: int = 0;
let negative: int = -10;
score = score + 1;
```

### Fixed-point (`fixed`)

`fixed` represents decimal values as integers scaled by ×10000. This is the standard way to do fractional math in datapacks without floating-point hardware.

```rs
let speed: fixed = 15000;   // 1.5 — stored as int 15000
let half: fixed  = 5000;    // 0.5
let one: fixed   = 10000;   // 1.0
```

**Key rules:**
- `10000` = 1.0, `15000` = 1.5, `0` = 0.0
- Use `mulfix(a, b)` to multiply two `fixed` values — it divides by 1000 to re-scale: `mulfix(15000, 20000)` = `30000` (1.5 × 2.0 = 3.0)
- Use `as fixed` to convert from `int` or `double`

```rs
let x: int = 5;
let xf: fixed = x as fixed;  // 5 * 10000 = 50000

let d: double = 3.14 as double;
let df: fixed = d as fixed;   // floor(3.14 * 10000) = 31400
```

> **Warning:** Direct arithmetic on two `fixed` values (e.g. `a * b`) does NOT automatically rescale. The compiler will emit a lint warning. Use `mulfix` for multiplication and `divfix` for division.

### Double (`double`)

`double` stores an IEEE 754 double-precision value in NBT storage (`rs:d`). It is used when integer or fixed-point precision is insufficient — e.g. for high-precision trig, physics simulation, or values that span a very wide range.

```rs
let pi: double = 3 as double;   // start from int 3
// ... use math_hp functions to refine
```

**Conversion:**

```rs
let n: int    = 42;
let d: double = n as double;    // 42.0

let f: fixed  = 15000;          // 1.5
let d2: double = f as double;   // 1.5 (divided by 10000 automatically)

let d3: double = /* some double */;
let back: fixed = d3 as fixed;  // floor(d3 * 10000)
let back_int: int = d3 as int;  // floor(d3)
```

> **NBT storage:** `double` values live in `rs:d __dp0` (and `__dp1`, `__dp2`, …). Direct assignment uses `data modify storage`. Use functions from `stdlib/math_hp.mcrs` for arithmetic.

### Explicit `as` casting

Starting in v2.5.0, numeric type conversions require an explicit `as` cast. Implicit coercion no longer works between `int`, `fixed`, and `double`.

```rs
// ✅ Correct — explicit cast
let n: int   = 5;
let f: fixed = n as fixed;   // 50000

// ❌ Error — implicit coercion removed
let f2: fixed = n;           // compiler error: expected fixed, got int
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
