# Strings

> 本文档由 `src/stdlib/strings.mcrs` 自动生成，请勿手动编辑。

## API 列表

- [str_len](#str-len)
- [str_concat](#str-concat)
- [str_contains](#str-contains)
- [str_slice](#str-slice)

---

## `str_len` <Badge type="info" text="v1.0.0" />

返回 rs:strings.{s} 中字符串的长度（MC 限制：普通字符串总返回 1）

```redscript
fn str_len(s: string) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `s` | rs:strings 中的 NBT 字段名（如 "A"） |

**返回：** 普通字符串返回 1；字符列表返回元素数量

**示例**

```redscript
str_len("A")  // result: 1 (plain string) or char count (char-list)
```

---

## `str_concat` <Badge type="info" text="v1.0.0" />

将 rs:strings 中的两个字符串拼接，结果以 NBT 列表形式写入 rs:strings.Result

```redscript
fn str_concat(a: string, b: string)
```

**参数**

| 参数 | 说明 |
|------|------|
| `a` | 第一个字符串的 NBT 字段名（如 "A"） |
| `b` | 第二个字符串的 NBT 字段名（如 "B"） |

**返回：** rs:strings.Result 被设为 [valueA, valueB] 的 NBT 列表

**示例**

```redscript
str_concat("A", "B")  // rs:strings.Result = ["hello", "world"]
```

---

## `str_contains` <Badge type="info" text="v1.0.0" />

检测 rs:strings.{s} 是否包含 rs:strings.{sub}（因 MC 限制始终返回 0）

```redscript
fn str_contains(s: string, sub: string) -> int
```

**参数**

| 参数 | 说明 |
|------|------|
| `s` | 被搜索字符串的 NBT 字段名 |
| `sub` | 子字符串的 NBT 字段名 |

**返回：** 0（始终，MC 原生不支持子串搜索）

---

## `str_slice` <Badge type="info" text="v2.2.0" />

从 rs:strings.{s} 中提取子串，写入 rs:strings.Result（需要 MC 1.20.2+）

```redscript
fn str_slice(s: string, start: int, end: int)
```

**参数**

| 参数 | 说明 |
|------|------|
| `s` | 源字符串的 NBT 字段名（如 "A"） |
| `start` | 起始索引（含，0-based） |
| `end` | 结束索引（不含，负数从末尾计） |

**返回：** rs:strings.Result 包含提取的子串

**示例**

```redscript
str_slice("A", 0, 5)   // first 5 chars of rs:strings.A
str_slice("A", 2, -1)  // drop first 2 and last 1 chars
```

---
