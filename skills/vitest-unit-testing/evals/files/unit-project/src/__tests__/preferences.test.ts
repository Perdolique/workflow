import { beforeEach, expect, test } from 'vitest'
import { readLocale } from '../preferences'

beforeEach(() => {
  window.localStorage.clear()
})

test('defaults to English', () => {
  expect(readLocale()).toBe('en')
})
