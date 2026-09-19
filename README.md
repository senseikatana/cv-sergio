# CV Sergio — tres implementaciones

CV digital de **Sergio Jurado Casado** (`senseikatana`), implementado tres veces para comparar rendimiento y DX.

| Versión | Stack | Estado |
|---|---|---|
| [`withastro/`](withastro/) | Astro 5 (estático) | ✅ Activa |
| [`withnuxt/`](withnuxt/) | Nuxt 4 + Nuxt UI (estático) | ✅ Activa |
| [`withreact/`](withreact/) | TanStack Start + React 19 (Cloudflare Workers) | ✅ Activa |

Las tres versiones comparten el mismo contenido (ES/CA/EN), las mismas pantallas y el mismo
diseño (paleta Senseikatana v3, dark-first). El CV **no vive en la raíz del dominio**: se
despliega en `senseikatana.com/resume/*`, por eso todos los assets se generan bajo `/resume/`.

## Rutas comunes

| Ruta | Pantalla |
|---|---|
| `/resume` | redirige a `/resume/es/` |
| `/resume/es/` · `/resume/ca/` · `/resume/en/` | CV con pestañas (perfil, experiencia, formación, skills, disponibilidad) + perfiles + CTA |
| `/resume/{lang}/logistica` · `fullstack` · `generico` | perfiles adaptados con datos reales |
| `/resume/{lang}/services` | servicios |
| `/resume/{lang}/contact` | contacto (email, teléfono, WhatsApp, LinkedIn, GitHub, formulario mailto) |

`about` y `shop` redirigen al CV por compatibilidad con enlaces antiguos.

## Desarrollo

```bash
# Astro   → http://localhost:4321
cd withastro && bun install && bun run dev

# Nuxt    → http://localhost:3000
cd withnuxt && bun install && bun run dev

# React   → http://localhost:3000
cd withreact && bun install && bun run dev
```

## Estructura espejo

Los tres proyectos mantienen la misma estructura dentro de su carpeta de código (`src/` en
Astro y React, `app/` en Nuxt):

```
├── components/   Header, Footer, LangSwitcher, ThemeToggle (+ extras propios del stack)
├── data/         resume.ts + brand.json + projects.json (fuente única del proyecto)
├── layouts/      ResumeLayout.astro · default.vue · __root.tsx (según el framework)
├── pages/ routes/  resume/{index, [lang]/index, [lang]/[page]} (según el framework)
├── styles        global.css · main.css · styles.css
└── tests/        resume.test.ts — el mismo test de datos en los tres
```

Solo cambian los archivos propios del stack (configs, router, componentes del asistente IA
en React, etc.).

## Contenido

Cada proyecto mantiene su propia carpeta `data/` como fuente única de verdad, con el mismo
shape y el mismo contenido:

- `resume.ts` — CV, perfiles, servicios y UI (ES/CA/EN)
- `brand.json` — paleta de marca Senseikatana (v1, v2 extraídas de los PDFs; v3 vigente con
  los tokens OKLCH que usan los tres stacks)
- `projects.json` — boceto (`draft`) de proyectos extraído de los perfiles antiguos,
  no publicado en el CV actual

Rutas:

- Astro: `withastro/src/data/`
- Nuxt: `withnuxt/app/data/`
- React: `withreact/src/data/`

El PDF descargable vive en `public/resume/cv/sergio-jurado.pdf` en cada proyecto.

## Deploy (Cloudflare, apex → `/resume/*`)

Cada proyecto incluye un `wrangler.jsonc` con la ruta `senseikatana.com/resume/*`:

```bash
cd withastro && bun run build && bunx wrangler deploy
cd withnuxt && bun run generate && bunx wrangler deploy
cd withreact && bun run deploy
```

Solo una implementación puede servir `/resume` a la vez; las otras quedan listas para
desplegarse en otra ruta o subdominio cambiando el `pattern` de `wrangler.jsonc`.
