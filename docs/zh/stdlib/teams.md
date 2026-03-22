# Teams

> 本文档由 `src/stdlib/teams.mcrs` 自动生成，请勿手动编辑。

## API 列表

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

创建一个队伍并设置显示颜色

```redscript
fn create_team(name: string, color: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `name` | 计分板队伍名称 |
| `color` | Minecraft 队伍颜色字符串，如 `red` 或 `blue` |

**示例**

```redscript
create_team("spectator", "gray")
```

---

## `create_red_team`

创建默认红队，并关闭队友伤害

```redscript
fn create_red_team()
```

**示例**

```redscript
create_red_team()
```

---

## `create_blue_team`

创建默认蓝队，并关闭队友伤害

```redscript
fn create_blue_team()
```

---

## `create_green_team`

创建默认绿队，并关闭队友伤害

```redscript
fn create_green_team()
```

---

## `create_yellow_team`

创建默认黄队，并关闭队友伤害

```redscript
fn create_yellow_team()
```

---

## `add_to_team`

将目标选择器加入指定队伍

```redscript
fn add_to_team(target: selector, team_name: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 要加入队伍的目标选择器 |
| `team_name` | 已存在的队伍名称 |

---

## `remove_from_teams`

将目标选择器从所有队伍中移除

```redscript
fn remove_from_teams(target: selector)
```

**参数**

| 参数 | 说明 |
|------|------|
| `target` | 要移除的目标选择器 |

---

## `setup_two_teams`

创建默认的双队配置（红队和蓝队）

```redscript
fn setup_two_teams()
```

---

## `setup_four_teams`

创建默认的四队配置（红蓝绿黄）

```redscript
fn setup_four_teams()
```

---

## `cleanup_teams`

删除本模块默认创建的四个标准队伍

```redscript
fn cleanup_teams()
```

---
