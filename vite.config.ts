import { defineConfig } from 'vite';
import { run } from 'vite-plugin-run';

export default defineConfig(({ mode }) => {
  return {
    build: {
      lib: {
        entry: 'src/main.ts',
        formats: ['iife'],
        name: 'Anime4KPlugin',
        fileName: (_, entryName) => `${entryName}.js`,
      },
    },
    esbuild: {
      pure: mode === 'production' ? ['console.log'] : [],
    },
    plugins: [
      run({
        silent: false,
        input: [
          {
            name: 'build',
            run: ['vite', 'build', '--mode', 'development'],
            pattern: ['src/**/*'],
            build: false,
          },
        ],
      }),
    ],
  };
});
