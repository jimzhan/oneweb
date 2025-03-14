import test from 'ava'
import pkg from './pkg.js'

test('pkg.js for package data', (t) => {
  t.truthy(pkg)
  t.is(pkg.type, 'module')
})
