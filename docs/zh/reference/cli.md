# 命令行参考

RedScript 命令行工具用于将 `.mcrs` 文件编译为 Minecraft 数据包，并提供项目初始化、测试、lint、格式化和文档辅助命令。

## 安装

```bash
npm install -g redscript-mc
```

验证安装：

```bash
redscript --version
# 或
redscript version
```

## 命令

### compile

编译 RedScript 文件为 Minecraft 数据包。

```bash
redscript compile <file> [options]
```

**选项：**

| 选项 | 描述 | 默认值 |
|-----|------|-------|
| `-o, --output <path>` | 输出目录 | `./out` |
| `--namespace <ns>` | 数据包命名空间 | 从文件名推导 |
| `--source-map` | 在 `.mcfunction` 旁生成 `.sourcemap.json` | `false` |
| `--snapshot-stages <stages>` | 要记录快照的编译阶段，逗号分隔；也可用 `all` | — |
| `--snapshot-output <path>` | 将选中的编译阶段快照写入 JSON 文件 | — |
| `--mc-version <ver>` | 目标 Minecraft 版本，会影响代码生成特性 | `1.21` |
| `--lenient` | 将类型错误降级为 warning，不阻塞编译 | `false` |
| `--include <dir>` | 添加 import 搜索路径；可重复传入 | — |
| `--incremental` | 启用文件级增量编译缓存 | `false` |

**可快照阶段：** `preprocess`、`parse`、`typecheck`、`runtimeMetadata`、`lowerToHIR`、`lowerAndOptimize`、`runtimeAssets`、`finalizeRuntimeLIR`、`emitDatapack`，或 `all`。

**示例：**

```bash
# 基本编译
redscript compile hello.mcrs

# 指定输出目录和命名空间
redscript compile game.mcrs -o ./my-datapack --namespace minigame

# 针对旧 Minecraft 版本编译
redscript compile game.mcrs --mc-version 1.20.2

# 添加 import 搜索路径
redscript compile src/main.mcrs --include src/lib --include vendor/redscript

# 生成 source map
redscript compile game.mcrs --source-map

# 为调试/工具导出指定编译阶段摘要
redscript compile game.mcrs \
  --snapshot-stages parse,typecheck,runtimeAssets,emitDatapack \
  --snapshot-output .redscript/stages.json

# 导出所有可用阶段摘要
redscript compile game.mcrs --snapshot-stages all --snapshot-output stages.json
```

### publish

编译并打包为可直接放入 Minecraft 的 `.zip` 数据包。

```bash
redscript publish <file> [-o <out.zip>] [--namespace <ns>] [--mc-version <ver>]
```

```bash
redscript publish game.mcrs -o game.zip --namespace minigame
```

### watch

监听目录中的 `.mcrs` 文件变化，自动重新编译，并可选热重载测试服务器。

```bash
redscript watch <dir> [options]
```

**选项：**

| 选项 | 描述 |
|-----|------|
| `-o, --output <path>` | 输出目录 |
| `--namespace <ns>` | 数据包命名空间 |
| `--hot-reload <url>` | 编译成功后 POST 到 `<url>/reload` |
| `--include <dir>` | 添加 import 搜索路径；可重复传入 |
| `--incremental` | 启用文件级增量编译缓存 |

```bash
redscript watch ./src -o ./server/world/datapacks/my-game
redscript watch ./src -o ./datapacks/game --hot-reload http://localhost:25561
```

### test

编译并运行带 `@test` 标记的函数。

```bash
redscript test <file> [--dry-run] [--mc-url <url>]
```

```bash
# 只验证测试能否编译
redscript test tests/main.mcrs --dry-run

# 连接 TestHarness HTTP API 运行 live 测试
redscript test tests/main.mcrs --mc-url http://localhost:25561
```

### check

只检查错误，不生成数据包输出。

```bash
redscript check <file> [--fix]
```

```bash
redscript check game.mcrs
redscript check game.mcrs --fix
```

### lint

静态分析 RedScript 文件并报告 warning。

```bash
redscript lint <file> [--max-function-lines <n>]
```

```bash
redscript lint src/main.mcrs --max-function-lines 80
```

### init

创建新的 RedScript 数据包项目骨架。

```bash
redscript init [project-name]
```

```bash
redscript init my-minigame
```

### fmt

自动格式化 RedScript 源文件。

```bash
redscript fmt <file.mcrs> [file2.mcrs ...]
```

```bash
redscript fmt main.mcrs
redscript fmt src/*.mcrs
```

### generate-dts

生成 `builtins.d.mcrs` 声明文件，列出所有内置函数及其类型签名。可用作参考或工具集成。

```bash
redscript generate-dts [--output <file>]
# 也支持短参数：
redscript generate-dts -o builtins.d.mcrs
```

### docs

在浏览器中打开在线标准库文档。

```bash
redscript docs [module] [--list]
```

```bash
redscript docs --list
redscript docs math
```

### repl

启动交互式 RedScript REPL。

```bash
redscript repl
```

```
RedScript REPL
> let x = 5;
> say(f"Hello {x}");
say Hello 5
```

### version

显示版本信息。

```bash
redscript --version
redscript version
```

### upgrade

将 RedScript CLI 升级到 npm 上的最新版本。

```bash
redscript upgrade
```

## 输出目标

CLI 的主要输出是 Minecraft 数据包目录或 zip 包。典型数据包输出如下：

```
my-datapack/
├── data/
│   ├── minecraft/
│   │   └── tags/function/
│   │       ├── load.json
│   │       └── tick.json
│   └── my_namespace/
│       └── function/
│           ├── __load.mcfunction
│           ├── __tick.mcfunction
│           └── my_function.mcfunction
└── pack.mcmeta
```

如果需要可直接复制到世界 `datapacks/` 目录的 zip，请使用 `publish`。

## 退出码

| 代码 | 含义 |
|------|------|
| `0` | 成功 |
| `1` | 编译、检查、lint、测试失败，或 CLI 参数无效 |
