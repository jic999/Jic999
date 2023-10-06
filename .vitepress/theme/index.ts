// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import 'uno.css'
import './styles/index.css'
import 'nprogress/nprogress.css'

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
  },
} as Theme
