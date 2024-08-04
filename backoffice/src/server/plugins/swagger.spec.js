import eva from '../eva.js'
import status from 'http-status'
import { expect, test } from 'vitest'

test('GET Swagger docs', async () => {
  const response = await eva.get('/docs')
  // @FIXME
  expect(response.statusCode).toBe(status.NOT_FOUND)
})
