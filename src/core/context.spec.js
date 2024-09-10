import { describe, expect, it } from 'vitest'
import ctx from './context.js'

describe('context.js', () => {
  it('should get nth', () => {
    expect(ctx.getStore()).toBeUndefined()
  })
})
