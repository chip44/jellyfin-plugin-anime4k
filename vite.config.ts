import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.ts',
      formats: ['es', 'iife'],
      name: 'Anime4KPlugin',
    },
  },
});
