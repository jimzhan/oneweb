import IORedisMock from 'ioredis-mock'
import { Engine as Redis } from '@hapi/catbox-redis'
// --------------------------------------------------------------------------------
//  Hapi Server Settings
// --------------------------------------------------------------------------------
export default {
  host: '0.0.0.0',
  port: 8000,
  router: {
    isCaseSensitive: true,
    stripTrailingSlash: false
  },
  routes: {
    cors: {
      origin: ['*'],
      credentials: false
    },
    security: true
  },
  cache: [
    {
      name: 'RedisCache',
      provider: {
        constructor: Redis,
        options: {
          partition: 'cache',
          client: {
            $filter: 'env',
            test: new IORedisMock(),
            $default: undefined
          }
        }
      }
    },
    {
      name: 'RedisSession',
      provider: {
        constructor: Redis,
        options: {
          partition: 'session',
          client: {
            $filter: 'env',
            test: new IORedisMock(),
            $default: undefined
          }
        }
      }
    }
  ],
  state: {
    strictHeader: true,
    ignoreErrors: false,
    isSecure: false,
    isHttpOnly: true,
    isSameSite: 'Lax',
    encoding: 'iron'
  }
}
