import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TransactionLogs extends BaseSchema {
  protected tableName = 'transaction_logs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('log_id').primary()
      table.integer('user_id').unsigned().references('users.user_id').notNullable()
      table.string('action', 50).notNullable()
      table.string('affected_table', 50).notNullable()
      table.integer('affected_row').notNullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
