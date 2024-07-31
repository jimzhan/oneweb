import Boom from '@hapi/boom'
import * as api from './auth.api.js'
import * as v from './auth.schema.js'
// auth routes here.
// ----------------------------------------------------------------------
//  RESTful style user login/logout on top of session cookie.
// ----------------------------------------------------------------------
export default {
  name: 'auth',

  async register(server) {
    server.route([
      {
        method: 'POST',
        path: '/login',
        options: {
          auth: false,
          tags: ['api'],
          validate: { payload: v.login, failAction: () => Boom.badRequest() },
          handler: api.login
        }
      },
      {
        method: 'POST',
        path: '/logout',
        options: {
          auth: false,
          tags: ['api'],
          handler: api.logout
        }
      }
    ])
  }
}
