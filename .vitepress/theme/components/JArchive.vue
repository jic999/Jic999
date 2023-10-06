<script setup lang="ts">
import { getSlideStyle } from '@/composables/app'
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

function getIndex(i: number) {
  return Object.keys(postByYear).slice(0, i).reduce((acc, cur) => {
    return acc + postByYear[cur].length + 1
  }, 0)
}
</script>

<template>
  <div class="fade-in" px="8 md:20%" flex-center py-4 bg-main container>
    <div flex flex-col items-start>
      <div
        v-for="(list, time, i) in postByYear"
        :key="time"
        class="archive-group"
        flex flex-col border-b py8
      >
        <div class="slide-enter" :style="getSlideStyle(getIndex(i))" text-2rem>
          {{ time }}
        </div>
        <div flex flex-col items-start gap-y-xs py-6>
          <template v-for="(post, index) in list" :key="post.url">
            <a class="slide-enter" :style="getSlideStyle(getIndex(i) + index + 1)" flex text-secondary transition-color-300 hover:text-primary :href="post.path">
              <div w-132px shrink-0>
                {{ post.month }}
              </div>
              <div ml-lg leading-relaxed ellipsis-2>{{ post.title }}</div>
            </a>
          </template>
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
