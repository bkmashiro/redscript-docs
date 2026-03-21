# `dialog` — 玩家对话与消息

Import: `import dialog;`

向玩家显示消息的辅助函数：聊天消息、广播、彩色文本、标题/副标题叠加层、动作栏文本等。基于 Minecraft 的 `tellraw`、`title` 和 `actionbar` 命令构建。

## Functions

### `dialog_say(p: selector, msg: string)`

向目标玩家发送普通聊天消息。

**示例：**
```rs
import dialog;
dialog_say(@s, "欢迎来到竞技场！");
```

---

### `dialog_broadcast(msg: string)`

向服务器上**所有**玩家（`@a`）发送聊天消息。

**示例：**
```rs
import dialog;
dialog_broadcast("回合已开始！");
```

---

### `dialog_say_color(p: selector, msg: string, color: int)`

发送彩色聊天消息。`color` 为 0–4 的整数：

| 值 | 颜色 |
|----|------|
| `0` | 白色（默认） |
| `1` | 黄色 |
| `2` | 红色 |
| `3` | 绿色 |
| `4` | 青色 |

**示例：**
```rs
import dialog;
dialog_say_color(@s, "警告：生命值过低！", 2);   // 红色
dialog_say_color(@a, "你赢了！", 3);              // 绿色
```

---

### `dialog_title(p: selector, title: string, subtitle: string)`

向目标玩家显示标题与副标题叠加层。使用 Minecraft 默认的淡入/停留/淡出时间。

**示例：**
```rs
import dialog;
dialog_title(@s, "第 1 回合", "存活 60 秒");
```

---

### `dialog_title_clear(p: selector)`

立即清除目标玩家的标题叠加层。

**示例：**
```rs
import dialog;
dialog_title_clear(@s);
```

---

### `dialog_actionbar(p: selector, msg: string)`

在动作栏（快捷栏上方区域）显示消息。消息约 2 秒后消失，如需持续显示需每 tick 刷新。

**示例：**
```rs
import dialog;
dialog_actionbar(@s, "生命：${score(@s, #hp)} / 100");
```

---

## 完整示例

```rs
import dialog;

@load
fn on_load() {
    dialog_broadcast("数据包已加载。输入 /trigger start 开始。");
}

fn start_round(round: int) {
    dialog_broadcast("第 ${round} 回合开始！");
    dialog_title(@a, "第 ${round} 回合", "战斗！");
}

fn warn_low_hp() {
    dialog_say_color(@s, "你的生命值极低！", 2);
    dialog_actionbar(@s, "⚠ 生命值过低 — 请立即回血！");
}

fn end_round(winner: selector) {
    dialog_title_clear(@a);
    dialog_title(winner, "胜利！", "你赢得了本回合");
    dialog_broadcast("回合结束！");
}
```
