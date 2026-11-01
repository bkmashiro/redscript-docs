# Project builds in 4.0

Project/package compilation is available in RedScript 4.0 through the CLI and
compiler session API.

## Create, inspect and compile

```sh
redscript init demo
cd demo
redscript project . --format json
redscript compile src/main.mcrs
redscript graph . --capabilities --target pack --format json
```

The scaffold exports `main`, registers a load function and a periodic heartbeat.
Compilation writes the default datapack target to `dist/`. At 20 TPS, its
`@tick(rate=20)` heartbeat runs once per second. Direct calls remain ordinary calls.

The generated manifest contains:

```toml
[project]
name = "demo"
module = "local/demo"
namespace = "demo"
mc-version = "1.21.4"
source-roots = ["src"]

[target.pack]
kind = "datapack"
entry = "local/demo::main"
out = "dist"
default = true
```

`module` is the canonical package identity. `namespace` controls generated
Minecraft resource IDs. The target entry combines a package path and exported
function using `::`. Do not substitute a Minecraft function ID for that entry.

## Packages and dependencies

A directory package can contain multiple `.mcrs` files. Function exports form its
public surface; `redscript declarations` emits declaration-only `.d.mcrs` APIs.
Cross-package public struct/enum exports remain roadmap work.

A local dependency must explicitly identify an existing module project:

```toml
[dependencies]
"example.com/shared" = { path = "../shared" }
```

Paths are relative to the manifest. The dependency's declared module identity
must match the key. Git dependencies use immutable cached checkouts and
`redscript.lock`; `redscript resolve .` resolves declared dependencies. Commit the
lockfile rather than relying on a moving remote branch alone.

## Targets and capability errors

Select a named target with `--target`. A `commands` target emits a finite command
artifact instead of a persistent datapack. Lifecycle hooks, scheduled work,
recursion and other incompatible requirements are rejected with an originating
symbol/call chain. The default scaffold has lifecycle hooks and is not a finite
commands example. Inspect `graph --capabilities` before choosing that backend.

## Current boundaries

Project compile, inspection, dependency resolution and capability graphs use the
package model. Do not assume watch, `redscript test` or LSP project resolution has
completed the same migration. Legacy stdlib module imports and package dependency
linking are not yet a single unified workflow. The [stdlib examples](../stdlib/)
and [CLI reference](../reference/cli) describe their respective supported paths.
