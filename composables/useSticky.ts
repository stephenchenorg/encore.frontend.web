export interface UseStickyOptions {
  target: string
  wrapper: string
  offset?: number
}

let HcSticky: any

export default function (options: UseStickyOptions) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  if (window.matchMedia('(max-width: 767px)').matches) return

  const { target, wrapper, offset = 0 } = options

  let sticky: {
    destroy(): void
  }

  const headerStickyHeight = 72

  onMounted(async () => {
    if (!HcSticky) {
      // @ts-expect-error
      HcSticky = await import('hc-sticky').then(m => m.default || m)
    }

    sticky = new HcSticky(target, {
      stickTo: wrapper,
      top: headerStickyHeight + offset,
    })
  })

  onBeforeUnmount(() => {
    sticky?.destroy()
  })
}
