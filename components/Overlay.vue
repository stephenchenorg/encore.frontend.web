<template>
  <Fade v-model="show">
    <div
      class="fixed inset-0 bg-black/70"
      :style="{ zIndex: zIndex - 1 }"
      @click="show = false"
    />
  </fade>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  zIndex: number
}>(), {
  zIndex: 10,
})

const show = defineModel<boolean>({ required: true })
</script>
