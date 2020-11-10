import knex from 'knex'

export async function up (knex: knex) {
  await knex.schema.createTable('orders', table => {
    table.uuid('id').primary().notNullable()
    table.string('client').nullable()
    table.uuid('account_id').notNullable().references('id').inTable('accounts').onUpdate('NO ACTION').onDelete('CASCADE')
    table.string('product').notNullable()
    table.string('quantity').notNullable()
    table.string('price').notNullable()
    table.string('discount').notNullable()
    table.dateTime('created_at').notNullable()
  })
}

export async function down (knex: knex) {
  await knex.schema.dropTable('orders')
}
