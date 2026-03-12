# Strings

RedScript supports compile-time strings with interpolation, and runtime f-strings for output.

## String Literals

```mcrs
let name: string = "Alex";
let greeting: string = "Hello, World!";
```

Strings are **compile-time constants**. All string values must be known at compile time.

## String Interpolation `${}`

Use `${}` to embed compile-time constants in strings:

```mcrs
const GAME_NAME: string = "MiniGame";
let msg: string = "Welcome to ${GAME_NAME}!";
// Compiles to: "Welcome to MiniGame!"
```

**Important**: The interpolated value must be a compile-time constant (`const` or literal).

```mcrs
const VERSION: string = "1.0";
let info: string = "Version: ${VERSION}";  // OK

let x: int = scoreboard_get(@s, #score);
let msg: string = "Score: ${x}";           // Error: x is runtime value
```

## f-strings (Format Strings)

For runtime values in output, use f-strings:

```mcrs
let score: int = scoreboard_get(@s, #kills);
let player: Player = @s;
say(f"You have {score} kills!");
say(f"Welcome {player}!");
title(@s, f"Score: {score}");
actionbar(@s, f"HP: {hp}");
```

f-strings compile to tellraw JSON:

```mcfunction
tellraw @a [{"text":"You have "},{"score":{"name":"$t0","objective":"rs"}},{"text":" kills!"}]
```

### Where f-strings work

- `say(f"...")`
- `tellraw(target, f"...")`
- `title(target, f"...")`
- `subtitle(target, f"...")`
- `actionbar(target, f"...")`

### Limitations

- f-strings can only be used in output functions
- Cannot store f-string result in a variable
- Placeholders can include runtime scoreboard-backed values and supported typed display values such as players

```mcrs
// OK
say(f"Score: {score}");

// Error: cannot store f-string
let msg: string = f"Score: {score}";
```

## Summary

| Syntax | Type | Use Case |
|--------|------|----------|
| `"text"` | `string` | Compile-time strings |
| `"${const}"` | `string` | Compile-time interpolation |
| `f"{runtime}"` | `format_string` | Runtime output only |
