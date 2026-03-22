# Interactions

> Auto-generated from `src/stdlib/interactions.mcrs` — do not edit manually.

## API

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

Initializes the scoreboard objectives used by this module.
Call once during pack setup before any per-tick interaction checks.
Creates `rs.click`, `rs.sneak`, and `rs.attack`.

```redscript
fn interactions_init()
```

---

## `on_right_click`

Detects right-click input using the `rs.click` scoreboard.
Players with a positive click count are reset and tagged with `rs.clicked`.
The `callback_fn` parameter is reserved for future callback dispatch and is
not used by the current implementation.

```redscript
fn on_right_click(callback_fn: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `callback_fn` | Reserved callback identifier, currently unused |

---

## `example_right_click`

Demonstrates how to consume `rs.click` directly.
Broadcasts a message when a player right-clicks and resets the click count.

```redscript
fn example_right_click()
```

---

## `is_sneaking`

Returns whether the target is currently sneaking.
This checks whether `rs.sneak` is greater than zero.

```redscript
fn is_sneaking(target: selector) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Player selector to inspect |

**Returns:** `1` if sneaking, otherwise `0`

---

## `on_sneak_start`

Tags players who started sneaking on the current tick.
Players with `rs.sneak == 1` receive the `rs.sneak_start` tag, and the tag
is removed from everyone else.

```redscript
fn on_sneak_start()
```

---

## `check_look_up`

Tags players currently looking upward.
Players with pitch from `-90` to `-45` receive the `rs.look_up` tag.

```redscript
fn check_look_up()
```

---

## `check_look_down`

Tags players currently looking downward.
Players with pitch from `45` to `90` receive the `rs.look_down` tag.

```redscript
fn check_look_down()
```

---

## `check_look_straight`

Tags players currently looking roughly straight ahead.
Players with pitch from `-45` to `45` receive the `rs.look_straight` tag.

```redscript
fn check_look_straight()
```

---

## `check_holding_item`

Placeholder helper for item-in-hand checks.
The current implementation only prints guidance because robust item checks
require predicates or explicit NBT checks.

```redscript
fn check_holding_item(item_id: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `item_id` | Expected item identifier or logical item key |

---

## `on_sneak_click`

Detects a sneak-plus-right-click combo.
Players who click while sneaking receive `rs.sneak_click`; otherwise they
receive the normal `rs.clicked` tag. Click counters are reset in both cases.

```redscript
fn on_sneak_click()
```

---

## `DOUBLE_TAP_WINDOW`

Double-sneak detection window in ticks.
A second sneak start within this many ticks counts as a double tap.

```redscript
const DOUBLE_TAP_WINDOW: int = 10;  // 0.5 second
```

---

## `on_double_sneak`

Detects a double-tap sneak pattern.
Requires external scoreboards `rs.last_sneak` and `rs.tick` to be updated by
the caller. Players who qualify receive the `rs.double_sneak` tag.

```redscript
fn on_double_sneak()
```

---
