# 教程：跑酷竞速

构建带检查点和记录系统的计时跑酷。

## 你将学到

- 使用记分板的计时系统
- 检查点系统
- 个人最佳记录
- 掉落检测和重生

## 最终效果

玩家跑完跑酷赛道，检查点保存进度，记录最佳时间。

## 第一步：设置

```mcrs
const START_X: int = 0;
const START_Y: int = 64;
const FALL_Y: int = 50;
const CHECKPOINT_COUNT: int = 5;
```

## 第二步：记分板

```mcrs
@load
fn init() {
    scoreboard_add_objective("pk_time", "dummy");
    scoreboard_add_objective("pk_best", "dummy");
    scoreboard_add_objective("pk_checkpoint", "dummy");
    scoreboard_add_objective("pk_running", "dummy");
}
```

## 第三步：开始比赛

```mcrs
fn start_race(player: selector) {
    scoreboard_set(player, "pk_running", 1);
    scoreboard_set(player, "pk_time", 0);
    scoreboard_set(player, "pk_checkpoint", 0);
    tp(player, START_X, START_Y, START_Z);
    title(player, "§b开始！");
}
```

## 第四步：计时循环

```mcrs
@tick
fn race_tick() {
    foreach (p in @a) {
        let running: int = scoreboard_get(p, "pk_running");
        if (running == 1) {
            scoreboard_add(p, "pk_time", 1);
            let time: int = scoreboard_get(p, "pk_time");
            let seconds: int = time / 20;
            actionbar(p, f"§e⏱ {seconds} 秒");
        }
    }
}
```

## 第五步：检查点

```mcrs
fn reach_checkpoint(player: selector, cp: int) {
    scoreboard_set(player, "pk_checkpoint", cp);
    subtitle(player, f"§a检查点 {cp}");
    playsound("minecraft:entity.experience_orb.pickup", "player", player);
}
```

## 第六步：完成比赛

```mcrs
fn finish_race(player: selector) {
    scoreboard_set(player, "pk_running", 0);
    let time: int = scoreboard_get(player, "pk_time");
    let best: int = scoreboard_get(player, "pk_best");
    
    if (time < best) {
        scoreboard_set(player, "pk_best", time);
        title(player, "§6新纪录！");
    }
}
```

## 完整代码

查看完整示例：[parkour_race.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/parkour_race.mcrs)
