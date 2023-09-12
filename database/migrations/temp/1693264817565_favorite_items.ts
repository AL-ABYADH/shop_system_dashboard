import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FavoriteItems extends BaseSchema {
  protected tableName = 'favorite_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('favorite_item_id').primary()
      table.integer('favorites_id').unsigned().references('favorites.id').notNullable()
      table.integer('product_id').unsigned().references('products.id').notNullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
