import { beforeEach, afterEach, describe, expect, it } from 'vitest'
import IORedisMock from 'ioredis-mock'

describe('cache', () => {
  let env

  beforeEach(() => {
    env = process.env.NODE_ENV
  })

  afterEach(() => {
    process.env.NODE_ENV = env
    delete require.cache[require.resolve('./cache.js')]
  })

  it('should setup mock Redis server for test', async () => {
    const { default: cache } = await import('./cache.js')
    if (process.env.NODE_ENV === 'test') {
      expect(cache.provider.options.client).toBeDefined()
      expect(cache.provider.options.client).toBeInstanceOf(IORedisMock)
    }
  })
})
