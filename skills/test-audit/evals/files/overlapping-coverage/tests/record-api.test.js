import assert from 'node:assert/strict'
import test from 'node:test'
import { normalizeId } from '../src/normalize-id.js'
import { getRecord } from '../src/record-api.js'

test('accepts normalized public IDs', () => {
  assert.equal(normalizeId(' C-3 '), 'c-3')
})

test('returns the public response for a matching ID', () => {
  assert.deepEqual(getRecord(' A-1 ', [{ id: 'a-1' }]), {
    status: 200,
    body: { record_id: 'a-1' }
  })
})

test('returns not found for a missing record', () => {
  assert.deepEqual(getRecord('missing', [{ id: 'a-1' }]), {
    status: 404,
    body: { error: 'not_found' }
  })
})
