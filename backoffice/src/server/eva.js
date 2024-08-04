import config from 'config'
import urljoin from 'url-join'
import assert from 'node:assert'
import { compose } from './server.js'

const api = await compose()
// ----------------------------------------------------------------------------------------------------
// Eva is abbreviation for `Evaluation`, serves as test helper for test cases (`server.inflect`).
// ----------------------------------------------------------------------------------------------------
class Eva {
  constructor() {
    this.prefix = config.api.prefix
    // Create a proxy to trap method calls
    return new Proxy(this, {
      get: (_, prop) => {
        // Handle methods dynamically based on HTTP methods
        const methods = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options']
        const method = prop.toLowerCase()
        assert(methods.includes(method), `Method ${method} is not supported`)
        return (...args) => this.ask(method, ...args)
      }
    })
  }

  /**
   * @private
   */
  async ask(method, path, options = {}) {
    options = Object.assign({}, options, {
      method,
      url: urljoin(this.prefix, path)
    })
    return await api.inject(options)
  }
}

export default new Eva()
