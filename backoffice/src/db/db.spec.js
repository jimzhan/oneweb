import { ObjectId } from 'bson'
import { describe, afterAll, expect, it } from 'vitest'
import db, { Key } from './db.js'

describe('db', () => {
  const users = db('users')

  afterAll(async () => {
    await users.where('username', 'like', '%@test.com').del()
  })

  it('generate a unique id for db record', () => {
    const id = Key()
    expect(ObjectId.isValid(id)).toBeTruthy()
  })

  it('should connect to db', async () => {
    const result = await db.raw('select 1 + 1 as result')
    expect(result).not.toBeNull()
  })

  it('should insert a new record', async () => {
    const results = await users.insert({ id: Key(), username: `${Key()}@test.com`, password: 'password' }).returning(['id'])
    expect(results).not.toBeNull()
    expect(Array.isArray(results)).toBeTruthy()
    expect(results.length).toBe(1)
    expect(results[0].id).not.toBeNull()
  })

  it('should batch insert records', async () => {
    const values = [
      { username: `${Key()}@test.com`, password: 'password' },
      { username: `${Key()}@test.com`, password: 'password' }
    ]
    const ids = await users.insert(values.map(item => Object.assign(item, { id: Key() }))).returning(['id'])
    expect(ids.length).toBe(2)
    expect(ids.every(item => Object.hasOwn(item, 'id'))).toBeTruthy()
  })
})
