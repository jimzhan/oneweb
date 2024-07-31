import { ObjectId } from 'bson'
import { describe, expect, it } from 'vitest'
import db, { Key } from './db.js'

it('generate a unique id for db record', () => {
  const id = Key()
  expect(ObjectId.isValid(id)).toBeTruthy()
})

describe('db', () => {
  it('should connect to db', async () => {
    const result = await db.raw('select 1 + 1 as result')
    expect(result).not.toBeNull()
  })
})
