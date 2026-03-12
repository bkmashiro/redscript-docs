# NBT Data

NBT (Named Binary Tag) is Minecraft's data format. RedScript provides typed NBT literals and structured NBT for commands like `give` and `summon`.

## NBT Type Suffixes

Use suffixes to specify the exact NBT type:

| Suffix | NBT Type | Example |
|--------|----------|---------|
| `b` | Byte | `1b`, `0b` |
| `s` | Short | `100s` |
| `L` | Long | `1000L` |
| `f` | Float | `1.5f` |
| `d` | Double | `3.14d` |
| (none) | Int | `42` |

```rs
let damage: nbt = 20s;
let health: nbt = 100f;
let id: nbt = 999999L;
```

## NBT Compounds

Use curly braces for compound NBT:

```rs
let sword_nbt = {
    Damage: 0s,
    Enchantments: [{id: "sharpness", lvl: 5s}],
    display: {Name: '"Super Sword"'},
};
```

## NBT with give

Pass NBT data to the `give` command:

```rs
give(@a, "diamond_sword", 1, {
    Enchantments: [{id: "sharpness", lvl: 5s}],
    display: {Name: '"Excalibur"'},
    Unbreakable: 1b,
});
```

## NBT with summon

Add NBT to summoned entities:

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

## NBT Arrays

NBT supports typed arrays:

```rs
// Byte array
let flags: nbt = [B; 1b, 0b, 1b, 1b];

// Int array
let ids: nbt = [I; 1, 2, 3, 4];

// Long array
let uuids: nbt = [L; 100L, 200L];
```

## NBT in Variables

Store NBT for reuse:

```rs
let potion_effects = {
    CustomPotionEffects: [
        {Id: 1b, Amplifier: 2b, Duration: 200},
        {Id: 3b, Amplifier: 1b, Duration: 600},
    ],
};

give(@a, "potion", 1, potion_effects);
```

## Merging NBT

Use `data_merge` to update entity NBT:

```rs
fn make_invisible(target: selector) {
    data_merge(target, {
        Invisible: 1b,
        Silent: 1b,
    });
}
```

## Practical Example

Custom item shop:

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

## Next Steps

- [Selectors](/en/guide/selectors) — Target entities precisely
- [Syntax Reference](/en/reference/syntax) — Full syntax details
