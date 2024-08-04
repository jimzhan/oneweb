import { describe, expect, it } from 'vitest'
import * as fsx from './fsx.js'

describe('fsx.js', () => {
  it('should dynamically get the filename', () => {
    expect(fsx.filename(import.meta).endsWith('fsx.spec.js')).toBe(true)
  })

  it('should dynamically get the dir names', async () => {
    expect(fsx.join(import.meta).endsWith('core')).toBe(true)
    expect(fsx.join(import.meta, '..').endsWith('src')).toBe(true)
  })
})
