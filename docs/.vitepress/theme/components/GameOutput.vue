<script setup lang="ts">
defineProps<{
  type?: 'chat' | 'title' | 'actionbar' | 'screenshot'
  alt?: string
}>()
</script>

<template>
  <div class="game-output" :class="type">
    <div class="game-output-header">
      <span class="game-output-icon">🎮</span>
      <span class="game-output-label">
        {{ type === 'chat' ? 'Chat Output' : 
           type === 'title' ? 'Title Screen' :
           type === 'actionbar' ? 'Action Bar' :
           'In-Game Preview' }}
      </span>
    </div>
    <div class="game-output-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.game-output {
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
  background: #1e1e1e;
  font-family: 'Minecraft', monospace, sans-serif;
}

.game-output-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #2d2d2d;
  border-bottom: 1px solid #3d3d3d;
  font-size: 0.75rem;
  color: #888;
}

.game-output-icon {
  font-size: 1rem;
}

.game-output-content {
  padding: 1rem;
}

.game-output-content :deep(img) {
  max-width: 100%;
  border-radius: 4px;
}

/* Chat style */
.game-output.chat .game-output-content {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #fff;
}

/* Title style - centered, larger */
.game-output.title .game-output-content {
  text-align: center;
  font-size: 1.5rem;
  padding: 2rem;
  color: #fff;
  text-shadow: 2px 2px 0 #3f3f3f;
}

/* Action bar style */
.game-output.actionbar .game-output-content {
  text-align: center;
  font-size: 0.85rem;
  padding: 0.75rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
}
</style>
