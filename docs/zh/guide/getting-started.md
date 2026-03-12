# 快速开始

## 在线试用（无需安装）

最快的方式是使用在线 IDE：

**[→ redscript-ide.pages.dev](https://redscript-ide.pages.dev)**

写代码，实时看输出。无需安装任何东西。

## 安装 VSCode 插件

获得最佳开发体验：

1. 打开 VSCode
2. 在扩展中搜索 "RedScript"
3. 安装 [RedScript for VSCode](https://marketplace.visualstudio.com/items?itemName=bkmashiro.redscript-vscode)

功能：
- 语法高亮
- 50+ 内置函数自动补全
- 悬停文档
- 错误检查
- 代码片段

## 安装命令行工具

用于命令行编译：

```bash
npm install -g redscript-mc
```

验证安装：

```bash
redscript --version
```

## 第一个程序

创建文件 `hello.mcrs`：

```rs
@load
fn init() {
    say("Hello, RedScript!");
}
```

编译：

```bash
redscript compile hello.mcrs -o ./my-datapack
```

将 `my-datapack` 复制到 Minecraft 存档的 `datapacks` 文件夹，然后在游戏内运行 `/reload`。

## 下一步

- [变量与类型](/zh/guide/variables) — 学习数据类型
- [函数](/zh/guide/functions) — 定义可复用逻辑
- [装饰器](/zh/guide/decorators) — `@tick`, `@load`, `@on_trigger`
