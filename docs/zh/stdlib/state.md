# `state` — 基于 Scoreboard 的状态机

导入：`import "stdlib/state.mcrs"`

使用单个 Minecraft scoreboard 目标（`rs.state`）实现轻量、可组合的状态机。每个实体持有一个整数状态值；提供的辅助函数可以读取、写入、守卫和转移状态。

## 初始化

在数据包的 `load` 函数中添加以下命令，确保 scoreboard 目标在任何状态操作之前已存在：

```mcfunction
scoreboard objectives add rs.state dummy
```

## 状态常量

在你的 RedScript 代码中自行定义状态常量：

```rs
let STATE_IDLE:   int = 0
let STATE_COMBAT: int = 1
let STATE_DEAD:   int = 2
```

`-1` 作为"尚未初始化"的哨兵值（参见 [`init_state`](#init_stateentity-selector-initial-int)）。

## 函数

### `get_state(entity: selector): Option<int>`

读取 `entity` 在 `rs.state` 中存储的当前状态值，以 `Some(state)` 形式返回。若实体尚未通过 `init_state` 初始化，返回 `None`。

**示例：**
```rs
import "stdlib/state.mcrs"

if let Some(s) = get_state(@s) {
    // 实体已初始化；s 为当前状态值
}
```

---

### `set_state(entity: selector, state: int)`

直接将 `state` 写入 `entity` 的 `rs.state`。不带守卫 — 需要守卫写入时请使用 [`transition`](#transitionentity-selector-from-int-to-int-int)。

**示例：**
```rs
import "stdlib/state.mcrs"

set_state(@s, STATE_IDLE)
```

---

### `is_state(entity: selector, state: int): int`

检查 `entity` 当前是否处于 `state` 状态。

若实体当前状态等于 `state` 则返回 `1`，否则返回 `0`。

**示例：**
```rs
import "stdlib/state.mcrs"

if (is_state(@s, STATE_COMBAT) == 1) {
    // 实体正在战斗
}
```

---

### `init_state(entity: selector, initial: int)`

**仅在**实体尚未初始化时（当前分数为 `-1`）将 `entity` 的状态设置为 `initial`。可以每 tick 调用，初始化成功一次后即为空操作。

**示例：**
```rs
import "stdlib/state.mcrs"

// 每 tick 调用 — 只会在首次时设置 STATE_IDLE。
init_state(@s, STATE_IDLE)
```

---

### `clear_state(entity: selector)`

从 `rs.state` 中删除 `entity` 的状态值，将其重置为未初始化哨兵值（`-1`）。在实体移除或需要完全重置状态机时使用。

**示例：**
```rs
import "stdlib/state.mcrs"

// 实体消失 — 清除其状态，以便再次生成时重新初始化。
clear_state(@s)
```

---

### `transition(entity: selector, from: int, to: int): int`

尝试守卫转移：仅当 `entity` 当前处于 `from` 状态时，才将其状态转移至 `to`。

成功返回 `1`；若实体不处于 `from` 状态（转移未发生）则返回 `0`。

**示例：**
```rs
import "stdlib/state.mcrs"

let ok: int = transition(@s, STATE_IDLE, STATE_COMBAT)
if (ok == 1) {
    // 实体进入战斗状态
}
```

---

## 完整示例

```rs
import "stdlib/state.mcrs"

let STATE_IDLE:   int = 0
let STATE_COMBAT: int = 1
let STATE_DEAD:   int = 2

// 在实体生成时调用一次（例如从 load/init 函数中调用）。
fn entity_spawn() {
    init_state(@s, STATE_IDLE)
}

// 每 tick 对每个受管理的实体调用。
fn entity_tick() {
    // 根据当前状态分派逻辑
    if (is_state(@s, STATE_IDLE) == 1) {
        // 待机逻辑 …
    }

    if (is_state(@s, STATE_COMBAT) == 1) {
        // 战斗逻辑 …
        // 若 HP 降为零则转移至死亡状态
        let ok: int = transition(@s, STATE_COMBAT, STATE_DEAD)
    }

    if (is_state(@s, STATE_DEAD) == 1) {
        // 死亡逻辑 …
    }
}

// 由外部事件触发（例如检测到玩家靠近）。
fn on_player_near() {
    // 只从待机状态进入战斗 — 即使已在战斗中调用也是安全的。
    let ok: int = transition(@s, STATE_IDLE, STATE_COMBAT)
}
```

## 注意事项

- `rs.state` 目标使用 `dummy` 标准，值在 tick 之间持久保留，但**不会**在数据包重新加载时自动保存（除非 load 函数做了相应处理）。
- 新实体的 scoreboard 默认值为 `0`，**而非** `-1`。在生成实体后，务必调用 `init_state`（或先 `set_state(@s, -1)` 再调用 `init_state`），以确保首次 `init_state` 调用前哨兵值已正确设置。
- 若需要为同一实体维护多个独立状态机，可定义额外的 scoreboard 目标，并编写直接调用原始 scoreboard 内置函数的薄封装层。
