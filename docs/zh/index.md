---
layout: home
hero:
  name: RedScript
  text: Minecraft 数据包开发利器
  tagline: 一个编译到 Minecraft 数据包的类型化脚本语言
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/getting-started
    - theme: alt
      text: 在线试用
      link: https://redscript-ide.pages.dev
    - theme: alt
      text: GitHub
      link: https://github.com/bkmashiro/redscript
features:
  - icon: 🎯
    title: 类型安全
    details: 在编译期捕获错误，而不是进游戏后才发现。变量、函数、结构体和实体收窄都具备类型信息。
  - icon: ⚡
    title: 简洁语法
    details: 用 impl 块、方法、事件和 f-string 编写游戏逻辑，告别记分板面条代码。
  - icon: 🔧
    title: 运行时辅助
    details: Timer OOP API、setTimeout、setInterval 与持续扩展的标准库让玩法脚本更直接。
  - icon: 🚀
    title: 快速编译
    details: 通过包含死代码消除在内的优化流程快速编译项目，并保持高效迭代。
---


## RedScript 4.0

项目与包构建、原生向下取整整数运算、周期 `@tick(rate=N)` 和显式冷却状态已在 npm CLI 中提供。

- [项目构建流程](./guide/project-builds)
- [整数与生命周期迁移指南](https://github.com/bkmashiro/redscript/blob/v4.0.0/docs/MIGRATION_4.md)

在线 IDE 与编辑器扩展独立更新。使用本文档中的 4.0 功能时，请使用 npm CLI。
