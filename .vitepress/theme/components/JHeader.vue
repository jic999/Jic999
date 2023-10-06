<script setup lang="ts">
import { toggleDark } from '@/composables/app'
</script>

<template>
  <header flex justify-between padding-base py-xs shadow bg-main>
    <a href="/" text-lg font-600>Jic999</a>
    <div flex items-center gap-x-8>
      <div flex gap-x-lg>
        <a href="/" text-btn-primary>Home</a>
        <a href="/archive" text-btn-primary>Archive</a>
      </div>
      <div flex gap-x-lg text-base>
        <a title="GitHub" i-uil:github-alt href="https://github.com/jic999" target="_blank" text-btn-primary />
        <a title="Toggle Color Scheme" i-ri:moon-line dark:i-ri:sun-line text-btn-primary @click="() => toggleDark()" />
      </div>
    </div>
  </header>
</template>
