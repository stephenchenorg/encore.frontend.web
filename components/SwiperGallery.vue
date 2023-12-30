<template>
  <div ref="el" class="fixed inset-0 z-50 bg-black/70">
    <div ref="swiperEl" class="swiper max-h-full">
      <div class="swiper-wrapper">
        <div
          v-for="photo in photos"
          :key="photo"
          class="swiper-slide"
        >
          <div class="relative">
            <div class="absolute inset-0" @click="$emit('close')" />
            <img class="relative swiperg-gallery-image mx-auto" :src="photo">
          </div>
        </div>
      </div>
      <div class="swiper-pagination" />
    </div>

    <button type="button" class="absolute top-4 right-4 z-[1]" @click="$emit('close')">
      <img
        src="~/assets/images/icon-close.svg"
        class="w-10 h-10 shrink-0"
      >
    </button>
  </div>
</template>

<script setup lang="ts" generic="T">
import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const props = defineProps<{
  startPhotoIndex?: number
  photos: string[] | null
}>()

defineEmits<{
  close: []
}>()

let swiper: Swiper | null = null

const el = ref<HTMLDivElement | null>(null)
const swiperEl = ref<HTMLDivElement | null>(null)

const { width: windowWidth, height: windowHeight } = useWindowSize()

function calcImagesSize() {
  if (!el.value) return

  [...el.value.querySelectorAll<HTMLImageElement>('.swiperg-gallery-image')].forEach(image => {
    const { width, height } = image
    const ratio = width / height
    const windowRatio = windowWidth.value / (windowHeight.value || 1)
    const groupScale = windowRatio > ratio ? windowHeight.value / height : windowWidth.value / width

    image.style.width = `${width * groupScale}px`
    image.style.height = `${height * groupScale}px`
  })
}

watch([windowWidth, windowHeight], calcImagesSize)

onMounted(() => {
  swiper = new Swiper(swiperEl.value!, {
    modules: [Pagination],
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  })

  if (typeof props.startPhotoIndex === 'number') {
    swiper.slideTo(props.startPhotoIndex, 0)
  }

  calcImagesSize()
})

onBeforeUnmount(() => {
  if (swiper) {
    swiper.destroy()
    swiper = null
  }
})
</script>
