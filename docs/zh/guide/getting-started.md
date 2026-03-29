# 快速开始

本指南覆盖从安装到产出可运行数据包的最短路径。流程基于当前的 RedScript CLI：先生成项目脚手架，编辑 `src/main.mcrs`，编译到 `dist/`，最后加载到 Minecraft。

## 先在线试用

如果你想先快速体验语法而不安装任何工具，可以直接使用在线 IDE：

**[→ redscript-ide.pages.dev](https://redscript-ide.pages.dev)**

它适合快速实验；当你开始维护项目文件、反复编译和调试时，本地开发体验会更好。

## 安装工具链

### VS Code 插件

如果你使用 VS Code，推荐安装扩展以获得语法高亮、自动补全、悬停文档、错误提示、代码片段和跳转到定义：

1. 打开 VS Code
2. 打开扩展市场
3. 搜索 `RedScript`
4. 安装 [RedScript for VSCode](https://marketplace.visualstudio.com/items?itemName=bkmashiro.redscript-vscode)

### CLI

使用 npm 全局安装编译器：

```bash
npm install -g redscript-mc
```

确认命令可用：

```bash
redscript version
```

也可以查看完整命令列表：

```bash
redscript --help
```

## 创建项目

推荐直接使用内置脚手架开始：

```bash
mkdir hello-redscript
cd hello-redscript
redscript init
```

`redscript init` 会生成一个最小可运行项目，目录大致如下：

```text
hello-redscript/
├── src/main.mcrs
├── redscript.toml
├── redscript.config.json
├── README.md
└── .gitignore
```

其中最重要的是：

- `src/main.mcrs`：入口文件。
- `redscript.toml`：保存命名空间、目标 Minecraft 版本和输出目录等配置。
- `dist/`：脚手架默认使用的编译输出目录。

## 编写第一个程序

把 `src/main.mcrs` 替换成下面这个最小示例：

```rs
@load
fn setup(): void {
    say("Hello from RedScript!")
    say("Run /trigger welcome_kit")
}

@on_trigger("welcome_kit")
fn give_welcome_kit(): void {
    tell(@s, "Starter items incoming.")
    give(@s, "minecraft:bread", 16)
    give(@s, "minecraft:torch", 8)
}
```

这段代码包含了最常见的几个概念：

- `@load`：数据包加载或 `/reload` 时运行。
- `@on_trigger("welcome_kit")`：为玩家触发器生成逻辑。
- `tell()`：给当前玩家发送私聊消息。
- `give()`：给当前玩家发放物品。

如果你保留了 `hello-redscript` 这个目录名，脚手架会把它清洗成命名空间 `hello_redscript`。

## 编译数据包

在项目根目录执行：

```bash
redscript compile src/main.mcrs
```

因为 CLI 会读取 `redscript.toml`，所以这个命令会自动使用脚手架中的命名空间和输出目录。如果你想显式写出参数，等价命令是：

```bash
redscript compile src/main.mcrs -o dist --namespace hello_redscript
```

编译成功后，RedScript 会把 datapack 写入 `dist/`。

## 理解编译产物

编译输出是标准的 Minecraft datapack 目录。一个典型结构类似这样：

```text
dist/
├── pack.mcmeta
└── data/
    ├── minecraft/
    │   └── tags/
    │       └── function/
    │           ├── load.json
    │           └── tick.json
    └── hello_redscript/
        └── function/
            ├── load.mcfunction
            ├── setup.mcfunction
            └── give_welcome_kit.mcfunction
```

几个关键点：

- `pack.mcmeta`：Minecraft 用来识别 datapack 的入口文件。
- `data/<namespace>/function/*.mcfunction`：RedScript 编译出的函数文件。
- `load.mcfunction`：自动生成，用于运行时初始化，例如建立记分板目标。

## 安装到 Minecraft

把 `dist/` 里的内容复制到你的世界存档 `datapacks/` 目录下，并确保数据包根目录直接包含 `pack.mcmeta`。

例如：

```text
.minecraft/saves/<你的世界>/datapacks/hello_redscript/
├── pack.mcmeta
└── data/
```

然后进入世界执行：

```mcfunction
/reload
```

如果加载成功，`@load` 标记的 `setup()` 会执行，你会在聊天栏里看到对应消息。

## 运行第一个程序

`/reload` 之后，你可以这样验证：

1. 运行 `/trigger welcome_kit`
2. 确认自己收到了面包和火把
3. 如果需要，也可以直接调用生成的函数：`/function hello_redscript:give_welcome_kit`

如果编译或行为有问题，可以先做静态检查：

```bash
redscript check src/main.mcrs
```

这个命令只检查错误，不会生成输出文件。

## 编译流程是怎样的

日常开发时，最常见的循环是：

1. 编辑 `src/main.mcrs`
2. 运行 `redscript compile src/main.mcrs`
3. 把编译后的 `dist/` 同步到世界的 datapacks 目录
4. 在 Minecraft 里执行 `/reload`
5. 测试函数或触发器

项目变大以后，还可以使用：

- `redscript watch <dir>`：监听文件变更并自动重编译
- `redscript publish <file>`：把数据包打成 zip
- `redscript test <file>`：编译并运行 `@test` 函数

## 下一步

- [第一个数据包](/zh/guide/first-datapack) 查看更完整的端到端示例
- [变量与类型](/zh/guide/variables) 学习基础类型系统
- [函数](/zh/guide/functions) 学习如何组织可复用逻辑
- [装饰器](/zh/guide/decorators) 学习 `@load`、`@tick`、触发器等能力
