import { Record } from 'immutable'
import { Store } from '@hapipal/confidence'
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
  $meta: 'application settings file'
}

internals.store = new Store(internals.settings)
export default Record(internals.store.get('/', internals.criteria))()
