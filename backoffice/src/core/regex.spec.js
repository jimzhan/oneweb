import { nanoid } from 'nanoid'
import { describe, expect, it } from 'vitest'
import * as regex from './regex.js'

describe('Regular Expression Suite', () => {
  it('should match valid session keys', () => {
    expect(regex.session.test(nanoid())).toBe(false)
    expect(regex.session.test(nanoid(64))).toBe(true)
    expect(regex.session.test(nanoid(88))).toBe(true)
    expect(regex.session.test(nanoid(128))).toBe(true)
    expect(regex.session.test(nanoid(256))).toBe(false)
  })
})
