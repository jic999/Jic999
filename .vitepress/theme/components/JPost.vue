<script setup lang="ts">
import { useRoute } from 'vitepress'
import { data } from 'unplugin-blog-manager/data'

const { posts } = data
const route = useRoute()
const meta = posts.find(post => decodeURIComponent(route.path) === `${post.path}`)!
</script>

<template>
  <div mx-auto bg-main container padding-base>
    <div animate-fade-in animated>
      <h1 my-lg>
        {{ meta.title }}
      </h1>
      <div border-b pb-lg text-sm>
        {{ `${meta.date} · ${meta.readingTime} min` }}
      </div>
    </div>
    <img v-if="meta.banner" :src="meta.banner" mt-lg max-w-full rounded-lg>
    <article class="prose" max-w-full>
      <Content class="slide-enter-post" />
    </article>
  </div>
</template>
