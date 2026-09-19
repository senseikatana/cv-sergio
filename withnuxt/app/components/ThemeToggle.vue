<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useLang()

const isDark = computed(() => colorMode.value === 'dark')

function toggle() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    class="inline-flex size-9 items-center justify-center rounded-full border border-dark-700/70 bg-dark-800/50 text-white-400 transition-colors hover:border-dark-600 hover:text-white-100"
    :aria-label="t.themeToggle"
    @click="toggle"
  >
    <UIcon :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'" class="size-4" />
  </button>
</template>
