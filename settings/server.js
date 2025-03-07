// --------------------------------------------------------------------------------
//  Hapi Server Settings
// --------------------------------------------------------------------------------
export default {
  host: '0.0.0.0',
  port: 8000,
  router: {
    isCaseSensitive: true,
    stripTrailingSlash: false
  },
  routes: {
    cors: {
      origin: ['*'],
      credentials: false
    },
    security: true
  },
  state: {
    strictHeader: true,
    ignoreErrors: false,
    isSecure: false,
    isHttpOnly: true,
    isSameSite: 'Lax',
    encoding: 'iron'
  }
}
