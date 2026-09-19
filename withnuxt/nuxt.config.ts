const langs = ['es', 'ca', 'en']
const pages = ['about', 'services', 'contact', 'shop', 'logistica', 'fullstack', 'generico']

export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-01-01',

  modules: ['@nuxt/ui'],

  css: ['~/assets/css/main.css'],

  app: {
    // Todos los assets generados viven bajo /resume/ porque el Worker de
    // Cloudflare solo atiende senseikatana.com/resume/*.
    buildAssetsDir: '/resume/_nuxt/',
    head: {
      title: 'Sergio Jurado Casado — CV',
      htmlAttrs: { lang: 'es-ES', dir: 'ltr' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#11151c' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/resume/favicon.svg' },
      ],
    },
  },

  routeRules: {
    '/**': {
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      },
    },
  },

  nitro: {
    prerender: {
      crawlLinks: false,
      routes: [
        '/resume/',
        ...langs.map(lang => `/resume/${lang}/`),
        ...langs.flatMap(lang => pages.map(page => `/resume/${lang}/${page}/`)),
      ],
    },
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },

  ui: {
    theme: {
      colors: ['rose', 'teal', 'emerald', 'yellow', 'sky', 'dark', 'white', 'lavender'],
    },
  },

  icon: {
    mode: 'svg',
    clientBundle: {
      scan: true,
    },
  },
})
