# Interactions

> 本文档由 `src/stdlib/interactions.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [interactions_init](#interactions-init)
- [on_right_click](#on-right-click)
- [example_right_click](#example-right-click)
- [is_sneaking](#is-sneaking)
- [on_sneak_start](#on-sneak-start)
- [check_look_up](#check-look-up)
- [check_look_down](#check-look-down)
- [check_look_straight](#check-look-straight)
- [check_holding_item](#check-holding-item)
- [on_sneak_click](#on-sneak-click)
- [DOUBLE_TAP_WINDOW](#double-tap-window)
- [on_double_sneak](#on-double-sneak)

---

## `interactions_init`

初始化本模块所需的计分板目标 `rs.click`、`rs.sneak` 和 `rs.attack`

```redscript
fn interactions_init()
```

---

## `on_right_click`

使用 `rs.click` 计分板检测右键，并给检测到的玩家添加 `rs.clicked` 标签

```redscript
fn on_right_click(callback_fn: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `callback_fn` | 预留的回调标识，当前实现尚未使用 |

---

## `example_right_click`

演示如何直接消费 `rs.click` 计分板并在右键时广播消息

```redscript
fn example_right_click()
```

---

## `is_sneaking`

检查目标当前是否处于潜行状态

```redscript
fn is_sneaking(target: selector) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 要检查的玩家选择器 |

**返回：** 潜行时返回 `1`，否则返回 `0`

---

## `on_sneak_start`

检测玩家是否在当前 tick 开始潜行，并维护 `rs.sneak_start` 标签

```redscript
fn on_sneak_start()
```

---

## `check_look_up`

检测玩家是否抬头，并为满足条件者添加 `rs.look_up` 标签

```redscript
fn check_look_up()
```

---

## `check_look_down`

检测玩家是否低头，并为满足条件者添加 `rs.look_down` 标签

```redscript
fn check_look_down()
```

---

## `check_look_straight`

检测玩家是否平视，并为满足条件者添加 `rs.look_straight` 标签

```redscript
fn check_look_straight()
```

---

## `check_holding_item`

预留的手持物检测辅助函数；当前仅输出提示，真实检测需配合谓词或 NBT 检查

```redscript
fn check_holding_item(item_id: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `item_id` | 期望的物品 ID 或逻辑键名 |

---

## `on_sneak_click`

检测“潜行 + 右键”组合输入，并添加 `rs.sneak_click` 或 `rs.clicked` 标签

```redscript
fn on_sneak_click()
```

---

## `DOUBLE_TAP_WINDOW`

双击潜行判定窗口，单位为游戏刻

```redscript
const DOUBLE_TAP_WINDOW: int = 10;  // 0.5 second
```

---

## `on_double_sneak`

检测双击潜行；要求调用方自行维护 `rs.last_sneak` 和 `rs.tick`

```redscript
fn on_double_sneak()
```

---
