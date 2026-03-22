# Strings

> Auto-generated from `src/stdlib/strings.mcrs` — do not edit manually.

## API

- [str_len](#str-len)
- [str_concat](#str-concat)
- [str_contains](#str-contains)
- [str_slice](#str-slice)

---

## `str_len`

**Since:** 1.0.0

Returns the length of the string stored at rs:strings.{s}.

LIMITATION (MC 1.21.4): `execute store result score ... run data get storage`
returns 1 for any plain string NBT tag, not the character count. To get a
true character count, the string must be stored as an NBT list of single-char
strings (e.g. ["h","e","l","l","o"]), in which case data_get returns the list
length correctly.

For literal strings whose length is known at compile time, prefer using
the constant directly — the compiler will fold it.

```redscript
fn str_len(s: string) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `s` | NBT field name in rs:strings (e.g. "A") |

**Returns:** 1 for plain string tags; list element count for char-list strings.

**Example**

```redscript
str_len("A")  // result: 1 (plain string) or char count (char-list)
```

---

## `str_concat`

**Since:** 1.0.0

Concatenates two strings from rs:strings and writes the result to
rs:strings.Result as an NBT list [a_value, b_value].

The result list is suitable for use in tellraw JSON text components:
  tellraw @a {"nbt":"Result","storage":"rs:strings","interpret":false}

LIMITATION (MC 1.21.4): MC has no native string concatenation command.
Single-string concatenation (e.g. "ab" from "a"+"b") requires a
recursive macro helper function; this is out of scope for a pure stdlib.
The NBT list representation works for display (tellraw) but cannot be
passed back to further string operations without conversion.

ALTERNATIVE for display: use a tellraw JSON array directly:
  tellraw @a [{"storage":"rs:strings","nbt":"A"},{"storage":"rs:strings","nbt":"B"}]

```redscript
fn str_concat(a: string, b: string)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `a` | NBT field name of the first string in rs:strings (e.g. "A") |
| `b` | NBT field name of the second string in rs:strings (e.g. "B") |

**Returns:** rs:strings.Result is set to an NBT list [valueA, valueB]

**Example**

```redscript
str_concat("A", "B")  // rs:strings.Result = ["hello", "world"]
```

---

## `str_contains`

**Since:** 1.0.0

Checks whether the string at rs:strings.{s} contains the substring at
rs:strings.{sub}. Returns 1 if found, 0 if not found.

NOT FEASIBLE (MC 1.21.4): Minecraft datapacks do not provide a native
substring search command. There is no `execute if data` form that tests
whether one string is contained within another.

THIS FUNCTION ALWAYS RETURNS 0.

WORKAROUNDS for datapack authors:
  1. If sub is a compile-time constant and the check position is known,
     use str_slice to extract a window and compare via scoreboard.
  2. Pre-process strings server-side and store a presence flag in NBT.
  3. Use a macro function (MC 1.20.2+) that iterates over character
     positions with `$(var)` substitution and returns early on match.

```redscript
fn str_contains(s: string, sub: string) -> int
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `s` | NBT field name of the haystack string in rs:strings |
| `sub` | NBT field name of the needle string in rs:strings |

**Returns:** 0 (always — not implemented due to MC limitation)

---

## `str_slice`

**Since:** 2.2.0

Extracts a substring from rs:strings.{s} and writes it to rs:strings.Result.
Uses the MC 1.20.2+ `data modify ... set string ... start end` feature.

Indices follow Java/Python slicing semantics:
  - start is inclusive, 0-based.
  - end is exclusive (end = start + length).
  - Negative end counts from the end of the string (e.g. -1 = all but last char).
  - Omitting end (use a very large positive int like 999999) copies to end of string.

Examples:
  str_slice("A", 0, 5)  → first 5 characters of rs:strings.A
  str_slice("A", 2, -1) → all but first 2 and last 1 characters

```redscript
fn str_slice(s: string, start: int, end: int)
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `s` | NBT field name of the source string in rs:strings (e.g. "A") |
| `start` | Start index (inclusive, 0-based) |
| `end` | End index (exclusive); negative counts from string end |

**Returns:** rs:strings.Result contains the extracted substring

**Example**

```redscript
str_slice("A", 0, 5)   // first 5 chars of rs:strings.A
str_slice("A", 2, -1)  // drop first 2 and last 1 chars
```

---
