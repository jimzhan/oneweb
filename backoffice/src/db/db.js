import knex from 'knex'
import config from 'config'
import { ObjectId } from 'bson'

export default knex(config.db)

export const Key = () => new ObjectId().toHexString()
