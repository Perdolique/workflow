import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import type { ExecException } from 'node:child_process'
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { test } from 'node:test'
import type { TestContext } from 'node:test'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

interface Skill {
  name: string;
  source: string;
}

interface State {
  skills: Skill[];
  workflow: string[];
  version: string | null;
  latest: string;
  fail?: string;
  githubStatus?: number;
  listBody?: string;
}

interface Result {
  stdout: string;
  stderr: string;
  code: number | string | undefined;
  calls: string[][];
  log: string;
}

interface Failure extends ExecException {
  stdout: string;
  stderr: string;
}

const exec = promisify(execFile)
const scriptUrl = new URL('setup-global-skills.sh', import.meta.url)
const script = fileURLToPath(scriptUrl)

async function fixture(t: TestContext) {
  const directory = await mkdtemp('/tmp/workflow-setup-test-')

  t.after(() => rm(directory, {
    recursive: true,
    force: true
  }))

  const bin = join(directory, 'bin')
  const statePath = join(directory, 'state.json')
  const callsPath = join(directory, 'calls.jsonl')
  const preload = join(directory, 'preload.ts')
  const config = join(directory, '.playwright', 'cli.config.json')

  await mkdir(bin)

  const state: State = {
    skills: [{
      name: 'unrelated',
      source: 'other/repo'
    }],

    workflow: ['alpha', 'beta'],
    version: null,
    latest: '0.1.19'
  }

  const save = () => writeFile(statePath, JSON.stringify(state))

  await save()

  await writeFile(preload, `
import { readFileSync } from 'node:fs';
if (process.env.TEST_TTY) process.stdout.isTTY = true;
globalThis.fetch = async () => {
  const state = JSON.parse(readFileSync(process.env.TEST_STATE));
  const tree = state.workflow.map(name => ({ path: 'skills/' + name + '/SKILL.md', type: 'blob' }));
  return new Response(JSON.stringify({ truncated: false, tree }), { status: state.githubStatus ?? 200 });
};
`)

  const fake = `#!${process.execPath}
import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import { basename } from 'node:path';
import { spawnSync } from 'node:child_process';
const program = basename(process.argv[1]);
const args = process.argv.slice(2);
if (program === 'vp' && args[0] === 'node') {
  if (args[1] !== '--') throw new Error('Missing vp argument separator');
  process.exit(spawnSync(process.execPath, args.slice(1), { stdio: 'inherit' }).status ?? 1);
}
const state = JSON.parse(readFileSync(process.env.TEST_STATE));
const invocation = [program, ...args];
appendFileSync(process.env.TEST_CALLS, JSON.stringify(invocation) + '\\n');
if (state.fail && invocation.join(' ').startsWith(state.fail)) {
  for (let i = 0; i < 45; i++) console.error('diagnostic ' + i);
  process.exit(7);
}
if (program === 'vpx' && args[1] === 'ls') {
  console.log(state.listBody ?? JSON.stringify(state.skills));
} else if (program === 'vpx' && args[1] === 'add') {
  const names = args.slice(args.indexOf('--skill') + 1, args.indexOf('--agent'));
  state.skills = state.skills.filter(skill => !names.includes(skill.name));
  state.skills.push(...names.map(name => ({ name, source: args[2] })));
  console.log('INSTALLER BANNER');
  console.error('installer stderr');
} else if (program === 'vpx' && args[1] === 'update') {
  console.log('Native update check');
} else if (program === 'vp' && args[0] === 'list') {
  console.log(JSON.stringify(state.version ? [{ name: '@playwright/cli', version: state.version }] : []));
} else if (program === 'vp' && args[0] === 'view') {
  console.log(JSON.stringify(state.latest));
} else if (program === 'vp' && args[0] === 'install') {
  state.version = args[2].split('@').at(-1);
} else if (program === 'playwright-cli' && args[0] === '--version') {
  console.log(state.version);
} else if (program === 'playwright-cli' && args[0] === 'install-browser') {
  console.log('browser checked');
} else throw new Error('Unexpected command: ' + invocation.join(' '));
writeFileSync(process.env.TEST_STATE, JSON.stringify(state));
`

  for (const name of ['vp', 'vpx', 'playwright-cli']) {
    const path = join(bin, name)

    await writeFile(path, fake)
    await chmod(path, 0o755)
  }

  const env: NodeJS.ProcessEnv = {
    ...process.env,
    HOME: directory,
    PATH: `${bin}:${process.env.PATH}`,
    TEST_STATE: statePath,
    TEST_CALLS: callsPath,
    NODE_OPTIONS: `--import=${preload}`
  }

  const run = async (args: string[] = []): Promise<Result> => {
    await writeFile(callsPath, '')

    let result: Result

    try {
      const output = await exec('/bin/sh', [script, ...args], { env })

      result = {
        stdout: output.stdout,
        stderr: output.stderr,
        code: 0,
        log: '',
        calls: []
      }
    } catch (error) {
      const failed = error as Failure

      result = {
        stdout: failed.stdout,
        stderr: failed.stderr,
        code: failed.code,
        log: '',
        calls: []
      }
    }

    const logPath = result.stdout.match(/Setup log: (.+)/)?.[1]

    if (logPath) {
      const logDirectory = join(logPath, '..')

      t.after(() => rm(logDirectory, {
        recursive: true,
        force: true
      }))

      result.log = await readFile(logPath, 'utf8')
    }

    const calls = await readFile(callsPath, 'utf8')

    result.calls = calls.trim().split('\n').filter(Boolean).map(line => JSON.parse(line))

    const current = await readFile(statePath, 'utf8')

    Object.assign(state, JSON.parse(current))

    return result
  }

  return {
    state,
    save,
    run,
    config,
    env
  }
}

