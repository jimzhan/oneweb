import { describe, expect, it } from 'vitest'

import * as fsx from './fsx.js'

describe('fsx.js', () => {
  it('should dynamically get the filename', () => {
    expect(fsx.filename(import.meta).endsWith('fsx.spec.js')).toBe(true)
  })

  it('should dynamically get the dirname', async () => {
    expect(fsx.dirname(import.meta).endsWith('core')).toBe(true)
  })
})
