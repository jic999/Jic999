<script setup lang="ts">
import { onBeforeMount, onMounted, watch } from 'vue'
import { useData, useRouter } from 'vitepress'
import { usePreferredDark, useWindowScroll } from '@vueuse/core'
import NProgress from 'nprogress'
import JHeader from './components/JHeader.vue'
import JHome from './components/JHome.vue'
import JFooter from './components/JFooter.vue'
import JPage from './components/JPage.vue'
import JPost from './components/JPost.vue'
import NotFount from './components/NotFount.vue'
import JScrollBackBtn from './components/JScrollBackBtn.vue'

const { frontmatter, page } = useData()

const router = useRouter()

const { y } = useWindowScroll()

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

onBeforeMount(() => {
  NProgress.configure({ showSpinner: false })
  NProgress.start()

  const preferredDark = usePreferredDark()
  watch(preferredDark, () => {
    const favicon = document.querySelector('link[rel="shortcut icon"]')!
    if (preferredDark.value)
      favicon.setAttribute('href', '/favicon-dark.svg')
    else
      favicon.setAttribute('href', '/favicon.svg')
  }, { immediate: true })
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
      <div>
        <JScrollBackBtn v-show="y > 200" />
      </div>
    </main>
    <JFooter />
  </div>
</template>
