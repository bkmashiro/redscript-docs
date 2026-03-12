# Built-in Functions

Complete list of all built-in functions available in RedScript.

## Chat & Display

| Function | Description |
|----------|-------------|
| `say(message)` | Broadcast message to all players |
| `tellraw(target, message)` | Send formatted message to target |
| `title(target, text)` | Show title on screen |
| `subtitle(target, text)` | Show subtitle on screen |
| `actionbar(target, text)` | Show text in action bar |

```rs
say("Hello everyone!");
tellraw(@a, "Welcome to the server!");
title(@p, "You Win!");
subtitle(@p, "Congratulations!");
actionbar(@a, "Score: ${score}");
```

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
| `scoreboard_add(name, criteria)` | Create objective |
| `scoreboard_remove(name)` | Remove objective |
| `scoreboard_display(slot, name)` | Display objective |
| `scoreboard_set(target, name, value)` | Set score |
| `scoreboard_add_score(target, name, value)` | Add to score |
| `scoreboard_remove_score(target, name, value)` | Remove from score |
| `scoreboard_reset(target, name)` | Reset score |
| `scoreboard_get(target, name)` | Get score value |

```rs
scoreboard_add("kills", "playerKillCount");
scoreboard_display("sidebar", "kills");
scoreboard_set(@a, "kills", 0);
scoreboard_add_score(@s, "kills", 1);
```

### Namespace Prefixing

Scoreboard objectives are automatically prefixed with your datapack namespace during compilation.

For example, `scoreboard_add("kills", "dummy")` in namespace `minigame` becomes an objective like `minigame_kills` in the generated datapack. This avoids collisions between packs that use the same short objective names.

## Teams

| Function | Description |
|----------|-------------|
| `team_add(name)` | Create team |
| `team_remove(name)` | Remove team |
| `team_join(name, target)` | Add to team |
| `team_leave(target)` | Remove from team |
| `team_modify(name, option, value)` | Modify team option |

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
