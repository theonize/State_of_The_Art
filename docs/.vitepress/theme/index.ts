// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

// Interactive study components, registered globally so they can be used
// directly inside any Markdown chapter.
import Declaration from './components/Declaration.vue'
import Scripture from './components/Scripture.vue'
import Reflect from './components/Reflect.vue'
import SelfCheck from './components/SelfCheck.vue'
import KeyTerm from './components/KeyTerm.vue'
import Views from './components/Views.vue'
import View from './components/View.vue'
import ChapterComplete from './components/ChapterComplete.vue'
import ProgressDashboard from './components/ProgressDashboard.vue'

import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {})
  },
  enhanceApp({ app }) {
    app.component('Declaration', Declaration)
    app.component('Scripture', Scripture)
    app.component('Reflect', Reflect)
    app.component('SelfCheck', SelfCheck)
    app.component('KeyTerm', KeyTerm)
    app.component('Views', Views)
    app.component('View', View)
    app.component('ChapterComplete', ChapterComplete)
    app.component('ProgressDashboard', ProgressDashboard)
  }
} satisfies Theme
