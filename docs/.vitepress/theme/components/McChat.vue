<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  messages: string[]
  title?: string
}>()

// Parse MC color codes (§x) into styled spans
function parseColorCodes(text: string): string {
  const colors: Record<string, string> = {
    '0': '#000000', '1': '#0000AA', '2': '#00AA00', '3': '#00AAAA',
    '4': '#AA0000', '5': '#AA00AA', '6': '#FFAA00', '7': '#AAAAAA',
    '8': '#555555', '9': '#5555FF', 'a': '#55FF55', 'b': '#55FFFF',
    'c': '#FF5555', 'd': '#FF55FF', 'e': '#FFFF55', 'f': '#FFFFFF',
    'r': '#FFFFFF'
  }
  
  let result = ''
  let currentColor = '#FFFFFF'
  let i = 0
  
  while (i < text.length) {
    if (text[i] === '§' && i + 1 < text.length) {
      const code = text[i + 1].toLowerCase()
      if (colors[code]) {
        currentColor = colors[code]
      }
      i += 2
    } else {
      result += `<span style="color: ${currentColor}">${text[i]}</span>`
      i++
    }
  }
  
  return result
}

const parsedMessages = computed(() => 
  props.messages.map(msg => parseColorCodes(msg))
)
</script>

<template>
  <div class="mc-chat">
    <div class="mc-chat-header" v-if="title">
      <span class="mc-chat-icon">💬</span>
      <span>{{ title }}</span>
    </div>
    <div class="mc-chat-body">
      <div 
        v-for="(msg, i) in parsedMessages" 
        :key="i" 
        class="mc-chat-line"
        v-html="msg"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.mc-chat {
  margin: 1rem 0;
  border-radius: 4px;
  overflow: hidden;
  background: #000000;
  border: 2px solid #1a1a1a;
}

.mc-chat-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #1a1a1a;
  font-size: 0.75rem;
  color: #888;
  font-family: var(--vp-font-family-base);
}

.mc-chat-body {
  padding: 0.75rem;
  font-family: 'Minecraft', 'Courier New', monospace;
  font-size: 16px;
  line-height: 1.4;
  color: #fff;
  text-shadow: 2px 2px 0 #3f3f3f;
}

.mc-chat-line {
  margin: 0.25rem 0;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
