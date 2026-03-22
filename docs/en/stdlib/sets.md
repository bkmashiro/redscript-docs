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

Create a new empty set and return its unique set ID (string handle).

```redscript
fn set_new(): string
```

**Returns:** A unique set ID used by all other set operations

**Example**

```redscript
let s: string = set_new();
set_add(s, "apple");
```

---

## `set_add` <Badge type="info" text="v1.1.0" />

Add a value to the set if it is not already present (no-op if already contained).

```redscript
fn set_add(set: string, value: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `set` | Set ID returned by `set_new` |
| `value` | Value to add |

---

## `set_contains` <Badge type="info" text="v1.1.0" />

Test whether a value exists in the set.

```redscript
fn set_contains(set: string, value: string): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `set` | Set ID returned by `set_new` |
| `value` | Value to look up |

**Returns:** 1 if the value is in the set, 0 otherwise

---

## `set_remove` <Badge type="info" text="v1.1.0" />

Remove a value from the set (no-op if not present).

```redscript
fn set_remove(set: string, value: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `set` | Set ID returned by `set_new` |
| `value` | Value to remove |

---

## `set_clear` <Badge type="info" text="v1.1.0" />

Remove all values from the set, leaving it empty.

```redscript
fn set_clear(set: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `set` | Set ID returned by `set_new` |

---
