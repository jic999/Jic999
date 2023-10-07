<script setup lang="ts">
import { useRoute } from 'vitepress'
import { data } from '@/posts.data'

const { posts } = data
const route = useRoute()
const meta = posts.find(post => route.path.includes(post.path))!
</script>

<template>
  <div class="slide-enter" mx-auto bg-main container padding-base>
    <h1 my-lg>
      {{ meta.title }}
    </h1>
    <div border-b pb-lg text-sm>
      {{ `${meta.date.string} · ${meta.readingTime} min` }}
    </div>
    <article class="prose" max-w-full>
      <Content class="slide-enter-post" />
    </article>
  </div>
</template>
