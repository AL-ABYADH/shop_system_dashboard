import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Discounts extends BaseSchema {
  protected tableName = 'discounts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('discount_id').primary()
      table.decimal('rate', 5, 2).notNullable()
      table.string('name', 50).notNullable()
      table.string('description', 255)
      table.date('start_date').notNullable()
      table.date('expiry_date').notNullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
