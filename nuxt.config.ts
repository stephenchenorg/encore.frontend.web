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
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' },
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
    prefix: 'Headless',
  },
})
