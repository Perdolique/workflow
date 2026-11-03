import assert from 'node:assert/strict'
import test from 'node:test'
import { legacyXml } from '../src/legacy-xml.js'

test('exports an XML report', () => {
  assert.equal(legacyXml([{ id: 'a' }, { id: 'b' }]), '<report count="2" />')
})
