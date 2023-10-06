<script setup lang="ts">
import { data } from '@/posts.data'
import { getSlideStyle } from '@/composables/app'

const { postsByDate } = data
</script>

<template>
  <div class="fade-in" mx-auto shadow bg-main container>
    <section padding-base>
      <template v-for="(posts, time, i) in postsByDate" :key="time">
        <div class="post-group" mt-6>
          <div class="slide-enter" :style="getSlideStyle(4 * i + 1)" mb-lg>
            {{ time }}
          </div>
          <div v-for="(post, index) in posts" :key="index" class="post-group__item" mb-8>
            <h2 class="slide-enter" :style="getSlideStyle(4 * i + 2)" text-contrast>{{ post.title }}</h2>
            <p class="slide-enter" :style="getSlideStyle(4 * i + 3)" my-sm leading-relaxed text-secondary>{{ post.excerpt }}</p>
            <img v-if="post.banner" class="slide-enter" :style="getSlideStyle(4 * i + 4)" :src="post.banner" mb-xs w-full>
            <div class="post-group__footer slide-enter" :style="getSlideStyle(4 * i + (post.banner ? 5 : 4))" flex justify-between border-b pb-6>
              <div>
                <div v-if="post.tags" flex gap-x-xs>
                  <span
                    v-for="(tag, Index) in post.tags"
                    :key="Index"
                    class="px-8px py-4px text-sm"
                    bg="gray-200 dark:hex-323232"
                  >{{ tag }}</span>
                </div>
              </div>
              <div>
                <span mr-sm text="sm secondary">{{ `${post.readingTime}min` }}</span>
                <a class="readmore__btn" :href="post.path" text-xl text-btn>Read more</a>
              </div>
            </div>
          </div>
        </div>
      </template>
    </section>
  </div>
</template>

<style scoped>
.post-group:last-child .post-group__footer {
  border-bottom: none;
}
.post-group__item:last-child {
  margin-bottom: 0;
}
</style>
