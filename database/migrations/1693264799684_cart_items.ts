import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CartItems extends BaseSchema {
  protected tableName = 'cart_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('cart_item_id').primary()
      table.integer('cart_id').unsigned().references('carts.cart_id').notNullable()
      table
        .integer('product_item_id')
        .unsigned()
        .references('product_items.product_item_id')
        .notNullable()
      table.integer('quantity').notNullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
