export const useApiFetch: typeof useFetch = (request, options) => {
  const config = useRuntimeConfig()

  return useFetch(request, {
    ...options,
    baseURL: config.public.baseApiURL,
    headers: {
      ...(options?.headers ?? {}),
    },
  })
}
