# Module System

RedScript's module system lets you import a whole module, a single symbol, or every exported symbol from a library module. This page documents the module-oriented form used in newer builds.

## Library Modules

A file becomes importable as a module when it starts with a library header:

```rs
module library

fn heal(player: entity) {
    effect(player, "instant_health", 1, 1)
}

fn heal_all() {
    foreach (player in @a) {
        heal(player)
    }
}
```

The module name is taken from the file name. For example, `player_utils.mcrs` is imported as `player_utils`.

Use `module library` for shared code that is meant to be imported by other files instead of compiled only as a standalone entry file.

## Importing a Whole Module

Use a plain module import when you want the module namespace but do not want every symbol injected into the local scope.

```rs
import player_utils

fn start_round() {
    player_utils::heal_all()
}
```

Compile-time behaviour:

- resolves the target library module
- records its exported public symbols
- binds the module name so you can qualify calls with `module_name::symbol`

This is the safest style for large projects because it keeps call sites explicit.

## Importing a Single Symbol

Use a symbol import when you want one specific name in local scope:

```rs
import math::sin

fn wave(angle: int) -> int {
    return sin(angle)
}
```

Compile-time behaviour:

- imports only the requested public symbol
- leaves the rest of the module unbound locally
- reports an error if the symbol is missing or not exported

Prefer this form when a module is large but you only need one or two helpers.

## Wildcard Imports

Use a wildcard import when you want every exported public symbol:

```rs
import math::*

fn circle_x(cx: int, radius: int, angle: int) -> int {
    return cx + cos(angle) * radius
}
```

Compile-time behaviour:

- expands to the module's exported public symbols
- injects those names into the current scope
- can produce ambiguity errors if multiple imports provide the same name

Wildcard imports are convenient in small files, but they scale poorly in large codebases. If a file grows, switch to whole-module or symbol imports.

## Export Surface

The module system follows the same public/private convention used by DCE:

- names not starting with `_` are public and importable
- names starting with `_` are private implementation details

```rs
module library

fn normalize(v: int) -> int {
    return _clamp(v)
}

fn _clamp(v: int) -> int {
    if (v < 0) {
        return 0
    }
    return v
}
```

Other files can import `normalize`, but not `_clamp`.

## Circular Dependencies

The compiler handles module cycles in two phases:

1. scan library headers and exported symbol tables
2. resolve bodies after the global module graph is known

That means mutually recursive function references can be resolved as long as the imported symbols exist and their signatures are valid.

```rs
// a.mcrs
module library
import b::pong

fn ping() {
    pong()
}

// b.mcrs
module library
import a::ping

fn pong() {
    ping()
}
```

Practical guidance:

- cycles between function declarations are acceptable
- avoid circular top-level initialization with real runtime state
- move shared types and helpers into a third module when two modules start depending on each other too heavily

If a cycle cannot be resolved cleanly, split shared contracts into a neutral library module and let both sides import that instead.

## Choosing an Import Style

Use this rule of thumb:

- `import player_utils` when explicit qualification improves clarity
- `import math::sin` when you only need one symbol
- `import math::*` when the file is small and tightly focused

For large datapacks, whole-module imports tend to age the best.
