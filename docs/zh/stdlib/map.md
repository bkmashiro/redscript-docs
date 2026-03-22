# Map

> 本文档由 `src/stdlib/map.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [map_set](#map-set)
- [map_get](#map-get)
- [map_has](#map-has)
- [map_delete](#map-delete)
- [map_clear](#map-clear)

---

## `map_set` <Badge type="info" text="Since v3.0.0" />

将整数值写入 storage rs:maps.{map_name}.{key}

```redscript
fn map_set(map_name: string, key: string, value: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `map_name` | rs:maps 下的顶层 map 名称 |
| `key` | map compound 内的键名 |
| `value` | 要写入的整数值 |

**示例**

```redscript
map_set("Stats", "kills", 7)
```

---

## `map_get` <Badge type="info" text="Since v3.0.0" />

读取 storage rs:maps.{map_name}.{key} 中的整数值

```redscript
fn map_get(map_name: string, key: string): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `map_name` | rs:maps 下的顶层 map 名称 |
| `key` | map compound 内的键名 |

**返回：** 已存储的整数值；若键不存在则返回 0

**示例**

```redscript
let kills: int = map_get("Stats", "kills")
```

---

## `map_has` <Badge type="info" text="Since v3.0.0" />

检查 storage rs:maps.{map_name}.{key} 是否存在

```redscript
fn map_has(map_name: string, key: string): int
```

**参数**

| 参数 | 说明 |
|------|------|
| `map_name` | rs:maps 下的顶层 map 名称 |
| `key` | map compound 内的键名 |

**返回：** 键存在返回 1，否则返回 0

**示例**

```redscript
if (map_has("Stats", "kills") == 1) { }
```

---

## `map_delete` <Badge type="info" text="Since v3.0.0" />

删除指定 map 中的一个键

```redscript
fn map_delete(map_name: string, key: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `map_name` | rs:maps 下的顶层 map 名称 |
| `key` | map compound 内的键名 |

**示例**

```redscript
map_delete("Stats", "kills")
```

---

## `map_clear` <Badge type="info" text="Since v3.0.0" />

删除整个 storage rs:maps.{map_name} compound

```redscript
fn map_clear(map_name: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `map_name` | rs:maps 下的顶层 map 名称 |

**示例**

```redscript
map_clear("Stats")
```

---
