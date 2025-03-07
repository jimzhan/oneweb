import glue from '@hapi/glue'
import manifest from './manifest.js'
import { fsx } from '../core/index.js'

const root = fsx.join(import.meta, '..')

const server = await glue.compose(manifest, { relativeTo: root })

export default server
