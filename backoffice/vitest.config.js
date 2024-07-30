import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  globalSetup: './vitest.setup.js',
  test: {
    watch: false,
    include: ['./src/**/*.spec.js', './e2e/**/*.spec.js'],
    exclude: ['./src/**/index.js', ...configDefaults.exclude],
    reporters: ['default'],
    testTimeout: 30000,
    hookTimeout: 30000,
    coverage: {
      enabled: true,
      provider: 'istanbul',
      include: ['src/**'],
      exclude: ['src/**/index.js'],
      reporter: ['text', 'json', 'html']
    }
  }
})
