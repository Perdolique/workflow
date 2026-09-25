import assert from 'node:assert/strict'
import test from 'node:test'
import { normalizeId } from '../src/normalize-id.js'

test('normalizes external IDs', () => {
  assert.equal(normalizeId(' A-1 '), 'a-1')
})

test('trims whitespace', () => {
  assert.equal(normalizeId(' A-1 '), 'a-1')
})

test('uses the expected function name', () => {
  assert.equal(normalizeId.name, 'normalizeId')
})
