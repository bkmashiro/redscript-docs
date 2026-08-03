# Sets

> Auto-generated from `src/stdlib/sets.mcrs` — do not edit manually.

## API

- [set_new](#set-new)
- [set_add](#set-add)
- [set_contains](#set-contains)
- [set_remove](#set-remove)
- [set_clear](#set-clear)

---

## `set_new` <Badge type="info" text="v1.1.0" />

Create a new empty set and return its unique runtime handle.

```redscript
fn set_new(): string
```

**Returns:** A unique path-safe set ID used by all other set operations

**Example**

```redscript
let s: string = set_new();
set_add(s, "apple");
```

---

## `set_add` <Badge type="info" text="v1.1.0" />

Add a path-safe value to a set. Repeated adds are idempotent.

```redscript
fn set_add(set: string, value: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `set` | Set ID returned by `set_new` |
| `value` | Path-safe value to add |

---

## `set_contains` <Badge type="info" text="v1.1.0" />

Return 1 when a path-safe value exists, otherwise 0.

```redscript
fn set_contains(set: string, value: string): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `set` | Set ID returned by `set_new` |
| `value` | Path-safe value to look up |

**Returns:** 1 if the value is in the set, 0 otherwise

---

## `set_remove` <Badge type="info" text="v1.1.0" />

Remove a path-safe value. Missing values are a no-op.

```redscript
fn set_remove(set: string, value: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `set` | Set ID returned by `set_new` |
| `value` | Path-safe value to remove |

---

## `set_clear` <Badge type="info" text="v1.1.0" />

Remove every value while preserving the set handle.

```redscript
fn set_clear(set: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `set` | Set ID returned by `set_new` |

---
