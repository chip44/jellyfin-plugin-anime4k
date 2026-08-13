import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    build: {
      lib: {
        entry: 'src/main.ts',
        formats: ['iife'],
        name: 'Anime4KPlugin',
        fileName: () => 'main.js',
      },
      minify: mode === 'production',
    },
  };
});
