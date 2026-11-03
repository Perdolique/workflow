import assert from 'node:assert/strict'
import test from 'node:test'
import { approve } from '../src/approve.js'

test('approves an active actor from the request team', () => {
  assert.deepEqual(approve({
    active: true,
    orgId: 'a'
  }, { orgId: 'a' }), {
    status: 'approved'
  })
})

test('previews a request without approval checks', () => {
  assert.deepEqual(approve({
    active: false,
    orgId: 'a'
  }, { orgId: 'b' }, {
    preview: true
  }), { status: 'preview' })
})

test('blocks an active actor from another team', () => {
  assert.throws(
    () => approve({
      active: true,
      orgId: 'a'
    }, { orgId: 'b' }),
    /other team blocked/
  )
})
