import { Record } from 'immutable'
import { Store } from '@hapipal/confidence'
import server from './server.js'
// ----------------------------------------------------------------------
//  Environment based filters:
//    - `process.env.NODE_ENV`: development | test | production
//    - `process.env.STAGE`: ci | dev | sit | uat | prod.
// ----------------------------------------------------------------------
const { env } = process

const internals = {
  criteria: {
    env: env.NODE_ENV,
    stage: env.STAGE
  }
}

internals.settings = {
  $meta: 'application settings file',
  api: {
    prefix: '/api'
  },
  server
}

internals.store = new Store(internals.settings)
export default Record(internals.store.get('/', internals.criteria))()
