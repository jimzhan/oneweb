import settings from '@settings'

export default {
  server: settings.server,
  register: {
    plugins: [
      // hapi plugins
      // { plugin: pino, options: { redact: ['req.headers.authorization'] } },
      // application routes
    ]
  }
}
