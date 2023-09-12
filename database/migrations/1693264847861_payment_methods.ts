import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PaymentMethods extends BaseSchema {
  protected tableName = 'payment_methods'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('method', 50).notNullable()
      table.string('account_number', 50).notNullable()
      table.timestamps(true, true) // created_at and updated_at
      table.timestamp('deleted_at').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
