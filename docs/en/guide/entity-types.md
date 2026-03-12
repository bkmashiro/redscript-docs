# Entity Types <Badge type="tip" text="v1.2" />

RedScript provides a hierarchical entity type system for compile-time safety and better IDE support.

## Type Hierarchy

```
entity (base)
├── Player         ← @a, @p, @r
├── Mob
│   ├── HostileMob
│   │   ├── Zombie, Skeleton, Creeper, Spider, Enderman
│   └── PassiveMob
│       ├── Pig, Cow, Sheep, Chicken, Villager
├── ArmorStand
├── Item
└── Arrow
```

## Automatic Type Inference

### From Selectors

```mcrs
// @a returns Player type
foreach (p in @a) {
    give(p, "diamond", 1);    // ✅ Player has give()
    gamemode(p, "creative");  // ✅ Player has gamemode()
}

// @e returns generic entity
foreach (e in @e) {
    kill(e);                  // ✅ All entities have kill()
    give(e, "diamond", 1);    // ⚠️ Warning: give() is Player-only
}

// @e[type=X] infers specific type
foreach (z in @e[type=zombie]) {
    // z is typed as Zombie
    kill(z);
}
```

### Selector Type Reference

| Selector | Inferred Type |
|----------|--------------|
| `@a` | `Player` |
| `@p` | `Player` |
| `@r` | `Player` |
| `@e` | `entity` |
| `@e[type=zombie]` | `Zombie` |
| `@e[type=pig]` | `Pig` |
| `@s` | Context-dependent |

## Context-Aware @s

The `@s` (self) selector's type depends on the execution context:

```mcrs
@tick fn tick() {
    // @s is entity (unknown context)
}

foreach (p in @a) {
    // @s is Player (same as p)
    effect(@s, "speed", 10, 1);  // ✅
}

foreach (p in @a) {
    as @e[type=zombie] {
        // @s changed to Zombie
        kill(@s);
    }
    // @s back to Player
}
```

## Nested Contexts

Inner contexts shadow outer ones:

```mcrs
foreach (p in @a) {
    // @s: Player
    
    as @e[type=armor_stand] {
        // @s: ArmorStand
        
        as @e[type=zombie] {
            // @s: Zombie
        }
        
        // @s: ArmorStand (restored)
    }
    
    // @s: Player (restored)
}
```

## Best Practices

### Use Specific Selectors

```mcrs
// ❌ Less safe
foreach (e in @e) {
    give(e, "diamond", 1);  // May fail on non-players
}

// ✅ Type-safe
foreach (p in @a) {
    give(p, "diamond", 1);  // Guaranteed Player
}
```

### Use Type Filters

```mcrs
// ❌ Generic entity
foreach (e in @e) {
    // Can't use mob-specific methods
}

// ✅ Specific type inferred
foreach (z in @e[type=zombie]) {
    // z is Zombie - can use Mob methods
}
```

## Coming Soon

- `is` type narrowing: `if (e is Player) { ... }`
- Explicit type assertions: `e as Zombie`
- Custom entity types with tags
