# Decorators

Decorators attach behavior to functions. They control **when** and **how** functions are called.

## @load

Runs once when the datapack loads (or on `/reload`):

```rs
@load
fn init() {
    say("Datapack loaded!");
    scoreboard_add_objective("kills", "playerKillCount");
}
```

## @tick

Runs every game tick (20 times per second):

```rs
@tick
fn check_health() {
    foreach (player in @a) {
        if (scoreboard_get(player, "health") <= 5) {
            effect(player, "glowing", 1, 1);
        }
    }
}
```

### @tick(rate=N)

Runs every N ticks instead of every tick:

```rs
@tick(rate=20)
fn every_second() {
    say("One second passed");
}

@tick(rate=100)
fn every_five_seconds() {
    actionbar(@a, "Server running");
}
```

## @on_trigger

Runs when a player triggers a scoreboard trigger:

```rs
@on_trigger("shop")
fn open_shop() {
    tellraw(@s, "Welcome to the shop!");
}
```

Players trigger it in-game with:
```
/trigger shop
```

## @on_death

Runs when an entity dies (advancement-based detection):

```rs
@on_death
fn on_player_death() {
    say("A player has fallen!");
    scoreboard_add(@s, "deaths", 1);
}
```

## @on_login

Runs when a player logs in (joins) the server:

```rs
@on_login
fn welcome() {
    title(@s, "Welcome!");
    tellraw(@s, "Type /trigger help for commands");
}
```

## @on_advancement

Runs when a player earns a specific advancement:

```rs
@on_advancement("story/mine_diamond")
fn got_diamonds() {
    tellraw(@s, "You found diamonds!");
}
```

## @on_craft

Runs when a player crafts a specific item:

```rs
@on_craft("minecraft:diamond_sword")
fn crafted_sword() {
    tellraw(@s, "You crafted a diamond sword!");
}
```

## @on_join_team

Runs when a player joins a specific team:

```rs
@on_join_team("red")
fn joined_red() {
    title(@s, "Red Team");
    effect(@s, "speed", 200, 1);
}
```

## @on(EventType)

Handles a static event. The supported event types are:

| Event | Description |
|-------|-------------|
| `PlayerDeath` | A player dies |
| `PlayerJoin` | A player joins the server |
| `BlockBreak` | A player breaks a block |
| `EntityKill` | A player kills an entity |
| `ItemUse` | A player uses an item |

```rs
@on(PlayerDeath)
fn handle_death(player: selector) {
    say("A player has died!");
}

@on(PlayerJoin)
fn handle_join() {
    title(@s, "Welcome!");
}
```

## @keep

Prevents the dead code elimination (DCE) optimizer from removing a function. By default, functions whose names start with `_` are treated as private/internal and may be removed if unreachable. Use `@keep` to force them to be retained:

```rs
@keep
fn _internal_helper() {
    // Won't be removed even though it starts with _
}
```

## Combining Decorators

A function can have multiple decorators:

```rs
@load
@tick(rate=200)
fn scoreboard_display() {
    // Runs on load AND every 10 seconds
    sidebar_set("Kills", @a, "kills");
}
```

## DCE and Private Functions

RedScript's dead code elimination (DCE) optimizer automatically removes unreachable functions. The visibility rules are:

- Functions **not** starting with `_` are **public** — always emitted as callable via `/function`
- Functions starting with `_` are **private** — only kept if called from somewhere or decorated with `@keep`
- Decorated functions (`@tick`, `@load`, `@on_*`, etc.) are always kept regardless of name

## How Decorators Work

Decorators compile to Minecraft's function tag system:

| Decorator | Compiles To |
|-----------|-------------|
| `@load` | `#minecraft:load` tag |
| `@tick` | `#minecraft:tick` tag |
| `@tick(rate=N)` | Schedule command with interval |
| `@on_trigger("x")` | Trigger scoreboard detection |
| `@on_death` | Advancement-based death detection |
| `@on_login` | Tag-based join detection |
| `@on_advancement("id")` | Advancement reward function |
| `@on_craft("item")` | Advancement inventory_changed detection |
| `@on_join_team("team")` | Team join detection |
| `@on(EventType)` | Event tag polling per tick |

## Next Steps

- [Structs & Enums](/en/guide/structs-enums) — Custom data types
- [Decorator Reference](/en/reference/decorators) — Complete decorator list