function success(result: Result) {
  assert.equal(result.code, 0, result.stderr)
  assert.match(result.stdout, /Setup complete/)
}

test('first run installs; rerun delegates scoped updates and preserves config', async t => {
  const f = await fixture(t)
  const first = await f.run()

  success(first)

  const additions = first.calls.filter(call => call[1] === 'skills' && call[2] === 'add')

  assert.equal(additions.length, 3)
  assert.doesNotMatch(first.stdout, /INSTALLER BANNER|\x1b/)
  assert.match(first.log, /INSTALLER BANNER/)
  assert.match(first.log, /installer stderr/)
  await writeFile(f.config, 'custom config')

  const second = await f.run()

  success(second)
  assert.ok(!second.calls.some(call => call[2] === 'add' || call[1] === 'install'))

  const updates = second.calls.filter(call => call[2] === 'update')

  assert.equal(updates.length, 3)
  assert.deepEqual(updates[0], ['vpx', 'skills', 'update', '--global', 'alpha', 'beta', '--yes'])
  assert.ok(updates.every(call => !call.includes('unrelated')))
  assert.equal(await readFile(f.config, 'utf8'), 'custom config')
  assert.ok(f.state.skills.some(skill => skill.name === 'unrelated'))
})

test('new, missing and wrong-source skills are added; CLI version changes install the resolved version', async t => {
  const f = await fixture(t)

  success(await f.run())
  f.state.workflow.push('gamma')

  f.state.skills = f.state.skills.filter(skill => skill.name !== 'beta')
  f.state.skills.find(skill => skill.name === 'alpha')!.source = 'wrong/repo'
  f.state.latest = '0.1.20'

  await f.save()

  const result = await f.run()

  success(result)

  const additions = result.calls.filter(call => call[2] === 'add')

  assert.equal(additions.length, 1)
  assert.deepEqual(additions[0].slice(6, -3), ['alpha', 'beta', 'gamma'])
  assert.ok(result.calls.some(call => call.join(' ') === 'vp install -g @playwright/cli@0.1.20'))
})

for (const failure of ['vpx skills ls', 'vpx skills add', 'vpx skills update', 'vp view', 'playwright-cli install-browser']) {
  test(`${failure} failure stops setup and preserves raw diagnostics`, async t => {
    const f = await fixture(t)

    if (failure.endsWith('update')) success(await f.run())

    f.state.fail = failure

    await f.save()

    const result = await f.run()

    assert.equal(result.code, 1)
    assert.doesNotMatch(result.stdout, /Setup complete|Playwright config:/)
    assert.ok(result.calls.at(-1)!.join(' ').startsWith(failure))
    assert.match(result.log, /diagnostic 0\n/)
    assert.doesNotMatch(result.stderr, /diagnostic 0\n/)
    assert.match(result.stderr, /diagnostic 44/)
    assert.match(result.stderr, /Log: \/tmp\//)
  })
}

test('discovery and malformed JSON fail before installation', async t => {
  const f = await fixture(t)

  f.state.githubStatus = 503

  await f.save()

  const github = await f.run()

  assert.equal(github.code, 1)
  assert.match(github.stderr, /HTTP 503/)
  assert.equal(github.calls.length, 1)

  f.state.listBody = '{'

  await f.save()

  const malformed = await f.run()

  assert.equal(malformed.code, 1)
  assert.equal(malformed.calls.length, 1)
})

test('verbose, terminal progress and help keep working', async t => {
  const f = await fixture(t)
  const verbose = await f.run(['--verbose'])

  success(verbose)
  assert.match(verbose.stdout, /INSTALLER BANNER/)
  assert.match(verbose.stderr, /installer stderr/)

  f.env.TEST_TTY = '1'

  const tty = await f.run()

  success(tty)
  assert.match(tty.stdout, /\r\x1b\[2K/)

  const help = await f.run(['--help'])

  assert.equal(help.code, 0)
  assert.equal(help.stdout, 'Usage: setup-global-skills.sh [--verbose]\n')
  assert.deepEqual(help.calls, [])
})
