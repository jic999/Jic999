import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import type { Post, PostData, PostGroupMap } from './types'

const excludedFiles = ['index.md']

declare const data: PostData
export { data }

export default {
  watch: ['../../posts/**/*.md'],
  load(watchedFiles: string[]) {
    // 排除不必要文件
    const articleFiles: string[] = watchedFiles.filter((file) => {
      const filename = path.basename(file)
      return !excludedFiles.includes(filename)
    })
    // 解析文章 Frontmatter
    const posts = articleFiles
      .map((articleFile) => {
        const articleContent = fs.readFileSync(articleFile, 'utf-8')
        let { data, excerpt } = matter(articleContent, { excerpt: true })
        // 计算阅读时间
        const md = new MarkdownIt()
        const tokens = md.parse(articleContent, {})
        // 若无摘录 excerpt，则自动生成
        if (!excerpt) {
          excerpt = ''
          const filterTokens = tokens.filter(item => item.children?.length === 1)
          for (const token of filterTokens) {
            if (isNormalParagraph(token.content))
              excerpt += token.content
            if (excerpt.length > 120)
              break
          }
        }
        return {
          author: 'jic999',
          ...data,
          date: formatDate(data.date),
          excerpt,
          path: articleFile.substring(articleFile.lastIndexOf('/posts/')).replace(/\.md$/, ''),
          readingTime: Math.ceil(tokens.length / 30),
        } as Post
      })
      .sort((a, b) => b.date.time - a.date.time)
    return {
      posts,
      ...categorizePosts(posts),
    }
  },
}

function formatDate(date: string | Date) {
  if (!(date instanceof Date))
    date = new Date(date)
  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }
}

export function getArticleExcerpt(content: string) {
  const md = new MarkdownIt()
  const result = md.parse(content, {})
  let excerpt = ''
  const tokens = result.filter(item => item.children?.length === 1)
  for (const token of tokens) {
    if (isNormalParagraph(token.content))
      excerpt += token.content
    if (excerpt.length > 120)
      return excerpt
  }
  return excerpt
}

export function readMdFiles(dir: string) {
  const files = fs.readdirSync(dir)
  const mdFiles: string[] = []

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory())
      mdFiles.push(...readMdFiles(filePath))
    else if (path.extname(filePath) === '.md')
      mdFiles.push(filePath)
  })

  return mdFiles
}

export function categorizePosts(posts: Post[]) {
  const postsByDate: PostGroupMap = {}
  const postsByDir: PostGroupMap = {}
  const postsByTag: PostGroupMap = {}

  posts.forEach((post) => {
    // 按date分类
    if (!postsByDate[post.date.string] && post.date.time)
      postsByDate[post.date.string] = []
    if (post.date.time)
      postsByDate[post.date.string].push(post)
    // 按dir分类
    // - path从posts截断
    const start = post.path.indexOf('\\posts')
    post.path = post.path.substring(start, post.path.length).split('\\').join('/')
    // - 倒数第二个即为目录
    const dirArr = post.path.split('/')
    const dirName = dirArr[dirArr.length - 2]
    if (!postsByDir[dirName])
      postsByDir[dirName] = []
    post.dir = dirName
    postsByDir[dirName].push(post)
    // 按tag分类
    const tagList = post.tags || []
    tagList.forEach((tag) => {
      if (!postsByTag[tag])
        postsByTag[tag] = []
      postsByTag[tag].push(post)
    })
  })
  return {
    postsByDate,
    postsByDir,
    postsByTag,
  }
}

function isNormalParagraph(mdText) {
  // 定义正则表达式模式，用于匹配各种 Markdown 标记
  const imagePattern = /!\[[^\]]*\]\((.*?)\)/
  const linkPattern = /\[[^\]]*\]\((.*?)\)/
  const tablePattern = /\|.*\|/
  const headerPattern = /#{1,6} .*/

  if (
    imagePattern.test(mdText)
    || linkPattern.test(mdText)
    || tablePattern.test(mdText)
    || headerPattern.test(mdText)
  )
    return false
  return true
}
