<script setup lang="ts">
import { meta } from '~~/data/resume'

const { lang, t } = useLang()
const route = useRoute()

const navItems = computed(() => [
  { path: '', label: t.value.nav.cv },
  { path: 'services', label: t.value.nav.services },
  { path: 'contact', label: t.value.nav.contact },
])

function isActive(path: string) {
  const href = resumePath(lang.value, path)
  return path === '' ? route.path === href : route.path.startsWith(href)
}
</script>

<template>
  <header class="sticky top-0 z-50 h-16 border-b border-dark-700/70 bg-dark-900/80 backdrop-blur-md">
    <div class="mx-auto flex h-16 w-full max-w-6xl items-center gap-5 px-5 sm:px-8">
      <NuxtLink
        :to="resumePath(lang)"
        class="inline-flex items-baseline gap-2 text-lg font-bold tracking-tight text-white-50"
      >
        SJ
        <span class="hidden font-mono text-[0.7rem] font-medium text-white-500 sm:inline">senseikatana/resume</span>
      </NuxtLink>

      <nav class="hidden flex-1 gap-1.5 md:flex" aria-label="Principal">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="resumePath(lang, item.path)"
          class="rounded-full px-3 py-1.5 text-sm transition-colors"
          :class="isActive(item.path)
            ? 'bg-dark-800/60 text-white-50'
            : 'text-white-400 hover:bg-dark-800/60 hover:text-white-50'"
          :aria-current="isActive(item.path) ? 'page' : undefined"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="ml-auto flex items-center gap-2">
        <AppLangSwitcher />
        <a
          :href="meta.github"
          target="_blank"
          rel="noopener"
          aria-label="GitHub"
          class="hidden size-9 items-center justify-center rounded-full border border-dark-700/70 bg-dark-800/50 text-white-400 transition-colors hover:border-dark-600 hover:text-white-100 md:inline-flex"
        >
          <UIcon name="i-simple-icons-github" class="size-4" />
        </a>
        <AppThemeToggle />
      </div>
    </div>
  </header>
</template>
