import config from 'config'
import cache from './cache.js'

export default {
  server: Object.assign(config.server, { cache }),
  register: {
    plugins: [
      { plugin: './apps/auth' }
    ]
  }
}
