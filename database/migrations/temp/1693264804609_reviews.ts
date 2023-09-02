import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Reviews extends BaseSchema {
  protected tableName = 'reviews'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('review_id').primary()
      table.integer('user_id').unsigned().references('users.user_id').notNullable()
      table.integer('product_id').unsigned().references('products.product_id').notNullable()
      table.integer('rating').notNullable()
      table.string('comment', 255)

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
