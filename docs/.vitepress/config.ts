import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'RedScript',
  description: 'A typed scripting language for Minecraft datapacks',
  
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
                { text: 'Built-in Functions', link: '/en/reference/builtins' },
                { text: 'Standard Library', link: '/en/reference/stdlib' },
                { text: 'Decorators', link: '/en/reference/decorators' },
                { text: 'CLI', link: '/en/reference/cli' },
              ]
            }
          ],
          '/en/tutorials/': [
            {
              text: 'Tutorials',
              items: [
                { text: 'Overview', link: '/en/tutorials/' },
                { text: 'Zombie Survival', link: '/en/tutorials/zombie-survival' },
                { text: 'Capture the Flag', link: '/en/tutorials/capture-the-flag' },
                { text: 'Parkour Race', link: '/en/tutorials/parkour-race' },
              ]
            }
          ]
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
                { text: '内置函数', link: '/zh/reference/builtins' },
                { text: '标准库', link: '/zh/reference/stdlib' },
                { text: '装饰器', link: '/zh/reference/decorators' },
                { text: '命令行', link: '/zh/reference/cli' },
              ]
            }
          ],
          '/zh/tutorials/': [
            {
              text: '教程',
              items: [
                { text: '概览', link: '/zh/tutorials/' },
                { text: '僵尸生存', link: '/zh/tutorials/zombie-survival' },
                { text: '夺旗战', link: '/zh/tutorials/capture-the-flag' },
                { text: '跑酷竞速', link: '/zh/tutorials/parkour-race' },
              ]
            }
          ]
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
