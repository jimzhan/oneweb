import glue from '@hapi/glue'
import manifest from './manifest.js'
import { fsx } from '../core/index.js'

// @TODO `exiting`.

const root = fsx.dirname(import.meta, '..')

export const compose = async () => await glue.compose(manifest, { relativeTo: root })

export const start = async () => {
  const server = await compose()
  server.start()
  return server
}
