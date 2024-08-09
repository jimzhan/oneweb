import knex from 'knex'
import Key from './key.js'
import config from 'config'

const db = knex(config.db)

Object.defineProperties(db, {
  Key: {
    writable: false,
    enumerable: false,
    /**
     * Generate a new primary key using `bson`.
     * @return 24-bit Object Id in string.
     */
    value: Key
  },

  paginate: {
    writable: false,
    enumerable: false,
    /**
     * Paginate db records via cursor (`objection-cursor` required).
     * @param {Object} query - `Objection.query()` instance.
     * @param {Object} params - http request with paging request. Available options:
     *  - `prev` - encoded cursor to prev page.
     *  - `next` - encoded cursor to next page.
     *  - `size` - number of records per page.
     * ----------------------------------------------------------------------
     * *NOTE* - Strict ordering is required (SUGGESTION orderBy('id') at least),
     * otherwise `Cannot read property 'map' of undefined` will be thrown.
     * Pagination cursor with the following structure:
     *  - `results` - array of records.
     *  - `pageInfo` - object with `next` and `prev` cursors.
     *    - `next` - Base64 encoded cursor to next page.
     *    - `previous` - Base64 encoded cursor to previous page.
     * @return {Object} standard JSON response with `data` and `links`.
     */
    value: async (query, params = {}) => {
      query.limit(params?.size || 20)
      const cursor = params?.next
        ? await query.cursorPage(params.next)
        : (params?.prev ? await query.previousCursorPage(params.prev) : await query.cursorPage())
      return {
        data: cursor.results,
        links: {
          next: cursor.pageInfo.next,
          prev: cursor.pageInfo.previous
        }
      }
    }
  }
})

export default db
