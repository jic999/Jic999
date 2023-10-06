<script setup lang="ts">
import { data } from '@/posts.data'

const { postsByDate } = data
</script>

<template>
  <div mx-auto shadow bg-main container>
    <section padding-base>
      <template v-for="(posts, time) in postsByDate" :key="time">
        <div class="post-group" border-b py-6>
          <div mb-lg>{{ time }}</div>
          <div v-for="(post, i) in posts" :key="i" class="post-group__item" mb-8>
            <h2 text-contrast>{{ post.title }}</h2>
            <p my-sm leading-relaxed>{{ post.excerpt }}</p>
            <div flex justify-between>
              <div>
                <div v-if="post.tags" flex gap-x-xs>
                  <span
                    v-for="(tag, index) in post.tags"
                    :key="index"
                    class="px-8px py-4px text-sm"
                    bg="gray-200 dark:hex-323232"
                  >{{ tag }}</span>
                </div>
              </div>
              <a :href="post.path" text-btn>Read more</a>
            </div>
          </div>
        </div>
      </template>
    </section>
  </div>
</template>

<style scoped>
.post-group:last-child {
  border-bottom: none;
}
.post-group__item:last-child {
  margin-bottom: 0;
}
</style>
