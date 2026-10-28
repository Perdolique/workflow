import assert from 'node:assert/strict'
import test from 'node:test'
import { apiUsageTotal } from '../src/api-usage.js'

const rows = [
  {
    environment: 'test',
    repository: 101,
    feature: 'actions',
    calls: 3
  },
  {
    environment: 'test',
    repository: 101,
    feature: 'inventory',
    calls: 5
  },
  {
    environment: 'test',
    repository: 102,
    feature: 'actions',
    calls: 7
  },
  {
    environment: 'production',
    repository: 101,
    feature: 'actions',
    calls: 100
  }
]

test('totals all usage in the requested environment', () => {
  assert.equal(apiUsageTotal(rows, { environment: 'test' }), 15)
})

test('filters usage by repository', () => {
  assert.equal(apiUsageTotal(rows, {
    environment: 'test',
    repository: 101
  }), 8)
})

test('filters usage by feature', () => {
  assert.equal(apiUsageTotal(rows, {
    environment: 'test',
    feature: 'actions'
  }), 10)
})
