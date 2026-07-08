# Impl Blocks <Badge type="tip" text="v1.2" />

`impl` blocks attach methods and constructors to a type. Use them when a struct has behavior that should be read next to the data it operates on.

## Basic Syntax

```mcrs verify-skip
struct Counter {
    value: int,
}

impl Counter {
    fn new(value: int) -> Counter {
        return Counter { value: value };
    }

    fn increment(self) {
        self.value = self.value + 1;
    }

    fn get(self) -> int {
        return self.value;
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

    fn increment(self) {
        self.value = self.value + 1;
    }
}

let counter = Counter { value: 5 };
counter.show();
counter.increment();
```

Use `self` to access fields and call other instance methods.

## Static Methods

Methods without `self` act like type-level functions and are called with `Type::method(...)`.

```mcrs verify-skip
impl Counter {
    fn new(value: int) -> Counter {
        return Counter { value: value };
    }
}

let counter = Counter::new(5);
```

This is commonly used for constructors and helpers.

## Calling Methods

RedScript supports both static and instance method syntax:

```mcrs verify-skip
let counter = Counter::new(5);

counter.increment();

if (counter.get() > 5) {
    say("Advanced!");
}
```

## When to Use `impl`

- Group behavior with the data it operates on.
- Build small object-like APIs over structs.
- Expose constructors with `Type::new(...)`.
- Keep domain operations discoverable: `counter.increment()` is easier to scan than a loose helper call.

Do not use `impl` just to hide global mutable state. If the method mostly manipulates selectors, scoreboards, or NBT side effects, document that behavior in the method name or nearby comments.

## Compilation Model

`impl` blocks are compile-time sugar. Methods still compile to regular datapack functions; there is no object runtime or dynamic dispatch hidden behind the syntax.

Names starting with `_` follow the same private-helper naming convention as top-level functions. User-defined methods in your source are still emitted; unreachable imported library methods can be pruned by the compiler.

## Timer Caveat

The standard-library `Timer` API is partly compiler-intrinsic: `Timer::new()` is statically allocated and should be called at the top level of a function, not inside loops or conditional bodies. Regular user-defined `impl` methods do not get that special lowering unless the compiler explicitly implements it.

## Next Steps

- [Structs & Enums](/en/guide/structs-enums) — Define custom data types
- [Standard Library](/en/stdlib/timer) — See the `Timer` API in practice
