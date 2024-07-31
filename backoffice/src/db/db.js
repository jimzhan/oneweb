import Knex from 'knex'
import config from 'config'
import { ObjectId } from 'bson'
import assert from 'node:assert'

const db = Knex(config.db)

export default db

export const Key = () => new ObjectId().toHexString()

const ensureId = (id) => assert(ObjectId.isValid(id), 'id is not valid')

export const insert = async (table, data = {}, tx = null) => {
  const id = Key()
  const Q = tx ? db(table).transacting(tx) : db(table)
  return await Q.insert(Object.assign({}, data, { id }))
}

export const get = async (table, id, tx = null) => {
  ensureId(id)
  const Q = tx ? db(table).transacting(tx) : db(table)
  return await Q.where({ id }).first()
}

export const update = async (table, id, data = {}, tx = null) => {
  ensureId(id)
  const Q = tx ? db(table).transacting(tx) : db(table)
  return await Q.where({ id }).first().update(data)
}

export const remove = async (table, id, tx = null) => {
  ensureId(id)
  const Q = tx ? db(table).transacting(tx) : db(table)
  return await Q.where({ id }).first().del()
}
