const name = 'users'

export function up(knex) {
  return knex.schema.createTable(name, (table) => {
    table.specificType('id', 'CHAR(24)').primary()
    table.string('username').notNullable().unique()
    table.specificType('password', 'VARCHAR').notNullable()
    table.datetime('createdAt').defaultTo(knex.fn.now())
    table.datetime('updatedAt').defaultTo(knex.fn.now())
  })
}

export function down(knex) {
  return knex.schema.dropTableIfExists(name)
}
