import config from 'config'
import { Engine as Redis } from '@hapi/catbox-redis'
import { Engine as Memory } from '@hapi/catbox-memory'

const getCacheAdapter = () => {
  if (config.cache.adapter.toLowerCase() === 'redis') {
    return {
      name: config.cache.name,
      provider: {
        constructor: Redis,
        options: config.cache.options
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
