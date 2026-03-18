# Tutorial 05: Decorators & Scheduling

**Difficulty:** Intermediate  
**Time:** ~20 minutes  
**Prerequisites:** [Tutorial 04: Selectors & Execute Context](./04-selectors-context)

## What You'll Build

A countdown timer system. Players trigger a 10-second countdown with `/trigger start_countdown`. Titles update every second, and a firework launches at zero. An extra trigger delays a message by 5 seconds using `@schedule`.

## What You'll Learn

- `@load` — once on world load
- `@tick` — every game tick (20/sec)
- `@tick(rate=N)` — every N ticks
- `@on_trigger("name")` — player-activated
- `@schedule(N)` — one-shot after N ticks

## Decorator Reference

| Decorator | When it runs |
|-----------|-------------|
| `@load` | Once when world loads or `/reload` |
| `@tick` | Every tick (20×/sec) — be careful! |
| `@tick(rate=20)` | Every 20 ticks = once per second |
| `@tick(rate=100)` | Every 100 ticks = every 5 seconds |
| `@on_trigger("x")` | When a player runs `/trigger x` |
| `@schedule(40)` | Once, 40 ticks (2 seconds) after called |

## Step 1: Load

```rs
@load
fn on_load() {
    scoreboard_add_objective("tut05_data", "dummy")
    say("Countdown system ready! /trigger start_countdown")
}
```

## Step 2: Rate-Limited Tick

```rs
// Runs every 20 ticks = exactly once per second
@tick(rate=20)
fn every_second() {
    if (timer.running == 0) {
        return   // nothing to do
    }

    timer.seconds_left = timer.seconds_left - 1

    if (timer.seconds_left > 0) {
        show_countdown(timer.seconds_left)
    } else {
        fire_at_zero()
    }
}
```

`@tick(rate=20)` is much cheaper than `@tick` — your function only runs 1 time per second instead of 20.

## Step 3: Countdown Display

```rs
fn show_countdown(sec: int) {
    tell(@a, f"Countdown: {sec}")
    if (sec <= 3) {
        subtitle(@a, "Hurry!")
        actionbar(@a, f"⏱ {sec} seconds!")
    } else {
        subtitle(@a, "Get ready...")
        actionbar(@a, f"Countdown: {sec}")
    }
}
```

## Step 4: The Trigger

```rs
// Players type: /trigger start_countdown
@on_trigger("start_countdown")
fn start_countdown() {
    if (timer.running == 1) {
        tell(@s, "A countdown is already running!")
        return
    }

    timer.running = 1
    timer.seconds_left = 10

    announce("Countdown started!")
    subtitle(@a, "Countdown begins!")
    title_times(@a, 5, 15, 5)
}
```

## Step 5: The Finale

```rs
fn fire_at_zero() {
    timer.running = 0
    timer.seconds_left = 0

    title(@a, "GO!")
    subtitle(@a, "Time is up!")
    say("Countdown complete!")
    summon("minecraft:firework_rocket", 0, 65, 0)
}
```

## Step 6: Scheduled One-Shot

`@schedule(N)` doesn't make a function run on a timer — it marks it so that **when you call it**, the execution is deferred by N ticks.

```rs
// Players type: /trigger delayed_message
@on_trigger("delayed_message")
fn queue_delayed() {
    tell(@s, "Message will appear in 5 seconds...")
    delayed_deliver()   // calling this schedules it for 100 ticks later
}

// This function is called normally, but runs 100 ticks (5 seconds) after invocation
@schedule(100)
fn delayed_deliver() {
    say("This message was delayed by 5 seconds!")
    title(@a, "Delayed!")
}
```

## Complete Code

Full example: [tutorial_05_decorators.mcrs](https://github.com/bkmashiro/redscript/blob/main/src/examples/tutorial_05_decorators.mcrs)

## Try It Out

1. Install and `/reload`
2. Run `/trigger start_countdown` — countdown starts
3. Watch the titles update each second
4. At zero, a firework launches
5. Run `/trigger stop_countdown` mid-countdown to cancel
6. Run `/trigger delayed_message` — message appears 5 seconds later

## Decorator Decision Guide

```
Need it to run continuously?  → @tick or @tick(rate=N)
Once per second exactly?      → @tick(rate=20)
On world load?                → @load
Player-activated?             → @on_trigger("name")
Delayed one-shot?             → @schedule(N)
```

## Next Steps

→ [Tutorial 06: Standard Library — Math & Particles](./06-stdlib-math)
