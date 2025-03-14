import test from 'ava'
import * as fsx from './fsx.js'

test('fsx.js#filename', (t) => {
  t.true(fsx.filename(import.meta).endsWith('fsx.spec.js'))
})


test('fsx.js#join', (t) => {
  t.true(fsx.join(import.meta).endsWith('core'))
  t.true(fsx.join(import.meta, '..').endsWith('src'))
})
