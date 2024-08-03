import { configDefaults, defineConfig } from 'vitest/config'

const timeout = 30000

export default defineConfig({
  globalSetup: './vitest.setup.js',
  test: {
    watch: false,
    include: ['./(e2e|src)/**/*.spec.js'],
    exclude: [
      './src/**/index.js',
      './src/server/asmt.js',
      ...configDefaults.exclude
    ],
    reporters: ['default'],
    testTimeout: timeout,
    hookTimeout: timeout,
    coverage: {
      enabled: true,
      provider: 'istanbul',
      include: ['src/**'],
      exclude: [
        'src/**/index.js',
        'src/**/*.spec.js',
        'src/server/asmt.js'
      ],
      reporter: ['text', 'json', 'html']
    }
  }
})
