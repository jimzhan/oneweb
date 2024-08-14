const tableName = 'audits'
/**
 * audits.id        - {string|ObjectId} business agnostic db key.
 * audits.type      - {string} Platform-width audit type constants.
 * audits.source    - {string} Buffer.from(`<table name>::<table id>`).toString('base64url').
 * audits.changes   - {Array} audits.changes capture differences ONLY. Differences are reported as one or more change records.
 * audits.metadata  - {object} Keep other metadata about the change.
 * audits.changedAt - {datetime} session expiry date time.
 * audits.changedBy - {string|ObjectId} Reference to users who made the change.
 * ------------------------------------------------------------------------------------------------------------------------
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable(tableName, table => {
    table.specificType('id', 'CHAR(24)').primary()
    table.string('type').index()
    table.string('source').index()
    table.json('changes').defaultTo('[]')
    table.json('metadata').defaultTo('{}')
    table.datetime('changedAt').defaultTo(knex.fn.now())
    table.specificType('changedBy', 'CHAR(24)').references('id').inTable('users')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
