import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

// Globals de Vue + Nuxt (auto-imports) y del navegador/node
const globals = {
  // Vue
  ref: 'readonly',
  computed: 'readonly',
  reactive: 'readonly',
  watch: 'readonly',
  watchEffect: 'readonly',
  nextTick: 'readonly',
  onMounted: 'readonly',
  onBeforeUnmount: 'readonly',
  // Nuxt
  useRoute: 'readonly',
  useRouter: 'readonly',
  useAsyncData: 'readonly',
  useFetch: 'readonly',
  useRuntimeConfig: 'readonly',
  useSeoMeta: 'readonly',
  useHead: 'readonly',
  createError: 'readonly',
  navigateTo: 'readonly',
  definePageMeta: 'readonly',
  // color mode
  useColorMode: 'readonly',
  // Composables propios
  useLang: 'readonly',
  resumePath: 'readonly',
  useResumeSeo: 'readonly',
  useRevealObserver: 'readonly',
  // Nuxt UI
  useToast: 'readonly',
  $fetch: 'readonly',
  defineNuxtConfig: 'readonly',
  defineAppConfig: 'readonly',
  // Runtime
  process: 'readonly',
  console: 'readonly',
  fetch: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  URL: 'readonly',
  document: 'readonly',
  window: 'readonly',
  navigator: 'readonly',
  localStorage: 'readonly',
  IntersectionObserver: 'readonly',
  HTMLElement: 'readonly',
}

export default tseslint.config(
  { ignores: ['.nuxt/', '.output/', '.data/', 'node_modules/', 'dist/'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    languageOptions: {
      globals,
    },
    rules: {
      'no-unused-vars': 'off',
    },
  },

  ...pluginVue.configs['flat/essential'],

  // Soporte de TypeScript en bloques <script lang="ts"> de .vue
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
)