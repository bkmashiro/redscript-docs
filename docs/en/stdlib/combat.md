# Combat

> Auto-generated from `src/stdlib/combat.mcrs` — do not edit manually.

## API

- [weapon_damage](#weapon-damage)
- [take_damage](#take-damage)
- [is_dead](#is-dead)

---

## `weapon_damage`

**Since:** 1.0.0

Calculate total weapon damage from a base value plus a bonus.

```redscript
fn weapon_damage(base: int, bonus: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `base` | Base weapon damage value |
| `bonus` | Additional damage modifier (e.g. from enchantments or buffs) |

**Returns:** base + bonus

**Example**

```redscript
let dmg: int = weapon_damage(10, 5)  // result: 15
```

---

## `take_damage`

**Since:** 1.0.0

Apply damage to a health value, clamping the result to a minimum of 0.

```redscript
fn take_damage(health: int, amount: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `health` | Current health value (e.g. from scoreboard) |
| `amount` | Damage amount to subtract |

**Returns:** health - amount, clamped to 0; use scoreboard_set after calling

**Example**

```redscript
let new_hp: int = take_damage(current_hp, 8)
scoreboard_set(@p, #health, new_hp)
```

---

## `is_dead`

**Since:** 1.0.0

Check whether an entity is dead (health at or below zero).

```redscript
fn is_dead(health: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `health` | Current health value to test |

**Returns:** 1 if health <= 0 (dead), 0 otherwise (alive)

**Example**

```redscript
if (is_dead(current_hp) == 1) {
    // trigger death logic
}
```

---
