import * as fsx from './fsx.js'

const pkg = await import(fsx.join(import.meta, '..', '..', 'package.json'), {
  assert: { type: 'json' }
})

export default pkg.default
