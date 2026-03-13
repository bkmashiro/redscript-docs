# Selectors

Selectors target entities in the Minecraft world. RedScript uses the same selector syntax as vanilla Minecraft, fully integrated into the type system.

## Base Selectors

| Selector | Target |
|----------|--------|
| `@a` | All players |
| `@e` | All entities |
| `@p` | Nearest player |
| `@s` | Executing entity (self) |
| `@r` | Random player |

```rs
say_to(@a, "Hello everyone!");
say_to(@p, "Hello nearest player!");
kill(@e[type=zombie]);
```

## Selector Arguments

Filter targets with arguments in brackets:

```rs
// By tag
effect(@a[tag=vip], "glowing", 10, 1);

// By type
kill(@e[type=zombie]);

// By distance
give(@a[distance=..10], "diamond", 1);

// By game mode
tp(@a[gamemode=survival], 0, 100, 0);

// By name
tp(@a[name=Alex], 0, 100, 0);
```

## Multiple Arguments

Combine arguments with commas:

```rs
// All survival players within 10 blocks with tag "playing"
effect(@a[gamemode=survival, distance=..10, tag=playing], "speed", 5, 1);

// All zombies within 20 blocks
kill(@e[type=zombie, distance=..20]);
```

## Distance Ranges

```rs
@a[distance=..10]      // within 10 blocks
@a[distance=5..]       // 5+ blocks away
@a[distance=5..10]     // between 5 and 10 blocks
```

## Score-Based Selection

Select by scoreboard values:

```rs
// Players with kills >= 10
give(@a[scores={kills=10..}], "gold_ingot", 1);

// Players with health between 1 and 5
effect(@a[scores={health=1..5}], "regeneration", 5, 2);
```

## Limit and Sort

```rs
// Top 3 players by score
@a[sort=arbitrary, limit=3]

// Nearest 5 entities
@e[sort=nearest, limit=5]

// Random player
@a[sort=random, limit=1]
```

## Rotation Filters

Check where players are looking:

```rs
// Looking up (pitch < -45)
foreach (p in @a[x_rotation=-90..-45]) {
    say("Looking at the sky!");
}

// Looking down (pitch > 45)
foreach (p in @a[x_rotation=45..90]) {
    say("Looking at the ground!");
}

// Facing north (yaw around 180)
foreach (p in @a[y_rotation=135..225]) {
    say("Facing north!");
}
```

## Position Filters

Select by coordinates:

```rs
// Players in a specific area
foreach (p in @a[x=-10..10, y=60..70, z=-10..10]) {
    effect(@s, "glowing", 1, 0);
}
```

## Variable Selector Syntax <Badge type="tip" text="v1.1.0" />

Inside `foreach` loops, you can use the loop variable with filters:

```rs
foreach (p in @a) {
    // p[filters] is automatically converted to @s[filters]
    execute if entity p[x_rotation=-90..-45] run {
        tag_add(@s, "looking_up");
    }
    execute unless entity p[x_rotation=-90..-45] run {
        tag_remove(@s, "looking_up");
    }
}
```

This is syntactic sugar — `p[x_rotation=-90..-45]` compiles to `@s[x_rotation=-90..-45]`.

## Entity Type Syntax

In selectors, entity types are auto-qualified to `minecraft:` if no namespace is given:

```rs
// These are equivalent (bare name auto-qualifies):
kill(@e[type=zombie]);              // Warning: auto-qualifying to minecraft:zombie
kill(@e[type=minecraft:zombie]);    // Explicit namespace

// For custom/modded entities, use full namespace:
kill(@e[type=modname:custom_mob]);
```

For items in function arguments, use strings:

```rs
give(@a, "minecraft:diamond_sword", 1);
```

## Selectors as Parameters

Pass selectors to functions:

```rs
fn buff(targets: selector) {
    effect(targets, "strength", 30, 1);
    effect(targets, "speed", 30, 1);
    effect(targets, "resistance", 30, 1);
}

buff(@a[tag=team_red]);
buff(@a[tag=team_blue]);
```

## Practical Example

Arena mini-game with selector-based logic:

```rs
let arena_center_x: int = 0;
let arena_center_z: int = 0;

@tick(rate=20)
fn arena_check() {
    // Heal players inside the arena
    effect(@a[tag=playing, distance=..50], "regeneration", 2, 0);

    // Damage players outside the arena
    effect(@a[tag=playing, distance=50..], "wither", 2, 0);

    // Remove dead mobs
    kill(@e[type=zombie, nbt={Health:0f}]);
}
```

## Next Steps

- [Your First Datapack](/en/guide/first-datapack) — Build a complete project
- [Built-in Functions](/en/reference/builtins) — All available functions
