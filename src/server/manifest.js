import settings from 'settings'

export default {
  server: settings.server,
  register: {
    plugins: [
      // hapi plugins
      // { plugin: pino, options: { redact: ['req.headers.authorization'] } },
      { plugin: './server/plugins/i18n' },
      { plugin: './server/plugins/swagger' },
      { plugin: './server/plugins/tracer' }
      // application routes
    ]
  }
}
