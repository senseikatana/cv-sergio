import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://senseikatana.com',
  trailingSlash: 'always',
  output: 'static',
  // Todos los assets generados viven bajo /resume/ porque el Worker de
  // Cloudflare solo atiende senseikatana.com/resume/*.
  build: {
    assets: 'resume/_astro'
  }
});
