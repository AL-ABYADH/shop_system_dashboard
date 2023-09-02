import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OrderItems extends BaseSchema {
  protected tableName = 'order_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('order_item_id').primary()
      table.integer('order_id').unsigned().references('orders.order_id').notNullable()
      table.integer('product_id').unsigned().references('products.product_id').notNullable()
      table.integer('quantity').notNullable()
      table.decimal('price', 10, 2).notNullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
