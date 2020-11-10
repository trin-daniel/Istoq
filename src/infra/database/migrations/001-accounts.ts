import knex from 'knex'

export async function up (knex: knex) {
  await knex.schema.createTable('accounts', table => {
    table.uuid('id').primary().notNullable()
    table.string('token').nullable()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.dateTime('created_at').notNullable()
    table.dateTime('updated_at').notNullable()
  })
}

export async function down (knex: knex) {
  await knex.schema.dropTable('accounts')
}
