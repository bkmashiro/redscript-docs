# 内置函数

RedScript 所有内置函数的完整列表。

## 聊天与显示

| 函数 | 描述 |
|------|------|
| `say(message)` | 向所有玩家广播消息 |
| `tellraw(target, message)` | 向目标发送格式化消息 |
| `title(target, text)` | 在屏幕上显示标题 |
| `subtitle(target, text)` | 在屏幕上显示副标题 |
| `actionbar(target, text)` | 在动作栏显示文本 |

```rs
say("Hello everyone!");
tellraw(@a, "Welcome to the server!");
title(@p, "You Win!");
subtitle(@p, "Congratulations!");
actionbar(@a, "Score: ${score}");
```

在 v1.2 中，聊天和显示类内置函数也支持运行时 f-string：

```rs
say(f"Welcome {player}!");
actionbar(@a, f"Score: {score}");
```

## 实体管理

| 函数 | 描述 |
|------|------|
| `summon(entity, x, y, z)` | 在指定位置召唤实体 |
| `summon(entity, x, y, z, nbt)` | 带 NBT 召唤 |
| `kill(target)` | 杀死实体 |
| `tp(target, x, y, z)` | 传送实体 |
| `tp(target, destination)` | 传送到实体 |

```rs
summon("zombie", ~0, ~5, ~0);
kill(@e[type=zombie]);
tp(@a, 0, 100, 0);
tp(@s, @p);
```

## 物品

| 函数 | 描述 |
|------|------|
| `give(target, item, count)` | 给予物品 |
| `give(target, item, count, nbt)` | 给予带 NBT 的物品 |
| `clear(target)` | 清除所有物品 |
| `clear(target, item)` | 清除特定物品 |
| `clear(target, item, count)` | 清除指定数量物品 |

```rs
give(@a, "diamond", 64);
give(@s, "diamond_sword", 1, {Enchantments: [{id: "sharpness", lvl: 5s}]});
clear(@a);
clear(@s, "dirt", 10);
```

## 效果

| 函数 | 描述 |
|------|------|
| `effect(target, effect, duration, amplifier)` | 施加效果 |
| `effect_clear(target)` | 清除所有效果 |
| `effect_clear(target, effect)` | 清除特定效果 |

```rs
effect(@a, "speed", 30, 2);
effect(@s, "instant_health", 1, 1);
effect_clear(@a);
effect_clear(@s, "poison");
```

## 记分板

| 函数 | 描述 |
|------|------|
| `scoreboard_add(name, criteria)` | 创建目标 |
| `scoreboard_remove(name)` | 移除目标 |
| `scoreboard_display(slot, name)` | 显示目标 |
| `scoreboard_set(target, name, value)` | 设置分数 |
| `scoreboard_add_score(target, name, value)` | 增加分数 |
| `scoreboard_remove_score(target, name, value)` | 减少分数 |
| `scoreboard_reset(target, name)` | 重置分数 |
| `scoreboard_get(target, name)` | 获取分数 |

```rs
scoreboard_add("kills", "playerKillCount");
scoreboard_display("sidebar", "kills");
scoreboard_set(@a, "kills", 0);
scoreboard_add_score(@s, "kills", 1);
```

### 命名空间前缀

记分板目标在编译时会自动加上数据包命名空间前缀。

例如，在命名空间 `minigame` 中写 `scoreboard_add("kills", "dummy")`，生成的数据包里会使用类似 `minigame_kills` 的目标名。这样可以避免不同数据包之间的目标名冲突。

## 队伍

| 函数 | 描述 |
|------|------|
| `team_add(name)` | 创建队伍 |
| `team_remove(name)` | 移除队伍 |
| `team_join(name, target)` | 加入队伍 |
| `team_leave(target)` | 离开队伍 |
| `team_modify(name, option, value)` | 修改队伍选项 |

```rs
team_add("red");
team_modify("red", "color", "red");
team_modify("red", "friendlyFire", "false");
team_join("red", @s);
```

## 世界

