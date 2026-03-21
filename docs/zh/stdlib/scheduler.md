# `scheduler` — 实体与全局任务调度

Import: `import scheduler;`

轻量级的基于 tick 的任务调度器，用于延迟和周期性任务。每个实体支持最多 8 个独立任务槽（ID 0–7），并提供等效的全局任务槽。基于记分板计数器构建，无需 NBT。

## 初始化

在 `@tick` 函数中调用 `scheduler_tick()`，使调度器每游戏刻推进一次：

```rs
import scheduler;

@tick
fn tick() {
    scheduler_tick();
}
```

## 实体级函数

### `task_schedule(p: selector, task_id: int, delay: int)`

为实体 `p` 调度一个任务。经过 `delay` 个 tick 后，该 `task_id` 的 `task_ready` 将返回 `1`。`task_id` 必须为 0–7。

**示例：**
```rs
import scheduler;
// 40 tick（2 秒）后触发任务 0
task_schedule(@s, 0, 40);
```

---

### `task_cancel(p: selector, task_id: int)`

取消待执行的任务。取消后，`task_ready` 返回 `0`，直到再次调度该任务。

**示例：**
```rs
import scheduler;
task_cancel(@s, 0);
```

---

### `task_ready(p: selector, task_id: int): int`

若调度的延迟已到期（任务已就绪可触发）则返回 `1`，否则返回 `0`。返回 `1` 后自动重置为 `0`——每次调度只触发一次。

**示例：**
```rs
import scheduler;
if (task_ready(@s, 0) == 1) {
    say("延迟操作已触发！");
}
```

---

## 全局任务函数

全局任务使用相同接口，但不与特定实体绑定——适用于服务器级定时器。

### `gtask_schedule(task_id: int, delay: int)`

调度一个全局任务。`task_id` 必须为 0–7。

---

### `gtask_cancel(task_id: int)`

取消待执行的全局任务。

---

### `gtask_ready(task_id: int): int`

若全局任务延迟已到期则返回 `1`，否则返回 `0`。触发后自动重置。

---

## `scheduler_tick()`

将所有调度器计数器推进一个 tick。调度器正常工作**必须**在 `@tick` 函数中调用。

---

## 示例

### 延迟执行

```rs
import scheduler;

@tick
fn tick() {
    scheduler_tick();
    check_delayed();
}

fn trigger_explosion() {
    // 3 秒后爆炸
    task_schedule(@s, 0, 60);
}

fn check_delayed() {
    foreach (e in @e[tag=bomb]) {
        if (task_ready(e, 0) == 1) {
            // 爆炸！
            execute as e run {
                particle("explosion", ~ ~1 ~, 0.5, 0.5, 0.5, 0, 20);
            }
        }
    }
}
```

### 周期检查（循环定时器）

```rs
import scheduler;

@load
fn on_load() {
    // 100 tick 后首次检查
    gtask_schedule(0, 100);
}

@tick
fn tick() {
    scheduler_tick();

    if (gtask_ready(0) == 1) {
        // 执行周期性工作
        dialog_broadcast("服务器检查通过。");
        // 再调度 100 tick 后执行
        gtask_schedule(0, 100);
    }
}
```

### 单实体多独立定时器

```rs
import scheduler;

fn start_entity_timers() {
    task_schedule(@s, 0, 20);   // 任务 0：1 秒后触发
    task_schedule(@s, 1, 100);  // 任务 1：5 秒后触发
    task_schedule(@s, 2, 200);  // 任务 2：10 秒后触发
}

fn check_entity_timers() {
    if (task_ready(@s, 0) == 1) { /* 1 秒操作 */ }
    if (task_ready(@s, 1) == 1) { /* 5 秒操作 */ }
    if (task_ready(@s, 2) == 1) { /* 10 秒操作 */ }
}
```
