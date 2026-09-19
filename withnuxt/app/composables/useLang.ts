import { langs, resume, ui, type Lang } from '~~/data/resume'

export function useLang() {
  const route = useRoute()

  const lang = computed<Lang>(() => {
    const value = route.params.lang
    const code = Array.isArray(value) ? value[0] : value
    return code === 'ca' || code === 'en' ? code : 'es'
  })

  const t = computed(() => ui[lang.value])
  const r = computed(() => resume[lang.value])
  const htmlLang = computed(
    () => langs.find(l => l.code === lang.value)?.htmlLang ?? 'es-ES',
  )

  return { lang, t, r, htmlLang }
}

export function resumePath(lang: Lang | string, path = '') {
  return `/resume/${lang}/${path}`
}
