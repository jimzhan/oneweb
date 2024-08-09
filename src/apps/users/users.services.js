import db from '../../db/index.js'
import { User } from '../auth/auth.models.js'
// ----------------------------------------
// fine grained RBAC/ABAC here.
// ----------------------------------------
const columns = [
  'id', 'username', 'createdAt', 'updatedAt'
]

export const create = async (data) => {
  const user = await User.query().insert(data)
  delete user.password
  return user
}

export const find = async (params = {}) => {
  const query = User.query().select(...columns).orderBy('id')
  const cursor = await db.paginate(query, params)
  return cursor
}

export const get = async (id) => {
  const user = await User.query().select(...columns).findById(id)
  return user
}

export const update = async (id, data) => {
  // `patchAndFetchById` will ignore `select` option.
  const user = await User.query().patchAndFetchById(id, data)
  delete user.password
  return user
}

export const remove = async (id) => {
  const rows = await User.query().findById(id).delete()
  return rows === 1
}
