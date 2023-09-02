import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OrderStatuses extends BaseSchema {
  protected tableName = 'order_statuses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('order_status_id').primary()
      table.string('order_status_value', 50).notNullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
