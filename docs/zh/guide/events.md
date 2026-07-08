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

事件运行时会注入 execute 上下文。推荐使用无参数 handler，并用 `@s` 表示触发事件的玩家；单个 `Player` 参数仍为兼容旧写法而接受。

## 可用事件

| 事件 | 负载 | 触发时机 |
|------|------|----------|
| `PlayerDeath` | `Player` | 玩家死亡时 |
| `PlayerJoin` | `Player` | 玩家加入时 |
| `EntityKill` | `Player` | 玩家击杀实体时 |
| `ItemUse` | `Player` | 玩家使用物品时 |

同一个事件可以注册多个处理函数。RedScript 会为每种事件生成一个分发器，并依次调用匹配的处理函数。

## 示例

```mcrs
@on(PlayerJoin)
fn welcome(player: Player) {
    say(f"Welcome {player}!");
}

@on(EntityKill)
fn reward_kill() {
    scoreboard_add(@s, "kills", 1);
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

## 如何选择事件入口

内置事件运行时请使用 `@on(...)`。`@on_death`、`@on_login` 等旧式专用名称仍会为了兼容被解析器识别，但它们不是当前接入运行时事件系统的路径。

如果需要内置集合之外的事件，请使用 `@function_tag(...)` 搭配显式的 Minecraft/stdlib dispatcher，不要假设一定存在某个专用装饰器。

## 下一步

- [装饰器](/zh/guide/decorators) — 了解完整的装饰器系统
- [实体类型](/zh/guide/entity-types) — 理解事件参数的类型系统
