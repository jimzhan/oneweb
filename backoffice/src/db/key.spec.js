import Key from './key.js'
import { ObjectId } from 'bson'
import { expect, test } from 'vitest'

test('generate a unique id for db record', () => {
  const id = Key()
  expect(ObjectId.isValid(id)).toBeTruthy()
})
