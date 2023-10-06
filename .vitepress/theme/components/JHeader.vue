<script setup lang="ts">
import { toggleDark } from '@/composables/app'
</script>

<template>
  <header flex justify-between px-12 py-xs shadow bg-main>
    <a href="/" text-lg font-600>Jic999</a>
    <div flex items-center gap-x-8>
      <div flex gap-x-lg>
        <a href="/" text-btn-primary>Home</a>
        <a href="/about" text-btn-primary>About</a>
      </div>
      <div flex gap-x-lg text-base>
        <div i-uil:github-alt text-btn-primary />
        <div dark:i-ri:sun-line i-ri:moon-line text-btn-primary @click="() => toggleDark()" />
      </div>
    </div>
  </header>
</template>
