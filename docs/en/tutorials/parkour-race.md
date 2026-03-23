# Tutorial: Parkour Race

<div class="tutorial-meta">
  <span class="difficulty intermediate">🟡 Intermediate</span>
  <span class="time">⏱️ 35 min</span>
</div>


Build a timed parkour course with checkpoints and records.

## What You'll Learn

- Timer system using scoreboards
- Checkpoint system
- Personal best tracking
- Fall detection and respawn

## Final Result

Players race through a parkour course, checkpoints save progress, and best times are recorded.

## Step 1: Setup

```mcrs
import effects::*
import particles::*

const START_X: int = 0;
const START_Y: int = 64;
const START_Z: int = 0;
const FALL_Y: int = 50;  // Below this = fell
const CHECKPOINT_COUNT: int = 5;
```

## Step 2: Scoreboards

```mcrs
@load
fn init() {
    // Time tracking (in ticks, 20 = 1 second)
    scoreboard_add_objective("pk_time", "dummy");
    
    // Personal best
    scoreboard_add_objective("pk_best", "dummy");
    
    // Current checkpoint (0-5)
    scoreboard_add_objective("pk_checkpoint", "dummy");
    
    // Is player racing? (0/1)
    scoreboard_add_objective("pk_running", "dummy");
    
    // Display leaderboard
    scoreboard_display("sidebar", "pk_best");
    
    set_day();
    weather_clear();
    
    announce("§b[Parkour] §fStep on pressure plate to start!");
}
```

## Step 3: Start Race

```mcrs
fn start_race(player: selector) {
    // Prevent double-start
    let running: int = scoreboard_get(player, "pk_running");
    if (running == 1) {
        tell(player, "§cAlready racing!");
        return;
    }
    
    // Initialize
    scoreboard_set(player, "pk_running", 1);
    scoreboard_set(player, "pk_time", 0);
    scoreboard_set(player, "pk_checkpoint", 0);
    
    // Teleport to start
    tp(player, START_X, START_Y, START_Z);
    
    // Clear any effects
    effect_clear(player);
    
    title(player, "§bGO!");
    
    sparkles(player);
}
```

## Step 4: Timer Loop

```mcrs
@tick
fn race_tick() {
    foreach (p in @a) {
        let running: int = scoreboard_get(p, "pk_running");
        
        if (running == 1) {
            // Increment time
            scoreboard_add(p, "pk_time", 1);
            
            // Display current time
            let time: int = scoreboard_get(p, "pk_time");
            let seconds: int = time / 20;
            let ms: int = (time % 20) * 5;
            actionbar(p, f"§e⏱ {seconds}.{ms}s");
            
            // Check for fall
            check_fall(p);
            
            // Check checkpoints
            check_checkpoints(p);
        }
    }
}
```

## Step 5: Fall Detection

```mcrs
fn check_fall(player: selector) {
    // If player falls below FALL_Y
    execute if entity player[y=..50] run {
        let cp: int = scoreboard_get(player, "pk_checkpoint");
        
        // Respawn at checkpoint
        respawn_at_checkpoint(player, cp);
        
        tell(player, f"§cFell! Back to checkpoint {cp}");
        angry(player);
    }
}

fn respawn_at_checkpoint(player: selector, cp: int) {
    // Checkpoint coordinates
    if (cp == 0) {
        tp(player, 0, 64, 0);
    }
    if (cp == 1) {
        tp(player, 0, 64, 50);
    }
    if (cp == 2) {
        tp(player, 0, 70, 100);
    }
    if (cp == 3) {
        tp(player, 0, 75, 150);
    }
    if (cp == 4) {
        tp(player, 0, 80, 200);
    }
}
```

## Step 6: Checkpoint System

```mcrs
fn check_checkpoints(player: selector) {
    let current_cp: int = scoreboard_get(player, "pk_checkpoint");
    
    // Only check next checkpoint (prevents skipping)
    
    // Checkpoint 1 at (0, 64, 50)
    if (current_cp == 0) {
        execute if entity player[x=-2..2, y=62..68, z=48..52] run {
            reach_checkpoint(player, 1);
        }
    }
    
    // Checkpoint 2 at (0, 70, 100)
    if (current_cp == 1) {
        execute if entity player[x=-2..2, y=68..74, z=98..102] run {
            reach_checkpoint(player, 2);
        }
    }
    
    // Checkpoint 3 at (0, 75, 150)
    if (current_cp == 2) {
        execute if entity player[x=-2..2, y=73..79, z=148..152] run {
            reach_checkpoint(player, 3);
        }
    }
    
    // Checkpoint 4 at (0, 80, 200)
    if (current_cp == 3) {
        execute if entity player[x=-2..2, y=78..84, z=198..202] run {
            reach_checkpoint(player, 4);
        }
    }
    
    // Finish at (0, 64, 250)
    if (current_cp == 4) {
        execute if entity player[x=-2..2, y=62..68, z=248..252] run {
            finish_race(player);
        }
    }
}

fn reach_checkpoint(player: selector, cp: int) {
    scoreboard_set(player, "pk_checkpoint", cp);
    
    subtitle(player, f"§aCheckpoint {cp}/{CHECKPOINT_COUNT}");
    
    happy(player);
    playsound("minecraft:entity.experience_orb.pickup", "player", player);
}
```

## Step 7: Finish Race

```mcrs
fn finish_race(player: selector) {
    // Stop the race
    scoreboard_set(player, "pk_running", 0);
    
    let time: int = scoreboard_get(player, "pk_time");
    let best: int = scoreboard_get(player, "pk_best");
    let seconds: int = time / 20;
    let ms: int = (time % 20) * 5;
    
    // Check for new record
    if (best == 0) {
        // First completion
        scoreboard_set(player, "pk_best", time);
        title(player, "§6Finished!");
        subtitle(player, f"§e{seconds}.{ms}s §7(First Record)");
    } else {
        if (time < best) {
            // New personal best!
            scoreboard_set(player, "pk_best", time);
            title(player, "§6New Record!");
            subtitle(player, f"§e{seconds}.{ms}s");
            announce(f"§b[Parkour] §6New Record! §e{seconds}.{ms}s");
        } else {
            title(player, "§aFinished!");
            subtitle(player, f"§e{seconds}.{ms}s");
        }
    }
    
    sparkles(player);
    playsound("minecraft:ui.toast.challenge_complete", "player", player);
}
```

## Step 8: Quit Race

```mcrs
fn quit_race(player: selector) {
    let running: int = scoreboard_get(player, "pk_running");
    
    if (running == 1) {
        scoreboard_set(player, "pk_running", 0);
        tell(player, "§cRace abandoned");
        tp(player, START_X, START_Y, START_Z);
    }
}
```

## Complete Code

See the full example: [parkour_race.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/parkour_race.mcrs)

## Enhancements

- Add global leaderboard (top 10 times)
- Add ghost replay system
- Add multiple courses with difficulty levels
- Add power-ups (speed boost, double jump)
- Add time penalties for falling
