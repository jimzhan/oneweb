import { Key } from './db.js'
import Table from './table.js'
import { afterAll, describe, expect, it } from 'vitest'

describe('Table', () => {
  const table = new Table('users')

  afterAll(async () => {
    await table.where('username', 'like', '%@test.com').del()
  })

  it('should insert a new record', async () => {
    const results = await table.insert({ username: `${Key()}@test.com`, password: 'password' }).returning(['id'])
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
    const ids = await table.insert(values).returning(['id'])
    expect(ids.length).toBe(2)
    expect(ids.every(item => Object.hasOwn(item, 'id'))).toBeTruthy()
  })
})
