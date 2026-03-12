# 第一个数据包

让我们一步步构建一个完整的**击杀计数器**数据包。玩家通过击杀怪物获得积分，在侧边栏查看分数，并在达到里程碑时获得奖励。

## 第 1 步：创建项目

创建一个新文件 `killcount.mcrs`：

```bash
mkdir kill-counter
cd kill-counter
touch killcount.mcrs
```

## 第 2 步：定义变量

```rs
const REWARD_THRESHOLD: int = 10;
```

## 第 3 步：加载时初始化

使用 `@load` 在数据包加载时初始化记分板：

```rs
@load
fn init() {
    scoreboard_add("kills", "playerKillCount");
    scoreboard_add("level", "dummy");
    scoreboard_display("sidebar", "kills");
    say("Kill Counter datapack loaded!");
}
```

## 第 4 步：追踪击杀

使用 `@tick` 检查分数并发放奖励：

```rs
@tick(rate=20)
fn check_rewards() {
    // 检查是否有玩家达到阈值
    foreach (player in @a) {
        if (scoreboard_get(player, "kills") >= REWARD_THRESHOLD) {
            grant_reward(player);
        }
    }
}

fn grant_reward(player: selector) {
    // 发放奖励
    give(player, "diamond", 1);
    effect(player, "regeneration", 10, 2);
    title(player, "Level Up!");

    // 增加等级并重置击杀数
    scoreboard_add_score(player, "level", 1);
    scoreboard_set(player, "kills", 0);

    // 广播
    tellraw(@a, "${player} leveled up!");
}
```

## 第 5 步：欢迎新玩家

```rs
@on_join
fn welcome(player: selector) {
    title(player, "Kill Counter");
    subtitle(player, "Kill mobs to earn rewards!");
    scoreboard_set(player, "kills", 0);
    scoreboard_set(player, "level", 0);
}
```

## 第 6 步：死亡消息

```rs
@on_death
fn on_death() {
    scoreboard_set(@s, "kills", 0);
    tellraw(@s, "You died! Kill count reset.");
}
```

## 完整代码

完整的 `killcount.mcrs`：

```rs
const REWARD_THRESHOLD: int = 10;

@load
fn init() {
    scoreboard_add("kills", "playerKillCount");
    scoreboard_add("level", "dummy");
    scoreboard_display("sidebar", "kills");
    say("Kill Counter datapack loaded!");
}

@tick(rate=20)
fn check_rewards() {
    foreach (player in @a) {
        if (scoreboard_get(player, "kills") >= REWARD_THRESHOLD) {
            grant_reward(player);
        }
    }
}

fn grant_reward(player: selector) {
    give(player, "diamond", 1);
    effect(player, "regeneration", 10, 2);
    title(player, "Level Up!");
    scoreboard_add_score(player, "level", 1);
    scoreboard_set(player, "kills", 0);
    tellraw(@a, "${player} leveled up!");
}

@on_join
fn welcome(player: selector) {
    title(player, "Kill Counter");
    subtitle(player, "Kill mobs to earn rewards!");
    scoreboard_set(player, "kills", 0);
    scoreboard_set(player, "level", 0);
}

@on_death
fn on_death() {
    scoreboard_set(@s, "kills", 0);
    tellraw(@s, "You died! Kill count reset.");
}
```

## 第 7 步：编译

```bash
redscript compile killcount.mcrs -o ./kill-counter-pack
```

## 第 8 步：安装

1. 将 `kill-counter-pack` 复制到 Minecraft 存档的 `datapacks/` 文件夹
2. 在游戏内运行 `/reload`
3. 你应该会在聊天栏看到 "Kill Counter datapack loaded!"

## 第 9 步：测试

1. 切换到生存模式：`/gamemode survival`
2. 生成一些怪物：`/summon zombie ~ ~ ~`
3. 击杀怪物，观察侧边栏的分数变化
4. 击杀 10 次后，你将获得钻石和升级！

## 你学到了什么

- `@load` — 在数据包加载时运行代码
- `@tick(rate=N)` — 定期运行代码
- `@on_join` / `@on_death` — 响应玩家事件
- 记分板函数 — 追踪和显示数据
- `give` / `effect` / `title` — 与玩家交互

## 下一步

- [变量与类型](/zh/guide/variables) — 深入了解类型系统
- [装饰器](/zh/guide/decorators) — 所有可用装饰器
- [内置函数](/zh/reference/builtins) — 完整的函数参考
