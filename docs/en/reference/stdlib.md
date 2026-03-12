# Standard Library

RedScript includes a standard library with common utilities, including the v1.2 Timer OOP API and 313 Minecraft tag constants.

## Usage

```mcrs
import "stdlib/effects.mcrs"
import "stdlib/world.mcrs"

fn game_start() {
    set_day();
    weather_clear();
    buff_all(@a, 600);
}
```

## Modules

### math.mcrs

Basic math operations.

```mcrs
import "stdlib/math.mcrs"

fn example() {
    let a = abs(-5);        // 5
    let b = min(3, 7);      // 3
    let c = max(3, 7);      // 7
    let d = clamp(15, 0, 10); // 10
    let s = sign(-42);      // -1
}
```

| Function | Description |
|----------|-------------|
| `abs(x)` | Absolute value |
| `min(a, b)` | Minimum of two values |
| `max(a, b)` | Maximum of two values |
| `clamp(x, min, max)` | Clamp to range |
| `sign(x)` | Sign (-1, 0, or 1) |

### effects.mcrs

Effect shortcuts for common potion effects.

```mcrs
import "stdlib/effects.mcrs"

fn power_up() {
    speed(@p, 200, 2);      // Speed II for 10 seconds
    strength(@p, 200, 1);   // Strength I for 10 seconds
    regen(@p, 100, 0);      // Regen I for 5 seconds
}
```

| Function | Description |
|----------|-------------|
| `speed(target, duration, level)` | Speed effect |
| `jump(target, duration, level)` | Jump boost |
| `regen(target, duration, level)` | Regeneration |
| `resistance(target, duration, level)` | Resistance |
| `strength(target, duration, level)` | Strength |
| `invisible(target, duration)` | Invisibility |
| `night_vision(target, duration)` | Night vision |
| `slow_fall(target, duration)` | Slow falling |
| `glow(target, duration)` | Glowing |
| `clear_effects(target)` | Remove all effects |
| `buff_all(target, duration)` | Speed + strength + regen + resistance |

### world.mcrs

World and game rule utilities.

```mcrs
import "stdlib/world.mcrs"

@load
fn setup() {
    set_day();
    weather_clear();
    enable_keep_inventory();
    disable_mob_griefing();
}
```

**Time:**
- `set_day()`, `set_night()`, `set_noon()`, `set_midnight()`

**Weather:**
- `weather_clear()`, `weather_rain()`, `weather_thunder()`

**Gamerules:**
- `enable_keep_inventory()`, `disable_keep_inventory()`
- `disable_mob_griefing()`, `disable_fire_spread()`

**Difficulty:**
- `set_peaceful()`, `set_easy()`, `set_normal()`, `set_hard()`

**Building:**
- `barrier_wall(x1, y1, z1, x2, y2, z2)` — Create barrier wall
- `clear_area(x1, y1, z1, x2, y2, z2)` — Fill with air
- `glass_box(x1, y1, z1, x2, y2, z2)` — Hollow glass box

### inventory.mcrs

Inventory management.

```mcrs
import "stdlib/inventory.mcrs"

fn respawn_player(player: selector) {
    clear_inventory(player);
    give_kit_warrior(player);
}
```

| Function | Description |
|----------|-------------|
| `clear_inventory(target)` | Clear all items |
| `give_kit_warrior(target)` | Iron armor + sword + shield |
| `give_kit_archer(target)` | Bow + arrows + leather armor |
| `give_kit_mage(target)` | Potions + ender pearls |
| `remove_item(target, item)` | Remove specific item |

### cooldown.mcrs

Cooldown system using scoreboards.

```mcrs
import "stdlib/cooldown.mcrs"

fn use_ability() {
    if (is_on_cooldown(@s) == 0) {
        // Do ability
        say("Ability used!");
        cooldown_start(@s, 100);  // 5 second cooldown
    }
}

@tick
fn tick_cooldowns() {
    cooldown_tick();
}
```

### timer.mcrs

Timer utilities and the v1.2 object-style Timer API.

```mcrs
import "stdlib/timer.mcrs"

let timer = Timer::new(200);
timer.start();

@tick
fn update_timer() {
    timer.tick();

    if (timer.done()) {
        say("Time's up!");
    }
}
```

**Instance methods:**
- `Timer::new(duration)` — Create a new timer
- `timer.start()` — Start the timer
- `timer.tick()` — Advance the timer, usually once per tick
- `timer.done()` — Check whether it has finished
- `timer.pause()` — Pause without resetting progress
- `timer.reset()` — Reset progress to the initial duration

**Legacy functional API:**
- `timer_start(id, duration)`
- `timer_tick(id)`
- `timer_done(id)`

The object-style API is the recommended interface for new code. It works naturally with `impl` blocks and keeps timer state grouped with its behavior.

### Scheduling helpers

RedScript also includes callback-style timer helpers built on top of Minecraft scheduling.

```mcrs
setTimeout(100, () => {
    say("Delayed!");
});

let id = setInterval(20, () => {
    say("Repeating!");
});

clearInterval(id);
```

| Function | Description |
|----------|-------------|
| `setTimeout(delay, callback)` | Run a callback once after `delay` ticks |
| `setInterval(interval, callback)` | Run a callback repeatedly |
| `clearInterval(id)` | Cancel a repeating callback |

These helpers compile to generated functions scheduled with Minecraft's `schedule function` command.

### tags.mcrs

Minecraft tag constants for items, blocks, and entities.

```mcrs
import "stdlib/tags.mcrs"

fn mark_tools() {
    if (held_item_is(#minecraft_tools)) {
        say("Tool detected");
    }
}
```

RedScript v1.2 ships with 313 predefined tag constants so you can reference common tags without raw strings.

### player.mcrs

Player state helpers.

```mcrs
import "stdlib/player.mcrs"

fn heal_player() {
    heal(10);  // Add 10 health
}

fn check_admin() {
    if (is_op() == 1) {
        say("You are admin");
    }
}
```

### combat.mcrs

Combat utilities.

```mcrs
import "stdlib/combat.mcrs"

fn on_hit(target: selector) {
    apply_damage(target, 5);
    knockback(target, 2);
}
```

### mobs.mcrs

Mob spawning helpers.

```mcrs
import "stdlib/mobs.mcrs"

fn spawn_wave() {
    spawn_zombie(0, 64, 0);
    spawn_skeleton(5, 64, 0);
    spawn_creeper(-5, 64, 0);
}
```
