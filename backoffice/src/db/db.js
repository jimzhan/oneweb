import Knex from 'knex'
import config from 'config'
import { ObjectId } from 'bson'

const db = Knex(config.db)

export default db

export const Key = () => new ObjectId().toHexString()

export const insert = async (table, data = {}) => {
  const id = Key()
  return await db(table).insert(Object.assign({}, data, { id }))
}
