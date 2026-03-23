<script setup lang="ts">
defineProps<{
  type?: 'tip' | 'warning' | 'danger' | 'info' | 'mc'
  title?: string
}>()

const icons = {
  tip: '💡',
  warning: '⚠️',
  danger: '🚫',
  info: 'ℹ️',
  mc: '⛏️'
}

const defaultTitles = {
  tip: 'Tip',
  warning: 'Warning',
  danger: 'Danger',
  info: 'Note',
  mc: 'Minecraft Note'
}
</script>

<template>
  <div class="custom-tip" :class="type || 'tip'">
    <div class="custom-tip-header">
      <span class="custom-tip-icon">{{ icons[type || 'tip'] }}</span>
      <span class="custom-tip-title">{{ title || defaultTitles[type || 'tip'] }}</span>
    </div>
    <div class="custom-tip-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.custom-tip {
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid;
}

.custom-tip.tip {
  background: rgba(85, 255, 85, 0.1);
  border-color: #55cc55;
}

.custom-tip.warning {
  background: rgba(255, 170, 0, 0.1);
  border-color: #ffaa00;
}

.custom-tip.danger {
  background: rgba(255, 85, 85, 0.1);
  border-color: #ff5555;
}

.custom-tip.info {
  background: rgba(85, 85, 255, 0.1);
  border-color: #5588ff;
}

.custom-tip.mc {
  background: rgba(85, 255, 255, 0.1);
  border-color: #55ffff;
}

.custom-tip-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.custom-tip-content {
  font-size: 0.9rem;
  line-height: 1.6;
}

.custom-tip-content :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
