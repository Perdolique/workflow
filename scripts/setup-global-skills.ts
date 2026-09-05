import { spawn } from 'node:child_process'
import { appendFileSync } from 'node:fs'
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { join } from 'node:path'

interface SkillSource {
  label: string;
  repo: string;
  names?: string[];
}

interface InstalledSkill {
  name: string;
  source: string | null;
}

const sources: SkillSource[] = [
  {
    label: 'Workflow skills',
    repo: 'perdolique/workflow'
  },
  {
    label: 'Playwright skill',
    repo: 'microsoft/playwright-cli',
    names: ['playwright-cli']
  },
  {
    label: 'Cloudflare skills',
    repo: 'cloudflare/skills',
    names: ['cloudflare', 'cloudflare-email-service', 'durable-objects', 'turnstile-spin', 'web-perf', 'workers-best-practices', 'wrangler']
  }
]

const home = homedir()
const args = process.argv.slice(2)
const verbose = args.includes('--verbose')
const inline = process.stdout.isTTY && !verbose
let logFile: string | undefined
let stepOutput = ''
let stepLabel = 'Startup'
let stepNumber = 0

function record(text: string) {
  if (!logFile) throw new Error('Setup log is not initialized')

  appendFileSync(logFile, text)

  stepOutput = (stepOutput + text).slice(-65536)
}

function command(program: string, args: string[]): Promise<string> {
  const invocation = [program, ...args].join(' ')

  record(`\n$ ${invocation}\n`)

  return new Promise((resolve, reject) => {
    const child = spawn(program, args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let stdout = ''

    child.stdout.setEncoding('utf8')
    child.stderr.setEncoding('utf8')

    child.stdout.on('data', chunk => {
      stdout += chunk

      record(chunk)

      if (verbose) process.stdout.write(chunk)
    })

    child.stderr.on('data', chunk => {
      record(chunk)

      if (verbose) process.stderr.write(chunk)
    })

    child.on('error', reject)

    child.on('close', (code, signal) => {
      if (code === 0) {
        const output = stdout.trim()

        resolve(output)
      } else {
        const reason = signal ?? `exit ${code}`
        const error = new Error(`${program} failed (${reason})`)

        reject(error)
      }
    })
  })
}

async function step(label: string, action: () => Promise<string>) {
  stepLabel = label
  stepNumber += 1
  stepOutput = ''

  const prefix = `[${stepNumber}/6] ${label}`

  record(`\n${prefix}\n`)
  process.stdout.write(`${prefix}...${inline ? '' : '\n'}`)

  const result = await action()
  const summary = `${prefix}: ${result}\n`

  record(summary)
  process.stdout.write(`${inline ? '\r\x1b[2K' : ''}${summary}`)
}

async function workflowSkills(): Promise<string[]> {
  const url = 'https://api.github.com/repos/perdolique/workflow/git/trees/HEAD?recursive=1'
  const headers: Record<string, string> = { 'User-Agent': 'workflow-setup' }
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN

  if (token) headers.Authorization = `Bearer ${token}`

  const signal = AbortSignal.timeout(30000)

  const response = await fetch(url, {
    headers,
    signal
  })

  const body = await response.text()

  record(`GET ${url}\nHTTP ${response.status}\n${body}\n`)

  if (!response.ok) throw new Error(`Workflow discovery failed: HTTP ${response.status}`)

  const data = JSON.parse(body)

  if (data.truncated !== false || !Array.isArray(data.tree)) throw new Error('Incomplete workflow tree')

  const names: string[] = []

  for (const entry of data.tree) {
    const match = /^skills\/([^/]+)\/SKILL\.md$/.exec(entry.path)

    if (entry.type === 'blob' && match) names.push(match[1])
  }

  if (!names.length) throw new Error('No workflow skills found')

  return names.sort()
}

async function syncSkills(source: SkillSource, installed: InstalledSkill[]) {
  const names = source.names ?? await workflowSkills()
  const missing = names.filter(name => !installed.some(skill => skill.name === name && skill.source === source.repo))
  const existing = names.filter(name => !missing.includes(name))

  if (missing.length) {
    const args = ['skills', 'add', source.repo, '--global', '--skill', ...missing, '--agent', 'universal', '--yes']

    await command('vpx', args)
  }

  if (existing.length) {
    const args = ['skills', 'update', '--global', ...existing, '--yes']

    await command('vpx', args)
  }

  return 'done'
}

async function syncCli() {
  const listOutput = await command('vp', ['list', '-g', '--json'])
  const packages = JSON.parse(listOutput)

  if (!Array.isArray(packages) || packages.some(pkg => !pkg
    || typeof pkg.name !== 'string' || typeof pkg.version !== 'string')) {
    throw new Error('Malformed global package list from vp')
  }

  const versionOutput = await command('vp', ['view', '@playwright/cli@latest', 'version', '--json'])
  const latest = JSON.parse(versionOutput)

  if (typeof latest !== 'string' || !/^\d+\.\d+\.\d+(?:-[\w.-]+)?(?:\+[\w.-]+)?$/.test(latest)) {
    throw new Error('Malformed latest Playwright CLI version from vp')
  }

  const installed = packages.find(pkg => pkg.name === '@playwright/cli')?.version

  if (installed !== latest) await command('vp', ['install', '-g', `@playwright/cli@${latest}`])

  const actual = await command('playwright-cli', ['--version'])

  if (actual !== latest) throw new Error(`Playwright CLI version mismatch: expected ${latest}, got ${actual}`)

  return installed === latest ? `current (${latest})` : installed ? `updated (${installed} -> ${latest})` : `installed (${latest})`
}

async function ensureConfig() {
  const directory = join(home, '.playwright')

  await mkdir(directory, { recursive: true })

  try {
    const path = join(directory, 'cli.config.json')

    const config = { browser: {
      browserName: 'chromium',
      launchOptions: { channel: 'chromium' }
    } }

    const json = JSON.stringify(config, null, 2)
    const content = `${json}\n`

    await writeFile(path, content, { flag: 'wx' })

    return 'created'
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'EEXIST') return 'kept'

    throw error
  }
}

