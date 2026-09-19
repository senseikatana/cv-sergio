# CV Digital — Astro

CV digital multilingüe (ES/CA/EN) construido con Astro, estático y sin dependencias de
cliente más allá del toggle de tema, el scroll-spy y el reveal on scroll (todo inline).

## Estructura

```
src/
├── data/resume.ts                 ← fuente única: CV, perfiles, servicios y UI (ES/CA/EN)
├── layouts/ResumeLayout.astro     ← HTML base, design system, header/footer, SEO
└── pages/resume/
    ├── index.astro                ← redirige a /resume/es/
    └── [lang]/
        ├── index.astro            ← CV con pestañas + perfiles + CTA
        └── [page].astro           ← services, contact, perfiles (about/shop redirigen)
public/resume/
├── cv/sergio-jurado.{jpg,pdf}
└── favicon.svg
```

Todos los assets se generan bajo `/resume/` (`build.assets` en `astro.config.mjs`) porque el
Worker de Cloudflare solo atiende `senseikatana.com/resume/*`.

## Rutas generadas (25 páginas)

- `/resume/` → `/resume/es/`
- `/resume/{es,ca,en}/` — CV con pestañas
- `/resume/{lang}/services`, `contact`
- `/resume/{lang}/logistica`, `fullstack`, `generico`
- `/resume/{lang}/about`, `shop` → redirigen al CV

## Ejecutar

```bash
bun install
bun run dev        # http://localhost:4321/resume/es/
bun run build      # → dist/
bun run preview
```

## Deploy

```bash
bun run build
bunx wrangler deploy
```

`wrangler.jsonc` publica `dist/` como assets Worker en la ruta `senseikatana.com/resume/*`.

## Editar el CV

Todo el contenido vive en `src/data/resume.ts`. Tras editarlo, reconstruir:

```bash
bun run build
```
