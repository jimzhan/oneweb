import {
  afterEach,
  beforeEach,
  describe,
  it,
  expect
} from 'vitest'
import { Key } from '../../db/index.js'
import { User } from '../auth/auth.models.js'
import { encrypt } from '../../core/secret.js'
import * as UserService from './users.services.js'

describe('users.services', () => {
  const id = Key()
  const username = `${id}@test.com`
  const password = 'password'

  beforeEach(async () => {
    await User.query().insert({ username, password: await encrypt(password) })
  })

  afterEach(async () => {
    await User.query().whereRaw("username LIKE '%@test.com'").delete()
  })

  it('create a new user & return it back without password', async () => {
    const user = await UserService.create({ username: 'test@test.com', password: 'randompwd' })
    expect(user).toEqual({
      id: user.id,
      username: user.username
    })
    expect(user.password).toBeUndefined()
  })

  it('paginate list of user with cursor', async () => {
    const values = []
    Array.from({ length: 50 }).forEach(() => {
      values.push({ username: `${Key()}@test.com`, password: Key() })
    })
    await User.query().insert(values)

    // const query = { next: id }
    const r1 = await UserService.find()
    expect(r1.data).toHaveLength(20)
    expect(r1.links).toBeTruthy()
    expect(r1.links.next).toBeTruthy()
    expect(r1.links.prev).toBeTruthy()

    const r2 = await UserService.find({ next: r1.links.next })
    expect(r2.data).toHaveLength(20)
    expect(r2.links).toBeTruthy()
    expect(r2.links.next).toBeTruthy()
    expect(r2.links.prev).toBeTruthy()

    const r3 = await UserService.find({ next: r2.links.next })
    expect(r3.data.length).toBeGreaterThan(10)
  })
})
