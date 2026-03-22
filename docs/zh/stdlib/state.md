# State

> 本文档由 `src/stdlib/state.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [get_state](#get-state)
- [set_state](#set-state)
- [is_state](#is-state)
- [init_state](#init-state)
- [transition](#transition)

---

## `get_state` <Badge type="info" text="Since v1.0.0" />

读取实体的当前状态值

```redscript
fn get_state(entity: selector) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `entity` | 目标实体选择器 |

**返回：** rs.state 中存储的状态值；未初始化时返回 -1

**示例**

```redscript
let s: int = get_state(@s)
```

---

## `set_state` <Badge type="info" text="Since v1.0.0" />

将状态值写入实体

```redscript
fn set_state(entity: selector, state: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `entity` | 目标实体选择器 |
| `state` | 要写入的整数状态常量 |

**示例**

```redscript
set_state(@s, 1)
```

---

## `is_state` <Badge type="info" text="Since v1.0.0" />

检查实体当前是否处于指定状态

```redscript
fn is_state(entity: selector, state: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `entity` | 目标实体选择器 |
| `state` | 要对比的整数状态常量 |

**返回：** 实体处于该状态返回 1，否则返回 0

**示例**

```redscript
if (is_state(@s, STATE_COMBAT) == 1) { /* per-tick combat logic */ }
```

---

## `init_state` <Badge type="info" text="Since v1.0.0" />

仅在实体未初始化时（得分为 -1）写入初始状态，避免覆盖进行中的状态

```redscript
fn init_state(entity: selector, initial: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `entity` | 目标实体选择器 |
| `initial` | 未初始化时写入的状态常量 |

**示例**

```redscript
init_state(@s, STATE_IDLE)
```

---

## `transition` <Badge type="info" text="Since v1.0.0" />

仅当实体处于 from 状态时执行受保护的状态转换

```redscript
fn transition(entity: selector, from: int, to: int) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `entity` | 目标实体选择器 |
| `from` | 所需的当前状态 |
| `to` | 目标状态 |

**返回：** 转换成功返回 1；实体不在 from 状态返回 0

**示例**

```redscript
let ok: int = transition(@s, STATE_IDLE, STATE_COMBAT)
```

---
