import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Features extends BaseSchema {
  protected tableName = 'features'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('feature', 50).notNullable()
      table.enum('type', ['string', 'number', 'list', 'list<number>', 'list<string>']).notNullable()
      table.integer('category_id').unsigned().references('categories.id').notNullable()
      table.timestamps(true, true) // created_at and updated_at
      table.timestamp('deleted_at').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
