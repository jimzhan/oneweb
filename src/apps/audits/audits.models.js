import { Model } from '../../db/index.js'

export class Audit extends Model {
  static get tableName() {
    return 'audits'
  }

  static get jsonAttributes() {
    return ['changes', 'metadata']
  }
}
