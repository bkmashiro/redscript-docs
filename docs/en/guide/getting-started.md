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

## Next Steps

- [Variables & Types](/en/guide/variables) — Learn about data types
- [Functions](/en/guide/functions) — Define reusable logic
- [Decorators](/en/guide/decorators) — `@tick`, `@load`, `@on_trigger`
