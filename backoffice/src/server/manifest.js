import config from 'config'
import yar from '@hapi/yar'
import pino from 'hapi-pino'
import cache from './cache.js'

export default {
  server: Object.assign(config.server, { cache }),
  register: {
    plugins: [
      // hapi plugins
      { plugin: yar, options: config.yar },
      { plugin: pino, options: { redact: ['req.headers.authorization'] } },
      // application routes
      { plugin: './apps/auth' }
    ]
  }
}
