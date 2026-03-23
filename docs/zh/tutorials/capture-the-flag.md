# 教程：夺旗战

<div class="tutorial-meta">
  <span class="difficulty advanced">🔴 Advanced</span>
  <span class="time">⏱️ 40 min</span>
</div>


构建两队对抗的夺旗游戏。

## 你将学到

- 队伍系统设置
- 旗帜拾取和夺取逻辑
- 距离检测触发器
- 多队伍计分

## 最终效果

两队竞争偷取敌方旗帜并带回己方基地。

## 第一步：设置

```mcrs
import teams::*
import effects::*

const RED_BASE_X: int = -50;
const BLUE_BASE_X: int = 50;
const BASE_Y: int = 64;
const WIN_SCORE: int = 3;
```

## 第二步：游戏状态

```mcrs
struct GameState {
    running: int,
    red_score: int,
    blue_score: int,
    red_flag_taken: int,
    blue_flag_taken: int
}
```

## 第三步：队伍分配

```mcrs
fn assign_teams() {
    let count: int = 0;
    foreach (p in @a) {
        if (count % 2 == 0) {
            team_join(p, "red");
        } else {
            team_join(p, "blue");
        }
        count = count + 1;
    }
}
```

## 第四步：旗帜拾取

```mcrs
fn check_flag_pickup() {
    foreach (p in @a[team=blue]) {
        execute if entity p[x=-52..-48, y=62..68, z=-2..2] run {
            if (game.red_flag_taken == 0) {
                game.red_flag_taken = 1;
                tag_add(p, "has_flag");
                announce("§9蓝队 §f拿到了 §c红旗§f！");
                glow(p, 9999);
            }
        }
    }
}
```

## 第五步：夺旗得分

```mcrs
fn check_flag_capture() {
    foreach (p in @a[team=blue, tag=has_flag]) {
        execute if entity p[x=45..55, y=62..68, z=-5..5] run {
            game.blue_score = game.blue_score + 1;
            announce("§9蓝队 §a得分！");
            tag_remove(p, "has_flag");
            place_flags();
        }
    }
}
```

## 完整代码

查看完整示例：[capture_the_flag.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/capture_the_flag.mcrs)
