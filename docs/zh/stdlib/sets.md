# Sets

> 本文档由 `src/stdlib/sets.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [set_new](#set-new)
- [set_add](#set-add)
- [set_contains](#set-contains)
- [set_remove](#set-remove)
- [set_clear](#set-clear)

---

## `set_new` <Badge type="info" text="v1.1.0" />

创建一个新的空集合并返回唯一集合 ID（字符串句柄）。

```redscript
fn set_new(): string
```

**返回：** 集合 ID（字符串句柄）

**示例**

```redscript
let s: string = set_new();
set_add(s, "apple");
```

---

## `set_add` <Badge type="info" text="v1.1.0" />

若值不存在则将其加入集合（已存在则无操作）。

```redscript
fn set_add(set: string, value: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `set` | set_new 返回的集合 ID |
| `value` | 要添加的值 |

**返回：** 无返回值

---

## `set_contains` <Badge type="info" text="v1.1.0" />

检查集合中是否存在某个值。

```redscript
fn set_contains(set: string, value: string): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `set` | 集合 ID |
| `value` | 要查找的值 |

**返回：** 存在返回 1，否则返回 0

---

## `set_remove` <Badge type="info" text="v1.1.0" />

从集合中移除某个值（不存在则无操作）。

```redscript
fn set_remove(set: string, value: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `set` | 集合 ID |
| `value` | 要移除的值 |

**返回：** 无返回值

---

## `set_clear` <Badge type="info" text="v1.1.0" />

清空集合中的所有值。

```redscript
fn set_clear(set: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `set` | 集合 ID |

**返回：** 无返回值

---