async function main() {
  if (args.some(arg => !['--verbose', '--help'].includes(arg))) throw new Error('Usage: setup-global-skills.sh [--verbose]')

  if (args.includes('--help')) {
    process.stdout.write('Usage: setup-global-skills.sh [--verbose]\n')

    return
  }

  const directory = await mkdtemp('/tmp/workflow-setup-')

  logFile = join(directory, 'setup.log')

  await writeFile(logFile, '', { mode: 0o600 })
  process.stdout.write(`Setup log: ${logFile}\n`)

  const listOutput = await command('vpx', ['skills', 'ls', '--global', '--json'])
  const installed: InstalledSkill[] = JSON.parse(listOutput)

  if (!Array.isArray(installed)) throw new Error('Invalid skills list')

  for (const source of sources) await step(source.label, () => syncSkills(source, installed))

  await step('Playwright CLI', syncCli)

  await step('Chromium', async () => {
    await command('playwright-cli', ['install-browser', 'chromium'])

    return 'ready'
  })

  await step('Playwright config', ensureConfig)
  process.stdout.write(`Setup complete. Log: ${logFile}\n`)
}

try {
  await main()
} catch (error) {
  if (logFile) {
    const detail = error instanceof Error ? error.stack ?? error.message : String(error)
    const cause = error instanceof Error && error.cause instanceof Error ? error.cause.stack : ''

    record(`${detail}\n${cause ?? ''}`)

    if (inline) process.stdout.write('\r\x1b[2K')

    const lines = stepOutput.trimEnd().split('\n')
    const tail = lines.slice(-30).join('\n')

    process.stderr.write(`Setup failed at ${stepLabel}.\n${tail}\nLog: ${logFile}\n`)
  } else {
    const detail = error instanceof Error ? error.stack ?? error.message : String(error)

    process.stderr.write(`${detail}\n`)
  }

  process.exitCode = 1
}
