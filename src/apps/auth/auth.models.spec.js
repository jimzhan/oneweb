import { ObjectId } from 'bson'
import { User } from './auth.models.js'
import * as db from '../../db/index.js'
import { regex } from '../../core/index.js'
import { afterAll, describe, expect, it } from 'vitest'

const suffix = '@test.com'

describe('Auth.User', () => {
  const username = `${db.Key()}@test.com`

  afterAll(async () => {
    await User.query().findOne({ username }).delete()
  })

  it('should create a new user', async () => {
    const data = { username, password: 'password' }
    const user = await User.query().insert(data)
    expect(ObjectId.isValid(user.id)).toBeTruthy()
    expect(regex.argon2.test(user.password)).toBe(true)
  })

  it('should find user with the given username', async () => {
    const payload = { username: `notexist${suffix}` }
    const user = await User.query().findOne(payload)
    expect(user).toBeUndefined()
  })
})
