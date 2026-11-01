# 4.0 项目构建

本流程适用于 4.0 候选版本。CLI 和 compiler session API 已支持项目与包构建。

## 创建、查看与编译

```sh
redscript init demo
cd demo
redscript project . --format json
redscript compile src/main.mcrs
redscript graph . --capabilities --target pack --format json
```

脚手架会导出 `main`，注册加载函数和周期 heartbeat。默认数据包输出到 `dist/`。
20 TPS 下，`@tick(rate=20)` 的 heartbeat 每秒执行一次；直接调用该函数仍是普通调用。

生成的清单包含：

```toml
[project]
name = "demo"
module = "local/demo"
namespace = "demo"
mc-version = "1.21.4"
source-roots = ["src"]

[target.pack]
kind = "datapack"
entry = "local/demo::main"
out = "dist"
default = true
```

`module` 是规范包身份，`namespace` 控制生成的 Minecraft 资源 ID。
目标入口用 `::` 连接包路径和导出函数名，不应填成 Minecraft 函数 ID。

## 包与依赖

一个目录包可以包含多个 `.mcrs` 文件。函数导出构成公共接口，
`redscript declarations` 可生成不发射实现的 `.d.mcrs` 声明接口。
跨包公共 struct/enum 导出仍在路线图中。

本地依赖需要显式指定已经存在的模块项目：

```toml
[dependencies]
"example.com/shared" = { path = "../shared" }
```

路径相对于清单解析，依赖项目声明的模块身份必须与键匹配。
Git 依赖使用不可变缓存检出和 `redscript.lock`，通过 `redscript resolve .`
解析清单中声明的依赖。应提交 lockfile，避免只依赖会移动的远端分支。

## 目标与能力诊断

通过 `--target` 选择命名目标。`commands` 目标输出有限命令产物，而不是常驻数据包。
生命周期钩子、调度、递归等不兼容需求会被拒绝，并报告来源符号或调用链。
默认脚手架含生命周期钩子，不能直接当作有限命令示例；选择此后端前先检查
`graph --capabilities`。

## 当前边界

项目 compile、检查、依赖解析与能力图已使用包模型。
watch、`redscript test` 和 LSP 项目解析尚未全部完成相同迁移。
传统 stdlib 模块导入与项目包依赖链接也尚未完全统一。
请分别按[标准库示例](../stdlib/)和 [CLI 参考](../reference/cli)使用已支持的路径。
