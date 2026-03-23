# Built-in Functions

Complete list of all built-in functions available in RedScript.

## Chat & Display

| Function | Description |
|----------|-------------|
| `say(message)` | Broadcast message to all players |
| `tell(target, message)` | Send a plain-text private message to target (whisper) |
| `tellraw(target, message)` | Send formatted message to target |
| `announce(message)` | Broadcast to all players (@a) |
| `raw(command)` | Emit a raw Minecraft command string verbatim |
| `title(target, text)` | Show title on screen |
| `subtitle(target, text)` | Show subtitle on screen |
| `actionbar(target, text)` | Show text in action bar |
| `title_times(target, fadeIn, stay, fadeOut)` | Set title display timing (ticks) |

```rs
say("Hello everyone!");
tell(@s, "Only you can see this.");
tell(@a[tag=vip], "Welcome back, VIP!");
tellraw(@a, "Welcome to the server!");
title(@p, "You Win!");
subtitle(@p, "Congratulations!");
actionbar(@a, "Score: ${score}");

// Emit a raw command when no typed builtin exists
raw("weather thunder 600");
raw("difficulty peaceful");
```

> **`tell` vs `say`:** `say` broadcasts to every player with a `[ServerName]` prefix; `tell` sends a private whisper to the specified selector only.

> **`raw`:** Escape hatch for commands not yet wrapped as builtins. The string is emitted as-is into the compiled `.mcfunction` file. Use sparingly — prefer typed builtins when available.

Chat and display builtins accept runtime f-strings in v1.2:

```rs
say(f"Welcome {player}!");
actionbar(@a, f"Score: {score}");
```

## Entity Management

| Function | Description |
|----------|-------------|
| `summon(entity, x, y, z)` | Summon entity at position |
| `summon(entity, x, y, z, nbt)` | Summon with NBT data |
| `kill(target)` | Kill entities |
| `tp(target, x, y, z)` | Teleport entities |
| `tp(target, destination)` | Teleport to entity |
| `tp_to(target, destination)` | Teleport target to another entity |
| `kick(target, reason)` | Kick player from server |

```rs
summon("zombie", ~0, ~5, ~0);
kill(@e[type=zombie]);
tp(@a, 0, 100, 0);
tp(@s, @p);
```

## Items

| Function | Description |
|----------|-------------|
| `give(target, item, count)` | Give item to target |
| `give(target, item, count, nbt)` | Give item with NBT |
| `clear(target)` | Clear all items |
| `clear(target, item)` | Clear specific item |
| `clear(target, item, count)` | Clear count of item |

```rs
give(@a, "diamond", 64);
give(@s, "diamond_sword", 1, {Enchantments: [{id: "sharpness", lvl: 5s}]});
clear(@a);
clear(@s, "dirt", 10);
```

## Effects

| Function | Description |
|----------|-------------|
| `effect(target, effect, duration, amplifier)` | Apply effect |
| `effect_clear(target)` | Clear all effects |
| `effect_clear(target, effect)` | Clear specific effect |

```rs
effect(@a, "speed", 30, 2);
effect(@s, "instant_health", 1, 1);
effect_clear(@a);
effect_clear(@s, "poison");
```

## Scoreboard

| Function | Description |
|----------|-------------|
| `scoreboard_add_objective(name, criteria)` | Create a new objective |
| `scoreboard_remove_objective(name)` | Remove an objective |
| `scoreboard_display(slot, objective)` | Display objective in a slot (`sidebar`, `list`, `belowname`) |
| `scoreboard_hide(slot)` | Hide the display for a slot |
| `scoreboard_set(target, objective, value)` | Set a player's score |
| `scoreboard_add(target, objective, value)` | Add to a player's score |
| `scoreboard_get(target, objective)` | Get a player's score (returns `int`) |
| `score(target, objective)` | Alias for `scoreboard_get` |

