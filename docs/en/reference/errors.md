# Error Messages Guide

This guide covers the most common errors you'll encounter when compiling RedScript. For each error you'll find the cause, a code example that triggers it, and how to fix it.

---

## TypeError: Type Mismatch (int vs fixed/double)

**Category:** `TypeError`

### Cause

RedScript has no implicit numeric coercions. Mixing `int` and `fixed` (or `int` and `double`) in arithmetic or assignment without an explicit cast is a compile-time error.

### Triggered by

```rs
let score: int = 100;
let bonus: fixed = 1.5;

// ❌ TypeError: Type mismatch: cannot implicitly convert fixed to int
//    (use an explicit cast: 'as int')
let total: int = score + bonus;
```

```rs
fn give_xp(amount: int) { /* ... */ }

let multiplied: fixed = 2.5;
// ❌ TypeError: Argument 1 of 'give_xp' expects int, got fixed
give_xp(multiplied);
```

### Fix

Cast explicitly using `as`:

```rs
let score: int = 100;
let bonus: fixed = 1.5;

// ✅ Cast score to fixed, then do fixed arithmetic
let total_fixed: fixed = score as fixed + bonus;
// ✅ If you need an int result, cast back
let total: int = total_fixed as int;
```

```rs
give_xp(multiplied as int);   // ✅ truncates fraction
```

**Cast semantics:**
- `x as fixed` — multiplies by 10000 (int → fixed)
- `x as int` — divides by 10000, truncating fraction (fixed → int)
- `x as double` — promotes to IEEE 754 double

---

## [StringConcat] String Concatenation with `+`

**Category:** `TypeError` (lint warning with tag `[StringConcat]`)

### Cause

RedScript does not support the `+` operator for string concatenation. The `+` operator is reserved for numeric addition. Attempting to concatenate strings with `+` produces this error.

### Triggered by

```rs
let name: string = "Steve";
let greeting: string = "Hello, " + name;
// ❌ [StringConcat] String concatenation with '+' is not supported.
//    Use f-strings instead: f"text{variable}"

let score: int = 42;
let msg: string = "Score: " + score;
// ❌ Same error
```

### Fix

Use an **f-string** (format string):

```rs
let name: string = "Steve";
let greeting = f"Hello, {name}";       // ✅

let score: int = 42;
tell(@s, f"Score: {score}");           // ✅ — pass directly to tell/say/subtitle
actionbar(@a, f"Level: {level}");      // ✅
```

> **Note:** F-strings can be passed to `tell`, `say`, `subtitle`, `title`, `actionbar`, and `announce`. They cannot be stored in a `string` variable — they are `format_string` typed and are consumed at the call site.

---

## [FloatArithmetic] Float Used in Arithmetic

**Category:** `TypeError` (lint warning with tag `[FloatArithmetic]`)

### Cause

`float` is a deprecated type from older versions of RedScript. It is a system-boundary type meant only for reading/writing MC NBT float values — not for arithmetic. Using `float` in arithmetic expressions generates this warning. The results are undefined.

### Triggered by

```rs
let x: float = 1.5;
let y: float = 2.0;
let z: float = x * y;
// ⚠ [FloatArithmetic] 'float' is a system boundary type (MC NBT);
//   use 'fixed' for arithmetic. Float arithmetic results are undefined.
```

```rs
fn compute(a: float): float {
    return a * 2.0;
// ⚠ [FloatArithmetic] 'float' is a system boundary type (MC NBT float);
//   use 'fixed' for arithmetic instead.
}
```

### Fix

Replace all uses of `float` with `fixed`. Use `mulfix()` from `stdlib/math` for multiplication:

```rs
import "stdlib/math"

let x: fixed = 1.5;
let y: fixed = 2.0;
let z: fixed = mulfix(x, y);   // ✅ = 3.0

fn compute(a: fixed): fixed {
    return mulfix(a, 2.0);     // ✅
}
```

---

## FunctionNotFound / Function Called with Wrong Arguments

**Category:** `TypeError`

### Cause

Calling a function that hasn't been declared in scope. Usually caused by:
1. Forgetting to `import` a stdlib module
2. Typo in the function name
3. Calling a function before it's declared (top-level order shouldn't matter, but `module library` functions require import)

