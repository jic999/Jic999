<script setup>
function scrollBack() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <button title="Scroll to top" fixed bottom-xs right-xs z-99 rounded-full bg-transparent p-xs op50 text-btn hover:bg-hex-8883 @click="scrollBack">
    <div class="slide-enter" i-carbon:arrow-up text-primary />
  </button>
</template>
