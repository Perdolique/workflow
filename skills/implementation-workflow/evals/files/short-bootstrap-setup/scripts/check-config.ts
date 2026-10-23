import { existsSync } from 'node:fs'
import process from 'node:process'

if (!existsSync('cloudflare.config.ts')) {
  process.stderr.write('Missing cloudflare.config.ts. Restore it from Git before running pnpm dev.\n')

  process.exitCode = 1
}
