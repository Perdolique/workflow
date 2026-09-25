import assert from 'node:assert/strict'
import test from 'node:test'
import { serializeOrder } from '../src/serialize-order.js'

test('uses the partner wire keys', () => {
  const result = serializeOrder({
    id: 'order-7',
    totalCents: 500
  })

  assert.deepEqual(JSON.parse(result), {
    order_id: 'order-7',
    total_cents: 500
  })
})
