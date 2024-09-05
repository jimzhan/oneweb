import {
  afterEach,
  describe,
  it,
  expect
} from 'vitest'
import { Key } from '../../db/index.js'
import { User } from '../auth/auth.models.js'
import * as UserService from './users.services.js'

const domain = '@test.com'

describe('users.services', () => {
  afterEach(async () => {
    await User.query().whereRaw(`username LIKE '%@${domain}'`).delete()
  })

  it('create a new user & return it back without password', async () => {
    const user = await UserService.create({ username: `${Key()}${domain}`, password: 'randompwd' })
    expect(user).toEqual({
      id: user.id,
      username: user.username
    })
    expect(user.password).toBeUndefined()
  })

  /*
  it('paginate list of user with cursor', async () => {
    Array.from({ length: 50 }).forEach(async () => {
      // Batch insert is N/A on SQLite.
      await User.query().insert({ username: `${Key()}${domain}`, password: Key() })
    })

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
    expect(r3.data[0].id > r1.data[0].id).toBeTruthy()
    expect(r3.data[0].password).toBeUndefined()
  })
  */

  it('get user by id', async () => {
    const { id, username } = await User.query().insert({ username: `${Key()}${domain}`, password: Key() })
    const user = await UserService.get(id)
    expect(user).toBeTruthy()
    expect(user.id).toBe(id)
    expect(user.username).toBe(username)
    expect(user.password).toBeUndefined()
  })

  it('update user by id', async () => {
    const { id } = await User.query().insert({ username: `${Key()}${domain}`, password: Key() })
    const username = `${Key()}${domain}`
    const user = await UserService.update(id, { username })
    expect(user.username).toBe(username)
    expect(user.password).toBeUndefined()
  })

  it('delete user by id', async () => {
    const { id } = await User.query().insert({ username: `${Key()}${domain}`, password: Key() })
    const deleted = await UserService.remove(id)
    expect(deleted).toBeTruthy()
  })
})
