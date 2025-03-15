import test from 'ava'
import status from 'http-status'
import api from '../api.js'

test('should GET Swagger docs', async (t) => {
  const response = await api.get('/docs')
  // @FIXME
  t.is(response.statusCode, status.NOT_FOUND)
})
