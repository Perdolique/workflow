import { expect, test } from 'vitest'
import { calculateTotal } from '../total'

test('adds the price of every item', () => {
  expect(calculateTotal(1500, 2, 0)).toBe(3000)
})
