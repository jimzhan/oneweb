import Key from './key.js'
import knex from './knex.js'
import { Model as Base } from 'objection'

class Model extends Base {
  async $beforeInsert(context) {
    await super.$beforeInsert(context)
    this.id = this.id || Key()
  }
}

Model.knex(knex)

export default Model
