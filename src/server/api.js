import settings from 'settings'
import urljoin from 'url-join'
import assert from 'node:assert'
import server from './server.js'

// ----------------------------------------------------------------------------------------------------
// Eva is abbreviation for `Evaluation`, serves as test helper for test cases (`server.inflect`).
// ----------------------------------------------------------------------------------------------------
class Api {
  constructor() {
    this.prefix = settings.api.prefix
    // Create a proxy to trap method calls
    return new Proxy(this, {
      get: (_, prop) => {
        // Handle methods dynamically based on HTTP methods
        const methods = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options']
        const method = prop.toLowerCase()
        assert(methods.includes(method), `Method ${method} is not supported`)
        return (...args) => this.send(method, ...args)
      }
    })
  }

  /**
   * @private
   */
  async send(method, path, options = {}) {
    options = Object.assign({}, options, {
      method,
      url: urljoin(this.prefix, path)
    })
    return await server.inject(options)
  }
}

export default new Api()
