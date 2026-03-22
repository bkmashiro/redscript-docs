# Player

> 本文档由 `src/stdlib/player.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [heal](#heal)
- [damage](#damage)
- [is_op](#is-op)

---

## `heal`

**版本：** 1.0.0

通过给

```redscript
fn heal(amount: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `amount` | 要恢复的生命值点数（正整数） |

**返回：** void — 修改 @p 的

**示例**

```redscript
heal(10)  // restore 10 HP to nearest player
```

---

## `damage`

**版本：** 1.0.0

对最近的玩家造成伤害，生命值最低降至 0

```redscript
fn damage(amount: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `amount` | 造成的伤害点数（正整数） |

**返回：** void — 修改 @p 的

**示例**

```redscript
damage(5)  // deal 5 damage to nearest player
```

---

## `is_op`

**版本：** 1.0.0

检查最近的玩家是否拥有 op 实体标签（管理员权限）

```redscript
fn is_op() -> int
```

**返回：** 若 @p 有 op 标签则返回 1，否则返回 0

**示例**

```redscript
let admin: int = is_op()
// if (admin == 1) { ... }
```

---
