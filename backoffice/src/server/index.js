import exiting from 'exiting'
import glue from '@hapi/glue'
import manifest from './manifest.js'
import { fsx } from '../core/index.js'

const root = fsx.dirname(import.meta)

export const compose = async () => await glue.compose(manifest, { relativeTo: root })

export const start = async () => {
  const server = await compose()
  const manager = exiting.createManager(server)

  await manager.start()
  await server.start()

  return server
}
