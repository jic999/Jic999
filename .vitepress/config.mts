import path, { resolve } from 'node:path'
import { defineConfig } from 'vitepress'
import Unocss from 'unocss/vite'
import { bundledLanguages, getHighlighter } from 'shikiji'
import anchor from 'markdown-it-anchor'
import BlogManager from 'unplugin-blog-manager/vite'

// https://vitepress.dev/reference/site-config
export default async () => defineConfig({
  title: 'Jic999',
  description: 'Jic999\'s personal website~',
  appearance: false,
  cleanUrls: true,
  lang: 'zh-CN',
  markdown: {
    highlight: await highlighter(),
    anchor: {
      permalink: anchor.permalink.linkInsideHeader({
        symbol: '#',
        renderAttrs: () => ({ 'aria-hidden': 'true' }),
      }),
    },
  },
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdn.staticfile.org/lxgw-wenkai-webfont/1.6.0/style.css' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/firacode@6.2.0/distr/fira_code.css' }],
    ['link', { rel: 'shortcut icon', type: 'image/svg' }],
  ],
  vite: {
    plugins: [
      Unocss(),
      BlogManager({
        targetDir: resolve(__dirname, '../posts'),
        author: 'jic999',
        excludes: ['index.md'],
      }),
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
