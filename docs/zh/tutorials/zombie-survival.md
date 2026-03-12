# 教程：僵尸生存

构建一个带商店系统的波次僵尸生存游戏。

## 你将学到

- 使用 struct 管理游戏状态
- 波次生成系统
- 商店和经济系统
- 用 Bossbar 做 UI
- 阶段式游戏流程

## 最终效果

玩家抵御一波波僵尸，击杀获得金币，波次间可购买装备升级。

## 第一步：项目设置

```mcrs
import "stdlib/effects.mcrs"
import "stdlib/world.mcrs"
import "stdlib/inventory.mcrs"
import "stdlib/bossbar.mcrs"

const ARENA_X: int = 0;
const ARENA_Y: int = 64;
const ARENA_Z: int = 0;
const WAVE_DELAY: int = 200;  // 10秒准备时间
```

## 第二步：游戏状态

用 struct 追踪所有游戏状态：

```mcrs
struct SurvivalState {
    running: int,
    wave: int,
    zombies_left: int,
    phase: int,         // 0=准备, 1=战斗
    prep_timer: int
}

let state: SurvivalState = SurvivalState {
    running: 0,
    wave: 0,
    zombies_left: 0,
    phase: 0,
    prep_timer: 0
};
```

## 第三步：初始化

```mcrs
@load
fn init() {
    // 创建金币和击杀数记分板
    scoreboard_add_objective("zs_coins", "dummy");
    scoreboard_add_objective("zs_kills", "dummy");
    
    set_night();
    disable_mob_griefing();
    
    announce("§4[僵尸生存] §f已加载！输入 /trigger start");
}
```

## 第四步：开始游戏

```mcrs
fn start_game() {
    state.running = 1;
    state.wave = 0;
    
    // 初始化玩家
    foreach (p in @a) {
        scoreboard_set(p, "zs_coins", 0);
        clear_inventory(p);
        give(p, "minecraft:wooden_sword", 1);
        tp(p, ARENA_X, ARENA_Y, ARENA_Z);
    }
    
    // 创建进度条 bossbar
    create_progress_bar("zs_wave", "§c僵尸剩余", 10);
    
    title(@a, "§4僵尸生存");
    
    start_prep_phase();
}
```

## 第五步：阶段系统

### 准备阶段

```mcrs
fn start_prep_phase() {
    state.phase = 0;
    state.prep_timer = WAVE_DELAY;
    state.wave = state.wave + 1;
    
    announce("§4[ZS] §e第 " + state.wave + " 波即将来袭！");
    
    if (state.wave > 1) {
        announce("§a[商店] §f输入 /trigger buy 购买物品");
    }
}
```

### 战斗阶段

```mcrs
fn start_combat_phase() {
    state.phase = 1;
    
    // 每波增加僵尸
    let zombie_count: int = 3 + (state.wave * 2);
    state.zombies_left = zombie_count;
    
    bossbar_set_max("zs_wave", zombie_count);
    bossbar_set_value("zs_wave", zombie_count);
    
    title(@a, "§c第 " + state.wave + " 波");
    
    spawn_zombies(zombie_count);
}
```

## 第六步：僵尸生成

```mcrs
fn spawn_zombies(count: int) {
    for i in 0..count {
        let spawn_x: int = ARENA_X + 25;
        
        // 后期波次更强的僵尸
        if (state.wave < 3) {
            summon("minecraft:zombie", spawn_x, ARENA_Y, ARENA_Z);
        } else {
            if (state.wave < 5) {
                // 穿盔甲的僵尸
                summon("minecraft:zombie", spawn_x, ARENA_Y, ARENA_Z, 
                    {ArmorItems: [{}, {}, {id: "iron_chestplate", Count: 1}, {}]});
            } else {
                // 快速尸壳
                summon("minecraft:husk", spawn_x, ARENA_Y, ARENA_Z);
            }
        }
    }
}
```

## 第七步：游戏循环

```mcrs
@tick
fn game_tick() {
    if (state.running == 0) {
        return;
    }
    
    if (state.phase == 0) {
        prep_tick();
    } else {
        combat_tick();
    }
}

fn prep_tick() {
    state.prep_timer = state.prep_timer - 1;
    
    if (state.prep_timer == 60) {
        actionbar(@a, "§e3 秒...");
    }
    
    if (state.prep_timer <= 0) {
        start_combat_phase();
    }
}

fn combat_tick() {
    // 计算剩余僵尸
    // 更新 bossbar
    update_bar("zs_wave", state.zombies_left);
    
    if (state.zombies_left <= 0) {
        wave_complete();
    }
}
```

## 第八步：波次完成

```mcrs
fn wave_complete() {
    announce("§4[ZS] §a第 " + state.wave + " 波完成！");
    
    // 奖励金币
    let reward: int = 50 + (state.wave * 25);
    foreach (p in @a) {
        scoreboard_add(p, "zs_coins", reward);
    }
    announce("§6+" + reward + " 金币");
    
    // 检查胜利
    if (state.wave == 10) {
        victory();
        return;
    }
    
    start_prep_phase();
}
```

## 第九步：商店系统

```mcrs
fn buy_item(player: selector, item_id: int) {
    let coins: int = scoreboard_get(player, "zs_coins");
    
    if (item_id == 1) {
        // 铁剑 - 100 金币
        if (coins >= 100) {
            scoreboard_add(player, "zs_coins", -100);
            give(player, "minecraft:iron_sword", 1);
            tell(player, "§a购买成功：铁剑");
        } else {
            tell(player, "§c金币不足！需要 100");
        }
    }
    
    if (item_id == 2) {
        // 盔甲套装 - 200 金币
        if (coins >= 200) {
            scoreboard_add(player, "zs_coins", -200);
            give(player, "minecraft:iron_chestplate", 1);
            give(player, "minecraft:iron_leggings", 1);
            give(player, "minecraft:iron_boots", 1);
            tell(player, "§a购买成功：铁甲套装");
        }
    }
    
    if (item_id == 3) {
        // 弓箭 - 150 金币
        if (coins >= 150) {
            scoreboard_add(player, "zs_coins", -150);
            give(player, "minecraft:bow", 1);
            give(player, "minecraft:arrow", 32);
            tell(player, "§a购买成功：弓 + 32 箭");
        }
    }
}
```

## 第十步：结束游戏

```mcrs
fn victory() {
    state.running = 0;
    
    title(@a, "§6胜利！");
    subtitle(@a, "§a你们生存了 10 波！");
    
    foreach (p in @a) {
        buff_all(p, 200);
    }
    
    remove_bar("zs_wave");
}

fn game_over() {
    state.running = 0;
    
    title(@a, "§c游戏结束");
    subtitle(@a, "§7生存了 " + state.wave + " 波");
    
    // 清理
    kill(@e[type=zombie]);
    kill(@e[type=husk]);
    
    remove_bar("zs_wave");
}
```

## 完整代码

查看完整示例：[zombie_survival.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/zombie_survival.mcrs)

## 扩展方向

- 添加更多敌人类型（骷髅、苦力怕）
- 添加特殊波次（每 5 波出 Boss）
- 添加玩家职业系统
- 添加难度设置
