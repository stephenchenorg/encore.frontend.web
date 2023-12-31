<template>
  <header :class="headerClass">
    <div class="h-[70px] md:h-[72px] flex items-center bg-white md:shadow-header">
      <div class="container flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center w-[111px] h-10 shrink-0 md:w-[140.88px]">
          <img
            src="~/assets/images/logo.svg"
            class="w-[111px] md:w-[140.88px]"
          >
        </NuxtLink>

        <form
          class="relative hidden md:block w-full max-w-[340px] mx-4"
          @submit.prevent="submit"
        >
          <input
            v-model="keyword"
            type="text"
            class="form-input w-full h-11 px-5 bg-neutral-50 rounded-[25px] border border-zinc-200 focus:border-red-400 focus:ring-red-400"
          >
          <button type="submit" class="absolute top-[9px] right-4">
            <img
              src="~/assets/images/icon-search.svg"
              class="w-[26px] h-[26px]"
            >
          </button>
        </form>

        <div class="flex items-center space-x-6 md:space-x-4">
          <NuxtLink
            :href="config.public.encoreAboutURL"
            class="hidden md:block px-6 py-2.5 text-zinc-800 hover:text-red-400 font-normal whitespace-nowrap transition-colors"
            target="_blank"
          >
            關於安可
          </NuxtLink>

          <div class="relative">
            <EncoreDownloadLink
              only-mobile
              class="peer inline-block px-4 py-1.5 md:px-6 md:py-2.5 bg-red-400 hover:bg-red-500 text-white font-normal whitespace-nowrap rounded-lg transition-colors select-none"
            >
              Download
            </EncoreDownloadLink>

            <img
              class="absolute left-1/2 z-30 max-w-none mt-[17px] md:mt-[14px] transform -translate-x-1/2 opacity-0 transition-opacity duration-300 select-none pointer-events-none md:peer-hover:opacity-100"
              src="~/assets/images/qrcode-nav.png"
            >
          </div>

          <button
            type="button"
            class="md:hidden"
            @click="showMenu = !showMenu"
          >
            <img
              v-if="showMenu"
              src="~/assets/images/icon-close.svg"
              class="w-[30px] h-[30px]"
            >
            <img
              v-else
              src="~/assets/images/icon-menu.svg"
              class="w-[30px] h-[30px]"
            >
          </button>
        </div>
      </div>
    </div>

    <Fade v-model="showMenu">
      <div class="absolute inset-x-0 px-4 pb-4 bg-white space-y-4 md:hidden">
        <NuxtLink
          :href="config.public.encoreAboutURL"
          class="block py-2 text-zinc-800 hover:text-red-400 font-normal tracking-tight transition-colors"
          target="_blank"
        >
          關於安可
        </NuxtLink>

        <form
          class="relative w-full"
          @submit.prevent="submit"
        >
          <input
            v-model="keyword"
            type="text"
            class="form-input w-full h-11 px-5 bg-neutral-50 rounded-[25px] border border-zinc-200 focus:border-red-400 focus:ring-red-400"
          >
          <button type="submit" class="absolute top-[9px] right-3">
            <img
              src="~/assets/images/icon-search.svg"
              class="w-[25px] h-[25px]"
            >
          </button>
        </form>
      </div>
    </Fade>
  </header>

  <Overlay v-model="showMenu" :z-index="zIndex" />
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  headerClass?: string
  zIndex?: number
}>(), {
  zIndex: 10,
})

const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

const showMenu = ref(false)
const keyword = ref(route.query.keyword as string || '')

function submit() {
  router.push({
    path: '/',
    query: {
      keyword: keyword.value || undefined,
    },
  })
}

watch(() => route.fullPath, () => {
  keyword.value = route.query.keyword as string || ''
  showMenu.value = false
  window.scrollTo(0, 0)
})

watch(showMenu, showMenu => {
  if (showMenu) {
    document.body.classList.add('overlay-show-menu')
  } else {
    document.body.classList.remove('overlay-show-menu')
  }
})
</script>
