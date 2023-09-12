import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Prices extends BaseSchema {
  protected tableName = 'prices'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.decimal('price', 10, 2).unsigned().notNullable()
      table.enum('currentcy', ['YER', 'USD', 'SAR']).notNullable()
      table.timestamps(true, true) // created_at and updated_at
      table.timestamp('deleted_at').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
