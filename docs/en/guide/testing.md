# Testing with Paper Server

RedScript includes a Paper plugin for integration testing your datapacks on a real Minecraft server.

## Overview

```
Your Code (game.mcrs)
        ↓ compile
    Datapack
        ↓ install
  Paper 1.21.4 Server
        ↕ HTTP API (port 25561)
   Test Runner (Jest/Node.js)
```

## Setup

### 1. Install Paper Server

Download [Paper 1.21.4](https://papermc.io/downloads/paper) and set up a test server:

```bash
mkdir ~/mc-test-server
cd ~/mc-test-server
# Download paper.jar from papermc.io
java -Xmx1G -jar paper.jar --nogui
```

### 2. Configure Server

Edit `server.properties`:
```properties
online-mode=false
level-type=flat
difficulty=peaceful
spawn-npcs=false
spawn-monsters=false
```

Edit `bukkit.yml` for void world:
```yaml
worlds:
  world:
    generator: cleanroom:void
```

### 3. Install TestHarness Plugin

Download from [redscript-testharness](https://github.com/bkmashiro/redscript-testharness/releases) or build:

```bash
git clone https://github.com/bkmashiro/redscript-testharness
cd redscript-testharness
JAVA_HOME=/opt/homebrew/opt/openjdk@21 ./gradlew jar
cp build/libs/testharness-*.jar ~/mc-test-server/plugins/
```

### 4. Start Server

```bash
cd ~/mc-test-server
java -Xmx1G -jar paper.jar --nogui
```

The plugin starts an HTTP server on port 25561.

## HTTP API

### Status

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

### Scoreboard

```bash
# Get scoreboard value
curl "http://localhost:25561/scoreboard?player=\$count&obj=rs"
```
```json
{ "value": 42 }
```

### Block

```bash
curl "http://localhost:25561/block?x=0&y=64&z=0"
```
```json
{ "block": "minecraft:stone" }
```

### Run Command

```bash
curl -X POST http://localhost:25561/command \
  -H "Content-Type: application/json" \
  -d '{"cmd": "/function mypack:start"}'
```

### Wait Ticks

```bash
curl -X POST http://localhost:25561/tick \
  -H "Content-Type: application/json" \
  -d '{"count": 20}'
```

### Reset

Clear the test environment:

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

### Reload Datapacks

```bash
curl -X POST http://localhost:25561/reload
```

## Hot Reload

Use `--hot-reload` with `redscript watch` for instant reload:

```bash
redscript watch ./src -o ~/mc-test-server/world/datapacks/my-game \
  --hot-reload http://localhost:25561
```

Every time you save a `.mcrs` file:
1. RedScript recompiles
2. Sends POST to `/reload`
3. Server reloads datapacks
4. Changes appear in-game instantly

## Writing Tests (Jest)

```typescript
import { TestClient } from 'redscript-mc/mc-test/client'

const client = new TestClient('http://localhost:25561')

describe('My Datapack', () => {
  beforeAll(async () => {
    // Deploy datapack
    await deployDatapack('./dist', '~/mc-test-server/world/datapacks/test')
    await client.reload()
  })

  beforeEach(async () => {
    await client.reset({ resetScoreboards: true })
  })

  it('increments counter every second', async () => {
    await client.command('/function test:start')
    await client.tick(20) // Wait 1 second
    
    const count = await client.getScoreboard('$count', 'rs')
    expect(count).toBe(1)
  })
})
```

## Tips

### Void World

Use a void/flat world for faster startup and consistent tests.

### Force Load Chunks

The plugin automatically force-loads chunks around (0,0) so commands work even without players.

### Check TPS

If tests are flaky, check TPS:
```bash
curl http://localhost:25561/status | jq .tps_1m
```

Low TPS can cause timing issues.

### Debugging

Check chat log for errors:
```bash
curl "http://localhost:25561/chat?since=0"
```
