import { compose } from './server.js'

const request = async (path, method, options = {}) => {
  const api = await compose()
  options = Object.assign({}, options, {
    method,
    url: path
  })
  const response = await api.inject(options)
  return response
}

export const get = async (path, options) => request(path, 'GET', options)

export const post = async (path, options) => request(path, 'POST', options)

export const put = async (path, options) => request(path, 'PUT', options)

export const patch = async (path, options) => request(path, 'PATCH', options)

export const del = async (path, options) => request(path, 'DELETE', options)
