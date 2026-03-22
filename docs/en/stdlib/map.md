# Map

> Auto-generated from `src/stdlib/map.mcrs` — do not edit manually.

## API

- [map_set](#map-set)
- [map_get](#map-get)
- [map_has](#map-has)
- [map_delete](#map-delete)
- [map_clear](#map-clear)

---

## `map_set` <Badge type="info" text="Since v3.0.0" />

Stores an integer value in `storage rs:maps.{map_name}.{key}`.

This creates the parent compound on demand if it does not already exist.
Both `map_name` and `key` are inserted directly into the NBT path, so they
must be valid path segments.

```redscript
fn map_set(map_name: string, key: string, value: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `map_name` | Top-level map name under `storage rs:maps` |
| `key` | Key name inside the selected map compound |
| `value` | Integer value to write |

**Example**

```redscript
map_set("Stats", "kills", 7)
```

---

## `map_get` <Badge type="info" text="Since v3.0.0" />

Reads an integer value from `storage rs:maps.{map_name}.{key}`.

If the path does not exist, this function returns `0`.

```redscript
fn map_get(map_name: string, key: string): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `map_name` | Top-level map name under `storage rs:maps` |
| `key` | Key name inside the selected map compound |

**Returns:** Stored integer value, or `0` if the key is missing

**Example**

```redscript
let kills: int = map_get("Stats", "kills")
```

---

## `map_has` <Badge type="info" text="Since v3.0.0" />

Checks whether `storage rs:maps.{map_name}.{key}` exists.

```redscript
fn map_has(map_name: string, key: string): int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `map_name` | Top-level map name under `storage rs:maps` |
| `key` | Key name inside the selected map compound |

**Returns:** `1` if the key exists, otherwise `0`

**Example**

```redscript
if (map_has("Stats", "kills") == 1) { }
```

---

## `map_delete` <Badge type="info" text="Since v3.0.0" />

Removes a key from the selected map compound.

Removing a missing key is a no-op in Minecraft.

```redscript
fn map_delete(map_name: string, key: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `map_name` | Top-level map name under `storage rs:maps` |
| `key` | Key name inside the selected map compound |

**Example**

```redscript
map_delete("Stats", "kills")
```

---

## `map_clear` <Badge type="info" text="Since v3.0.0" />

Removes the entire map compound from `storage rs:maps`.

```redscript
fn map_clear(map_name: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `map_name` | Top-level map name under `storage rs:maps` |

**Example**

```redscript
map_clear("Stats")
```

---
