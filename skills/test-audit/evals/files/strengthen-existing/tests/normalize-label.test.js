import assert from 'node:assert/strict'
import test from 'node:test'
import { normalizeLabel } from '../src/normalize-label.js'

test('normalizes a search label', () => {
  assert.equal(normalizeLabel(' item '), 'item')
})

test('returns an empty label for whitespace', () => {
  assert.equal(normalizeLabel('   '), '')
})
