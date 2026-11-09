import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://robeshell.github.io',
  output: 'static',
  vite: {
    build: {
      // Keep font slices as real files: inlining them as base64 would bloat the font stylesheets.
      assetsInlineLimit: (file) => (file.endsWith('.woff2') ? false : undefined),
    },
  },
});
