import Boom from '@hapi/boom'
import status from 'http-status'
import * as UserService from './users.services.js'

export const create = async (request, h) => {
  const data = request.payload
  const user = await UserService.create(data)
  return h.response(user).code(status.CREATED)
}

export const find = async (request, h) => {
  const query = request.params
  const users = await UserService.find(query)
  return h.response(users).code(status.OK)
}

export const get = async (request, h) => {
  const id = request.params.id
  const user = await UserService.get(id)
  if (!user) {
    throw Boom.notFound()
  }
  return h.response(user).code(status.OK)
}

export const update = async (request, h) => {

}

export const remove = async (request, h) => {

}
