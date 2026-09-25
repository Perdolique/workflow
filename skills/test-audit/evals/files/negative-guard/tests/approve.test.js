import assert from 'node:assert/strict'
import test from 'node:test'
import { approve } from '../src/approve.js'

test('blocks requests from another team', () => {
  assert.throws(
    () => approve({
      active: false,
      orgId: 'team-a'
    }, { orgId: 'team-b' }),
    /blocked/
  )
})
