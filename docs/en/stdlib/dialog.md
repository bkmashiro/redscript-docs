# Dialog

> Auto-generated from `src/stdlib/dialog.mcrs` — do not edit manually.

## API

- [dialog_say](#dialog-say)
- [dialog_broadcast](#dialog-broadcast)
- [dialog_say_color](#dialog-say-color)
- [dialog_title](#dialog-title)
- [dialog_title_clear](#dialog-title-clear)
- [dialog_actionbar](#dialog-actionbar)

---

## `dialog_say`

Sends a plain white chat message to a player or selector.

```redscript
fn dialog_say(p: selector, msg: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `p` | Recipient selector |
| `msg` | Plain text message content |

**Example**

```redscript
dialog_say(@p, "Quest updated")
```

---

## `dialog_broadcast`

Broadcasts a plain white chat message to all players.

```redscript
fn dialog_broadcast(msg: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `msg` | Plain text message content |

---

## `dialog_say_color`

Sends a colored chat message to a player or selector.
Color mapping: `0=white`, `1=red`, `2=green`, `3=gold`, `4=aqua`.
Any other value falls back to white.

```redscript
fn dialog_say_color(p: selector, msg: string, color: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `p` | Recipient selector |
| `msg` | Plain text message content |
| `color` | Color selector integer |

---

## `dialog_title`

Displays a title and subtitle on a player's screen.

```redscript
fn dialog_title(p: selector, title: string, subtitle: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `p` | Recipient selector |
| `title` | Large title text |
| `subtitle` | Subtitle text shown below the title |

---

## `dialog_title_clear`

Clears any currently displayed title for the target selector.

```redscript
fn dialog_title_clear(p: selector)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `p` | Recipient selector |

---

## `dialog_actionbar`

Displays a short message in the player's actionbar.

```redscript
fn dialog_actionbar(p: selector, msg: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `p` | Recipient selector |
| `msg` | Plain text message content |

---
