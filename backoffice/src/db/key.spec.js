import { ObjectId } from 'bson'
import { expect, test } from 'vitest'
import Key from './key.js'

test('db.Key()', () => {
  const id = Key()
  expect(ObjectId.isValid(id)).toBeTruthy()
})
