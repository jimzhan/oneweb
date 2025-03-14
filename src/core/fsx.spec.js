import test from 'ava'
import * as fsx from './fsx.js'

test('should get current filename', (t) => {
  t.true(fsx.filename(import.meta).endsWith('fsx.spec.js'))
})


test('should join path segments with current module file', (t) => {
  t.true(fsx.join(import.meta).endsWith('core'))
  t.true(fsx.join(import.meta, '..').endsWith('src'))
})
