import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductFeatures extends BaseSchema {
  protected tableName = 'product_features'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('value', 50).notNullable()
      table.integer('feature_id').unsigned().references('features.id').notNullable()
      
      // Only one of the following two columns should be null and the other one must have a value
      table.integer('product_id').unsigned().references('products.id').notNullable()
      table.integer('product_item_id').unsigned().references('product_items.id').notNullable()
      
      table.timestamps(true, true) // created_at and updated_at
      table.timestamp('deleted_at').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
