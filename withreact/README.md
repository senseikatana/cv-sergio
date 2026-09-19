# CV Digital — React (TanStack Start)

CV digital multilingüe (ES/CA/EN) construido con TanStack Start + React 19, desplegado como
Worker de Cloudflare en `senseikatana.com/resume/*`. Incluye un **asistente de CV con IA**
como extra propio de este stack.

## Stack

- TanStack Start / TanStack Router (SSR + file-based routing)
- React 19 + Tailwind CSS v4 (paleta Senseikatana v3, dark-first)
- Asistente IA con `@tanstack/ai` (Anthropic, OpenAI, Gemini u Ollama)
- Biome (lint + format) y Vitest del propio ecosistema Vite

## Estructura

```
src/
├── data/resume.ts                 ← fuente única: CV, perfiles, servicios y UI (ES/CA/EN)
├── components/
│   ├── Header.tsx · Footer.tsx
│   ├── LangSwitcher.tsx · ThemeToggle.tsx
│   └── ResumeAssistant.tsx · ResumeAssistantButton.tsx
├── lib/
│   ├── lang.ts · seo.ts · reveal.ts
│   ├── resume-ai-hook.ts          ← cliente del asistente
│   └── resume-tools.ts            ← tools del asistente sobre data/resume.ts
├── routes/
│   ├── __root.tsx
│   └── resume/
│       ├── index.tsx              ← redirige a /resume/es/
│       ├── api/resume-chat.ts     ← endpoint SSE del asistente
│       └── $lang/
│           ├── index.tsx          ← CV con pestañas + perfiles + CTA
│           ├── services.tsx · contact.tsx
│           ├── $profile.tsx       ← logistica | fullstack | generico
│           └── about.tsx · shop.tsx → redirigen al CV
└── styles.css                     ← tokens, reveal y print
public/resume/
├── cv/sergio-jurado.{jpg,pdf}
└── favicon.svg
```

Los assets de build se generan bajo `/resume/assets/` (`build.assetsDir` en `vite.config.ts`).

## Asistente IA

El endpoint `/resume/api/resume-chat` usa el primer proveedor disponible:

| Variable | Modelo por defecto |
|---|---|
| `ANTHROPIC_API_KEY` | `claude-haiku-4-5` |
| `OPENAI_API_KEY` | `gpt-4o` |
| `GEMINI_API_KEY` | `gemini-2.0-flash-exp` |

Sin ninguna key cae a Ollama (`mistral:7b`). En Cloudflare se configuran como secrets:

```bash
bunx wrangler secret put ANTHROPIC_API_KEY
```

## Ejecutar

```bash
bun install
bun run dev        # http://localhost:3000/resume/es/
bun run check      # biome
bun run build      # → dist/client + dist/server
```

## Deploy

```bash
bun run deploy     # vite build + wrangler deploy
```

`wrangler.jsonc` incluye la ruta `senseikatana.com/resume/*`; el plugin de Cloudflare genera
la config final con los assets de `dist/client`.
