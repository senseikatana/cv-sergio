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

## Contenido

Cada proyecto tiene su propia fuente única de verdad con el mismo shape y el mismo contenido:

- Astro: `withastro/src/data/resume.ts`
- Nuxt: `withnuxt/data/resume.ts`
- React: `withreact/src/data/resume.ts`

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
