import {
  afterEach,
  beforeEach,
  describe,
  it,
  expect
} from 'vitest'

import { User } from './auth.models.js'
import { Key } from '../../db/index.js'
import { encrypt } from '../../core/secret.js'
import * as AuthService from './auth.services.js'

describe('auth.service.spec.js#authenticate()', () => {
  const username = `${Key()}@test.com`
  const password = 'password'

  beforeEach(async () => {
    await User.query().insert({ username, password: await encrypt(password) })
  })

  afterEach(async () => {
    await User.query().findOne({ username }).delete()
  })

  it('authenticate()', async () => {
    const login = await AuthService.authenticate(username, password)
    expect(login.user).toBeTruthy()
    expect(login.user.username).toBe(username)
    expect(login.user.password).toBeUndefined()
  })

  it('authenticate() with wrong username', async () => {
    const login = await AuthService.authenticate('wrong-user-name', password)
    expect(login.user).toBeNull()
  })

  it('authenticate() with wrong password', async () => {
    const login = await AuthService.authenticate(username, 'wrongpassword')
    expect(login.user).not.toBeNull()
    expect(login.authenticated).toBeFalsy()
  })
})
