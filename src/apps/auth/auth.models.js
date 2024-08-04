import { Model } from '../../db/index.js'
import { regex, secret } from '../../core/index.js'

export class User extends Model {
  static get tableName() {
    return 'users'
  }

  async $beforeInsert(context) {
    await super.$beforeInsert(context)
    if (this.password && !regex.argon2.test(this.password)) {
      this.password = await secret.encrypt(this.password)
    }
  }
}
