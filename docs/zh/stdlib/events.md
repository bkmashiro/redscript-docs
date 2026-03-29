# Events

> 本文档由 `src/stdlib/events.mcrs` 自动生成，请勿手动编辑。

`events` 模块提供基于计分板驱动的事件分发器，每个游戏刻检测常见玩家和实体事件，并通过 Minecraft 函数标签触发。多个处理函数可以使用 [`@on`](/zh/guide/events) 装饰器订阅同一个事件。

## 工作原理

模块加载时注册计分板目标以追踪玩家死亡、击杀和物品使用。每个游戏刻轮询这些目标并分发到对应的函数标签（`#rs:on_player_join`、`#rs:on_player_death` 等）。编译器会自动将 `@on(...)` 处理函数接入对应的函数标签。

## 可用事件

| 事件 | 函数标签 | 负载 | 触发时机 |
|------|---------|------|----------|
| `PlayerJoin` | `#rs:on_player_join` | `Player` | 玩家进入世界且没有 `rs.joined` 标签时 |
| `PlayerDeath` | `#rs:on_player_death` | `Player` | 玩家的 `rs.deaths` 计分达到 1 或以上时 |
| `EntityKill` | `#rs:on_entity_kill` | `Player` | 玩家的 `rs.kills` 计分达到 1 或以上时 |
| `ItemUse` | `#rs:on_item_use` | `Player` | 玩家使用胡萝卜钓竿时 |

## API 列表

- [__events_load](#events-load)
- [__events_tick](#events-tick)

---

## `__events_load` <Badge type="info" text="v1.2.0" />

内部加载函数。注册 `rs.deaths`、`rs.kills` 和 `rs.item_use` 计分板目标。通过 `@load` 在数据包加载时自动调用——**请勿直接调用**。

```redscript
@load fn __events_load()
```

**注册的计分板目标**

| 目标名 | 标准 | 用途 |
|--------|------|------|
| `rs.deaths` | `deathCount` | 追踪玩家死亡次数 |
| `rs.kills` | `totalKillCount` | 追踪玩家击杀次数 |
| `rs.item_use` | `minecraft.used:minecraft.carrot_on_a_stick` | 追踪物品使用次数 |

---

## `__events_tick` <Badge type="info" text="v1.2.0" />

内部 tick 函数。每个游戏刻轮询计分板目标，将 `PlayerJoin`、`PlayerDeath`、`EntityKill` 和 `ItemUse` 事件分发到对应的函数标签。通过 `@tick` 自动每刻调用——**请勿直接调用**。

```redscript
@tick fn __events_tick()
```

**分发顺序**

1. `PlayerJoin` — 对每个没有 `rs.joined` 标签的玩家触发，然后添加该标签
2. `PlayerDeath` — 对每个 `rs.deaths >= 1` 的玩家触发，然后将分数重置为 0
3. `EntityKill` — 对每个 `rs.kills >= 1` 的玩家触发，然后将分数重置为 0
4. `ItemUse` — 对每个 `rs.item_use >= 1` 的玩家触发，然后将分数重置为 0

---

## 使用示例

### 玩家加入问候

```redscript
@on(PlayerJoin)
fn welcome() {
    tellraw(@s, "欢迎来到服务器！");
}
```

### 死亡计数器

```redscript
@on(PlayerDeath)
fn on_death() {
    scoreboard_add(@s, "total_deaths", 1);
    title(@s, "你死了！");
}
```

### 击杀奖励

```redscript
@on(EntityKill)
fn on_kill() {
    give(@s, "minecraft:gold_nugget", 1);
}
```

### 物品使用技能

```redscript
@on(ItemUse)
fn on_rod_use() {
    effect(@s, "speed", 60, 2);
}
```

### 同一事件的多个处理函数

同一事件可以注册多个处理函数，每个游戏刻所有匹配的处理函数都会依次执行。

```redscript
@on(PlayerJoin)
fn log_join() {
    scoreboard_add(@s, "join_count", 1);
}

@on(PlayerJoin)
fn greet_join() {
    say(f"欢迎，{@s}！");
}
```

## 参见

- [静态事件指南](/zh/guide/events) — 装饰器语法与使用模式
- [装饰器参考](/zh/reference/decorators) — 完整装饰器列表
- [实体类型指南](/zh/guide/entity-types) — 事件参数的类型系统
