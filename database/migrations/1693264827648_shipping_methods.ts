import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ShippingMethods extends BaseSchema {
  protected tableName = 'shipping_methods'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('shipping_method_id').primary()
      table.integer('price_id').unsigned().references('prices.price_id').notNullable()
      table.string('name', 50).notNullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
