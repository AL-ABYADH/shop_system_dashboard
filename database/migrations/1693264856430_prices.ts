import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Prices extends BaseSchema {
  protected tableName = 'prices'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('price_id').primary()
      table.integer('discount_id').unsigned().references('discounts.discount_id')
      table.integer('currency_id').unsigned().references('currencies.currency_id').notNullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
