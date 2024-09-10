import { nanoid } from 'nanoid'

export const plugin = {
  name: 'tracer',

  async register(server, options) {
    const {
      header = 'X-Trace-Id',
      idGenerator = nanoid
    } = options

    server.ext('onRequest', (request, h) => {
      const name = header.toLowerCase()
      const traceId = request.headers[header] || idGenerator()
      request.id = request.headers[name] = traceId
      return h.continue
    })

    server.ext('onPreResponse', async (request, h) => {
      const traceId = request.id
      if (request.response.output) {
        request.response.output.headers[header] = traceId
      } else {
        request.response.header(header, traceId)
      }
      return h.continue
    })
  }
}
