import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['client/**/*.spec.{ts,tsx}', 'client/**/*.test.{ts,tsx}', 'server/**/*.spec.{ts,tsx}', 'server/**/*.test.{ts,tsx}'],
    exclude: ['tests/e2e/**', 'node_modules/**'],
  },
});
