import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ImageItems extends BaseSchema {
  protected tableName = 'image_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('image_item_id').primary()
      table.integer('images_group_id').unsigned().references('images_groups.images_group_id').notNullable()
      table.boolean('is_primary').defaultTo(false).notNullable()
      table.string('image_url', 255).notNullable()
      table.timestamps(true, true) // created_at and updated_at
      table.timestamp('deleted_at').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
