import * as v from './apps.v.js'
import { Key } from '../db/index.js'
import { describe, expect, test } from 'vitest'

describe('apps validators', () => {
  test('resource id should match ObjectId format', () => {
    const data = { id: Key() }
    const { error, value } = v.id.validate(data)
    expect(error).toBeFalsy()
    expect(value).toEqual(data)
  })
})
