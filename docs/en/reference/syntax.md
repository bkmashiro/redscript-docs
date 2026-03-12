# Syntax Reference

Complete syntax reference for RedScript.

## File Extension

RedScript files use the `.mcrs` extension.

## Comments

```rs
// Single-line comment

/*
   Multi-line
   comment
*/
```

## Variables

```rs
let name: type = value;       // mutable
const NAME: type = value;     // constant
let name = value;             // type inferred
```

### Types

| Type | Description | Example |
|------|-------------|---------|
| `int` | Integer | `42` |
| `float` | Decimal | `3.14` |
| `string` | Text | `"hello"` |
| `bool` | Boolean | `true`, `false` |
| `int[]` | Array of int | `[1, 2, 3]` |
| `string[]` | Array of string | `["a", "b"]` |
| `selector` | Entity selector | `@a`, `@e[type=zombie]` |
| `nbt` | NBT data | `{Health: 20f}` |

## Functions

```rs
fn name() {
    // body
}

fn name(param: type) {
    // body
}

fn name(param: type) -> return_type {
    return value;
}

fn name(param: type, optional: type = default) {
    // body
}
```

## Decorators

```rs
@decorator
fn name() { }

@decorator(key=value)
fn name() { }
```

| Decorator | Description |
|-----------|-------------|
| `@load` | Run on datapack load |
| `@tick` | Run every game tick |
| `@tick(rate=N)` | Run every N ticks |
| `@on_trigger("name")` | Run on trigger |
| `@on_death` | Run on entity death |
| `@on_join` | Run on player join |
| `@on_respawn` | Run on player respawn |

## Control Flow

### if / else

```rs
if (condition) {
    // body
}

if (condition) {
    // body
} else {
    // body
}

if (condition) {
    // body
} else if (condition) {
    // body
} else {
    // body
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
    // body runs count times
}
```

## Operators

### Arithmetic

| Operator | Description |
|----------|-------------|
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `%` | Modulo |

### Comparison

| Operator | Description |
|----------|-------------|
| `==` | Equal |
| `!=` | Not equal |
| `<` | Less than |
| `>` | Greater than |
| `<=` | Less or equal |
| `>=` | Greater or equal |

### Logical

| Operator | Description |
|----------|-------------|
| `&&` | And |
| `\|\|` | Or |
| `!` | Not |

## Strings

```rs
let s: string = "hello";
let interpolated: string = "Hello, ${name}!";
```

## Arrays

```rs
let arr: int[] = [1, 2, 3];
let first: int = arr[0];
```

## Structs

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

## Enums

```rs
enum Name {
    Variant1,
    Variant2,
    Variant3,
}

let val: Name = Name::Variant1;
```

## Lambdas

```rs
let f = (x: int) => x * 2;
let g = (x: int) => {
    // multi-line body
    return x * 2;
};
```

## Selectors

```rs
@a                          // all players
@e                          // all entities
@p                          // nearest player
@s                          // self
@r                          // random player
@a[tag=x, distance=..10]   // with arguments
```

## NBT Literals

```rs
1b          // byte
100s        // short
1000L       // long
1.5f        // float
3.14d       // double
42          // int

{key: value}                    // compound
[1, 2, 3]                      // list
[B; 1b, 0b]                    // byte array
[I; 1, 2, 3]                   // int array
[L; 100L, 200L]                // long array
```

## foreach

```rs
// Run code as each entity matching the selector
foreach (z in @e[type=zombie]) {
    kill(z);  // z becomes @s in the compiled function
}

foreach (player in @a) {
    give(player, "minecraft:diamond", 1);
}
```

Compiles to:
```mcfunction
execute as @e[type=minecraft:zombie] run function ns:fn/foreach_0
```
