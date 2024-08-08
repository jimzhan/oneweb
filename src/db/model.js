import knex from './knex.js'
import { Model as Base } from 'objection'

Base.knex(knex)

class Model extends Base {
  async $beforeInsert(context) {
    await super.$beforeInsert(context)
    this.id = this.id || knex.Key()
  }
}

export default Model
