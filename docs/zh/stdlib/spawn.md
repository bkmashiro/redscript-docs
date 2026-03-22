# Spawn

> 本文档由 `src/stdlib/spawn.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [teleport_to](#teleport-to)
- [teleport_to_entity](#teleport-to-entity)
- [spread_players](#spread-players)
- [gather_all](#gather-all)
- [launch_up](#launch-up)
- [goto_lobby](#goto-lobby)
- [goto_arena](#goto-arena)

---

## `teleport_to`

将目标选择器传送到固定坐标

```redscript
fn teleport_to(target: selector, x: int, y: int, z: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 要传送的目标选择器 |
| `x` | 目标 X 坐标 |
| `y` | 目标 Y 坐标 |
| `z` | 目标 Z 坐标 |

**示例**

```redscript
teleport_to(@p, 0, 64, 0)
```

---

## `teleport_to_entity`

将目标选择器传送到另一个实体当前位置

```redscript
fn teleport_to_entity(target: selector, dest: selector)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 要传送的目标选择器 |
| `dest` | 作为目的地的实体选择器 |

---

## `spread_players`

预留的随机分散玩家辅助函数；当前仅输出提示消息，尚未真正执行 spreadplayers

```redscript
fn spread_players(x: int, z: int, radius: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 中心点 X 坐标 |
| `z` | 中心点 Z 坐标 |
| `radius` | 最大分散半径（方块） |

---

## `gather_all`

将所有玩家传送到同一位置

```redscript
fn gather_all(x: int, y: int, z: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `x` | 目标 X 坐标 |
| `y` | 目标 Y 坐标 |
| `z` | 目标 Z 坐标 |

---

## `launch_up`

按相对坐标将目标向上抬升

```redscript
fn launch_up(target: selector, height: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 要传送的目标选择器 |
| `height` | 相对 Y 偏移（方块） |

---

## `goto_lobby`

将目标传送到内置大厅坐标，并显示欢迎标题

```redscript
fn goto_lobby(target: selector)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 要传送到大厅的目标选择器 |

---

## `goto_arena`

将目标传送到内置竞技场坐标，并显示开战标题

```redscript
fn goto_arena(target: selector)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 要传送到竞技场的目标选择器 |

---
