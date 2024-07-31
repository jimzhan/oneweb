import * as schema from './auth.schema.js'
import { describe, expect, it } from 'vitest'

describe('Auth Schema', () => {
  it('should pass & return a valid login', async () => {
    const payload = { username: 'test', password: 'test' }
    const { error, value } = schema.login.validate(payload)
    expect(error).toBeTruthy()
    expect(value).toEqual(payload)
  })

  it('should fail an invalid login', async () => {
    const payload = { username: 'test@test.com', password: 'test#fdfd67&' }
    const { error, value } = schema.login.validate(payload)
    expect(error).toBeUndefined()
    expect(value).toEqual(payload)
  })
})
