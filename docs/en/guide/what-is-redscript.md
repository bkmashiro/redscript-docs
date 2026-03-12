# What is RedScript?

RedScript is a **typed scripting language** that compiles to Minecraft datapacks.

## The Problem

Making a Minecraft mini-game with vanilla commands is painful:

- 40+ `.mcfunction` files
- Hundreds of `execute if score` commands
- No type checking — errors only show in-game
- Copy-paste everywhere — no reusable functions

## The Solution

With RedScript, you write clean, typed code:

```rs
let countdown: int = 60;

@tick(rate=20)
fn every_second() {
    countdown = countdown - 1;
    actionbar(@a, "Time: ${countdown}s");
    
    if (countdown <= 0) {
        end_game();
    }
}

fn end_game() {
    title(@a, "Game Over!");
}
```

RedScript compiles this to optimized `.mcfunction` files automatically.

## Features

| Feature | Description |
|---------|-------------|
| **Types** | `int`, `string`, `bool`, `float`, arrays, structs, enums |
| **Functions** | Parameters, return values, default arguments |
| **Decorators** | `@tick`, `@load`, `@on_trigger`, `@on_death` |
| **Selectors** | Full MC selector support: `@a[tag=vip,distance=..10]` |
| **NBT** | Structured NBT parameters for give/summon |
| **Lambda** | Higher-order functions and closures |

## How It Works

```
hello.mcrs → RedScript Compiler → Datapack/
                                   ├── data/
                                   │   └── hello/
                                   │       └── function/
                                   │           ├── __load.mcfunction
                                   │           ├── __tick.mcfunction
                                   │           └── every_second.mcfunction
                                   └── pack.mcmeta
```

## Next Steps

Ready to try it? → [Getting Started](/en/guide/getting-started)
