<template>
  <div ref="el" class="swiper">
    <div class="swiper-wrapper">
      <div
        v-for="(item, index) in items"
        :key="keyResolver(item)"
        class="swiper-slide"
      >
        <slot name="slide" :item="item" :index="index" />
      </div>
    </div>
    <div class="swiper-pagination" />
  </div>
</template>

<script setup lang="ts" generic="T">
import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

defineProps<{
  items: T[]
  keyResolver: (item: T) => string
}>()

const emit = defineEmits<{
  change: [number]
}>()

let swiper: Swiper | null = null

const el = ref<HTMLDivElement | null>(null)

onMounted(() => {
  swiper = new Swiper(el.value!, {
    modules: [Pagination],
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  })

  swiper.on('slideChange', swiper => {
    emit('change', swiper.activeIndex)
  })
})

onBeforeUnmount(() => {
  if (swiper) {
    swiper.destroy()
    swiper = null
  }
})
</script>
