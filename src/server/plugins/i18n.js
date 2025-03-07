import { i18n, pkg } from '../../core/index.js'

export const plugin = {
  name: 'i18next',
  version: pkg.version,
  register: async function(server, _) {
    server.ext('onPreHandler', (request, h) => {
      const t = i18n.getFixedT(request.headers['accept-language'])
      request.i18n = i18n
      request.t = t
      return h.continue
    })
  }
}
