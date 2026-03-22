# Set_int

> 本文档由 `src/stdlib/set_int.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [set_add](#set-add)
- [set_has](#set-has)
- [set_remove](#set-remove)
- [set_size](#set-size)
- [set_clear](#set-clear)
- [set_union](#set-union)
- [set_intersect](#set-intersect)

---

## `set_add`

**版本：** 3.0.0

向 storage rs:set_int.{set_name} 中插入一个整数；若已存在则不会重复添加

```redscript
fn set_add(set_name: string, value: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `set_name` | rs:set_int 下的集合名称 |
| `value` | 要插入的整数值 |

**示例**

```redscript
set_add("Visited", 42)
```

---

## `set_has`

**版本：** 3.0.0

检查整数是否存在于 storage rs:set_int.{set_name} 中

```redscript
fn set_has(set_name: string, value: int): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `set_name` | rs:set_int 下的集合名称 |
| `value` | 要检测的整数值 |

**返回：** 元素存在返回 1，否则返回 0

**示例**

```redscript
if (set_has("Visited", 42) == 1) { }
```

---

## `set_remove`

**版本：** 3.0.0

从 storage rs:set_int.{set_name} 中删除一个整数

```redscript
fn set_remove(set_name: string, value: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `set_name` | rs:set_int 下的集合名称 |
| `value` | 要删除的整数值 |

**示例**

```redscript
set_remove("Visited", 42)
```

---

## `set_size`

**版本：** 3.0.0

返回 storage rs:set_int.{set_name} 中当前元素数量

```redscript
fn set_size(set_name: string): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `set_name` | rs:set_int 下的集合名称 |

**返回：** 集合中的整数个数；若集合不存在则返回 0

**示例**

```redscript
let count: int = set_size("Visited")
```

---

## `set_clear`

**版本：** 3.0.0

将 storage rs:set_int.{set_name} 重置为空整数列表

```redscript
fn set_clear(set_name: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `set_name` | rs:set_int 下的集合名称 |

**示例**

```redscript
set_clear("Visited")
```

---

## `set_union`

**版本：** 3.0.0

计算两个整数集合的并集，并将结果写入目标集合

```redscript
fn set_union(a: string, b: string, result: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 左侧输入集合名称 |
| `b` | 右侧输入集合名称 |
| `result` | 目标集合名称 |

**示例**

```redscript
set_union("SeenA", "SeenB", "SeenAll")
```

---

## `set_intersect`

**版本：** 3.0.0

计算两个整数集合的交集，并将结果写入目标集合

```redscript
fn set_intersect(a: string, b: string, result: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 左侧输入集合名称 |
| `b` | 右侧输入集合名称 |
| `result` | 目标集合名称 |

**示例**

```redscript
set_intersect("SeenA", "SeenB", "SeenBoth")
```

---
