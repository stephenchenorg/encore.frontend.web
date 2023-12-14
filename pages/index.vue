<template>
  <Layout>
    <div class="container">
      <div class="mb-4 md:my-8 grid grid-cols-1 md:grid-cols-[130px_auto_150px] lg:grid-cols-[200px_auto_240px] xl:grid-cols-[200px_auto_308px] gap-4">
        <div id="sidebar" class="md:order-1">
          <nav id="sidebar-inner">
            <div class="relative z-20 -mx-4 md:hidden">
              <button
                type="button"
                class="w-full flex justify-between items-center h-12 px-4 text-white"
                :class="{
                  'bg-red-500': showCategoriesMenu,
                  'bg-zinc-800': !showCategoriesMenu,
                }"
                @click="showCategoriesMenu = !showCategoriesMenu"
              >
                <span class="text-lg font-medium">{{ selectedCategoryItem?.label }}</span>
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
                  <path v-if="showCategoriesMenu" d="M4 12L10 6L16 12L4 12Z" fill="currentColor" />
                  <path v-else d="M16 8L10 14L4 8H16Z" fill="currentColor" />
                </svg>
              </button>

              <Fade v-model="showCategoriesMenu">
                <div class="absolute inset-x-0 grid grid-cols-3 bg-white">
                  <button
                    v-for="category in filteredCategories"
                    :key="category.value"
                    type="button"
                    class="
                      w-full py-4 text-zinc-800 hover:text-red-500 font-normal tracking-tight
                      border-r border-b border-zinc-100
                      [&:nth-child(3n)]:border-r-0
                      [&:nth-last-child(-n+3)]:border-b-0
                    "
                  >
                    {{ category.label }}
                  </button>
                </div>
              </Fade>
            </div>

            <ul class="hidden md:block md:pb-4">
              <li
                v-for="category in categories"
                :key="category.value"
              >
                <button
                  type="button"
                  class="w-full px-4 py-2 text-lg text-left font-medium"
                  :class="{
                    'bg-red-500 text-white': category.value === 'all',
                    'text-zinc-800 hover:text-red-500': category.value !== 'all',
                  }"
                >
                  {{ category.label }}
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div id="aside" class="md:order-3">
          <div id="aside-inner" class="md:pb-4">
            <button type="button" @click="openPostModal(2)">
              <img class="rounded-lg" src="~/assets/example-images/encore-event-01.png">
            </button>
          </div>
        </div>

        <main class="min-w-0 md:order-2">
          <div class="md:p-8 md:bg-white md:rounded-lg md:shadow-card">
            <ul
              class="
                space-y-4
                md:space-y-0
                md:[&>li]:after:block
                md:[&>li]:after:my-6
                md:[&>li]:after:border
                md:[&>li]:after:border-neutral-200
                md:[&>li:last-child]:after:content-none
              "
            >
              <li v-for="post in posts" :key="post.id">
                <button
                  type="button"
                  class="group block w-full p-4 bg-white text-left rounded-lg shadow-card md:bg-transparent md:rounded-none md:shadow-none"
                  @click="openPostModal(1)"
                >
                  <img
                    class="aspect-[2/1] rounded-lg object-cover md:hidden"
                    :src="post.thumbnail"
                  >

                  <div class="hidden md:flex items-center">
                    <img
                      class="w-[43px] h-[43px] rounded-full mr-[17px]"
                      :src="post.author.avatar"
                    >
                    <div class="text-zinc-800 font-normal tracking-tight truncate">
                      {{ post.author.name }}
                    </div>
                  </div>

                  <div class="mt-3 flex md:mt-4">
                    <div class="flex-1 min-w-0 mr-6">
                      <h5 class="text-zinc-800 group-hover:text-red-500 text-lg font-normal tracking-wide truncate transition-colors">
                        {{ post.title }}
                      </h5>
                      <p class="mt-1 text-neutral-500 text-[17px] font-normal tracking-wide line-clamp-2 md:mt-3.5 md:line-clamp-1">
                        {{ post.description }}
                      </p>
                    </div>
                    <img
                      class="shrink-0 w-[82px] h-[82px] rounded-lg hidden md:block"
                      :src="post.thumbnail"
                    >
                  </div>

                  <div class="mt-2 flex items-center">
                    <div class="min-w-0 mr-1 flex items-center md:hidden">
                      <img
                        class="w-[43px] h-[43px] rounded-full mr-[17px]"
                        :src="post.author.avatar"
                      >
                      <div class="text-zinc-800 font-normal tracking-tight truncate">
                        {{ post.author.name }}
                      </div>
                    </div>

                    <div class="flex items-center gap-x-8">
                      <div class="inline-flex justify-center items-center gap-2 bg-neutral-50 pl-3 pr-4 py-1 rounded-full border border-neutral-100">
                        <img class="w-[18px] h-[18px] relative" src="~/assets/images/like.svg">
                        <span class="text-neutral-500 text-[15px] font-normal leading-[15px]">
                          {{ post.likes_count }}
                        </span>
                      </div>
                      <div class="inline-flex justify-center items-center gap-2 bg-neutral-50 pl-3 pr-4 py-1 rounded-full border border-neutral-100">
                        <img class="w-[18px] h-[18px] relative" src="~/assets/images/comment.svg">
                        <span class="text-neutral-500 text-[15px] font-normal leading-[15px]">
                          {{ post.comments_count }}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            </ul>
          </div>

          <div class="mt-8 text-[#333333] text-center font-normal tracking-wide">
            想再看更多內容嗎？
          </div>

          <div class="mt-4 text-center relative">
            <button
              type="button"
              class="peer inline-flex justify-center items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-400 text-white rounded-[25px] text-lg font-normal leading-[15px] transition-colors"
            >
              <img class="w-[18px] h-[18px] relative" src="~/assets/images/communicate.svg">
              <div>請下載APP</div>
            </button>

            <img
              class="absolute bottom-full left-1/2 max-w-none transform -translate-x-1/2 opacity-0 transition-opacity duration-300 select-none pointer-events-none peer-hover:opacity-100"
              src="~/assets/images/qrcode-bottom.png"
            >
          </div>
        </main>
      </div>
    </div>

    <Overlay v-model="showCategoriesMenu" :z-index="20" />

    <ModalPost
      :id="postId"
      v-model="showPostModal"
    />
  </Layout>
