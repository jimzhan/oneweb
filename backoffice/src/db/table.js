import db, { Key } from './db.js'

export default class Table {
  constructor(name) {
    this.table = db(name)
  }

  async insert(data, returning, options) {
    const values = Array.isArray(data)
      ? data.map(item => Object.assign(item, { id: Key() }))
      : Object.assign(data, { id: Key() })
    return await this.table.insert(values, returning, options)
  }

  where(column, operator, value) {
    return this.table.where(column, operator, value)
  }
}
