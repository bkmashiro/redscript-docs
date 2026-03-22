# Expr

> 本文档由 `src/stdlib/expr.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [expr_eval](#expr-eval)

---

## `expr_eval` <Badge type="info" text="v1.2.0" />

求值 RPN（逆波兰表达式）令牌流，支持单变量替换。正整数为字面量，-10000 为变量 x，-1~-8 为运算符。栈深度 16。

```redscript
fn expr_eval(tokens: int[], n: int, x: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `tokens` | 长度为 n 的 RPN 令牌数组 |
| `n` | 令牌数量 |
| `x` | 替换令牌 -10000 的变量值 ×10000 |

**返回：** 求值后栈顶值 ×10000

**示例**

```redscript
// 2*x + 1  →  RPN: [20000, -10000, -3, 10000, -1]
let prog: int[] = [20000, -10000, -3, 10000, -1];
expr_eval(prog, 5, 15000); // 40000  (2×1.5 + 1 = 4.0)
```

---
