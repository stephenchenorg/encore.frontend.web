// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseApiURL: process.env.NUXT_PUBLIC_BASE_API_URL || 'https://localhost:8000',
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
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700display=swap' },
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
  ],
  headlessui: {
    prefix: '',
  },
  devtools: { enabled: false },
})
