# Your First Datapack

Let's build a complete **Kill Counter** datapack step by step. Players earn points for killing mobs, see their score on the sidebar, and get rewards at milestones.

## Step 1: Create the Project

Create a new file called `killcount.mcrs`:

```bash
mkdir kill-counter
cd kill-counter
touch killcount.mcrs
```

## Step 2: Define Variables

```rs
const REWARD_THRESHOLD: int = 10;
```

## Step 3: Setup on Load

Use `@load` to initialize scoreboards when the datapack loads:

```rs
@load
fn init() {
    scoreboard_add_objective("kills", "playerKillCount");
    scoreboard_add_objective("level", "dummy");
    scoreboard_display("sidebar", "kills");
    say("Kill Counter datapack loaded!");
}
```

## Step 4: Track Kills

Use `@tick` to check scores and give rewards:

```rs
@tick(rate=20)
fn check_rewards() {
    // Check if any player reached the threshold
    foreach (player in @a) {
        if (scoreboard_get(player, "kills") >= REWARD_THRESHOLD) {
            grant_reward(player);
        }
    }
}

fn grant_reward(player: selector) {
    // Give rewards
    give(player, "diamond", 1);
    effect(player, "regeneration", 10, 2);
    title(player, "Level Up!");

    // Increment level and reset kills
    scoreboard_add(player, "level", 1);
    scoreboard_set(player, "kills", 0);

    // Announce
    tellraw(@a, "${player} leveled up!");
}
```

## Step 5: Welcome New Players

```rs
@on_login
fn welcome(player: selector) {
    title(player, "Kill Counter");
    subtitle(player, "Kill mobs to earn rewards!");
    scoreboard_set(player, "kills", 0);
    scoreboard_set(player, "level", 0);
}
```

## Step 6: Death Messages

```rs
@on_death
fn on_death() {
    scoreboard_set(@s, "kills", 0);
    tellraw(@s, "You died! Kill count reset.");
}
```

## Complete Code

Here's the full `killcount.mcrs`:

```rs
const REWARD_THRESHOLD: int = 10;

@load
fn init() {
    scoreboard_add_objective("kills", "playerKillCount");
    scoreboard_add_objective("level", "dummy");
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
    scoreboard_add(player, "level", 1);
    scoreboard_set(player, "kills", 0);
    tellraw(@a, "${player} leveled up!");
}

@on_login
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

## Step 7: Compile

```bash
redscript compile killcount.mcrs -o ./kill-counter-pack
```

## Step 8: Install

1. Copy `kill-counter-pack` to your Minecraft world's `datapacks/` folder
2. In-game, run `/reload`
3. You should see "Kill Counter datapack loaded!" in chat

## Step 9: Test

1. Switch to survival mode: `/gamemode survival`
2. Spawn some mobs: `/summon zombie ~ ~ ~`
3. Kill mobs and watch your score on the sidebar
4. After 10 kills, you'll receive diamonds and a level up!

## What You Learned

- `@load` — Run code when the datapack loads
- `@tick(rate=N)` — Run code periodically
- `@on_login` / `@on_death` — React to player events
- Scoreboard functions — Track and display data
- `give` / `effect` / `title` — Interact with players

## Next Steps

- [Variables & Types](/en/guide/variables) — Deep dive into the type system
- [Decorators](/en/guide/decorators) — All available decorators
- [Built-in Functions](/en/reference/builtins) — Complete function reference
