# RedScript 3.0 Released

**Published:** March 2026

RedScript 3.0 is here — a major release with 7 new optimizer passes, language improvements, and complete stdlib documentation.

## Highlights

### 🚀 Optimizer Pipeline

The compiler now includes 15 optimization passes:

| New in 3.0 | Description |
|------------|-------------|
| **Tail Call Optimization** | Converts tail recursion to loops (avoids MC's ~512 depth limit) |
| **Common Subexpression Elimination** | Caches repeated expressions |
| **Auto-Inline** | Inlines functions ≤5 MIR instructions |
| **Execute Chain Optimization** | Merges `execute if A run execute if B` → `execute if A if B` |
| **Strength Reduction** | `x * 2` → `x + x` |
| **Scoreboard Read Batching** | Deduplicates redundant reads |
| **NBT Write Coalescing** | Removes overwritten writes |

Enable with `-O2` for full optimization:

```bash
redscript build main.mcrs -O2
```

### 🆕 Language Features

**Struct extends:**
```rs
struct Enemy { hp: int }
struct Boss extends Enemy { name: string }
// Boss has both hp and name fields
```

**Labeled break/continue:**
```rs
'outer: for (let i = 0; i < 10; i = i + 1) {
    for (let j = 0; j < 10; j = j + 1) {
        if (found) break 'outer;
    }
}
```

**New decorators:**

| Decorator | Description |
|-----------|-------------|
| `@memoize` | LRU-1 caching for int functions |
| `@throttle(N)` | Rate-limit to once per N ticks |
| `@retry(N)` | Auto-retry on failure |
| `@test` | Mark test functions |

### 🛠️ CLI Improvements

| Command | New in 3.0 |
|---------|------------|
| `redscript test` | Run `@test` functions |
| `redscript publish` | Package as `.zip` datapack |
| `redscript lint` | 5 static analysis rules |
| `redscript.toml` | Project config file |

### 📚 Complete Documentation

All **50 stdlib modules** now have full documentation with:
- `///` doc comments for every function
- `@param`, `@returns`, `@example` annotations
- English and Chinese versions
- Auto-generated from source

New modules: `queue`, `map`, `set_int`, `sets`

### 🔧 LSP Enhancements

- **Hover docs**: Shows doc comments on hover
- **Lint diagnostics**: Real-time warnings in editor
- **Source maps**: Trace `.mcfunction` back to `.mcrs`

## Upgrading

```bash
npm install -g redscript-mc@3.0.0
```

### Breaking Changes

1. `format_string` type is now unified as `string` — remove any `as string` casts
2. `arr.len()` for literal arrays returns compile-time constants

## Stats

- **3,886 tests** passing
- **81.5%** branch coverage
- **430** MC integration tests

## Links

- [Documentation](https://redscript-docs.pages.dev)
- [Playground](https://redscript.pages.dev)
- [GitHub](https://github.com/bkmashiro/redscript)
- [Changelog](https://github.com/bkmashiro/redscript/blob/main/CHANGELOG.md)
