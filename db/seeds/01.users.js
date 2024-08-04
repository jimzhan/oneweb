import { encrypt } from '../../src/core/secret.js'

const tableName = 'users'
const password = await encrypt('password')

export const seed = async (knex) => {
  // **NOTE** MSSQL does not support `onConflict` , use `knex.raw` instead.
  await knex(tableName).insert([
    { id: '66aef3aa171c65695403843d', username: 'dev@example.com', password }
  ]).onConflict('username').ignore()
}
