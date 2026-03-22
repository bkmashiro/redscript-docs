# Teams

> Auto-generated from `src/stdlib/teams.mcrs` — do not edit manually.

## API

- [create_team](#create-team)
- [create_red_team](#create-red-team)
- [create_blue_team](#create-blue-team)
- [create_green_team](#create-green-team)
- [create_yellow_team](#create-yellow-team)
- [add_to_team](#add-to-team)
- [remove_from_teams](#remove-from-teams)
- [setup_two_teams](#setup-two-teams)
- [setup_four_teams](#setup-four-teams)
- [cleanup_teams](#cleanup-teams)

---

## `create_team`

Creates a team and applies a display color.

```redscript
fn create_team(name: string, color: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `name` | Team name used by the scoreboard team system |
| `color` | Minecraft team color string such as `red` or `blue` |

**Example**

```redscript
create_team("spectator", "gray")
```

---

## `create_red_team`

Creates the standard red team with friendly fire disabled.

```redscript
fn create_red_team()
```

**Example**

```redscript
create_red_team()
```

---

## `create_blue_team`

Creates the standard blue team with friendly fire disabled.

```redscript
fn create_blue_team()
```

---

## `create_green_team`

Creates the standard green team with friendly fire disabled.

```redscript
fn create_green_team()
```

---

## `create_yellow_team`

Creates the standard yellow team with friendly fire disabled.

```redscript
fn create_yellow_team()
```

---

## `add_to_team`

Adds an entity or player selector to a team.

```redscript
fn add_to_team(target: selector, team_name: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Target selector to join the team |
| `team_name` | Existing team name |

---

## `remove_from_teams`

Removes an entity or player selector from all teams.

```redscript
fn remove_from_teams(target: selector)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `target` | Target selector to remove from teams |

---

## `setup_two_teams`

Creates the default two-team setup used by many arena games.
This creates `red` and `blue`.

```redscript
fn setup_two_teams()
```

---

## `setup_four_teams`

Creates the default four-team setup.
This creates `red`, `blue`, `green`, and `yellow`.

```redscript
fn setup_four_teams()
```

---

## `cleanup_teams`

Removes the default team set created by this module.
Safe to call during cleanup even if some teams were unused.

```redscript
fn cleanup_teams()
```

---
