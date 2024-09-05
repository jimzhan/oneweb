import db from './db.js'
import key from './key.js'
import { Model as Base } from 'objection'

Base.knex(db)

class Model extends Base {
  async $beforeInsert(context) {
    await super.$beforeInsert(context)
    this.id = this.id || key()
  }
}

export default Model
