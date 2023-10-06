<script setup lang="ts">
import { data as postData } from '@/posts.data'

const postByYear: any = {}

postData.posts.forEach((item) => {
  const _date = item.date.string.split(',')
  const month = _date[0]
  const year = _date[1]
  if (!postByYear[year])
    postByYear[year] = []
  postByYear[year].push({
    ...item,
    month,
    year,
  })
})
</script>

<template>
  <div class="fade-in" flex-center px="8 md:20%" bg-main container>
    <div flex flex-col items-start>
      <div
        v-for="(list, time) in postByYear"
        :key="time"
        class="archive-group slide-enter-content"
        flex flex-col border-b py-8
      >
        <div py-lg text-2rem>
          {{ time }}
        </div>
        <div class="slide-enter-content" flex flex-col items-start gap-y-xs>
          <a v-for="post in list" :key="post.url" flex text-secondary transition-color-300 hover:text-primary :href="post.path">
            <div w-132px shrink-0>
              {{ post.month }}
            </div>
            <div ml-lg leading-relaxed ellipsis-2>{{ post.title }}</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.archive-group:last-child {
  border-bottom: none;
}
</style>
