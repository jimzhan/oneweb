import { ObjectId } from 'bson'
import { User } from './auth.models.js'
import * as db from '../../db/index.js'
import { afterAll, describe, expect, it } from 'vitest'

const suffix = '@test.com'

describe('Auth.User', () => {
  afterAll(async () => {
    await User.query().whereLike('username', `@${suffix}`).delete()
  })

  it('should create a new user', async () => {
    const data = { username: `${db.Key()}${suffix}`, password: 'password' }
    const user = await User.query().insert(data)
    expect(ObjectId.isValid(user.id)).toBeTruthy()
  })

  it('should find user with the given username', async () => {
    const payload = { username: `notexist${suffix}` }
    const user = await User.query().findOne(payload)
    expect(user).toBeUndefined()
  })
})
