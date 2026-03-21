# `events` — 基于 Tick 的 Minecraft 事件分发器

导入：`import "stdlib/events.mcrs"`

基于 Minecraft 记分板、标签和函数标签的高层事件钩子。该模块会在 `@load` 时创建所需 objective，并在每个 tick 轮询这些 objective，以分发玩家加入、死亡、击杀和物品使用等游戏事件。

## 提供的事件

分发器会触发以下函数标签：

- `#rs:on_player_join`
- `#rs:on_player_death`
- `#rs:on_entity_kill`
- `#rs:on_item_use`

你的 datapack 需要为实际使用到的标签提供处理函数。模块本身只负责检测与分发。

## 初始化

导入该模块后会注册两个生成函数：

- `@load fn __events_load()`：创建所需的 scoreboard objective。
- `@tick fn __events_tick()`：每 tick 轮询事件条件，并运行对应的函数标签。

在 load 时创建的 objective：

- `rs.deaths` — `deathCount`
- `rs.kills` — `totalKillCount`
- `rs.item_use` — `minecraft.used:minecraft.carrot_on_a_stick`

## 已检测事件

### `PlayerJoin`

没有 `rs.joined` 标签的玩家会被视为新加入玩家。分发器会：

1. 以这些玩家为执行者运行 `function #rs:on_player_join`。
2. 给他们添加 `rs.joined` 标签，确保该事件在一次加入会话中只触发一次。

### `PlayerDeath`

`rs.deaths >= 1` 的玩家会触发 `function #rs:on_player_death`，随后其 `rs.deaths` 分数被重置为 `0`。

### `EntityKill`

`rs.kills >= 1` 的玩家会触发 `function #rs:on_entity_kill`，随后其 `rs.kills` 分数被重置为 `0`。

### `ItemUse`

`rs.item_use >= 1` 的玩家会触发 `function #rs:on_item_use`，随后其 `rs.item_use` 分数被重置为 `0`。

默认追踪的是 `minecraft:carrot_on_a_stick`，这在 datapack 中常被用作自定义右键触发器。

## 示例

```rs
import "stdlib/events.mcrs";

// 通过 datapack 中的函数标签提供处理函数：
// data/<ns>/tags/functions/rs/on_player_join.json
// data/<ns>/tags/functions/rs/on_player_death.json
// data/<ns>/tags/functions/rs/on_entity_kill.json
// data/<ns>/tags/functions/rs/on_item_use.json
```

## 说明

- 该模块是分发器，不是回调注册 API。
- 源码注释提到了 `BlockBreak`，但目前尚未实现。
- 加入检测是基于 `rs.joined` 标签的会话级检测；如果你需要重新触发加入流程，需要手动移除此标签。
