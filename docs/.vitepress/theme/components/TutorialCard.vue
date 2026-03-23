<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  time?: string
  href: string
  icon?: string
}>()

const difficultyColors = {
  beginner: '#55cc55',
  intermediate: '#ffaa00',
  advanced: '#ff5555'
}
</script>

<template>
  <a :href="href" class="tutorial-card">
    <div class="tutorial-card-icon" v-if="icon">{{ icon }}</div>
    <div class="tutorial-card-content">
      <h3 class="tutorial-card-title">{{ title }}</h3>
      <p class="tutorial-card-description" v-if="description">{{ description }}</p>
      <div class="tutorial-card-meta">
        <span 
          v-if="difficulty" 
          class="tutorial-card-difficulty"
          :style="{ color: difficultyColors[difficulty] }"
        >
          {{ difficulty }}
        </span>
        <span v-if="time" class="tutorial-card-time">⏱️ {{ time }}</span>
      </div>
    </div>
  </a>
</template>

<style scoped>
.tutorial-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
}

.tutorial-card:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tutorial-card-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.tutorial-card-content {
  flex: 1;
}

.tutorial-card-title {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.tutorial-card-description {
  margin: 0 0 0.5rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.tutorial-card-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
}

.tutorial-card-difficulty {
  text-transform: capitalize;
  font-weight: 600;
}

.tutorial-card-time {
  color: var(--vp-c-text-3);
}
</style>
