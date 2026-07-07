# impl 块 <Badge type="tip" text="v1.2" />

`impl` 块可以把方法和构造函数绑定到一个类型上。适合用于“数据和操作这份数据的行为应该放在一起读”的场景。

## 基本语法

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

在 `impl Type { ... }` 中声明的方法都属于该类型。

## `self` 参数

实例方法需要把 `self` 显式写成第一个参数。点调用语法会把接收者传到这个 `self` 参数里。

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

可以通过 `self` 访问字段，也可以调用其他实例方法。

## 静态方法

不接收 `self` 的方法相当于类型级函数，使用 `Type::method(...)` 调用。

```mcrs verify-skip
impl Timer {
    fn new(duration: int) -> Timer {
        return Timer { _id: 0, _duration: duration };
    }
}

let timer = Timer::new(100);
```

这类方法通常用作构造函数或辅助函数。

## 方法调用

RedScript 同时支持静态方法和实例方法语法：

```mcrs verify-skip
let timer = Timer::new(200);

timer.start();
timer.tick();

if (timer.done()) {
    say("Finished!");
}
```

## 何时使用 `impl`

- 把行为和数据放在一起。
- 为结构体构建小型的对象风格 API。
- 用 `Type::new(...)` 暴露构造函数。
- 让领域操作更容易读：`timer.start()` 通常比 `timer_start(timer_id, duration)` 更清楚。

不要为了隐藏全局可变状态而滥用 `impl`。如果方法主要操作选择器、记分板或 NBT 副作用，应在方法名或旁边注释里说清楚。

## 编译方式

`impl` 块是编译期语法糖。方法最终仍会编译成普通的数据包函数，但 RedScript 会保留方法调用语法和类型检查。

以 `_` 开头的方法遵循和顶层函数相同的私有 helper 约定：如果无法从入口触达，可能会被死代码消除移除。

## Timer 注意事项

标准库的 `Timer` API 有一部分是编译器内建处理：`Timer::new()` 会被静态分配，应该在函数顶层调用，不要放进循环或条件分支里。普通用户自定义的 `impl` 方法不会自动获得这种特殊 lowering，除非编译器明确实现了对应内建逻辑。

## 下一步

- [结构体与枚举](/zh/guide/structs-enums) — 定义自定义类型
- [标准库](/zh/stdlib/timer) — 查看 `Timer` API 的实际用法
