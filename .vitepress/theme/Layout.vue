<script setup lang="ts">
import { onBeforeMount, onMounted, watch } from 'vue'
import { useData, useRouter } from 'vitepress'
import { usePreferredDark } from '@vueuse/core'
import NProgress from 'NProgress'
import JHeader from './components/JHeader.vue'
import JHome from './components/JHome.vue'
import JFooter from './components/JFooter.vue'
import JPage from './components/JPage.vue'
import JPost from './components/JPost.vue'
import NotFount from './components/NotFount.vue'

const { frontmatter, page } = useData()

const router = useRouter()

const scrollYStorageKey = 'homeScrollY'

watch(() => frontmatter.value.home, (isHome) => {
  const html = document.documentElement
  const homeScrollY = localStorage.getItem(scrollYStorageKey)
  if (
    isHome
    && homeScrollY !== null
    && Number(homeScrollY) > 200
  )
    html.classList.add('no-sliding')
  else
    html.classList.remove('no-sliding')
})

const preferredDark = usePreferredDark()
watch(preferredDark, () => {
  const favicon = document.querySelector('link[rel="shortcut icon"]')!
  if (preferredDark.value)
    favicon.setAttribute('href', '/favicon-dark.svg')
  else
    favicon.setAttribute('href', '/favicon.svg')
}, { immediate: true })

onBeforeMount(() => {
  NProgress.configure({ showSpinner: false })
  NProgress.start()
})
onMounted(() => {
  /* Loading bar, not in 'index.ts', because of SSR */
  NProgress.done()
  router.onBeforeRouteChange = (to) => {
    NProgress.start()

    if (router.route.path === '/')
      localStorage.setItem(scrollYStorageKey, window.scrollY.toString())
    if (to === '/')
      localStorage.removeItem(scrollYStorageKey)
  }
  router.onAfterRouteChanged = () => {
    NProgress.done()
  }
  // TODO: 返回主页后不展示动画
  // window.addEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <JHeader />
    <main mt-lg>
      <NotFount v-if="page.isNotFound" />
      <JHome v-else-if="frontmatter.home" />
      <JPage v-else-if="frontmatter.layout === 'page'" />
      <JPost v-else />
    </main>
    <JFooter />
  </div>
</template>
