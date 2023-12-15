<template>
  <div v-if="show" class="fixed inset-0 z-40 pointer-events-none">
    <div class="h-full pb-[42px] md:pb-0">
      <div class="w-full max-w-3xl h-full mx-auto bg-neutral-50 overflow-y-auto pointer-events-auto md:bg-transparent">
        <Header header-class="relative z-30 md:hidden" :z-index="30" />

        <div class="sticky top-0 z-[1] h-12 mb-4 bg-white flex justify-center items-center md:hidden">
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

          <div class="text-center text-neutral-700 text-[17px] font-medium tracking-wide">貼文</div>
        </div>

        <div class="relative bg-white px-4 py-6 md:px-12 md:pt-12 md:pb-4 shadow-card md:h-full md:flex md:flex-col">
          <template v-if="!loading && post">
            <div class="flex items-center mb-6">
              <img
                class="w-[43px] h-[43px] rounded-full mr-[17px]"
                :src="post.author.avatar"
              >
              <div class="text-zinc-800 font-normal tracking-tight truncate">
                {{ post.author.name }}
              </div>
            </div>

            <img
              class="mb-3 aspect-[2/1] rounded-lg object-cover"
              :src="post.thumbnail"
            >

            <h5 class="text-zinc-800 text-[28px]/[42px] font-normal tracking-wide transition-colors">
              {{ post.title }}
            </h5>

            <div v-if="post.date" class="mt-2 text-neutral-400 font-normal">
              {{ post.date }}
            </div>

            <div class="md:grow md:min-h-0 md:overflow-y-auto">
              <ul v-if="post.event" class="mt-2 text-neutral-500 text-[17px]/[31px] font-normal tracking-wide space-y-2">
                <li class="flex">
                  <img
                    src="~/assets/images/icon-calendar.svg"
                    class="w-[18px] h-[18px] mt-1.5 mr-2"
                  >
                  <div>{{ post.event.dateRange }}</div>
                </li>
                <li class="flex">
                  <img
                    src="~/assets/images/icon-location.svg"
                    class="w-[18px] h-[18px] mt-1.5 mr-2"
                  >
                  <div>{{ post.event.location }}</div>
                </li>
                <li class="flex">
                  <img
                    src="~/assets/images/icon-dollar.svg"
                    class="w-[18px] h-[18px] mt-1.5 mr-2"
                  >
                  <div>{{ post.event.price }}</div>
                </li>
                <li class="flex">
                  <img
                    src="~/assets/images/icon-peoples.svg"
                    class="w-[18px] h-[18px] mt-1.5 mr-2"
                  >
                  <div>{{ post.event.people }}</div>
                </li>
              </ul>

              <div class="mt-2 text-neutral-500 text-[17px]/[31px] font-normal tracking-wide" v-html="post.content" />
            </div>

            <div class="mt-4 flex justify-between items-center">
              <div class="flex items-center gap-x-2">
                <div class="flex-1 md:flex-none inline-flex justify-center items-center gap-2 bg-neutral-50 px-6 py-2 md:py-3 rounded-full border border-neutral-100">
                  <img class="w-[18px] h-[18px] relative" src="~/assets/images/like.svg">
                  <span class="text-neutral-500 text-lg font-normal leading-[15px]">
                    {{ post.likes_count }}
                  </span>
                </div>
                <div class="flex-1 md:flex-none inline-flex justify-center items-center gap-2 bg-neutral-50 px-6 py-2 md:py-3 rounded-full border border-neutral-100">
                  <img class="w-[18px] h-[18px] relative" src="~/assets/images/comment.svg">
                  <span class="text-neutral-500 text-lg font-normal leading-[15px]">
                    {{ post.comments_count }}
                  </span>
                </div>
              </div>

              <button
                type="button"
                class="hidden md:inline-flex justify-center items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-400 text-white rounded-[25px] text-lg font-normal leading-[15px] transition-colors"
              >
                <img class="w-[18px] h-[18px] relative" src="~/assets/images/communicate.svg">
                <div>下載APP</div>
              </button>
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

        <button
          type="button"
          class="fixed inset-x-0 bottom-0 flex justify-center items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-400 text-white text-lg font-normal leading-[15px] transition-colors md:hidden"
        >
          <img class="w-[18px] h-[18px] relative" src="~/assets/images/communicate.svg">
          <div>下載APP</div>
        </button>
      </div>
    </div>
  </div>

  <Overlay v-model="show" :z-index="40" overlay-class="hidden md:block" />
