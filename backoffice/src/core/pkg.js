import path from 'node:path'
import * as fsx from './fsx.js'

const root = fsx.dirname(import.meta, '..', '..');

const pkg = await import(path.join(root, './package.json'), {
  assert: { type: 'json' }
})

export default pkg.default
