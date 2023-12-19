<template>
  <div
    class="fixed inset-x-0 bottom-[50px] transition-opacity duration-200 pointer-events-none hidden md:block"
    :class="{
      'opacity-70 hover:opacity-100': show,
      'opacity-0': !show,
    }"
  >
    <div class="container flex justify-end">
      <button
        type="button"
        class="flex justify-center items-center w-11 h-11 bg-red-400 rounded-lg pointer-events-auto"
        @click="onClick"
      >
        <svg class="w-5 h-5" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12.0834L10 7.08337L15 12.0834" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const show = ref(false)

function onClick() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}

function onScroll() {
  show.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
