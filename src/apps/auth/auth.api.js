import Boom from '@hapi/boom'
import status from 'http-status'
import tracer from 'cls-rtracer'
import * as AuthService from './auth.services.js'

export const login = async (request, h) => {
  const { username, password } = request.payload

  const login = await AuthService.authenticate(username, password)
  if (!login.authenticated) {
    throw Boom.unauthorized()
  }

  request.log(`[auth.api]<traceId: ${tracer.id()}>`)

  request.yar.set('user', login.user)
  return h.response({ data: login.user, message: request.t('home') }).code(status.CREATED)
}

export const logout = (request, h) => {
  request.yar.clear('user')
  return h.response().code(status.NO_CONTENT)
}
