import Boom from '@hapi/boom'
import * as api from './events.api.js'
// events routes here.
// ----------------------------------------------------------------------
export default {
  name: 'events',

  async register(server) {
    server.route([
      {
        method: 'POST',
        path: '/events',
        options: {
          auth: false,
          tags: ['api'],
          handler: api.pub
        }
      },
      {
        method: 'GET',
        path: '/events',
        options: {
          auth: false,
          tags: ['api'],
          handler: api.sub
        }
      }
    ])
  }
}
