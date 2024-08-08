import { Cursor, Model } from '../../db/index.js'
import { regex, secret } from '../../core/index.js'

export class User extends Cursor(Model) {
  static get tableName() {
    return 'users'
  }

  async $beforeInsert(context) {
    await super.$beforeInsert(context)
    this.username = this?.username?.toLowerCase()
    if (this.password && !regex.argon2.test(this.password)) {
      this.password = await secret.encrypt(this.password)
    }
  }
}
