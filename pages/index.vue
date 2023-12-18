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
                      w-full py-4 text-zinc-800 active:text-red-500 font-normal tracking-tight
                      border-r border-b border-zinc-100
                      [&:nth-child(3n)]:border-r-0
                      [&:nth-last-child(-n+3)]:border-b-0
                    "
                    @click="selectCategory(category.value)"
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
                    'bg-red-500 text-white': category.value === selectedCategory,
                    'text-zinc-800 hover:text-red-500': category.value !== selectedCategory,
                  }"
                  @click="selectCategory(category.value)"
                >
                  {{ category.label }}
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div id="aside" class="md:order-3">
          <div id="aside-inner" class="md:pb-4">
            <!-- <button type="button" @click="openPostModal('2')"> -->
            <img class="rounded-lg" src="~/assets/example-images/encore-event-01.png">
            <!-- </button> -->
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
              <li v-for="post in posts.data" :key="post.articleId">
                <button
                  type="button"
                  class="group block w-full p-4 bg-white text-left rounded-lg shadow-card md:bg-transparent md:rounded-none md:shadow-none"
                  @click="openPostModal(post.articleId)"
                >
                  <img
                    v-if="post.photos?.[0]"
                    class="w-full aspect-[2/1] rounded-lg object-cover md:hidden"
                    :src="post.photos[0]"
                  >

                  <div class="hidden md:flex items-center">
                    <img
                      class="w-[43px] h-[43px] rounded-full mr-[17px]"
                      :src="post.userPicture"
                    >
                    <div class="text-zinc-800 font-normal tracking-tight truncate">
                      {{ post.userName }}
                    </div>
                  </div>

                  <div class="mt-3 flex md:mt-4">
                    <div class="flex-1 min-w-0 mr-6">
                      <h5 class="text-zinc-800 group-hover:text-red-500 text-lg font-normal tracking-wide truncate transition-colors">
                        {{ post.title }}
                      </h5>
                      <p
                        v-if="post.content"
                        class="mt-1 text-neutral-500 text-[17px] font-normal tracking-wide md:mt-3.5"
                      >
                        {{ post.content }}
                      </p>
                    </div>
                    <img
                      v-if="post.photos?.[0]"
                      class="shrink-0 w-[82px] h-[82px] rounded-lg object-cover hidden md:block"
                      :src="post.photos[0]"
                    >
                  </div>

                  <div class="mt-2 flex items-center">
                    <div class="min-w-0 mr-1 flex items-center md:hidden">
                      <img
                        class="w-[43px] h-[43px] rounded-full mr-[17px]"
                        :src="post.userPicture"
                      >
                      <div class="text-zinc-800 font-normal tracking-tight truncate">
                        {{ post.userName }}
                      </div>
                    </div>

                    <div class="flex items-center gap-x-8">
                      <div class="inline-flex justify-center items-center gap-2 bg-neutral-50 pl-3 pr-4 py-1 rounded-full border border-neutral-100">
                        <img class="w-[18px] h-[18px] relative" src="~/assets/images/like.svg">
                        <span class="text-neutral-500 text-[15px] font-normal leading-[15px]">
                          0
                          <!-- {{ post.likes_count }} -->
                        </span>
                      </div>
                      <div class="inline-flex justify-center items-center gap-2 bg-neutral-50 pl-3 pr-4 py-1 rounded-full border border-neutral-100">
                        <img class="w-[18px] h-[18px] relative" src="~/assets/images/comment.svg">
                        <span class="text-neutral-500 text-[15px] font-normal leading-[15px]">
                          0
                          <!-- {{ post.comments_count }} -->
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
            <EncoreDownloadLink
              only-mobile
              class="peer inline-flex justify-center items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-400 text-white rounded-[25px] text-lg font-normal leading-[15px] transition-colors select-none"
            >
              <img class="w-[18px] h-[18px] relative" src="~/assets/images/communicate.svg">
              <div>請下載APP</div>
            </EncoreDownloadLink>

            <img
              class="absolute bottom-full left-1/2 max-w-none transform -translate-x-1/2 opacity-0 transition-opacity duration-300 select-none pointer-events-none md:peer-hover:opacity-100"
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
const route = useRoute()
const router = useRouter()

const showCategoriesMenu = ref(false)
const selectedCategory = ref(route.query.category as string || 'all')

const posts = usePostsStore()
await posts.fetch({
  keyword: route.query.keyword as string || '',
  category: selectedCategory.value,
})

const categories = [
  { label: '全部貼文', value: 'all' },
  { label: '美食好酒', value: 'food-and-wine' },
  { label: '心靈療癒', value: 'soul-healing' },
  { label: '科技數位', value: 'technology' },
  { label: '運動健身', value: 'sports' },
  { label: '醫療保健', value: 'health-care' },
  { label: '藝文創作', value: 'art-and-culture' },
  { label: '爬山健行', value: 'outdoor' },
  { label: '旅遊冒險', value: 'travel-adventure' },
  { label: '家庭親子', value: 'family-and-kids' },
  { label: '保養時尚', value: 'fashion' },
  { label: '植物花藝', value: 'plant' },
  { label: '理財保險', value: 'finance-insurance' },
  { label: '烹飪養生', value: 'cooking' },
  { label: '生涯規劃', value: 'career-planning' },
  { label: '其他', value: 'others' },
]

const selectedCategoryItem = computed(() =>
  categories.find(category => category.value === selectedCategory.value)
)

const filteredCategories = computed(() =>
  categories.filter(category => category.value !== selectedCategory.value)
)

const showPostModal = ref(false)
const postId = ref<string | undefined>(undefined)

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

watch(showCategoriesMenu, showCategoriesMenu => {
  if (showCategoriesMenu) {
    window.scrollTo(0, 0)
    document.body.classList.add('overlay-show-categories-menu')
  } else {
    document.body.classList.remove('overlay-show-categories-menu')
  }
})

function selectCategory(category: string) {
  selectedCategory.value = category && category !== 'all' ? category : 'all'
  router.push({
    path: '/',
    query: {
      keyword: route.query.keyword as string || undefined,
      category: selectedCategory.value !== 'all' ? selectedCategory.value : undefined,
    },
  })
}

watch(() => route.fullPath, async () => {
  selectedCategory.value = route.query.category as string || 'all'
  showCategoriesMenu.value = false
  showPostModal.value = false

  await posts.fetch({
    keyword: route.query.keyword as string || '',
    category: selectedCategory.value,
  })

  window.scrollTo(0, 0)
})

function openPostModal(id: string) {
  postId.value = id
  showPostModal.value = true
}
</script>
