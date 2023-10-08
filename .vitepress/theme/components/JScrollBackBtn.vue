<script setup>
function scrollBack() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <Transition name="scroll-btn">
    <button title="Scroll to top" fixed bottom-xs right-xs z-99 rounded-full bg-transparent p-xs op50 text-btn hover:bg-hex-8883 @click="scrollBack">
      <div i-carbon:arrow-up text-primary />
    </button>
  </Transition>
</template>

<style lang="scss" scoped>
/* vue 淡出动画: 从下方淡入 上方淡出 */
.scroll-btn {
  &-enter-active,
  &-leave-active {
    transition: all .6s;
  }
  &-leave-active {
    transition-timing-function: ease-out;
  }
  &-enter-from {
    opacity: 0;
    transform: translateY(12px);
  }
  &-leave-to {
    opacity: 0;
    transform: translateY(-12px);
  }
}
</style>
