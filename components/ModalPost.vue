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
          <template v-if="!loading && post.data">
            <div class="flex items-center mb-6">
              <img
                class="w-[43px] h-[43px] rounded-full mr-[17px]"
                :src="post.data.userPicture"
              >
              <div class="text-zinc-800 font-normal tracking-tight truncate">
                {{ post.data.userName }}
              </div>
            </div>

            <!-- <img
              v-if="post.type === 'event'"
              class="mb-3 w-full aspect-[2/1] rounded-lg object-cover"
              :src="post.thumbnail"
            > -->

            <h5 class="text-zinc-800 text-[28px]/[42px] font-normal tracking-wide transition-colors">
              {{ post.data.title }}
            </h5>

            <!-- <div
              v-if="post.date"
              class="mb-[25px] text-neutral-400 font-normal"
              :class="{
                'mt-8': post.type === 'post',
                'mt-2': post.type === 'event',
              }"
            >
              {{ post.date }}
            </div> -->
            <div class="mt-8 mb-[25px] text-neutral-400 font-normal">
              {{ dayjs(post.data.createdAt).format('MM 月 DD 日 HH:mm') }}
            </div>

            <div class="mt-2 md:grow md:min-h-0 md:overflow-y-auto">
              <div
                v-if="post.data.photos && post.data.photos.length"
                class="mb-5 relative"
              >
                <div ref="swiperEl" class="swiper">
                  <div class="swiper-wrapper">
                    <div
                      v-for="photo in post.data.photos"
                      :key="photo"
                      class="swiper-slide"
                    >
                      <img
                        class="w-full aspect-[2/1] rounded-lg object-cover"
                        :src="photo"
                      >
                    </div>
                  </div>
                </div>
                <div class="swiper-pagination" />
              </div>

              <!-- <ul v-if="post.event" class="mt-2 text-neutral-500 text-[17px]/[31px] font-normal tracking-wide space-y-2">
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
              </ul> -->

              <div
                v-if="post.data.content"
                class="mt-2 text-neutral-500 text-[17px]/[31px] font-normal tracking-wide break-all"
                v-html="post.data.content.replaceAll('\n', '<br>')"
              />
            </div>

            <div class="mt-4 flex justify-between items-center">
              <div class="flex items-center gap-x-2 flex-1 md:flex-none">
                <div class="flex-1 md:flex-none inline-flex justify-center items-center gap-2 bg-neutral-50 px-6 py-2 md:py-3 rounded-full border border-neutral-100">
                  <img class="w-[18px] h-[18px] relative" src="~/assets/images/like.svg">
                  <span class="text-neutral-500 text-lg font-normal leading-[15px]">
                    0
                    <!-- {{ post.likes_count }} -->
                  </span>
                </div>
                <div class="flex-1 md:flex-none inline-flex justify-center items-center gap-2 bg-neutral-50 px-6 py-2 md:py-3 rounded-full border border-neutral-100">
                  <img class="w-[18px] h-[18px] relative" src="~/assets/images/comment.svg">
                  <span class="text-neutral-500 text-lg font-normal leading-[15px]">
                    0
                    <!-- {{ post.comments_count }} -->
                  </span>
                </div>
              </div>

              <EncoreDownloadLink class="hidden md:inline-flex justify-center items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-400 text-white rounded-[25px] text-lg font-normal leading-[15px] transition-colors select-none">
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

        <EncoreDownloadLink class="fixed inset-x-0 bottom-0 flex justify-center items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-400 text-white text-lg font-normal leading-[15px] transition-colors md:hidden">
          <img class="w-[18px] h-[18px] relative" src="~/assets/images/communicate.svg">
          <div>下載APP</div>
        </EncoreDownloadLink>
      </div>
    </div>
  </div>

  <Overlay v-model="show" :z-index="40" overlay-class="hidden md:block" />
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import mediumZoom, { type Zoom } from 'medium-zoom'
import 'swiper/css'
import 'swiper/css/pagination'
import avatarPath from '~/assets/example-images/avatar-01.jpg'
import post1ThumbnailPath from '~/assets/example-images/post-01.jpg'
import post2ThumbnailPath from '~/assets/example-images/encore-event-01.png'

const props = defineProps<{
  id: string | undefined
}>()

const post = usePostStore()

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
      await post.fetch(props.id)
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

