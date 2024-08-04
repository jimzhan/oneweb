import cookie from 'cookie'
import status from 'http-status'
import { Key } from '../src/db/index.js'
import { secret } from '../src/core/index.js'
import { User } from '../src/apps/auth/auth.models.js'
import { eva } from '../src/server/index.js'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

describe('AuthApi', async () => {
  const username = `${Key()}@test.com`
  const password = 'password'

  beforeEach(async () => {
    await User.query().insert({
      username,
      password: await secret.encrypt(password)
    })
  })

  afterEach(async () => {
    await User.query().findOne({ username }).delete()
  })

  it('should authenticate a valid user', async () => {
    const response = await eva.post('/sessions', {
      payload: { username, password }
    })
    expect(response.statusCode).toBe(status.CREATED)
    expect(response.headers).toHaveProperty('set-cookie')
    const values = cookie.parse(response.headers['set-cookie'][0])
    expect(values.sid).toBeDefined()
  })

  it('should fail to authenticate user with wrong login', async () => {
    const response = await eva.post('/sessions', {
      payload: { username: '404@test.com', password: 'password' }
    })
    expect(response.statusCode).toBe(status.UNAUTHORIZED)
  })

  it('should invalidate a logged into user session', async () => {
    const response = await eva.delete('/sessions')
    expect(response.statusCode).toBe(status.NO_CONTENT)
  })
})
