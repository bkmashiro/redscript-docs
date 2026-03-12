# 静态事件 <Badge type="tip" text="v1.2" />

使用 `@on(Event)` 可以把函数绑定到编译器生成的事件分发器上。

## 基本语法

```mcrs
@on(PlayerDeath)
fn handle_death(player: Player) {
    say("Player died!");
}

@on(PlayerJoin)
fn handle_join(player: Player) {
    give(player, "minecraft:diamond", 1);
}
```

参数类型应与事件负载匹配。对于玩家事件，通常使用 `Player`。

## 可用事件

| 事件 | 负载 | 触发时机 |
|------|------|----------|
| `PlayerDeath` | `Player` | 玩家死亡时 |
| `PlayerJoin` | `Player` | 玩家加入时 |
| `BlockBreak` | `Player` | 玩家破坏方块时 |
| `EntityKill` | `entity` | 实体被击杀时 |
| `ItemUse` | `Player` | 玩家使用物品时 |

同一个事件可以注册多个处理函数。RedScript 会为每种事件生成一个分发器，并依次调用匹配的处理函数。

## 示例

```mcrs
@on(PlayerJoin)
fn welcome(player: Player) {
    say(f"Welcome {player}!");
}

@on(BlockBreak)
fn reward_mining(player: Player) {
    scoreboard_add_score(player, "blocks", 1);
}

@on(ItemUse)
fn on_item_use(player: Player) {
    effect(player, "speed", 100, 1);
}
```

## 编译方式

RedScript 会为每个被订阅的事件生成分发函数，并把你的处理器接入这些分发器。

- 事件处理函数本身仍然是普通的强类型函数
- 编译器负责生成 Minecraft 侧的检测逻辑
- 匹配到的玩家或实体会被传入分发调用

这样既能保持事件代码简洁，也仍然会编译成普通的数据包函数。

## `@on(...)` 与旧装饰器的选择

当你需要统一的强类型事件 API 时，使用 `@on(...)`。如果你依赖已有装饰器的特定语义，仍然可以继续使用它们。

`@on(...)` 和 f-string、实体类型系统一起使用时效果很好，特别适合保持玩家事件处理器简洁且类型安全。

## 下一步

- [装饰器](/zh/guide/decorators) — 了解完整的装饰器系统
- [实体类型](/zh/guide/entity-types) — 理解事件参数的类型系统
