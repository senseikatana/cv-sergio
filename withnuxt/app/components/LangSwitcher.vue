<script setup lang="ts">
import { langs } from '~/data/resume'

const { lang } = useLang()
const route = useRoute()

const linkFor = (code: string) => {
  const segments = route.path.split('/').filter(Boolean)
  if (segments.length > 1) {
    segments[1] = code
  }
  return `/${segments.join('/')}/`
}
</script>

<template>
  <div
    class="flex gap-0.5 rounded-full border border-dark-700/70 bg-dark-800/50 p-0.5"
    role="group"
    aria-label="Idioma"
  >
    <NuxtLink
      v-for="l in langs"
      :key="l.code"
      :to="linkFor(l.code)"
      :hreflang="l.code"
      class="rounded-full px-2 py-0.5 font-mono text-[0.7rem] font-semibold transition-colors"
      :class="l.code === lang
        ? 'bg-rose-500 text-white-50'
        : 'text-white-500 hover:text-white-100'"
    >
      {{ l.label }}
    </NuxtLink>
  </div>
</template>
