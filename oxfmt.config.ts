import { defineConfig } from 'oxfmt';

export default defineConfig({
  sortImports: true,
  singleQuote: true,
  ignorePatterns: ['dist/**', 'Jellyfin/**', 'Anime4KJS/**'],
});
