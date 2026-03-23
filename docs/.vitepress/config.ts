import { defineConfig } from 'vitepress'
import { readFileSync } from 'fs'
import { resolve } from 'path'

export default defineConfig({
  title: 'RedScript',
  description: 'A typed scripting language for Minecraft datapacks',

  markdown: {
    languages: [
      {
        ...JSON.parse(readFileSync(resolve(__dirname, 'languages/mcfunction.tmLanguage.json'), 'utf-8')),
        name: 'mcfunction',
        aliases: ['mcf'],
      },
      {
        ...JSON.parse(readFileSync(resolve(__dirname, 'languages/mcrs.tmLanguage.json'), 'utf-8')),
        name: 'mcrs',
        aliases: ['rs'],
      },
      {
        ...JSON.parse(readFileSync(resolve(__dirname, 'redscript.tmLanguage.json'), 'utf-8')),
        name: 'redscript',
        aliases: ['rds'],
      }
    ]
  },

  locales: {
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/getting-started' },
          { text: 'Tutorials', link: '/en/tutorials/' },
          { text: 'Reference', link: '/en/reference/syntax' },
          { text: 'Advanced', link: '/en/advanced/optimization' },
          { text: 'Standard Library', link: '/en/stdlib/' },
          { text: 'Dev Log', link: '/en/blog/' },
          { text: 'Online IDE', link: 'https://redscript-ide.pages.dev' },
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Introduction',
              items: [
                { text: 'What is RedScript?', link: '/en/guide/what-is-redscript' },
                { text: 'Getting Started', link: '/en/guide/getting-started' },
                { text: 'Your First Datapack', link: '/en/guide/first-datapack' },
              ]
            },
            {
              text: 'Core Concepts',
              items: [
                { text: 'Variables & Types', link: '/en/guide/variables' },
                { text: 'Strings', link: '/en/guide/strings' },
                { text: 'Functions', link: '/en/guide/functions' },
                { text: 'Decorators', link: '/en/guide/decorators' },
                { text: 'Structs & Enums', link: '/en/guide/structs-enums' },
                { text: 'Impl Blocks', link: '/en/guide/impl-blocks' },
              ]
            },
            {
              text: 'Advanced',
              items: [
                { text: 'Lambdas', link: '/en/guide/lambdas' },
                { text: 'Macro Functions', link: '/en/guide/macros' },
                { text: 'NBT Data', link: '/en/guide/nbt' },
                { text: 'Selectors', link: '/en/guide/selectors' },
                { text: 'Entity Types', link: '/en/guide/entity-types' },
                { text: 'Static Events', link: '/en/guide/events' },
              ]
            },
            {
              text: 'Testing & Debugging',
              items: [
                { text: 'Local Debugging', link: '/en/guide/local-debugging' },
                { text: 'Testing with Paper', link: '/en/guide/testing' },
              ]
            }
          ],
          '/en/reference/': [
            {
              text: 'Reference',
              items: [
                { text: 'Syntax', link: '/en/reference/syntax' },
                { text: 'Type System Guide', link: '/en/reference/types' },
                { text: 'Error Messages Guide', link: '/en/reference/errors' },
                { text: 'Built-in Functions', link: '/en/reference/builtins' },
                { text: 'Standard Library', link: '/en/reference/stdlib' },
                { text: 'Decorators', link: '/en/reference/decorators' },
                { text: 'CLI', link: '/en/reference/cli' },
              ]
            }
          ],
          '/en/advanced/': [
            {
              text: 'Advanced',
              items: [
                { text: 'Optimization', link: '/en/advanced/optimization' },
                { text: 'Module System', link: '/en/advanced/module-system' },
                { text: 'Decorators', link: '/en/advanced/decorators' },
              ]
            }
          ],
          '/en/tutorials/': [
            {
              text: 'Overview',
              items: [
                { text: 'All Tutorials', link: '/en/tutorials/' },
              ]
            },
            {
              text: 'Beginner Series',
              items: [
                { text: '01 — Getting Started', link: '/en/tutorials/01-getting-started' },
                { text: '02 — Variables and Types', link: '/en/tutorials/02-variables-and-types' },
                { text: '03 — Control Flow', link: '/en/tutorials/03-control-flow' },
                { text: '04 — Functions', link: '/en/tutorials/04-functions' },
                { text: '05 — Structs and Enums', link: '/en/tutorials/05-structs-and-enums' },
                { text: '06 — Stdlib Tour', link: '/en/tutorials/06-stdlib-tour' },
                { text: '07 — Events and Ticks', link: '/en/tutorials/07-events-and-ticks' },
                { text: '08 — Advanced', link: '/en/tutorials/08-advanced' },
              ]
            },
            {
              text: 'Project Tutorials',
              items: [
                { text: '01 — Hello World', link: '/en/tutorials/01-hello-world' },
                { text: '02 — Variables & Control Flow', link: '/en/tutorials/02-variables' },
                { text: '03 — Functions & Structs', link: '/en/tutorials/03-functions-structs' },
                { text: '04 — Selectors & Execute Context', link: '/en/tutorials/04-selectors-context' },
                { text: '05 — Decorators & Scheduling', link: '/en/tutorials/05-decorators' },
                { text: '06 — Math & Particles', link: '/en/tutorials/06-stdlib-math' },
                { text: '07 — Random & Noise', link: '/en/tutorials/07-stdlib-random' },
                { text: '08 — Coroutines', link: '/en/tutorials/08-coroutines' },
                { text: '09 — Precision Arithmetic', link: '/en/tutorials/09-precision-arithmetic' },
                { text: '10 — Full Game: Kill Race', link: '/en/tutorials/10-full-game' },
              ]
            },
            {
              text: 'Mini-Games',
              items: [
                { text: 'Zombie Survival', link: '/en/tutorials/zombie-survival' },
                { text: 'Capture the Flag', link: '/en/tutorials/capture-the-flag' },
                { text: 'Parkour Race', link: '/en/tutorials/parkour-race' },
              ]
            }
          ],
          '/en/blog/': [
            {
              text: 'Dev Log',
              items: [
                { text: 'All Posts', link: '/en/blog/' },
                { text: 'v2.5.0 — Double Precision & Stdlib', link: '/en/blog/v2-5-0-double-precision' },
              ]
            }
          ],
          '/en/stdlib/': [
            { text: 'Standard Library', items: [{ text: 'Overview', link: '/en/stdlib/' }] },
            { text: 'Mathematics', items: [
              { text: 'math', link: '/en/stdlib/math' },
              { text: 'math_hp', link: '/en/stdlib/math_hp' },
              { text: 'bits', link: '/en/stdlib/bits' },
              { text: 'bigint', link: '/en/stdlib/bigint' },
              { text: 'calculus', link: '/en/stdlib/calculus' },
            ]},
            { text: 'Data Structures', items: [
              { text: 'list', link: '/en/stdlib/list' },
              { text: 'sets', link: '/en/stdlib/sets' },
              { text: 'matrix', link: '/en/stdlib/matrix' },
              { text: 'vec', link: '/en/stdlib/vec' },
              { text: 'quaternion', link: '/en/stdlib/quaternion' },
            ]},
            { text: 'Randomness & Statistics', items: [
              { text: 'random', link: '/en/stdlib/random' },
              { text: 'noise', link: '/en/stdlib/noise' },
            ]},
            { text: 'Signal Processing', items: [
              { text: 'signal', link: '/en/stdlib/signal' },
              { text: 'expr', link: '/en/stdlib/expr' },
            ]},
            { text: 'Geometry & Graphics', items: [
              { text: 'geometry', link: '/en/stdlib/geometry' },
              { text: 'advanced', link: '/en/stdlib/advanced' },
              { text: 'parabola', link: '/en/stdlib/parabola' },
              { text: 'easing', link: '/en/stdlib/easing' },
              { text: 'particles', link: '/en/stdlib/particles' },
              { text: 'color', link: '/en/stdlib/color' },
            ]},
            { text: 'Physics', items: [
              { text: 'physics', link: '/en/stdlib/physics' },
            ]},
            { text: 'Minecraft Mechanics', items: [
              { text: 'player', link: '/en/stdlib/player' },
              { text: 'mobs', link: '/en/stdlib/mobs' },
              { text: 'combat', link: '/en/stdlib/combat' },
              { text: 'effects', link: '/en/stdlib/effects' },
              { text: 'spawn', link: '/en/stdlib/spawn' },
              { text: 'interactions', link: '/en/stdlib/interactions' },
              { text: 'inventory', link: '/en/stdlib/inventory' },
              { text: 'bossbar', link: '/en/stdlib/bossbar' },
              { text: 'cooldown', link: '/en/stdlib/cooldown' },
              { text: 'state', link: '/en/stdlib/state' },
              { text: 'timer', link: '/en/stdlib/timer' },
              { text: 'tags', link: '/en/stdlib/tags' },
              { text: 'teams', link: '/en/stdlib/teams' },
              { text: 'strings', link: '/en/stdlib/strings' },
              { text: 'world', link: '/en/stdlib/world' },
            ]},
          ],
        }
      }
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '指南', link: '/zh/guide/getting-started' },
          { text: '教程', link: '/zh/tutorials/' },
          { text: '参考', link: '/zh/reference/syntax' },
          { text: '进阶', link: '/zh/advanced/optimization' },
          { text: '标准库', link: '/zh/stdlib/' },
          { text: '开发日志', link: '/zh/blog/' },
          { text: '在线 IDE', link: 'https://redscript-ide.pages.dev' },
        ],
        sidebar: {
          '/zh/guide/': [
            {
              text: '介绍',
              items: [
                { text: 'RedScript 是什么？', link: '/zh/guide/what-is-redscript' },
                { text: '快速开始', link: '/zh/guide/getting-started' },
                { text: '第一个数据包', link: '/zh/guide/first-datapack' },
              ]
            },
            {
              text: '核心概念',
              items: [
                { text: '变量与类型', link: '/zh/guide/variables' },
                { text: '字符串', link: '/zh/guide/strings' },
                { text: '函数', link: '/zh/guide/functions' },
                { text: '装饰器', link: '/zh/guide/decorators' },
                { text: '结构体与枚举', link: '/zh/guide/structs-enums' },
                { text: 'impl 块', link: '/zh/guide/impl-blocks' },
              ]
            },
            {
              text: '进阶',
              items: [
                { text: 'Lambda 表达式', link: '/zh/guide/lambdas' },
                { text: '宏函数', link: '/zh/guide/macros' },
                { text: 'NBT 数据', link: '/zh/guide/nbt' },
                { text: '选择器', link: '/zh/guide/selectors' },
                { text: '实体类型', link: '/zh/guide/entity-types' },
                { text: '静态事件', link: '/zh/guide/events' },
              ]
            },
            {
              text: '测试与调试',
              items: [
                { text: '本地调试', link: '/zh/guide/local-debugging' },
                { text: 'Paper 服务器测试', link: '/zh/guide/testing' },
              ]
            }
          ],
          '/zh/reference/': [
            {
              text: '参考',
              items: [
                { text: '语法', link: '/zh/reference/syntax' },
                { text: '类型系统指南', link: '/zh/reference/types' },
                { text: '错误信息指南', link: '/zh/reference/errors' },
                { text: '内置函数', link: '/zh/reference/builtins' },
                { text: '标准库', link: '/zh/reference/stdlib' },
                { text: '装饰器', link: '/zh/reference/decorators' },
                { text: '命令行', link: '/zh/reference/cli' },
              ]
            }
          ],
          '/zh/advanced/': [
            {
              text: '进阶',
              items: [
                { text: '优化器', link: '/zh/advanced/optimization' },
                { text: '模块系统', link: '/zh/advanced/module-system' },
                { text: '装饰器', link: '/zh/advanced/decorators' },
              ]
            }
          ],
          '/zh/tutorials/': [
            {
              text: '入门系列',
              items: [
                { text: '概览', link: '/zh/tutorials/' },
                { text: '01 — 快速开始', link: '/zh/tutorials/01-getting-started' },
                { text: '02 — 变量与类型', link: '/zh/tutorials/02-variables-and-types' },
                { text: '03 — 控制流', link: '/zh/tutorials/03-control-flow' },
                { text: '04 — 函数', link: '/zh/tutorials/04-functions' },
                { text: '05 — 结构体与枚举', link: '/zh/tutorials/05-structs-and-enums' },
                { text: '06 — 标准库速览', link: '/zh/tutorials/06-stdlib-tour' },
                { text: '07 — 事件与 Tick', link: '/zh/tutorials/07-events-and-ticks' },
                { text: '08 — 进阶主题', link: '/zh/tutorials/08-advanced' },
              ]
            },
            {
              text: '项目型教程',
              items: [
                { text: '01 — Hello World', link: '/zh/tutorials/01-hello-world' },
                { text: '02 — 变量与控制流', link: '/zh/tutorials/02-variables' },
                { text: '03 — 函数与结构体', link: '/zh/tutorials/03-functions-structs' },
                { text: '04 — 选择器与上下文', link: '/zh/tutorials/04-selectors-context' },
                { text: '05 — 装饰器与调度', link: '/zh/tutorials/05-decorators' },
                { text: '06 — 数学与粒子', link: '/zh/tutorials/06-stdlib-math' },
                { text: '07 — 随机数与噪声', link: '/zh/tutorials/07-stdlib-random' },
                { text: '08 — 协程', link: '/zh/tutorials/08-coroutines' },
                { text: '09 — 精确算术', link: '/zh/tutorials/09-precision-arithmetic' },
                { text: '10 — 完整游戏：击杀竞赛', link: '/zh/tutorials/10-full-game' },
              ]
            }
          ],
          '/zh/blog/': [
            {
              text: '开发日志',
              items: [
                { text: '全部文章', link: '/zh/blog/' },
                { text: 'v2.5.0 — 双精度浮点与标准库', link: '/zh/blog/v2-5-0-double-precision' },
              ]
            }
          ],
          '/zh/stdlib/': [
            { text: '标准库', items: [{ text: '概览', link: '/zh/stdlib/' }] },
            { text: '数学', items: [
              { text: 'math', link: '/zh/stdlib/math' },
              { text: 'math_hp', link: '/zh/stdlib/math_hp' },
              { text: 'bits', link: '/zh/stdlib/bits' },
              { text: 'bigint', link: '/zh/stdlib/bigint' },
              { text: 'calculus', link: '/zh/stdlib/calculus' },
            ]},
            { text: '数据结构', items: [
              { text: 'list', link: '/zh/stdlib/list' },
              { text: 'sets', link: '/zh/stdlib/sets' },
              { text: 'matrix', link: '/zh/stdlib/matrix' },
              { text: 'vec', link: '/zh/stdlib/vec' },
              { text: 'quaternion', link: '/zh/stdlib/quaternion' },
            ]},
            { text: '随机数与统计', items: [
              { text: 'random', link: '/zh/stdlib/random' },
              { text: 'noise', link: '/zh/stdlib/noise' },
            ]},
            { text: '信号处理', items: [
              { text: 'signal', link: '/zh/stdlib/signal' },
              { text: 'expr', link: '/zh/stdlib/expr' },
            ]},
            { text: '几何与图形', items: [
              { text: 'geometry', link: '/zh/stdlib/geometry' },
              { text: 'advanced', link: '/zh/stdlib/advanced' },
              { text: 'parabola', link: '/zh/stdlib/parabola' },
              { text: 'easing', link: '/zh/stdlib/easing' },
              { text: 'particles', link: '/zh/stdlib/particles' },
              { text: 'color', link: '/zh/stdlib/color' },
            ]},
            { text: '物理', items: [
              { text: 'physics', link: '/zh/stdlib/physics' },
            ]},
            { text: 'Minecraft 游戏机制', items: [
              { text: 'player', link: '/zh/stdlib/player' },
              { text: 'mobs', link: '/zh/stdlib/mobs' },
              { text: 'combat', link: '/zh/stdlib/combat' },
              { text: 'effects', link: '/zh/stdlib/effects' },
              { text: 'spawn', link: '/zh/stdlib/spawn' },
              { text: 'interactions', link: '/zh/stdlib/interactions' },
              { text: 'inventory', link: '/zh/stdlib/inventory' },
              { text: 'bossbar', link: '/zh/stdlib/bossbar' },
              { text: 'cooldown', link: '/zh/stdlib/cooldown' },
              { text: 'state', link: '/zh/stdlib/state' },
              { text: 'timer', link: '/zh/stdlib/timer' },
              { text: 'tags', link: '/zh/stdlib/tags' },
              { text: 'teams', link: '/zh/stdlib/teams' },
              { text: 'strings', link: '/zh/stdlib/strings' },
              { text: 'world', link: '/zh/stdlib/world' },
            ]},
          ],
        }
      }
    }
  },

  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/bkmashiro/redscript' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 bkmashiro'
    },
    search: {
      provider: 'local'
    }
  }
})
