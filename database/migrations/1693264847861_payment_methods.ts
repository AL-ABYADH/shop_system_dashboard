import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PaymentMethods extends BaseSchema {
  protected tableName = 'payment_methods'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('payment_method_id').primary()
      table.string('name', 50).notNullable()
      table.string('account_number', 50).notNullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
