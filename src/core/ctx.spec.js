import { describe, expect, it } from 'vitest'
import ctx from './ctx.js'

describe('ctx.js', () => {
  it('should get an empty store', () => {
    expect(ctx.store).toBeUndefined()
  })

  it('should get nth where ctx is empty', () => {
    expect(ctx.get('404')).toBeUndefined()
  })

  it('should set value for async context', () => {
    ctx.set({ abc: 'xyz' })
    expect(ctx.get('abc')).toBe('xyz')
  })

  it('should get `bar` where ctx has `foo`', () => {
    ctx.run({ foo: 'bar' }, () => {
      expect(ctx.get('foo')).toBe('bar')
    })
  })
})
