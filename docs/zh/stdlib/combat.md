# `combat` — 伤害与生命值辅助

Import: `import combat;`

基于记分板模式构建的简单 RPG 风格战斗工具。使用 `#health` 记分板目标管理生命值。

## Functions

### `weapon_damage(base: int, bonus: int): int`

计算武器总伤害 `base + bonus`。

**示例：**
```rs
import combat;
let dmg: int = weapon_damage(10, 5);  // 15
```

---

### `enemy_health(name: string): int`

读取指定实体的 `#health` 记分板值。

**示例：**
```rs
import combat;
let hp: int = enemy_health("boss");
```

---

### `take_damage(health: int, amount: int): int`

从 `health` 中扣除 `amount` 伤害，返回新的生命值，最低为 0（不会变为负数）。

**示例：**
```rs
import combat;
let hp: int = 100;
hp = take_damage(hp, 25);  // 75
hp = take_damage(hp, 80);  // 0（已钳制）
```

---

### `is_dead(health: int): int`

若 `health` 为 0 或以下则返回 `1`，否则返回 `0`。

**示例：**
```rs
import combat;
let hp: int = take_damage(10, 15);  // 0
if (is_dead(hp) == 1) {
    say("实体已死亡");
}
```

---

## 完整示例

```rs
import combat;

fn on_hit(amount: int) {
    let hp: int = enemy_health("boss");
    hp = take_damage(hp, amount);

    if (is_dead(hp) == 1) {
        say("Boss 已被击败！");
    }
}
```
