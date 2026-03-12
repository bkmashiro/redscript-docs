# Decorators

Decorators attach behavior to functions. They control **when** and **how** functions are called.

## @load

Runs once when the datapack loads (or on `/reload`):

```rs
@load
fn init() {
    say("Datapack loaded!");
    scoreboard_add("kills", "playerKillCount");
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

Runs when an entity dies:

```rs
@on_death
fn on_player_death() {
    say("A player has fallen!");
    scoreboard_add_score(@s, "deaths", 1);
}
```

## @on_join

Runs when a player joins the server:

```rs
@on_join
fn welcome() {
    title(@s, "Welcome!");
    tellraw(@s, "Type /trigger help for commands");
}
```

## @on_respawn

Runs when a player respawns:

```rs
@on_respawn
fn on_respawn() {
    effect(@s, "regeneration", 5, 2);
    tellraw(@s, "You have respawned!");
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

## How Decorators Work

Decorators compile to Minecraft's function tag system:

| Decorator | Compiles To |
|-----------|-------------|
| `@load` | `#minecraft:load` tag |
| `@tick` | `#minecraft:tick` tag |
| `@tick(rate=N)` | Schedule command with interval |
| `@on_trigger` | Trigger scoreboard detection |
| `@on_death` | Advancement-based detection |

## Next Steps

- [Structs & Enums](/en/guide/structs-enums) — Custom data types
- [Decorator Reference](/en/reference/decorators) — Complete decorator list
