# Cooldown

> 本文档由 `src/stdlib/cooldown.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [cooldown_start](#cooldown-start)
- [cooldown_ready](#cooldown-ready)
- [cooldown_remaining](#cooldown-remaining)

---

## `cooldown_start` <Badge type="info" text="v4.0.0" />

计算由调用者保存的冷却到期刻，不创建全局状态，也不注册每刻更新。

```redscript
fn cooldown_start(now: int, ticks: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `now` | 当前非负、单调时钟的刻数，与到期刻属于同一时钟周期 |
| `ticks` | 持续刻数，非正数立即就绪 |

**返回：** 到期刻；溢出时饱和到有符号 32 位整数上限

**示例**

```redscript
let sword_ready_at: int = cooldown_start(now, 40);
```

---

## `cooldown_ready` <Badge type="info" text="v4.0.0" />

检查调用者保存的到期刻是否已达到；新建或重置为零的状态立即就绪。

```redscript
fn cooldown_ready(ready_at: int, now: int) -> bool
```

**参数**

| 参数 | 说明 |
|------|------|
| `ready_at` | 调用者保存的技能或实体到期刻 |
| `now` | 同一时钟周期中的当前刻数 |

**返回：** 已达到到期刻时为 true，否则为 false

---

## `cooldown_remaining` <Badge type="info" text="v4.0.0" />

计算剩余冷却刻数，已到期时返回零。

```redscript
fn cooldown_remaining(ready_at: int, now: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `ready_at` | 调用者保存的到期刻 |
| `now` | 同一时钟周期中的当前刻数 |

**返回：** 非负的剩余刻数

---
