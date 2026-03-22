# Player

> Auto-generated from `src/stdlib/player.mcrs` — do not edit manually.

## API

- [heal](#heal)
- [damage](#damage)
- [is_op](#is-op)

---

## `heal`

**Since:** 1.0.0

Heal the nearest player by adding `amount` to their #health scoreboard.

```redscript
fn heal(amount: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `amount` | Number of health points to restore (positive integer) |

**Returns:** void — modifies the #health scoreboard objective of @p

**Example**

```redscript
heal(10)  // restore 10 HP to nearest player
```

---

## `damage`

**Since:** 1.0.0

Deal damage to the nearest player, clamping health to a minimum of 0.

```redscript
fn damage(amount: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `amount` | Number of damage points to apply (positive integer) |

**Returns:** void — modifies the #health scoreboard objective of @p; will not go below 0

**Example**

```redscript
damage(5)  // deal 5 damage to nearest player
```

---

## `is_op`

**Since:** 1.0.0

Check whether the nearest player has the `op` tag (operator status).

```redscript
fn is_op() -> int
```

**Returns:** 1 if @p has the `op` entity tag, 0 otherwise

**Example**

```redscript
let admin: int = is_op()
// if (admin == 1) { ... }
```

---
