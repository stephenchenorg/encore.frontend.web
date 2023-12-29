<template>
  <div ref="el" class="swiper">
    <div class="swiper-wrapper">
      <div
        v-for="item in items"
        :key="keyResolver(item)"
        class="swiper-slide"
      >
        <slot name="slide" :item="item" />
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

const props = defineProps<{
  enabled: boolean
  items: T[]
  keyResolver: (item: T) => string
}>()

let swiper: Swiper | null = null

const el = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (props.enabled) {
    swiper = new Swiper(el.value!, {
      modules: [Pagination],
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    })
  }
})

onBeforeUnmount(() => {
  if (swiper) {
    swiper.destroy()
    swiper = null
  }
})
</script>
