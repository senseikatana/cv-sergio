<script setup lang="ts">
import { meta } from '~~/data/resume'

const { t, htmlLang } = useLang()

useRevealObserver()

useHead({
  htmlAttrs: { lang: htmlLang },
})

useSeoMeta({
  description: () => t.value.seoDescription,
  ogType: 'profile',
  ogSiteName: 'senseikatana.com',
  ogImage: `${meta.siteUrl}/resume/cv/sergio-jurado.jpg`,
  twitterCard: 'summary_large_image',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: meta.name,
        email: meta.email,
        telephone: meta.phone,
        url: `${meta.siteUrl}/resume/es/`,
        image: `${meta.siteUrl}/resume/cv/sergio-jurado.jpg`,
        sameAs: [meta.linkedin, meta.github],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Cambrils',
          addressRegion: 'Tarragona',
          addressCountry: 'ES',
        },
      }),
    },
  ],
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a href="#main" class="skip-link">{{ t.skipToContent }}</a>
    <AppHeader />
    <main id="main" class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
