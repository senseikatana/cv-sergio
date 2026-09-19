import { langs, meta } from '~~/data/resume'

export function useResumeSeo(title: string, path = '') {
  const { lang } = useLang()

  useSeoMeta({
    title,
    ogTitle: `${title} · ${meta.name}`,
    ogUrl: `${meta.siteUrl}/resume/${lang.value}/${path}`,
  })

  useHead({
    link: [
      { rel: 'canonical', href: `${meta.siteUrl}/resume/${lang.value}/${path}` },
      ...langs.map(l => ({
        rel: 'alternate',
        hreflang: l.htmlLang,
        href: `${meta.siteUrl}/resume/${l.code}/${path}`,
      })),
      { rel: 'alternate', hreflang: 'x-default', href: `${meta.siteUrl}/resume/es/${path}` },
    ],
  })
}
