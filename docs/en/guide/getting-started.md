# Getting Started

## Try Online (No Install)

The fastest way to try RedScript is our online IDE:

**[→ redscript-ide.pages.dev](https://redscript-ide.pages.dev)**

Write code, see output instantly. No installation required.

## Install VSCode Extension

For the best development experience:

1. Open VSCode
2. Search for "RedScript" in Extensions
3. Install [RedScript for VSCode](https://marketplace.visualstudio.com/items?itemName=bkmashiro.redscript-vscode)

Features:
- Syntax highlighting
- Auto-complete for 50+ built-in functions
- Hover documentation
- Error checking
- Code snippets
- **Go-to-definition** (F12) for all built-in functions

## Install CLI

For command-line compilation:

```bash
npm install -g redscript-mc
```

Verify installation:

```bash
redscript --version
```

## Your First Program

Create a file called `hello.mcrs`:

```rs
@load
fn init() {
    say("Hello, RedScript!");
}
```

Compile it:

```bash
redscript compile hello.mcrs -o ./my-datapack
```

Copy `my-datapack` to your Minecraft world's `datapacks` folder, then run `/reload` in-game.

## A More Complete Example

Here's a particle demo that shows state management, tick functions, and player iteration:

```rs
// particle_demo.mcrs
let counter: int = 0;
let running: bool = false;

@tick fn demo_tick() {
    if (!running) { return; }
    counter = counter + 1;
    
    // Spawn particles at each player's position
    foreach (p in @a) at @s {
        particle("minecraft:end_rod", ~0, ~1, ~0, 0.5, 0.5, 0.5, 0.1, 5);
    }
    
    if (counter % 20 == 0) {
        say(f"Running for {counter} ticks");
    }
}

@keep fn start() {
    running = true;
    counter = 0;
    say(f"Demo started!");
}

@keep fn stop() {
    running = false;
    say(f"Demo stopped at {counter} ticks.");
}
```

In-game commands:
- `/function particle_demo:start` — Start the particle effect
- `/function particle_demo:stop` — Stop it

## Next Steps

- [Variables & Types](/en/guide/variables) — Learn about data types
- [Functions](/en/guide/functions) — Define reusable logic
- [Decorators](/en/guide/decorators) — `@tick`, `@load`, `@on_trigger`
