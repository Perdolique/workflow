import assert from 'node:assert/strict'
import test from 'node:test'
import { deleteRecord } from '../src/delete-record.js'

test('deletes a record owned by the actor', () => {
  const deleted = []
  const store = { delete: id => deleted.push(id) }

  deleteRecord({ orgId: 'team-a' }, {
    id: 'record-1',
    orgId: 'team-a'
  }, store)

  assert.deepEqual(deleted, ['record-1'])
})
