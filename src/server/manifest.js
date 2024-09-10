import config from 'config'
import yar from '@hapi/yar'
import Log from '@hapi/log'

const prefix = config.api.prefix
const logger = new Log.Pinologger(process.stdout)

export default {
  server: config.server,
  register: {
    plugins: [
      // hapi plugins
      { plugin: yar, options: config.yar },
      // { plugin: pino, options: { redact: ['req.headers.authorization'] } },
      { plugin: Log, options: { logger, level: 'info' } },
      { plugin: './server/plugins/i18n' },
      { plugin: './server/plugins/swagger' },
      { plugin: './server/plugins/tracer' },
      // application routes
      { plugin: './apps/auth', routes: { prefix } },
      { plugin: './apps/users', routes: { prefix } }
    ]
  }
}