// const post1 = {
//   type: 'post' as 'post' | 'event',
//   title: '::綠綠調酒BAR——好事花生🥜:: #超商調酒',
//   thumbnail: post1ThumbnailPath,
//   date: '11 月 29 日 23:17',
//   content: '::綠綠調酒BAR——好事花生🥜:: #超商調酒<br><br>多虧了這次的 #全家品牌大使 任務，難得的嘗試了咖啡以外的私品茶新品項——— #花生圓圓醇奶<br><br>桂冠特別研發的 #花生鑽石小湯圓 ，以烘烤後的花生研磨成顆粒填入QQ彈彈的透明湯圓作為內餡，和經典軟糯的元宵湯圓全然不同的口感，搭上有少量蒸花生在其中但甜度比想像中來得低的豆漿牛奶甜湯，兩者的滋味相輔相成，也預留了些許空間再去做客製化的加料調整，不管是上班前提振精神，又或者下午茶放鬆，都很適合呢！<br><br>♡♡♡<br><br>任務最初的構想是加入紅茶或仙草凍，但剛好發現了團購區有花生的老對手芝麻糕，就臨時決定陣前換將把它帶回家加工啦！<br><br>冷冷的冬天就是要喝熱熱的茶、泡熱熱的湯，乾脆就來把拍攝的畫面佈置成泡湯的樣貌吧！♨️ 可惜Q彈的湯圓串反而讓造型困難重重，原訂裝飾的芝麻糕雖然好吃，但也只能默默的放在最下面作為固定用的底座了😂<br><br>♡♡♡<br><br>🖤材料：✦花生圓圓醇奶 $65<br>✦JAMESON尊美醇愛爾蘭威士忌迷你瓶 $75 (購買時享2件特價99元優惠)<br>✦烏嬤嬤黑芝麻糕 $80 (團購區品項)<br><br>♡♡♡<br><br>🖍️不小心說了太多，關於這杯酒額外的建議事項和補充大概只剩下：<br><br>❶ JAMESON尊美醇愛爾蘭威士忌的葡萄乾氣息和甜度對於威士忌菜鳥來說很親切，入酒的時候要再配合個人口味酌量調整，才不會過甜。<br><br>❷ 任一杯私品茶只要加價9元就可以獲得限量款的聖誕造型杯塞，但我忘記了，只好自己後製了🫠<br><br>❸ 即日起至11/30止， @jamesonwhiskey 官方有抽獎活動，活動期間於全家和小七限定門市購買迷你瓶，完成指定任務就能參加Jameson野餐調酒包的抽獎活動，還沒參加的朋朋要把握好最後的時間喔！<br><br>- - - - -<br><br>👉🏻喜歡我分享的內容，別忘了按下愛心和收藏😇<br>👉🏻如果你也喜歡喝酒和嘗試新口味，歡迎追蹤 @slavetodrink_green ，然後分享給你的朋友一起追起來！有什麼好喝、好玩或好看的酒，也歡迎留言推薦唷ヽ(●´∀`●)ﾉ<br><br>- - - - -<br><br>⠿🏷️分類標籤 ⠿<br>#小酒鬼綠綠出沒在全家🧏🏻‍♀<br>#小酒鬼綠綠在超商調酒BAR🧏🏻‍♀️<br><br>👊🏻理性飲(癮)酒🫧<br>👊🏻未成年請勿飲酒🔞<br>👊🏻口味是主觀的，個人意見僅供參考<br>👊🏻禁止酒駕🚫 喝酒不開車 開車不喝酒 (騎車也是!!)<br><br>@fami.creator @familymart_tw<br><br>//<br><br>💁🏻‍♀️隨意搭配的居家調酒以”好事花生🥜 “為名，到底是好事會發生或單純只是好事的花生，不曉得，雖然近期我只感覺好事多磨，但目前的角色應該偏向後者，就是要問吃湯圓的時候你們是花生湯圓派還是芝麻湯圓派？🤡<br><br>-<br>-<br>-<br>-<br>-<br>-<br>-<br><br>#cocktailsoftheday #happyhour #開醺 #微醺 #懶人調酒 #特調飲料 #創意調酒 #居家調酒 #drinkresponsibly #特調飲料 #全家便利商店 #familymart #全家FamilyMart #全家神隊友 #私品茶 #全家冬季熱飲溫暖上市 #烏嬤嬤黑芝麻糕 #Jameson #就是J麼順 #尊美醇 #尊美醇愛爾蘭威士忌',
//   author: {
//     name: 'slavetodrink_green 小酒鬼綠綠',
//     avatar: avatarPath,
//   },
//   likes_count: 0,
//   comments_count: 0,
// }

// const post2 = {
//   type: 'event' as 'post' | 'event',
//   title: '2023年安可日子 #大人的四季年度徵稿',
//   thumbnail: post2ThumbnailPath,
//   event: {
//     dateRange: '2023年09月15日 11:00 - 2023年10月15日 23:00',
//     location: '線上活動',
//     price: '免費',
//     people: '已經有15個人報名',
//   },
//   content: '繼續召集！！截稿日延後至10/31<br/>安可日子自成立以來一直秉持著一個使命 — 培養40+的創作者，今年我們舉辦的以創作者為主角的「大人的四季」徵件活動，為了想要吸引更多的人參與其中，推廣價值再現的理念，截稿日已延至10月31日！<br/>因為我們相信每個人都是獨一無二，都是生活的創作者，你的故事和經歷都值得分享給世界。<br/>生活本身就是一場精彩的旅程，每個人都是這場旅程的「創作者」。為了讓更多的「創作者」們展現自己，我們提供了兩種參與方案，任選其一即可<br/>方式一<br/>1.下載安可日子APP<br/>2.點選首頁右下角「鉛筆」圖示，主題包含至少一張圖片，且需要50字以上<br/>3.貼文中加上指定hashtag#大人的四季，錯字不予以計算徵件成功<br/>4.按「送出」就能完成投稿',
//   author: {
//     name: 'Encore 官方帳號',
//     avatar: avatarPath,
//   },
//   likes_count: 20,
//   comments_count: 0,
// }

// let post: {
//   type: 'post' | 'event'
//   title: string
//   thumbnail: string
//   date?: string
//   event?: {
//     dateRange: string
//     location: string
//     price: string
//     people: string
//   }
//   content: string
//   author: {
//     name: string
//     avatar: string
//   }
//   likes_count: number
//   comments_count: number
// }
</script>
