# 教程：跑酷竞速

<div class="tutorial-meta">
  <span class="difficulty intermediate">🟡 Intermediate</span>
  <span class="time">⏱️ 35 min</span>
</div>


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
const START_Z: int = 0;
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

            check_fall(p);
            check_checkpoints(p);
        }
    }
}
```

## 第五步：掉落检测

```mcrs
fn check_fall(player: selector) {
    execute if entity player[y=..50] run {
        let cp: int = scoreboard_get(player, "pk_checkpoint");
        respawn_at_checkpoint(player, cp);
        tell(player, f"§c掉落！返回检查点 {cp}");
    }
}

fn respawn_at_checkpoint(player: selector, cp: int) {
    if (cp == 0) {
        tp(player, 0, 64, 0);
    }
    if (cp == 1) {
        tp(player, 0, 64, 50);
    }
}
```

## 第六步：检查点

```mcrs
fn check_checkpoints(player: selector) {
    let current_cp: int = scoreboard_get(player, "pk_checkpoint");
    if (current_cp == 0) {
        execute if entity player[x=-2..2, y=62..68, z=48..52] run {
            reach_checkpoint(player, 1);
        }
    }
}
```

```mcrs
fn reach_checkpoint(player: selector, cp: int) {
    scoreboard_set(player, "pk_checkpoint", cp);
    subtitle(player, f"§a检查点 {cp}");
    playsound("minecraft:entity.experience_orb.pickup", "player", player);
}
```

## 第七步：完成比赛

```mcrs
fn finish_race(player: selector) {
    scoreboard_set(player, "pk_running", 0);
    let time: int = scoreboard_get(player, "pk_time");
    let best: int = scoreboard_get(player, "pk_best");
    
    if (best == 0) {
        scoreboard_set(player, "pk_best", time);
        title(player, "§6完成！");
    } else if (time < best) {
        scoreboard_set(player, "pk_best", time);
        title(player, "§6新纪录！");
    }
}
```

## 完整代码

查看完整示例：[parkour_race.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/parkour_race.mcrs)

## 可继续改进

- 添加全服排行榜（前 10 名）
- 添加影子回放系统
- 添加多个不同难度的赛道
- 添加掉落时间惩罚
