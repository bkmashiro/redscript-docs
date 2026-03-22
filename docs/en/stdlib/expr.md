# Expr

> Auto-generated from `src/stdlib/expr.mcrs` — do not edit manually.

## API

- [expr_eval](#expr-eval)

---

## `expr_eval` <Badge type="info" text="v1.2.0" />

Evaluate an RPN (Reverse Polish Notation) token stream with a single variable substitution.

Token encoding (all values × 10000):
- Positive integer: literal value pushed onto the stack
- `-10000`: variable `x` (replaced by the `x` argument)
- `-1` ADD, `-2` SUB, `-3` MUL (fixed-point), `-4` DIV (fixed-point)
- `-5` SIN (degrees × 10000 → result × 10000), `-6` COS, `-7` SQRT, `-8` ABS

Internal stack depth: 16 elements. Behaviour is undefined for malformed token streams.

```redscript
fn expr_eval(tokens: int[], n: int, x: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `tokens` | RPN token array of length n |
| `n` | Number of tokens |
| `x` | Variable value × 10000 substituted for token `-10000` |

**Returns:** Top-of-stack value × 10000 after evaluating all tokens

**Example**

```redscript
// 2*x + 1  →  RPN: [20000, -10000, -3, 10000, -1]
let prog: int[] = [20000, -10000, -3, 10000, -1];
expr_eval(prog, 5, 15000); // 40000  (2×1.5 + 1 = 4.0)
```

---
