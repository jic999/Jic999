<script setup lang="ts">
import { useData } from 'vitepress'
import { onMounted } from 'vue'
import JHeader from './components/JHeader.vue'
import JHome from './components/JHome.vue'
import JFooter from './components/JFooter.vue'
import { data } from './posts.data'
import JContent from './components/JContent.vue'

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData()

onMounted(() => {
  console.log('data ==> ', data)
})
</script>

<template>
  <div>
    <JHeader />
    <div v-if="frontmatter.home">
      <JHome />
    </div>
    <div v-else>
      <JContent />
    </div>
    <JFooter />
  </div>
</template>
