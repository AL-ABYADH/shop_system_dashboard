import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductItems extends BaseSchema {
  protected tableName = 'product_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('product_item_id').primary()
      table.integer('product_id').unsigned().references('products.product_id').notNullable()
      table.decimal('Price', 10, 2)
      table.text('Flaws')
      table.string('PhoneStatus', 255)
      table.string('Availability', 255)
      table.text('Description')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
