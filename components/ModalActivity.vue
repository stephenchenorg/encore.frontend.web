<template>
  <div v-if="show" class="fixed inset-0 z-40 pointer-events-none">
    <div class="h-full pb-[42px] md:pb-0">
      <div class="w-full max-w-3xl h-full mx-auto bg-neutral-50 overflow-y-auto pointer-events-auto md:bg-transparent">
        <Header header-class="relative z-30 md:hidden" :z-index="30" />

        <div class="sticky top-0 z-[2] h-12 mb-4 bg-white flex justify-center items-center md:hidden">
          <button
            type="button"
            class="absolute top-0 left-0 w-12 h-12"
            @click="close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M13 24H35" stroke="#444444" stroke-width="1.5" stroke-linecap="round" />
              <path d="M13 24L19 19" stroke="#444444" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </button>

          <div class="text-center text-neutral-700 text-[17px] font-medium tracking-wide">活動</div>
        </div>

        <div class="relative bg-white px-4 py-6 md:px-12 md:pt-12 md:pb-4 shadow-card md:h-full md:flex md:flex-col">
          <template v-if="!loading && event.data">
            <div class="flex items-center mb-6">
              <img
                v-if="event.data.userPicture"
                class="w-[43px] h-[43px] rounded-full mr-[17px]"
                :src="event.data.userPicture"
              >
              <div
                v-if="event.data.userName"
                class="text-zinc-800 font-normal tracking-tight truncate"
              >
                {{ event.data.userName }}
              </div>
            </div>

            <div class="mt-2 md:grow md:min-h-0 md:overflow-y-auto">
              <div
                v-if="event.data.image"
                class="mb-5 relative"
              >
                <div ref="swiperEl" class="swiper">
                  <div class="swiper-wrapper">
                    <div
                      class="swiper-slide"
                    >
                      <img
                        class="w-full aspect-[2/1] rounded-lg object-cover"
                        :src="event.data.image"
                      >
                    </div>
                  </div>
                </div>
                <div class="swiper-pagination" />
              </div>

              <!-- <div class="mt-8 mb-[25px] text-neutral-400 font-normal">
                {{ dayjs(post.data.createdAt).format('MM 月 DD 日 HH:mm') }}
              </div> -->

              <h5 class="text-zinc-800 text-[28px]/[42px] font-normal tracking-wide transition-colors">
                {{ event.data.name }}
              </h5>

              <div class="flex-1 md:flex-none inline-flex items-center gap-2 my-1 w-full">
                <img class="w-[18px] h-[18px] relative" src="~/assets/images/calendar-three.svg">
                <div class="text-neutral-400 font-normal text-[17px]/[31px]">
                  {{ dayjs(event.data.startDate).format('YYYY年MM月DD日') }} {{ event.data.startTime }} - {{ dayjs(event.data.endData).format('YYYY年MM月DD日') }} {{ event.data.endTime }}
                </div>
              </div>

              <div class="flex-1 md:flex-none inline-flex items-center gap-2 my-1 w-full">
                <img class="w-[18px] h-[18px] relative" src="~/assets/images/local-two.svg">
                <div class="text-neutral-400 font-normal text-[17px]/[31px]">
                  {{ event.data.address }}
                </div>
              </div>

              <div class="flex-1 md:flex-none inline-flex items-center gap-2 my-1 w-full">
                <img class="w-[18px] h-[18px] relative" src="~/assets/images/dollar.svg">
                <div class="text-neutral-400 font-normal text-[17px]/[31px]">
                  {{ event.data.isFree ? '免費' : '收費' }}
                </div>
              </div>

              <div class="flex-1 md:flex-none inline-flex items-center gap-2 my-1 w-full">
                <img class="w-[18px] h-[18px] relative" src="~/assets/images/peoples.svg">
                <div class="text-neutral-400 font-normal text-[17px]/[31px]">
                  已經有 {{ event.participants ?? 0 }} 個人報名
                </div>
              </div>

              <div
                v-if="event.data.info"
                class="mt-2 text-neutral-500 text-[17px]/[31px] font-normal tracking-wide break-all"
                v-html="event.data.info.replaceAll('\n', '<br>')"
              />
            </div>

            <div class="mt-4 flex justify-between items-center">
              <div class="flex items-center gap-x-2 flex-1 md:flex-none">
                <div class="flex-1 md:flex-none inline-flex justify-center items-center gap-2 bg-neutral-50 px-6 py-2 md:py-3 rounded-full border border-neutral-100">
                  <img class="w-[18px] h-[18px] relative" src="~/assets/images/like.svg">
                  <span class="text-neutral-500 text-lg font-normal leading-[15px]">
                    {{ event.data.likeCount }}
                  </span>
                </div>
                <div class="flex-1 md:flex-none inline-flex justify-center items-center gap-2 bg-neutral-50 px-6 py-2 md:py-3 rounded-full border border-neutral-100">
                  <img class="w-[18px] h-[18px] relative" src="~/assets/images/comment.svg">
                  <span class="text-neutral-500 text-lg font-normal leading-[15px]">
                    {{ event.data.commentCount }}
                  </span>
                </div>
              </div>

              <EncoreDownloadLink class="hidden md:inline-flex justify-center items-center gap-2 px-6 py-3 bg-red-400 hover:bg-red-500 text-white rounded-[25px] text-lg font-normal leading-[15px] transition-colors select-none">
                <img class="w-[18px] h-[18px] relative" src="~/assets/images/communicate.svg">
                <div>下載APP</div>
              </EncoreDownloadLink>
            </div>
          </template>

          <button type="button" class="hidden md:block absolute top-4 right-4" @click="close">
            <img
              src="~/assets/images/icon-close.svg"
              class="w-10 h-10 shrink-0"
            >
          </button>

          <div
            v-if="loading"
            class="
              h-[calc(100vh-70px-48px-16px-24px-24px-42px)]
              md:h-full
              flex justify-center items-center bg-white
            "
          >
            <img class="w-8 h-8" src="~/assets/images/loading.svg">
          </div>
        </div>

        <EncoreDownloadLink class="fixed inset-x-0 bottom-0 flex justify-center items-center gap-2 px-6 py-3 bg-red-400 hover:bg-red-500 text-white text-lg font-normal leading-[15px] transition-colors md:hidden">
          <img class="w-[18px] h-[18px] relative" src="~/assets/images/communicate.svg">
          <div>下載APP</div>
        </EncoreDownloadLink>
      </div>
    </div>
  </div>

  <Overlay v-model="show" :z-index="40" overlay-class="hidden md:block" />
