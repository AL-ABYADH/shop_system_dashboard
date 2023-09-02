import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PaymentStatuses extends BaseSchema {
  protected tableName = 'payment_statuses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('payment_status_id').primary()
      table.string('payment_status_value', 50).notNullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
