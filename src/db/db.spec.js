import db from './db.js'
import { expect, test } from 'vitest'

test('db connection', async () => {
  const result = await db.raw('select 1 + 1 as result')
  expect(result).not.toBeNull()
})
