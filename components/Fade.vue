<template>
  <TransitionRoot
    as="template"
    :show="show"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <slot />
  </TransitionRoot>
</template>

<script setup lang="ts">
const show = defineModel<boolean>({ required: true })
</script>
