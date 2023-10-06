<script setup lang="ts">
import { useRoute } from 'vitepress'
import { data } from '@/posts.data'

const { posts } = data
const route = useRoute()
const meta = posts.find(post => route.path.includes(post.path))!
</script>

<template>
  <div mx-auto padding-base bg-main container>
    <h1 my-lg>
      {{ meta.title }}
    </h1>
    <div border-b pb-lg text-sm>
      预计阅读时长：{{ `${meta.readingTime} min` }}
    </div>
    <article max-w-full prose>
      <Content />
    </article>
  </div>
</template>
