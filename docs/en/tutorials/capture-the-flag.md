# Tutorial: Capture the Flag

Build a two-team CTF game with flag mechanics.

## What You'll Learn

- Team system setup
- Flag pickup and capture logic
- Distance-based triggers
- Multi-team scoring

## Final Result

Two teams compete to steal the enemy flag and bring it back to their base.

## Step 1: Setup

```mcrs
import "stdlib/teams.mcrs"
import "stdlib/effects.mcrs"
import "stdlib/particles.mcrs"

// Base positions
const RED_BASE_X: int = -50;
const RED_BASE_Z: int = 0;
const BLUE_BASE_X: int = 50;
const BLUE_BASE_Z: int = 0;
const BASE_Y: int = 64;

const WIN_SCORE: int = 3;
```

## Step 2: Game State

```mcrs
struct GameState {
    running: int,
    red_score: int,
    blue_score: int,
    red_flag_taken: int,
    blue_flag_taken: int
}

let game: GameState = GameState {
    running: 0,
    red_score: 0,
    blue_score: 0,
    red_flag_taken: 0,
    blue_flag_taken: 0
};
```

## Step 3: Initialize

```mcrs
@load
fn init() {
    // Create scoreboards
    scoreboard_add_objective("ctf_team", "dummy");
    
    // Create teams with colors
    setup_two_teams();  // Creates red and blue teams
    
    set_day();
    weather_clear();
    enable_keep_inventory();
    
    announce("§e[CTF] §fLoaded! Use /trigger start");
}
```

## Step 4: Team Assignment

```mcrs
fn assign_teams() {
    let count: int = 0;
    
    foreach (p in @a) {
        if (count % 2 == 0) {
            team_join(p, "red");
            scoreboard_set(p, "ctf_team", 1);
        } else {
            team_join(p, "blue");
            scoreboard_set(p, "ctf_team", 2);
        }
        count = count + 1;
    }
}
```

## Step 5: Start Game

```mcrs
fn start_game() {
    game.running = 1;
    game.red_score = 0;
    game.blue_score = 0;
    
    assign_teams();
    
    // Teleport to bases
    tp(@a[team=red], RED_BASE_X, BASE_Y, RED_BASE_Z);
    tp(@a[team=blue], BLUE_BASE_X, BASE_Y, BLUE_BASE_Z);
    
    // Give equipment
    foreach (p in @a) {
        clear(p);
        give(p, "minecraft:iron_sword", 1);
        give(p, "minecraft:bow", 1);
        give(p, "minecraft:arrow", 32);
    }
    
    place_flags();
    
    title(@a, "§6Capture the Flag!");
}

fn place_flags() {
    // Place flag blocks (banners)
    setblock(RED_BASE_X, BASE_Y + 1, RED_BASE_Z, "minecraft:red_banner");
    setblock(BLUE_BASE_X, BASE_Y + 1, BLUE_BASE_Z, "minecraft:blue_banner");
    
    game.red_flag_taken = 0;
    game.blue_flag_taken = 0;
}
```

## Step 6: Flag Pickup

```mcrs
@tick
fn game_tick() {
    if (game.running == 1) {
        check_flag_pickup();
        check_flag_capture();
        check_win();
    }
}

fn check_flag_pickup() {
    // Blue team picking up red flag
    foreach (p in @a[team=blue]) {
        // Check if near red base and flag not taken
        execute if entity p[x=-52..-48, y=62..68, z=-2..2] run {
            if (game.red_flag_taken == 0) {
                game.red_flag_taken = 1;
                tag_add(p, "has_flag");
                
                // Remove flag block
                setblock(RED_BASE_X, BASE_Y + 1, RED_BASE_Z, "minecraft:air");
                
                announce("§9Blue Team §fpicked up the §cRed Flag§f!");
                
                // Glow effect so everyone can see
                glow(p, 9999);
            }
        }
    }
    
    // Red team picking up blue flag
    foreach (p in @a[team=red]) {
        execute if entity p[x=48..52, y=62..68, z=-2..2] run {
            if (game.blue_flag_taken == 0) {
                game.blue_flag_taken = 1;
                tag_add(p, "has_flag");
                setblock(BLUE_BASE_X, BASE_Y + 1, BLUE_BASE_Z, "minecraft:air");
                announce("§cRed Team §fpicked up the §9Blue Flag§f!");
                glow(p, 9999);
            }
        }
    }
}
```

## Step 7: Flag Capture

```mcrs
fn check_flag_capture() {
    // Blue team capturing red flag at blue base
    foreach (p in @a[team=blue, tag=has_flag]) {
        execute if entity p[x=45..55, y=62..68, z=-5..5] run {
            game.blue_score = game.blue_score + 1;
            
            announce(f"§9Blue Team §ascored! §f({game.blue_score}/{WIN_SCORE})");
            
            // Clear flag carrier status
            tag_remove(p, "has_flag");
            effect_clear(p, "minecraft:glowing");
            
            // Reset flags
            place_flags();
            
            happy(p);
        }
    }
    
    // Red team capturing blue flag at red base
    foreach (p in @a[team=red, tag=has_flag]) {
        execute if entity p[x=-55..-45, y=62..68, z=-5..5] run {
            game.red_score = game.red_score + 1;
            announce(f"§cRed Team §ascored! §f({game.red_score}/{WIN_SCORE})");
            tag_remove(p, "has_flag");
            effect_clear(p, "minecraft:glowing");
            place_flags();
            happy(p);
        }
    }
}
```

## Step 8: Win Condition

```mcrs
fn check_win() {
    if (game.red_score >= WIN_SCORE) {
        end_game("red");
    }
    if (game.blue_score >= WIN_SCORE) {
        end_game("blue");
    }
}

fn end_game(winner: string) {
    game.running = 0;
    
    if (winner == "red") {
        title(@a, "§cRed Team Wins!");
    } else {
        title(@a, "§9Blue Team Wins!");
    }
    
    // Cleanup
    foreach (p in @a[tag=has_flag]) {
        tag_remove(p, "has_flag");
        effect_clear(p);
    }
}
```

## Step 9: Flag Drop on Death

When a flag carrier dies, drop the flag:

```mcrs
fn on_player_death(player: selector) {
    // Check if they had the flag
    execute if entity player[tag=has_flag] run {
        let team: int = scoreboard_get(player, "ctf_team");
        
        if (team == 1) {
            // Red player had blue flag
            game.blue_flag_taken = 0;
            place_flags();
            announce("§9Blue Flag §freturned!");
        } else {
            // Blue player had red flag
            game.red_flag_taken = 0;
            place_flags();
            announce("§cRed Flag §freturned!");
        }
        
        tag_remove(player, "has_flag");
        effect_clear(player, "minecraft:glowing");
    }
}
```

## Complete Code

See the full example: [capture_the_flag.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/capture_the_flag.mcrs)

## Enhancements

- Add respawn system with cooldown
- Add class selection (faster runner, more damage, etc.)
- Add power-ups that spawn in the middle
- Add flag return timer (auto-return after 30 seconds)
