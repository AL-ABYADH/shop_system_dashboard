import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Currencies extends BaseSchema {
  protected tableName = 'currencies'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('currency_id').primary()
      table.string('name', 50).notNullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
