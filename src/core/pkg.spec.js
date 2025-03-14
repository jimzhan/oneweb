import test from 'ava'
import pkg from './pkg.js'

test('should get the package data', (t) => {
  t.truthy(pkg)
  t.is(pkg.type, 'module')
})
