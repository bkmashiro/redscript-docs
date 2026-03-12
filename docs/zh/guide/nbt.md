# NBT 数据

NBT（命名二进制标签）是 Minecraft 的数据格式。RedScript 提供类型化的 NBT 字面量和结构化 NBT，用于 `give` 和 `summon` 等命令。

## NBT 类型后缀

使用后缀指定精确的 NBT 类型：

| 后缀 | NBT 类型 | 示例 |
|------|----------|------|
| `b` | Byte | `1b`、`0b` |
| `s` | Short | `100s` |
| `L` | Long | `1000L` |
| `f` | Float | `1.5f` |
| `d` | Double | `3.14d` |
| （无） | Int | `42` |

```rs
let damage: nbt = 20s;
let health: nbt = 100f;
let id: nbt = 999999L;
```

## NBT 复合标签

使用花括号表示复合 NBT：

```rs
let sword_nbt = {
    Damage: 0s,
    Enchantments: [{id: "sharpness", lvl: 5s}],
    display: {Name: '"Super Sword"'},
};
```

## NBT 与 give

将 NBT 数据传递给 `give` 命令：

```rs
give(@a, "diamond_sword", 1, {
    Enchantments: [{id: "sharpness", lvl: 5s}],
    display: {Name: '"Excalibur"'},
    Unbreakable: 1b,
});
```

## NBT 与 summon

为召唤的实体添加 NBT：

```rs
summon("zombie", ~0, ~0, ~0, {
    CustomName: '"Boss Zombie"',
    Health: 100f,
    Attributes: [{
        Name: "generic.max_health",
        Base: 100d,
    }],
    HandItems: [{id: "iron_sword", Count: 1b}, {}],
    ArmorItems: [{}, {}, {id: "diamond_chestplate", Count: 1b}, {}],
});
```

## NBT 数组

NBT 支持类型化数组：

```rs
// 字节数组
let flags: nbt = [B; 1b, 0b, 1b, 1b];

// 整数数组
let ids: nbt = [I; 1, 2, 3, 4];

// 长整数数组
let uuids: nbt = [L; 100L, 200L];
```

## NBT 变量

存储 NBT 以复用：

```rs
let potion_effects = {
    CustomPotionEffects: [
        {Id: 1b, Amplifier: 2b, Duration: 200},
        {Id: 3b, Amplifier: 1b, Duration: 600},
    ],
};

give(@a, "potion", 1, potion_effects);
```

## 合并 NBT

使用 `data_merge` 更新实体 NBT：

```rs
fn make_invisible(target: selector) {
    data_merge(target, {
        Invisible: 1b,
        Silent: 1b,
    });
}
```

## 实际示例

自定义物品商店：

```rs
fn give_shop_item(player: selector, item: string, nbt_data: nbt) {
    give(player, item, 1, nbt_data);
    playsound(player, "entity.experience_orb.pickup");
}

@on_trigger("buy_sword")
fn buy_sword() {
    give_shop_item(@s, "diamond_sword", {
        Enchantments: [{id: "sharpness", lvl: 3s}],
        display: {Name: '"Shop Sword"', Lore: ['"Bought from the shop"']},
    });
}
```

## 下一步

- [选择器](/zh/guide/selectors) — 精确定位实体
- [语法参考](/zh/reference/syntax) — 完整语法细节
