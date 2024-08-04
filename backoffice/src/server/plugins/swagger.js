import inert from '@hapi/inert'
import vision from '@hapi/vision'
import swagger from 'hapi-swagger'
import { pkg } from '../../core/index.js'

const version = pkg.version

export const plugin = {
  name: 'swagger',

  async register(server) {
    await server.register([
      inert,
      vision,
      {
        plugin: swagger,
        options: {
          documentationPath: '/docs',
          info: {
            version,
            title: 'OneWeb Platform API Docs'
          }
        }
      }
    ])
  }
}
