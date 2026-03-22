# Set_int

> Auto-generated from `src/stdlib/set_int.mcrs` — do not edit manually.

## API

- [set_add](#set-add)
- [set_has](#set-has)
- [set_remove](#set-remove)
- [set_size](#set-size)
- [set_clear](#set-clear)
- [set_union](#set-union)
- [set_intersect](#set-intersect)

---

## `set_add` <Badge type="info" text="v3.0.0" />

Adds an integer to `storage rs:set_int.{set_name}` if it is not already present.

Missing sets are created automatically as empty lists before insertion.

```redscript
fn set_add(set_name: string, value: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `set_name` | Set name under `storage rs:set_int` |
| `value` | Integer value to insert |

**Example**

```redscript
set_add("Visited", 42)
```

---

## `set_has` <Badge type="info" text="v3.0.0" />

Checks whether an integer exists in `storage rs:set_int.{set_name}`.

```redscript
fn set_has(set_name: string, value: int): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `set_name` | Set name under `storage rs:set_int` |
| `value` | Integer value to test |

**Returns:** 1 if the value exists, otherwise 0

**Example**

```redscript
if (set_has("Visited", 42) == 1) { }
```

---

## `set_remove` <Badge type="info" text="v3.0.0" />

Removes an integer from `storage rs:set_int.{set_name}`.

Removing a missing value is a no-op.

```redscript
fn set_remove(set_name: string, value: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `set_name` | Set name under `storage rs:set_int` |
| `value` | Integer value to remove |

**Example**

```redscript
set_remove("Visited", 42)
```

---

## `set_size` <Badge type="info" text="v3.0.0" />

Returns the number of elements in `storage rs:set_int.{set_name}`.

Missing sets return `0`.

```redscript
fn set_size(set_name: string): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `set_name` | Set name under `storage rs:set_int` |

**Returns:** Current element count

**Example**

```redscript
let count: int = set_size("Visited")
```

---

## `set_clear` <Badge type="info" text="v3.0.0" />

Clears all elements from `storage rs:set_int.{set_name}`.

```redscript
fn set_clear(set_name: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `set_name` | Set name under `storage rs:set_int` |

**Example**

```redscript
set_clear("Visited")
```

---

## `set_union` <Badge type="info" text="v3.0.0" />

Computes `result = a ∪ b`.

The destination set is overwritten with a deduplicated list.

```redscript
fn set_union(a: string, b: string, result: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | Left-hand input set name |
| `b` | Right-hand input set name |
| `result` | Destination set name |

**Example**

```redscript
set_union("SeenA", "SeenB", "SeenAll")
```

---

## `set_intersect` <Badge type="info" text="v3.0.0" />

Computes `result = a ∩ b`.

The destination set is overwritten with a deduplicated list.

```redscript
fn set_intersect(a: string, b: string, result: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | Left-hand input set name |
| `b` | Right-hand input set name |
| `result` | Destination set name |

**Example**

```redscript
set_intersect("SeenA", "SeenB", "SeenBoth")
```

---
