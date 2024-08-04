import { nanoid } from 'nanoid'
import { describe, expect, it } from 'vitest'
import * as regex from './regex.js'
import * as secret from './secret.js'

describe('Regular Expression Suite', () => {
  it('should match valid session keys', () => {
    expect(regex.session.test(nanoid())).toBe(false)
    expect(regex.session.test(nanoid(64))).toBe(true)
    expect(regex.session.test(nanoid(88))).toBe(true)
    expect(regex.session.test(nanoid(128))).toBe(true)
    expect(regex.session.test(nanoid(256))).toBe(false)
  })

  it('should match valid argon2 hashes', async () => {
    expect(regex.argon2.test('raw.password.wont.work')).toBe(false)
    expect(regex.argon2.test(await secret.encrypt('password'))).toBe(true)
  })
})
