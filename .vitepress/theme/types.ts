import type { Component } from 'vue'

export interface Post {
  title: string
  author: string
  url: string
  path: string
  content: string
  date: {
    time: number
    string: string
  }
  excerpt?: string
  banner?: string
  tags?: string[]
  dir?: string
  readingTime?: number
}

export interface PostGroupMap { [k: string]: Post[] }
export interface PostData {
  posts: Post[]
  postsByDate: PostGroupMap
  postsByDir: PostGroupMap
  postsByTag: PostGroupMap
}

export interface CustomPage {
  text: string
  path: string
  component: Component
  isNav?: boolean
}