### Triggered by

```rs
// ❌ mulfix is from stdlib/math — needs an import
let result: fixed = mulfix(1.5, 2.0);
// TypeError: (no explicit "FunctionNotFound" tag, but will fail to compile)
```

```rs
// ❌ Typo
let s: int = sin_Hp(450000);   // should be sin_hp
```

```rs
// ❌ Missing import for math_hp
import "stdlib/math"   // wrong module
let s: int = sin_hp(450000);   // sin_hp is in stdlib/math_hp
```

### Fix

Add the correct `import` statement at the top of your file:

```rs
import "stdlib/math"       // mulfix, divfix, abs_fixed, clamp_fixed, …
import "stdlib/math_hp"    // sin_hp, cos_hp, ln_hp, init_trig
import "stdlib/random"     // rand, rand_range
import "stdlib/list"       // list_sort, list_filter, …

let result: fixed = mulfix(1.5, 2.0);   // ✅
```

Check spelling carefully — function names are case-sensitive.

---

## Wrong Number of Arguments

**Category:** `TypeError`

### Cause

Calling a function with too many or too few arguments.

### Triggered by

```rs
fn greet(name: string, title: string) {
    say(f"Hello, {title} {name}!");
}

greet("Steve");
// ❌ TypeError: Function 'greet' expects 2 arguments, got 1
```

### Fix

```rs
greet("Steve", "Sir");   // ✅
```

For functions with default parameters, you can omit trailing arguments:

```rs
fn greet(name: string, title: string = "Player") {
    say(f"Hello, {title} {name}!");
}

greet("Steve");           // ✅ title defaults to "Player"
greet("Steve", "Sir");    // ✅ explicit title
```

---

## Return Type Mismatch

**Category:** `TypeError`

### Cause

The value returned from a function doesn't match the declared return type.

### Triggered by

```rs
fn get_ratio(): fixed {
    return 42;
    // ❌ Return type mismatch: cannot implicitly convert int to fixed
    //    (use an explicit cast: 'as fixed')
}
```

### Fix

```rs
fn get_ratio(): fixed {
    return 42 as fixed;   // ✅
}
```

---

## Assign to Const

**Category:** `TypeError`

### Cause

Attempting to reassign a value to a `const` variable.

### Triggered by

```rs
const MAX_PLAYERS: int = 8;
MAX_PLAYERS = 16;
// ❌ TypeError: Cannot assign to const 'MAX_PLAYERS'
```

### Fix

Use `let` if the variable needs to be mutable:

```rs
let max_players: int = 8;
max_players = 16;   // ✅
```

---

## setTimeout / setInterval Inside a Loop or Conditional

**Category:** `TypeError`

### Cause

`setTimeout` and `setInterval` allocate a scoreboard slot at compile time. They cannot be called inside a loop or conditional body where the allocation would be ambiguous.

### Triggered by

```rs
fn setup_timers(count: int) {
    for i in 0..count {
        setTimeout(20, fn() { say("tick"); });
        // ❌ setTimeout() cannot be called inside a loop.
        //    Declare timers at the top level.
    }
}
```

### Fix

Move timer declarations to the top level of a function (outside any loop or conditional):

```rs
fn setup_timers() {
    setTimeout(20, fn() { say("tick"); });   // ✅
}
```

---

## Quick Reference

| Error tag | Meaning | Quick fix |
|-----------|---------|-----------|
| `TypeError: cannot implicitly convert X to Y` | Mixed numeric types | Add `as Y` cast |
| `[StringConcat]` | Used `+` on strings | Use `f"...{var}..."` f-string |
| `[FloatArithmetic]` | Used deprecated `float` in math | Change to `fixed`, use `mulfix()` |
| `Function 'X' expects N arguments, got M` | Wrong arg count | Check function signature |
| `Return type mismatch` | Return type doesn't match declaration | Cast return value |
| `Cannot assign to const` | Reassigned a `const` | Use `let` instead |
| `setTimeout() cannot be called inside a loop` | Timer in loop/conditional | Move to top-level |
