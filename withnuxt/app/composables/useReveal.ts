export function useRevealObserver() {
  const route = useRoute()
  let observer: IntersectionObserver | null = null

  const init = () => {
    nextTick(() => {
      observer?.disconnect()
      const elements = document.querySelectorAll('.reveal:not(.is-visible)')
      if (!elements.length) return

      if (!('IntersectionObserver' in window)) {
        elements.forEach(el => el.classList.add('is-visible'))
        return
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer?.unobserve(entry.target)
            }
          })
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
      )

      elements.forEach(el => observer!.observe(el))
    })
  }

  onMounted(init)
  watch(() => route.fullPath, init)
  onBeforeUnmount(() => observer?.disconnect())
}
