# 实体类型 <Badge type="tip" text="v1.2" />

RedScript 提供分层的实体类型系统，实现编译期类型安全和更好的 IDE 支持。

## 类型层级

```
entity (基类)
├── Player         ← @a, @p, @r
├── Mob
│   ├── HostileMob
│   │   ├── Zombie, Skeleton, Creeper, Spider, Enderman
│   └── PassiveMob
│       ├── Pig, Cow, Sheep, Chicken, Villager
├── ArmorStand
├── Item
└── Arrow
```

## 自动类型推断

### 从选择器推断

```mcrs
// @a 返回 Player 类型
foreach (p in @a) {
    give(p, "diamond", 1);    // ✅ Player 有 give()
    gamemode(p, "creative");  // ✅ Player 有 gamemode()
}

// @e 返回通用 entity
foreach (e in @e) {
    kill(e);                  // ✅ 所有实体都有 kill()
    give(e, "diamond", 1);    // ⚠️ 警告: give() 仅限 Player
}

// @e[type=X] 推断具体类型
foreach (z in @e[type=zombie]) {
    // z 类型为 Zombie
    kill(z);
}
```

### 选择器类型对照

| 选择器 | 推断类型 |
|--------|---------|
| `@a` | `Player` |
| `@p` | `Player` |
| `@r` | `Player` |
| `@e` | `entity` |
| `@e[type=zombie]` | `Zombie` |
| `@e[type=pig]` | `Pig` |
| `@s` | 取决于上下文 |

## 上下文感知的 @s

`@s`（自身）选择器的类型取决于执行上下文：

```mcrs
@tick fn tick() {
    // @s 是 entity（未知上下文）
}

foreach (p in @a) {
    // @s 是 Player（和 p 相同）
    effect(@s, "speed", 10, 1);  // ✅
}

foreach (p in @a) {
    as @e[type=zombie] {
        // @s 变成 Zombie
        kill(@s);
    }
    // @s 恢复为 Player
}
```

## 嵌套上下文

内层上下文覆盖外层：

```mcrs
foreach (p in @a) {
    // @s: Player
    
    as @e[type=armor_stand] {
        // @s: ArmorStand
        
        as @e[type=zombie] {
            // @s: Zombie
        }
        
        // @s: ArmorStand（恢复）
    }
    
    // @s: Player（恢复）
}
```

## 最佳实践

### 使用具体选择器

```mcrs
// ❌ 类型不安全
foreach (e in @e) {
    give(e, "diamond", 1);  // 非玩家实体会失败
}

// ✅ 类型安全
foreach (p in @a) {
    give(p, "diamond", 1);  // 保证是 Player
}
```

### 使用类型过滤器

```mcrs
// ❌ 通用实体
foreach (e in @e) {
    // 无法使用 Mob 专属方法
}

// ✅ 具体类型推断
foreach (z in @e[type=zombie]) {
    // z 是 Zombie，可用 Mob 方法
}
```

## 即将推出

- `is` 类型收窄：`if (e is Player) { ... }`
- 显式类型断言：`e as Zombie`
- 基于标签的自定义实体类型
