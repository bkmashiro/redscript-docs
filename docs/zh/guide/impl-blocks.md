# impl 块 <Badge type="tip" text="v1.2" />

`impl` 块可以把方法和构造函数绑定到一个类型上。

## 基本语法

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

在 `impl Type { ... }` 中声明的方法都属于该类型。

## `self` 参数

实例方法通过 `self` 接收当前值。

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

可以通过 `self` 访问字段，也可以调用其他实例方法。

## 静态方法

不接收 `self` 的方法相当于类型级函数，使用 `Type::method(...)` 调用。

```mcrs
impl Timer {
    fn new(duration: int): Timer {
        return Timer { _id: 0, duration: duration };
    }
}

let timer = Timer::new(100);
```

这类方法通常用作构造函数或辅助函数。

## 方法调用

RedScript 同时支持静态方法和实例方法语法：

```mcrs
let timer = Timer::new(200);

timer.start();
timer.tick();

if (timer.done()) {
    say("Finished!");
}
```

## 何时使用 `impl`

- 把行为和数据放在一起
- 为结构体构建面向对象风格的 API
- 用 `Type::new(...)` 暴露构造函数

## 编译方式

`impl` 块是编译期语法糖。方法最终仍会编译成普通的数据包函数，但 RedScript 会保留方法调用语法和类型检查。

## 下一步

- [结构体与枚举](/zh/guide/structs-enums) — 定义自定义数据类型
- [标准库](/zh/reference/stdlib) — 查看 `Timer` API 的实际用法
