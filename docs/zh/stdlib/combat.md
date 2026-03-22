# Combat

> 本文档由 `src/stdlib/combat.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [weapon_damage](#weapon-damage)
- [take_damage](#take-damage)
- [is_dead](#is-dead)

---

## `weapon_damage` <Badge type="info" text="Since v1.0.0" />

计算武器基础伤害加上加成的总伤害

```redscript
fn weapon_damage(base: int, bonus: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `base` | 武器基础伤害值 |
| `bonus` | 额外伤害修饰（如附魔或增益） |

**返回：** base + bonus

**示例**

```redscript
let dmg: int = weapon_damage(10, 5)  // result: 15
```

---

## `take_damage` <Badge type="info" text="Since v1.0.0" />

对生命值应用伤害，结果最低为 0

```redscript
fn take_damage(health: int, amount: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `health` | 当前生命值（如来自计分板） |
| `amount` | 要扣减的伤害量 |

**返回：** health - amount，最低为 0；调用后用 scoreboard_set 写回

**示例**

```redscript
let new_hp: int = take_damage(current_hp, 8)
scoreboard_set(@p, #health, new_hp)
```

---

## `is_dead` <Badge type="info" text="Since v1.0.0" />

判断实体是否已死亡（生命值 <= 0）

```redscript
fn is_dead(health: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `health` | 要判断的当前生命值 |

**返回：** 若 health <= 0 则返回 1（已死亡），否则返回 0（存活）

**示例**

```redscript
if (is_dead(current_hp) == 1) {
    // trigger death logic
}
```

---
