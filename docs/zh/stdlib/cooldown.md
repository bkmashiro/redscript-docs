# Cooldown

> 本文档由 `src/stdlib/cooldown.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [cooldown_start](#cooldown-start)
- [cooldown_ready](#cooldown-ready)
- [cooldown_tick](#cooldown-tick)

---

## `cooldown_start` <Badge type="info" text="v1.2.0" />

启动（或重启）指定槽位的冷却计时，持续 ticks 游戏刻。

```redscript
fn cooldown_start(name: string, ticks: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `name` | 冷却槽位标识符（保留，供未来多槽位使用） |
| `ticks` | 冷却持续时间（游戏刻，20 刻 = 1 秒） |

**返回：** 无返回值

**示例**

```redscript
cooldown_start("sword", 40); // 2-second cooldown
```

---

## `cooldown_ready` <Badge type="info" text="v1.2.0" />

检查冷却是否已到期（可再次触发）。

```redscript
fn cooldown_ready(name: string) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `name` | 冷却槽位标识符 |

**返回：** 1 表示已就绪（非活跃或剩余刻数 ≤ 0），0 表示仍在冷却

**示例**

```redscript
if (cooldown_ready("sword") == 1) { attack(); cooldown_start("sword", 40); }
```

---

## `cooldown_tick` <Badge type="info" text="v1.2.0" />

冷却计时推进一刻，须在 @tick 函数中每刻调用。剩余刻数归零时自动标记为非活跃。

```redscript
fn cooldown_tick(name: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `name` | 冷却槽位标识符 |

**返回：** 无返回值

**示例**

```redscript
@tick fn game_tick() { cooldown_tick("sword"); }
```

---
