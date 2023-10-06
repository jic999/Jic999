<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue'
import { useData, useRouter } from 'vitepress'
import NProgress from 'NProgress'
import JHeader from './components/JHeader.vue'
import JHome from './components/JHome.vue'
import JFooter from './components/JFooter.vue'
import JContent from './components/JContent.vue'

// https://vitepress.dev/reference/runtime-api#usedata
const { frontmatter } = useData()

const router = useRouter()

onBeforeMount(() => {
  NProgress.configure({ showSpinner: false })
  NProgress.start()
})
onMounted(() => {
  /* Loading bar, not in 'index.ts', because of SSR */
  NProgress.done()
  router.onBeforeRouteChange = () => {
    NProgress.start()
  }
  router.onAfterRouteChanged = () => {
    NProgress.done()
  }
})
</script>

<template>
  <div>
    <JHeader />
    <main mt-lg>
      <div v-if="frontmatter.home">
        <JHome />
      </div>
      <div v-else>
        <JContent />
      </div>
    </main>
    <JFooter />
  </div>
</template>
