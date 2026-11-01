---
layout: home
hero:
  name: RedScript
  text: Minecraft Datapacks Made Easy
  tagline: A typed scripting language that compiles to Minecraft datapacks
  actions:
    - theme: brand
      text: Get Started
      link: /en/guide/getting-started
    - theme: alt
      text: Try Online
      link: https://redscript-ide.pages.dev
    - theme: alt
      text: GitHub
      link: https://github.com/bkmashiro/redscript
features:
  - icon: 🎯
    title: Type Safe
    details: Catch errors at compile time, not in-game. Variables, functions, structs, and entity narrowing are fully typed.
  - icon: ⚡
    title: Clean Syntax
    details: Write game logic with impl blocks, methods, events, and f-strings instead of scoreboard spaghetti.
  - icon: 🔧
    title: Runtime Helpers
    details: Timer OOP APIs, setTimeout, setInterval, and a growing standard library accelerate datapack gameplay logic.
  - icon: 🚀
    title: Fast Compilation
    details: Compile your project with optimizer passes including dead code elimination, then iterate quickly with tooling support.
---


## RedScript 4.0

Project/package builds, native floor integer arithmetic, periodic `@tick(rate=N)`
and explicit cooldown state are available in the npm CLI.

- [Project build workflow](./guide/project-builds)
- [Integer and lifecycle migration](https://github.com/bkmashiro/redscript/blob/v4.0.0/docs/MIGRATION_4.md)

The online IDE and editor extensions update independently. Use the npm CLI for
the 4.0 features documented here.
