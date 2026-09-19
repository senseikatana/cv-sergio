# CV Digital — Nuxt 4

CV digital multilingüe (ES/CA/EN) construido con Nuxt 4 + Nuxt UI v4 y generado como sitio
estático (`nuxt generate`) para desplegarse en `senseikatana.com/resume/*`.

## Stack

- Nuxt 4 (`compatibilityVersion: 4`) + Nuxt UI v4 (color mode dark-first)
- Tailwind CSS v4 con la paleta Senseikatana v3 (OKLCH)
- Vitest + ESLint (flat config)
- Sin servidor: no hay APIs, blog ni tienda; solo el CV

## Estructura

```
app/
├── assets/css/main.css            ← tokens de color/fuente, reveal y print
├── components/
│   ├── Header.vue                 ← nav + idioma + tema
│   ├── Footer.vue
│   ├── LangSwitcher.vue
│   └── ThemeToggle.vue
├── composables/
│   ├── useLang.ts                 ← idioma desde [lang] + helpers de ruta
│   ├── useResumeSeo.ts            ← canonical + hreflang
│   └── useReveal.ts               ← IntersectionObserver de .reveal
├── data/resume.ts                 ← fuente única: CV, perfiles, servicios y UI (ES/CA/EN)
├── layouts/default.vue
└── pages/resume/
    ├── index.vue                  ← redirige a /resume/es/
    └── [lang]/
        ├── index.vue              ← CV con pestañas + perfiles + CTA
        └── [page].vue             ← services, contact, perfiles (about/shop redirigen)
public/resume/
├── cv/sergio-jurado.{jpg,pdf}
└── favicon.svg
tests/resume.test.ts               ← mismo test que Astro y React (11 checks de datos)
```

Los assets de build se generan bajo `/resume/_nuxt/` (`app.buildAssetsDir`) porque el Worker
de Cloudflare solo atiende `senseikatana.com/resume/*`.

## Rutas generadas

- `/resume/` → `/resume/es/`
- `/resume/{es,ca,en}/` — CV con pestañas
- `/resume/{lang}/services`, `contact`
- `/resume/{lang}/logistica`, `fullstack`, `generico`
- `/resume/{lang}/about`, `shop` → redirigen al CV

## Ejecutar

```bash
bun install
bun run dev        # http://localhost:3000/resume/es/
bun run lint
bun run test
bun run generate   # → .output/public
```

## Deploy

```bash
bun run generate
bunx wrangler deploy
```

`wrangler.jsonc` publica `.output/public` como assets Worker en la ruta
`senseikatana.com/resume/*`.
