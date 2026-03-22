# Dialog

> 本文档由 `src/stdlib/dialog.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [dialog_say](#dialog-say)
- [dialog_broadcast](#dialog-broadcast)
- [dialog_say_color](#dialog-say-color)
- [dialog_title](#dialog-title)
- [dialog_title_clear](#dialog-title-clear)
- [dialog_actionbar](#dialog-actionbar)

---

## `dialog_say`

向玩家或选择器发送一条纯白色聊天消息

```redscript
fn dialog_say(p: selector, msg: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `p` | 接收者选择器 |
| `msg` | 纯文本消息内容 |

**示例**

```redscript
dialog_say(@p, "Quest updated")
```

---

## `dialog_broadcast`

向所有玩家广播一条纯白色聊天消息

```redscript
fn dialog_broadcast(msg: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `msg` | 纯文本消息内容 |

---

## `dialog_say_color`

向玩家或选择器发送带颜色的聊天消息，未知颜色值会回退为白色

```redscript
fn dialog_say_color(p: selector, msg: string, color: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `p` | 接收者选择器 |
| `msg` | 纯文本消息内容 |
| `color` | 颜色编号（0=white, 1=red, 2=green, 3=gold, 4=aqua） |

---

## `dialog_title`

在玩家屏幕上显示标题和副标题

```redscript
fn dialog_title(p: selector, title: string, subtitle: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `p` | 接收者选择器 |
| `title` | 主标题文本 |
| `subtitle` | 副标题文本 |

---

## `dialog_title_clear`

清除目标当前显示的标题

```redscript
fn dialog_title_clear(p: selector)
```

**参数**

| 参数 | 说明 |
|------|------|
| `p` | 接收者选择器 |

---

## `dialog_actionbar`

在玩家动作栏显示一条短消息

```redscript
fn dialog_actionbar(p: selector, msg: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `p` | 接收者选择器 |
| `msg` | 纯文本消息内容 |

---
