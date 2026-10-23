import { defineConfig } from 'cf/config'
import * as entrypoint from './src/index.ts' with { type: 'cf-worker' }

export default defineConfig({
  worker: {
    name: 'pantry-api',
    entrypoint,
    compatibilityDate: '2026-10-19',
    compatibilityFlags: ['nodejs_compat']
  }
})
