<template>
  <button type="button" @click="onClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  onlyMobile?: boolean
}>()

const config = useRuntimeConfig()

function onClick() {
  if ((props.onlyMobile && window.matchMedia('(max-width: 767px)').matches) ||
      !props.onlyMobile
  ) {
    window.open(config.public.encoreAppURL, '_blank')
  }
}
</script>
