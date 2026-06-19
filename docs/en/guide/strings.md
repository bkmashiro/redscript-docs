# Strings

RedScript supports plain compile-time strings and canonical f-strings (`f"...{expr}..."`) for dynamic output.

## String Literals

```mcrs ignore
let name: string = "Alex";
let greeting: string = "Hello, World!";
```

Strings are **compile-time constants**. All string values must be known at compile time.

## F-string interpolation

Use `f"...{expr}..."` to embed values in output strings:

```mcrs ignore
const GAME_NAME: string = "MiniGame";
say(f"Welcome to {GAME_NAME}!");
// Emits: Welcome to MiniGame!
```

**Important**: Plain strings (`"..."`) are not interpolated. Use `f"..."` whenever you need placeholders.

```mcrs ignore
const VERSION: string = "1.0";
say(f"Version: {VERSION}");  // OK

let x: int = scoreboard_get(@s, #score);
actionbar(@s, f"Score: {x}");  // OK for runtime output
```

## f-strings (Format Strings)

For runtime values in output, use f-strings:

```mcrs ignore
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

```mcrs ignore
// OK
say(f"Score: {score}");

// Error: cannot store f-string
let msg: string = f"Score: {score}";
```

## Summary

| Syntax | Type | Use Case |
|--------|------|----------|
| `"text"` | `string` | Compile-time strings |
| `f"{const}"` | `string` | Compile-time interpolation |
| `f"{runtime}"` | `format_string` | Runtime output only |
