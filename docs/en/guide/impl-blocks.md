# Impl Blocks <Badge type="tip" text="v1.2" />

`impl` blocks let you attach methods and constructors to a type.

## Basic Syntax

```mcrs
struct Timer {
    _id: int;
    duration: int;
}

impl Timer {
    fn new(duration: int): Timer {
        return Timer { _id: 0, duration: duration };
    }

    fn start(self) {
        timer_start(self._id, self.duration);
    }

    fn tick(self) {
        timer_tick(self._id);
    }

    fn done(self): bool {
        return timer_done(self._id);
    }
}
```

Methods declared inside `impl Type { ... }` belong to that type.

## The `self` Parameter

Instance methods receive the current value through `self`.

```mcrs
struct Counter { value: int; }

impl Counter {
    fn show(self) {
        say("Value: ${self.value}");
    }
}

let counter = Counter { value: 5 };
counter.show();
```

Use `self` to access fields and call other instance methods.

## Static Methods

Methods without `self` act like type-level functions and are called with `Type::method(...)`.

```mcrs
impl Timer {
    fn new(duration: int): Timer {
        return Timer { _id: 0, duration: duration };
    }
}

let timer = Timer::new(100);
```

This is commonly used for constructors and helpers.

## Calling Methods

RedScript supports both static and instance method syntax:

```mcrs
let timer = Timer::new(200);

timer.start();
timer.tick();

if (timer.done()) {
    say("Finished!");
}
```

## When to Use `impl`

- Group behavior with the data it operates on
- Build small object-like APIs over structs
- Expose constructors with `Type::new(...)`

## Compilation Model

`impl` blocks are compile-time sugar. Methods still compile to regular datapack functions, but RedScript keeps the method-call syntax and type checking.

## Next Steps

- [Structs & Enums](/en/guide/structs-enums) — Define custom data types
- [Standard Library](/en/reference/stdlib) — See the `Timer` API in practice