</template>

<script setup lang="ts">
import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import mediumZoom, { type Zoom } from 'medium-zoom'
import 'swiper/css'
import 'swiper/css/pagination'
import dayjs from "dayjs";

const props = defineProps<{
  id: string | undefined
}>()

const event = useEventStore()

const show = defineModel<boolean>({ required: true })

let swiper: Swiper | null = null
let zoom: Zoom | null = null

const swiperEl = ref<HTMLDivElement | null>(null)
const loading = ref(false)

watch(show, async (_value, _oldValue, onCleanup) => {
  if (show.value) {
    document.body.classList.add('overlay-show-post-modal')
  } else {
    document.body.classList.remove('overlay-show-post-modal')
  }

  if (props.id) {
    loading.value = true
    try {
      await event.fetch(props.id)
    } catch (error) {
      loading.value = false
      throw error
    }
    loading.value = false

    await nextTick()

    if (swiperEl.value) {
      swiper = new Swiper(swiperEl.value, {
        modules: [Pagination],
        pagination: {
          el: '.swiper-pagination',
        },
      })

      zoom = mediumZoom('.swiper-slide img', {
        background: 'rgba(0, 0, 0, 0.8)',
      })
    }

    onCleanup(() => {
      if (zoom) {
        zoom.detach()
        zoom = null
      }

      if (swiper) {
        swiper.destroy()
        swiper = null
      }
    })
  }
})

function close() {
  show.value = false
}
</script>