</template>

<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core'
import avatarPath from '~/assets/example-images/avatar-01.jpg'
import post1ThumbnailPath from '~/assets/example-images/post-01.jpg'
import post2ThumbnailPath from '~/assets/example-images/encore-event-01.png'

const props = defineProps<{
  id: number | undefined
}>()

const show = defineModel<boolean>({ required: true })
const loading = ref(false)

watch(show, () => {
  if (show.value) {
    document.body.classList.add('overlay-show-post-modal')
  } else {
    document.body.classList.remove('overlay-show-post-modal')
  }
})

const post1 = {
  title: '::綠綠調酒BAR——好事花生🥜:: #超商調酒',
  thumbnail: post1ThumbnailPath,
  date: '11 月 29 日 23:17',
  content: '::綠綠調酒BAR——好事花生🥜:: #超商調酒<br><br>多虧了這次的 #全家品牌大使 任務，難得的嘗試了咖啡以外的私品茶新品項——— #花生圓圓醇奶<br><br>桂冠特別研發的 #花生鑽石小湯圓 ，以烘烤後的花生研磨成顆粒填入QQ彈彈的透明湯圓作為內餡，和經典軟糯的元宵湯圓全然不同的口感，搭',
  author: {
    name: 'slavetodrink_green 小酒鬼綠綠',
    avatar: avatarPath,
  },
  likes_count: 0,
  comments_count: 0,
}

const post2 = {
  title: '2023年安可日子 #大人的四季年度徵稿',
  thumbnail: post2ThumbnailPath,
  event: {
    dateRange: '2023年09月15日 11:00 - 2023年10月15日 23:00',
    location: '線上活動',
    price: '免費',
    people: '已經有15個人報名',
  },
  content: '繼續召集！！截稿日延後至10/31<br/>安可日子自成立以來一直秉持著一個使命 — 培養40+的創作者，今年我們舉辦的以創作者為主角的「大人的四季」徵件活動，為了想要吸引更多的人參與其中，推廣價值再現的理念，截稿日已延至10月31日！<br/>因為我們相信每個人都是獨一無二，都是生活的創作者，你的故事和經歷都值得分享給世界。<br/>生活本身就是一場精彩的旅程，每個人都是這場旅程的「創作者」。為了讓更多的「創作者」們展現自己，我們提供了兩種參與方案，任選其一即可<br/>方式一<br/>1.下載安可日子APP<br/>2.點選首頁右下角「鉛筆」圖示，主題包含至少一張圖片，且需要50字以上<br/>3.貼文中加上指定hashtag#大人的四季，錯字不予以計算徵件成功<br/>4.按「送出」就能完成投稿',
  author: {
    name: 'Encore 官方帳號',
    avatar: avatarPath,
  },
  likes_count: 20,
  comments_count: 0,
}

let post: {
  title: string
  thumbnail: string
  date?: string
  event?: {
    dateRange: string
    location: string
    price: string
    people: string
  }
  content: string
  author: {
    name: string
    avatar: string
  }
  likes_count: number
  comments_count: number
}

watch(show, async () => {
  if (props.id) {
    loading.value = true
    await promiseTimeout(1000)
    loading.value = false
    if (props.id === 1) {
      post = post1
    } else if (props.id === 2) {
      post = post2
    }
  }
})

function close() {
  show.value = false
}
</script>
