import type { ApiResponse } from '~/types/api'
import type { Post } from '~/types/post'

export const usePostsStore = defineStore('posts', () => {
  const data = ref([]) as Ref<Post[]>

  async function fetch(params: {
    category?: string
    keyword?: string
  } = {}) {
    const {
      category = '',
      keyword = '',
    } = params

    const apiPath = `/public/encoreContents?page=1&group=${category !== 'all' ? category : ''}&orderBy=like&queryType=all&queryString=${keyword}&hashTags=&lang=zh-tw`

    const { data: res } = await useApiFetch<ApiResponse<Post[]>>(apiPath, {
      method: 'GET',
    })

    data.value = (res.value?.data ?? [])
      .slice(0, 10)
      .map(post => {
        let { title, content } = extractPostTitleFromContent(post.content)

        content = contentExcerpt(content)

        return { ...post, title, content }
      })
  }

  return { fetch, data }
})

export const usePostStore = defineStore('post', () => {
  const data = ref(null) as Ref<Post | null>

  async function fetch(articleId: string) {
    const apiPath = `/public/encoreContents/${articleId}`

    const { data: res } = await useApiFetch<ApiResponse<Post>>(apiPath, {
      method: 'GET',
    })

    if (res.value?.data) {
      const post = res.value?.data

      const { title, content } = extractPostTitleFromContent(post.content)

      data.value = { ...post, title, content }
    } else {
      data.value = null
    }
  }

  return { fetch, data }
})
