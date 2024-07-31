import db, { Key } from './db.js'

export default class Table {
  constructor(name) {
    this.table = db(name)
  }

  insert(data) {
    const values = Array.isArray(data)
      ? data.map(item => Object.assign(item, { id: Key() }))
      : Object.assign(data, { id: Key() })
    return this.table.insert(values)
  }

  where(column, operator, value) {
    return this.table.where(column, operator, value)
  }
}
