# Bossbar

> Auto-generated from `src/stdlib/bossbar.mcrs` — do not edit manually.

## API

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

Creates a visible timer bossbar for all players.
The bossbar max and current value are initialized to `max_seconds * 20`
so callers can update it directly in game ticks.

```redscript
fn create_timer_bar(id: string, name: string, max_seconds: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `id` | Bossbar identifier, usually `<namespace>:<name>` |
| `name` | Display name shown on the bossbar |
| `max_seconds` | Duration in seconds; converted to ticks internally |

**Example**

```redscript
create_timer_bar("game:round", "Round Timer", 90)
```

---

## `create_health_bar`

Creates a visible red bossbar initialized at full value.
Useful for boss HP or shared health objectives.

```redscript
fn create_health_bar(id: string, name: string, max_val: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `id` | Bossbar identifier, usually `<namespace>:<name>` |
| `name` | Display name shown on the bossbar |
| `max_val` | Maximum value and initial value of the bar |

**Example**

```redscript
create_health_bar("raid:boss_hp", "Warden", 500)
```

---

## `create_progress_bar`

Creates a visible blue progress bossbar starting at zero.
Useful for charge bars, capture progress, or phase tracking.

```redscript
fn create_progress_bar(id: string, name: string, max_val: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `id` | Bossbar identifier, usually `<namespace>:<name>` |
| `name` | Display name shown on the bossbar |
| `max_val` | Maximum progress value |

**Example**

```redscript
create_progress_bar("game:capture", "Capture", 100)
```

---

## `update_bar`

Sets the current value of an existing bossbar.
RedScript does not clamp the value; Minecraft handles display behavior.

```redscript
fn update_bar(id: string, value: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `id` | Bossbar identifier |
| `value` | New current value |

---

## `hide_bar`

Hides an existing bossbar from all assigned players.

```redscript
fn hide_bar(id: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `id` | Bossbar identifier |

---

## `show_bar`

Shows an existing bossbar to all assigned players.

```redscript
fn show_bar(id: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `id` | Bossbar identifier |

---

## `remove_bar`

Removes an existing bossbar entirely.
After removal, the same `id` must be recreated before reuse.

```redscript
fn remove_bar(id: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `id` | Bossbar identifier |

---

## `update_bar_color`

Updates the bossbar color from a percentage threshold.
Values above 66 use green, above 33 use yellow, otherwise red.

```redscript
fn update_bar_color(id: string, percent: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `id` | Bossbar identifier |
| `percent` | Percentage in the expected 0-100 range |

---
