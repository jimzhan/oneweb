import config from 'config'
import yar from '@hapi/yar'
import pino from 'hapi-pino'
import IORedisMock from 'ioredis-mock'
import { Engine as Redis } from '@hapi/catbox-redis'

/* istanbul ignore next 8 */
const loadCacheAdapter = () => {
  config.server.cache.forEach(cache => {
    cache.provider.constructor = Redis
    if (process.env.NODE_ENV === 'test') {
      cache.provider.options.client = new IORedisMock()
    }
  })
  return config.server
}

export default {
  server: loadCacheAdapter(),
  register: {
    plugins: [
      // hapi plugins
      { plugin: yar, options: config.yar },
      { plugin: pino, options: { redact: ['req.headers.authorization'] } },
      { plugin: './server/plugins/i18n' },
      { plugin: './server/plugins/swagger' },
      // application routes
      { plugin: './apps/auth', routes: { prefix: config.api.prefix } }
    ]
  }
}
