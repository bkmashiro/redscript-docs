# `combat` — Damage and health helpers

Import: `import combat;`

Simple RPG-style combat utilities built on scoreboard patterns. Manages health values stored in a `#health` scoreboard objective.

## Functions

### `weapon_damage(base: int, bonus: int): int`

Calculate total weapon damage as `base + bonus`.

**Example:**
```rs
import combat;
let dmg: int = weapon_damage(10, 5);  // 15
```

---

### `enemy_health(name: string): int`

Read the health scoreboard value for the named entity.

**Example:**
```rs
import combat;
let hp: int = enemy_health("boss");
```

---

### `take_damage(health: int, amount: int): int`

Subtract `amount` from `health` and return the new health value, clamped to a minimum of 0.

**Example:**
```rs
import combat;
let hp: int = 100;
hp = take_damage(hp, 25);  // 75
hp = take_damage(hp, 80);  // 0 (clamped)
```

---

### `is_dead(health: int): int`

Returns `1` if `health` is 0 or below, `0` otherwise.

**Example:**
```rs
import combat;
let hp: int = take_damage(10, 15);  // 0
if (is_dead(hp) == 1) {
    say("entity is dead");
}
```

---

## Full example

```rs
import combat;

let STATE_ALIVE: int = 0;
let STATE_DEAD:  int = 1;

fn on_hit(amount: int) {
    let hp: int = enemy_health("boss");
    hp = take_damage(hp, amount);

    if (is_dead(hp) == 1) {
        say("Boss defeated!");
    }
}
```
