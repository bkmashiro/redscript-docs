# 命令行参考

RedScript 命令行工具，用于将 `.mcrs` 文件编译为数据包。

## 安装

```bash
npm install -g redscript-mc
```

验证安装：

```bash
redscript --version
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
| `--namespace <ns>` | 数据包命名空间 | 文件名 |
| `--target <target>` | 输出目标：`datapack`、`cmdblock`、`structure` | `datapack` |
| `--output-nbt <file>` | 输出 .nbt 文件路径（structure 目标用） | — |
| `--stats` | 打印优化器统计信息 | `false` |

**示例：**

```bash
# 基本编译
redscript compile hello.mcrs

# 指定输出目录
redscript compile hello.mcrs -o ./my-datapack

# 设置命名空间
redscript compile game.mcrs --namespace minigame

# 生成命令方块结构
redscript compile game.mcrs --target structure --output-nbt game.nbt
```

### watch

监听文件变化，自动重新编译。

```bash
redscript watch <dir> [options]
```

**选项：**

| 选项 | 描述 |
|-----|------|
| `-o, --output <path>` | 输出目录 |
| `--namespace <ns>` | 数据包命名空间 |
| `--hot-reload <url>` | 编译后 POST 到 `<url>/reload` |

**示例：**

```bash
# 监听并重新编译
redscript watch ./src -o ./server/world/datapacks/my-game

# 带热重载（需要 redscript-testharness）
redscript watch ./src -o ./datapacks/game --hot-reload http://localhost:25561
```

### check

只检查类型错误，不生成输出。

```bash
redscript check <file>
```

```bash
redscript check game.mcrs
# ✓ 无错误
```

### fmt

自动格式化 RedScript 源文件。

```bash
redscript fmt <file.mcrs> [file2.mcrs ...]
```

```bash
# 格式化单个文件
redscript fmt main.mcrs

# 格式化多个文件
redscript fmt src/*.mcrs
```

### repl

启动交互式 RedScript REPL。

```bash
redscript repl
```

```
RedScript REPL
> let x = 5;
> say("Hello ${x}");
say Hello 5
> 
```

### version

显示版本信息。

```bash
redscript --version
```

## 输出目标

### datapack（默认）

生成完整的 Minecraft 数据包：

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

### cmdblock

生成命令方块放置工具用的 JSON。

### structure

生成包含命令方块的 Minecraft `.nbt` 结构文件。

```bash
redscript compile game.mcrs --target structure --output-nbt game.nbt
```

## 退出码

| 退出码 | 含义 |
|-------|------|
| `0` | 成功 |
| `1` | 编译错误 |
| `2` | 文件未找到 |
