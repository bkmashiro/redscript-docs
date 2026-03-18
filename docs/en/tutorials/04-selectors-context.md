# Tutorial 04: Selectors & Execute Context

**Difficulty:** Beginner  
**Time:** ~20 minutes  
**Prerequisites:** [Tutorial 03: Functions & Structs](./03-functions-structs)

## What You'll Build

A proximity detector that checks every second whether players are within 10 blocks of the world origin. Players entering the zone get a speed boost and glowing effect; leaving removes them.

## What You'll Learn

- Selector types: `@s`, `@p`, `@a`, `@e`
- Selector filters: `[distance=..10]`, `[type=...]`, `[tag=...]`
- `foreach` to iterate over matching entities
- `tag_add` / `tag_remove` for stateful entity tracking
- Calling functions with `selector` parameters

## Step 1: Selector Basics

RedScript supports all vanilla MC selectors:

| Selector | Meaning |
|----------|---------|
| `@s` | The currently executing entity (function caller) |
| `@p` | Nearest player to the executor |
| `@a` | All players |
| `@e` | All entities |
| `@a[distance=..10]` | All players within 10 blocks |
| `@e[type=minecraft:zombie]` | All zombies |
| `@a[tag=vip]` | All players with the `vip` tag |

```rs
// Private message to triggering player only
tell(@s, "You triggered this!")

// Broadcast to everyone
tell(@a, "Hello, world!")

// Give to nearest player
give(@p, "minecraft:apple", 1)
```

## Step 2: foreach Loops

`foreach` iterates over every entity matching a selector. Inside the body, `@s` is each matched entity:

```rs
// Give all players a diamond
foreach (p in @a) {
    give(p, "minecraft:diamond", 1)
    tell(p, "You got a diamond!")
}
```

## Step 3: The Zone Detector

```rs
import effects::*

@tick(rate=20)
fn check_zone() {
    // Players within 10 blocks of the executor
    foreach (p in @a[distance=..10]) {
        let was_in_zone: int = scoreboard_get(p, "in_zone")
        if (was_in_zone == 0) {
            // Just entered
            scoreboard_set(p, "in_zone", 1)
            on_player_enter(p)
        }
        refresh_zone_effects(p)
    }

    // Players beyond 10 blocks who were previously in-zone
    foreach (p in @a[distance=10..]) {
        let was_in_zone: int = scoreboard_get(p, "in_zone")
        if (was_in_zone == 1) {
            scoreboard_set(p, "in_zone", 0)
            on_player_leave(p)
        }
    }
}
```

## Step 4: Entry and Exit Handlers

```rs
fn on_player_enter(p: selector) {
    tell(p, "You entered the magic zone!")
    title(p, "Zone Entered")
    subtitle(p, "You have the blessing")
}

fn on_player_leave(p: selector) {
    tell(p, "You left the magic zone.")
    effect_clear(p)
}

fn refresh_zone_effects(p: selector) {
    speed(p, 2, 1)    // speed II for 2 seconds
    glow(p, 2)        // glowing for 2 seconds
}
```

Notice `p: selector` — you can pass selectors as function arguments.

## Step 5: Tag-Based Selection

Tags let you mark individual entities and select them later:

```rs
@on_trigger("mark_vip")
fn mark_vip() {
    tag_add(@s, "vip")
    tell(@s, "You are now VIP!")
}

@on_trigger("give_vip_buff")
fn give_vip_buff() {
    // Only VIP-tagged players
    foreach (vip in @a[tag=vip]) {
        regen(vip, 30, 1)
        tell(vip, "VIP buff granted!")
    }
}
```

## Step 6: Entity Type Filters

```rs
@on_trigger("sweep_entities")
fn sweep_entities() {
    // Only zombies within 20 blocks
    foreach (zombie in @e[type=minecraft:zombie, distance=..20]) {
        tag_add(zombie, "detected")
    }
    announce("Sweep complete!")
}
```

## Complete Code

Full example: [tutorial_04_selectors.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_04_selectors.mcrs)

## Try It Out

1. Install and `/reload`
2. Stand near (0, ?, 0) — you enter the zone, get speed and glow
3. Walk away — effects clear
4. Run `/trigger mark_vip` then `/trigger give_vip_buff`
5. Run `/trigger sweep_entities` near some zombies

## Selector Filter Cheat Sheet

```rs
@a[distance=..10]           // within 10 blocks
@a[distance=10..]           // beyond 10 blocks
@e[type=minecraft:zombie]   // zombies only
@a[tag=vip]                 // entities with tag "vip"
@e[type=minecraft:zombie, distance=..5]  // zombies within 5 blocks
```

## Next Steps

→ [Tutorial 05: Decorators & Scheduling](./05-decorators)
