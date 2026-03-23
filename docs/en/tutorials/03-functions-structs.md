# Tutorial 03: Functions & Structs

<div class="tutorial-meta">
  <span class="difficulty intermediate">🟡 Intermediate</span>
  <span class="time">⏱️ 25 min</span>
</div>


**Difficulty:** Beginner  
**Time:** ~25 minutes  
**Prerequisites:** [Tutorial 02: Variables & Control Flow](./02-variables)

## What You'll Build

A boss health tracking system. A wither skeleton boss has 200 HP, and as it takes damage it transitions through three phases: Normal → Enraged (≤50% HP) → Dying (≤20% HP), with different announcements and a rewards drop on death.

## What You'll Learn

- `fn` with parameters and return values
- Using `struct` to group related data
- Field access with `.`
- Compound assignment (`state.hp = state.hp - 15`)
- Calling one function from another
- Early `return`

## Step 1: Define a Struct

A **struct** groups related variables into one named type:

```rs
struct BossState {
    max_hp: int,
    current_hp: int,
    phase: int,    // 1=normal, 2=enraged, 3=dying
    alive: int     // 0=dead, 1=alive
}

// Global instance — initialized with struct literal syntax
let boss: BossState = {
    max_hp: 200,
    current_hp: 200,
    phase: 1,
    alive: 0
}
```

Access fields with dot notation: `boss.current_hp`, `boss.phase`.

## Step 2: Helper Functions

Functions let you name a computation and reuse it:

```rs
// Returns a percentage (0-100) given current and max values
fn hp_percentage(current: int, max: int) -> int {
    if (max <= 0) {
        return 0
    }
    return current * 100 / max
}

// Determines which phase the boss is in
fn get_phase(current_hp: int, max_hp: int) -> int {
    let pct: int = hp_percentage(current_hp, max_hp)
    if (pct <= 20) { return 3 }
    if (pct <= 50) { return 2 }
    return 1
}

fn describe_phase(phase: int) -> string {
    if (phase == 1) { return "Normal" }
    if (phase == 2) { return "Enraged" }
    return "Dying"
}
```

Notice: `-> int` and `-> string` declare the return type. Use `return` to send a value back.

## Step 3: Spawn the Boss

```rs
@on_trigger("spawn_boss")
fn spawn_boss() {
    boss.max_hp = 200
    boss.current_hp = 200
    boss.phase = 1
    boss.alive = 1

    scoreboard_set("#boss", "boss_hp", boss.current_hp)
    summon("minecraft:wither_skeleton", 0, 64, 0)
    say("The Boss has appeared! HP: 200")
    title(@a, "BOSS FIGHT")
}
```

## Step 4: Damage the Boss

```rs
@on_trigger("damage_boss")
fn damage_boss() {
    if (boss.alive == 0) {
        tell(@s, "No boss is active!")
        return
    }

    let damage: int = 15
    boss.current_hp = boss.current_hp - damage
    if (boss.current_hp < 0) { boss.current_hp = 0 }

    // Check phase transition
    let new_phase: int = get_phase(boss.current_hp, boss.max_hp)
    if (new_phase != boss.phase) {
        boss.phase = new_phase
        let phase_name: string = describe_phase(boss.phase)
        announce(f"Boss entered phase {boss.phase}: {phase_name}!")
        title(@a, f"Phase {boss.phase}")
    }

    let pct: int = hp_percentage(boss.current_hp, boss.max_hp)
    announce(f"Boss HP: {boss.current_hp}/{boss.max_hp} ({pct}%)")

    if (boss.current_hp <= 0) {
        kill_boss()
    }
}
```

This function calls `get_phase()`, `hp_percentage()`, `describe_phase()`, and `kill_boss()` — composing small functions into bigger behaviour.

## Step 5: Death and Rewards

```rs
fn kill_boss() {
    boss.alive = 0
    kill(@e[type=minecraft:wither_skeleton])
    title(@a, "Boss Defeated!")

    // Reward all players
    foreach (p in @a) {
        give(p, "minecraft:diamond", 3)
        tell(p, "You earned 3 diamonds!")
    }
}
```

## Complete Code

Full example: [tutorial_03_functions_structs.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_03_functions_structs.mcrs)

## Try It Out

1. Install and `/reload`
2. Run `/trigger spawn_boss` — a wither skeleton appears
3. Run `/trigger damage_boss` multiple times
4. Watch the phase announcements at 50% and 20% HP
5. At 0 HP, all players receive diamonds

## Struct vs Scoreboard

Use a **struct** when you have multiple related values that change together (like a boss state). Use a **scoreboard** when you need a per-player value or need to interact with vanilla MC mechanics (like kill counts).

## Next Steps

→ [Tutorial 04: Selectors & Execute Context](./04-selectors-context)