</template>

<script setup lang="ts">
import avatarPath from '~/assets/example-images/avatar-01.jpg'
import postThumbnailPath from '~/assets/example-images/post-01.jpg'

const showCategoriesMenu = ref(false)

watch(showCategoriesMenu, showCategoriesMenu => {
  if (showCategoriesMenu) {
    window.scrollTo(0, 0)
    document.body.classList.add('overlay-show-categories-menu')
  } else {
    document.body.classList.remove('overlay-show-categories-menu')
  }
})

const categories = [
  { label: '全部貼文', value: 'all' },
  { label: '美食好酒', value: '美食好酒' },
  { label: '心靈療癒', value: '心靈療癒' },
  { label: '科技數位', value: '科技數位' },
  { label: '運動健身', value: '運動健身' },
  { label: '醫療保健', value: '醫療保健' },
  { label: '藝文創作', value: '藝文創作' },
  { label: '爬山健行', value: '爬山健行' },
  { label: '旅遊冒險', value: '旅遊冒險' },
  { label: '家庭親子', value: '家庭親子' },
  { label: '保養時尚', value: '保養時尚' },
  { label: '植物花藝', value: '植物花藝' },
  { label: '理財保險', value: '理財保險' },
  { label: '烹飪養生', value: '烹飪養生' },
  { label: '生涯規劃', value: '生涯規劃' },
  { label: '其他', value: '其他' },
]

const selectedCategory = ref('all')
const selectedCategoryItem = computed(() =>
  categories.find(category => category.value === selectedCategory.value)
)

const filteredCategories = computed(() =>
  categories.filter(category => category.value !== selectedCategory.value)
)

useSticky({
  target: '#sidebar > #sidebar-inner',
  wrapper: '#sidebar',
  offset: 32,
})

useSticky({
  target: '#aside > #aside-inner',
  wrapper: '#aside',
  offset: 32,
})

const posts = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  title: '::綠綠調酒BAR——好事花生🥜:: #超商調酒',
  description: '多虧了這次的 #全家品牌大使 任務，難得的嘗試了咖啡以外的私品茶新品項——— #花生圓圓醇奶 桂冠特別研發的 #花生鑽石小湯圓 ，以烘烤後的花生研磨成顆粒填入QQ彈彈的透明湯圓作為內餡，和經典軟糯的元宵湯圓全然不同的口感，搭上有少量蒸花生在其中但甜度比想像中來得低的豆漿牛奶甜湯，兩者的滋味相輔相成，也預留了些許空間再去做客製化的加料調整，不管是上班前提振精神，又或者下午茶放鬆，都很適合呢！♡♡♡',
  thumbnail: postThumbnailPath,
  author: {
    name: 'slavetodrink_green 小酒鬼綠綠',
    avatar: avatarPath,
  },
  likes_count: 0,
  comments_count: 0,
}))

const showPostModal = ref(false)
const postId = ref<number | undefined>(undefined)

function openPostModal(id: number) {
  postId.value = id
  showPostModal.value = true
}
</script>
