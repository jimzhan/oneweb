const path = require('node:path')
// ------------------------------------------------------------
// Default settings shared across different environments.
// ------------------------------------------------------------
module.exports = {
  api: {
    prefix: '/api'
  },
  basedir: path.join(__dirname, '..'),
  stage: 'development'
}
