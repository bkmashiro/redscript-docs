import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

// Custom components
import CodePreview from './components/CodePreview.vue'
import GameOutput from './components/GameOutput.vue'
import TutorialCard from './components/TutorialCard.vue'
import Tip from './components/Tip.vue'

import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register global components
    app.component('CodePreview', CodePreview)
    app.component('GameOutput', GameOutput)
    app.component('TutorialCard', TutorialCard)
    app.component('Tip', Tip)
  }
} satisfies Theme
