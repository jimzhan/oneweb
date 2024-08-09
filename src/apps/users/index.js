import Boom from '@hapi/boom'
import * as v from './users.v.js'
import * as api from './users.api.js'
// ----------------------------------------------------------------------
//  RESTful style users' calls.
// ----------------------------------------------------------------------
const register = async (server) => {
  server.route([
    { method: 'POST', path: '/users', options: { tags: ['api'], handler: api.create } },
    {
      method: 'GET',
      path: '/users',
      options: {
        tags: ['api'],
        validate: { query: v.pagination },
        handler: api.find
      }
    },
    {
      method: 'GET',
      path: '/users/{id}',
      options: {
        tags: ['api'],
        validate: { params: v.id, failAction: () => Boom.notFound() },
        handler: api.get
      }
    },
    {
      method: 'PATCH',
      path: '/users/{id}',
      options: {
        tags: ['api'],
        validate: { params: v.id, failAction: () => Boom.notFound() },
        handler: api.update
      }
    },
    {
      method: 'DELETE',
      path: '/users/{id}',
      options: {
        tags: ['api'],
        validate: { params: v.id, failAction: () => Boom.notFound() },
        handler: api.remove
      }
    }
  ])
}

export default {
  name: 'users',
  register
}
