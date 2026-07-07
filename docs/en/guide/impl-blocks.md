# Impl Blocks <Badge type="tip" text="v1.2" />

`impl` blocks attach methods and constructors to a type. Use them when a struct has behavior that should be read next to the data it operates on.

## Basic Syntax

```mcrs verify-skip
struct Timer {
    _id: int,
    _duration: int,
}

impl Timer {
    fn new(duration: int) -> Timer {
        return Timer { _id: 0, _duration: duration };
    }

    fn start(self) {
        timer_start(self._id, self._duration);
    }

    fn tick(self) {
        timer_tick(self._id);
    }

    fn done(self) -> bool {
        return timer_done(self._id);
    }
}
```

Methods declared inside `impl Type { ... }` belong to that type.

## The `self` Parameter

Instance methods declare `self` explicitly as their first parameter. Dot-call syntax passes the receiver into that `self` slot.

```mcrs verify-skip
struct Counter { value: int }

impl Counter {
    fn show(self) {
        say(f"Value: {self.value}");
    }

    fn add(self, n: int) -> Counter {
        return Counter { value: self.value + n };
    }
}

let counter = Counter { value: 5 };
counter.show();
let next: Counter = counter.add(1);
```

Use `self` to access fields and call other instance methods.

## Static Methods

Methods without `self` act like type-level functions and are called with `Type::method(...)`.

```mcrs verify-skip
impl Timer {
    fn new(duration: int) -> Timer {
        return Timer { _id: 0, _duration: duration };
    }
}

let timer = Timer::new(100);
```

This is commonly used for constructors and helpers.

## Calling Methods

RedScript supports both static and instance method syntax:

```mcrs verify-skip
let timer = Timer::new(200);

timer.start();
timer.tick();

if (timer.done()) {
    say("Finished!");
}
```

## When to Use `impl`

- Group behavior with the data it operates on.
- Build small object-like APIs over structs.
- Expose constructors with `Type::new(...)`.
- Keep domain operations discoverable: `timer.start()` is easier to scan than `timer_start(timer_id, duration)`.

Do not use `impl` just to hide global mutable state. If the method mostly manipulates selectors, scoreboards, or NBT side effects, document that behavior in the method name or nearby comments.

## Compilation Model

`impl` blocks are compile-time sugar. Methods still compile to regular datapack functions, but RedScript keeps method-call syntax and type checking.

Names starting with `_` follow the same private-helper convention as top-level functions and may be removed by dead-code elimination if unreachable.

## Timer Caveat

The standard-library `Timer` API is partly compiler-intrinsic: `Timer::new()` is statically allocated and should be called at the top level of a function, not inside loops or conditional bodies. Regular user-defined `impl` methods do not get that special lowering unless the compiler explicitly implements it.

## Next Steps

- [Structs & Enums](/en/guide/structs-enums) — Define custom data types
- [Standard Library](/en/stdlib/timer) — See the `Timer` API in practice
