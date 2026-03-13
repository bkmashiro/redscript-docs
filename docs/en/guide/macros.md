# Macro Functions

::: tip TL;DR
This is an internal implementation detail — **you don't need to understand it to use RedScript**. Everything "just works."

But if you're wondering: "Wait, Minecraft commands don't support variables in coordinates... how does this work?" — this chapter explains the magic behind the scenes.
:::

RedScript automatically uses MC 1.20.2+ function macros when needed, allowing runtime variables in positions that normally require compile-time literals (coordinates, entity types, etc.).

## The Problem

In vanilla Minecraft commands, certain values must be literals:

```mcfunction
# ❌ This doesn't work - coordinates can't be scoreboard values
teleport @s $x $y $z
```

## The Solution

RedScript automatically detects when you use variables in these positions and compiles to macro syntax:

```rs
fn spawn_at(x: int, y: int, z: int) {
    summon("minecraft:zombie", x, y, z);
}

// Call with runtime values
let px: int = get_player_x();
spawn_at(px, 64, 100);
```

**Compiles to:**
```mcfunction
# spawn_at.mcfunction
$summon minecraft:zombie $(x) $(y) $(z)

# At call site:
execute store result storage rs:macro_args x int 1 run scoreboard players get $px rs
data modify storage rs:macro_args y set value 64
data modify storage rs:macro_args z set value 100
function ns:spawn_at with storage rs:macro_args
```

## Automatic Optimization

RedScript is smart about when to use macros:

```rs
spawn_at(100, 64, 200);   // All constants → inline directly, no macro
spawn_at(px, 64, pz);     // Has variables → uses macro
```

## Supported Builtins

**All builtin functions support macro parameters.** Any argument can be a runtime variable:

```rs
fn dynamic_say(msg: string) {
    say(msg);  // Works!
}

fn dynamic_effect(eff: string, dur: int) {
    effect(@s, eff, dur, 1);  // Works!
}

fn dynamic_setblock(x: int, y: int, z: int, block: string) {
    setblock(x, y, z, block);  // Works!
}
```

This includes `say`, `tell`, `give`, `effect`, `summon`, `teleport`, `particle`, `setblock`, `fill`, `clone`, `playsound`, `weather`, `time_set`, `gamerule`, `tag_add`, `tag_remove`, and all other builtins.

## Relative Coordinate Offsets (`~ident`)

You can use a variable as a **relative coordinate offset** with the `~varname` syntax:

```rs
fn launch_up(target: selector, height: int) {
    tp(target, ~0, ~height, ~0);   // relative by 'height' blocks on Y axis
}
```

::: warning Why this requires macros
Minecraft's `~N` syntax only accepts a **literal number** at N. There is no command that reads a scoreboard value as a relative offset.

`~height` means *"relative by height blocks from current position"* — fundamentally different from `height` as an absolute coordinate. The only way to express this at the MC level is to substitute the value into the literal command text, which is exactly what 1.20.2+ function macros do.

**Without macros, this would be impossible.** You'd have to pre-compute the absolute Y and pass that instead (losing the relative semantics).
:::

**Compiles to:**
```mcfunction
$tp $(target) ~0 ~$(height) ~0
```

Called with `function ns:launch_up with storage rs:macro_args` — the macro substitutes the value of `height` into the tilde offset at runtime.

## Example: Dynamic Teleportation

```rs
struct Waypoint {
    x: int,
    y: int,
    z: int
}

fn tp_to_waypoint(wp: Waypoint) {
    teleport(@s, wp.x, wp.y, wp.z);
}

@keep fn go_home() {
    let home: Waypoint = { x: 100, y: 64, z: -200 };
    tp_to_waypoint(home);
}
```

## Example: Particle Grid

```rs
fn spawn_particle_at(x: int, y: int, z: int) {
    particle("minecraft:flame", x, y, z, 0, 0, 0, 0, 1);
}

@keep fn draw_grid() {
    for (let i: int = 0; i < 10; i = i + 1) {
        for (let j: int = 0; j < 10; j = j + 1) {
            spawn_particle_at(i * 2, 64, j * 2);
        }
    }
}
```

## Requirements

- Minecraft 1.20.2 or later (function macros were added in this version)
- Earlier versions will not work with macro-compiled functions

## How It Works

1. **Detection**: During compilation, RedScript scans function bodies
2. **Marking**: Parameters used in literal-requiring positions are marked
3. **Generation**: Marked functions generate `$` prefixed commands
4. **Call sites**: Variable arguments are passed via NBT storage

This is all automatic - you don't need any special syntax or decorators.

## Next Steps

- [Variables & Types](/en/guide/variables) — Data types and declarations
- [Functions](/en/guide/functions) — Function definitions
