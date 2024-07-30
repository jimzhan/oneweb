import config from 'config'

export default {
  server: config.server,
  register: {
    plugins: [
      { plugin: './apps/auth' }
    ]
  }
}
