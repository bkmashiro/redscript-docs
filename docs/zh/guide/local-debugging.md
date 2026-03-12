# 本地单人存档调试

在本地 Minecraft 世界中测试数据包，无需搭建服务器。

## 快速开始

### 1. 找到存档文件夹

| 平台 | 路径 |
|-----|------|
| Windows | `%APPDATA%\.minecraft\saves\<世界名>\datapacks\` |
| macOS | `~/Library/Application Support/minecraft/saves/<世界名>/datapacks/` |
| Linux | `~/.minecraft/saves/<世界名>/datapacks/` |

### 2. 编译到存档

```bash
# 直接编译到世界的 datapacks 文件夹
redscript compile game.mcrs -o ~/.minecraft/saves/测试世界/datapacks/my-game
```

### 3. 游戏内重载

在 Minecraft 中运行：
```
/reload
```

数据包已激活！

## 监听模式（半自动）

使用 `redscript watch` 保存时自动编译：

```bash
redscript watch ./src -o ~/Library/Application\ Support/minecraft/saves/测试世界/datapacks/my-game
```

每次改动后手动在游戏内执行 `/reload`。

::: tip
保持聊天框打开，输入好 `/reload`。保存代码后按 `↑ 回车` 即可重载。
:::

## 辅助脚本

创建 `dev.sh` 脚本方便操作：

```bash
#!/bin/bash
# dev.sh - 编译并提示

WORLD="测试世界"
PACK="my-game"
SAVES="$HOME/Library/Application Support/minecraft/saves"

redscript compile src/main.mcrs -o "$SAVES/$WORLD/datapacks/$PACK"

echo "✓ 编译完成！在 Minecraft 中执行 /reload"

# macOS: 播放提示音
afplay /System/Library/Sounds/Glass.aiff 2>/dev/null
```

```bash
chmod +x dev.sh
./dev.sh
```

## Windows 批处理脚本

```batch
@echo off
REM dev.bat - 编译到存档

set WORLD=测试世界
set PACK=my-game
set SAVES=%APPDATA%\.minecraft\saves

redscript compile src\main.mcrs -o "%SAVES%\%WORLD%\datapacks\%PACK%"

echo 完成！在 Minecraft 中执行 /reload
```

## 小技巧

### 创建测试世界

1. 新建一个创造模式世界
2. 开启作弊
3. 使用平坦/虚空世界加快加载
4. 命名为 "RedScript-Test" 之类

### 常用命令

```
/reload                           # 重载所有数据包
/datapack list                    # 列出已加载的数据包
/datapack enable "file/my-game"   # 启用数据包
/function my-game:start           # 运行函数
/gamerule sendCommandFeedback false  # 减少聊天刷屏
```

### 调试输出

添加调试信息追踪执行：

```mcrs
fn my_function() {
    say("[调试] my_function 被调用");
    
    let value: int = calculate_something();
    say("[调试] value = " + value);
    
    // ... 函数其余部分
}
```

### 检查函数是否存在

```
/function <Tab>
```

按 Tab 自动补全，确认函数已加载。

## 功能对比

| 功能 | 本地单人 | Paper 服务器 |
|-----|---------|-------------|
| 自动重载 | ❌ 手动 `/reload` | ✅ 热重载 |
| 等待 tick | ❌ 不支持 | ✅ API |
| 记分板查询 | ❌ 手动 | ✅ API |
| 自动化测试 | ❌ 不支持 | ✅ Jest 集成 |

需要自动化测试和热重载，请参阅 [Paper 服务器测试](./testing)。

## 快速参考

```bash
# macOS
redscript compile game.mcrs -o ~/Library/Application\ Support/minecraft/saves/测试世界/datapacks/game

# Windows (PowerShell)
redscript compile game.mcrs -o "$env:APPDATA\.minecraft\saves\测试世界\datapacks\game"

# Linux
redscript compile game.mcrs -o ~/.minecraft/saves/测试世界/datapacks/game
```