```rs
scoreboard_add_objective("kills", "playerKillCount");
scoreboard_display("sidebar", "kills");
scoreboard_set(@a, "kills", 0);
scoreboard_add(@s, "kills", 1);

let k: int = scoreboard_get(@s, "kills");
let k2: int = score(@s, #kills);  // #name syntax skips quotes
```

### Objective Name Syntax

Objective names can be written as quoted strings or using the `#name` syntax for bare identifiers:

```rs
scoreboard_set(@s, "kills", 0);       // string literal
scoreboard_set(@s, #kills, 0);        // bare identifier (no quotes)
```

### Namespace Prefixing

Scoreboard objectives are automatically prefixed with your datapack namespace during compilation.

For example, `scoreboard_add_objective("kills", "dummy")` in namespace `minigame` becomes an objective like `minigame_kills` in the generated datapack. This avoids collisions between packs that use the same short objective names.

## Teams

| Function | Description |
|----------|-------------|
| `team_add(name)` | Create team |
| `team_remove(name)` | Remove team |
| `team_join(name, target)` | Add to team |
| `team_leave(target)` | Remove from team |
| `team_modify(name, option, value)` | Modify team option |
| `team_option(name, option, value)` | Alias for team_modify |

```rs
team_add("red");
team_modify("red", "color", "red");
team_modify("red", "friendlyFire", "false");
team_join("red", @s);
```

## World

| Function | Description |
|----------|-------------|
| `setblock(x, y, z, block)` | Place a block |
| `fill(x1, y1, z1, x2, y2, z2, block)` | Fill area with block |
| `clone(x1, y1, z1, x2, y2, z2, dx, dy, dz)` | Clone blocks |
| `weather(type)` | Set weather |
| `time_set(value)` | Set time |
| `time_add(value)` | Add to current time |
| `difficulty(level)` | Set difficulty |
| `gamerule(rule, value)` | Set game rule |

```rs
setblock(0, 100, 0, "diamond_block");
fill(~-5, ~0, ~-5, ~5, ~3, ~5, "stone");
weather("clear");
time_set("day");
gamerule("doDaylightCycle", "false");
```

## Sound

| Function | Description |
|----------|-------------|
| `playsound(target, sound)` | Play sound |
| `playsound(target, sound, volume, pitch)` | Play with options |
| `stopsound(target)` | Stop all sounds |

```rs
playsound(@a, "entity.experience_orb.pickup");
playsound(@s, "block.note_block.pling", 1.0, 2.0);
stopsound(@a);
```

## Particles

| Function | Description |
|----------|-------------|
| `particle(name, x, y, z)` | Spawn particle |
| `particle(name, x, y, z, dx, dy, dz, speed, count)` | Spawn with options |

```rs
particle("flame", ~0, ~2, ~0);
particle("heart", ~0, ~2, ~0, 0.5, 0.5, 0.5, 0.1, 10);
```

## Tags

| Function | Description |
|----------|-------------|
| `tag_add(target, tag)` | Add tag |
| `tag_remove(target, tag)` | Remove tag |

```rs
tag_add(@s, "playing");
tag_remove(@s, "playing");
```

## XP

| Function | Description |
|----------|-------------|
| `xp_add(target, amount)` | Add XP points |
| `xp_add_levels(target, amount)` | Add XP levels |
| `xp_set(target, amount)` | Set XP points |

```rs
xp_add(@s, 100);
xp_add_levels(@s, 5);
xp_set(@a, 0);
```

## Data

| Function | Description |
|----------|-------------|
| `data_get(target, path)` | Get NBT data |
| `data_merge(target, nbt)` | Merge NBT data |
| `data_remove(target, path)` | Remove NBT path |

```rs
data_merge(@s, {Invisible: 1b});
data_remove(@s, "CustomName");
```

## Heap / Dynamic Allocation

`heap_new` allocates a named NBT storage slot at runtime and returns a handle (an `int` ID) that can be passed around and dereferenced later. This is the foundation for dynamic data structures in RedScript.

