import path from 'node:path'
import { defineConfig } from 'vitepress'
import Unocss from 'unocss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Jic999',
  description: 'Jic999\'s personal website~',
  appearance: false,
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdn.staticfile.org/lxgw-wenkai-webfont/1.6.0/style.css' }],
  ],
  vite: {
    plugins: [
      Unocss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './theme'),
      },
    },
    server: {
      port: 2002,
    },
  },
})
