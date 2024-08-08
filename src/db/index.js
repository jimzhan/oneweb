import CursorMixin from 'objection-cursor'

export { default as Key } from './key.js'
export { default as knex } from './knex.js'
export { default as Model } from './model.js'
export const Cursor = CursorMixin({ limit: 20 })
