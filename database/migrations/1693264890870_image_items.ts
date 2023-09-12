import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ImageItems extends BaseSchema {
  protected tableName = 'image_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('images_group_id').unsigned().references('images_groups.id').notNullable()
      table.boolean('is_primary').defaultTo(false).notNullable()
      table.text('image_url').notNullable().unique()
      table.timestamps(true, true) // created_at and updated_at
      table.timestamp('deleted_at').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
