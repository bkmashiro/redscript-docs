# Paper 服务器测试

RedScript 包含一个 Paper 插件，用于在真实 Minecraft 服务器上集成测试数据包。

## 概览

```
你的代码 (game.mcrs)
        ↓ 编译
    数据包
        ↓ 安装
  Paper 1.21.4 服务器
        ↕ HTTP API (端口 25561)
   测试运行器 (Jest/Node.js)
```

## 配置

### 1. 安装 Paper 服务器

下载 [Paper 1.21.4](https://papermc.io/downloads/paper) 并配置测试服务器：

```bash
mkdir ~/mc-test-server
cd ~/mc-test-server
# 从 papermc.io 下载 paper.jar
java -Xmx1G -jar paper.jar --nogui
```

### 2. 配置服务器

编辑 `server.properties`：
```properties
online-mode=false
level-type=flat
difficulty=peaceful
spawn-npcs=false
spawn-monsters=false
```

编辑 `bukkit.yml` 创建虚空世界：
```yaml
worlds:
  world:
    generator: cleanroom:void
```

### 3. 安装 TestHarness 插件

从 [redscript-testharness](https://github.com/bkmashiro/redscript-testharness/releases) 下载或自行构建：

```bash
git clone https://github.com/bkmashiro/redscript-testharness
cd redscript-testharness
JAVA_HOME=/opt/homebrew/opt/openjdk@21 ./gradlew jar
cp build/libs/testharness-*.jar ~/mc-test-server/plugins/
```

### 4. 启动服务器

```bash
cd ~/mc-test-server
java -Xmx1G -jar paper.jar --nogui
```

插件会在端口 25561 启动 HTTP 服务。

## HTTP API

### 状态

```bash
curl http://localhost:25561/status
```
```json
{
  "online": true,
  "tps_1m": 20.0,
  "players": 0,
  "version": "1.21.4"
}
```

### 记分板

```bash
# 获取记分板值
curl "http://localhost:25561/scoreboard?player=\$count&obj=rs"
```
```json
{ "value": 42 }
```

### 方块

```bash
curl "http://localhost:25561/block?x=0&y=64&z=0"
```
```json
{ "block": "minecraft:stone" }
```

### 执行命令

```bash
curl -X POST http://localhost:25561/command \
  -H "Content-Type: application/json" \
  -d '{"cmd": "/function mypack:start"}'
```

### 等待 tick

```bash
curl -X POST http://localhost:25561/tick \
  -H "Content-Type: application/json" \
  -d '{"count": 20}'
```

### 重置

清理测试环境：

```bash
curl -X POST http://localhost:25561/reset \
  -H "Content-Type: application/json" \
  -d '{
    "clearArea": true,
    "x1": -50, "y1": 0, "z1": -50,
    "x2": 50, "y2": 100, "z2": 50,
    "killEntities": true,
    "resetScoreboards": true
  }'
```

### 重载数据包

```bash
curl -X POST http://localhost:25561/reload
```

## 热重载

使用 `--hot-reload` 配合 `redscript watch` 实现即时重载：

```bash
redscript watch ./src -o ~/mc-test-server/world/datapacks/my-game \
  --hot-reload http://localhost:25561
```

每次保存 `.mcrs` 文件：
1. RedScript 重新编译
2. 发送 POST 到 `/reload`
3. 服务器重载数据包
4. 更改立即生效

## 编写测试 (Jest)

```typescript
import { TestClient } from 'redscript-mc/mc-test/client'

const client = new TestClient('http://localhost:25561')

describe('我的数据包', () => {
  beforeAll(async () => {
    // 部署数据包
    await deployDatapack('./dist', '~/mc-test-server/world/datapacks/test')
    await client.reload()
  })

  beforeEach(async () => {
    await client.reset({ resetScoreboards: true })
  })

  it('每秒增加计数器', async () => {
    await client.command('/function test:start')
    await client.tick(20) // 等待 1 秒
    
    const count = await client.getScoreboard('$count', 'rs')
    expect(count).toBe(1)
  })
})
```

## 提示

### 虚空世界

使用虚空/平坦世界加快启动速度，保证测试一致性。

### 强制加载区块

插件会自动强制加载 (0,0) 附近的区块，即使没有玩家也能执行命令。

### 检查 TPS

如果测试不稳定，检查 TPS：
```bash
curl http://localhost:25561/status | jq .tps_1m
```

低 TPS 可能导致计时问题。

### 调试

查看聊天日志排查错误：
```bash
curl "http://localhost:25561/chat?since=0"
```