| 函数 | 描述 |
|------|------|
| `setblock(x, y, z, block)` | 放置方块 |
| `fill(x1, y1, z1, x2, y2, z2, block)` | 用方块填充区域 |
| `clone(x1, y1, z1, x2, y2, z2, dx, dy, dz)` | 克隆方块 |
| `weather(type)` | 设置天气 |
| `time_set(value)` | 设置时间 |
| `difficulty(level)` | 设置难度 |
| `gamerule(rule, value)` | 设置游戏规则 |

```rs
setblock(0, 100, 0, "diamond_block");
fill(~-5, ~0, ~-5, ~5, ~3, ~5, "stone");
weather("clear");
time_set("day");
gamerule("doDaylightCycle", "false");
```

## 声音

| 函数 | 描述 |
|------|------|
| `playsound(target, sound)` | 播放声音 |
| `playsound(target, sound, volume, pitch)` | 带选项播放 |
| `stopsound(target)` | 停止所有声音 |

```rs
playsound(@a, "entity.experience_orb.pickup");
playsound(@s, "block.note_block.pling", 1.0, 2.0);
stopsound(@a);
```

## 粒子

| 函数 | 描述 |
|------|------|
| `particle(name, x, y, z)` | 生成粒子 |
| `particle(name, x, y, z, dx, dy, dz, speed, count)` | 带选项生成 |

```rs
particle("flame", ~0, ~2, ~0);
particle("heart", ~0, ~2, ~0, 0.5, 0.5, 0.5, 0.1, 10);
```

## 标签

| 函数 | 描述 |
|------|------|
| `tag_add(target, tag)` | 添加标签 |
| `tag_remove(target, tag)` | 移除标签 |

```rs
tag_add(@s, "playing");
tag_remove(@s, "playing");
```

## 经验

| 函数 | 描述 |
|------|------|
| `xp_add(target, amount)` | 添加经验点 |
| `xp_add_levels(target, amount)` | 添加经验等级 |
| `xp_set(target, amount)` | 设置经验点 |

```rs
xp_add(@s, 100);
xp_add_levels(@s, 5);
xp_set(@a, 0);
```

## 数据

| 函数 | 描述 |
|------|------|
| `data_get(target, path)` | 获取 NBT 数据 |
| `data_merge(target, nbt)` | 合并 NBT 数据 |
| `data_remove(target, path)` | 移除 NBT 路径 |

```rs
data_merge(@s, {Invisible: 1b});
data_remove(@s, "CustomName");
```

## 进度

| 函数 | 描述 |
|------|------|
| `advancement_grant(target, advancement)` | 授予进度 |
| `advancement_revoke(target, advancement)` | 撤销进度 |

```rs
advancement_grant(@s, "story/mine_diamond");
advancement_revoke(@a, "story/mine_diamond");
```

## 工具函数

| 函数 | 描述 |
|------|------|
| `repeat(count) { }` | 重复执行 N 次 |
| `for_each(array, lambda)` | 遍历数组 |
| `map(array, lambda)` | 转换数组 |
| `filter(array, lambda)` | 过滤数组 |
| `random(min, max)` | 随机整数 |

## 调度

| 函数 | 描述 |
|------|------|
| `setTimeout(delay, callback)` | 在 `delay` 个 tick 后执行一次回调 |
| `setInterval(interval, callback)` | 按固定间隔重复执行回调 |
| `clearInterval(id)` | 取消重复回调 |

```rs
setTimeout(200, () => {
    say("Delayed!");
});

let id = setInterval(20, () => {
    actionbar(@a, f"Tick: {score}");
});

clearInterval(id);
```

这些计时辅助函数会编译为通过 Minecraft `schedule function` 命令调度的生成函数。

## 游戏模式

| 函数 | 描述 |
|------|------|
| `gamemode(target, mode)` | 设置游戏模式 |
| `spawnpoint(target, x, y, z)` | 设置出生点 |

```rs
gamemode(@s, "creative");
spawnpoint(@s, 0, 100, 0);
```

## 侧边栏显示

| 函数 | 描述 |
|------|------|
| `sidebar_set(title, target, objective)` | 配置侧边栏 |

```rs
sidebar_set("Kills", @a, "kills");
```
