# AGENTS.md — Development Guidelines

## Project Overview

CV digital de Sergio Jurado Casado, parte de senseikatana.com. Se despliega en
`senseikatana.com/resume/*` como sitio estático generado con Nuxt.

**Stack**: Nuxt 4, Nuxt UI v4, Tailwind CSS v4, Vitest, ESLint

## Key Conventions

### Routing

- Idioma siempre en la ruta: `/resume/{es|ca|en}/`
- `/resume/` redirige a `/resume/es/` (301)
- El CV principal vive en `/resume/[lang]/index.vue` y usa pestañas con scroll-spy
- Páginas secundarias: `services`, `contact` y los perfiles `logistica`, `fullstack`, `generico`
- `about` y `shop` redirigen al CV por compatibilidad
- El CV **nunca** va en la raíz del dominio

### Data Layer

- `data/resume.ts` es la única fuente de verdad: CV, perfiles, servicios, secciones y UI
  en ES/CA/EN. Debe mantener el mismo shape que `withastro/src/data/resume.ts` y
  `withreact/src/data/resume.ts`
- Assets públicos bajo `public/resume/` (PDF, foto, favicon) porque el Worker solo
  atiende `/resume/*`

### Assets

- `app.buildAssetsDir: '/resume/_nuxt/'` en `nuxt.config.ts` mantiene los assets de build
  dentro de la ruta desplegada
- Antes de cambiar de carpeta assets o rutas, verificar `bun run generate` y que los
  `href`/`src` del HTML generado empiecen por `/resume/`

### Lint

- Flat config en `eslint.config.mjs` (ESLint + typescript-eslint + eslint-plugin-vue)
- Los auto-imports de Vue/Nuxt y los composables propios (`useLang`, `resumePath`,
  `useResumeSeo`, `useRevealObserver`) están declarados como globals readonly
- Run: `bun run lint`

### Testing

- Vitest (`bun run test`) con `tests/resume.test.ts` valida el contenido ES/CA/EN

### CSS / Design Tokens

- Paleta Senseikatana v3.0.0 en OKLCH (`app/assets/css/main.css`)
- Las escalas `dark-*` (superficies) y `white-*` (tinta) se invierten con `.dark`
- Fuentes self-hosted: Inter Variable + JetBrains Mono Variable (`@fontsource-variable`)
- Dark mode por defecto (`colorMode.preference: 'dark'`)

### Nuxt UI v4

- Root wrapper: `<UApp>` en `app.vue`
- Iconos en modo `svg` (`icon.mode`) para que rendericen en SSR
- Colores por rol en `app/app.config.ts` (primary rose, secondary teal, info sky…)

## Anti-Patterns

- ❌ No volver a meter blog, tienda, Stripe, Prisma ni i18n: este proyecto es solo el CV
- ❌ No poner el CV en `/` ni generar un `index.html` raíz
- ❌ No usar `~/data/*` — usar `~~/data/*`
- ❌ No usar `sensei-*` como prefijo de color
- ❌ No añadir atribución de IA ni "Co-Authored-By" en commits

## Commit Style

Conventional commits only (feat, fix, chore, docs, refactor, test, perf, ci).
