import path from 'node:path'
import { defineConfig } from 'vitepress'
import Unocss from 'unocss/vite'
import { bundledLanguages, getHighlighter } from 'shikiji'

// https://vitepress.dev/reference/site-config
export default async () => defineConfig({
  title: 'Jic999',
  description: 'Jic999\'s personal website~',
  appearance: false,
  cleanUrls: true,
  markdown: {
    highlight: await highlighter(),
  },
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

async function highlighter() {
  const hightlighter = await getHighlighter({
    themes: ['vitesse-dark', 'vitesse-light'],
    langs: Object.keys(bundledLanguages),
  })
  return (str: string, lang: string) => {
    return hightlighter.codeToHtml(str, {
      lang,
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
      cssVariablePrefix: '--s-',
    })
  }
}
