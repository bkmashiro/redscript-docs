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
| `--no-dce` | 禁用死代码消除 | `false` |
| `-O0` | 关闭优化 | `off` |
| `-O1` | 开启标准优化 | `on` |
| `-O2` | 开启激进优化 | `off` |
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

# 调试生成结果时关闭优化
redscript compile game.mcrs -O0

# 使用标准优化并打印统计信息
redscript compile game.mcrs -O1 --stats

# 保留其他优化，但关闭 DCE
redscript compile game.mcrs -O2 --no-dce
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

### upgrade

将 RedScript CLI 升级到 npm 上的最新版本。

```bash
redscript upgrade
```

```bash
redscript upgrade
# Upgrading redscript-mc to latest...
# ✓ Upgraded to 0.9.2
```

### generate-dts

生成 `builtins.d.mcrs` 声明文件，列出所有内置函数及其类型签名。可用作参考或工具集成。

```bash
redscript generate-dts [--output <file>]
```

```bash
# 输出到标准输出
redscript generate-dts

# 写入文件
redscript generate-dts --output builtins.d.mcrs
```

### version

显示版本信息。

```bash
redscript --version
```

## 自动更新检查

运行 `compile` 或 `check` 时，RedScript 会在后台检查是否有新版本。如果有更新，编译完成后会显示提示：

```
✓ Compiled successfully

💡 New version available: 0.9.2 (you have 0.9.1). Run `redscript upgrade` to update.
```

此检查在后台运行，不会影响编译速度。

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
