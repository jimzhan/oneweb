import * as v from './apps.v.js'
import { Key } from '../db/index.js'
import { describe, expect, it } from 'vitest'

describe('apps validators', () => {
  it('should match ObjectId format', () => {
    const data = { id: Key() }
    const { error, value } = v.id.validate(data)
    expect(error).toBeFalsy()
    expect(value).toEqual(data)
  })

  it('should reject request if both `next` and `prev` are given', () => {
    const data = { next: Key(), prev: Key() }
    const { error, value } = v.pagination.validate(data)
    expect(error).toBeTruthy()
    expect(value).toEqual(data)
  })

  it('should take next as param', () => {
    const data = { next: Key() }
    const { error, value } = v.pagination.validate(data)
    expect(error).toBeFalsy()
    expect(value).toEqual(data)
  })
})
