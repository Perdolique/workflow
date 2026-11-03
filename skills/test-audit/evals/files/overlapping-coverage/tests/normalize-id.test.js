import assert from 'node:assert/strict'
import test from 'node:test'
import { normalizeId } from '../src/normalize-id.js'

for (const [input, expected] of [
  [' A-1 ', 'a-1'],
  [' B-2 ', 'b-2']
]) {
  test(`normalizes external ID ${input}`, () => {
    assert.equal(normalizeId(input), expected)
  })
}

test('returns null for a whitespace-only ID', () => {
  assert.equal(normalizeId('   '), null)
})
