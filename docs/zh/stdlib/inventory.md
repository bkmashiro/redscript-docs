# Inventory

> 本文档由 `src/stdlib/inventory.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [clear_inventory](#clear-inventory)
- [give_kit_warrior](#give-kit-warrior)
- [give_kit_archer](#give-kit-archer)
- [give_kit_mage](#give-kit-mage)
- [remove_item](#remove-item)

---

## `clear_inventory`

清空目标选择器的全部背包内容

```redscript
fn clear_inventory(target: selector)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 要清空背包的玩家或实体选择器 |

---

## `give_kit_warrior`

给目标发放战士套装，包含铁甲、近战武器、盾牌和食物

```redscript
fn give_kit_warrior(target: selector)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 接收套装的玩家或实体选择器 |

---

## `give_kit_archer`

给目标发放弓箭手套装，包含弓箭、轻甲和食物

```redscript
fn give_kit_archer(target: selector)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 接收套装的玩家或实体选择器 |

---

## `give_kit_mage`

给目标发放法师套装，包含位移、消耗品和范围伤害道具

```redscript
fn give_kit_mage(target: selector)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 接收套装的玩家或实体选择器 |

---

## `remove_item`

从目标背包中移除指定物品的全部副本

```redscript
fn remove_item(target: selector, item: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 要移除物品的玩家或实体选择器 |
| `item` | 传给 `clear` 命令的物品参数，可包含 NBT |

---
