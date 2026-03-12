# 教程

通过构建实际项目来学习 RedScript 的完整游戏教程。

## 小游戏

| 教程 | 描述 | 核心概念 |
|-----|------|---------|
| [僵尸生存](./zombie-survival) | 带商店的波次生存 | 状态机、经济系统、Bossbar |
| [夺旗战](./capture-the-flag) | 两队 CTF | 队伍、旗帜机制、计分 |
| [跑酷竞速](./parkour-race) | 计时赛道带检查点 | 计时器、检查点、记录 |

## 你将学到

每个教程涵盖实用的游戏开发模式：

- **游戏状态** — 用 struct 组织复杂状态
- **阶段管理** — 大厅 → 倒计时 → 游戏中 → 结束
- **计分系统** — 记分板追踪分数、击杀、时间
- **队伍管理** — 创建和管理玩家队伍
- **用户界面** — Bossbar、动作栏、标题
- **事件检测** — 检测玩家行为（进入区域、死亡等）

## 前置知识

开始教程前，请先完成：

1. [快速开始](../guide/getting-started)
2. [变量与类型](../guide/variables)
3. [函数](../guide/functions) 和 [装饰器](../guide/decorators)

## 完整示例

所有教程代码可在仓库中找到：

- [zombie_survival.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/zombie_survival.mcrs)
- [capture_the_flag.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/capture_the_flag.mcrs)
- [parkour_race.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/parkour_race.mcrs)
- [hunger_games.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/hunger_games.mcrs)
