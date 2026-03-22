# Spawn

> Auto-generated from `src/stdlib/spawn.mcrs` — do not edit manually.

## API

- [teleport_to](#teleport-to)
- [teleport_to_entity](#teleport-to-entity)
- [spread_players](#spread-players)
- [gather_all](#gather-all)
- [launch_up](#launch-up)
- [goto_lobby](#goto-lobby)
- [goto_arena](#goto-arena)

---

## `teleport_to`

Teleports the target selector to fixed world coordinates.

```redscript
fn teleport_to(target: selector, x: int, y: int, z: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Target selector to move |
| `x` | Destination X coordinate |
| `y` | Destination Y coordinate |
| `z` | Destination Z coordinate |

**Example**

```redscript
teleport_to(@p, 0, 64, 0)
```

---

## `teleport_to_entity`

Teleports the target selector to another entity.

```redscript
fn teleport_to_entity(target: selector, dest: selector)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Selector to teleport |
| `dest` | Selector whose current position is used as the destination |

---

## `spread_players`

Placeholder helper for spreading all players randomly in an area.
The raw `spreadplayers` command is noted here but not emitted yet.
Current behavior only broadcasts a status message.

```redscript
fn spread_players(x: int, z: int, radius: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Center X coordinate |
| `z` | Center Z coordinate |
| `radius` | Maximum spread radius in blocks |

---

## `gather_all`

Teleports all players to one location.

```redscript
fn gather_all(x: int, y: int, z: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `x` | Destination X coordinate |
| `y` | Destination Y coordinate |
| `z` | Destination Z coordinate |

---

## `launch_up`

Teleports the target upward relative to its current position.
Useful for launch pads or scripted knock-up effects.

```redscript
fn launch_up(target: selector, height: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Selector to move |
| `height` | Relative Y offset in blocks |

---

## `goto_lobby`

Teleports the target to the hard-coded lobby position.
This helper also shows a welcome title and should be customized per map.

```redscript
fn goto_lobby(target: selector)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Selector to move to the lobby |

---

## `goto_arena`

Teleports the target to the hard-coded arena position.
This helper also shows a fight title and should be customized per map.

```redscript
fn goto_arena(target: selector)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Selector to move to the arena |

---
