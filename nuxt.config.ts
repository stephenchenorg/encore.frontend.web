// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseApiURL: process.env.NUXT_PUBLIC_BASE_API_URL || 'https://dev-new-api.encoredays.com/api/saas/v1',
      encoreAboutURL: 'https://encoredays.com/tw/about-encore/',
      encoreAppURL: 'https://encoredays.onelink.me/7mxD/MKTPDnav',
    },
  },
  site: {
    name: 'Encore',
    description: '',
    defaultLocale: 'zh-Hant-TW',
    url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap' },
      ],
    },
  },
  vite: {
    vue: {
      script: {
        defineModel: true,
      },
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    '@nuxtseo/module',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  headlessui: {
    prefix: '',
  },
  devtools: { enabled: false },
})
