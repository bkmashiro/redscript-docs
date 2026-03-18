# `effects` — 药水效果辅助函数

Import: `import effects;`

常用药水效果的命名包装函数，封装内置的 `effect()` 和 `effect_clear()` 命令，以及便捷的"全增益"套装。

## Functions

### `speed(target: selector, duration: int, level: int)`

对目标施加 `minecraft:speed`（速度）效果。

**Example:**
```rs
import effects;
speed(@s, 200, 1);  // 速度 II 持续 10 秒
```

---

### `jump(target: selector, duration: int, level: int)`

对目标施加 `minecraft:jump_boost`（跳跃提升）效果。

---

### `regen(target: selector, duration: int, level: int)`

对目标施加 `minecraft:regeneration`（生命恢复）效果。

---

### `resistance(target: selector, duration: int, level: int)`

对目标施加 `minecraft:resistance`（抗性提升）效果。

---

### `strength(target: selector, duration: int, level: int)`

对目标施加 `minecraft:strength`（力量）效果。

---

### `invisible(target: selector, duration: int)`

对目标施加 `minecraft:invisibility`（隐身）效果（放大器为 0）。

---

### `night_vision(target: selector, duration: int)`

对目标施加 `minecraft:night_vision`（夜视）效果（放大器为 0）。

---

### `slow_fall(target: selector, duration: int)`

对目标施加 `minecraft:slow_falling`（缓降）效果（放大器为 0）。

---

### `glow(target: selector, duration: int)`

对目标施加 `minecraft:glowing`（发光）效果（放大器为 0）。

---

### `clear_effects(target: selector)`

清除目标的所有效果。

**Example:**
```rs
import effects;
clear_effects(@a);
```

---

### `clear_effect(target: selector, eff: string)`

清除目标的指定效果。

**Example:**
```rs
import effects;
clear_effect(@s, "minecraft:poison");
```

---

### `buff_all(target: selector, duration: int)`

施加全增益套装：速度 I、力量 I、生命恢复 I、抗性 0。

**Example:**
```rs
import effects;
buff_all(@a, 600);  // 为所有玩家提供 30 秒全增益
```
