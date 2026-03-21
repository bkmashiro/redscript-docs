# `dialog` — Player dialog and messaging

Import: `import dialog;`

Helpers for displaying messages to players: chat messages, broadcast, coloured text, title/subtitle overlays, action bar text, and tab-list header/footer. Built on Minecraft's `tellraw`, `title`, and `actionbar` commands.

## Functions

### `dialog_say(p: selector, msg: string)`

Send a plain chat message to the targeted player(s).

**Example:**
```rs
import dialog;
dialog_say(@s, "Welcome to the arena!");
```

---

### `dialog_broadcast(msg: string)`

Send a chat message to **all** players on the server (`@a`).

**Example:**
```rs
import dialog;
dialog_broadcast("The round has started!");
```

---

### `dialog_say_color(p: selector, msg: string, color: int)`

Send a coloured chat message. `color` is an integer 0–4:

| Value | Colour |
|-------|--------|
| `0` | White (default) |
| `1` | Yellow |
| `2` | Red |
| `3` | Green |
| `4` | Aqua |

**Example:**
```rs
import dialog;
dialog_say_color(@s, "Warning: low health!", 2);   // red
dialog_say_color(@a, "You won!", 3);               // green
```

---

### `dialog_title(p: selector, title: string, subtitle: string)`

Display a title and subtitle overlay to the targeted player(s). Uses Minecraft's default fade-in/stay/fade-out timing.

**Example:**
```rs
import dialog;
dialog_title(@s, "Round 1", "Survive for 60 seconds");
```

---

### `dialog_title_clear(p: selector)`

Clear the title overlay immediately for the targeted player(s).

**Example:**
```rs
import dialog;
dialog_title_clear(@s);
```

---

### `dialog_actionbar(p: selector, msg: string)`

Display a message in the action bar (the area just above the hotbar). The message disappears after ~2 seconds unless refreshed every tick.

**Example:**
```rs
import dialog;
dialog_actionbar(@s, "HP: ${score(@s, #hp)} / 100");
```

---

## Full example

```rs
import dialog;
import state;

let STATE_WAITING: int = 0;
let STATE_PLAYING: int = 1;
let STATE_ENDED:   int = 2;

@load
fn on_load() {
    dialog_broadcast("Datapack loaded. Type /trigger start to begin.");
}

fn start_round(round: int) {
    dialog_broadcast("Round ${round} starting!");
    dialog_title(@a, "Round ${round}", "Fight!");
}

fn warn_low_hp() {
    dialog_say_color(@s, "Your health is critically low!", 2);
    dialog_actionbar(@s, "⚠ Low HP — heal up!");
}

fn end_round(winner: selector) {
    dialog_title_clear(@a);
    dialog_title(winner, "Victory!", "You won the round");
    dialog_broadcast("Round over!");
}
```
