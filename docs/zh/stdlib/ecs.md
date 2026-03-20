# `ecs` — Entity Component System

导入：`import "stdlib/ecs.mcrs"`

Entity Component System（ECS）是一种数据驱动的模式，用于将带类型的"组件"（结构化数据）附加到游戏实体上。Minecraft Java 版 datapack 没有内置的组件系统（与基岩版不同），因此 `ecs.mcrs` 使用以下方式提供此功能：

- **scoreboard objectives** — 整数字段（HP、速度等）
- **entity tags** — 组件存在标志（`ecs_has_<comp_name>`）
- **NBT storage** — 复杂数据（通过 `raw()`）

若不使用 ECS，每种实体类型都需要编写数百行硬编码的原始 NBT。使用 `ecs.mcrs` 后，组件状态存储在一个有类型的 `int[]` 数组中，可以通过命名辅助函数传递、修改和读取——更接近通用游戏引擎中组件系统的工作方式。

## Tag 命名规范

携带某个组件的实体应添加对应的 Minecraft tag：

```
ecs_has_health     → 实体拥有 health 组件
ecs_has_velocity   → 实体拥有 velocity 组件
ecs_has_damage     → 实体拥有 damage 组件
```

这样可以让选择器高效过滤：`@e[tag=ecs_has_health]`。

## 组件类型 ID

注册表使用三个内置组件类型常量：

| 常量               | 值 |
|--------------------|----|
| `ECS_COMP_HEALTH`  | 1  |
| `ECS_COMP_VELOCITY`| 2  |
| `ECS_COMP_DAMAGE`  | 3  |

## 使用示例

完整的实体生命周期——创建、受伤、检查死亡：

```rs
import "stdlib/ecs.mcrs";

// --- 注册表设置 ---
let reg: int[] = ecs_registry_new();
reg = ecs_register(reg, ECS_COMP_HEALTH);
reg = ecs_register(reg, ECS_COMP_VELOCITY);

// --- 生成 ID 为 42 的实体 ---
let hp: int[] = ecs_health_init(42, 100);     // 满血，最大 100
let vel: int[] = ecs_vel_init(1000, 0, 500);  // vx=1.0, vy=0.0, vz=0.5 (×1000)

// 在 Minecraft 中为实体添加 tag（通过 raw() 或 .mcfunction）：
//   tag @e[scores={ecs_entity=42}] add ecs_has_health
//   tag @e[scores={ecs_entity=42}] add ecs_has_velocity

// --- 战斗 tick ---
hp = ecs_health_damage(hp, 30);  // 受到 30 点伤害 → 70 HP

// --- 物理 tick ---
vel = ecs_vel_apply_gravity(vel, 980);  // 每 tick 减少 0.980 格/tick²
vel = ecs_vel_damp(vel, 9000);          // 90% 空气阻力

// --- 死亡检查 ---
if (ecs_health_is_dead(hp) == 1) {
    // 实体死亡——触发死亡逻辑
}

let pct: int = ecs_health_pct(hp);  // 7000 = 70.00%
```

## 函数

### 注册表

#### `ecs_registry_new(): int[]`

分配一个空白的 16 槽注册表。所有槽位初始化为 0（未注册任何组件）。注册表追踪 datapack 中哪些组件类型处于激活状态。

---

#### `ecs_register(reg: int[], comp_id: int): int[]`

在 `reg` 中将 `comp_id` 标记为已注册。返回更新后的注册表。`comp_id` 必须在 `[0, 15]` 范围内；超出范围的值会被静默忽略。

**示例：**
```rs
let reg: int[] = ecs_registry_new();
reg = ecs_register(reg, ECS_COMP_HEALTH);
```

---

#### `ecs_is_registered(reg: int[], comp_id: int): int`

如果 `comp_id` 已注册则返回 `1`，否则返回 `0`。超出范围的 ID 返回 `0`。

**示例：**
```rs
let ok: int = ecs_is_registered(reg, ECS_COMP_VELOCITY);  // 1 或 0
```

---

### Health 组件

