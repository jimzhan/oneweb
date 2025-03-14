import test from 'ava'
import server from './server.js'

test('should compose a new server', async (t) => {
  const response = await server.inject({
    url: '/notfound',
    method: 'GET',
    payload: { foo: 'bar' }
  })
  t.is(response.statusCode, 404)
})
