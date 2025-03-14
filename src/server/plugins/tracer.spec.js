import test from 'ava'
import api from '../api.js'

test('should GET Trace Id', async (t) => {
  const response = await api.get('/')
  t.truthy(response.headers['x-trace-id'])
})
