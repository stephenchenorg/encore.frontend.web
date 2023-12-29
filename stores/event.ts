import type { ApiResponse } from '~/types/api'
import type { Event } from '~/types/event'

export const useEventsStore = defineStore('activities', () => {
  const data = ref([]) as Ref<Event[]>
  const hasResult = ref(false)

  async function fetch() {
    const apiPath = `/public/eventContents?page=1`

    const { data: res } = await useApiFetch<ApiResponse<Event[]>>(apiPath, {
      method: 'GET',
    })

    const result = res.value?.data ?? []

    data.value = result

    hasResult.value = result.length > 0
  }

  return { fetch, data, hasResult }
})

export const useEventStore = defineStore('activity', () => {
  const data = ref(null) as Ref<Event | null>

  async function fetch(eventId: string) {
    const apiPath = `/public/eventContents/${eventId}`

    const { data: res } = await useApiFetch<ApiResponse<Event>>(apiPath, {
      method: 'GET',
    })

    if (res.value?.data) {
      data.value = res.value?.data
    } else {
      data.value = null
    }
  }

  return { fetch, data }
})
