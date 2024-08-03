import config from 'config'
import IORedisMock from 'ioredis-mock'
import { Engine as Redis } from '@hapi/catbox-redis'
import { Engine as Memory } from '@hapi/catbox-memory'

/* istanbul ignore next 22 */
const getCacheAdapter = () => {
  if (config.cache.adapter.toLowerCase() === 'redis') {
    return {
      name: config.cache.name,
      provider: {
        constructor: Redis,
        options: process.env.NODE_ENV === 'test'
          ? { ...config.cache.options, client: new IORedisMock() }
          : config.cache.options
      }
    }
  } else {
    return {
      name: config.cache.name,
      provider: {
        constructor: Memory,
        options: config.cache?.options
      }
    }
  }
}

export default getCacheAdapter()
