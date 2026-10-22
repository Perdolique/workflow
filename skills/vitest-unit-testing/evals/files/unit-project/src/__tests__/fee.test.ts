import { expect, test, vi } from 'vitest'
import { extraGuestFee } from '../fee'

vi.mock(import('../guests'), () => ({
  countSavedAdults: vi.fn(() => 2)
}))

test('charges only for saved adult ages', () => {
  expect(extraGuestFee(1, 1800)).toBe(1800)
})