状态布局——`int[8]`：

| 索引 | 字段           | 说明                           |
|------|----------------|--------------------------------|
| 0    | `entity_score` | 用作实体 ID 的 scoreboard 分数 |
| 1    | `current_hp`   | 当前生命值                     |
| 2    | `max_hp`       | 最大生命值                     |
| 3–7  | *(保留)*       | 0                              |

#### `ecs_health_init(entity_score: int, max_hp: int): int[]`

创建 health 组件状态。将 `current_hp = max_hp`（生成时满血）。

```rs
let hp: int[] = ecs_health_init(42, 100);  // 实体 42，100/100 HP
```

---

#### `ecs_health_get(state: int[]): int`

返回当前 HP。

---

#### `ecs_health_max(state: int[]): int`

返回最大 HP。

---

#### `ecs_health_set(state: int[], hp: int): int[]`

设置当前 HP，夹紧到 `[0, max_hp]`。返回更新后的状态。

---

#### `ecs_health_damage(state: int[], amount: int): int[]`

从当前 HP 中减去 `amount`，夹紧到 `0`。返回更新后的状态。

---

#### `ecs_health_heal(state: int[], amount: int): int[]`

向当前 HP 中加上 `amount`，夹紧到 `max_hp`。返回更新后的状态。

---

#### `ecs_health_is_dead(state: int[]): int`

如果 `current_hp <= 0` 则返回 `1`，否则返回 `0`。

---

#### `ecs_health_pct(state: int[]): int`

以 ×10000 定点数形式返回 HP 百分比。

```
pct = current_hp × 10000 / max_hp
```

50 HP / 100 最大值 → `5000`（= 50.00%）。如果 `max_hp <= 0` 则返回 `0`。

---

### Velocity 组件

状态布局——`int[8]`：

| 索引 | 字段   | 说明                                           |
|------|--------|------------------------------------------------|
| 0    | `vx`   | X 方向速度，×1000 定点数（1000 = 1.0 格/tick）|
| 1    | `vy`   | Y 方向速度，×1000 定点数                       |
| 2    | `vz`   | Z 方向速度，×1000 定点数                       |
| 3–7  | *(保留)* | 0                                            |

定点数约定：`1000` = 1.0 格/tick。

#### `ecs_vel_init(vx: int, vy: int, vz: int): int[]`

创建具有给定分量的 velocity 组件状态。

```rs
let vel: int[] = ecs_vel_init(1000, 0, 500);  // 1.0, 0.0, 0.5 格/tick
```

---

#### `ecs_vel_get_x(state: int[]): int`

返回 `vx`（×1000）。

---

#### `ecs_vel_get_y(state: int[]): int`

返回 `vy`（×1000）。

---

#### `ecs_vel_get_z(state: int[]): int`

返回 `vz`（×1000）。

---

#### `ecs_vel_set(state: int[], vx: int, vy: int, vz: int): int[]`

设置全部三个速度分量。返回更新后的状态。

---

#### `ecs_vel_speed(state: int[]): int`

以 ×1000 定点数返回速度向量的大小。

```
speed = sqrt(vx² + vy² + vz²)
```

**示例：** `ecs_vel_speed([3000, 4000, 0, ...])` → `5000`（勾股定理 3-4-5）。

---

#### `ecs_vel_apply_gravity(state: int[], gravity_fx: int): int[]`

每 tick 从 `vy` 中减去 `gravity_fx`。`gravity_fx` 为 ×1000 定点数；例如 `980` ≈ 0.980 格/tick²（近似 Minecraft 默认重力 0.08 g/tick）。返回更新后的状态。

---

#### `ecs_vel_damp(state: int[], factor_fx: int): int[]`

将每个速度分量乘以 `factor_fx / 10000`（摩擦力/空气阻力）。`factor_fx` 为 ×10000；例如 `8000` = 0.80 阻尼（每 tick 损失 20% 速度）。返回更新后的状态。

**示例：**
```rs
vel = ecs_vel_damp(vel, 9000);  // 每 tick 保留 90%
```
