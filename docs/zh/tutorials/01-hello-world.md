# 教程：Hello World — 你的第一个 Datapack

<div class="tutorial-meta">
  <span class="difficulty beginner">🟢 Beginner</span>
  <span class="time">⏱️ 20 min</span>
</div>


**难度：** 入门  
**时长：** ~20 分钟  
**前置条件：** [快速上手](../guide/getting-started)

## 你将构建什么

一个最简 datapack，它会在玩家加入时发出问候、用 scoreboard 记录问候次数，并显示欢迎标题。

学完本教程后你将掌握：

- Namespace 声明与函数基础
- `@load` 和 `@tick` 生命周期装饰器
- `@on` 事件系统
- 基础 scoreboard 操作
- 向玩家发送消息、标题与效果

## 项目结构

```
hello_world/
├── src/
│   └── main.mcrs
└── pack.mcmeta
```

运行 `redscript init hello_world` 可自动生成此目录结构。

---

## 第一步：Namespace 与初始化

每个 RedScript 文件都以 `namespace` 声明开头。它会成为 Minecraft 的函数命名空间——所有编译后的函数都在这个命名空间下。

```rs
namespace hello_world

// 世界加载或 /reload 时运行一次
@load
fn init() {
    // 创建一个 scoreboard 来统计问候次数
    scoreboard_add_objective("greetings", "dummy")

    // 每次加载时重置计数
    scoreboard_set("#total", "greetings", 0)

    say("Hello World datapack 已加载！🎉")
}
```

**各行说明：**

| 代码 | 含义 |
|------|------|
| `namespace hello_world` | 将 MC namespace 设为 `hello_world` |
| `@load` | 世界加载时执行下面的函数 |
| `scoreboard_add_objective(name, type)` | 创建 scoreboard；`"dummy"` 表示不会自动递增 |
| `scoreboard_set(target, obj, value)` | 设置数值；`#total` 是用作全局计数器的虚拟玩家 |
| `say(...)` | 以服务器身份广播消息给所有玩家 |

---

## 第二步：用事件欢迎玩家

使用 `@on(PlayerJoin)` 在玩家加入时触发函数。

```rs
@on(PlayerJoin)
fn greet_player(player: Player) {
    // 私信欢迎
    tell(player, "欢迎来到服务器！输入 /trigger hello 来打个招呼吧。")

    // 屏幕大标题
    title(player, "Hello, World!")
    subtitle(player, "由 RedScript 驱动的服务器 🚀")

    // 累计问候次数
    scoreboard_add("#total", "greetings", 1)

    // 每10次加入时全服广播
    let total: int = scoreboard_get("#total", "greetings")
    if (total % 10 == 0) {
        say(f"本服务器已迎接了 {total} 位玩家！")
    }
}
```

**新概念：**

- `tell(player, msg)` — 只向该玩家发送消息（类似 `/msg`）
- `title(player, text)` — 在屏幕显示大标题
- `subtitle(player, text)` — 在标题下方显示副标题
- `f"..."` — **f-string**，可在字符串中嵌入表达式
- `%` — 取模运算符（取余）

---

## 第三步：触发命令

给玩家一种回应问候的方式——使用 trigger scoreboard。

```rs
@on_trigger("hello")
fn player_says_hello() {
    // @s 是激活 trigger 的玩家
    tell(@s, "你好啊！👋")
    effect(@s, "minecraft:glowing", 60, 0)  // 发光 3 秒

    scoreboard_add(@s, "greetings", 1)

    let my_greetings: int = scoreboard_get(@s, "greetings")
    tell(@s, f"你已经打了 {my_greetings} 次招呼！")
}
```

玩家在聊天框输入 `/trigger hello` 即可激活。

- `@s` — 执行该函数的实体（此处为触发 trigger 的玩家）
- `effect(target, effect_id, duration_ticks, amplifier)` — 为目标施加药水效果

---

## 第四步：定期广播

使用 `@tick` 每游戏刻（每秒 20 次）执行代码。请尽量保持 tick 函数轻量。

```rs
// 每 10 分钟（12000 tick）执行一次
@tick(rate=12000)
fn periodic_announcement() {
    let total: int = scoreboard_get("#total", "greetings")
    say(f"[Hello World] 迄今共有 {total} 次问候记录！")
}
```

`@tick(rate=N)` 每 `N` 个 tick 执行一次，而不是每 tick 都执行。对于不频繁的任务，这比裸 `@tick` 要节省很多性能。

---

## 完整代码

```rs
namespace hello_world

// ─── 初始化 ─────────────────────────────────────────────────

@load
fn init() {
    scoreboard_add_objective("greetings", "dummy")
    scoreboard_set("#total", "greetings", 0)
    say("Hello World datapack 已加载！🎉")
}

// ─── 玩家事件 ────────────────────────────────────────────────

@on(PlayerJoin)
fn greet_player(player: Player) {
    tell(player, "欢迎来到服务器！输入 /trigger hello 来打个招呼吧。")
    title(player, "Hello, World!")
    subtitle(player, "由 RedScript 驱动的服务器 🚀")

    scoreboard_add("#total", "greetings", 1)

    let total: int = scoreboard_get("#total", "greetings")
    if (total % 10 == 0) {
        say(f"本服务器已迎接了 {total} 位玩家！")
    }
}

// ─── Trigger ────────────────────────────────────────────────

@on_trigger("hello")
fn player_says_hello() {
    tell(@s, "你好啊！👋")
    effect(@s, "minecraft:glowing", 60, 0)

    scoreboard_add(@s, "greetings", 1)

    let my_greetings: int = scoreboard_get(@s, "greetings")
    tell(@s, f"你已经打了 {my_greetings} 次招呼！")
}

// ─── 定期 Tick ──────────────────────────────────────────────

@tick(rate=12000)
fn periodic_announcement() {
    let total: int = scoreboard_get("#total", "greetings")
    say(f"[Hello World] 迄今共有 {total} 次问候记录！")
}
```

---

## 构建与部署

```bash
# 使用标准优化等级编译
redscript compile src/main.mcrs -O1

# 复制到你的 Minecraft 存档
cp -r out/ ~/.minecraft/saves/MyWorld/datapacks/hello_world/
```

然后在游戏内运行 `/reload`，你应该能在聊天框看到加载消息。

---

## 下一步

- [教程 02：游戏机制](./02-game-mechanics) — 计分板、队伍与事件
- [教程 03：优化](./03-optimization) — 使用优化器和装饰器提升性能
- [指南：函数](../guide/functions) — 深入了解函数声明
