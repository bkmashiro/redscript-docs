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
| `int` | Integer (scoreboard, 32-bit signed) | `42` |
| `fixed` | Fixed-point ×10000 (renamed from `float` in v2.5.0) | `10000` (= 1.0) |
| `double` | IEEE 754 double, NBT-backed (new in v2.5.0) | `x as double` |
| `string` | Text | `"hello"` |
| `bool` | Boolean | `true`, `false` |
| `int[]` | Array of int | `[1, 2, 3]` |
| `string[]` | Array of string | `["a", "b"]` |
| `selector` | Entity selector | `@a`, `@e[type=zombie]` |
| `nbt` | NBT data | `{Health: 20f}` |

> **v2.5.0:** `float` is deprecated and renamed to `fixed`. Use `x as fixed` / `x as double` for explicit numeric conversions — implicit coercion is no longer allowed. The compiler will warn on `float` arithmetic used without `mulfix`.

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
| `@on_trigger("name")` | Run when player activates trigger |
| `@on_death` | Run on entity death |
| `@on_login` | Run when player joins server |
| `@on_advancement("id")` | Run when player earns advancement |
| `@on_craft("item")` | Run when player crafts item |
| `@on_join_team("team")` | Run when player joins a team |
| `@on(EventType)` | Run on static event (PlayerDeath, PlayerJoin, BlockBreak, EntityKill, ItemUse) |
| `@keep` | Prevent DCE from removing the function |

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

Match supports both enum patterns and integer range patterns:

```rs
// Enum patterns
match value {
    Pattern::A => { },
    Pattern::B => { },
    _ => { },
}

// Integer range patterns
let score: int = scoreboard_get(@s, #points);
match score {
    90..100 => { say("A grade"); },
    80..89  => { say("B grade"); },
    70..79  => { say("C grade"); },
    _       => { say("Below C"); },
}
```

Range patterns use `min..max` (inclusive on both ends).

### repeat

```rs
repeat(count) {
    // body runs count times
}
```

### for i in range

Iterate over an integer range. The upper bound can be a literal **or a variable**:

```rs
for i in 0..10 {
    say("${i}");   // 0 through 9
}

let count: int = get_score(@s, #rounds);
for i in 0..count {
    // runs 'count' times
}
```

The range is exclusive on the upper end (`0..n` → 0, 1, …, n-1).

### break / continue

`break` exits the innermost loop early. `continue` skips to the next iteration:

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

Both `break` and `continue` work in `while`, `foreach`, and `for i in range` loops.

### execute

The `execute` statement maps directly to Minecraft's `execute` command with a typed body block:

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
    // commands that produce a result
}
```

**Supported subcommands:**

| Subcommand | Description |
|------------|-------------|
| `as <selector>` | Change executor |
| `at <selector>` | Change position/rotation to entity |
| `positioned <x> <y> <z>` | Set execution position |
| `positioned as <selector>` | Set position to entity |
| `rotated <yaw> <pitch>` | Override rotation |
| `rotated as <selector>` | Copy entity rotation |
| `facing <x> <y> <z>` | Face a position |
| `facing entity <selector>` | Face an entity |
| `anchored eyes\|feet` | Set coordinate anchor |
| `align <axes>` | Align to block grid |
| `in <dimension>` | Change dimension |
| `on <relation>` | Navigate entity relations |
| `if block <x> <y> <z> <block>` | Condition on block type |
| `if score <target> <obj> matches <range>` | Condition on score |
| `unless block ...` | Negated block condition |
| `unless score ...` | Negated score condition |
| `store result score <target> <obj>` | Store result in score |
| `store success score <target> <obj>` | Store success flag |

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

### Execute Context Modifiers

You can attach execute context modifiers directly to a `foreach` loop to control where and how the body runs. Modifiers are appended after the selector, before the block, and can be stacked in any order.

```rs
// Execute at each player's position
foreach (p in @a) at @s {
    // body runs at each player's coordinates
}

// Execute 2 blocks above each zombie
foreach (z in @e[type=zombie]) at @s positioned ~ ~2 ~ {
    // body runs 2 blocks above each zombie
}

// Execute at each player's position, facing the nearest zombie
foreach (p in @a) at @s rotated ~ 0 facing entity @e[type=zombie,limit=1,sort=nearest] {
    // body runs at player position, rotated to face nearest zombie
}
```

#### Supported Modifiers

| Modifier | Description |
|----------|-------------|
| `at @s` | Execute at the iterated entity's position and rotation |
| `positioned <x> <y> <z>` | Offset the execution position (supports relative `~` and local `^` coordinates) |
| `rotated <yaw> <pitch>` | Override the execution rotation (degrees; `~` keeps current axis) |
| `facing entity <selector>` | Rotate execution to face the matched entity |
| `facing <x> <y> <z>` | Rotate execution to face a fixed position |
| `anchored eyes\|feet` | Set the anchor point for `^`-relative coordinates |
| `align <axes>` | Align position to the block grid on the specified axes (e.g., `xyz`, `xz`) |

Modifiers compile directly to `execute` sub-commands in the generated `.mcfunction` file. For example:

```mcfunction
# foreach (p in @a) at @s positioned ~ ~2 ~
execute as @a at @s positioned ~ ~2 ~ run function ns:fn/foreach_1
```

## Dead Code Elimination (DCE)

RedScript's optimizer automatically removes unreachable functions from the compiled output.

**Visibility rules:**

- Functions **not** starting with `_` are **public** — always emitted (callable via `/function namespace:name`)
- Functions starting with `_` are **private** — only kept if called from reachable code
- Decorated functions (`@tick`, `@load`, `@on_*`, `@on`, `@keep`) are always kept

```rs
fn public_fn() { }       // public, always emitted

fn _helper() { }         // private, removed if not called

@keep
fn _kept_helper() { }    // private name, but @keep forces retention
```

This means you can write private utility functions freely — if they're never called, they won't bloat your datapack.
