import { compose } from './server.js'
// --------------------------------------------------------------------------------
// Eva is abbreviation for `Evaluation`, serves as test helper for test cases.
// --------------------------------------------------------------------------------
const ask = async (path, method, options = {}) => {
  const api = await compose()
  options = Object.assign({}, options, {
    method,
    url: path
  })
  const response = await api.inject(options)
  return response
}

export const get = async (path, options) => ask(path, 'GET', options)

export const post = async (path, options) => ask(path, 'POST', options)

export const put = async (path, options) => ask(path, 'PUT', options)

export const patch = async (path, options) => ask(path, 'PATCH', options)

export const del = async (path, options) => ask(path, 'DELETE', options)
