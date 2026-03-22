# Inventory

> Auto-generated from `src/stdlib/inventory.mcrs` — do not edit manually.

## API

- [clear_inventory](#clear-inventory)
- [give_kit_warrior](#give-kit-warrior)
- [give_kit_archer](#give-kit-archer)
- [give_kit_mage](#give-kit-mage)
- [remove_item](#remove-item)

---

## `clear_inventory`

Clears all inventory slots from the target selector.

```redscript
fn clear_inventory(target: selector)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Player or entity selector whose inventory should be cleared |

---

## `give_kit_warrior`

Gives a melee-focused warrior kit to the target selector.
The kit includes iron armor, a sword, a shield, and food.

```redscript
fn give_kit_warrior(target: selector)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Player or entity selector receiving the kit |

---

## `give_kit_archer`

Gives a ranged archer kit to the target selector.
The kit includes a bow, arrows, light armor, and food.

```redscript
fn give_kit_archer(target: selector)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Player or entity selector receiving the kit |

---

## `give_kit_mage`

Gives a utility-heavy mage kit to the target selector.
The kit includes mobility, consumables, and splash damage items.

```redscript
fn give_kit_mage(target: selector)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Player or entity selector receiving the kit |

---

## `remove_item`

Removes all copies of a specific item from the target selector.

```redscript
fn remove_item(target: selector, item: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Player or entity selector whose inventory will be filtered |
| `item` | Item ID or item-with-NBT argument accepted by `clear` |

---
