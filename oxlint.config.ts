import { defineConfig } from 'oxlint';

export default defineConfig({
  options: {
    typeAware: true,
    typeCheck: true,
  },
  categories: {
    correctness: 'error',
    suspicious: 'warn',
    pedantic: 'warn',
    perf: 'warn',
  },
  rules: {
    'typescript/prefer-readonly-parameter-types': 'off',
  },
  ignorePatterns: ['dist/**', 'Jellyfin/**', 'Anime4KJS/**', 'src/components/action-sheet.ts'],
});
