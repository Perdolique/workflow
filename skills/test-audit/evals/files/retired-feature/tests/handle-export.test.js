import assert from 'node:assert/strict'
import test from 'node:test'
import { handleExport } from '../src/handle-export.js'

test('exports the public JSON report', () => {
  const result = handleExport([{ id: 'a' }, { id: 'b' }])

  assert.equal(result.contentType, 'application/json')
  assert.deepEqual(JSON.parse(result.body), { record_count: 2 })
})
