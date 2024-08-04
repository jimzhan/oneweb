import { expect, test } from 'vitest'
import pkg from './pkg.js'

test('should dynamically get the package.json', () => {
  expect(pkg).toBeTruthy()
  expect(pkg.type).toBe('module')
})