| Function | Description |
|----------|-------------|
| `heap_new(nbt)` | Allocate a new heap slot with initial NBT value; returns `int` handle |
| `heap_get(handle, path)` | Read a path from the heap slot identified by `handle` |
| `heap_set(handle, path, value)` | Write a value to a path in the heap slot |
| `heap_free(handle)` | Release a heap slot (mark it reusable) |

```rs
// Allocate a compound on the heap
let h: int = heap_new({hp: 20, name: "boss"});

// Read from the slot
let hp: int = heap_get(h, "hp");      // 20

// Write a new value
heap_set(h, "hp", 15);

// Free when done
heap_free(h);
```

> **Implementation note:** `heap_new` stores data in Minecraft's `storage` NBT under the datapack namespace. Each handle is a numeric ID tracked in a scoreboard. Do not use handles after calling `heap_free` — behaviour is undefined.

## Bossbar

| Function | Description |
|----------|-------------|
| `bossbar_add(id, name)` | Create a new bossbar |
| `bossbar_remove(id)` | Remove a bossbar |
| `bossbar_set_value(id, value)` | Set current value |
| `bossbar_set_max(id, max)` | Set max value |
| `bossbar_set_color(id, color)` | Set color (blue/green/pink/purple/red/white/yellow) |
| `bossbar_set_style(id, style)` | Set style (progress/notched_6/10/12/20) |
| `bossbar_set_visible(id, visible)` | Show/hide bossbar |
| `bossbar_set_players(id, target)` | Set who can see the bossbar |
| `bossbar_get_value(id)` | Get current value |

```rs
bossbar_add("boss_hp", "Boss Health");
bossbar_set_max("boss_hp", 100);
bossbar_set_value("boss_hp", 75);
bossbar_set_color("boss_hp", "red");
bossbar_set_players("boss_hp", @a);
bossbar_set_visible("boss_hp", true);
```

## Sets

Runtime set data structure for efficient membership testing.

| Function | Description |
|----------|-------------|
| `set_new(name)` | Create a new named set |
| `set_add(name, value)` | Add value to set |
| `set_contains(name, value)` | Check if set contains value |
| `set_remove(name, value)` | Remove value from set |
| `set_clear(name)` | Clear all values from set |

```rs
set_new("visited");
set_add("visited", 42);
if (set_contains("visited", 42)) {
    say("Already visited!");
}
set_remove("visited", 42);
```

## Advancement

| Function | Description |
|----------|-------------|
| `advancement_grant(target, advancement)` | Grant advancement |
| `advancement_revoke(target, advancement)` | Revoke advancement |

```rs
advancement_grant(@s, "story/mine_diamond");
advancement_revoke(@a, "story/mine_diamond");
```

## Utility

| Function | Description |
|----------|-------------|
| `repeat(count) { }` | Repeat block N times |
| `for_each(array, lambda)` | Iterate array |
| `map(array, lambda)` | Transform array |
| `filter(array, lambda)` | Filter array |
| `random(min, max)` | Random integer |
| `random_native(min, max)` | Random using MC 1.20+ native random |
| `random_sequence(name, min, max)` | Random from named sequence |

## Scheduling

| Function | Description |
|----------|-------------|
| `setTimeout(delay, callback)` | Run a callback once after `delay` ticks |
| `setInterval(interval, callback)` | Run a callback repeatedly |
| `clearInterval(id)` | Cancel a repeating callback |

```rs
setTimeout(200, () => {
    say("Delayed!");
});

let id = setInterval(20, () => {
    actionbar(@a, f"Tick: {score}");
});

clearInterval(id);
```

The timer helpers compile to generated functions scheduled with Minecraft's `schedule function` command.

## Game Mode

| Function | Description |
|----------|-------------|
| `gamemode(target, mode)` | Set game mode |
| `spawnpoint(target, x, y, z)` | Set spawn point |

```rs
gamemode(@s, "creative");
spawnpoint(@s, 0, 100, 0);
```

## Sidebar Display

| Function | Description |
|----------|-------------|
| `sidebar_set(title, target, objective)` | Configure sidebar |

```rs
sidebar_set("Kills", @a, "kills");
```
