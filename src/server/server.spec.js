import config from 'config'
import { describe, expect, it } from 'vitest'
import * as server from './server.js'

describe('server', () => {
  it('should start a server', async () => {
    const instance = await server.start()
    expect(instance.info.port).toBe(config.server.port)
  })

  it('should compose a new server', async () => {
    const instance = await server.compose()
    const response = await instance.inject({
      url: '/notfound',
      method: 'GET',
      payload: { foo: 'bar' }
    })
    expect(response.statusCode).toBe(404)
  })
})
