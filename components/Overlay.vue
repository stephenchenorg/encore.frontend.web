<template>
  <Fade v-model="show">
    <div
      class="fixed inset-0 bg-black/70"
      :class="overlayClass"
      :style="{ zIndex: zIndex - 1 }"
      @click="show = false"
    />
  </fade>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  zIndex?: number
  overlayClass?: string
}>(), {
  zIndex: 10,
})

const show = defineModel<boolean>({ required: true })
</script>
