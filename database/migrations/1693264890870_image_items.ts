import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ImageItems extends BaseSchema {
  protected tableName = 'image_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('image_item_id').primary()
      table.integer('image_id').unsigned().references('images.image_id').notNullable()
      table.boolean('is_primary').defaultTo(false)
      table.string('image_url', 255).notNullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
