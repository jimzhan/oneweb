import { Key } from '../../src/db/index.js'
import { encrypt } from '../../src/core/secret.js'

const tableName = 'users'
const password = await encrypt('password')

export const seed = async (knex) => {
  await knex(tableName).insert([
    { id: Key(), username: 'dev@example.com', password }
  ])
}
