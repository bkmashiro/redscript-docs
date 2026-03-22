# Bossbar

> 本文档由 `src/stdlib/bossbar.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [create_timer_bar](#create-timer-bar)
- [create_health_bar](#create-health-bar)
- [create_progress_bar](#create-progress-bar)
- [update_bar](#update-bar)
- [hide_bar](#hide-bar)
- [show_bar](#show-bar)
- [remove_bar](#remove-bar)
- [update_bar_color](#update-bar-color)

---

## `create_timer_bar`

创建一个对所有玩家可见的计时器 Bossbar，并以秒数初始化最大值和当前值

```redscript
fn create_timer_bar(id: string, name: string, max_seconds: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `id` | Bossbar 标识符，通常使用 `<namespace>:<name>` |
| `name` | Bossbar 显示名称 |
| `max_seconds` | 持续秒数，内部会转换为游戏刻 |

**示例**

```redscript
create_timer_bar("game:round", "Round Timer", 90)
```

---

## `create_health_bar`

创建一个红色血量风格 Bossbar，并以满值显示

```redscript
fn create_health_bar(id: string, name: string, max_val: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `id` | Bossbar 标识符 |
| `name` | Bossbar 显示名称 |
| `max_val` | 最大值，同时也是初始值 |

**示例**

```redscript
create_health_bar("raid:boss_hp", "Warden", 500)
```

---

## `create_progress_bar`

创建一个蓝色进度 Bossbar，初始值为 0

```redscript
fn create_progress_bar(id: string, name: string, max_val: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `id` | Bossbar 标识符 |
| `name` | Bossbar 显示名称 |
| `max_val` | 进度最大值 |

**示例**

```redscript
create_progress_bar("game:capture", "Capture", 100)
```

---

## `update_bar`

设置已有 Bossbar 的当前值

```redscript
fn update_bar(id: string, value: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `id` | Bossbar 标识符 |
| `value` | 新的当前值 |

---

## `hide_bar`

将已有 Bossbar 设为不可见

```redscript
fn hide_bar(id: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `id` | Bossbar 标识符 |

---

## `show_bar`

将已有 Bossbar 重新显示给已分配的玩家

```redscript
fn show_bar(id: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `id` | Bossbar 标识符 |

---

## `remove_bar`

彻底移除一个 Bossbar

```redscript
fn remove_bar(id: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `id` | Bossbar 标识符 |

---

## `update_bar_color`

根据百分比阈值更新 Bossbar 颜色

```redscript
fn update_bar_color(id: string, percent: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `id` | Bossbar 标识符 |
| `percent` | 预期为 0-100 的百分比值 |

---
