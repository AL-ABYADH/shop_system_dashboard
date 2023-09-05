import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('product_id').primary()
      table.string('name', 100).notNullable()
      table.text('description').nullable()
      table.string('brand', 255).notNullable()
      table.integer('category_id').unsigned().references('categories.category_id').notNullable()
      table.integer('images_id').unsigned().references('images.image_id').notNullable()
      // table.enum('rating', [1, 2, 3, 4, 5])
      table.timestamps(true, true) // created_at and updated_at
      table.timestamp('deleted_at').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
