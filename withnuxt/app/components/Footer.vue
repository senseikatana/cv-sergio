<script setup lang="ts">
import { meta } from '~/data/resume'

const { t } = useLang()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-dark-700/70 bg-dark-950 py-7">
    <div class="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-5 sm:px-8">
      <span class="text-sm text-white-500">
        © {{ year }} {{ meta.name }} · {{ t.footerPartOf }}
      </span>
      <div class="flex gap-4 text-sm">
        <a :href="`mailto:${meta.email}`" class="text-white-400 transition-colors hover:text-white-50">Email</a>
        <a :href="meta.linkedin" target="_blank" rel="noopener" class="text-white-400 transition-colors hover:text-white-50">LinkedIn</a>
        <a :href="meta.github" target="_blank" rel="noopener" class="text-white-400 transition-colors hover:text-white-50">GitHub</a>
      </div>
    </div>
  </footer>
</template>
