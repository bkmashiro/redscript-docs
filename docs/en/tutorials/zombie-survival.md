# Tutorial: Zombie Survival

<div class="tutorial-meta">
  <span class="difficulty intermediate">🟡 Intermediate</span>
  <span class="time">⏱️ 40 min</span>
</div>


Build a wave-based zombie survival game with shop system.

## What You'll Learn

- Game state management with structs
- Wave spawning system
- Shop and economy
- Bossbar for UI
- Phase-based game flow

## Final Result

Players survive waves of zombies, earn coins for kills, and buy upgrades between rounds.

## Step 1: Project Setup

```mcrs
import effects::*
import world::*
import inventory::*
import bossbar::*

const ARENA_X: int = 0;
const ARENA_Y: int = 64;
const ARENA_Z: int = 0;
const WAVE_DELAY: int = 200;  // 10 second prep time
```

## Step 2: Game State

Use a struct to track all game state:

```mcrs
struct SurvivalState {
    running: int,
    wave: int,
    zombies_left: int,
    phase: int,         // 0=prep, 1=combat
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

## Step 3: Initialization

```mcrs
@load
fn init() {
    // Create scoreboards for coins and kills
    scoreboard_add_objective("zs_coins", "dummy");
    scoreboard_add_objective("zs_kills", "dummy");
    
    set_night();
    disable_mob_griefing();
    
    announce("§4[Zombie Survival] §fLoaded! Type /trigger start");
}
```

## Step 4: Start Game

```mcrs
fn start_game() {
    state.running = 1;
    state.wave = 0;
    
    // Initialize players
    foreach (p in @a) {
        scoreboard_set(p, "zs_coins", 0);
        clear_inventory(p);
        give(p, "minecraft:wooden_sword", 1);
        tp(p, ARENA_X, ARENA_Y, ARENA_Z);
    }
    
    // Create progress bossbar
    create_progress_bar("zs_wave", "§cZombies Remaining", 10);
    
    title(@a, "§4Zombie Survival");
    
    start_prep_phase();
}
```

## Step 5: Phase System

### Preparation Phase

```mcrs
fn start_prep_phase() {
    state.phase = 0;
    state.prep_timer = WAVE_DELAY;
    state.wave = state.wave + 1;
    
    announce(f"§4[ZS] §eWave {state.wave} incoming!");
    
    if (state.wave > 1) {
        announce("§a[Shop] §fType /trigger buy to purchase items");
    }
}
```

### Combat Phase

```mcrs
fn start_combat_phase() {
    state.phase = 1;
    
    // More zombies each wave
    let zombie_count: int = 3 + (state.wave * 2);
    state.zombies_left = zombie_count;
    
    bossbar_set_max("zs_wave", zombie_count);
    bossbar_set_value("zs_wave", zombie_count);
    
    title(@a, f"§cWave {state.wave}");
    
    spawn_zombies(zombie_count);
}
```

## Step 6: Zombie Spawning

```mcrs
fn spawn_zombies(count: int) {
    for i in 0..count {
        let spawn_x: int = ARENA_X + 25;
        
        // Harder zombies in later waves
        if (state.wave < 3) {
            summon("minecraft:zombie", spawn_x, ARENA_Y, ARENA_Z);
        } else {
            if (state.wave < 5) {
                // Armored zombie
                summon("minecraft:zombie", spawn_x, ARENA_Y, ARENA_Z, 
                    {ArmorItems: [{}, {}, {id: "iron_chestplate", Count: 1}, {}]});
            } else {
                // Fast husk
                summon("minecraft:husk", spawn_x, ARENA_Y, ARENA_Z);
            }
        }
    }
}
```

## Step 7: Game Loop

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
        actionbar(@a, "§e3 seconds...");
    }
    
    if (state.prep_timer <= 0) {
        start_combat_phase();
    }
}

fn combat_tick() {
    // Count remaining zombies
    // Update bossbar
    update_bar("zs_wave", state.zombies_left);
    
    if (state.zombies_left <= 0) {
        wave_complete();
    }
}
```

## Step 8: Wave Completion

```mcrs
fn wave_complete() {
    announce(f"§4[ZS] §aWave {state.wave} complete!");
    
    // Reward coins
    let reward: int = 50 + (state.wave * 25);
    foreach (p in @a) {
        scoreboard_add(p, "zs_coins", reward);
    }
    announce(f"§6+{reward} coins");
    
    // Check for victory
    if (state.wave == 10) {
        victory();
        return;
    }
    
    start_prep_phase();
}
```

## Step 9: Shop System

```mcrs
fn buy_item(player: selector, item_id: int) {
    let coins: int = scoreboard_get(player, "zs_coins");
    
    if (item_id == 1) {
        // Iron Sword - 100 coins
        if (coins >= 100) {
            scoreboard_add(player, "zs_coins", -100);
            give(player, "minecraft:iron_sword", 1);
            tell(player, "§aPurchased: Iron Sword");
        } else {
            tell(player, "§cNot enough coins! Need 100");
        }
    }
    
    if (item_id == 2) {
        // Armor Set - 200 coins
        if (coins >= 200) {
            scoreboard_add(player, "zs_coins", -200);
            give(player, "minecraft:iron_chestplate", 1);
            give(player, "minecraft:iron_leggings", 1);
            give(player, "minecraft:iron_boots", 1);
            tell(player, "§aPurchased: Iron Armor");
        }
    }
    
    if (item_id == 3) {
        // Bow + Arrows - 150 coins
        if (coins >= 150) {
            scoreboard_add(player, "zs_coins", -150);
            give(player, "minecraft:bow", 1);
            give(player, "minecraft:arrow", 32);
            tell(player, "§aPurchased: Bow + 32 Arrows");
        }
    }
}
```

## Step 10: End Game

```mcrs
fn victory() {
    state.running = 0;
    
    title(@a, "§6Victory!");
    subtitle(@a, "§aYou survived 10 waves!");
    
    foreach (p in @a) {
        buff_all(p, 200);
    }
    
    remove_bar("zs_wave");
}

fn game_over() {
    state.running = 0;
    
    title(@a, "§cGame Over");
    subtitle(@a, f"§7Survived {state.wave} waves");
    
    // Cleanup
    kill(@e[type=zombie]);
    kill(@e[type=husk]);
    
    remove_bar("zs_wave");
}
```

## Complete Code

See the full example: [zombie_survival.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/zombie_survival.mcrs)

## Next Steps

- Add more enemy types (skeletons, creepers)
- Add special waves (boss every 5 waves)
- Add player classes with unique abilities
- Add difficulty settings
