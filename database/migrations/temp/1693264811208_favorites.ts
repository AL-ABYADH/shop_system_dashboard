import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Favorites extends BaseSchema {
  protected tableName = 'favorites'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('favorites_id').primary()
      table.integer('user_id').unsigned().references('users.user_id').notNullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
