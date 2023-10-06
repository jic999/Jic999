---
title: Vitepress搭建个人博客——使用 nProgress 后项目打包失败
date: 2023-08-14
tags:
  - Vitepress
---

# Vitepress搭建个人博客——使用 nProgress 后项目打包失败

使用Vitepress搭建个人博客，项目开发环境下运行正常，但打包时报了如下错误：
![图 1](https://cdn.jsdelivr.net/gh/jic999/images/blog/20230813233123_c.webp)

![图 2](https://cdn.jsdelivr.net/gh/jic999/images/blog/20230813234806_c.webp)

## 原因

> `document is not defined`

```ts
// .vitepress/theme/index.ts
// Error code
export default {
  Layout,
  enhanceApp({ app, router }) {
    app.use(createPinia())
    router.onBeforeRouteChange = () => {
      nProgress.start()
    }
    router.onAfterRouteChanged = () => {
      nProgress.done()
    }
  },
  extends: DefaultTheme,
} as Theme
```
我在`enhanceApp`中使用了`nProgress`，由于`Vitepress` 是基于服务端渲染的，所以在打包时并不存在 `document`对象。而`nProgress`的实现却引用了`document`对象，因此会报这个错误。

## 解决方案

既然`node`环境下没有`document`对象，那么我们改为在页面中引入`nProgress`就行了。

```vue
// .vitepress/theme/Layout.vue

<script setup lang="ts">
import nProgress from 'nprogress'

onMounted(() => {
  // Loading bar, not int in 'index.ts', because of SSR
  // add first progress bar
  nProgress.start()
  setTimeout(() => nProgress.done())
  router.onBeforeRouteChange = () => {
    nProgress.start()
  }
  router.onAfterRouteChanged = () => {
    nProgress.done()
  }
})
</script>
```


