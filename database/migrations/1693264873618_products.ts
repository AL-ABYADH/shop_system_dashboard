import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('product_id').primary()
      table.integer('category_id').unsigned().references('categories.category_id').notNullable()
      table.integer('images_id').unsigned().references('images.image_id').notNullable()
      table.string('name', 100).notNullable()
      table.string('Brand', 255)
      table.text('description')
      // table.decimal('rating', 3, 2)

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
