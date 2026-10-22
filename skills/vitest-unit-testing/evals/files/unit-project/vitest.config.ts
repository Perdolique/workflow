import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    isolate: true,
    include: ['src/**/*.test.ts']
  }
})
